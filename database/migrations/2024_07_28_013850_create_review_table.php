<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReviewTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('review', function (Blueprint $table) {
            $table->id('id_review');
            $table->integer('id_users');
            $table->integer('id_buku');
            $table->text('review_text')->nullable();
            $table->integer('rating')->check('rating >= 1 AND rating <= 5');
            $table->timestamps(); // Add this line
            $table->foreign('id_user')->references('id_user')->on('users');
            $table->foreign('id_buku')->references('id_buku')->on('buku');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('review');
    }
};

