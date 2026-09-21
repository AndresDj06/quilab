<?php

namespace App\Policies;

use App\Models\Member;
use App\Models\User;

class MemberPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isActive();
    }

    public function view(User $user, Member $member): bool
    {
        return $user->isActive();
    }

    public function create(User $user): bool
    {
        return $user->isActive();
    }

    public function update(User $user, Member $member): bool
    {
        return $user->isActive();
    }

    public function delete(User $user, Member $member): bool
    {
        return $user->isAdmin();
    }
}
