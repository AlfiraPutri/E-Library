<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;




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


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/dashboard/user', [AdminController::class, 'users']);
    Route::get('/dashboard/user/edit/{id_users}', [AdminController::class, 'editUser']);
    Route::get('/dashboard/buku', [AdminController::class, 'books']);
    Route::get('/dashboard/buku/edit/{id_buku}', [AdminController::class, 'editBook']);
    Route::get('/dashboard/kategori', [AdminController::class, 'categories']);

    Route::get('/dashboard/profile', [AdminController::class, 'profile'])->name('mautauaja');
});


// Route::get('/dashboard', function () {
//     return Inertia::render('BaseLayout', ['child' => 'Dashboard']);
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/user/dashboard', function () {
    return Inertia::render('BaseLayout', ['child' => 'DashboardUser']);
})->middleware(['auth', 'verified'])->name('user.dashboard');


// Route::get('/', function () {
//     return Inertia::render('Home');
// });

// Route untuk login
// Route::get('/login', function () {
//     return Inertia::render('Login');
// });

// // Route untuk signup
// Route::get('/register', function () {
//     return Inertia::render('Signup');
// });


Route::get('/login', [AuthenticatedSessionController::class, 'create'])
    ->name('login')
    ->middleware('guest');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest');

Route::get('/register', [RegisteredUserController::class, 'create'])
    ->name('register')
    ->middleware('guest');

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest');

// Dashboard Routes
// Route::get('/dashboard', function () {
//     return Inertia::render('BaseLayout', ['child' => 'Dashboard']);
// });

// Route::get('/dashboard/user', function () {
//     return Inertia::render('BaseLayout', ['child' => 'User']);
// });

// Route::get('/dashboard/user/edit/{id_users}', function ($id) {
//     return Inertia::render('BaseLayout', [
//         'child' => 'UserDetailsPage',
//     ]);
// });


// Route::get('/dashboard/buku', function () {
//     return Inertia::render('BaseLayout', ['child' => 'Koleksi']);
// });

// Route::get('/dashboard/buku/edit/{id_buku}', function ($id) {
//     return Inertia::render('BaseLayout', [
//         'child' => 'BukuDetailsPage',
//     ]);
// });

// Route::get('/dashboard/kategori', function () {
//     return Inertia::render('BaseLayout', ['child' => 'Kategori']);
// });

// Route::get('/dashboard/review', function () {
//     return Inertia::render('BaseLayout', ['child' => 'Review']);
// });

// Route::get('/dashboard/profile', function () {
//     return Inertia::render('BaseLayout', ['child' => 'Profile']);
// });

//DashboardUser
Route::get('/user/dashboard', function () {
    return Inertia::render('BaseLayout', ['child' => 'DashboardUser']);
});

Route::get('/user/buku/{id_buku}/show', function ($id) {
    return Inertia::render('BaseLayout', [
        'child' => 'BukuShowPage',
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
