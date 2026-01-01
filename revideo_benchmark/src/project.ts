import { makeProject } from '@revideo/core';
import benchmark from './scenes/benchmark';

export default makeProject({
  scenes: [benchmark],
  settings: {
    shared: {
      size: { x: 1920, y: 1080 },
      range: [0, 120],
      background: '#0b0d12',
    },
    rendering: {
      fps: 60,
      exporter: {
        name: '@revideo/core/ffmpeg',
        options: {
          format: 'mp4',
        },
      },
    },
  },
});
