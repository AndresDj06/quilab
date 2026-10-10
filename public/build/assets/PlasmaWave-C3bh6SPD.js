import{m as j,n as g,V as l,r as C,R as J,G as K,P as Q,M as Y,j as Z}from"./app-DCE8yDTk.js";const tt=new g,et=new l,ot=new l;class it extends j{constructor(t,{near:e=.1,far:o=100,fov:i=45,aspect:a=1,left:u,right:n,bottom:x,top:w,zoom:d=1}={}){super(),Object.assign(this,{near:e,far:o,fov:i,aspect:a,left:u,right:n,bottom:x,top:w,zoom:d}),this.projectionMatrix=new g,this.viewMatrix=new g,this.projectionViewMatrix=new g,this.worldPosition=new l,this.type=u||n?"orthographic":"perspective",this.type==="orthographic"?this.orthographic():this.perspective()}perspective({near:t=this.near,far:e=this.far,fov:o=this.fov,aspect:i=this.aspect}={}){return Object.assign(this,{near:t,far:e,fov:o,aspect:i}),this.projectionMatrix.fromPerspective({fov:o*(Math.PI/180),aspect:i,near:t,far:e}),this.type="perspective",this}orthographic({near:t=this.near,far:e=this.far,left:o=this.left||-1,right:i=this.right||1,bottom:a=this.bottom||-1,top:u=this.top||1,zoom:n=this.zoom}={}){return Object.assign(this,{near:t,far:e,left:o,right:i,bottom:a,top:u,zoom:n}),o/=n,i/=n,a/=n,u/=n,this.projectionMatrix.fromOrthogonal({left:o,right:i,bottom:a,top:u,near:t,far:e}),this.type="orthographic",this}updateMatrixWorld(){return super.updateMatrixWorld(),this.viewMatrix.inverse(this.worldMatrix),this.worldMatrix.getTranslation(this.worldPosition),this.projectionViewMatrix.multiply(this.projectionMatrix,this.viewMatrix),this}updateProjectionMatrix(){return this.type==="perspective"?this.perspective():this.orthographic()}lookAt(t){return super.lookAt(t,!0),this}project(t){return t.applyMatrix4(this.viewMatrix),t.applyMatrix4(this.projectionMatrix),this}unproject(t){return t.applyMatrix4(tt.inverse(this.projectionMatrix)),t.applyMatrix4(this.worldMatrix),this}updateFrustum(){this.frustum||(this.frustum=[new l,new l,new l,new l,new l,new l]);const t=this.projectionViewMatrix;this.frustum[0].set(t[3]-t[0],t[7]-t[4],t[11]-t[8]).constant=t[15]-t[12],this.frustum[1].set(t[3]+t[0],t[7]+t[4],t[11]+t[8]).constant=t[15]+t[12],this.frustum[2].set(t[3]+t[1],t[7]+t[5],t[11]+t[9]).constant=t[15]+t[13],this.frustum[3].set(t[3]-t[1],t[7]-t[5],t[11]-t[9]).constant=t[15]-t[13],this.frustum[4].set(t[3]-t[2],t[7]-t[6],t[11]-t[10]).constant=t[15]-t[14],this.frustum[5].set(t[3]+t[2],t[7]+t[6],t[11]+t[10]).constant=t[15]+t[14];for(let e=0;e<6;e++){const o=1/this.frustum[e].distance();this.frustum[e].multiply(o),this.frustum[e].constant*=o}}frustumIntersectsMesh(t,e=t.worldMatrix){if(!t.geometry.attributes.position||((!t.geometry.bounds||t.geometry.bounds.radius===1/0)&&t.geometry.computeBoundingSphere(),!t.geometry.bounds))return!0;const o=et;o.copy(t.geometry.bounds.center),o.applyMatrix4(e);const i=t.geometry.bounds.radius*e.getMaxScaleOnAxis();return this.frustumIntersectsSphere(o,i)}frustumIntersectsSphere(t,e){const o=ot;for(let i=0;i<6;i++){const a=this.frustum[i];if(o.copy(a).dot(t)+a.constant<-e)return!1}return!0}}function v(c){const t=c.startsWith("#")?c.slice(1):c,e=parseInt(t.slice(0,2),16)/255,o=parseInt(t.slice(2,4),16)/255,i=parseInt(t.slice(4,6),16)/255;return[isNaN(e)?0:e,isNaN(o)?0:o,isNaN(i)?0:i]}const rt=`
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,st=`
precision highp float;
uniform float iTime;
uniform vec2  iResolution;
uniform vec2  uOffset;
uniform float uRotation;
uniform float uFocalLength;
uniform float uSpeed1;
uniform float uSpeed2;
uniform float uDir2;
uniform float uBend1;
uniform float uBend2;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform float uLightMode;

const float lt   = 0.3;
const float pi   = 3.14159;
const float pi2  = 6.28318;
const float pi_2 = 1.5708;
#define MAX_STEPS 14

void mainImage(out vec4 C, in vec2 U) {
  float t = iTime * pi;
  float s = 1.0;
  float d = 0.0;
  vec2  R = iResolution;

  vec3 o = vec3(0.0, 0.0, -7.0);
  vec3 u = normalize(vec3((U - 0.5 * R) / R.y, uFocalLength));
  vec2 k = vec2(0.0);
  vec3 p;

  float t1 = t * 0.7;
  float t2 = t * 0.9;
  float tSpeed1 = t * uSpeed1;
  float tSpeed2 = t * uSpeed2 * uDir2;

  for (int i = 0; i < MAX_STEPS; ++i) {
    p = o + u * d;
    p.x -= 15.0;

    float px = p.x;
    float wob1 = uBend1 + sin(t1 + px * 0.8) * 0.1;
    float wob2 = uBend2 + cos(t2 + px * 1.1) * 0.1;

    float px2 = px + pi_2;
    vec2 sinOffset = sin(vec2(px, px2) + tSpeed1) * wob1;
    vec2 cosOffset = cos(vec2(px, px2) + tSpeed2) * wob2;

    vec2 yz = p.yz;
    float pxLt = px + lt;
    k.x = max(pxLt, length(yz - sinOffset) - lt);
    k.y = max(pxLt, length(yz - cosOffset) - lt);

    float current = min(k.x, k.y);
    s = min(s, current);
    if (s < 0.001 || d > 300.0) break;
    d += s * 0.7;
  }

  float sqrtD = sqrt(d);
  vec3 raw = max(cos(d * pi2) - s * sqrtD - vec3(k, 0.0), 0.0);
  float field = max(raw.r, max(raw.g, raw.b));
  float outerMask = smoothstep(0.0, 0.055, field);
  float glowMask = smoothstep(0.012, 0.13, field);
  float coreMask = smoothstep(0.075, 0.27, field);
  if (uLightMode < 0.5 && field < 0.15) discard;
  raw.gb += uLightMode > 0.5 ? 0.1 * glowMask : 0.1;
  raw = raw * 0.4 + raw.brg * 0.6 + raw * raw;
  float lum = dot(raw, vec3(0.299, 0.587, 0.114));
  float w1 = max(0.0, 1.0 - k.x * 2.0);
  float w2 = max(0.0, 1.0 - k.y * 2.0);
  float wt = w1 + w2 + 0.001;
  vec3 baseColor = (uColor1 * w1 + uColor2 * w2) / wt;
  vec3 c = baseColor * lum * 3.5;
  if (uLightMode > 0.5) {
    float lightW1 = exp(-max(k.x, 0.0) * 4.0);
    float lightW2 = exp(-max(k.y, 0.0) * 4.0);
    vec3 lightBase = (uColor1 * lightW1 + uColor2 * lightW2) / (lightW1 + lightW2 + 0.001);
    float lightLuma = dot(lightBase, vec3(0.299, 0.587, 0.114));
    vec3 vividColor = clamp(pow(max(mix(vec3(lightLuma), lightBase, 1.35), 0.0), vec3(0.64)) * 1.14, 0.0, 1.0);
    float colorPresence = clamp(outerMask * 0.34 + glowMask * 1.08 + coreMask * 0.22, 0.0, 1.0);
    vec3 lightColor = mix(vec3(1.0), vividColor, colorPresence);
    lightColor = mix(lightColor, vec3(1.0), coreMask * smoothstep(0.16, 0.95, lum) * 0.1);
    C = vec4(lightColor, 1.0);
  } else {
    C = vec4(c, 1.0);
  }
}

void main() {
  vec2 coord = gl_FragCoord.xy + uOffset;
  coord -= 0.5 * iResolution;
  float c = cos(uRotation), s = sin(uRotation);
  coord = mat2(c, -s, s, c) * coord;
  coord += 0.5 * iResolution;

  vec4 color;
  mainImage(color, coord);
  gl_FragColor = color;
}
`;function nt(c){const{xOffset:t=0,yOffset:e=0,rotationDeg:o=0,focalLength:i=.8,speed1:a=.05,speed2:u=.05,dir2:n=1,bend1:x=1,bend2:w=.5,colors:d=["#A855F7","#06B6D4"],lightMode:F=!1,className:A="",style:D}=c,R=C.useRef(c);R.current=c;const k=C.useRef(null);return C.useEffect(()=>{const f=k.current;if(!f)return;const p=new J({alpha:!0,dpr:Math.min(window.devicePixelRatio||1,1.5),antialias:!0,depth:!1,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"}),r=p.gl;r.clearColor(0,0,0,0),f.appendChild(r.canvas);const I=new it(r),B=new j,W=new K(r,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])}}),M=new Float32Array([t,e]),y=new Float32Array([1,1]),T=v(d[0]||"#A855F7"),N=v(d[1]||"#06B6D4"),s=new Q(r,{vertex:rt,fragment:st,uniforms:{iTime:{value:0},iResolution:{value:y},uOffset:{value:M},uRotation:{value:o*Math.PI/180},uFocalLength:{value:i},uSpeed1:{value:a},uSpeed2:{value:u},uDir2:{value:n},uBend1:{value:x},uBend2:{value:w},uColor1:{value:T},uColor2:{value:N},uLightMode:{value:F?1:0}}});new Y(r,{geometry:W,program:s}).setParent(B);function L(){if(!f)return;const{width:h,height:m}=f.getBoundingClientRect();h===0||m===0||(p.setSize(h,m),y[0]=h*p.dpr,y[1]=m*p.dpr,r.viewport(0,0,r.drawingBufferWidth,r.drawingBufferHeight))}const S=new ResizeObserver(L);S.observe(f),L();const _=performance.now();let b;const O=h=>{const{xOffset:m=0,yOffset:E=0,rotationDeg:V=0,focalLength:z=.8,speed1:q=.05,speed2:G=.05,dir2:U=1,bend1:X=1,bend2:H=.5,colors:P=["#A855F7","#06B6D4"],lightMode:$=!1}=R.current;M[0]=m,M[1]=E,s.uniforms.iTime.value=(h-_)*.001,s.uniforms.uRotation.value=V*Math.PI/180,s.uniforms.uFocalLength.value=z,s.uniforms.uSpeed1.value=q,s.uniforms.uSpeed2.value=G,s.uniforms.uDir2.value=U,s.uniforms.uBend1.value=X,s.uniforms.uBend2.value=H,s.uniforms.uColor1.value=v(P[0]||"#A855F7"),s.uniforms.uColor2.value=v(P[1]||"#06B6D4"),s.uniforms.uLightMode.value=$?1:0,p.render({scene:B,camera:I}),b=requestAnimationFrame(O)};return b=requestAnimationFrame(O),()=>{cancelAnimationFrame(b),S.disconnect(),f&&r.canvas.parentNode===f&&f.removeChild(r.canvas),r.getExtension("WEBGL_lose_context")?.loseContext()}},[]),Z.jsx("div",{ref:k,className:`plasma-wave-container ${A}`,style:D})}export{nt as P};
