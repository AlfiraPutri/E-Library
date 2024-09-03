<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBukuTable extends Migration
{
    public function up()
    {
        Schema::create('buku', function (Blueprint $table) {
            $table->id('id_buku');
            $table->string('judul');
            $table->string('pengarang');
            $table->string('penerbit');
            $table->date('tanggal_terbit');
            $table->integer('jumlah_buku');
            $table->bigInteger('id_kategori')->unsigned();
            $table->text('deskripsi')->nullable();
            $table->string('file_upload')->nullable();
            $table->string('isbn');
            $table->integer('jumlah_halaman');
            $table->string('img_buku')->nullable();
            $table->timestamps();

            $table->foreign('id_kategori')->references('id_kategori')->on('kategori');
        });
    }

    public function down()
    {
        Schema::dropIfExists('buku');
    }
};
