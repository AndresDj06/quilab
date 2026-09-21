<?php

namespace App\Http\Controllers\Api;

use App\Enums\ProjectStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContactMessageRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\MemberResource;
use App\Http\Resources\ProjectCardResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TechnologyResource;
use App\Models\Category;
use App\Models\ContactMessage;
use App\Models\Member;
use App\Models\Project;
use App\Models\Technology;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function landing(): JsonResponse
    {
        $projects = Project::query()
            ->published()
            ->with(['category', 'technologies'])
            ->withCount('members')
            ->ordered()
            ->limit(5)
            ->get();

        $members = Member::query()
            ->active()
            ->with('technologies')
            ->withCount(['projects as projects_count' => fn ($query) => $query->where('is_published', true)])
            ->ordered()
            ->get();

        return response()->json([
            'projects' => ProjectCardResource::collection($projects),
            'members' => MemberResource::collection($members),
            'stats' => [
                'projects' => Project::query()->published()->count(),
                'members' => Member::query()->active()->count(),
                'finished' => Project::query()->published()->where('status', ProjectStatus::Finished)->count(),
                'years' => max(1, (int) now()->year - (int) (Project::query()->published()->min('year') ?: now()->year) + 1),
            ],
        ]);
    }

    public function projects(Request $request): JsonResponse
    {
        $query = Project::query()
            ->published()
            ->with(['category', 'technologies'])
            ->withCount('members')
            ->ordered();

        if ($request->filled('category')) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $request->string('category')));
        }

        if ($request->filled('technology')) {
            $query->whereHas('technologies', fn ($q) => $q->where('slug', $request->string('technology')));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('year')) {
            $query->where('year', (int) $request->input('year'));
        }

        return response()->json([
            'data' => ProjectCardResource::collection($query->get()),
        ]);
    }

    public function project(Project $project): JsonResponse
    {
        abort_unless($project->is_published, 404);

        $project->load([
            'category',
            'technologies',
            'images',
            'members.technologies',
        ]);

        return response()->json([
            'project' => new ProjectResource($project),
            'related' => ProjectCardResource::collection($project->related()),
        ]);
    }

    public function members(): JsonResponse
    {
        $members = Member::query()
            ->active()
            ->with(['technologies', 'projects' => fn ($query) => $query->published()->ordered()])
            ->ordered()
            ->get();

        return response()->json([
            'data' => MemberResource::collection($members),
        ]);
    }

    public function catalogs(): JsonResponse
    {
        return response()->json([
            'categories' => CategoryResource::collection(Category::query()->orderBy('position')->get()),
            'technologies' => TechnologyResource::collection(Technology::query()->orderBy('position')->get()),
            'statuses' => ProjectStatus::options(),
            'years' => Project::query()->published()->distinct()->orderByDesc('year')->pluck('year'),
        ]);
    }

    public function contact(ContactMessageRequest $request): JsonResponse
    {
        ContactMessage::query()->create([
            ...$request->safe()->except('website'),
            'ip_address' => $request->ip(),
            'status' => 'new',
        ]);

        return response()->json([
            'ok' => true,
            'message' => 'Recibimos tu mensaje. Te contactaremos en breve.',
        ], 201);
    }
}
