<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {

        $credentials = $request->validated();
        if (Auth::attempt($credentials)) {
            $user_id = Auth::user()->id;
            $user = User::find($user_id);
            $user->createToken('auth_token')->plainTextToken;
            return Response::success('login successful', $user);
        }

        return Response::error('email or password is incorrect');
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $user = User::create($data);
        Auth::login($user);
        $user->createToken("user-token");
        return Response::success('account Registered Successfully', $user);

    }
}
