<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isActive();
    }

    public function view(User $user, Project $project): bool
    {
        return $user->isActive();
    }

    public function create(User $user): bool
    {
        return $user->isActive();
    }

    public function update(User $user, Project $project): bool
    {
        return $user->isActive();
    }

    public function delete(User $user, Project $project): bool
    {
        return $user->isAdmin();
    }

    public function publish(User $user, ?Project $project = null): bool
    {
        return $user->isAdmin();
    }
}
