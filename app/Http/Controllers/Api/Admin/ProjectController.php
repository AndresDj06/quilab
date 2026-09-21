<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectRequest;
use App\Http\Resources\ProjectCardResource;
use App\Http\Resources\ProjectImageResource;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Support\Media;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Project::class);

        $query = Project::query()
            ->with(['category', 'technologies'])
            ->withCount('members')
            ->ordered();

        if ($request->filled('q')) {
            $term = '%'.$request->string('q').'%';
            $query->where(fn ($q) => $q
                ->where('name', 'like', $term)
                ->orWhere('title', 'like', $term)
                ->orWhere('summary', 'like', $term));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('published')) {
            $query->where('is_published', $request->boolean('published'));
        }

        $projects = $query->paginate(12)->withQueryString();

        return ProjectCardResource::collection($projects)->response();
    }

    public function store(ProjectRequest $request): JsonResponse
    {
        $this->authorize('create', Project::class);

        $project = DB::transaction(function () use ($request) {
            $data = $this->payload($request);
            $project = Project::query()->create($data);
            $this->syncRelations($project, $request);

            return $project;
        });

        return response()->json([
            'project' => new ProjectResource($this->loadProject($project)),
        ], 201);
    }

    public function show(Project $project): JsonResponse
    {
        $this->authorize('view', $project);

        return response()->json([
            'project' => new ProjectResource($this->loadProject($project)),
        ]);
    }

    public function update(ProjectRequest $request, Project $project): JsonResponse
    {
        $this->authorize('update', $project);

        DB::transaction(function () use ($request, $project) {
            $project->update($this->payload($request, $project));
            $this->syncRelations($project, $request);
        });

        return response()->json([
            'project' => new ProjectResource($this->loadProject($project->refresh())),
        ]);
    }

    public function destroy(Project $project): JsonResponse
    {
        $this->authorize('delete', $project);

        Media::delete($project->cover);
        $project->images->each(fn (ProjectImage $image) => Media::delete($image->path));
        $project->delete();

        return response()->json(['ok' => true]);
    }

    public function publish(Project $project): JsonResponse
    {
        $this->authorize('publish', $project);
        $project->update(['is_published' => ! $project->is_published]);

        return response()->json([
            'project' => new ProjectResource($this->loadProject($project->refresh())),
        ]);
    }

    public function feature(Project $project): JsonResponse
    {
        $this->authorize('update', $project);
        $project->update(['is_featured' => ! $project->is_featured]);

        return response()->json([
            'project' => new ProjectResource($this->loadProject($project->refresh())),
        ]);
    }

    public function storeImage(Request $request, Project $project): JsonResponse
    {
        $this->authorize('update', $project);

        $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:5120'],
            'caption' => ['nullable', 'string', 'max:200'],
            'alt' => ['nullable', 'string', 'max:200'],
        ]);

        $image = $project->images()->create([
            'path' => Media::store($request->file('image'), 'projects/gallery'),
            'caption' => $request->input('caption'),
            'alt' => $request->input('alt') ?: $project->name,
            'position' => ($project->images()->max('position') ?? 0) + 1,
        ]);

        return response()->json([
            'image' => new ProjectImageResource($image),
        ], 201);
    }

    public function destroyImage(Project $project, ProjectImage $image): JsonResponse
    {
        $this->authorize('update', $project);
        abort_unless($image->project_id === $project->id, 404);

        Media::delete($image->path);
        $image->delete();

        return response()->json(['ok' => true]);
    }

    private function payload(ProjectRequest $request, ?Project $project = null): array
    {
        $data = $request->safe()->except(['cover', 'technologies', 'members']);

        if ($request->hasFile('cover')) {
            $data['cover'] = Media::replace($project?->cover, $request->file('cover'), 'projects/covers');
        }

        return $data;
    }

    private function syncRelations(Project $project, ProjectRequest $request): void
    {
        if ($request->exists('technologies')) {
            $project->technologies()->sync($request->input('technologies', []));
        }

        if ($request->exists('members')) {
            $sync = [];
            foreach ($request->input('members', []) as $index => $row) {
                $sync[$row['member_id']] = [
                    'role' => $row['role'] ?? null,
                    'responsibility' => $row['responsibility'] ?? null,
                    'joined_at' => $row['joined_at'] ?? null,
                    'position' => $index,
                ];
            }
            $project->members()->sync($sync);
        }
    }

    private function loadProject(Project $project): Project
    {
        return $project->load(['category', 'technologies', 'images', 'members.technologies']);
    }
}
