# Benchmark: Remotion / Motion Canvas / FrameScript / Revideo (60s and 120s, nonlinear)

All four projects are configured for 60fps renders with continuous easeIn/easeOut/easeInOut/sin/cos/spring motion.
Measurements were taken at 60s and 120s (120s is the current default).

## Remotion

PowerShell (60s/120s are controlled by the project default; 10s samples use frames override):

```powershell
# 120s default render
.\scripts\render_remotion_default.ps1

# 120s fast render
.\scripts\render_remotion_fast.ps1

# 10s sample render
.\scripts\render_remotion_default_10s.ps1
```

## Motion Canvas

This project uses the editor to trigger the FFmpeg exporter (no CLI in this setup).

```powershell
pnpm -C .\motioncanvas_benchmark dev
```

In the editor:
- Open the project and use the default scene.
- Render with the Video (FFmpeg) exporter.
- FPS = 60, Scale = 1, Range = full scene.
- Measure elapsed time with a stopwatch from Render start to completion.

## FrameScript

PowerShell (two terminals):

Terminal A (render page server):

```powershell
pnpm -C .\framescript_benchmark dev:render
```

Terminal B (renderer):

```powershell
# 120s default
.\scripts\render_framescript_default.ps1

# 120s fast
.\scripts\render_framescript_fast.ps1

# 10s sample
.\scripts\render_framescript_default_10s.ps1
```

## Revideo

PowerShell:

```powershell
# 120s default
.\scripts\render_revideo_default.ps1

# 10s sample
.\scripts\render_revideo_default_10s.ps1
```

