<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', User::class);

        $query = User::query()->latest();

        if ($request->filled('q')) {
            $term = '%'.$request->string('q').'%';
            $query->where(fn ($q) => $q->where('name', 'like', $term)->orWhere('email', 'like', $term));
        }

        return UserResource::collection($query->paginate(16)->withQueryString())->response();
    }

    public function store(UserRequest $request): JsonResponse
    {
        $this->authorize('create', User::class);
        $this->guardRoleAssignment($request);

        $user = User::query()->create($request->safe()->only(['name', 'email', 'password', 'role', 'status']));

        return response()->json(['user' => new UserResource($user)], 201);
    }

    public function update(UserRequest $request, User $user): JsonResponse
    {
        $this->authorize('update', $user);
        $this->guardRoleAssignment($request, $user);

        $data = $request->safe()->only(['name', 'email', 'role', 'status']);
        if ($request->filled('password')) {
            $data['password'] = $request->input('password');
        }

        $user->update($data);

        return response()->json(['user' => new UserResource($user->refresh())]);
    }

    public function destroy(User $user): JsonResponse
    {
        $this->authorize('delete', $user);
        $user->delete();

        return response()->json(['ok' => true]);
    }

    private function guardRoleAssignment(UserRequest $request, ?User $target = null): void
    {
        $actor = $request->user();
        $role = UserRole::from($request->input('role'));

        if ($role === UserRole::SuperAdmin && ! $actor->isSuperAdmin()) {
            throw ValidationException::withMessages([
                'role' => ['Solo un Super Admin puede asignar ese rol.'],
            ]);
        }

        if ($target && $target->isSuperAdmin() && ! $actor->isSuperAdmin()) {
            throw ValidationException::withMessages([
                'role' => ['No puedes modificar un Super Admin.'],
            ]);
        }
    }
}
