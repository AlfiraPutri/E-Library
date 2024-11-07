<?php

namespace App\Http\Controllers;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{

    public function handle(Request $request, Closure $next, $role)
    {
        if (!Auth::check()) {
            return redirect('/login');
        }

        if (Auth::user()->role !== $role) {
            return redirect()->back()->with('error', 'Anda tidak memiliki izin untuk mengakses halaman ini');
        }

        return $next($request);
    }

    //Metode for admin
    public function dashboard()
    {
        return inertia('BaseLayout', ['child' => 'Dashboard']);
    }

    public function users()
    {
        return inertia('BaseLayout', ['child' => 'User']);
    }

    public function editUser($id)
    {

        return inertia('BaseLayout', ['child' => 'UserDetailsPage']);
    }

    public function books()
    {

        return inertia('BaseLayout', ['child' => 'Koleksi']);
    }

    public function editBook($id)
    {
        return inertia('BaseLayout', ['child' => 'BukuDetailsPage']);
    }

    public function categories()
    {
        return inertia('BaseLayout', ['child' => 'Kategori']);
    }

    public function profile()
    {


        return inertia('BaseLayout', ['child' => 'Profile']);
    }

    //Method for user

    public function dashboardUser()
    {

        return inertia('BaseLayout', ['child' => 'DashboardUser']);
    }

    public function history()
    {

        return inertia('BaseLayout', ['child' => 'LibraryUser']);
    }

    public function downloads()
    {

        return inertia('BaseLayout', ['child' => 'DownloadUser']);
    }

    public function favorites()
    {
        return inertia('BaseLayout', ['child' => 'FavoriteUser']);
    }

    public function showBook($id)
    {

        return inertia('BaseLayout', ['child' => 'ShowBukuPage']);
    }

    public function flipBook($id)
    {

        return inertia('BaseLayout', ['child' => 'FlipBukuPage']);
    }

    public function profileUser()
    {

        return inertia('BaseLayout', ['child' => 'Profile']);
    }
}

