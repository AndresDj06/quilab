<?php

use App\Http\Controllers\Api\Admin\ContactMessageController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\MemberController;
use App\Http\Controllers\Api\Admin\MetaController;
use App\Http\Controllers\Api\Admin\ProjectController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PublicController;
use Illuminate\Support\Facades\Route;

Route::prefix('public')->group(function (): void {
    Route::get('/landing', [PublicController::class, 'landing']);
    Route::get('/projects', [PublicController::class, 'projects']);
    Route::get('/projects/{project}', [PublicController::class, 'project']);
    Route::get('/members', [PublicController::class, 'members']);
    Route::get('/catalogs', [PublicController::class, 'catalogs']);
    Route::post('/contact', [PublicController::class, 'contact'])->middleware('throttle:contact');
});

Route::prefix('auth')->group(function (): void {
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');

    Route::middleware(['auth', 'active'])->group(function (): void {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

Route::middleware(['auth', 'active'])->prefix('admin')->group(function (): void {
    Route::get('/dashboard', DashboardController::class);
    Route::get('/meta', MetaController::class);

    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::get('/projects/{project}', [ProjectController::class, 'show']);
    Route::post('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
    Route::post('/projects/{project}/publish', [ProjectController::class, 'publish']);
    Route::post('/projects/{project}/feature', [ProjectController::class, 'feature']);
    Route::post('/projects/{project}/images', [ProjectController::class, 'storeImage']);
    Route::delete('/projects/{project}/images/{image}', [ProjectController::class, 'destroyImage']);

    Route::get('/members', [MemberController::class, 'index']);
    Route::post('/members', [MemberController::class, 'store']);
    Route::get('/members/{member}', [MemberController::class, 'show']);
    Route::post('/members/{member}', [MemberController::class, 'update']);
    Route::delete('/members/{member}', [MemberController::class, 'destroy']);

    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);

    Route::get('/messages', [ContactMessageController::class, 'index']);
    Route::get('/messages/{message}', [ContactMessageController::class, 'show']);
    Route::put('/messages/{message}', [ContactMessageController::class, 'update']);
    Route::delete('/messages/{message}', [ContactMessageController::class, 'destroy']);
});
