<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BukuController extends Controller
{

    /**
     * Display a listing of the books.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function index(Request $request)
    {
        try {

            // Ambil parameter pencarian dari request
            $search = $request->input('search');

            if ($search) {
                $buku = Buku::where('judul', 'LIKE', '%' . $search . '%')
                    ->orWhere('isbn', 'LIKE', '%' . $search . '%')
                    ->orWhere('pengarang', 'LIKE', '%' . $search . '%')
                    ->get();
                } else {
                    // Jika tidak ada parameter pencarian, ambil semua pengguna
                    $buku = Buku::all();
                }


            return response()->json($buku);
        } catch (\Exception $exception) {
            Log::error('Error fetching books: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }

    /**
     * Store a newly created book in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {

            Log::info('Store method called at: ' . now()->toDateTimeString());
    Log::info('Request data: ', $request->all());

            // Validasi input
            $validated = $request->validate([
                'judul' => 'required|string|max:255',
                'isbn' => 'required|string|max:255|unique:buku,isbn',
                'pengarang' => 'required|string|max:255',
                'penerbit' => 'required|string|max:255',
                'tanggal_terbit' => 'required|date',
                'jumlah_buku' => 'required|integer',
                'id_kategori' => 'required|integer',
                'deskripsi' => 'nullable|string',
                'jumlah_halaman' => 'required|integer',
                'file_upload' => 'nullable|file|mimes:pdf|max:2048', // Validasi PDF
                'img_buku' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);


            Log::info('Validated data: ', $validated);

            // Inisialisasi variabel
        $file_upload = null;
        $img_buku = null;

            // Handle file uploads if any
            if ($request->hasFile('file_upload')){
                $file_upload = $request->file('file_upload')->store('pdfs', 'public');
            }

            if ($request->hasFile('img_buku')) {
                $image = $request->file('img_buku');
                $imageName = Str::random(32) . '.' . $image->getClientOriginalExtension();
                $img_buku = $image->storeAs('public/images', $imageName);
                $img_buku = str_replace('public/', '', $img_buku); // Simpan path relatif
            }

                $buku = Buku::create([
                    'judul' => $validated['judul'],
                    'isbn' => $validated['isbn'],
                    'pengarang' => $validated['pengarang'],
                    'penerbit' => $validated['penerbit'],
                    'tanggal_terbit' => $validated['tanggal_terbit'],
                    'jumlah_buku' => $validated['jumlah_buku'],
                    'id_kategori' => $validated['id_kategori'],
                    'deskripsi' => $validated['deskripsi'],
                    'jumlah_halaman' => $validated['jumlah_halaman'],
                    'file_upload' => $file_upload,
                    'img_buku' => $img_buku, // Gunakan $img_buku di sini
                ]);


            return response()->json([$buku]);
        } catch (ValidationException $exception) {
            return response()->json(['status' => 422, 'message' => $exception->errors()], 422);
        } catch (\Exception $exception) {
            Log::error('Error creating book: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }

    /**
     * Display the specified book.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $buku = Buku::with('kategori')->findOrFail($id);

            // Mengubah path relatif menjadi URL penuh
        if ($buku->img_buku) {
            $buku->img_buku = Storage::url($buku->img_buku);
        }

        if ($buku->file_upload) {
            $buku->file_upload = Storage::url($buku->file_upload);
        }
        $response = response()->json($buku);
        $response->header('Access-Control-Allow-Origin', '*');
            return $response;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $exception) {
            return response()->json(['status' => 404, 'message' => 'Book not found!'], 404);
        } catch (\Exception $exception) {
            Log::error('Error fetching book: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }

    /**
     * Update the specified book in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
{
    try {
        // Validasi input
        $validated = $request->validate([
            'judul' => 'nullable|string|max:255',
            'isbn' => 'nullable|string|max:255|unique:buku,isbn,' . $id . ',id_buku',
            'pengarang' => 'nullable|string|max:255',
            'penerbit' => 'nullable|string|max:255',
            'tanggal_terbit' => 'nullable|date',
            'jumlah_buku' => 'nullable|integer',
            'id_kategori' => 'nullable|integer',
            'deskripsi' => 'nullable|string',
            'jumlah_halaman' => 'nullable|integer',
            // 'file_upload' => 'nullable|file|mimes:pdf|max:2048',
            // 'img_buku' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


        $buku = Buku::findOrFail($id);

        // Handle file uploads if any
        if ($request->hasFile('file_upload')) {
            // Delete old file if exists
            if ($buku->file_upload) {
                Storage::disk('public')->delete($buku->file_upload);
            }
            $file_upload = $request->file('file_upload')->store('pdfs', 'public');
        } else {
            $file_upload = $buku->file_upload;
        }

        if ($request->hasFile('img_buku')) {
            // Delete old image if exists
            if ($buku->img_buku) {
                Storage::disk('public')->delete('images/' . $buku->img_buku);
            }
            $image = $request->file('img_buku');
            $imageName = Str::random(32) . '.' . $image->getClientOriginalExtension();
            $img_buku = $image->storeAs('public/images', $imageName);
            $img_buku = str_replace('public/', '', $img_buku); // Simpan path relatif

        } else {
            $img_buku = $buku->img_buku;
        }

        // $buku = Buku::findOrFail($id);

        $buku->update([
            'judul' => $validated['judul'],
            'isbn' => $validated['isbn'],
            'pengarang' => $validated['pengarang'],
            'penerbit' => $validated['penerbit'],
            'tanggal_terbit' => $validated['tanggal_terbit'],
            'jumlah_buku' => $validated['jumlah_buku'],
            'id_kategori' =>  $validated['id_kategori'],
            'deskripsi' => $validated['deskripsi'],
            'jumlah_halaman' => $validated['jumlah_halaman'],
            'file_upload' => $file_upload,
            'img_buku' => $img_buku,

        ]);

        return response()->json([$buku]);
    } catch (ValidationException $exception) {
        return response()->json(['status' => 422, 'message' => $exception->errors()], 422);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $exception) {
        return response()->json(['status' => 404, 'message' => 'Book not found!'], 404);
    } catch (\Exception $exception) {
        Log::error('Error updating book: ' . $exception->getMessage());
        return response()->json(['status' => 500, 'message' =>  $exception->getMessage(), 'data' => $request->jumlah], 500);
        // return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
    }
}



    /**
     * Remove the specified book from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $buku = Buku::findOrFail($id);
            $buku->delete();
            return response()->json(['message' => 'Book deleted successfully!']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $exception) {
            return response()->json(['status' => 404, 'message' => 'Book not found!'], 404);
        } catch (\Exception $exception) {
            Log::error('Error deleting book: ' . $exception->getMessage());
            return response()->json(['status' => 500, 'message' => 'Internal server error!'], 500);
        }
    }
}
