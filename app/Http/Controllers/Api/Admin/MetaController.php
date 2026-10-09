<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\ProjectStatus;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\MemberResource;
use App\Http\Resources\TechnologyResource;
use App\Models\Category;
use App\Models\Member;
use App\Models\Project;
use App\Models\Technology;
use Illuminate\Http\JsonResponse;

class MetaController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'categories' => CategoryResource::collection(Category::query()->orderBy('position')->get()),
            'technologies' => TechnologyResource::collection(Technology::query()->orderBy('position')->get()),
            'members' => MemberResource::collection(Member::query()->active()->ordered()->get()),
            'projects' => Project::query()->orderBy('name')->get(['id', 'name', 'title', 'year']),
            'statuses' => ProjectStatus::options(),
            'roles' => UserRole::options(),
        ]);
    }
}
