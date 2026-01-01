$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$out = Join-Path $root "samples"
New-Item -ItemType Directory -Force $out | Out-Null

pnpm -C "$root\remotion_benchmark" exec remotion render src/index.ts Benchmark "$out\remotion_10s.mp4" `
  --frames=0-599
