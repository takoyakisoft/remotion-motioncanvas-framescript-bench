# Benchmark: Remotion / Motion Canvas / FrameScript (60s, nonlinear)

All three projects are configured for a 60s, 60fps render with continuous easeIn/easeOut/easeInOut/sin/cos/spring motion.

## Remotion

PowerShell:

```powershell
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$out = Join-Path $root "renders"
New-Item -ItemType Directory -Force $out | Out-Null

Measure-Command {
  pnpm -C "$root\remotion_benchmark" exec remotion render src/index.ts Benchmark "$out\remotion.mp4" `
    --concurrency=100% `
    --codec=h264 `
    --crf=23 `
    --image-format=jpeg `
    --hardware-acceleration=if-possible
} | Select-Object TotalSeconds
```

## Motion Canvas

This project uses the editor to trigger the FFmpeg exporter (no CLI in this setup).

```powershell
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
pnpm -C "$root\motioncanvas_benchmark" start
```

In the editor:
- Open the project and use the default scene.
- Render with ?Video (FFmpeg)? exporter (already set in `motioncanvas_benchmark/src/project.meta`).
- FPS = 60, Scale = 1, Range = full scene.
- Measure elapsed time with a stopwatch from Render start to completion.

## FrameScript

PowerShell (two terminals):

Terminal A (render page server):

```powershell
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
pnpm -C "$root\framescript_benchmark" dev:render
```

Terminal B (renderer):

```powershell
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$out = Join-Path $root "renders"
New-Item -ItemType Directory -Force $out | Out-Null

$env:RENDER_DEV_SERVER_URL = "http://localhost:5174/render"
$env:RENDER_OUTPUT_PATH = "$out\framescript.mp4"
$env:RENDER_PROGRESS_URL = "http://127.0.0.1:3000/render_progress"
$env:RENDER_CANCEL_URL = "http://127.0.0.1:3000/is_canceled"
$env:RENDER_RESET_URL = "http://127.0.0.1:3000/reset"
$env:RENDER_AUDIO_PLAN_URL = "http://127.0.0.1:3000/render_audio_plan"

$workers = [Math]::Max([int]$env:NUMBER_OF_PROCESSORS, 1)

Measure-Command {
  cargo run --release --manifest-path "$root\framescript_benchmark\render\Cargo.toml" -- `
    1920:1080:60:3600:$workers:H264:ultrafast
} | Select-Object TotalSeconds
```

The renderer prints `TOTAL : <ms>` when complete; use that value if preferred.
