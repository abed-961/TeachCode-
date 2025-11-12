<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class CourseOutcome extends Model
{
    public $timestamps = false;
    protected $fillable = ['course_id', 'description'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
