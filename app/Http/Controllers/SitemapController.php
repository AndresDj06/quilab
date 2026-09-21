<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $base = rtrim(config('app.url'), '/');

        $urls = [
            ['loc' => $base.'/', 'changefreq' => 'weekly', 'priority' => '1.0'],
            ['loc' => $base.'/proyectos', 'changefreq' => 'weekly', 'priority' => '0.9'],
            ['loc' => $base.'/nosotros', 'changefreq' => 'monthly', 'priority' => '0.7'],
            ['loc' => $base.'/equipo', 'changefreq' => 'monthly', 'priority' => '0.7'],
            ['loc' => $base.'/contacto', 'changefreq' => 'monthly', 'priority' => '0.8'],
        ];

        Project::query()->published()->ordered()->get(['slug', 'updated_at'])->each(function (Project $project) use (&$urls, $base) {
            $urls[] = [
                'loc' => $base.'/proyectos/'.$project->slug,
                'lastmod' => optional($project->updated_at)->toAtomString(),
                'changefreq' => 'monthly',
                'priority' => '0.8',
            ];
        });

        $xml = view('sitemap', ['urls' => $urls])->render();

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
