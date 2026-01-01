import { Clip } from "../src/lib/clip"
import { seconds, useCurrentFrame } from "../src/lib/frame"
import { FillFrame } from "../src/lib/layout/fill-frame"
import { Project, type ProjectSettings } from "../src/lib/project"
import { TimeLine } from "../src/lib/timeline"
import { useAnimation, useVariable } from "../src/lib/animation"
import {
  BEZIER_EASE_IN,
  BEZIER_EASE_IN_OUT,
  BEZIER_EASE_OUT,
  clamp,
  type Easing,
} from "../src/lib/animation/functions"

export const PROJECT_SETTINGS: ProjectSettings = {
  name: "framescript-benchmark",
  width: 1920,
  height: 1080,
  fps: 60,
}

const TOTAL_SECONDS = 120
const CYCLE_SECONDS = 2
const CYCLES = TOTAL_SECONDS / CYCLE_SECONDS
const MAX_X = 600

const sinEase: Easing = (t) => (Math.sin(t * Math.PI * 2 - Math.PI / 2) + 1) / 2
const cosEase: Easing = (t) => (Math.cos(t * Math.PI * 2 + Math.PI) + 1) / 2
const springEase: Easing = (t) => {
  const damping = 7
  const frequency = 14
  const value = 1 - Math.exp(-damping * t) * Math.cos(frequency * t)
  return clamp(value, 0, 1)
}

const BenchmarkScene = () => {
  const easeInX = useVariable(-MAX_X)
  const easeOutX = useVariable(MAX_X)
  const easeInOutX = useVariable(-MAX_X)
  const sinX = useVariable(-MAX_X)
  const cosX = useVariable(MAX_X)
  const springX = useVariable(-MAX_X)
  const frame = useCurrentFrame()

  useAnimation(async (ctx) => {
    for (let i = 0; i < CYCLES; i += 1) {
      const dir = i % 2 === 0 ? 1 : -1
      const duration = seconds(CYCLE_SECONDS)
      await ctx.parallel([
        ctx.move(easeInX).to(dir * MAX_X, duration, BEZIER_EASE_IN),
        ctx.move(easeOutX).to(-dir * MAX_X, duration, BEZIER_EASE_OUT),
        ctx.move(easeInOutX).to(dir * MAX_X, duration, BEZIER_EASE_IN_OUT),
        ctx.move(sinX).to(dir * MAX_X, duration, sinEase),
        ctx.move(cosX).to(-dir * MAX_X, duration, cosEase),
        ctx.move(springX).to(dir * MAX_X, duration, springEase),
      ])
    }
  }, [])

  const items = [
    { id: "easeIn", x: easeInX.use(), color: "#22d3ee" },
    { id: "easeOut", x: easeOutX.use(), color: "#38bdf8" },
    { id: "easeInOut", x: easeInOutX.use(), color: "#818cf8" },
    { id: "sin", x: sinX.use(), color: "#f97316" },
    { id: "cos", x: cosX.use(), color: "#f59e0b" },
    { id: "spring", x: springX.use(), color: "#f43f5e" },
  ]

  return (
    <FillFrame
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0d12",
      }}
    >
      {items.map((item, index) => {
        const y = (index - (items.length - 1) / 2) * 140
        const wobble =
          Math.sin((frame / PROJECT_SETTINGS.fps) * Math.PI * 2 + index) * 8
        const scale =
          0.85 + (Math.cos((frame / PROJECT_SETTINGS.fps) * Math.PI * 2 + index) + 1) * 0.075
        return (
          <div
            key={item.id}
            style={{
              position: "absolute",
              width: 120,
              height: 64,
              borderRadius: 16,
              background: item.color,
              transform: `translate(${item.x + wobble}px, ${y}px) scale(${scale})`,
              boxShadow: "0 20px 60px rgba(15, 23, 42, 0.35)",
            }}
          />
        )
      })}
    </FillFrame>
  )
}

export const PROJECT = () => {
  return (
    <Project>
      <TimeLine>
        <Clip label="Benchmark" duration={seconds(TOTAL_SECONDS)}>
          <BenchmarkScene />
        </Clip>
      </TimeLine>
    </Project>
  )
}




