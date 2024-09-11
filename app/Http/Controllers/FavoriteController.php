<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;


class FavoriteController extends Controller
{
    public function addToFavorites(Request $request, $id)
    {
        Log::info('Data yang diterima:', $request->all());

        try {
            // Memastikan buku yang dimaksud ada
            $id_buku = $request->input('id_buku');
        Log::info('Mencari buku dengan id_buku: ' . $id_buku);

        $buku = Buku::find($id_buku);
        if (!$buku) {
            return response()->json(['message' => 'Buku tidak ditemukan'], 404);
        }

            // Menyimpan riwayat buku yang telah dibaca oleh pengguna
            Favorite::create([
                'id_users' => $id,
                'id_buku' => $request->input('id_buku'),
                'created_at' => now(), // Menyimpan tanggal dan waktu saat buku dibaca
            ]);

            return response()->json(['message' => 'Added to favorite'], 200);
        } catch (\Exception $exception) {
            return response()->json(['message' => 'Failed: ' . $exception->getMessage()], 500);
        }
    }

    public function getFavorites($id)
    {

        try{
            $favorite = Favorite::where('id_users', '=', $id)->with('buku')->get();
            return response()->json($favorite, 200);
            }catch(\Exception $exception){
            return response()->json(['message' => 'Error fetching favorite: ' . $exception->getMessage()], 500);
            }
            }
}
