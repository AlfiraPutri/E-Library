<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;


class FavoriteController extends Controller
{
    public function addToFavorites(Request $request)
    {
        $favorite = new Favorite();
        $favorite->id_users = $request->user()->id;
        $favorite->id_buku = $request->id_buku;
        $favorite->save();

        return response()->json(['message' => 'Added to favorites'], 200);
    }

    public function getFavorites(Request $request)
    {
        $favorites = Favorite::where('id_users', $request->users()->id)->with('buku')->get();
        return response()->json($favorites, 200);
    }
}
