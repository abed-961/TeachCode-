<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\InstructorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    $user = $request->user();
    return $user;

})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


Route::middleware("auth:sanctum")->group(function () {
    Route::post("/user/update", [AuthController::class, "updateUser"]);
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::post("/delete", [AuthController::class, "deleteAccount"]);

    Route::middleware("role:admin")->group(function () {
        //users 
        Route::get("/users", [AuthController::class, "applyInstructor"]);
        // instructors
        Route::get("/admin/instructor", [InstructorController::class, "index"]);
        Route::post("/admin/instructor/store", [InstructorController::class, "store"]);
        Route::patch("/admin/instructor/edit", [InstructorController::class, "edit"]);
        Route::delete("/admin/{instructor}/instructor", [InstructorController::class, "delete"]);

        //courses 
        Route::get("admin/instructors", [InstructorController::class, "instructorAll"]);
        Route::post("/admin/courses/add", [CourseController::class, "store"]);
        Route::get("/admin/courses", [CourseController::class, 'index']);
        Route::patch("/admin/courses/{course}", [CourseController::class, "editCourse"]);
        Route::delete("/admin/courses/{course}", [CourseController::class, "deleteCourse"]);

        //users
        Route::get("/clients", [AuthController::class, "clients"]);
        Route::delete("clients/{user}/delete", [AdminController::class, "deleteUser"]);
        Route::post("/user/add/course", [AdminController::class, "AddUserToCourse"]);
    });
});



Route::fallback(function () {
    return redirect()->away('http://localhost:4200');
});



