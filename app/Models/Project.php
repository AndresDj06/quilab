<?php

namespace App\Models;

use App\Enums\ProjectStatus;
use App\Support\Media;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'title',
        'summary',
        'description',
        'problem',
        'solution',
        'features',
        'results',
        'status',
        'year',
        'location',
        'client',
        'cover',
        'external_url',
        'is_published',
        'is_featured',
        'position',
        'meta_title',
        'meta_description',
        'started_at',
        'finished_at',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'results' => 'array',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
            'status' => ProjectStatus::class,
            'started_at' => 'date',
            'finished_at' => 'date',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (self $project) {
            $project->slug = Str::slug($project->slug ?: $project->name);
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)->orderBy('position');
    }

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(Member::class, 'project_member')
            ->withPivot(['role', 'responsibility', 'joined_at', 'position'])
            ->withTimestamps()
            ->orderBy('project_member.position');
    }

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class)->withTimestamps();
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('position')->orderByDesc('year')->orderByDesc('id');
    }

    public function getCoverUrlAttribute(): ?string
    {
        return Media::url($this->cover);
    }

    public function getReferenceAttribute(): string
    {
        return 'PROJECT / '.str_pad((string) $this->id, 3, '0', STR_PAD_LEFT);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function resolveRouteBinding($value, $field = null)
    {
        $field ??= ctype_digit((string) $value) ? 'id' : $this->getRouteKeyName();

        return $this->where($field, $value)->firstOrFail();
    }

    public function related(int $limit = 2)
    {
        return static::query()
            ->published()
            ->with(['category', 'technologies'])
            ->withCount('members')
            ->where('id', '!=', $this->id)
            ->when($this->category_id, fn (Builder $query) => $query->where('category_id', $this->category_id))
            ->ordered()
            ->limit($limit)
            ->get();
    }
}
