# QUILAB — Seguridad y Acceso Administrador ("WPS Hide Login")

#quilab #seguridad #wps-hide-login #admin #autenticacion

* **Hub Principal:** [[QUILAB - Hub del Proyecto]]
* **Relacionado:** [[QUILAB - Arquitectura y Stack Tecnológico]] | [[QUILAB - Creative Studio y Shaders]]

**Fecha de actualización:** 2026-10-09  
**Proyecto:** QUILAB (Consorcio de Desarrollo de Software)  
**Estado:** ✅ Integrado y Operativo

---

## 🔑 Credenciales de Acceso al Panel Admin

| Rol            | Correo Electrónico  | Contraseña | Alcance / Permisos                                                             |
| :------------- | :------------------ | :--------- | :----------------------------------------------------------------------------- |
| **SuperAdmin** | `super@quilab.dev`  | `password` | Control total del sistema, gestión de miembros, proyectos, usuarios y mensajes |
| **Admin**      | `admin@quilab.dev`  | `password` | Gestión completa de proyectos, equipo y solicitudes de contacto                |
| **Editor**     | `editor@quilab.dev` | `password` | Creación y edición de fichas de proyectos y portafolio                         |

---

## 🛡️ Mecanismo de Acceso Secreto (WPS Hide Login)

El sistema ha sido configurado para ocultar por completo las rutas públicas tradicionales de administración:

### 1. URL Secreta Activa para Iniciar Sesión
* **Ruta de acceso directa:**  
  `http://localhost/quilab/acceso-consorcio`
* **Slug configurado:**  
  `acceso-consorcio` (definido en `.env` mediante `VITE_ADMIN_ACCESS_SLUG`)

### 2. Comportamiento de Trampa / Protección
* **Si alguien visita `/login` o `/wp-login`:**  
  Es redirigido inmediatamente a la página de inicio pública `/`, simulando que el panel no existe.
* **Si un visitante no autenticado visita `/admin` o `/admin/*`:**  
  Es expulsado y redirigido directamente a `/` (sin mostrar formulario ni dar pistas de la ruta del panel).
* **Al cerrar sesión (Logout):**  
  La sesión se destruye en el backend y el usuario es redirigido a `/`.

---

## ⚙️ Personalización del Slug Secreto

Para cambiar el slug de acceso en el futuro, sólo edita tu archivo `.env` en la raíz del proyecto:

```env
# En .env:
VITE_ADMIN_ACCESS_SLUG="mi-nueva-ruta-secreta"
```

Luego recompila los assets de Vite:
```bash
npm run build
```
La nueva URL de acceso pasará a ser automáticamente:
`http://localhost/quilab/mi-nueva-ruta-secreta`

---

## 🎨 Experiencia Visual del Login (React Bits: `<PlasmaWave />`)

* **Componente:** `<PlasmaWave />` de React Bits integrado con WebGL / OGL shader de alto rendimiento.
* **Paleta:** Degradado dinámico de plasma con ondas hiperbólicas (`#A855F7`, `#06B6D4`) y viñetas cinemáticas sobre fondo `#050610`.
* **HUD y Datos de Consola:**
  * Indicador de pulso activo: `QUILAB // CORE ACCESS`.
  * Versión del sistema: `v2026.1`.
  * Protocolos declarados: `Sesión Aislada & TLS 1.3`, `Role-Based Access Control`.
  * Enlace rápido de retorno al portal público.

---

## 🎛️ Panel de Personalización CREATIVE (Estilo React Bits Studio)

* **Ruta en el Administrador:**  
  `http://localhost/quilab/admin/creative` (disponible en el menú lateral bajo "Creative").
* **Módulos configurables en tiempo real:**
  1. **PlasmaWave (Shader WebGL):** Colores 1, 2 y 3, `Time Speed`, `Warp Frequency`, `Warp Strength`, `Warp Speed`, `Warp Amplitude`, `Blend Angle`, `Blend Softness`, `Rotation Amount`, `Contrast`, `Gamma`, `Saturation`, `Zoom`, `Light Mode`.
  2. **GlowCursor (Puntero Reactivo):** Colores primario y secundario, longitud y grosor de estela (`Trail Length`, `Trail Width`), velocidad de seguimiento (`Follow Speed`), intensidad de resplandor (`Glow Intensity`), destellos (`Pulse Speed`), desvanecimiento inactivo (`Idle Fade`).
  3. **VaporType (Texto Condensado):** Colores de texto y vapor, densidad de partículas, turbulencia, dispersión, tiempos de condensación y disolución.
  4. **HeroGrid (Matriz y Conexiones):** Tamaño de cuadrícula, radio de interacción y color de nodos.
* **Características del Inspector:**
  * Controladores de color con selector nativo y código hexadecimal.
  * Sliders interactivos con visualización de valor y caja numérica editable directa.
  * Toggles animados para opciones booleanas.
  * Previsualización interactiva en vivo (Live Canvas).
  * Botón **Reset** para restaurar valores por defecto del componente.
  * Botón **Copiar JSX** para exportar el snippet con los props calibrados.
  * Botón **Guardar Cambios** con persistencia reactiva en todo el sitio web.

---

*Nota registrada y sincronizada en Obsidian Vault de QUILAB.*
