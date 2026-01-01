import { Composition } from "remotion";
import { Benchmark } from "./Benchmark";

const FPS = 60;
const DURATION_IN_SECONDS = 60;

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
