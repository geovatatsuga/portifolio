export const FlowField = {
  // Perlin-ish noise for flow field (kept identical to prior implementation)
  getAngle(x: number, y: number, time: number) {
    const FIELD_SCALE = 0.003;

    const val =
      Math.sin(x * FIELD_SCALE) +
      Math.cos(y * FIELD_SCALE) +
      Math.sin((x + y) * FIELD_SCALE * 0.5 + time) +
      Math.cos((x - y) * FIELD_SCALE * 0.5);

    return val * Math.PI;
  },
} as const;
