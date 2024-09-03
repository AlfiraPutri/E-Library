<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;



class HistoryController extends Controller
{
    public function addToHistory(Request $request)
    {
        $history = new History();
        $history->id_users = $request->user()->id_users;
        $history->id_buku = $request->id_buku;
        $history->save();

        return response()->json(['message' => 'Added to history'], 200);
    }

    public function getHistory(Request $request)
    {
        $history = History::where('id_users', $request->user()->id_users)->with('buku')->get();
        return response()->json($history, 200);
    }
}
