<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="app-basename" content="{{ $webBase ?? '/' }}">
        <title>&lt;quilab.co&gt; — Consorcio de Desarrollo de Software</title>
        <meta name="description" content="Consorcio de profesionales que diseña y construye productos digitales de alto impacto: arquitectura moderna, sistemas escalables, APIs e inteligencia aplicada.">
        <meta property="og:title" content="<quilab.co> — Consorcio de Desarrollo de Software">
        <meta property="og:description" content="Construimos soluciones digitales que convierten ideas en infraestructura y productos de alto nivel.">
        <meta property="og:type" content="website">
        <meta property="og:locale" content="es_ES">
        <meta name="theme-color" content="#070F1E">
        <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    </head>
    <body class="min-h-screen bg-background text-foreground antialiased selection:bg-sky-500 selection:text-white">
        <div id="app"></div>
    </body>
</html>
