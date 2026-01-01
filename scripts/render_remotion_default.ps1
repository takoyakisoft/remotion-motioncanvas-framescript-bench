$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$out = Join-Path $root "renders\remotion"
New-Item -ItemType Directory -Force $out | Out-Null

pnpm -C "$root\remotion_benchmark" exec remotion render src/index.ts Benchmark "$out\benchmark_default_120s.mp4"

