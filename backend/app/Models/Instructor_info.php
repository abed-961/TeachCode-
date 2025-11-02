<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instructor_info extends Model
{
    protected $fillable = [
        "company_name",
        "price",
        "experience_years",
        "user_id",
    ];

    public function user()
    {
        return Instructor_info::belongsTo(User::class);
    }

    public function courses()
    {
        return Instructor_info::hasMany(Course::class);
    }
}
