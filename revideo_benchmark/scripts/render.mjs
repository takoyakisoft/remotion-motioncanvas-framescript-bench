import { renderVideo } from '@revideo/renderer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '..');
const durationSeconds = (() => {
  const raw = Number(process.env.BENCH_DURATION_SECONDS);
  return Number.isFinite(raw) && raw > 0 ? raw : 120;
})();
const defaultOutDir = path.resolve(projectRoot, '..', 'renders', 'revideo');
const outDir = process.env.REVIDEO_OUT_DIR ?? defaultOutDir;
const outFile = process.env.REVIDEO_OUT_FILE ?? 'benchmark_default_120s.mp4';
const workersEnv = process.env.REVIDEO_WORKERS;
const workers = workersEnv ? Number(workersEnv) : undefined;

process.chdir(projectRoot);

const result = await renderVideo({
  projectFile: './src/project.ts',
  settings: {
    outDir,
    outFile,
    logProgress: true,
    ...(Number.isFinite(workers) && workers > 0 ? { workers } : {}),
    projectSettings: {
      range: [0, durationSeconds],
      exporter: {
        name: '@revideo/core/ffmpeg',
        options: {
          format: 'mp4',
        },
      },
    },
  },
});

console.log(`Rendered to ${result}`);
