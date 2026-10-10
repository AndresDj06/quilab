# ✨ QUILAB — Creative Studio y Componentes React Bits

#quilab #creative-studio #reactbits #webgl #shaders #ogl #frontend

* **Hub Principal:** [[QUILAB - Hub del Proyecto]]
* **Relacionado:** [[QUILAB - Secciones y Titulos del MainPage]] | [[QUILAB - Seguridad y Acceso Admin (WPS Hide Login)]]

---

## 🎯 Propósito del Creative Studio
El **Creative Studio** es un laboratorio de diseño interactivo integrado directamente en el panel administrativo de QUILAB (`http://localhost/quilab/admin/creative`). Está inspirado en la experiencia visual de **reactbits.dev**, permitiendo calibrar en tiempo real los parámetros matemáticos de los shaders WebGL, partículas y efectos cinéticos desplegados en el portal.

---

## 🧩 Componentes y Efectos Integrados

### 1. `<DarkVeil />` (Fondo WebGL de Infraestructura y Métricas)
* **Archivo:** `resources/js/components/DarkVeil.tsx` / `DarkVeil.css`
* **Tecnología:** WebGL acelerado por hardware mediante la librería `ogl` (`Renderer`, `Program`, `Mesh`, `Triangle`, `Vec2`).
* **Matemática:** Shaders procedurales CPPN (Compositional Pattern Producing Networks), funciones sigmoides, distorsión de urdimbre (`uWarp`) y modulación de scanlines sinusoidales.
* **Ubicación en el sitio:**
  * Fondo de la sección de Proyectos (`ProjectsPreview.tsx`).
  * Fondo de la zona de métricas en el Hero (`Hero.tsx` Viewport 2).
* **Parámetros configurables en el Studio:**
  | Propiedad | Tipo | Rango / Valores | Función |
  | :--- | :--- | :--- | :--- |
  | `hueShift` | number | `0` a `360` (Default `43`) | Rota el tono cromático general del shader |
  | `speed` | number | `0.1` a `3.0` (Default `0.9`) | Velocidad de animación de las ondas |
  | `scanlineFrequency` | number | `0` a `10` (Default `3.1`) | Densidad y frecuencia de líneas CRT |
  | `warpAmount` | number | `0` a `10` (Default `4.7`) | Distorsión no lineal del campo escalar |
  | `noiseIntensity` | number | `0` a `0.5` (Default `0.04`) | Grano analógico procedural |
  | `scanlineIntensity` | number | `0` a `1.0` (Default `0.2`) | Opacidad de las scanlines |
  | `resolutionScale` | number | `0.5` a `2.0` (Default `1.0`) | Factor de escala de renderizado |
  | `lightMode` | boolean | `true / false` (Default `false`) | Inversión cromática para fondos claros |

---

### 2. `<PlasmaWave />` (Shader WebGL del Login Institucional)
* **Archivo:** `resources/js/components/PlasmaWave.tsx` / `PlasmaWave.css`
* **Ubicación:** Lateral izquierdo de la pantalla de acceso administrativo (`/acceso-consorcio`).
* **Efecto:** Ondas de plasma fluido en dos bandas de color interactivo (`#A855F7` y `#06B6D4`) con perspectiva focal de cámara.
* **Parámetros configurables:** `timeSpeed`, `warpStrength`, `blendSoftness`, `zoom`, `rotationAmount`, `colors`.

---

### 3. `<GlowCursor />` (Puntero Reactivo)
* **Archivo:** `resources/js/components/GlowCursor.tsx`
* **Ubicación:** Envolvente del Hero principal (`Hero.tsx`) y áreas interactivas.
* **Efecto:** Rastro de luz y estela luminosa que sigue al cursor del usuario con atenuación exponencial, resplandor difuso (`glowSpread`) y mezcla de luz `screen`.

---

### 4. `<VaporType />` (Condensación y Evaporación de Texto)
* **Archivo:** `resources/js/components/VaporType.tsx`
* **Ubicación:** Titular principal del Hero:  
  *"Construimos software de [alto impacto, gran alcance, alto rendimiento, gran valor]..."*
* **Efecto:** Cada palabra se condensa a partir de partículas de vapor gaseoso procedentes de la izquierda, se congela temporalmente y luego se disuelve en turbulencia física.

---

### 5. `<HeroGrid />` (Matriz y Conexiones de Nodos)
* **Archivo:** `resources/js/components/HeroGrid.tsx`
* **Ubicación:** Escenario inicial del Hero (`Hero.tsx` Viewport 1).
* **Efecto:** Red cibernética procedural basada en simulación física de nodos con atracción/repulsión al cursor y líneas de conexión de baja latencia.

---

### 6. `<TechText />` (Partículas Cinéticas `<quilab>`)
* **Archivo:** `resources/js/components/TechText.tsx`
* **Ubicación:** Cubo interactivo lateral en el Hero.
* **Efecto:** Texto vectorial renderizado mediante micro-segmentos, guiones discontinuos y motas cinéticas en movimiento.

---

### 7. Tarjetas Liquid Glass con Bordes Reflectantes
* **Implementación:** Clases avanzadas de Tailwind con capas de refracción `backdrop-blur-2xl`, degradados multicapa, destellos superiores reflectantes (`h-[1.5px] via-white/80` a `via-cyan-300`) y sombra de bisel interior (`shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)]`).

---

## 💾 Persistencia y Estado en Tiempo Real
* **Contexto React:** `resources/js/context/CreativeContext.tsx`
* **Almacenamiento:** `localStorage` (`quilab_creative_config_v1`), asegurando que cualquier ajuste realizado en el panel persista y se refleje instantáneamente en la interfaz pública.
* **Exportador:** Botón **"Copiar JSX"** que genera automáticamente el bloque de código con las props actuales para portarlo a cualquier componente.

---
*Vinculado en:* [[QUILAB - Hub del Proyecto]] | [[QUILAB - Secciones y Titulos del MainPage]]
