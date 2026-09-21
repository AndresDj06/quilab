<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectCardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'name' => $this->name,
            'slug' => $this->slug,
            'title' => $this->title,
            'summary' => $this->summary,
            'status' => $this->status->value,
            'status_label' => $this->status->label(),
            'year' => $this->year,
            'location' => $this->location,
            'cover_url' => $this->cover_url,
            'is_published' => $this->is_published,
            'is_featured' => $this->is_featured,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'technologies' => TechnologyResource::collection($this->whenLoaded('technologies')),
            'members_count' => $this->whenCounted('members'),
        ];
    }
}
