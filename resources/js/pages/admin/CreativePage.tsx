import React, { useState } from 'react';
import { useCreative } from '@/context/CreativeContext';
import { useToast } from '@/context/ToastContext';
import { PlasmaWave } from '@/components/PlasmaWave';
import { DarkVeil } from '@/components/DarkVeil';
import GlowCursor from '@/components/GlowCursor';
import VaporType from '@/components/VaporType';
import { 
    RotateCcw, 
    Sparkles, 
    Save, 
    Eye, 
    Layers, 
    Code2, 
    Copy, 
    Check, 
    SlidersHorizontal,
    ExternalLink,
    Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

type CreativeTab = 'plasmaWave' | 'darkVeil' | 'glowCursor' | 'vaporType' | 'heroGrid';

export default function CreativePage() {
    const { config, updateModule, resetModule, resetAll, saveConfig } = useCreative();
    const toast = useToast();
    const [activeTab, setActiveTab] = useState<CreativeTab>('plasmaWave');
    const [copied, setCopied] = useState(false);
    const [previewMode, setPreviewMode] = useState<'split' | 'canvas' | 'controls'>('split');

    const handleSave = () => {
        saveConfig();
        toast.push('Configuración de personalización guardada correctamente', 'success');
    };

    const handleResetCurrent = () => {
        resetModule(activeTab);
        toast.push(`Módulo ${activeTab} restablecido a sus valores por defecto`, 'info');
    };

    const copyCodeSnippet = () => {
        let code = '';
        if (activeTab === 'plasmaWave') {
            code = `<PlasmaWave
  colors={["${config.plasmaWave.color1}", "${config.plasmaWave.color2}"]}
  speed1={${config.plasmaWave.warpSpeed * 0.025}}
  speed2={${config.plasmaWave.timeSpeed * 0.01}}
  focalLength={${config.plasmaWave.zoom}}
  bend1={${config.plasmaWave.warpStrength}}
  bend2={${config.plasmaWave.blendSoftness * 10}}
  dir2={1.0}
  rotationDeg={${config.plasmaWave.rotationAmount}}
/>`;
        } else if (activeTab === 'darkVeil') {
            code = `<DarkVeil
  hueShift={${config.darkVeil.hueShift}}
  speed={${config.darkVeil.speed}}
  scanlineFrequency={${config.darkVeil.scanlineFrequency}}
  warpAmount={${config.darkVeil.warpAmount}}
  noiseIntensity={${config.darkVeil.noiseIntensity}}
  scanlineIntensity={${config.darkVeil.scanlineIntensity}}
/>`;
        } else if (activeTab === 'glowCursor') {
            code = `<GlowCursor
  color="${config.glowCursor.color1}"
  secondaryColor="${config.glowCursor.color2}"
  trailLength={${config.glowCursor.trailLength}}
  trailWidth={${config.glowCursor.trailWidth}}
  trailTaper={${config.glowCursor.trailTaper}}
  followSpeed={${config.glowCursor.followSpeed}}
  glowIntensity={${config.glowCursor.glowIntensity}}
  glowSpread={${config.glowCursor.glowSpread}}
  brightness={${config.glowCursor.brightness}}
  pulseSpeed={${config.glowCursor.pulseSpeed}}
  idleFade={${config.glowCursor.idleFade}}
/>`;
        } else if (activeTab === 'vaporType') {
            code = `<VaporType
  words={["alto impacto", "gran alcance", "alto rendimiento", "gran valor"]}
  color="${config.vaporType.color}"
  vaporColor="${config.vaporType.vaporColor}"
  density={${config.vaporType.density}}
  turbulence={${config.vaporType.turbulence}}
  spread={${config.vaporType.spread}}
  rise={${config.vaporType.rise}}
  condense={${config.vaporType.condense}}
  hold={${config.vaporType.hold}}
  dissolve={${config.vaporType.dissolve}}
/>`;
        }

        navigator.clipboard.writeText(code);
        setCopied(true);
        toast.push('Código JSX copiado al portapapeles');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-sky-600 font-bold">
                            05 // ESTUDIO DE PERSONALIZACIÓN
                        </span>
                        <span className="rounded-full bg-purple-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-purple-700">
                            React Bits Studio
                        </span>
                    </div>
                    <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Creative Studio
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Controla los shaders WebGL, partículas y efectos interactivos de reactbits.dev desplegados en QUILAB.
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        onClick={copyCodeSnippet}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3.5 py-2 text-xs font-mono font-medium text-slate-700 shadow-xs hover:bg-slate-50 transition-all"
                        title="Copiar props en formato JSX"
                    >
                        {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        <span>{copied ? 'Copiado' : 'Copiar JSX'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#050610] px-4 py-2 text-xs font-mono font-medium text-white shadow-md hover:bg-slate-900 transition-all"
                    >
                        <Save size={14} />
                        <span>Guardar Cambios</span>
                    </button>
                </div>
            </div>

            {/* Navigation Tabs between Modules */}
            <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
                {[
                    { id: 'plasmaWave', label: 'PlasmaWave (Shader WebGL)', icon: Sparkles },
                    { id: 'darkVeil', label: 'DarkVeil (Fondo Proyectos)', icon: Sparkles },
                    { id: 'glowCursor', label: 'GlowCursor (Puntero Reactivo)', icon: Eye },
                    { id: 'vaporType', label: 'VaporType (Condensación de Texto)', icon: Code2 },
                    { id: 'heroGrid', label: 'HeroGrid (Matriz y Conexiones)', icon: Layers },
                ].map((tab) => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id as CreativeTab)}
                            className={cn(
                                'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono font-medium transition-all',
                                active
                                    ? 'bg-[#050610] text-white shadow-sm'
                                    : 'bg-white border border-border text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                            )}
                        >
                            <Icon size={14} className={active ? 'text-sky-400' : 'text-slate-400'} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Live Interactive Preview Canvas */}
            <div className="overflow-hidden rounded-2xl border border-border bg-slate-950 shadow-md">
                <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-2.5 text-xs text-white">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-sky-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>PREVISUALIZACIÓN EN VIVO // {activeTab.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-400">Renderizador Reactivo</span>
                    </div>
                </div>

                <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#050610] flex items-center justify-center">
                    {activeTab === 'plasmaWave' && (
                        <div className="absolute inset-0">
                            <PlasmaWave
                                colors={[config.plasmaWave.color1, config.plasmaWave.color2]}
                                speed1={config.plasmaWave.warpSpeed * 0.025}
                                speed2={config.plasmaWave.timeSpeed * 0.01}
                                focalLength={config.plasmaWave.zoom}
                                bend1={config.plasmaWave.warpStrength}
                                bend2={config.plasmaWave.blendSoftness * 10}
                                dir2={1.0}
                                rotationDeg={config.plasmaWave.rotationAmount}
                                lightMode={config.plasmaWave.lightMode}
                            />
                        </div>
                    )}

                    {activeTab === 'darkVeil' && (
                        <div className="absolute inset-0">
                            <DarkVeil
                                hueShift={config.darkVeil.hueShift}
                                speed={config.darkVeil.speed}
                                scanlineFrequency={config.darkVeil.scanlineFrequency}
                                warpAmount={config.darkVeil.warpAmount}
                                noiseIntensity={config.darkVeil.noiseIntensity}
                                scanlineIntensity={config.darkVeil.scanlineIntensity}
                                resolutionScale={config.darkVeil.resolutionScale}
                                lightMode={config.darkVeil.lightMode}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                                <span className="font-mono text-xs uppercase tracking-widest text-sky-400 bg-black/60 px-3.5 py-1.5 rounded-full border border-sky-500/30 backdrop-blur-sm">
                                    INFRAESTRUCTURA DE PROYECTOS // DARKVEIL SHADER
                                </span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'glowCursor' && (
                        <div className="relative z-10 flex h-full w-full items-center justify-center p-8 text-center">
                            <GlowCursor
                                color={config.glowCursor.color1}
                                secondaryColor={config.glowCursor.color2}
                                trailLength={config.glowCursor.trailLength}
                                trailWidth={config.glowCursor.trailWidth}
                                trailTaper={config.glowCursor.trailTaper}
                                followSpeed={config.glowCursor.followSpeed}
                                glowIntensity={config.glowCursor.glowIntensity}
                                glowSpread={config.glowCursor.glowSpread}
                                brightness={config.glowCursor.brightness}
                                pulseSpeed={config.glowCursor.pulseSpeed}
                                idleFade={config.glowCursor.idleFade}
                                idleTimeout={config.glowCursor.idleTimeout}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="rounded-xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-md">
                                    <p className="font-display text-xl text-white">Pasa el cursor por este recuadro</p>
                                    <p className="mt-1 text-xs font-mono text-sky-400">
                                        Observa el rastro y la estela luminosa
                                    </p>
                                </div>
                            </GlowCursor>
                        </div>
                    )}

                    {activeTab === 'vaporType' && (
                        <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
                            <p className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-3">
                                Efecto de Condensación de Vapor
                            </p>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                                Construimos software de{' '}
                                <VaporType
                                    words={['alto impacto', 'gran alcance', 'alto rendimiento', 'gran valor']}
                                    color={config.vaporType.color}
                                    vaporColor={config.vaporType.vaporColor}
                                    density={config.vaporType.density}
                                    turbulence={config.vaporType.turbulence}
                                    spread={config.vaporType.spread}
                                    rise={config.vaporType.rise}
                                    condense={config.vaporType.condense}
                                    hold={config.vaporType.hold}
                                    dissolve={config.vaporType.dissolve}
                                    className="font-bold text-sky-400"
                                />
                            </h2>
                        </div>
                    )}

                    {activeTab === 'heroGrid' && (
                        <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center text-white">
                            <Layers className="opacity-40 text-sky-400 mb-2" size={40} />
                            <p className="font-display text-2xl font-bold">Matriz de Conexiones</p>
                            <p className="text-xs font-mono text-slate-400 mt-1">
                                Red cibernética procedural activa en el Hero
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* The React Bits "Customize" Panel */}
            <div className="rounded-2xl border border-[#222430] bg-[#0c0d12] p-5 sm:p-7 text-white shadow-2xl">
                {/* Header matching React Bits style */}
                <div className="flex items-center justify-between pb-5 border-b border-[#1f212d] mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="font-sans text-lg font-semibold tracking-wide text-white">
                            Customize
                        </h2>
                        <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">
                            // {activeTab}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleResetCurrent}
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <RotateCcw size={13} />
                            <span>Reset</span>
                        </button>

                        <a
                            href="https://reactbits.dev"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors"
                        >
                            <span>Open in reactbits.dev</span>
                            <ExternalLink size={12} />
                        </a>
                    </div>
                </div>

                {/* 3-Column Control Matrix (Exact format from user screenshot) */}
                {activeTab === 'plasmaWave' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
                        {/* Row 1: Colors */}
                        <ColorControl
                            label="Color 1"
                            value={config.plasmaWave.color1}
                            onChange={(val) => updateModule('plasmaWave', { color1: val })}
                        />
                        <ColorControl
                            label="Color 2"
                            value={config.plasmaWave.color2}
                            onChange={(val) => updateModule('plasmaWave', { color2: val })}
                        />
                        <ColorControl
                            label="Color 3"
                            value={config.plasmaWave.color3}
                            onChange={(val) => updateModule('plasmaWave', { color3: val })}
                        />

                        {/* Row 2: Speeds and Warps */}
                        <SliderControl
                            label="Time Speed"
                            value={config.plasmaWave.timeSpeed}
                            min={0.1}
                            max={15}
                            step={0.1}
                            onChange={(val) => updateModule('plasmaWave', { timeSpeed: val })}
                        />
                        <SliderControl
                            label="Color Balance"
                            value={config.plasmaWave.colorBalance}
                            min={0.01}
                            max={1}
                            step={0.01}
                            onChange={(val) => updateModule('plasmaWave', { colorBalance: val })}
                        />
                        <SliderControl
                            label="Warp Strength"
                            value={config.plasmaWave.warpStrength}
                            min={0}
                            max={2}
                            step={0.05}
                            onChange={(val) => updateModule('plasmaWave', { warpStrength: val })}
                        />

                        {/* Row 3 */}
                        <SliderControl
                            label="Warp Frequency"
                            value={config.plasmaWave.warpFrequency}
                            min={1}
                            max={20}
                            step={0.1}
                            onChange={(val) => updateModule('plasmaWave', { warpFrequency: val })}
                        />
                        <SliderControl
                            label="Warp Speed"
                            value={config.plasmaWave.warpSpeed}
                            min={0.1}
                            max={10}
                            step={0.1}
                            onChange={(val) => updateModule('plasmaWave', { warpSpeed: val })}
                        />
                        <SliderControl
                            label="Warp Amplitude"
                            value={config.plasmaWave.warpAmplitude}
                            min={5}
                            max={100}
                            step={1}
                            onChange={(val) => updateModule('plasmaWave', { warpAmplitude: val })}
                        />

                        {/* Row 4 */}
                        <SliderControl
                            label="Blend Angle"
                            value={config.plasmaWave.blendAngle}
                            min={-180}
                            max={180}
                            step={1}
                            onChange={(val) => updateModule('plasmaWave', { blendAngle: val })}
                        />
                        <SliderControl
                            label="Blend Softness"
                            value={config.plasmaWave.blendSoftness}
                            min={0.01}
                            max={0.5}
                            step={0.01}
                            onChange={(val) => updateModule('plasmaWave', { blendSoftness: val })}
                        />
                        <SliderControl
                            label="Rotation Amount"
                            value={config.plasmaWave.rotationAmount}
                            min={-180}
                            max={180}
                            step={5}
                            onChange={(val) => updateModule('plasmaWave', { rotationAmount: val })}
                        />

                        {/* Row 5 */}
                        <SliderControl
                            label="Noise Scale"
                            value={config.plasmaWave.noiseScale}
                            min={0}
                            max={10}
                            step={0.5}
                            onChange={(val) => updateModule('plasmaWave', { noiseScale: val })}
                        />
                        <SliderControl
                            label="Grain Amount"
                            value={config.plasmaWave.grainAmount}
                            min={0}
                            max={1}
                            step={0.05}
                            onChange={(val) => updateModule('plasmaWave', { grainAmount: val })}
                        />
                        <SliderControl
                            label="Grain Scale"
                            value={config.plasmaWave.grainScale}
                            min={0.5}
                            max={5}
                            step={0.5}
                            onChange={(val) => updateModule('plasmaWave', { grainScale: val })}
                        />

                        {/* Row 6 */}
                        <ToggleControl
                            label="Grain Animated"
                            value={config.plasmaWave.grainAnimated}
                            onChange={(val) => updateModule('plasmaWave', { grainAnimated: val })}
                        />
                        <SliderControl
                            label="Contrast"
                            value={config.plasmaWave.contrast}
                            min={0.5}
                            max={3}
                            step={0.1}
                            onChange={(val) => updateModule('plasmaWave', { contrast: val })}
                        />
                        <SliderControl
                            label="Gamma"
                            value={config.plasmaWave.gamma}
                            min={0.2}
                            max={2.5}
                            step={0.1}
                            onChange={(val) => updateModule('plasmaWave', { gamma: val })}
                        />

                        {/* Row 7 */}
                        <SliderControl
                            label="Saturation"
                            value={config.plasmaWave.saturation}
                            min={0}
                            max={2}
                            step={0.05}
                            onChange={(val) => updateModule('plasmaWave', { saturation: val })}
                        />
                        <SliderControl
                            label="Center Offset X"
                            value={config.plasmaWave.centerOffsetX}
                            min={-100}
                            max={100}
                            step={1}
                            onChange={(val) => updateModule('plasmaWave', { centerOffsetX: val })}
                        />
                        <SliderControl
                            label="Center Offset Y"
                            value={config.plasmaWave.centerOffsetY}
                            min={-100}
                            max={100}
                            step={1}
                            onChange={(val) => updateModule('plasmaWave', { centerOffsetY: val })}
                        />

                        {/* Row 8 */}
                        <SliderControl
                            label="Zoom"
                            value={config.plasmaWave.zoom}
                            min={0.2}
                            max={2.5}
                            step={0.05}
                            onChange={(val) => updateModule('plasmaWave', { zoom: val })}
                        />
                        <ToggleControl
                            label="Light Mode"
                            value={config.plasmaWave.lightMode}
                            onChange={(val) => updateModule('plasmaWave', { lightMode: val })}
                        />
                    </div>
                )}

                {/* DarkVeil Controls */}
                {activeTab === 'darkVeil' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
                        <SliderControl
                            label="Hue Shift"
                            value={config.darkVeil.hueShift}
                            min={0}
                            max={360}
                            step={1}
                            onChange={(val) => updateModule('darkVeil', { hueShift: val })}
                        />
                        <SliderControl
                            label="Speed"
                            value={config.darkVeil.speed}
                            min={0.1}
                            max={3.0}
                            step={0.05}
                            onChange={(val) => updateModule('darkVeil', { speed: val })}
                        />
                        <SliderControl
                            label="Scanline Freq"
                            value={config.darkVeil.scanlineFrequency}
                            min={0}
                            max={10}
                            step={0.1}
                            onChange={(val) => updateModule('darkVeil', { scanlineFrequency: val })}
                        />
                        <SliderControl
                            label="Warp Amount"
                            value={config.darkVeil.warpAmount}
                            min={0}
                            max={10}
                            step={0.1}
                            onChange={(val) => updateModule('darkVeil', { warpAmount: val })}
                        />
                        <SliderControl
                            label="Noise Intensity"
                            value={config.darkVeil.noiseIntensity}
                            min={0}
                            max={0.5}
                            step={0.01}
                            onChange={(val) => updateModule('darkVeil', { noiseIntensity: val })}
                        />
                        <SliderControl
                            label="Scanline Intensity"
                            value={config.darkVeil.scanlineIntensity}
                            min={0}
                            max={1.0}
                            step={0.05}
                            onChange={(val) => updateModule('darkVeil', { scanlineIntensity: val })}
                        />
                        <SliderControl
                            label="Resolution Scale"
                            value={config.darkVeil.resolutionScale}
                            min={0.5}
                            max={2.0}
                            step={0.1}
                            onChange={(val) => updateModule('darkVeil', { resolutionScale: val })}
                        />
                        <ToggleControl
                            label="Light Mode"
                            value={config.darkVeil.lightMode}
                            onChange={(val) => updateModule('darkVeil', { lightMode: val })}
                        />
                    </div>
                )}

                {/* GlowCursor Controls */}
                {activeTab === 'glowCursor' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
                        <ColorControl
                            label="Primary Color"
                            value={config.glowCursor.color1}
                            onChange={(val) => updateModule('glowCursor', { color1: val })}
                        />
                        <ColorControl
                            label="Secondary Color"
                            value={config.glowCursor.color2}
                            onChange={(val) => updateModule('glowCursor', { color2: val })}
                        />
                        <SliderControl
                            label="Trail Length"
                            value={config.glowCursor.trailLength}
                            min={10}
                            max={100}
                            step={2}
                            onChange={(val) => updateModule('glowCursor', { trailLength: val })}
                        />
                        <SliderControl
                            label="Trail Width"
                            value={config.glowCursor.trailWidth}
                            min={2}
                            max={24}
                            step={1}
                            onChange={(val) => updateModule('glowCursor', { trailWidth: val })}
                        />
                        <SliderControl
                            label="Trail Taper"
                            value={config.glowCursor.trailTaper}
                            min={0.1}
                            max={1.0}
                            step={0.05}
                            onChange={(val) => updateModule('glowCursor', { trailTaper: val })}
                        />
                        <SliderControl
                            label="Follow Speed"
                            value={config.glowCursor.followSpeed}
                            min={0.05}
                            max={0.5}
                            step={0.01}
                            onChange={(val) => updateModule('glowCursor', { followSpeed: val })}
                        />
                        <SliderControl
                            label="Glow Intensity"
                            value={config.glowCursor.glowIntensity}
                            min={0.5}
                            max={4.0}
                            step={0.1}
                            onChange={(val) => updateModule('glowCursor', { glowIntensity: val })}
                        />
                        <SliderControl
                            label="Glow Spread"
                            value={config.glowCursor.glowSpread}
                            min={0.2}
                            max={3.0}
                            step={0.1}
                            onChange={(val) => updateModule('glowCursor', { glowSpread: val })}
                        />
                        <SliderControl
                            label="Brightness"
                            value={config.glowCursor.brightness}
                            min={0.5}
                            max={2.5}
                            step={0.05}
                            onChange={(val) => updateModule('glowCursor', { brightness: val })}
                        />
                        <SliderControl
                            label="Pulse Speed"
                            value={config.glowCursor.pulseSpeed}
                            min={0.1}
                            max={3.0}
                            step={0.1}
                            onChange={(val) => updateModule('glowCursor', { pulseSpeed: val })}
                        />
                        <ToggleControl
                            label="Idle Fade"
                            value={config.glowCursor.idleFade}
                            onChange={(val) => updateModule('glowCursor', { idleFade: val })}
                        />
                    </div>
                )}

                {/* VaporType Controls */}
                {activeTab === 'vaporType' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
                        <ColorControl
                            label="Text Color"
                            value={config.vaporType.color}
                            onChange={(val) => updateModule('vaporType', { color: val })}
                        />
                        <ColorControl
                            label="Vapor Color"
                            value={config.vaporType.vaporColor}
                            onChange={(val) => updateModule('vaporType', { vaporColor: val })}
                        />
                        <SliderControl
                            label="Density"
                            value={config.vaporType.density}
                            min={0.5}
                            max={3.0}
                            step={0.1}
                            onChange={(val) => updateModule('vaporType', { density: val })}
                        />
                        <SliderControl
                            label="Turbulence"
                            value={config.vaporType.turbulence}
                            min={0.1}
                            max={2.0}
                            step={0.1}
                            onChange={(val) => updateModule('vaporType', { turbulence: val })}
                        />
                        <SliderControl
                            label="Spread"
                            value={config.vaporType.spread}
                            min={0.5}
                            max={3.0}
                            step={0.1}
                            onChange={(val) => updateModule('vaporType', { spread: val })}
                        />
                        <SliderControl
                            label="Rise"
                            value={config.vaporType.rise}
                            min={0.2}
                            max={2.5}
                            step={0.1}
                            onChange={(val) => updateModule('vaporType', { rise: val })}
                        />
                        <SliderControl
                            label="Condense Time"
                            value={config.vaporType.condense}
                            min={0.5}
                            max={4.0}
                            step={0.1}
                            onChange={(val) => updateModule('vaporType', { condense: val })}
                        />
                        <SliderControl
                            label="Hold Time"
                            value={config.vaporType.hold}
                            min={1.0}
                            max={5.0}
                            step={0.2}
                            onChange={(val) => updateModule('vaporType', { hold: val })}
                        />
                        <SliderControl
                            label="Dissolve Time"
                            value={config.vaporType.dissolve}
                            min={0.5}
                            max={4.0}
                            step={0.1}
                            onChange={(val) => updateModule('vaporType', { dissolve: val })}
                        />
                    </div>
                )}

                {/* HeroGrid Controls */}
                {activeTab === 'heroGrid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
                        <ColorControl
                            label="Node Color"
                            value={config.heroGrid.nodeColor}
                            onChange={(val) => updateModule('heroGrid', { nodeColor: val })}
                        />
                        <ColorControl
                            label="Line Color"
                            value={config.heroGrid.lineColor}
                            onChange={(val) => updateModule('heroGrid', { lineColor: val })}
                        />
                        <SliderControl
                            label="Grid Size"
                            value={config.heroGrid.gridSize}
                            min={20}
                            max={80}
                            step={2}
                            onChange={(val) => updateModule('heroGrid', { gridSize: val })}
                        />
                        <SliderControl
                            label="Glow Intensity"
                            value={config.heroGrid.glowIntensity}
                            min={0.1}
                            max={1.0}
                            step={0.05}
                            onChange={(val) => updateModule('heroGrid', { glowIntensity: val })}
                        />
                        <SliderControl
                            label="Radius Interaction"
                            value={config.heroGrid.interactionRadius}
                            min={100}
                            max={400}
                            step={10}
                            onChange={(val) => updateModule('heroGrid', { interactionRadius: val })}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

// Subcomponents matching the exact React Bits "Customize" visual design

function ColorControl({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
}) {
    return (
        <div className="group flex items-center justify-between rounded-xl border border-[#232636] bg-[#141620] px-4 py-3 transition-colors hover:border-[#33374d]">
            <span className="text-xs font-medium text-slate-300">{label}</span>
            <div className="flex items-center gap-2">
                <label className="relative flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-white/20 shadow-inner">
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                    />
                    <span className="h-full w-full" style={{ backgroundColor: value }} />
                </label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-20 rounded border border-white/10 bg-black/40 px-2 py-0.5 text-center font-mono text-xs text-white uppercase focus:border-sky-500 focus:outline-none"
                />
            </div>
        </div>
    );
}

function SliderControl({
    label,
    value,
    min,
    max,
    step,
    onChange,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (val: number) => void;
}) {
    return (
        <div className="group flex items-center justify-between gap-3.5 rounded-xl border border-[#232636] bg-[#141620] px-4 py-3 transition-colors hover:border-[#33374d]">
            <span className="text-xs font-medium text-slate-300 shrink-0 min-w-[90px]">{label}</span>
            <div className="flex items-center gap-3 w-full">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#272a3b] accent-sky-400 focus:outline-none"
                />
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => {
                        const num = parseFloat(e.target.value);
                        if (!isNaN(num)) onChange(num);
                    }}
                    className="w-14 shrink-0 rounded border border-white/10 bg-black/40 px-1.5 py-0.5 text-right font-mono text-xs text-white focus:border-sky-500 focus:outline-none"
                />
            </div>
        </div>
    );
}

function ToggleControl({
    label,
    value,
    onChange,
}: {
    label: string;
    value: boolean;
    onChange: (val: boolean) => void;
}) {
    return (
        <div className="group flex items-center justify-between rounded-xl border border-[#232636] bg-[#141620] px-4 py-3 transition-colors hover:border-[#33374d]">
            <span className="text-xs font-medium text-slate-300">{label}</span>
            <button
                type="button"
                role="switch"
                aria-checked={value}
                onClick={() => onChange(!value)}
                className={cn(
                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                    value ? 'bg-sky-500' : 'bg-slate-700'
                )}
            >
                <span
                    className={cn(
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
                        value ? 'translate-x-5' : 'translate-x-0'
                    )}
                />
            </button>
        </div>
    );
}
