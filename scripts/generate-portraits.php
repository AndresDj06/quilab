<?php

$people = [
    ['andres', 'AR', '#A16207'],
    ['laura', 'LG', '#44403C'],
    ['carlos', 'CP', '#78716C'],
    ['valentina', 'VR', '#A16207'],
    ['mateo', 'MH', '#44403C'],
    ['sofia', 'SC', '#78716C'],
    ['diego', 'DV', '#A16207'],
    ['camila', 'CO', '#44403C'],
];

$dir = __DIR__.'/public/images/members';
if (! is_dir($dir)) {
    mkdir($dir, 0777, true);
}

foreach ($people as $person) {
    [$slug, $ini, $accent] = $person;
    $svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" role="img" aria-label="{$ini}">
  <rect width="800" height="1000" fill="#1C1917"/>
  <g fill="none" stroke="#D6D3D1" stroke-opacity="0.18">
    <rect x="40" y="40" width="720" height="920"/>
    <path d="M40 720 H760"/>
  </g>
  <circle cx="400" cy="390" r="160" fill="none" stroke="{$accent}" stroke-width="1.5"/>
  <circle cx="400" cy="390" r="6" fill="#FAFAF9"/>
  <path d="M220 390 H580 M400 230 V550" stroke="{$accent}" stroke-opacity="0.7"/>
  <text x="80" y="860" fill="#FAFAF9" font-family="Georgia, serif" font-size="88">{$ini}</text>
  <rect x="80" y="880" width="48" height="2" fill="{$accent}"/>
</svg>
SVG;
    file_put_contents($dir.'/'.$slug.'.svg', $svg);
}

echo "members ok\n";
