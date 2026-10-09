import{c as O,f as z,g as j,V as d,r as w,R as te,G as se,P as ae,M as re,j as t,h as oe,i as ie,N as ne,k as le,L as ce,B as ue,e as de}from"./app-IS7tKxCb.js";import{B as pe}from"./button-DXdbi6jq.js";import{F as P,I as F}from"./input-Ce6wb7Av.js";import{S as me}from"./Seo-C5j9fQD0.js";import{S as fe}from"./shield-check-DobtSEY_.js";/* empty css            */const D={name:"arrow-left",size:24,node:[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]};D.node;const xe=O(D);const _={name:"lock",size:24,node:[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]};_.node;const he=O(_),ge=new j,ve=new d,we=new d;class be extends z{constructor(e,{near:s=.1,far:a=100,fov:r=45,aspect:o=1,left:n,right:i,bottom:x,top:f,zoom:m=1}={}){super(),Object.assign(this,{near:s,far:a,fov:r,aspect:o,left:n,right:i,bottom:x,top:f,zoom:m}),this.projectionMatrix=new j,this.viewMatrix=new j,this.projectionViewMatrix=new j,this.worldPosition=new d,this.type=n||i?"orthographic":"perspective",this.type==="orthographic"?this.orthographic():this.perspective()}perspective({near:e=this.near,far:s=this.far,fov:a=this.fov,aspect:r=this.aspect}={}){return Object.assign(this,{near:e,far:s,fov:a,aspect:r}),this.projectionMatrix.fromPerspective({fov:a*(Math.PI/180),aspect:r,near:e,far:s}),this.type="perspective",this}orthographic({near:e=this.near,far:s=this.far,left:a=this.left||-1,right:r=this.right||1,bottom:o=this.bottom||-1,top:n=this.top||1,zoom:i=this.zoom}={}){return Object.assign(this,{near:e,far:s,left:a,right:r,bottom:o,top:n,zoom:i}),a/=i,r/=i,o/=i,n/=i,this.projectionMatrix.fromOrthogonal({left:a,right:r,bottom:o,top:n,near:e,far:s}),this.type="orthographic",this}updateMatrixWorld(){return super.updateMatrixWorld(),this.viewMatrix.inverse(this.worldMatrix),this.worldMatrix.getTranslation(this.worldPosition),this.projectionViewMatrix.multiply(this.projectionMatrix,this.viewMatrix),this}updateProjectionMatrix(){return this.type==="perspective"?this.perspective():this.orthographic()}lookAt(e){return super.lookAt(e,!0),this}project(e){return e.applyMatrix4(this.viewMatrix),e.applyMatrix4(this.projectionMatrix),this}unproject(e){return e.applyMatrix4(ge.inverse(this.projectionMatrix)),e.applyMatrix4(this.worldMatrix),this}updateFrustum(){this.frustum||(this.frustum=[new d,new d,new d,new d,new d,new d]);const e=this.projectionViewMatrix;this.frustum[0].set(e[3]-e[0],e[7]-e[4],e[11]-e[8]).constant=e[15]-e[12],this.frustum[1].set(e[3]+e[0],e[7]+e[4],e[11]+e[8]).constant=e[15]+e[12],this.frustum[2].set(e[3]+e[1],e[7]+e[5],e[11]+e[9]).constant=e[15]+e[13],this.frustum[3].set(e[3]-e[1],e[7]-e[5],e[11]-e[9]).constant=e[15]-e[13],this.frustum[4].set(e[3]-e[2],e[7]-e[6],e[11]-e[10]).constant=e[15]-e[14],this.frustum[5].set(e[3]+e[2],e[7]+e[6],e[11]+e[10]).constant=e[15]+e[14];for(let s=0;s<6;s++){const a=1/this.frustum[s].distance();this.frustum[s].multiply(a),this.frustum[s].constant*=a}}frustumIntersectsMesh(e,s=e.worldMatrix){if(!e.geometry.attributes.position||((!e.geometry.bounds||e.geometry.bounds.radius===1/0)&&e.geometry.computeBoundingSphere(),!e.geometry.bounds))return!0;const a=ve;a.copy(e.geometry.bounds.center),a.applyMatrix4(s);const r=e.geometry.bounds.radius*s.getMaxScaleOnAxis();return this.frustumIntersectsSphere(a,r)}frustumIntersectsSphere(e,s){const a=we;for(let r=0;r<6;r++){const o=this.frustum[r];if(a.copy(o).dot(e)+o.constant<-s)return!1}return!0}}function b(u){const e=u.startsWith("#")?u.slice(1):u,s=parseInt(e.slice(0,2),16)/255,a=parseInt(e.slice(2,4),16)/255,r=parseInt(e.slice(4,6),16)/255;return[isNaN(s)?0:s,isNaN(a)?0:a,isNaN(r)?0:r]}const je=`
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,ye=`
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
`;function Ne(u){const{xOffset:e=0,yOffset:s=0,rotationDeg:a=0,focalLength:r=.8,speed1:o=.05,speed2:n=.05,dir2:i=1,bend1:x=1,bend2:f=.5,colors:m=["#A855F7","#06B6D4"],lightMode:y=!1,className:E="",style:T}=u,k=w.useRef(u);k.current=u;const S=w.useRef(null);return w.useEffect(()=>{const p=S.current;if(!p)return;const h=new te({alpha:!0,dpr:Math.min(window.devicePixelRatio||1,1.5),antialias:!0,depth:!1,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"}),l=h.gl;l.clearColor(0,0,0,0),p.appendChild(l.canvas);const W=new be(l),L=new z,V=new se(l,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])}}),N=new Float32Array([e,s]),M=new Float32Array([1,1]),q=b(m[0]||"#A855F7"),U=b(m[1]||"#06B6D4"),c=new ae(l,{vertex:je,fragment:ye,uniforms:{iTime:{value:0},iResolution:{value:M},uOffset:{value:N},uRotation:{value:a*Math.PI/180},uFocalLength:{value:r},uSpeed1:{value:o},uSpeed2:{value:n},uDir2:{value:i},uBend1:{value:x},uBend2:{value:f},uColor1:{value:q},uColor2:{value:U},uLightMode:{value:y?1:0}}});new re(l,{geometry:V,program:c}).setParent(L);function A(){if(!p)return;const{width:g,height:v}=p.getBoundingClientRect();g===0||v===0||(h.setSize(g,v),M[0]=g*h.dpr,M[1]=v*h.dpr,l.viewport(0,0,l.drawingBufferWidth,l.drawingBufferHeight))}const B=new ResizeObserver(A);B.observe(p),A();const G=performance.now();let C;const R=g=>{const{xOffset:v=0,yOffset:Q=0,rotationDeg:H=0,focalLength:X=.8,speed1:$=.05,speed2:J=.05,dir2:K=1,bend1:Y=1,bend2:Z=.5,colors:I=["#A855F7","#06B6D4"],lightMode:ee=!1}=k.current;N[0]=v,N[1]=Q,c.uniforms.iTime.value=(g-G)*.001,c.uniforms.uRotation.value=H*Math.PI/180,c.uniforms.uFocalLength.value=X,c.uniforms.uSpeed1.value=$,c.uniforms.uSpeed2.value=J,c.uniforms.uDir2.value=K,c.uniforms.uBend1.value=Y,c.uniforms.uBend2.value=Z,c.uniforms.uColor1.value=b(I[0]||"#A855F7"),c.uniforms.uColor2.value=b(I[1]||"#06B6D4"),c.uniforms.uLightMode.value=ee?1:0,h.render({scene:L,camera:W}),C=requestAnimationFrame(R)};return C=requestAnimationFrame(R),()=>{cancelAnimationFrame(C),B.disconnect(),p&&l.canvas.parentNode===p&&p.removeChild(l.canvas),l.getExtension("WEBGL_lose_context")?.loseContext()}},[]),t.jsx("div",{ref:S,className:`plasma-wave-container ${E}`,style:T})}function Be(){const{user:u,loading:e,login:s}=oe(),a=ie(),[r,o]=w.useState(""),[n,i]=w.useState(!1);if(!e&&u)return t.jsx(ne,{to:"/admin",replace:!0});async function x(f){f.preventDefault();const m=new FormData(f.currentTarget);i(!0),o("");try{await s(String(m.get("email")),String(m.get("password"))),a("/admin")}catch(y){o(de(y))}finally{i(!1)}}return t.jsxs("div",{className:"grid min-h-screen bg-[#050610] lg:grid-cols-12 text-slate-100 overflow-hidden",children:[t.jsx(me,{title:"Acceso al Consorcio — QUILAB"}),t.jsxs("div",{className:"relative hidden lg:col-span-7 xl:col-span-7 lg:flex lg:flex-col lg:justify-between p-10 xl:p-14 overflow-hidden border-r border-white/10 bg-[#050610]",children:[t.jsxs("div",{className:"absolute inset-0 z-0",children:[t.jsx(Ne,{colors:["#A855F7","#06B6D4"],speed1:.05,speed2:.05,focalLength:.8,bend1:1,bend2:.5,dir2:1,rotationDeg:0}),t.jsx("div",{className:"pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050610] via-transparent to-[#050610]/70"}),t.jsx("div",{className:"pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050610]/80"}),t.jsx("div",{className:"pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,6,16,0.6)_100%)]"})]}),t.jsxs("div",{className:"relative z-10 flex items-center justify-between",children:[t.jsxs("div",{className:"flex items-center gap-2.5 rounded-full border border-white/15 bg-slate-950/70 px-4 py-1.5 font-mono text-[11px] text-cyan-300 backdrop-blur-md shadow-lg shadow-black/40",children:[t.jsxs("span",{className:"relative flex h-2 w-2",children:[t.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"}),t.jsx("span",{className:"relative inline-flex rounded-full h-2 w-2 bg-cyan-500"})]}),t.jsx("span",{className:"font-semibold tracking-wider",children:"QUILAB // CORE ACCESS"})]}),t.jsxs("div",{className:"flex items-center gap-3 text-xs font-mono text-slate-400",children:[t.jsx("span",{className:"hidden xl:inline text-white/30",children:"|"}),t.jsxs("span",{className:"flex items-center gap-1.5 rounded-md border border-white/10 bg-slate-950/50 px-2.5 py-1 text-[11px] backdrop-blur-sm",children:[t.jsx(le,{size:12,className:"text-purple-400"}),t.jsx("span",{children:"v2026.1"})]})]})]}),t.jsxs("div",{className:"relative z-10 my-auto py-12 max-w-lg",children:[t.jsxs("div",{className:"inline-flex items-center gap-2 rounded-md border border-purple-500/30 bg-purple-950/30 px-3 py-1 font-mono text-xs uppercase tracking-widest text-purple-300 backdrop-blur-md mb-6",children:[t.jsx(fe,{size:14,className:"text-purple-400"}),t.jsx("span",{children:"Consorcio Privado de Ingeniería"})]}),t.jsx("h1",{className:"font-display text-4xl xl:text-6xl font-bold tracking-tight text-white leading-tight",children:"El archivo y la arquitectura, en privado."}),t.jsx("p",{className:"mt-5 text-sm xl:text-base leading-relaxed text-slate-300/85 font-sans",children:"Consola restringida para la orquestación de proyectos, escuadras técnicas, gobernanza de código y métricas operativas de QUILAB."}),t.jsxs("div",{className:"mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-white/10",children:[t.jsxs("div",{className:"space-y-1",children:[t.jsx("span",{className:"font-mono text-[10px] uppercase tracking-wider text-slate-400",children:"Protocolo"}),t.jsxs("p",{className:"font-mono text-xs font-medium text-white flex items-center gap-1.5",children:[t.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-emerald-400"}),"Sesión Aislada & TLS 1.3"]})]}),t.jsxs("div",{className:"space-y-1",children:[t.jsx("span",{className:"font-mono text-[10px] uppercase tracking-wider text-slate-400",children:"Gobernanza"}),t.jsx("p",{className:"font-mono text-xs font-medium text-white",children:"Role-Based Access Control"})]})]})]}),t.jsxs("div",{className:"relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-white/10 pt-4",children:[t.jsx("span",{children:"© 2026 QUILAB Consortium"}),t.jsx("span",{className:"text-[11px] text-slate-500",children:"ID: SEC_POD_ALPHA"})]})]}),t.jsxs("div",{className:"lg:col-span-5 xl:col-span-5 flex flex-col justify-between bg-white px-6 sm:px-12 py-10 lg:py-14 text-slate-900",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsxs(ce,{to:"/",className:"group inline-flex items-center gap-2 font-mono text-xs text-slate-500 hover:text-slate-900 transition-colors",title:"Volver al portal público",children:[t.jsx(xe,{size:14,className:"transition-transform group-hover:-translate-x-1"}),t.jsx("span",{children:"Portal Público"})]}),t.jsxs("div",{className:"flex items-center gap-1.5 text-xs font-mono text-slate-400",children:[t.jsx(he,{size:12,className:"text-emerald-600"}),t.jsx("span",{children:"Autenticación"})]})]}),t.jsxs("div",{className:"my-auto w-full max-w-sm mx-auto py-8",children:[t.jsxs("div",{className:"mb-8",children:[t.jsx(ue,{}),t.jsx("h2",{className:"mt-6 font-display text-3xl font-bold tracking-tight text-slate-950",children:"Iniciar Sesión"}),t.jsx("p",{className:"mt-1 text-sm text-slate-500",children:"Ingresa con las credenciales asignadas a tu escuadra."})]}),t.jsxs("form",{onSubmit:x,className:"space-y-5",children:[t.jsx(P,{label:"Correo Institucional",children:t.jsx(F,{name:"email",type:"email",autoComplete:"username",placeholder:"usuario@quilab.dev",required:!0,className:"bg-slate-50 border-slate-300 focus:bg-white transition-all text-sm"})}),t.jsx(P,{label:"Contraseña de Acceso",children:t.jsx(F,{name:"password",type:"password",autoComplete:"current-password",placeholder:"••••••••••••",required:!0,className:"bg-slate-50 border-slate-300 focus:bg-white transition-all text-sm"})}),r?t.jsxs("div",{className:"rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 animate-in fade-in duration-200",children:[t.jsx("span",{className:"font-semibold",children:"Error de autenticación:"})," ",r]}):null,t.jsx(pe,{type:"submit",disabled:n,className:"w-full bg-[#050610] hover:bg-slate-900 text-white font-mono text-xs uppercase tracking-[0.16em] h-11 transition-all shadow-md active:scale-[0.99]",children:n?"Verificando firma…":"Acceder a la Consola"})]})]}),t.jsx("div",{className:"text-center font-mono text-[11px] text-slate-400 border-t border-slate-100 pt-4",children:"Acceso exclusivo para ingenieros y editores autorizados."})]})]})}export{Be as default};
