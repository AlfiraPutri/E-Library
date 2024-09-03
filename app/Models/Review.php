<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    // Specify the table name if it differs from the plural form of the model name
    protected $table = 'review';

    // Specify the primary key if it is different from 'id'
    protected $primaryKey = 'id_review';

    // Specify fillable fields for mass assignment
    protected $fillable = [
        'id_users',
        'id_buku',
        'username',
        'judul_buku',
        'review_text',
        'rating',
    ];

    // Define relationships
    public function users()
    {
        return $this->belongsTo(User::class, 'id_users', 'id_users');
    }

    public function buku()
    {
        return $this->belongsTo(Buku::class, 'id_buku', 'id_buku');
    }
}


