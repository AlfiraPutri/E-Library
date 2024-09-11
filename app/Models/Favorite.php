<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $table = 'favorites';
    protected $primaryKey = 'id_favorites';

    protected $fillable = ['id_users', 'id_buku'];

    // Relationship to the User model
    public function users()
    {
        return $this->belongsTo(User::class, 'id_users', 'id');
    }

    // Relationship to the Book model
    public function buku()
    {
        return $this->belongsTo(Buku::class, 'id_buku', 'id_buku');
    }
}
