$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$out = Join-Path $root "renders\framescript"
New-Item -ItemType Directory -Force $out | Out-Null

$env:RENDER_OUTPUT_PATH = "$out\benchmark_default_120s.mp4"
& "$root\framescript_benchmark\scripts\framescript_render.ps1" default

