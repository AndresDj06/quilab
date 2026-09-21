<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'description' => $this->description,
            'problem' => $this->problem,
            'solution' => $this->solution,
            'features' => $this->features ?? [],
            'results' => $this->results ?? [],
            'status' => $this->status->value,
            'status_label' => $this->status->label(),
            'year' => $this->year,
            'location' => $this->location,
            'client' => $this->client,
            'cover' => $this->cover,
            'cover_url' => $this->cover_url,
            'external_url' => $this->external_url,
            'is_published' => $this->is_published,
            'is_featured' => $this->is_featured,
            'position' => $this->position,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'started_at' => optional($this->started_at)->toDateString(),
            'finished_at' => optional($this->finished_at)->toDateString(),
            'category_id' => $this->category_id,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'technologies' => TechnologyResource::collection($this->whenLoaded('technologies')),
            'members' => MemberResource::collection($this->whenLoaded('members')),
            'images' => ProjectImageResource::collection($this->whenLoaded('images')),
            'updated_at' => optional($this->updated_at)->toIso8601String(),
        ];
    }
}
