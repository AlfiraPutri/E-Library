<?php

namespace App\Http\Controllers;

use App\Models\Download;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class DownloadController extends Controller
{
    public function addDownload(Request $request)
    {
        $download = new Download();
        $download->id_users = $request->user()->id;
        $download->id_buku = $request->id_buku;
        $download->save();

        return response()->json(['message' => 'Download recorded'], 200);
    }

    public function getDownloads(Request $request)
    {
        $downloads = Download::where('id_users', $request->users()->id)->with('buku')->get();
        return response()->json($downloads, 200);
    }
}
