<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Http\Requests\ApplyUserToCourseRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function deleteUser(User $user)
    {
        $user->delete();
        return Response::success("user Deleted successfully");
    }

    public function AddUserToCourse(ApplyUserToCourseRequest $request)
    {
        $data = $request->validated();
        $applied = DB::table('users_courses_subscription')
            ->where('user_id', $data['user_id'])
            ->where('course_id', $data['course_id'])
            ->exists();
        if ($applied) {
            return Response::error("users already exist in this course");
        }

        User::find($data['user_id'])->courses()->attach($data['course_id']);

        return Response::success("user added succefully to course ");
    }
}
