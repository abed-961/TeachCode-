<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Http\Requests\AddInstructorRequest;
use App\Models\Instructor_info;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class InstructorController extends Controller
{
    public function index()
    {
        $instructors = User::where('role', 'instructor')
            ->with('instructor')
            ->get();
        return Response::to_json($instructors);
    }

    public function store(AddInstructorRequest $request)
    {
        $instructor_credentials = $request->validated();

        $user = User::find($instructor_credentials["user_id"]);
        $user->role = "instructor";

        if (Instructor_info::create($instructor_credentials)) {
            $user->update();
            return Response::success("Instructor Added Successfully");

        }
        return Response::error("Something Went Wrong!");
    }

    public function edit(AddInstructorRequest $request)
    {
        $data = $request->validated();
        $instructor = Instructor_info::find($request->id);
        $instructor->update($data);
        return Response::success('Instructor Edited Successfully');
    }

    public function delete(Instructor_info $instructor)
    {
        try {
            $user = User::find($instructor->user_id);
            $user->role = "user";
            $user->update();
            $instructor->delete();
        } catch (Exception $e) {
            return Response::error('Cannot remove this instructor ');
        }
        return Response::success('Instructor Removed Successfully');
    }

    public function instructorAll()
    {
        $instructors = Instructor_info::with(['user'])->get();
        return Response::to_json($instructors);
    }
}
