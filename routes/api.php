<?php

// use Illuminate\Http\Request;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\ReviewController;


//API kategori
Route::get('/kategori', [KategoriController::class, 'index']);
Route::post('/kategori', [KategoriController::class, 'store']);
Route::put('/kategori/{id}', [KategoriController::class, 'update']);
Route::delete('/kategori/{id}', [KategoriController::class, 'destroy']);
Route::get('/kategori/{id}', [KategoriController::class, 'getJumlahBukuByKategori']);



//api user
Route::get('/user', [UserController::class, 'index']);
Route::get('/user/{id}/show', [UserController::class, 'show']);
Route::post('/user', [UserController::class, 'store']);
Route::post('/user/{id}', [UserController::class, 'update']);
Route::delete('/user/{id}', [UserController::class, 'destroy']);





//api review
Route::get('/buku', [BukuController::class, 'index']);
Route::get('/buku/{id}/show', [BukuController::class, 'show']);
Route::post('/buku', [BukuController::class, 'store']);
Route::post('/buku/{id}/edit', [BukuController::class, 'update']);
Route::delete('/buku/{id}', [BukuController::class, 'destroy']);

//api review
Route::get('/review', [ReviewController::class, 'index']);
Route::post('/review', [ReviewController::class, 'store']);
Route::put('/review/{id}', [ReviewController::class, 'update']);
Route::delete('/review/{id}', [ReviewController::class, 'destroy']);


//halaman user
Route::get('/user/buku/{id}/show', [BukuController::class, 'show']);


Route::post('/user/{id}/history', [HistoryController::class, 'addToHistory']);
Route::get('/user/{id}/history', [HistoryController::class, 'getHistory']);
Route::get('/history', [HistoryController::class, 'getAllHistory']);


Route::post('/user/{id}/favorite', [FavoriteController::class, 'addToFavorites']);
Route::get('/user/{id}/favorite', [FavoriteController::class, 'getFavorites']);

Route::post('/user/{id}/download', [DownloadController::class, 'addDownload']);
Route::get('/user/{id}/download', [DownloadController::class, 'getDownloads']);

//register
Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login');

Route::post('/user/{id}/change-password', [UserController::class, 'changePassword']);

