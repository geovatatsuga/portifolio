import type { RenderContext, SimulationStrategy } from './types';

const NEURAL = {
  CONNECTION_DIST_SQ: 15000,

  LINE_WIDTH: 0.5,

  INTERFERENCE_GLITCH_THRESHOLD: 20,
  INTERFERENCE_TEXT_THRESHOLD: 5,
  INTERFERENCE_REPEL_THRESHOLD: 30,

  GLITCH_PROBABILITY: 0.2, // Math.random() > 0.8
  TEXT_PROBABILITY: 0.05, // Math.random() > 0.95

  GLITCH_STROKE: 'rgba(220, 38, 38, OPACITY)',

  STROKE_BASE: (opacity: number, interference: number) =>
    `rgba(88, 28, 135, ${opacity * (interference > 0 ? 0.8 : 0.2)})`,

  TEXT_COLOR_GLITCH: 'red',
  TEXT_COLOR_NORMAL: 'black',

  TEXT_FONT: '10px monospace',

  JITTER_GAIN: 0.5,
  RADIUS_JITTER: 2,

  REPEL_GAIN: 0.5,

  // Return-to-order behavior after releasing pointer
  RETURN_TO_ORIGIN_GAIN: 0.004,
  RETURN_TO_ORIGIN_DAMPING: 0.92,
  INTERFERENCE_MAX_ASSUMED: 50,
} as const;

export const neuralStrategy: SimulationStrategy = {
  mode: 'neural',

  init() {
    // no-op
  },

  // In the original implementation, connections are drawn BEFORE per-particle motion/draw.
  // We keep that ordering by drawing connections in render() and particles in update().
  render(state, context: RenderContext) {
    const { ctx } = context;
    const interference = state.interference;

    ctx.lineWidth = NEURAL.LINE_WIDTH;

    for (let i = 0; i < state.particles.length; i++) {
      const p = state.particles[i];
      for (let j = i + 1; j < state.particles.length; j++) {
        const p2 = state.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < NEURAL.CONNECTION_DIST_SQ) {
          const opacity = 1 - distSq / NEURAL.CONNECTION_DIST_SQ;
          const isGlitch = interference > NEURAL.INTERFERENCE_GLITCH_THRESHOLD && Math.random() > 1 - NEURAL.GLITCH_PROBABILITY;

          ctx.strokeStyle = isGlitch
            ? `rgba(220, 38, 38, ${opacity})`
            : NEURAL.STROKE_BASE(opacity, interference);

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          if (interference > NEURAL.INTERFERENCE_TEXT_THRESHOLD && Math.random() > 1 - NEURAL.TEXT_PROBABILITY) {
            const midX = (p.x + p2.x) / 2;
            const midY = (p.y + p2.y) / 2;
            ctx.font = NEURAL.TEXT_FONT;
            ctx.fillStyle = isGlitch ? NEURAL.TEXT_COLOR_GLITCH : NEURAL.TEXT_COLOR_NORMAL;
            const bin = Math.random().toString(2).substring(2, 6);
            ctx.fillText(bin, midX, midY);
          }
        }
      }
    }
  },

  update(state, context: RenderContext) {
    const { ctx, size, pointer } = context;

    const recoverFactor = pointer.isDown
      ? 0
      : 1 - Math.min(state.interference, NEURAL.INTERFERENCE_MAX_ASSUMED) / NEURAL.INTERFERENCE_MAX_ASSUMED;

    for (let i = 0; i < state.particles.length; i++) {
      const p = state.particles[i];

      const dx = pointer.x - p.x;
      const dy = pointer.y - p.y;

      // When not holding, slowly return to the ordered lattice (origin).
      if (recoverFactor > 0) {
        const ox = p.originX - p.x;
        const oy = p.originY - p.y;
        p.vx += ox * NEURAL.RETURN_TO_ORIGIN_GAIN * recoverFactor;
        p.vy += oy * NEURAL.RETURN_TO_ORIGIN_GAIN * recoverFactor;
        p.vx *= NEURAL.RETURN_TO_ORIGIN_DAMPING;
        p.vy *= NEURAL.RETURN_TO_ORIGIN_DAMPING;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (state.interference > 0) {
        const intensity = state.interference;

        p.x += (Math.random() - 0.5) * intensity * NEURAL.JITTER_GAIN;
        p.y += (Math.random() - 0.5) * intensity * NEURAL.JITTER_GAIN;

        if (intensity > NEURAL.INTERFERENCE_REPEL_THRESHOLD) {
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * NEURAL.REPEL_GAIN;
          p.vy += Math.sin(angle) * NEURAL.REPEL_GAIN;
        }
      }

      if (p.x < 0 || p.x > size.width) p.vx *= -1;
      if (p.y < 0 || p.y > size.height) p.vy *= -1;

      ctx.beginPath();
      const radius = p.size + (state.interference > 0 ? Math.random() * NEURAL.RADIUS_JITTER : 0);
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  },
};
