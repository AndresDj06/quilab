<?php

namespace App\Models;

use App\Support\Media;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'public_name',
        'slug',
        'photo',
        'role_title',
        'specialty',
        'bio',
        'email',
        'linkedin',
        'github',
        'website',
        'location',
        'status',
        'is_featured',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (self $member) {
            $member->public_name = $member->public_name ?: trim($member->first_name.' '.$member->last_name);
            $member->slug = Str::slug($member->slug ?: $member->public_name);
        });
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'project_member')
            ->withPivot(['role', 'responsibility', 'joined_at', 'position'])
            ->withTimestamps();
    }

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class)->withTimestamps();
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('position')->orderBy('public_name');
    }

    public function getPhotoUrlAttribute(): ?string
    {
        return Media::url($this->photo);
    }

    public function getInitialsAttribute(): string
    {
        return Str::upper(Str::substr($this->first_name, 0, 1).Str::substr($this->last_name, 0, 1));
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
}
