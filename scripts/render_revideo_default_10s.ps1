$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$out = Join-Path $root "samples"
New-Item -ItemType Directory -Force $out | Out-Null

$env:BENCH_DURATION_SECONDS = "10"
$env:REVIDEO_OUT_DIR = "$out"
$env:REVIDEO_OUT_FILE = "revideo_10s.mp4"

pnpm -C "$root\revideo_benchmark" render
