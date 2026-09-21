<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:160'],
            'company' => ['nullable', 'string', 'max:160'],
            'project_type' => ['nullable', 'string', 'max:80'],
            'budget' => ['nullable', 'string', 'max:60'],
            'message' => ['required', 'string', 'min:20', 'max:4000'],
            // Honeypot: real users never fill this hidden field.
            'website' => ['prohibited'],
        ];
    }

    public function messages(): array
    {
        return [
            'message.min' => 'Cuéntanos un poco más sobre el proyecto (mínimo 20 caracteres).',
            'website.prohibited' => 'No pudimos procesar el formulario.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => trim((string) $this->input('name')),
            'email' => strtolower(trim((string) $this->input('email'))),
            'company' => $this->filled('company') ? trim((string) $this->input('company')) : null,
        ]);
    }
}
