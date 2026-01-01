import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type RowDef = {
  id: string;
  color: string;
  progress: number;
};

export const Benchmark: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const maxX = 600;
  const cycleFrames = Math.max(2, Math.round(fps * 2));
  const cycleIndex = Math.floor(frame / cycleFrames);
  const cycleProgress = (frame % cycleFrames) / (cycleFrames - 1);
  const dir = cycleIndex % 2 === 0 ? 1 : -1;
  const from = -dir * maxX;
  const to = dir * maxX;

  const easeIn = interpolate(cycleProgress, [0, 1], [0, 1], {
    easing: Easing.in(Easing.ease),
  });
  const easeOut = interpolate(cycleProgress, [0, 1], [0, 1], {
    easing: Easing.out(Easing.ease),
  });
  const easeInOut = interpolate(cycleProgress, [0, 1], [0, 1], {
    easing: Easing.inOut(Easing.ease),
  });

  const sinEase =
    (Math.sin(cycleProgress * Math.PI - Math.PI / 2) + 1) / 2;
  const cosEase = (1 - Math.cos(Math.PI * cycleProgress)) / 2;
  const springEase = Math.min(
    1,
    Math.max(
      0,
      1 -
        Math.exp(-8 * cycleProgress) *
          Math.cos(12 * cycleProgress),
    ),
  );

  const rows: RowDef[] = [
    { id: "easeIn", color: "#22d3ee", progress: easeIn },
    { id: "easeOut", color: "#38bdf8", progress: easeOut },
    { id: "easeInOut", color: "#818cf8", progress: easeInOut },
    { id: "sin", color: "#f97316", progress: sinEase },
    { id: "cos", color: "#f59e0b", progress: cosEase },
    { id: "spring", color: "#f43f5e", progress: springEase },
  ];

  const rowGap = 140;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0d12" }}>
      {rows.map((row, rowIndex) => {
        const y = (rowIndex - (rows.length - 1) / 2) * rowGap;
        const x = interpolate(row.progress, [0, 1], [from, to]);
        const wobble =
          Math.sin((frame / fps) * Math.PI * 2 + rowIndex) * 8;
        const scale =
          0.85 +
          (Math.cos((frame / fps) * Math.PI * 2 + rowIndex) + 1) * 0.075;

        return (
          <div
            key={row.id}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(${x + wobble}px, ${y}px) scale(${scale})`,
            }}
          >
            <div
              style={{
                width: 120,
                height: 64,
                borderRadius: 16,
                backgroundColor: row.color,
                boxShadow: "0 20px 60px rgba(15, 23, 42, 0.35)",
              }}
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
