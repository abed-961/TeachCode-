<?php

use App\Http\Controllers\AuthController;
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

});



Route::fallback(function () {
    return redirect()->away('http://localhost:4200');
});



