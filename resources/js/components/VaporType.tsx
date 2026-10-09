import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

export interface VaporTypeProps {
    words?: string[];
    as?: React.ElementType;
    align?: 'start' | 'center' | 'end';
    color?: string;
    vaporColor?: string;
    density?: number;
    particleSize?: number;
    spread?: number;
    rise?: number;
    turbulence?: number;
    diffusion?: number;
    grain?: number;
    sweep?: 'left' | 'right' | 'center' | 'top' | 'scatter';
    stagger?: number;
    condense?: number;
    hold?: number;
    dissolve?: number;
    overlap?: number;
    loop?: boolean;
    startOnView?: boolean;
    interactive?: boolean;
    breath?: number;
    breathRadius?: number;
    recovery?: number;
    clickAdvance?: boolean;
    pauseOnHover?: boolean;
    area?: 'parent' | 'self' | 'window';
    paused?: boolean;
    dpr?: number;
    onWordChange?: (index: number) => void;
    className?: string;
    style?: React.CSSProperties;
}

export interface VaporTypeRef {
    next: () => void;
    replay: () => void;
}

const DEFAULT_WORDS = ['alto impacto', 'gran alcance', 'alto rendimiento', 'gran valor'];
const SWEEP_MODES = ['left', 'right', 'center', 'top', 'scatter'];

const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));

const listenReducedMotion = (callback: () => void) => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', callback);
    return () => mq.removeEventListener('change', callback);
};

const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const srOnlyStyle: React.CSSProperties = {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
};

const SIM_VS = `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const SIM_FS = `
precision highp float;

uniform sampler2D uPrevious;
uniform vec2 uResolution;
uniform vec2 uCanvas;
uniform float uFollow;
uniform float uDrain;
uniform vec2 uFrom;
uniform vec2 uTo;
uniform float uRadius;
uniform float uAmount;
uniform vec2 uWind;

float segmentDistance(vec2 p, vec2 a, vec2 b) {
  vec2 e = b - a;
  float t = clamp(dot(p - a, e) / max(dot(e, e), 1e-4), 0.0, 1.0);
  return length(p - a - e * t);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = (uv - 0.5) * uCanvas;
  vec4 previous = texture2D(uPrevious, uv);
  float d = segmentDistance(p, uFrom, uTo) / uRadius;
  float paint = exp(-d * d * 2.0) * uAmount;
  float target = max(previous.a - uDrain, paint);
  float strength = previous.r + (target - previous.r) * uFollow;
  vec2 wind = mix(previous.gb, uWind, clamp(paint * 3.0, 0.0, 1.0));
  gl_FragColor = vec4(max(strength, 0.0), wind, max(target, 0.0));
}
`;

const COMMON_CHUNK = `
uniform vec2 uCanvas;
uniform vec4 uBounds;
uniform vec2 uOrigin;
uniform float uSweep;
uniform float uStagger;
uniform float uPhase;
uniform float uMode;
uniform float uGrain;
uniform float uDpr;
uniform float uEm;
uniform float uBreath;
uniform sampler2D uField;

const float TRAVEL = 0.75;

float hash12(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = hash12(i);
  float b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0));
  float d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float orderAt(vec2 p) {
  vec2 size = max(uBounds.zw - uBounds.xy, vec2(1.0));
  vec2 q = clamp((p - uBounds.xy) / size, 0.0, 1.0);
  float o;
  if (uSweep < 0.5) {
    o = q.x;
  } else if (uSweep < 1.5) {
    o = 1.0 - q.x;
  } else if (uSweep < 2.5) {
    o = abs(q.x - 0.5) * 2.0;
  } else if (uSweep < 3.5) {
    o = 1.0 - q.y;
  } else if (uSweep < 4.5) {
    o = noise(p / (uEm * 0.5) + 3.7);
  } else {
    o = clamp(length(p - uOrigin) / max(length(size), 1.0) * 1.5, 0.0, 1.0);
  }
  return clamp(mix(o, noise(p / (uEm * 0.35) + 11.0), 0.2), 0.0, 1.0);
}

float frontAt(vec2 p) {
  if (abs(uMode - 1.0) < 0.5) return 0.0;
  float t = clamp(uPhase * (1.0 + uStagger) - orderAt(p) * uStagger, 0.0, 1.0);
  t = t * t * (3.0 - 2.0 * t);
  return uMode < 0.5 ? 1.0 - t : t;
}

float releaseAt(vec2 p) {
  float g = noise(p / uGrain) * 0.6 + hash12(floor(p * uDpr) + 0.5) * 0.4;
  return 0.02 + 0.98 * clamp((g - 0.5) * 1.4 + 0.5, 0.0, 1.0);
}

vec4 fieldAt(vec2 p) {
  return texture2D(uField, p / uCanvas + 0.5);
}

float blowAt(float strength) {
  return clamp(strength * uBreath - 0.03, 0.0, 0.6);
}

vec3 toSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}
`;

const TEXT_VS = `
varying vec2 vUv;
varying vec2 vWorld;

void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xy;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const TEXT_FS = `
precision highp float;
${COMMON_CHUNK}
uniform sampler2D uText;
uniform vec3 uColor;
varying vec2 vUv;
varying vec2 vWorld;

void main() {
  float ink = texture2D(uText, vUv).a;
  if (ink < 0.004) discard;
  float lift = max(frontAt(vWorld), blowAt(fieldAt(vWorld).r));
  if (lift >= releaseAt(vWorld) * (1.0 - TRAVEL)) discard;
  gl_FragColor = vec4(toSrgb(uColor), ink);
}
`;

const PARTICLE_VS = `
${COMMON_CHUNK}
attribute vec4 aSeed;
uniform float uTime;
uniform float uSpread;
uniform float uRise;
uniform float uTurbulence;
uniform float uDiffusion;
uniform float uSize;
varying float vAlpha;
varying float vTint;

vec2 flow(vec2 p, float t) {
  p += 0.45 * sin(p.yx * vec2(1.3, 1.7) + vec2(t * 0.21, -t * 0.17));
  vec2 v = vec2(0.0);
  vec2 k = normalize(vec2(1.0, 0.6));
  v += vec2(k.y, -k.x) * cos(dot(k, p) * 1.1 + t * 0.55 + 1.3);
  k = normalize(vec2(-0.7, 1.1));
  v += vec2(k.y, -k.x) * cos(dot(k, p) * 1.9 - t * 0.47 + 4.1) * 0.55;
  k = normalize(vec2(1.3, -0.4));
  v += vec2(k.y, -k.x) * cos(dot(k, p) * 3.3 + t * 0.71 + 2.2) * 0.3;
  return v;
}

void main() {
  vec2 home = position.xy;
  vec4 field = fieldAt(home);
  float front = frontAt(home);
  float blow = blowAt(field.r);
  float s = clamp((max(front, blow) - releaseAt(home) * (1.0 - TRAVEL)) / TRAVEL, 0.0, 1.0);
  if (s <= 0.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    vAlpha = 0.0;
    vTint = 0.0;
    return;
  }
  float blown = smoothstep(-0.04, 0.04, blow - front);
  float eased = uMode < 0.5 ? s * s : 1.0 - (1.0 - s) * (1.0 - s);
  eased = mix(eased, s, blown);
  float angle = aSeed.x * 6.2831853;
  vec2 jitter = vec2(cos(angle), sin(angle) * 0.7);
  vec2 drift = mix(vec2(0.0, uRise), field.gb * 2.2 + vec2(0.0, uRise * 0.3), blown);
  float reach = uSpread * eased * (0.3 + 0.7 * sqrt(aSeed.y));
  float stride = reach / 6.0;
  vec2 p = home;
  for (int i = 0; i < 6; i++) {
    vec2 f = flow(p / uEm * 0.9 + aSeed.z * 0.06, uTime);
    vec2 direction = drift + f * uTurbulence + jitter * uDiffusion * (0.2 + s);
    p += direction / max(length(direction), 0.35) * stride;
  }
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 0.0, 1.0);
  gl_PointSize = max(uSize * uDpr * mix(1.0, 1.25, s), 1.0);
  vAlpha = (1.0 - smoothstep(mix(0.45, 0.7, blown), 1.0, s)) * (0.5 + 0.5 * aSeed.w);
  vTint = smoothstep(0.0, 0.5, s);
}
`;

const PARTICLE_FS = `
precision highp float;
uniform vec3 uColor;
uniform vec3 uVaporColor;
varying float vAlpha;
varying float vTint;

vec3 toSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  float d = length(gl_PointCoord - 0.5);
  float soft = 1.0 - smoothstep(0.3, 0.5, d);
  vec3 color = mix(uColor, uVaporColor, vTint);
  gl_FragColor = vec4(toSrgb(color), vAlpha * soft);
}
`;

const transformCase = (str: string, transform?: string) => {
    if (transform === 'uppercase') return str.toUpperCase();
    if (transform === 'lowercase') return str.toLowerCase();
    if (transform === 'capitalize') {
        return str.replace(/(^|\s)(\S)/gu, (_, space, char) => `${space}${char.toUpperCase()}`);
    }
    return str;
};

const createRenderTarget = (width: number, height: number) =>
    new THREE.WebGLRenderTarget(width, height, {
        type: THREE.HalfFloatType,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: false,
        stencilBuffer: false,
        generateMipmaps: false,
    });

const disposeWordItem = (item: { texture: THREE.Texture; geometry: THREE.BufferGeometry }) => {
    item.texture.dispose();
    item.geometry.dispose();
};

export const VaporType = forwardRef<VaporTypeRef, VaporTypeProps>(function VaporType(
    {
        words = DEFAULT_WORDS,
        as: Component = 'span',
        align = 'center',
        color = 'currentColor',
        vaporColor = '#38BDF8',
        density = 1,
        particleSize = 1.2,
        spread = 1.2,
        rise = 1,
        turbulence = 0.8,
        diffusion = 0.35,
        grain = 1,
        sweep = 'left',
        stagger = 0.8,
        condense = 1.8,
        hold = 2.4,
        dissolve = 2,
        overlap = 0.6,
        loop = true,
        startOnView = true,
        interactive = true,
        breath = 1,
        breathRadius = 0.8,
        recovery = 1.2,
        clickAdvance = true,
        pauseOnHover = true,
        area = 'parent',
        paused = false,
        dpr = 2,
        onWordChange,
        className,
        style,
    },
    ref
) {
    const rootRef = useRef<HTMLElement | null>(null);
    const canvasContainerRef = useRef<HTMLSpanElement | null>(null);
    const controllerRef = useRef<{
        sync: () => void;
        next: () => void;
        replay: () => void;
        destroy: () => void;
    } | null>(null);

    const isSystemReducedMotion = useSyncExternalStore(listenReducedMotion, getReducedMotion, () => false);
    const [hasError, setHasError] = useState(false);
    const [activeWordIdx, setActiveWordIdx] = useState(0);
    const isReducedMotion = isSystemReducedMotion || hasError;

    const sanitizedWords = useMemo(() => {
        const list = words.map((w) => w.trim()).filter(Boolean);
        return list.length ? list : DEFAULT_WORDS;
    }, [words]);

    const propsPayload = {
        words: sanitizedWords,
        align,
        color,
        vaporColor,
        density,
        particleSize,
        spread,
        rise,
        turbulence,
        diffusion,
        grain,
        sweep,
        stagger,
        condense,
        hold,
        dissolve,
        overlap,
        loop,
        startOnView,
        interactive,
        breath,
        breathRadius,
        recovery,
        clickAdvance,
        pauseOnHover,
        area,
        paused,
        dpr,
        onWordChange,
    };

    const latestPropsRef = useRef(propsPayload);

    useEffect(() => {
        latestPropsRef.current = propsPayload;
        controllerRef.current?.sync();
    });

    useEffect(() => {
        if (isReducedMotion) return;
        const rootEl = rootRef.current;
        const containerEl = canvasContainerRef.current;
        if (!rootEl || !containerEl) return;

        const doc = rootEl.ownerDocument;
        const canvas = doc.createElement('canvas');
        canvas.style.cssText = 'position:absolute;left:0;top:0;display:block;pointer-events:none';

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: false,
                premultipliedAlpha: true,
                powerPreference: 'high-performance',
            });
        } catch {
            setHasError(true);
            return;
        }

        containerEl.appendChild(canvas);
        renderer.setPixelRatio(1);
        renderer.setClearColor(0, 0);

        const uniformsBase = {
            uCanvas: { value: new THREE.Vector2(1, 1) },
            uStagger: { value: 1 },
            uGrain: { value: 2 },
            uDpr: { value: 1 },
            uEm: { value: 16 },
            uBreath: { value: 1 },
            uField: { value: null as THREE.Texture | null },
            uColor: { value: new THREE.Color(1, 1, 1) },
        };

        const uniformsParticles = {
            uTime: { value: 0 },
            uSpread: { value: 40 },
            uRise: { value: 1 },
            uTurbulence: { value: 1 },
            uDiffusion: { value: 0.35 },
            uSize: { value: 1.2 },
            uVaporColor: { value: new THREE.Color(1, 1, 1) },
        };

        const uniformsSim = {
            uPrevious: { value: null as THREE.Texture | null },
            uResolution: { value: new THREE.Vector2(1, 1) },
            uCanvas: uniformsBase.uCanvas,
            uFollow: { value: 1 },
            uDrain: { value: 0 },
            uFrom: { value: new THREE.Vector2() },
            uTo: { value: new THREE.Vector2() },
            uRadius: { value: 40 },
            uAmount: { value: 0 },
            uWind: { value: new THREE.Vector2() },
        };

        const simMaterial = new THREE.ShaderMaterial({
            uniforms: uniformsSim,
            vertexShader: SIM_VS,
            fragmentShader: SIM_FS,
            depthTest: false,
            depthWrite: false,
        });

        const mainScene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
        const planeGeom = new THREE.PlaneGeometry(1, 1);
        const emptyPointsGeom = new THREE.BufferGeometry();

        const createLayer = () => {
            const ownUniforms = {
                uBounds: { value: new THREE.Vector4(0, 0, 1, 1) },
                uOrigin: { value: new THREE.Vector2() },
                uSweep: { value: 0 },
                uPhase: { value: 0 },
                uMode: { value: 1 },
                uText: { value: null as THREE.Texture | null },
            };

            const textMat = new THREE.ShaderMaterial({
                uniforms: { ...uniformsBase, ...ownUniforms },
                vertexShader: TEXT_VS,
                fragmentShader: TEXT_FS,
                transparent: true,
                depthTest: false,
                depthWrite: false,
            });

            const particleMat = new THREE.ShaderMaterial({
                uniforms: { ...uniformsBase, ...uniformsParticles, ...ownUniforms },
                vertexShader: PARTICLE_VS,
                fragmentShader: PARTICLE_FS,
                transparent: true,
                depthTest: false,
                depthWrite: false,
            });

            const textMesh = new THREE.Mesh(planeGeom, textMat);
            textMesh.frustumCulled = false;
            textMesh.visible = false;

            const pointsMesh = new THREE.Points(emptyPointsGeom, particleMat);
            pointsMesh.frustumCulled = false;
            pointsMesh.renderOrder = 1;
            pointsMesh.visible = false;

            mainScene.add(textMesh, pointsMesh);

            return {
                own: ownUniforms,
                text: textMesh,
                points: pointsMesh,
                textMaterial: textMat,
                particleMaterial: particleMat,
                word: -1,
                mode: 1,
                elapsed: 0,
                radial: false,
            };
        };

        const layers = [createLayer(), createLayer()];
        const simScene = new THREE.Scene();
        const simMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial);
        simMesh.frustumCulled = false;
        simScene.add(simMesh);

        const measureCanvas = doc.createElement('canvas');
        measureCanvas.width = 1;
        measureCanvas.height = 1;
        const measureCtx = measureCanvas.getContext('2d', { willReadFrequently: true });
        const segmenter =
            typeof Intl !== 'undefined' && 'Segmenter' in Intl
                ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
                : null;

        let renderTargets: THREE.WebGLRenderTarget[] = [];
        let pingPongIndex = 0;
        interface WordCacheItem {
            texture: THREE.CanvasTexture;
            geometry: THREE.BufferGeometry;
            center: [number, number];
            size: [number, number];
            bounds: [number, number, number, number];
        }
        let wordItems: WordCacheItem[] = [];
        let cacheKey = '';
        let colorKey = '';
        let canvasCSSWidth = 0;
        let canvasCSSHeight = 0;
        let effectiveDpr = 1;
        let baseFontSize = 16;
        let fontRevision = 0;
        let fontsReady = false;
        let activeLayerIndex = 0;
        let isStarted = false;
        let isVisibleOnScreen = false;
        let isContextLost = false;
        let isDestroyed = false;
        let rafId = 0;
        let restartTimer = 0;
        let lastTime = 0;
        let totalElapsed = 0;
        let lastInteractionTime = -Infinity;
        let forceNextWord = false;
        let targetWordIndex = -1;
        let clickOrigin: { x: number; y: number } | null = null;

        const pointer = {
            x: 0,
            y: 0,
            fromX: 0,
            fromY: 0,
            vx: 0,
            vy: 0,
            at: 0,
            fresh: true,
            moved: false,
            over: false,
        };

        const parseCssColor = (colorStr: string, fallback: string, outColor: THREE.Color) => {
            if (!measureCtx) return;
            measureCtx.clearRect(0, 0, 1, 1);
            measureCtx.fillStyle = fallback;
            measureCtx.fillStyle = colorStr;
            measureCtx.fillRect(0, 0, 1, 1);
            const [r, g, b] = measureCtx.getImageData(0, 0, 1, 1).data;
            outColor.setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
        };

        const syncColors = () => {
            const props = latestPropsRef.current;
            const fg = props.color === 'currentColor' ? getComputedStyle(rootEl).color : props.color;
            const vp = props.vaporColor === 'currentColor' ? fg : props.vaporColor;
            const key = `${fg}|${vp}`;
            if (key !== colorKey) {
                colorKey = key;
                parseCssColor(fg, '#ffffff', uniformsBase.uColor.value);
                parseCssColor(vp, fg, uniformsParticles.uVaporColor.value);
                return true;
            }
            return false;
        };

        const bindWord = (layer: (typeof layers)[0], wordIdx: number) => {
            const item = wordItems[wordIdx];
            layer.word = wordIdx;
            if (!item) {
                layer.text.visible = false;
                layer.points.visible = false;
                return;
            }
            layer.own.uText.value = item.texture;
            layer.own.uBounds.value.set(...item.bounds);
            layer.text.position.set(item.center[0], item.center[1], 0);
            layer.text.scale.set(item.size[0], item.size[1], 1);
            layer.text.visible = true;
            layer.points.geometry = item.geometry;
            layer.points.visible = true;
        };

        const unbindLayer = (layer: (typeof layers)[0]) => {
            layer.word = -1;
            layer.text.visible = false;
            layer.points.visible = false;
            layer.points.geometry = emptyPointsGeom;
            layer.own.uText.value = null;
        };

        const updateWordGeometries = () => {
            if (isContextLost) return false;
            const props = latestPropsRef.current;
            const containerRect = containerEl.getBoundingClientRect();
            if (containerRect.width < 1 || containerRect.height < 1) return false;

            const computed = getComputedStyle(rootEl);
            const dprVal = Math.min(window.devicePixelRatio || 1, Math.max(props.dpr, 0.5));
            const wordElements = Array.from(rootEl.querySelectorAll('[data-vapor-word]')) as HTMLElement[];

            const layoutSignature = [
                Math.round(4 * containerRect.width),
                Math.round(4 * containerRect.height),
                dprVal,
                fontRevision,
                computed.fontStyle,
                computed.fontVariantCaps,
                computed.fontWeight,
                computed.fontSize,
                computed.fontFamily,
                computed.letterSpacing,
                computed.textTransform,
                computed.direction,
                props.density,
                props.align,
                wordElements.map((el) => el.textContent ?? '').join('\0'),
            ].join('|');

            if (layoutSignature === cacheKey) return false;
            cacheKey = layoutSignature;
            effectiveDpr = dprVal;
            baseFontSize = Number.parseFloat(computed.fontSize) || 16;

            const targetPixelWidth = Math.max(2, 2 * Math.ceil((containerRect.width * effectiveDpr) / 2));
            const targetPixelHeight = Math.max(2, 2 * Math.ceil((containerRect.height * effectiveDpr) / 2));

            canvasCSSWidth = targetPixelWidth / effectiveDpr;
            canvasCSSHeight = targetPixelHeight / effectiveDpr;

            renderer.setSize(targetPixelWidth, targetPixelHeight, false);
            canvas.style.width = `${canvasCSSWidth}px`;
            canvas.style.height = `${canvasCSSHeight}px`;

            camera.left = -canvasCSSWidth / 2;
            camera.right = canvasCSSWidth / 2;
            camera.top = canvasCSSHeight / 2;
            camera.bottom = -canvasCSSHeight / 2;
            camera.updateProjectionMatrix();

            uniformsBase.uCanvas.value.set(canvasCSSWidth, canvasCSSHeight);
            uniformsBase.uDpr.value = effectiveDpr;
            uniformsBase.uEm.value = baseFontSize;

            const simWidth = Math.max(8, Math.ceil(canvasCSSWidth / 6));
            const simHeight = Math.max(8, Math.ceil(canvasCSSHeight / 6));

            renderTargets.forEach((rt) => rt.dispose());
            renderTargets = [createRenderTarget(simWidth, simHeight), createRenderTarget(simWidth, simHeight)];
            uniformsSim.uResolution.value.set(simWidth, simHeight);

            for (const rt of renderTargets) {
                renderer.setRenderTarget(rt);
                renderer.clear();
            }
            renderer.setRenderTarget(null);
            pingPongIndex = 0;
            uniformsBase.uField.value = renderTargets[0].texture;

            const fontSpec = [
                computed.fontStyle,
                computed.fontVariantCaps === 'small-caps' ? 'small-caps' : '',
                computed.fontWeight,
                `${baseFontSize}px`,
                computed.fontFamily,
            ]
                .filter(Boolean)
                .join(' ');

            const letterSpacing = Number.parseFloat(computed.letterSpacing) || 0;
            const textDir = computed.direction === 'rtl' ? 'rtl' : 'ltr';
            const range = doc.createRange();

            wordItems.forEach(disposeWordItem);
            wordItems = [];

            wordElements.forEach((wordEl, wordIdx) => {
                const firstChild = wordEl.firstChild;
                if (!firstChild || firstChild.nodeType !== Node.TEXT_NODE) return;

                const textData = (firstChild as Text).data;
                const segments = segmenter
                    ? Array.from(segmenter.segment(textData), (s) => s.segment)
                    : Array.from(textData);

                interface LineChunk {
                    top: number;
                    bottom: number;
                    left: number;
                    right: number;
                    text: string;
                }
                const lines: LineChunk[] = [];
                let charOffset = 0;

                for (const seg of segments) {
                    range.setStart(firstChild, charOffset);
                    range.setEnd(firstChild, charOffset + seg.length);
                    charOffset += seg.length;
                    const r = range.getBoundingClientRect();
                    if (r.width <= 0 || r.height <= 0) continue;

                    const lastLine = lines[lines.length - 1];
                    if (lastLine && r.top < lastLine.bottom - 0.5 * r.height) {
                        lastLine.text += seg;
                        lastLine.left = Math.min(lastLine.left, r.left);
                        lastLine.right = Math.max(lastLine.right, r.right);
                        lastLine.top = Math.min(lastLine.top, r.top);
                        lastLine.bottom = Math.max(lastLine.bottom, r.bottom);
                    } else {
                        lines.push({
                            top: r.top,
                            bottom: r.bottom,
                            left: r.left,
                            right: r.right,
                            text: seg,
                        });
                    }
                }

                if (!lines.length) return;

                const pad = 0.3 * baseFontSize;
                const minL = Math.min(...lines.map((l) => l.left)) - containerRect.left - pad;
                const minT = Math.min(...lines.map((l) => l.top)) - containerRect.top - pad;
                const maxR = Math.max(...lines.map((l) => l.right)) - containerRect.left + pad;
                const maxB = Math.max(...lines.map((l) => l.bottom)) - containerRect.top + pad;

                const snapL = Math.floor(minL * effectiveDpr) / effectiveDpr;
                const snapT = Math.floor(minT * effectiveDpr) / effectiveDpr;
                const canvasW = Math.max(1, Math.ceil((maxR - snapL) * effectiveDpr));
                const canvasH = Math.max(1, Math.ceil((maxB - snapT) * effectiveDpr));

                const offscreen = doc.createElement('canvas');
                offscreen.width = canvasW;
                offscreen.height = canvasH;
                const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
                if (!offCtx) return;

                offCtx.setTransform(
                    effectiveDpr,
                    0,
                    0,
                    effectiveDpr,
                    -snapL * effectiveDpr,
                    -snapT * effectiveDpr
                );
                offCtx.font = fontSpec;
                offCtx.fillStyle = '#ffffff';
                offCtx.textAlign = 'left';
                offCtx.textBaseline = 'alphabetic';
                offCtx.direction = textDir;
                offCtx.letterSpacing = `${letterSpacing}px`;

                for (const line of lines) {
                    const text = transformCase(line.text.replace(/\s+$/u, ''), computed.textTransform);
                    if (!text) continue;
                    const metrics = offCtx.measureText(text);
                    const ascent = metrics.fontBoundingBoxAscent || 0.8 * baseFontSize;
                    const descent = metrics.fontBoundingBoxDescent || 0.2 * baseFontSize;
                    const baselineY = line.top + ((line.bottom - line.top) * ascent) / (ascent + descent);
                    offCtx.fillText(text, line.left - containerRect.left, baselineY - containerRect.top);
                }

                const imgData = offCtx.getImageData(0, 0, canvasW, canvasH).data;
                const step = 1 / Math.sqrt(clamp(latestPropsRef.current.density, 0.1, 4));

                let prng = Math.imul(wordIdx + 1, 0x9e3779b1) >>> 0 || 1;
                const rnd = () => {
                    prng ^= prng << 13;
                    prng ^= prng >>> 17;
                    prng ^= prng << 5;
                    return (prng >>> 0) / 0x100000000;
                };

                const positions: number[] = [];
                const spanW = canvasW / effectiveDpr;
                const spanH = canvasH / effectiveDpr;
                let bMinX = Infinity;
                let bMinY = Infinity;
                let bMaxX = -Infinity;
                let bMaxY = -Infinity;

                for (let y = step / 2; y < spanH; y += step) {
                    for (let x = step / 2; x < spanW; x += step) {
                        const jx = x + (rnd() - 0.5) * step;
                        const jy = y + (rnd() - 0.5) * step;
                        const sx = Math.min(canvasW - 1, Math.max(0, Math.floor(jx * effectiveDpr)));
                        const sy = Math.min(canvasH - 1, Math.max(0, Math.floor(jy * effectiveDpr)));
                        if (imgData[(sy * canvasW + sx) * 4 + 3] < 96) continue;

                        const wx = snapL + jx - canvasCSSWidth / 2;
                        const wy = canvasCSSHeight / 2 - (snapT + jy);
                        positions.push(wx, wy, 0);

                        bMinX = Math.min(bMinX, wx);
                        bMaxX = Math.max(bMaxX, wx);
                        bMinY = Math.min(bMinY, wy);
                        bMaxY = Math.max(bMaxY, wy);
                    }
                }

                const pointCount = positions.length / 3;
                const seedArray = new Float32Array(4 * pointCount);
                for (let i = 0; i < seedArray.length; i++) {
                    seedArray[i] = rnd();
                }

                const geom = new THREE.BufferGeometry();
                geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
                geom.setAttribute('aSeed', new THREE.Float32BufferAttribute(seedArray, 4));

                const tex = new THREE.CanvasTexture(offscreen);
                tex.minFilter = THREE.LinearFilter;
                tex.magFilter = THREE.LinearFilter;
                tex.generateMipmaps = false;
                tex.colorSpace = THREE.SRGBColorSpace;

                wordItems.push({
                    texture: tex,
                    geometry: geom,
                    center: [snapL + spanW / 2 - canvasCSSWidth / 2, canvasCSSHeight / 2 - (snapT + spanH / 2)],
                    size: [spanW, spanH],
                    bounds: pointCount ? [bMinX, bMinY, bMaxX, bMaxY] : [0, 0, 1, 1],
                });
            });

            layers.forEach((layer, idx) => {
                if (layer.word < 0) return;
                if (layer.word < wordItems.length) {
                    bindWord(layer, layer.word);
                } else if (idx === activeLayerIndex) {
                    bindWord(layer, 0);
                } else {
                    unbindLayer(layer);
                }
            });

            return true;
        };

        const scheduleFrame = () => {
            if (isDestroyed || isContextLost || !isVisibleOnScreen || !isStarted || rafId) return;
            if (restartTimer) {
                window.clearTimeout(restartTimer);
                restartTimer = 0;
            }
            rafId = requestAnimationFrame(renderFrame);
        };

        const startAnimation = () => {
            if (isStarted || !fontsReady || (!isVisibleOnScreen && latestPropsRef.current.startOnView)) return;
            isStarted = true;
            activeLayerIndex = 0;
            unbindLayer(layers[1]);
            const firstLayer = layers[0];
            bindWord(firstLayer, 0);
            firstLayer.mode = latestPropsRef.current.paused ? 1 : 0;
            firstLayer.elapsed = 0;
            firstLayer.radial = false;
            setActiveWordIdx(0);
            latestPropsRef.current.onWordChange?.(0);
        };

        function renderFrame(time: number) {
            rafId = 0;
            if (isDestroyed || isContextLost || !wordItems.length) return;

            const props = latestPropsRef.current;
            const deltaSec = lastTime ? Math.max(0, (time - lastTime) / 1000) : 0;
            lastTime = time;

            const stepSec = Math.min(deltaSec, 0.1);
            const wordsCount = wordItems.length;
            const isRunning = !props.paused;
            const durations = [Math.max(props.condense, 0.05), Math.max(props.hold, 0), Math.max(props.dissolve, 0.05)];
            const overlapDuration = durations[2] * (1 - clamp(props.overlap, 0, 1));
            let activeLayer = layers[activeLayerIndex];
            const isHoverPaused = props.pauseOnHover && props.interactive && pointer.over;
            const isLastWord = !props.loop && activeLayer.word >= wordsCount - 1 && !forceNextWord && targetWordIndex < 0;

            if (isRunning) {
                totalElapsed += stepSec;
                const oppositeLayer = layers[1 - activeLayerIndex];

                if (oppositeLayer.word >= 0) {
                    oppositeLayer.elapsed += stepSec;
                    if (oppositeLayer.elapsed >= durations[2]) {
                        unbindLayer(oppositeLayer);
                    }
                }

                if (activeLayer.mode === 1) {
                    if (!isHoverPaused) {
                        activeLayer.elapsed += deltaSec;
                    }
                    const clickedAdvance = clickOrigin !== null && props.clickAdvance && props.interactive;
                    if (
                        clickedAdvance ||
                        forceNextWord ||
                        targetWordIndex >= 0 ||
                        (!isLastWord && activeLayer.elapsed >= durations[1])
                    ) {
                        activeLayer.mode = 2;
                        activeLayer.elapsed = 0;
                        activeLayer.radial = clickedAdvance;
                        if (clickOrigin && clickedAdvance) {
                            activeLayer.own.uOrigin.value.set(clickOrigin.x, clickOrigin.y);
                        }
                    }
                    forceNextWord = false;
                } else if (activeLayer.mode === 0) {
                    activeLayer.elapsed += stepSec;
                    if (activeLayer.elapsed >= durations[0]) {
                        activeLayer.mode = 1;
                        activeLayer.elapsed = 0;
                        activeLayer.radial = false;
                    }
                } else {
                    activeLayer.elapsed += stepSec;
                }

                if (activeLayer.mode === 2 && activeLayer.elapsed >= overlapDuration) {
                    const nextWord = targetWordIndex >= 0 ? targetWordIndex % wordsCount : (activeLayer.word + 1) % wordsCount;
                    targetWordIndex = -1;
                    const nextLayer = layers[1 - activeLayerIndex];
                    bindWord(nextLayer, nextWord);
                    nextLayer.mode = 0;
                    nextLayer.elapsed = 0;
                    nextLayer.radial = false;
                    activeLayerIndex = 1 - activeLayerIndex;
                    activeLayer = nextLayer;
                    setActiveWordIdx(nextWord);
                    props.onWordChange?.(nextWord);
                }
            }

            clickOrigin = null;

            const recoveryTime = Math.max(props.recovery, 0.05);
            const isPointerNear =
                pointer.moved &&
                isRunning &&
                props.interactive &&
                props.breath > 0 &&
                (() => {
                    const item = wordItems[layers[activeLayerIndex].word];
                    if (!item) return false;
                    const threshold = Math.max(props.breathRadius, 0.05) * baseFontSize * 1.5;
                    const [minX, minY, maxX, maxY] = item.bounds;
                    for (let s = 0; s <= 6; s++) {
                        const t = s / 6;
                        const px = pointer.fromX + (pointer.x - pointer.fromX) * t;
                        const py = pointer.fromY + (pointer.y - pointer.fromY) * t;
                        if (Math.max(minX - px, 0, px - maxX) + Math.max(minY - py, 0, py - maxY) < threshold) {
                            return true;
                        }
                    }
                    return false;
                })();

            const isRecentInteraction = time - lastInteractionTime < (recoveryTime + 1) * 1000;

            if ((isPointerNear || isRecentInteraction) && renderTargets.length === 2) {
                const speed = Math.hypot(pointer.vx, pointer.vy);
                const paintAmount = isPointerNear ? clamp(speed / 1600, 0, 1) : 0;
                const windScale = speed > 1 ? Math.min(speed / 1200, 1) / speed : 0;

                uniformsSim.uPrevious.value = renderTargets[pingPongIndex].texture;
                uniformsSim.uFollow.value = 1 - Math.exp(-stepSec / 0.14);
                uniformsSim.uDrain.value = stepSec / recoveryTime;
                uniformsSim.uFrom.value.set(pointer.fromX, pointer.fromY);
                uniformsSim.uTo.value.set(pointer.x, pointer.y);
                uniformsSim.uRadius.value = Math.max(props.breathRadius, 0.05) * baseFontSize;
                uniformsSim.uAmount.value = paintAmount;
                uniformsSim.uWind.value.set(pointer.vx * windScale, pointer.vy * windScale);

                renderer.setRenderTarget(renderTargets[1 - pingPongIndex]);
                renderer.render(simScene, camera);
                renderer.setRenderTarget(null);

                pingPongIndex = 1 - pingPongIndex;
                uniformsBase.uField.value = renderTargets[pingPongIndex].texture;

                if (isPointerNear && paintAmount > 0.02) {
                    lastInteractionTime = time;
                }
            }

            pointer.fromX = pointer.x;
            pointer.fromY = pointer.y;
            pointer.moved = false;

            const sweepIndex = Math.max(0, SWEEP_MODES.indexOf(props.sweep));
            for (const layer of layers) {
                layer.own.uMode.value = layer.mode;
                layer.own.uPhase.value = layer.mode === 1 ? 0 : Math.min(layer.elapsed / durations[layer.mode], 1);
                layer.own.uSweep.value = layer.radial ? 5 : sweepIndex;
            }

            uniformsBase.uStagger.value = clamp(props.stagger, 0, 4);
            uniformsBase.uGrain.value = Math.max(props.grain, 0.05) * baseFontSize * 0.035;
            uniformsBase.uBreath.value = props.interactive ? clamp(props.breath, 0, 3) : 0;

            uniformsParticles.uTime.value = totalElapsed;
            uniformsParticles.uSpread.value = Math.max(props.spread, 0) * baseFontSize;
            uniformsParticles.uRise.value = clamp(props.rise, -3, 3);
            uniformsParticles.uTurbulence.value = clamp(props.turbulence, 0, 4);
            uniformsParticles.uDiffusion.value = clamp(props.diffusion, 0, 4);
            uniformsParticles.uSize.value = clamp(props.particleSize, 0.25, 8);

            renderer.render(mainScene, camera);

            if (
                isRunning &&
                (activeLayer.mode !== 1 ||
                    layers[1 - activeLayerIndex].word >= 0 ||
                    time - lastInteractionTime < (recoveryTime + 1) * 1000 ||
                    forceNextWord ||
                    targetWordIndex >= 0)
            ) {
                scheduleFrame();
            } else if (isRunning && activeLayer.mode === 1 && !isLastWord && !isHoverPaused && isVisibleOnScreen) {
                const waitSec = Math.max(durations[1] - activeLayer.elapsed, 0);
                restartTimer = window.setTimeout(() => {
                    restartTimer = 0;
                    scheduleFrame();
                }, waitSec * 1000 + 16);
            }
        }

        const toCanvasCoords = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: e.clientX - rect.left - canvasCSSWidth / 2,
                y: rect.top + canvasCSSHeight / 2 - e.clientY,
            };
        };

        const isInsideRoot = (e: PointerEvent) => {
            const rect = rootEl.getBoundingClientRect();
            return e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
        };

        const onPointerMove = (e: PointerEvent) => {
            if (e.pointerType === 'touch') return;
            const inside = isInsideRoot(e);
            if (pointer.over && !inside) {
                lastTime = 0;
            }
            pointer.over = inside;
            const pt = toCanvasCoords(e);
            const now = e.timeStamp;

            if (pointer.fresh) {
                pointer.fresh = false;
                pointer.x = pt.x;
                pointer.y = pt.y;
                pointer.fromX = pt.x;
                pointer.fromY = pt.y;
                pointer.vx = 0;
                pointer.vy = 0;
                pointer.at = now;
                return;
            }

            const dt = Math.max((now - pointer.at) / 1000, 0.002);
            const smoothing = Math.min(1, dt / 0.03);
            pointer.vx += ((pt.x - pointer.x) / dt - pointer.vx) * smoothing;
            pointer.vy += ((pt.y - pointer.y) / dt - pointer.vy) * smoothing;
            pointer.x = pt.x;
            pointer.y = pt.y;
            pointer.at = now;
            pointer.moved = true;
            scheduleFrame();
        };

        const onPointerLeave = () => {
            if (pointer.over) {
                lastTime = 0;
            }
            pointer.fresh = true;
            pointer.over = false;
            pointer.vx = 0;
            pointer.vy = 0;
            scheduleFrame();
        };

        const onPointerDown = (e: PointerEvent) => {
            const props = latestPropsRef.current;
            if (!props.clickAdvance || !props.interactive || e.button > 0) return;
            if (isInsideRoot(e)) {
                clickOrigin = toCanvasCoords(e);
                scheduleFrame();
            }
        };

        let pointerListeners: [EventTarget, string, EventListener][] = [];
        let activeArea = '';

        const detachPointer = () => {
            for (const [target, type, fn] of pointerListeners) {
                target.removeEventListener(type, fn);
            }
            pointerListeners = [];
        };

        const attachPointer = () => {
            const area = latestPropsRef.current.area;
            if (area === activeArea) return;
            detachPointer();
            activeArea = area;

            const targetElement: EventTarget =
                area === 'window' ? doc : area === 'self' ? rootEl : rootEl.parentElement ?? rootEl;
            const leaveElement: EventTarget = area === 'window' ? doc.documentElement : targetElement;

            pointerListeners = [
                [targetElement, 'pointermove', onPointerMove as EventListener],
                [targetElement, 'pointerdown', onPointerDown as EventListener],
                [leaveElement, 'pointerleave', onPointerLeave as EventListener],
                [targetElement, 'pointercancel', onPointerLeave as EventListener],
            ];

            for (const [tgt, evt, handler] of pointerListeners) {
                tgt.addEventListener(evt, handler, { passive: true });
            }
        };

        const onFontsLoaded = () => {
            fontsReady = true;
            fontRevision += 1;
            updateWordGeometries();
            startAnimation();
            scheduleFrame();
        };

        const resizeObserver = new ResizeObserver(() => {
            if (updateWordGeometries()) {
                scheduleFrame();
            }
        });
        resizeObserver.observe(rootEl);

        const mutationObserver = new MutationObserver(() => {
            if (syncColors()) {
                scheduleFrame();
            }
        });
        mutationObserver.observe(doc.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'style', 'data-theme'],
        });

        const intersectionObserver =
            typeof IntersectionObserver === 'undefined'
                ? null
                : new IntersectionObserver(
                      ([entry]) => {
                          isVisibleOnScreen = entry.isIntersecting;
                          if (isVisibleOnScreen) {
                              startAnimation();
                              lastTime = 0;
                              scheduleFrame();
                          } else if (rafId) {
                              cancelAnimationFrame(rafId);
                              rafId = 0;
                          }
                      },
                      { rootMargin: '60px' }
                  );

        const onContextLost = (e: Event) => {
            e.preventDefault();
            isContextLost = true;
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = 0;
            }
        };

        const onContextRestored = () => {
            isContextLost = false;
            cacheKey = '';
            colorKey = '';
            syncColors();
            updateWordGeometries();
            scheduleFrame();
        };

        canvas.addEventListener('webglcontextlost', onContextLost);
        canvas.addEventListener('webglcontextrestored', onContextRestored);

        syncColors();
        attachPointer();
        updateWordGeometries();

        const docFonts = doc.fonts;
        if (docFonts) {
            docFonts.addEventListener('loadingdone', onFontsLoaded);
            docFonts.ready.then(() => {
                if (!isDestroyed) onFontsLoaded();
            });
        } else {
            fontsReady = true;
        }

        if (intersectionObserver) {
            intersectionObserver.observe(rootEl);
        } else {
            isVisibleOnScreen = true;
            startAnimation();
        }

        controllerRef.current = {
            sync: () => {
                attachPointer();
                syncColors();
                updateWordGeometries();
                startAnimation();
                scheduleFrame();
            },
            next: () => {
                forceNextWord = true;
                scheduleFrame();
            },
            replay: () => {
                targetWordIndex = 0;
                scheduleFrame();
            },
            destroy: () => {
                isDestroyed = true;
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = 0;
                }
                if (restartTimer) {
                    window.clearTimeout(restartTimer);
                }
                intersectionObserver?.disconnect();
                resizeObserver.disconnect();
                mutationObserver.disconnect();
                detachPointer();
                docFonts?.removeEventListener('loadingdone', onFontsLoaded);
                canvas.removeEventListener('webglcontextlost', onContextLost);
                canvas.removeEventListener('webglcontextrestored', onContextRestored);

                wordItems.forEach(disposeWordItem);
                wordItems = [];
                renderTargets.forEach((rt) => rt.dispose());
                planeGeom.dispose();
                emptyPointsGeom.dispose();
                simMesh.geometry.dispose();

                for (const l of layers) {
                    l.textMaterial.dispose();
                    l.particleMaterial.dispose();
                }

                simMaterial.dispose();
                renderer.dispose();
                if (!renderer.getContext().isContextLost()) {
                    renderer.forceContextLoss();
                }
                canvas.remove();
            },
        };

        return () => {
            controllerRef.current?.destroy();
            controllerRef.current = null;
        };
    }, [isReducedMotion]);

    useImperativeHandle(
        ref,
        () => ({
            next: () => controllerRef.current?.next(),
            replay: () => controllerRef.current?.replay(),
        }),
        []
    );

    const bleedPadding = Math.max(spread, 0) + 0.35;

    return (
        <Component
            ref={rootRef}
            className={cn('relative inline-block align-baseline', className)}
            style={style}
        >
            <span style={srOnlyStyle}>{sanitizedWords.join(', ')}</span>

            <span
                aria-hidden="true"
                style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'baseline',
                    verticalAlign: 'baseline',
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {/* Active word in normal flow dynamically sizes the container */}
                <span
                    style={{
                        visibility: 'hidden',
                        whiteSpace: 'nowrap',
                        userSelect: 'none',
                        pointerEvents: 'none',
                        display: 'inline-block',
                    }}
                >
                    {sanitizedWords[activeWordIdx]}
                </span>

                {/* All words positioned at 0 for offscreen WebGL glyph rasterization */}
                {sanitizedWords.map((word, idx) => (
                    <span
                        key={`${idx}:${word}`}
                        data-vapor-word=""
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            userSelect: 'none',
                            color: 'transparent',
                            opacity: isReducedMotion ? (idx === 0 ? 1 : 0) : 0,
                            visibility: isReducedMotion && idx > 0 ? 'hidden' : undefined,
                        }}
                    >
                        {word}
                    </span>
                ))}
            </span>

            {isReducedMotion ? null : (
                <span
                    ref={canvasContainerRef}
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: `-${bleedPadding}em`,
                        display: 'block',
                        pointerEvents: 'none',
                    }}
                />
            )}
        </Component>
    );
});

export default VaporType;
