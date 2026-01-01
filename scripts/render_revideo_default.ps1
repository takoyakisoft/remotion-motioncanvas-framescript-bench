$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$out = Join-Path $root "renders\revideo"
New-Item -ItemType Directory -Force $out | Out-Null

$env:REVIDEO_OUT_DIR = "$out"
$env:REVIDEO_OUT_FILE = "benchmark_default_120s.mp4"
Remove-Item Env:REVIDEO_WORKERS -ErrorAction SilentlyContinue

pnpm -C "$root\revideo_benchmark" render

