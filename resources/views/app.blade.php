<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="app-basename" content="{{ $webBase ?? '/' }}">
        <title>QUILAB — Consorcio de software</title>
        <meta name="description" content="Consorcio de profesionales que construye productos digitales de alto nivel: web, sistemas, APIs e inteligencia aplicada.">
        <meta property="og:title" content="QUILAB — Consorcio de software">
        <meta property="og:description" content="Construimos soluciones digitales que convierten ideas en productos.">
        <meta property="og:type" content="website">
        <meta property="og:locale" content="es_ES">
        <meta name="theme-color" content="#09070F">
        <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    </head>
    <body class="min-h-screen bg-background text-foreground antialiased">
        <div id="app"></div>
    </body>
</html>
