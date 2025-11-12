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
        'payment',
        'start_date'
    ];

    public function users()
    {
        return Course::belongsToMany(User::class, 'users_courses_subscription')
            ->withTimestamps();
    }

    public function instructor()
    {
        return Course::belongsTo(Instructor_info::class);
    }

    public function outcomes()
    {
        return $this->hasMany(CourseOutcome::class);
    }
}
