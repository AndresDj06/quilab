<?php

namespace App\Providers;

use App\Models\ContactMessage;
use App\Models\Member;
use App\Models\Project;
use App\Models\User;
use App\Policies\ContactMessagePolicy;
use App\Policies\MemberPolicy;
use App\Policies\ProjectPolicy;
use App\Policies\UserPolicy;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Gate::policy(Project::class, ProjectPolicy::class);
        Gate::policy(Member::class, MemberPolicy::class);
        Gate::policy(User::class, UserPolicy::class);
        Gate::policy(ContactMessage::class, ContactMessagePolicy::class);

        RateLimiter::for('contact', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip());
        });

        RateLimiter::for('login', function (Request $request) {
            return Limit::perMinute(8)->by($request->ip().'|'.strtolower((string) $request->input('email')));
        });

        $base = $this->detectWebBase();
        $forced = trim((string) env('APP_SUBDIRECTORY', ''), '/');
        if ($forced !== '') {
            $base = '/'.$forced;
        }
        $basename = $base === '' ? '/' : $base;

        View::share('webBase', $basename);

        if ($this->app->runningInConsole()) {
            return;
        }

        $root = request()->getSchemeAndHttpHost().($base === '' ? '' : $base);
        URL::forceRootUrl($root);
    }

    private function detectWebBase(): string
    {
        $scriptName = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '/index.php');
        $dir = str_replace('\\', '/', rtrim(dirname($scriptName), '/\\'));

        if ($dir === '' || $dir === '/' || $dir === '.') {
            return '';
        }

        $requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

        if (str_ends_with($dir, '/public') && ! str_starts_with($requestPath, $dir)) {
            $dir = substr($dir, 0, -strlen('/public'));
        }

        return $dir === '' || $dir === '/' ? '' : $dir;
    }
}
