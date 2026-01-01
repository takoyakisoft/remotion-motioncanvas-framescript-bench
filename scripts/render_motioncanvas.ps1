$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$out = Join-Path $root "renders\motioncanvas"
New-Item -ItemType Directory -Force $out | Out-Null

Write-Host "Save the output as: $out\benchmark_default.mp4"
Write-Host "Exporter: Video (FFmpeg), FPS=60, Resolution=1920x1080, Range=Full"

pnpm -C "$root\motioncanvas_benchmark" start
