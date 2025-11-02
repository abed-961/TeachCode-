<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'name',
        'description',
        'teaching_hours',
        'duration_weeks',
        'instructor_id',
    ];

    public function users()
    {
        return Course::belongsToMany(User::class);
    }

    public function instructor()
    {
        return Course::belongsTo(Instructor_info::class);
    }
}
