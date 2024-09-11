<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class KategoriController extends Controller
{



    /**
     * Menampilkan daftar semua kategori.
     */
    public function index(Request $request)
{
    try {
        // Ambil parameter pencarian dari request
        $search = $request->input('search');

        // Jika ada parameter pencarian, filter kategori berdasarkan nama_kategori
        if ($search) {
            $kategori = Kategori::where('nama_kategori', 'LIKE', '%' . $search . '%')
                ->withCount('buku')
                ->get();
        } else {
            // Jika tidak ada pencarian, ambil semua kategori
            $kategori = Kategori::withCount('buku')->get();
        }
        
        //$kategori = Kategori::withCount('buku')->get(); // Menggunakan withCount untuk menghitung jumlah buku

        // Membuat respon dengan menambahkan jumlah buku ke dalam setiap kategori
        $kategori = $kategori->map(function($kategori) {
            return [
                'id_kategori' => $kategori->id_kategori,
                'nama_kategori' => $kategori->nama_kategori,
                'jumlah_buku' => $kategori->buku_count, // Menggunakan properti buku_count yang otomatis ditambahkan oleh withCount
            ];
        });

        return response()->json($kategori);
    } catch (\Exception $exception) {
        Log::error('Error fetching categories: ' . $exception->getMessage());
        return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
    }
}

    /**
     * Menyimpan kategori baru.
     */
    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'nama_kategori' => 'required|string|max:255',
            'jumlah_buku' => 'required|integer'
        ]);

        try {
            // Logging data yang diterima untuk debugging
            Log::info('Data received for storing:', $validated);

            $kategori = Kategori::create([
                'nama_kategori' => $validated['nama_kategori'],
                'jumlah_buku' => $validated['jumlah_buku'],
            ]);

            return response()->json(['status' => 200, 'message' => 'Berhasil input data!'], 201);
        } catch (\Exception $exception) {
            Log::error('Error storing category: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }

    /**
     * Mengupdate kategori berdasarkan ID.
     */
    public function update(Request $request, $id)
    {
        // Validasi input
        $validated = $request->validate([
            'nama_kategori' => 'required|string|max:255',
            // 'jumlah_buku' => 'required|integer'
        ]);

        try {
            $kategori = Kategori::findOrFail($id);
            $kategori->update([
                'nama_kategori' => $validated['nama_kategori'],
                // 'jumlah_buku' => $validated['jumlah_buku'],
            ]);

            return response()->json($kategori);
        } catch (\Exception $exception) {
            Log::error('Error updating category: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }

    /**
     * Menghapus kategori berdasarkan ID.
     */
    public function destroy($id)
    {
        try {
            $kategori = Kategori::findOrFail($id);
            $kategori->delete();

            return response()->json(null, 204);
        } catch (\Exception $exception) {
            Log::error('Error deleting category: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }

}
