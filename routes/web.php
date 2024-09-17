<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
      return Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
      ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('BaseLayout', ['child' => 'Dashboard']);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/user/dashboard', function () {
    return Inertia::render('BaseLayout', ['child' => 'DashboardUser']);
})->middleware(['auth', 'verified'])->name('user.dashboard');


// Route::get('/', function () {
//     return Inertia::render('Home');
// });

// Route untuk login
Route::get('/login', function () {
    return Inertia::render('Login');
});

// Route untuk signup
Route::get('/register', function () {
    return Inertia::render('Signup');
});

// Dashboard Routes
// Route::get('/dashboard', function () {
//     return Inertia::render('BaseLayout', ['child' => 'Dashboard']);
// });

Route::get('/dashboard/user', function () {
    return Inertia::render('BaseLayout', ['child' => 'User']);
});

Route::get('/dashboard/user/edit/{id_users}', function ($id) {
    return Inertia::render('BaseLayout', [
        'child' => 'UserDetailsPage',  // Ensure this matches the component name in your Pages directory
    ]);
});


Route::get('/dashboard/buku', function () {
    return Inertia::render('BaseLayout', ['child' => 'Koleksi']);
});

Route::get('/dashboard/buku/edit/{id_buku}', function ($id) {
    return Inertia::render('BaseLayout', [
        'child' => 'BukuDetailsPage',  // Ensure this matches the component name in your Pages directory
    ]);
});

Route::get('/dashboard/kategori', function () {
    return Inertia::render('BaseLayout', ['child' => 'Kategori']);
});

// Route::get('/dashboard/review', function () {
//     return Inertia::render('BaseLayout', ['child' => 'Review']);
// });

Route::get('/dashboard/profile', function () {
    return Inertia::render('BaseLayout', ['child' => 'Profile']);
});

//DashboardUser
Route::get('/user/dashboard', function () {
    return Inertia::render('BaseLayout', ['child' => 'DashboardUser']);
});

Route::get('/user/buku/{id_buku}/show', function ($id) {
    return Inertia::render('BaseLayout', [
        'child' => 'BukuShowPage',  // Ensure this matches the component name in your Pages directory
    ]);
});

Route::get('/user/history', function () {
    return Inertia::render('BaseLayout', ['child' => 'LibraryUser']);
})->middleware(['auth', 'verified'])->name('user.history');

Route::get('/user/download', function () {
    return Inertia::render('BaseLayout', ['child' => 'DashboardUser']);
});

Route::get('/user/favorite', function () {
    return Inertia::render('BaseLayout', ['child' => 'DashboardUser']);
});

Route::get('/user/profile', function () {
    return Inertia::render('BaseLayout', ['child' => 'DashboardUser']);
});

Route::get('/user/flipbook/{id_buku}', function () {
    return Inertia::render('BaseLayout', ['child' => 'DashboardUser']);
});



Route::middleware('auth')->group(function () {
      Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
      Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
      Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::middleware('guest')->group(function () {
});

require __DIR__ . '/auth.php';
