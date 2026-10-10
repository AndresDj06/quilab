# 💼 QUILAB — Proyectos, Portafolio y Modal Cards

#quilab #proyectos #portfolio #modalcards #reactbits-pro #laravel-eloquent

* **Hub Principal:** [[QUILAB - Hub del Proyecto]]
* **Relacionado:** [[QUILAB - Secciones y Titulos del MainPage]] | [[QUILAB - Consorcio y Gestión de Miembros]] | [[QUILAB - Creative Studio y Shaders]]

---

## 🎯 Arquitectura del Portafolio
QUILAB presenta sus productos de software e infraestructuras desplegadas mediante una disposición modular basada en **vagones creativos dobles** (`grid-cols-1 md:grid-cols-2`) sobre el fondo shader `<DarkVeil />`.

---

## 🃏 Componente: Modal Cards (React Bits Pro)
* **Categoría:** UI & Cards / Fullscreen Expansion
* **Paquete:** `@reactbits-starter/modal-cards-tw`
* **Comportamiento:**
  1. En vista reducida, la tarjeta expone el título del caso, cliente, año de entrega, badges de tecnologías (`Laravel`, `React`, `MySQL`, `APIs`, `Cloud`) y extracto arquitectónico.
  2. Al interactuar con el botón **"Expandir"** o pulsar la tarjeta, esta ejecuta una transición suave de expansión a pantalla completa (`modal-overlay` con `backdrop-blur-md`).
  3. En pantalla completa revela:
     * Arquitectura de la solución.
     * Desafío técnico superado.
     * Métricas de rendimiento e impacto.
     * Galería de capturas de interfaz.
     * Enlace a la demo en producción o repositorio.

---

## 🗄️ Modelo de Datos (`Project`)
* **Tabla en Base de Datos:** `projects`
* **Campos clave:**
  * `id`: Identificador único.
  * `title`: Título de la plataforma (ej. *Atlas Salud*, *Nexo Logística*).
  * `slug`: Identificador URL amigable (ej. `/proyectos/atlas-salud`).
  * `tagline`: Subtítulo o resumen del producto.
  * `description`: Memoria técnica detallada.
  * `cover_image`: Imagen de portada / arquitectura.
  * `status`: Estado operativo (`en_produccion`, `desarrollo`, `concluido`).
  * `delivery_year`: Año de despliegue (ej. `2025`, `2026`).
  * `stack`: Array JSON de tecnologías empleadas.
  * `client`: Organización o cliente consorciado.
  * `featured`: Booleano para destacar en el MainPage.
  * `members`: Relación Many-to-Many con los ingenieros participantes (`project_member`).

---

## 🖥️ Rutas y Vistas Asociadas
* **MainPage Preview:** `http://localhost/quilab/#proyectos` (`ProjectsPreview.tsx`)
* **Catálogo Completo:** `http://localhost/quilab/proyectos` (`ProjectsPage.tsx`)
* **Ficha de Detalle:** `http://localhost/quilab/proyectos/:slug` (`ProjectDetailPage.tsx`)
* **Panel de Administración:** `http://localhost/quilab/admin/proyectos` (`AdminProjectsPage.tsx`)
* **Editor de Proyectos:** `http://localhost/quilab/admin/proyectos/nuevo` (`ProjectFormPage.tsx`)

---
*Vinculado en:* [[QUILAB - Hub del Proyecto]] | [[QUILAB - Secciones y Titulos del MainPage]]
