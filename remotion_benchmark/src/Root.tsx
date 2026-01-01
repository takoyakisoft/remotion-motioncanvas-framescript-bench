import { Composition } from "remotion";
import { Benchmark } from "./Benchmark";

const FPS = 60;
const DURATION_IN_SECONDS = (() => {
  const raw = Number(process.env.BENCH_DURATION_SECONDS);
  return Number.isFinite(raw) && raw > 0 ? raw : 120;
})();

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Benchmark"
      component={Benchmark}
      durationInFrames={FPS * DURATION_IN_SECONDS}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};



