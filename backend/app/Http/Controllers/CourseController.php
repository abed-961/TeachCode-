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
        $courses = Course::with(['instructor.user'])->get();
        return Response::to_json($courses);
    }
    public function store(AddCourseRequest $request)
    {
        $course = $request->validated();
        $trimedCourse = Trim::trimData($course);
        Course::create($trimedCourse);
        return Response::success("Courses Added Successfully");
    }

    public function editCourse(Course $course, AddCourseRequest $request)
    {
        $edited_course = $request->validated();
        $trimedCourse = Trim::trimData($edited_course);
        $course->update($trimedCourse);
        return Response::success('course Edited successfully');
    }

    public function deleteCourse(Course $course)
    {
        $course->delete();
        return Response::success("course deleted successfully");
    }
}