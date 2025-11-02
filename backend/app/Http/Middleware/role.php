<?php

namespace App\Http\Middleware;

use App\DTO\Response;
use Closure;
use Illuminate\Http\Request;

class role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$role)
    {
        $user = $request->user();
        if (!in_array($user->role, $role)) {
            return Response::error('Unauthorized 1' . $user->role);
        }
        return $next($request);
    }
}
