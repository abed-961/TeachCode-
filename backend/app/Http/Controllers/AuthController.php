<?php

namespace App\Http\Controllers;

use App\DTO\Response;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\updateUserRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Event\RequestEvent;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {

        $credentials = $request->validated();
        if (Auth::attempt($credentials)) {
            $id = Auth::user()->id;
            $user = User::find($id);
            $user->createToken('user-token')->plainTextToken;
            return Response::success('login successfully', $user);
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

    public function updateUser(updateUserRequest $request)
    {

        $user = $request->user();
        $data = $request->validated();
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $photoName = time() . "Teach_Code" . $photo->getClientOriginalName();

            $data["photo"] = $photo->storeAs('photos', $photoName, 'public');

        }
        try {
            $user->update($data);
            return Response::success('user updated successfully');
        } catch (Exception $err) {
            return Response::error($err);
        }



    }
}
