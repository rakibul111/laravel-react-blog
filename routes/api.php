<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\CommentsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// without authentication
Route::post('/register', [RegisterController::class, 'register'])->name('register');
Route::post('/login', [LoginController::class, 'login'])->name('login');

// using resource controller
Route::resource('users', UsersController::class);
Route::resource('categories', CategoryController::class);
Route::resource('posts', PostsController::class);
Route::resource('tags', TagsController::class);
Route::resource('comments', CommentsController::class);

// needs authenticationn
Route::get('/checkAuth', [LoginController::class, 'checkAuth'])->name('checkAuth');
Route::get('/profile', [UsersController::class, 'profile'])->name('profile');
Route::put('/profile/update', [UsersController::class, 'updateProfile'])->name('updateProfile');
Route::get('/logout', [UsersController::class, 'logout'])->name('logout');