<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Media
{
    /**
     * Store an uploaded file inside the public disk and return its relative path.
     */
    public static function store(UploadedFile $file, string $folder): string
    {
        $name = Str::uuid()->toString().'.'.$file->getClientOriginalExtension();

        return $file->storeAs($folder, $name, 'public');
    }

    /**
     * Replace an existing file, deleting the previous one when it belongs to us.
     */
    public static function replace(?string $current, UploadedFile $file, string $folder): string
    {
        self::delete($current);

        return self::store($file, $folder);
    }

    public static function delete(?string $path): void
    {
        if ($path && ! Str::startsWith($path, ['http://', 'https://', '/'])) {
            Storage::disk('public')->delete($path);
        }
    }

    /**
     * Build an absolute URL for a stored path. Absolute URLs and root-relative
     * paths (used by seeded demo assets) are returned untouched.
     */
    public static function url(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }

        if (Str::startsWith($path, '/')) {
            return url($path);
        }

        return Storage::disk('public')->url($path);
    }
}
