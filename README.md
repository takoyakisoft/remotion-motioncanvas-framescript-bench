# JSX Video Benchmark (TypeScript)

Measured with GPT-5.2-Codex.

This repository benchmarks TS + JSX video tools under continuous non-linear animation.

## Benchmarks

### Conditions (Common)
- Resolution: 1920x1080
- FPS: 60
- Continuous non-linear animation (easeIn/easeOut/easeInOut/sin/cos/spring-like)
- OS: Windows 11
- CPU: AMD Ryzen 9 3950X
- Settings: default render settings for each tool

### Results (60s, default settings)

Measured wall-clock time.

| Tool | Render time | Notes |
| --- | --- | --- |
| FrameScript | 91.37s | Default: H264 + medium preset, workers = CPU/2 (measured at 60s) |
| Remotion | 99.78s | Default CLI render (measured at 60s) |
| Motion Canvas | 120s | UI export (FFmpeg), manual timer (measured at 60s) |
| Revideo | 110s | Default render (measured at 60s) |

### Results (60s, fast settings)

| Tool | Render time | Notes |
| --- | --- | --- |
| FrameScript | 80.60s | H264 + ultrafast preset, workers = CPU count (measured at 60s) |
| Remotion | 89.80s | GPU encode + 2M bitrate (measured at 60s) |
| Motion Canvas | N/A | No exposed fast preset in UI |
| Revideo | N/A | No fast preset recorded |

### Results (120s, default settings)

Measured wall-clock time.

| Tool | Render time | Notes |
| --- | --- | --- |
| FrameScript | 162.82s | Default: H264 + medium preset, workers = CPU/2 (measured at 120s) |
| Remotion | 157.99s | Default CLI render (measured at 120s) |
| Motion Canvas | 158s | UI export (FFmpeg), manual timer (measured at 120s) |
| Revideo | 174.28s | Default render (measured at 120s) |

### Results (120s, fast settings)

| Tool | Render time | Notes |
| --- | --- | --- |
| FrameScript | 139.02s | H264 + ultrafast preset, workers = CPU count (measured at 120s) |
| Remotion | 143.99s | GPU encode + 2M bitrate (measured at 120s) |
| Motion Canvas | N/A | No exposed fast preset in UI |
| Revideo | N/A | No fast preset recorded |

## Library Versions

- Remotion: 4.0.398
- Motion Canvas: 3.17.2 (@motion-canvas/core, @motion-canvas/2d, @motion-canvas/ui, @motion-canvas/vite-plugin)
- Motion Canvas FFmpeg: 1.1.0 (@motion-canvas/ffmpeg)
- FrameScript: 0.0.3
- Revideo: 0.10.4

## Sample Videos (10s)

- Remotion: samples/remotion_10s.mp4
- FrameScript: samples/framescript_10s.mp4
- Motion Canvas: samples/motioncanvas_10s.mp4
- Revideo: samples/revideo_10s.mp4

## Notes

- Motion Canvas has no official CLI export; measurement is via UI.
- GPU is not normalized.
- Results above are measured at 60s and 120s.
- 10s sample videos are stored in samples/.

## GPT-5.2-Codex Impressions

- Remotion: Strong React/TS ergonomics for assets and subtitle workflows.
- FrameScript: Great visual output, but requires learning a custom API.
- Motion Canvas: Powerful generator model, but workflow remains UI-driven.
- Revideo: Similar workflow to Motion Canvas, but oriented toward faster rendering.

**Recommendation**  
If you need automation and scalability, choose Remotion. If visual fidelity is the priority, choose FrameScript. If you want an all-in-one UI workflow, choose Motion Canvas. For a Motion Canvas-like API with a rendering-first focus, try Revideo.

## Library Links

- Remotion: https://github.com/remotion-dev/remotion
- Motion Canvas: https://github.com/motion-canvas/motion-canvas
- Revideo: https://github.com/redotvideo/revideo
- FrameScript: https://github.com/frame-script/FrameScript


