<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->string('first_name');
            $table->string('last_name');
            $table->text('bio')->nullable();
            $table->string('photo')->default("/photos/default-photo.jpg");
            $table->string('phone');
            $table->string('country')->nullable();
            $table->string('region');
            $table->enum('role', ['user', 'admin', 'instructor', 'moderator'])->default('user');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
            $table->dropColumn('region');
            $table->dropColumn('country');
            $table->dropColumn('phone');
            $table->dropColumn('photo');
            $table->dropColumn('bio');
            $table->dropColumn('first_name');
            $table->dropColumn('last_name');
            $table->string('name');


        });
    }
};
