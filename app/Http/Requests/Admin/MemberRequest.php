<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $memberId = $this->route('member')?->id;

        return [
            'first_name' => ['required', 'string', 'max:80'],
            'last_name' => ['required', 'string', 'max:80'],
            'public_name' => ['nullable', 'string', 'max:120'],
            'slug' => ['nullable', 'string', 'max:140', 'alpha_dash', Rule::unique('members', 'slug')->ignore($memberId)],
            'role_title' => ['required', 'string', 'max:120'],
            'specialty' => ['nullable', 'string', 'max:160'],
            'bio' => ['nullable', 'string', 'max:4000'],
            'email' => ['nullable', 'email:rfc', 'max:160', Rule::unique('members', 'email')->ignore($memberId)],
            'linkedin' => ['nullable', 'url', 'max:255'],
            'github' => ['nullable', 'url', 'max:255'],
            'website' => ['nullable', 'url', 'max:255'],
            'location' => ['nullable', 'string', 'max:120'],
            'status' => ['required', Rule::in(['active', 'inactive'])],
            'is_featured' => ['sometimes', 'boolean'],
            'position' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:4096'],
            'technologies' => ['nullable', 'array', 'max:30'],
            'technologies.*' => ['integer', Rule::exists('technologies', 'id')],
        ];
    }

    protected function prepareForValidation(): void
    {
        $value = $this->input('technologies');
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $this->merge(['technologies' => $decoded]);
            }
        }

        if ($this->has('is_featured')) {
            $this->merge(['is_featured' => filter_var($this->input('is_featured'), FILTER_VALIDATE_BOOLEAN)]);
        }
    }
}
