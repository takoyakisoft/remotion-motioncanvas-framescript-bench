import {defineConfig} from 'vite';
import preact from '@preact/preset-vite';
import motionCanvas from '@revideo/vite-plugin';

export default defineConfig({
  plugins: [preact(), motionCanvas()],
});
