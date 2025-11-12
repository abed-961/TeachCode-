<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Http\Requests\course\AddCourseRequest;
use App\Models\Course;
use App\Util\Trim;
use Illuminate\Http\Request;

class CourseController extends Controller
{

    public function index()
    {
        $courses = Course::with(['instructor.user', 'outcomes'])->get();
        return Response::to_json($courses);
    }
    public function store(AddCourseRequest $request)
    {
        // Validate and trim data
        $courseData = $request->validated();

        $outcomes = $courseData['outcomes'] ?? [];
        unset($courseData['outcomes']);

        $trimmedCourse = Trim::trimData($courseData);


        // Create the course
        $course = Course::create($trimmedCourse);

        // If there are outcomes, store them
        if (!empty($outcomes)) {
            foreach ($outcomes as $outcome) {
                $course->outcomes()->create([
                    'description' => trim($outcome),
                ]);
            }
        }

        return Response::success("Course Added Successfully");
    }

    public function editCourse(Course $course, AddCourseRequest $request)
    {
        $edited_course = $request->validated();
        $trimedCourse = Trim::trimData($edited_course);
        $course->update($trimedCourse);
        $course->outcomes()->delete();
        foreach ($edited_course['outcomes'] as $outcome) {
            if (!empty($outcome))
                $course->outcomes()->create([
                    'description' => trim($outcome),
                ]);
        }

        return Response::success('course Edited successfully');
    }

    public function deleteCourse(Course $course)
    {
        $course->delete();
        return Response::success("course deleted successfully");
    }
}