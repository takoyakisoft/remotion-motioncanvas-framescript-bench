import {Rect, makeScene2D} from '@revideo/2d';
import {
  all,
  createRefArray,
  easeInCubic,
  easeInOutCubic,
  easeOutCubic,
  loop,
  tween,
  useTime,
} from '@revideo/core';

const ROWS = 6;
const MAX_X = 600;
const ROW_SPACING = 140;
const CYCLE_SECONDS = 2;
const TOTAL_SECONDS = 120
const CYCLES = TOTAL_SECONDS / CYCLE_SECONDS;
const COLORS = [
  '#22d3ee',
  '#38bdf8',
  '#818cf8',
  '#f97316',
  '#f59e0b',
  '#f43f5e',
];

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const sinEase = (t: number) =>
  clamp01((Math.sin(t * Math.PI - Math.PI / 2) + 1) / 2);
const cosEase = (t: number) => clamp01((1 - Math.cos(Math.PI * t)) / 2);
const springEase = (t: number) => {
  const damping = 8;
  const frequency = 12;
  const value = 1 - Math.exp(-damping * t) * Math.cos(frequency * t);
  return clamp01(value);
};

export default makeScene2D('benchmark', function* (view) {
  const rows = createRefArray<Rect>();

  const startY = -((ROWS - 1) * ROW_SPACING) / 2;
  for (let i = 0; i < ROWS; i += 1) {
    view.add(
      <Rect
        key={`row-${i}`}
        ref={rows}
        width={120}
        height={64}
        radius={16}
        fill={COLORS[i % COLORS.length]}
        y={startY + i * ROW_SPACING}
      />,
    );
  }

  yield* loop(CYCLES, function* (index) {
    const dir = index % 2 === 0 ? 1 : -1;
    const from = -dir * MAX_X;
    const to = dir * MAX_X;

    yield* all(
      tween(CYCLE_SECONDS, t => {
        const time = useTime();
        const wobble = Math.sin(time * Math.PI * 2 + 0) * 8;
        const scale = 0.85 + (Math.cos(time * Math.PI * 2 + 0) + 1) * 0.075;
        rows[0].position.x(lerp(from, to, easeInCubic(t)) + wobble);
        rows[0].scale(scale);
      }),
      tween(CYCLE_SECONDS, t => {
        const time = useTime();
        const wobble = Math.sin(time * Math.PI * 2 + 1) * 8;
        const scale = 0.85 + (Math.cos(time * Math.PI * 2 + 1) + 1) * 0.075;
        rows[1].position.x(lerp(to, from, easeOutCubic(t)) + wobble);
        rows[1].scale(scale);
      }),
      tween(CYCLE_SECONDS, t => {
        const time = useTime();
        const wobble = Math.sin(time * Math.PI * 2 + 2) * 8;
        const scale = 0.85 + (Math.cos(time * Math.PI * 2 + 2) + 1) * 0.075;
        rows[2].position.x(lerp(from, to, easeInOutCubic(t)) + wobble);
        rows[2].scale(scale);
      }),
      tween(CYCLE_SECONDS, t => {
        const time = useTime();
        const wobble = Math.sin(time * Math.PI * 2 + 3) * 8;
        const scale = 0.85 + (Math.cos(time * Math.PI * 2 + 3) + 1) * 0.075;
        rows[3].position.x(lerp(from, to, sinEase(t)) + wobble);
        rows[3].scale(scale);
      }),
      tween(CYCLE_SECONDS, t => {
        const time = useTime();
        const wobble = Math.sin(time * Math.PI * 2 + 4) * 8;
        const scale = 0.85 + (Math.cos(time * Math.PI * 2 + 4) + 1) * 0.075;
        rows[4].position.x(lerp(to, from, cosEase(t)) + wobble);
        rows[4].scale(scale);
      }),
      tween(CYCLE_SECONDS, t => {
        const time = useTime();
        const wobble = Math.sin(time * Math.PI * 2 + 5) * 8;
        const scale = 0.85 + (Math.cos(time * Math.PI * 2 + 5) + 1) * 0.075;
        rows[5].position.x(lerp(from, to, springEase(t)) + wobble);
        rows[5].scale(scale);
      }),
    );
  });
});






