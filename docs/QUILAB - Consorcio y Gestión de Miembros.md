# 👥 QUILAB — Consorcio y Gestión de Miembros del Equipo

#quilab #team #engineering-squads #laravel-eloquent #admin-panel

* **Hub Principal:** [[QUILAB - Hub del Proyecto]]
* **Relacionado:** [[QUILAB - Proyectos y Portafolio]] | [[QUILAB - Secciones y Titulos del MainPage]]

---

## 🏛️ Filosofía de Escuadras Técnicas
QUILAB funciona bajo el modelo de **consorcio especializado**: reúne ingenieros senior, arquitectos de software, especialistas en cloud y líderes de producto organizados en escuadras ágiles.

---

## 🗄️ Modelo de Datos (`Member`)
* **Tabla en Base de Datos:** `members`
* **Campos clave:**
  * `id`: Identificador numérico.
  * `name`: Nombre completo del especialista.
  * `role`: Rol técnico principal (ej. *Lead Software Architect*, *Cloud Engineer*, *Senior Full-Stack*).
  * `bio`: Trayectoria y experiencia relevante.
  * `skills`: Array JSON de stacks y competencias (ej. `["Go", "Kubernetes", "React", "PostgreSQL"]`).
  * `avatar`: Ruta de foto de perfil profesional.
  * `github_url`, `linkedin_url`: Perfiles públicos verificados.
  * `featured`: Indica si es el Líder Principal de la escuadra destacada.
  * `projects_count` / Relación con proyectos: Cuenta dinámica de proyectos entregados por el miembro.

---

## 🔄 Conexión Dinámica de Métricas
En el MainPage (`Hero.tsx` Viewport 2):
* El apartado de métricas calcula automáticamente:
  * **Proyectos Desarrollados:** Obtenido dinámicamente de `data?.stats?.projects`.
  * **Ingenieros & Especialistas:** Obtenido dinámicamente de `data?.stats?.members`.
  * **Entregas en Producción:** Obtenido dinámicamente de `data?.stats?.finished`.
  * **Años de Trayectoria:** Obtenido dinámicamente de `data?.stats?.years`.

---

## 🖥️ Rutas y Vistas Asociadas
* **MainPage Preview:** `http://localhost/quilab/#equipo` (`Team.tsx`)
* **Directorio Público:** `http://localhost/quilab/equipo` (`TeamPage.tsx`)
* **Panel de Administración:** `http://localhost/quilab/admin/miembros` (`AdminMembersPage.tsx`)
* **Editor de Miembros:** `http://localhost/quilab/admin/miembros/nuevo` (`MemberFormPage.tsx`)

---
*Vinculado en:* [[QUILAB - Hub del Proyecto]] | [[QUILAB - Proyectos y Portafolio]]
