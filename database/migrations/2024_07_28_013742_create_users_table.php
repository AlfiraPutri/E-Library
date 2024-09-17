<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('id_user');
            $table->string('nama');
            $table->bigInteger('nip')->unique();
            $table->string('jenis_kelamin')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->string('email')->unique();
            $table->string('alamat')->nullable();
            $table->string('email')->unique();
            $table->string('jabatan')->nullable();
            $table->string('img_user')->nullable();
            $table->string('username')->unique();
            $table->string('password');
            // $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->enum('role', ['admin', 'pegawai']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
