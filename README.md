# JSX Video Benchmark (TypeScript)

Measured with GPT-5.2-Codex on Windows 11.

This repository benchmarks TS + JSX video tools under continuous non-linear animation.

## Benchmarks

### Conditions
- Resolution: 1920x1080
- FPS: 60
- Duration: 60s (3600 frames)
- Continuous non-linear animation (easeIn/easeOut/easeInOut/sin/cos/spring-like)
- OS: Windows 11
- CPU: AMD Ryzen 9 3950X
- Settings: default render settings for each tool

### Results (default settings)

Measured wall-clock time.

| Tool | Render time | Notes |
| --- | --- | --- |
| FrameScript | 91.37s | Default: H264 + medium preset, workers = CPU/2 |
| Remotion | 99.78s | Default CLI render |
| Motion Canvas | 120s | UI export (FFmpeg), manual timer |

## Notes

- Motion Canvas has no official CLI export; measurement is via UI.
- GPU is not normalized.

## GPT-5.2-Codex Impressions

- Remotion: Strong React/TS ergonomics for assets and subtitle workflows.
- FrameScript: Great visual output, but requires learning a custom API.
- Motion Canvas: Powerful generator model, but workflow remains UI-driven.

**Recommendation**  
If you need automation and scalability, choose Remotion. If visual fidelity is the priority, choose FrameScript. If you want an all-in-one UI workflow, choose Motion Canvas.

## Library Links

- Remotion: https://github.com/remotion-dev/remotion
- Motion Canvas: https://github.com/motion-canvas/motion-canvas
- FrameScript: https://github.com/frame-script/FrameScript
