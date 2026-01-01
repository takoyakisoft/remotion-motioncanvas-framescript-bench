$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$out = Join-Path $root "renders\remotion"
New-Item -ItemType Directory -Force $out | Out-Null

pnpm -C "$root\remotion_benchmark" exec remotion render src/index.ts Benchmark "$out\benchmark_fast_120s.mp4" `
  --concurrency=100% `
  --codec=h264 `
  --video-bitrate=2M `
  --image-format=jpeg `
  --hardware-acceleration=if-possible

