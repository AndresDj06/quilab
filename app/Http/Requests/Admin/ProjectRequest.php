<?php

namespace App\Http\Requests\Admin;

use App\Enums\ProjectStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization is handled by the controller policy.
    }

    public function rules(): array
    {
        $projectId = $this->route('project')?->id;

        return [
            'name' => ['required', 'string', 'max:160'],
            'slug' => ['nullable', 'string', 'max:180', 'alpha_dash', Rule::unique('projects', 'slug')->ignore($projectId)],
            'title' => ['required', 'string', 'max:220'],
            'summary' => ['required', 'string', 'max:320'],
            'description' => ['nullable', 'string', 'max:20000'],
            'problem' => ['nullable', 'string', 'max:5000'],
            'solution' => ['nullable', 'string', 'max:5000'],
            'features' => ['nullable', 'array', 'max:20'],
            'features.*' => ['required', 'string', 'max:220'],
            'results' => ['nullable', 'array', 'max:12'],
            'results.*.label' => ['required', 'string', 'max:120'],
            'results.*.value' => ['required', 'string', 'max:60'],
            'category_id' => ['nullable', 'integer', Rule::exists('categories', 'id')],
            'status' => ['required', Rule::in(ProjectStatus::values())],
            'year' => ['required', 'integer', 'min:2000', 'max:2100'],
            'location' => ['nullable', 'string', 'max:140'],
            'client' => ['nullable', 'string', 'max:140'],
            'external_url' => ['nullable', 'url', 'max:255'],
            'cover' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:4096'],
            'is_published' => ['sometimes', 'boolean'],
            'is_featured' => ['sometimes', 'boolean'],
            'position' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'meta_title' => ['nullable', 'string', 'max:180'],
            'meta_description' => ['nullable', 'string', 'max:320'],
            'started_at' => ['nullable', 'date'],
            'finished_at' => ['nullable', 'date', 'after_or_equal:started_at'],
            'technologies' => ['nullable', 'array', 'max:30'],
            'technologies.*' => ['integer', Rule::exists('technologies', 'id')],
            'members' => ['nullable', 'array', 'max:40'],
            'members.*.member_id' => ['required', 'integer', Rule::exists('members', 'id')],
            'members.*.role' => ['nullable', 'string', 'max:120'],
            'members.*.responsibility' => ['nullable', 'string', 'max:255'],
            'members.*.joined_at' => ['nullable', 'date'],
        ];
    }

    protected function prepareForValidation(): void
    {
        foreach (['features', 'results', 'technologies', 'members'] as $key) {
            $value = $this->input($key);
            if (is_string($value)) {
                $decoded = json_decode($value, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $this->merge([$key => $decoded]);
                }
            }
        }

        foreach (['is_published', 'is_featured'] as $flag) {
            if ($this->has($flag)) {
                $this->merge([$flag => filter_var($this->input($flag), FILTER_VALIDATE_BOOLEAN)]);
            }
        }
    }
}
