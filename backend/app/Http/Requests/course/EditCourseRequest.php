<?php

namespace App\Http\Requests\course;

use Illuminate\Foundation\Http\FormRequest;

class EditCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'teaching_hours' => ['required', 'integer', 'min:1'],
            'duration_weeks' => ['required', 'integer', 'min:1'],
        ];
    }
}
