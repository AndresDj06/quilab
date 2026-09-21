<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'public_name' => $this->public_name,
            'slug' => $this->slug,
            'initials' => $this->initials,
            'photo' => $this->photo,
            'photo_url' => $this->photo_url,
            'role_title' => $this->role_title,
            'specialty' => $this->specialty,
            'bio' => $this->bio,
            'email' => $this->email,
            'linkedin' => $this->linkedin,
            'github' => $this->github,
            'website' => $this->website,
            'location' => $this->location,
            'status' => $this->status,
            'is_featured' => $this->is_featured,
            'position' => $this->position,
            'technologies' => TechnologyResource::collection($this->whenLoaded('technologies')),
            'projects_count' => $this->whenCounted('projects'),
            'projects' => ProjectCardResource::collection($this->whenLoaded('projects')),
            // Present when the member is loaded through a project relation.
            'pivot' => $this->whenPivotLoaded('project_member', fn () => [
                'role' => $this->pivot->role,
                'responsibility' => $this->pivot->responsibility,
                'joined_at' => $this->pivot->joined_at,
                'position' => $this->pivot->position,
            ]),
        ];
    }
}
