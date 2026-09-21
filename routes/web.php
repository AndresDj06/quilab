<?php

use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

Route::get('/sitemap.xml', SitemapController::class);

Route::view('/{path?}', 'app')->where('path', '^(?!api(?:/|$)|sanctum(?:/|$)|up(?:/|$)|storage(?:/|$)|sitemap\\.xml).*');
