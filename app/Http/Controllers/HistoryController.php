<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\Buku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class HistoryController extends Controller

{

    public function addToHistory(Request $request, $id)
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
            History::create([
                'id_users' => $id,
                'id_buku' => $request->input('id_buku'),
                'created_at' => now(), // Menyimpan tanggal dan waktu saat buku dibaca
            ]);

            return response()->json(['message' => 'Added to history'], 200);
        } catch (\Exception $exception) {
            return response()->json(['message' => 'Failed: ' . $exception->getMessage()], 500);
        }
    }

    public function getHistory($id)
{

    try{
        $history = History::where('id_users', '=', $id)->with('buku')->get();
        return response()->json($history, 200);
        }catch(\Exception $exception){
        return response()->json(['message' => 'Error fetching history: ' . $exception->getMessage()], 500);
        }
        }

        public function getAllHistory() {
            try {
                // Ambil semua riwayat buku yang sudah dibaca dari semua user
                $history = DB::table('histories')
                    ->select('id_buku')
                    ->distinct()
                    ->get();

                // Kembalikan data riwayat dalam format JSON
                return response()->json($history);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Terjadi kesalahan saat mengambil data history'], 500);
            }
        }
}
