# QUILAB — Mapa de Secciones y Títulos del MainPage

Guía técnica y de diseño de todos los `divs`, contenedores, identificadores (`id`) y títulos presentes en la página principal (`http://localhost/quilab/`).

---

## 00 // Barra de Navegación Superior
* **Componente**: `resources/js/components/Navbar.tsx`
* **Contenedor**: `<header className="sticky top-0 z-50 ...">`
* **Elementos clave**:
  * **Logo**: `<quilab>` (Monospace interactivo con brackets)
  * **Enlaces de navegación**:
    1. `Proyectos` (`#proyectos` / `/proyectos`)
    2. `Nosotros` (`#nosotros` / `/nosotros`)
    3. `Capacidades` (`#capacidades`)
    4. `Equipo` (`#equipo` / `/equipo`)
    5. `Contacto` (`#contacto` / `/contacto`)
  * **Botón de acción**: `Acceso Consorcio` (Ruta secreta configurable)

---

## 01 // Hero Principal (Fold 1 - Pantalla Completa)
* **Componente**: `resources/js/features/landing/Hero.tsx` (Viewport 1)
* **Contenedor**: `<div className="relative min-h-[calc(100vh-4rem)] ...">`
* **Fondo visual**: Matriz cibernética interactiva `<HeroGrid />` sobre `#050610` + cursor reactivo `<GlowCursor />`.
* **Badges tecnológicos**:
  * `Full-Stack Architecture`
  * `Cloud & Kubernetes`
  * `Distributed Systems`
  * `AI & Data Pipelines`
* **Título Principal (H1)**:
  > *"Construimos software de [alto impacto, gran alcance, alto rendimiento, gran valor] y arquitectura escalable."*
  *(Texto rotativo animado con efecto de condensación VaporType).*
* **Subtítulo / Bajada**:
  > *"QUILAB reúne escuadras especializadas de ingenieros senior, arquitectos de software y líderes de producto para diseñar, desarrollar y desplegar plataformas digitales de misión crítica."*
* **Botones de acción (Specular Buttons)**:
  * Primario: `Explorar Proyectos` (`/proyectos`)
  * Secundario: `Conocer el Consorcio` (`/nosotros`)
* **Lado Derecho (Escenario 3D/Tech)**:
  * Contenedor con borde glassmorphic y resplandor radial.
  * Logo animado de partículas: `<quilab>` (`TechText`).

---

## 02 // Métricas del Consorcio (Fold 2 - Liquid Glass Cards)
* **Componente**: `resources/js/features/landing/Hero.tsx` (Viewport 2 / Continuación del Hero)
* **Contenedor**: `<div className="relative z-10 w-full pt-10 pb-16 ...">`
* **Fondo visual**: Shader WebGL `<DarkVeil />` combinado orgánicamente mediante gradiente atmosférico desde el Hero.
* **4 Tarjetas con Bordes Reflectantes Liquid Glass**:
  1. **Tarjeta 1**:
     * Badge superior: `Plataformas & Apps`
     * Valor: `5+`
     * Etiqueta: `Proyectos Desarrollados`
  2. **Tarjeta 2**:
     * Badge superior: `Consorcio Activo`
     * Valor: `8+`
     * Etiqueta: `Ingenieros & Especialistas`
  3. **Tarjeta 3**:
     * Badge superior: `100% Verificadas`
     * Valor: `2+`
     * Etiqueta: `Entregas en Producción`
  4. **Tarjeta 4**:
     * Badge superior: `I+D & Software`
     * Valor: `3+`
     * Etiqueta: `Años de Trayectoria`

---

## 03 // Casos & Proyectos en Producción
* **Componente**: `resources/js/features/landing/ProjectsPreview.tsx`
* **Contenedor / ID**: `<section id="proyectos" className="bg-[#050610] ...">`
* **Fondo visual**: Shader WebGL `<DarkVeil />` continuo con viñetas radiales.
* **Eyebrow / Tag**: `PRODUCCIÓN // INFRAESTRUCTURA` (con punto pulsante cyan)
* **Título Principal (H2)**:
  > *"Infraestructura y productos en producción."*
* **Enlace lateral**: `Ver todos los proyectos →` (`/proyectos`)
* **Distribución de Proyectos**:
  * Cuadrícula creativa de 2 vagones por fila (`grid-cols-1 md:grid-cols-2`).
  * Tarjetas de proyecto en modo oscuro con efecto **Modal Cards** (expandibles en pantalla completa).

---

## 04 // El Consorcio & Metodología
* **Componente**: `resources/js/features/landing/About.tsx`
* **Contenedor / ID**: `<section id="nosotros" className="bg-white ...">`
* **Eyebrow / Tag**: `02 // EL CONSORCIO`
* **Título Principal (H2)**:
  > *"Un consorcio estructurado para resolver desafíos de software complejos."*
* **Bajada**:
  > *"Combinamos talento multidisciplinario de élite para acelerar la entrega de productos digitales seguros, rápidos y escalables."*
* **Sub-bloque A: Pilares (3 Tarjetas)**:
  * `01` — **Consorcio de Ingeniería**: Squads especializados por objetivos de negocio.
  * `02` — **Desarrollo de Alto Nivel**: Plataformas web, cloud, microservicios e IA.
  * `03` — **Metodología & Rigor**: CI/CD, testing automatizado y documentación técnica.
* **Sub-bloque B: Framework de Trabajo (Caja oscura con gradiente)**:
  * Tag: `FRAMEWORK DE TRABAJO`
  * Título (H3): `Ciclo de vida de ingeniería garantizado.`
  * Indicador: `✓ Entregas continuas cada 2 semanas`
  * **4 Fases Metodológicas**:
    * `01` — Descubrimiento & Arquitectura
    * `02` — Diseño de Producto & UX/UI
    * `03` — Desarrollo Ágil & QA
    * `04` — Despliegue Cloud & Soporte

---

## 05 // Capacidades Técnicas / Servicios
* **Componente**: `resources/js/features/landing/Services.tsx`
* **Contenedor / ID**: `<section id="capacidades" className="bg-white ...">`
* **Eyebrow / Tag**: `03 // CAPACIDADES TÉCNICAS`
* **Título Principal (H2)**:
  > *"Stack completo de desarrollo para el futuro digital."*
* **Bajada**:
  > *"Respaldamos proyectos desde la primera línea de código hasta arquitecturas capaces de sostener millones de operaciones."*
* **Rejilla de 8 Capacidades**:
  1. `01` — **Desarrollo Web & SaaS**
  2. `02` — **Aplicaciones Móviles**
  3. `03` — **Arquitectura Cloud & Backend**
  4. `04` — **Inteligencia Artificial & Automatización**
  5. `05` — **Ingeniería de Datos & BI**
  6. `06` — **Diseño UX/UI & Design Systems**
  7. `07` — **Integraciones & APIs de Terceros**
  8. `08` — **Modernización & Evolución Continua**

---

## 06 // Talento & Squads de Ingeniería
* **Componente**: `resources/js/features/landing/Team.tsx`
* **Contenedor / ID**: `<section id="equipo" className="bg-slate-50/60 ...">`
* **Eyebrow / Tag**: `04 // TALENTO & INGENIERÍA`
* **Título Principal (H2)**:
  > *"Escuadras lideradas por ingenieros senior."*
* **Enlace lateral**: `Conoce a todos los miembros →` (`/equipo`)
* **Estructura del Equipo**:
  * **Líder Principal (`featured`)**: Tarjeta destacada del líder de ingeniería.
  * **Rejilla de Escuadras**: Tarjetas de miembros con especialidad, bio, badges tecnológicos y contador de proyectos participados.

---

## 07 // Contacto & Requerimiento
* **Componente**: `resources/js/features/landing/Contact.tsx`
* **Contenedor / ID**: `<section id="contacto" className="bg-ink ...">`
* **Lado Izquierdo (Propuesta de valor)**:
  * Eyebrow / Tag: `05 // CONVERSEMOS`
  * Título Principal (H2): `Inicia tu próximo salto tecnológico.`
  * Bajada: `Evaluamos tu arquitectura, estimamos tiempos y configuramos el equipo ideal...`
  * Indicadores de confianza:
    * `⚡ Respuesta y análisis preliminar en 24 horas`
    * `🛡️ Acuerdo de confidencialidad (NDA) disponible`
* **Lado Derecho (Formulario de Requerimiento)**:
  * Contenedor: Tarjeta blanca elevada con sombra y pulso esmeralda activo.
  * Título (H3): `Formulario de Requerimiento`
  * Subtítulo: `Comparte tus especificaciones con el equipo de ingeniería`
  * Campos:
    * Nombre completo
    * Correo corporativo
    * Empresa u organización
    * Tipo de proyecto (Selector)
    * Rango de inversión (Selector)
    * Descripción de la solución o desafío (Textarea)
  * Botón de envío: `Enviar Requerimiento al Consorcio`

---

## 08 // Pie de Página (Footer)
* **Componente**: `resources/js/components/SiteFooter.tsx`
* **Contenedor**: `<footer className="bg-ink text-white ...">`
* **Columna 1**: Logo `<quilab>` + Bio del consorcio + Enlaces sociales (GitHub, LinkedIn).
* **Columna 2 (Navegación)**:
  * `Proyectos & Casos`
  * `Sobre el Consorcio`
  * `Ingeniería & Squads`
  * `Contacto & Cotización`
* **Columna 3**: Correo corporativo (`contacto@quilab.co`) y copyright institucional.

---
*Documento autogenerado para el consorcio QUILAB. Ubicación en Obsidian: `QUILAB - Secciones y Titulos del MainPage.md`*
