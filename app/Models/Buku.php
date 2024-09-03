<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    use HasFactory;

    protected $table = 'buku';
    protected $primaryKey = 'id_buku';

    protected $fillable = [
        'judul',
        'isbn',
        'pengarang',
        'penerbit',
        'tanggal_terbit',
        'jumlah_buku',
        'id_kategori',
        'deskripsi',
        'jumlah_halaman',
        'file_upload',
        'img_buku'
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'id_kategori');
    }
}
