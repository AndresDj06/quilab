<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', ContactMessage::class);

        $query = ContactMessage::query()->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        return ContactMessageResource::collection($query->paginate(20)->withQueryString())->response();
    }

    public function show(ContactMessage $message): JsonResponse
    {
        $this->authorize('view', $message);

        if ($message->status === 'new') {
            $message->update([
                'status' => 'read',
                'read_at' => now(),
            ]);
        }

        return response()->json([
            'message' => new ContactMessageResource($message->refresh()),
        ]);
    }

    public function update(Request $request, ContactMessage $message): JsonResponse
    {
        $this->authorize('update', $message);

        $data = $request->validate([
            'status' => ['required', 'in:new,read,archived'],
            'internal_note' => ['nullable', 'string', 'max:2000'],
        ]);

        if ($data['status'] === 'read' && ! $message->read_at) {
            $data['read_at'] = now();
        }

        $message->update($data);

        return response()->json(['message' => new ContactMessageResource($message)]);
    }

    public function destroy(ContactMessage $message): JsonResponse
    {
        $this->authorize('delete', $message);
        $message->delete();

        return response()->json(['ok' => true]);
    }
}
