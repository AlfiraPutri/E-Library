<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Download extends Model
{
    use HasFactory;

    protected $fillable = ['id_users', 'id_buku'];

    // Relationship to the User model
    public function users()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship to the Book model
    public function buku()
    {
        return $this->belongsTo(Buku::class);
    }
}
