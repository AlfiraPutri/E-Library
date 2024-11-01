<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{

    private function checkAdmin()
    {
        if (!Auth::check()) {
            return redirect('/login');
        }

        $role = Auth::user()->role;


        if ($role !== 'admin') {
            return redirect()->back()->with('error', 'Anda tidak memiliki izin untuk mengakses halaman ini'); // Arahkan ke halaman sebelumnya jika bukan admin
        }

        // return null;
        return ;
    }

    public function dashboard()
    {

        $redirect = $this->checkAdmin();
        if ($redirect) return $redirect;

        return inertia('BaseLayout', ['child' => 'Dashboard']);
    }

    public function users()
    {

        $redirect = $this->checkAdmin();
        if ($redirect) return $redirect;

        return inertia('BaseLayout', ['child' => 'User']);
    }

    public function editUser($id)
    {

        $redirect = $this->checkAdmin();
        if ($redirect) return $redirect;

        return inertia('BaseLayout', ['child' => 'UserDetailsPage']);
    }

    public function books()
    {

        $redirect = $this->checkAdmin();
        if ($redirect) return $redirect;

        return inertia('BaseLayout', ['child' => 'Koleksi']);
    }

    public function editBook($id)
    {
        $redirect = $this->checkAdmin();
        if ($redirect) return $redirect;

        return inertia('BaseLayout', ['child' => 'BukuDetailsPage']);
    }

    public function categories()
    {

        $redirect = $this->checkAdmin();
        if ($redirect) return $redirect;

        return inertia('BaseLayout', ['child' => 'Kategori']);
    }

    public function profile()
    {

        $redirect = $this->checkAdmin();
        if ($redirect) return $redirect;

        return inertia('BaseLayout', ['child' => 'Profile']);
    }
}
