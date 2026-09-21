<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('technologies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 80);
            $table->string('slug', 100)->unique();
            $table->string('area', 40)->default('backend');
            $table->unsignedSmallInteger('position')->default(0);
            $table->timestamps();

            $table->index(['area', 'position']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('technologies');
    }
};
