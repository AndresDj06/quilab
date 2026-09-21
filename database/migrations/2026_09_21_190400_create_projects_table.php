<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('name', 160);
            $table->string('slug', 180)->unique();
            $table->string('title', 220);
            $table->string('summary', 320);
            $table->longText('description')->nullable();
            $table->text('problem')->nullable();
            $table->text('solution')->nullable();
            $table->json('features')->nullable();
            $table->json('results')->nullable();
            $table->string('status', 30)->default('idea');
            $table->unsignedSmallInteger('year');
            $table->string('location', 140)->nullable();
            $table->string('client', 140)->nullable();
            $table->string('cover')->nullable();
            $table->string('external_url')->nullable();
            $table->boolean('is_published')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->unsignedSmallInteger('position')->default(0);
            $table->string('meta_title', 180)->nullable();
            $table->string('meta_description', 320)->nullable();
            $table->date('started_at')->nullable();
            $table->date('finished_at')->nullable();
            $table->timestamps();

            $table->index(['is_published', 'status']);
            $table->index(['year', 'position']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
