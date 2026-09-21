<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MemberRequest;
use App\Http\Resources\MemberResource;
use App\Models\Member;
use App\Support\Media;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Member::class);

        $query = Member::query()
            ->with('technologies')
            ->withCount('projects')
            ->ordered();

        if ($request->filled('q')) {
            $term = '%'.$request->string('q').'%';
            $query->where(fn ($q) => $q
                ->where('public_name', 'like', $term)
                ->orWhere('role_title', 'like', $term)
                ->orWhere('specialty', 'like', $term));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        return MemberResource::collection($query->paginate(16)->withQueryString())->response();
    }

    public function store(MemberRequest $request): JsonResponse
    {
        $this->authorize('create', Member::class);

        $member = Member::query()->create($this->payload($request));
        $member->technologies()->sync($request->input('technologies', []));

        return response()->json([
            'member' => new MemberResource($member->load('technologies')->loadCount('projects')),
        ], 201);
    }

    public function show(Member $member): JsonResponse
    {
        $this->authorize('view', $member);

        return response()->json([
            'member' => new MemberResource(
                $member->load(['technologies', 'projects.category', 'projects.technologies'])
            ),
        ]);
    }

    public function update(MemberRequest $request, Member $member): JsonResponse
    {
        $this->authorize('update', $member);

        $member->update($this->payload($request, $member));
        if ($request->exists('technologies')) {
            $member->technologies()->sync($request->input('technologies', []));
        }

        return response()->json([
            'member' => new MemberResource(
                $member->refresh()->load(['technologies', 'projects'])->loadCount('projects')
            ),
        ]);
    }

    public function destroy(Member $member): JsonResponse
    {
        $this->authorize('delete', $member);

        Media::delete($member->photo);
        $member->delete();

        return response()->json(['ok' => true]);
    }

    private function payload(MemberRequest $request, ?Member $member = null): array
    {
        $data = $request->safe()->except(['photo', 'technologies']);

        if ($request->hasFile('photo')) {
            $data['photo'] = Media::replace($member?->photo, $request->file('photo'), 'members');
        }

        return $data;
    }
}
