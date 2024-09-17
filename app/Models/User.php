<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'id_users';
    public $incrementing = true;

    // Menentukan tipe primary key jika bukan integer
    protected $keyType = 'int';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string>
     */
    protected $fillable = [
        'nama',
        'nip',
        'jenis_kelamin',
        'tanggal_lahir',
        'alamat',
        'jabatan',
        'email',
        'username',
        'role',
        'password',
        'img_user'
    ];

    /**
     * The attributes that are hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Uncomment this line if you don't want timestamps
    // public $timestamps = false;
}
