<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\ProjectStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectCardResource;
use App\Models\ContactMessage;
use App\Models\Member;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $this->authorize('viewAny', Project::class);

        $statusCounts = Project::query()
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        $months = collect(range(5, 0))->map(function (int $offset) {
            $date = now()->subMonths($offset)->startOfMonth();

            return [
                'label' => $date->translatedFormat('M'),
                'key' => $date->format('Y-m'),
                'messages' => 0,
            ];
        });

        $messageSeries = ContactMessage::query()
            ->where('created_at', '>=', now()->subMonths(5)->startOfMonth())
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month_key, COUNT(*) as total")
            ->groupBy('month_key')
            ->pluck('total', 'month_key');

        $chartMessages = $months->map(fn (array $row) => [
            'label' => $row['label'],
            'value' => (int) ($messageSeries[$row['key']] ?? 0),
        ])->values();

        $byStatus = collect(ProjectStatus::cases())->map(fn (ProjectStatus $status) => [
            'value' => $status->value,
            'label' => $status->label(),
            'total' => (int) ($statusCounts[$status->value] ?? 0),
        ]);

        $recent = Project::query()
            ->with(['category', 'technologies'])
            ->withCount('members')
            ->latest()
            ->limit(5)
            ->get();

        return response()->json([
            'kpis' => [
                'projects' => Project::query()->count(),
                'active' => Project::query()->where('status', ProjectStatus::InProgress)->count(),
                'finished' => Project::query()->where('status', ProjectStatus::Finished)->count(),
                'members' => Member::query()->count(),
                'messages' => ContactMessage::query()->count(),
                'unread' => ContactMessage::query()->unread()->count(),
            ],
            'charts' => [
                'status' => $byStatus,
                'messages' => $chartMessages,
            ],
            'recent_projects' => ProjectCardResource::collection($recent),
            'generated_at' => Carbon::now()->toIso8601String(),
        ]);
    }
}
