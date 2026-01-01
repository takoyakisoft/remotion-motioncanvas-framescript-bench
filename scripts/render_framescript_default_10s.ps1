$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$out = Join-Path $root "samples"
New-Item -ItemType Directory -Force $out | Out-Null

$env:BENCH_DURATION_SECONDS = "10"
$env:RENDER_OUTPUT_PATH = "$out\framescript_10s.mp4"
& "$root\framescript_benchmark\scripts\framescript_render.ps1" default
