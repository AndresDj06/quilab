# QUILAB

Consorcio de software. Plataforma pública y panel de administración.

Stack: **Laravel 12**, **React 19**, **Vite**, **Tailwind CSS 4**, **Sanctum**, **MySQL**.

## Requisitos

- PHP 8.2+
- Composer
- Node.js 20+
- MySQL 8 (XAMPP es válido)

## Instalación

```bash
cd C:\xampp\htdocs\quilab
composer install
copy .env.example .env
php artisan key:generate
```

Crea la base de datos:

```sql
CREATE DATABASE quilab CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Ajusta `.env`:

```
APP_NAME=QUILAB
APP_URL=http://127.0.0.1:8000
DB_CONNECTION=mysql
DB_DATABASE=quilab
DB_USERNAME=root
DB_PASSWORD=
FILESYSTEM_DISK=public
SESSION_DRIVER=database
```

Si sirves desde XAMPP en `http://localhost/quilab`:

```
APP_URL=http://localhost/quilab
APP_SUBDIRECTORY=quilab
ASSET_URL=http://localhost/quilab
SESSION_PATH=/quilab
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:80,127.0.0.1,127.0.0.1:80
```

Migraciones, datos de demostración y enlace de storage:

```bash
php artisan migrate --seed
php artisan storage:link
npm install
npm run build
```

## Ejecución local

Terminal 1 — API y SPA (Laravel):

```bash
php artisan serve
```

Terminal 2 — Vite (solo en desarrollo):

```bash
npm run dev
```

Abre `http://127.0.0.1:8000`.

Con XAMPP, con `npm run build` basta con entrar a `http://localhost/quilab`.

## Despliegue en Hostinger (quilab.co)

El `.env` **no** viaja por Git. Créalo en el Administrador de archivos de hPanel, en la raíz del proyecto (junto a `artisan`), y deja `APP_SUBDIRECTORY` vacío porque el dominio apunta a la raíz.

```
APP_NAME=QUILAB
APP_ENV=production
APP_DEBUG=false
APP_URL=https://quilab.co
APP_SUBDIRECTORY=
ASSET_URL=
APP_KEY=base64:PEGA_AQUI_LA_CLAVE

APP_LOCALE=es
APP_FALLBACK_LOCALE=en

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u336988965_quilab
DB_USERNAME=u336988965_quilab
DB_PASSWORD=

SESSION_DRIVER=database
SESSION_PATH=/
SESSION_DOMAIN=.quilab.co
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=public

SANCTUM_STATEFUL_DOMAINS=quilab.co,www.quilab.co
```

En la terminal de hPanel, desde la carpeta del proyecto:

```bash
php artisan key:generate --force
php artisan migrate --force --seed
php artisan storage:link
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

Asegúrate de que Composer se ejecute en el despliegue Git y de que `storage/` y `bootstrap/cache/` tengan permiso de escritura.

## Usuario administrador de prueba

| Rol | Email | Contraseña |
| --- | --- | --- |
| Super Admin | super@quilab.dev | password |
| Admin | admin@quilab.dev | password |
| Editor | editor@quilab.dev | password |

Panel: `/admin` · Login: `/login`

## Qué incluye

- Landing pública (hero, proyectos, nosotros, servicios, equipo, contacto)
- Archivo de proyectos con filtros y case study en `/proyectos/{slug}`
- Formulario de contacto persistido en MySQL (con rate limit)
- CRUD de proyectos, miembros, usuarios y mensajes
- Relación muchos a muchos proyecto ↔ miembro (`project_member`)
- Policies por rol (Super Admin, Admin, Editor)
- Sitemap en `/sitemap.xml`

El contenido inicial es realista y editable desde el panel. No uses estas cuentas en producción.
