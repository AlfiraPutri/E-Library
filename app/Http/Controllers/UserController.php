<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {

            // Ambil parameter pencarian dari request
            $search = $request->input('search');

            // Jika parameter pencarian ada, filter pengguna berdasarkan nama, email, atau username
        if ($search) {
            $users = User::where('nama', 'LIKE', '%' . $search . '%')
                ->orWhere('nip', 'LIKE', '%' . $search . '%')
                ->orWhere('username', 'LIKE', '%' . $search . '%')
                ->orWhere('role', 'LIKE', '%' . $search . '%')
                ->get();
            } else {
                // Jika tidak ada parameter pencarian, ambil semua pengguna
                $users = User::all();
            }

            return response()->json($users);
        } catch (\Exception $exception) {
            Log::error('Error fetching users: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }

    /**
     * Store a newly created user in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

        try {
            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'nip' => 'required|numeric|unique:users,nip',
                'jenis_kelamin' => 'nullable|string|max:255',
                'tanggal_lahir' => 'nullable|date',
                'alamat' => 'nullable|string|max:255',
                'jabatan' => 'nullable|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'username' => 'required|string|max:255|unique:users,username',
                'password' => 'required|string|min:8',
                'role' => 'required|string|in:admin,pegawai',
                'img_user' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $img_user = null;
            if ($request->hasFile('img_user')) {
                $image = $request->file('img_user');
                $imageName = Str::random(32) . '.' . $image->getClientOriginalExtension();
                $img_user = $image->storeAs('public/profile', $imageName);
                $img_user = str_replace('public/', '', $img_user); // Simpan path relatif
            }

            $user = User::create([
                'nama' => $validated['nama'],
                'nip' => $validated['nip'],
                'jenis_kelamin' => $validated['jenis_kelamin'],
                'tanggal_lahir' => $validated['tanggal_lahir'],
                'alamat' => $validated['alamat'],
                'jabatan' => $validated['jabatan'],
                'email' => $validated['email'],
                'username' => $validated['username'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role'],
                'img_user' => $img_user,
            ]);

            return response()->json($user, 201);
        } catch (ValidationException $exception) {
            return response()->json(['status' => 422, 'message' => $exception->errors()], 422);
        } catch (\Exception $exception) {
            Log::error('Error creating user: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }

    /**
     * Display the specified user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $user = User::findOrFail($id);
            if ($user->img_user) {
                $user->img_user = Storage::url($user->img_user);
            }


            return response()->json($user);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $exception) {
            return response()->json(['status' => 404, 'message' => 'User not found!'], 404);
        } catch (\Exception $exception) {
            Log::error('Error fetching user: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }

    /**
     * Update the specified user in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
{
    try {
        $validated = $request->validate([
            'nama' => 'nullable|string|max:255',
            'nip' => 'nullable|numeric|unique:users,nip,' . $id . ',id_users',
            'jenis_kelamin' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'nullable|string|max:255',
            'jabatan' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users,email,' . $id . ',id_users',
            'username' => 'nullable|string|max:255|unique:users,username,' . $id . ',id_users',
            'password' => 'nullable|string|min:8',
            'role' => 'nullable|string|in:admin,pegawai',
            'img_user' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = User::findOrFail($id);

        if ($request->hasFile('img_user')) {
            // Hapus gambar lama jika ada
            if ($user->img_user) {
                Storage::delete('public/' . $user->img_user);
            }

            $image = $request->file('img_user');
            $imageName = Str::random(32) . '.' . $image->getClientOriginalExtension();
            $img_user = $image->storeAs('public/profile', $imageName);
            $img_user = str_replace('public/', '', $img_user);
            $user->img_user = $img_user;
        }

        $user->update([
            'nama' => $validated['nama'],
            'nip' => $validated['nip'],
            'jenis_kelamin' => $validated['jenis_kelamin'],
            'tanggal_lahir' => $validated['tanggal_lahir'],
            'alamat' => $validated['alamat'],
            'jabatan' => $validated['jabatan'],
            'email' => $validated['email'],
            'username' => $validated['username'],
            'password' => isset($validated['password']) ? Hash::make($validated['password']) : $user->password,
            'role' => $validated['role'],
        ]);

        return response()->json($user);
        } catch (\Exception $exception) {
            Log::error('Error updating category: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }

    /**
     * Remove the specified user from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);

            if ($user->img_user) {
                Storage::delete('public/' . $user->img_user);
            }
            
            $user->delete();
            return response()->json(null, 204);
        } catch (\Exception $exception) {
            Log::error('Error deleting category: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }
}

