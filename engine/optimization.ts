import { FlowField } from './FlowField';
import type { RenderContext, SimulationStrategy } from './types';

const OPTIMIZATION = {
  MOUSE_INFLUENCE_DOWN: 0.95,
  MOUSE_INFLUENCE_IDLE: 0.05,

  ACCELERATION_GAIN: 0.2,
  LIMIT_MULTIPLIER_WHEN_DOWN: 3,

  RESET_DISTANCE_WHEN_DOWN: 5,

  DRAW_SIZE_DOWN: 2,
  DRAW_SIZE_IDLE: 1.5,

  COLOR_DOWN: 'rgba(220, 38, 38, 0.5)',
  COLOR_IDLE: 'rgba(0,0,0,0.4)',
} as const;

export const optimizationStrategy: SimulationStrategy = {
  mode: 'optimization',

  init() {
    // no-op
  },

  render() {
    // no-op (per-particle drawing happens in update)
  },

  update(state, context: RenderContext) {
    const { ctx, size, time, pointer } = context;

    for (let i = 0; i < state.particles.length; i++) {
      const p = state.particles[i];

      const dx = pointer.x - p.x;
      const dy = pointer.y - p.y;

      const fieldAngle = FlowField.getAngle(p.x, p.y, time);
      const mouseAngle = Math.atan2(dy, dx);
      const mouseInfluence = pointer.isDown ? OPTIMIZATION.MOUSE_INFLUENCE_DOWN : OPTIMIZATION.MOUSE_INFLUENCE_IDLE;

      const fieldVx = Math.cos(fieldAngle);
      const fieldVy = Math.sin(fieldAngle);
      const mouseVx = Math.cos(mouseAngle);
      const mouseVy = Math.sin(mouseAngle);

      const targetVx = fieldVx * (1 - mouseInfluence) + mouseVx * mouseInfluence;
      const targetVy = fieldVy * (1 - mouseInfluence) + mouseVy * mouseInfluence;

      p.vx += targetVx * OPTIMIZATION.ACCELERATION_GAIN;
      p.vy += targetVy * OPTIMIZATION.ACCELERATION_GAIN;

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const limit = pointer.isDown ? p.maxSpeed * OPTIMIZATION.LIMIT_MULTIPLIER_WHEN_DOWN : p.maxSpeed;

      if (speed > limit) {
        p.vx = (p.vx / speed) * limit;
        p.vy = (p.vy / speed) * limit;
      }

      p.x += p.vx;
      p.y += p.vy;

      const distToMouse = Math.sqrt(Math.pow(pointer.x - p.x, 2) + Math.pow(pointer.y - p.y, 2));
      if (
        (distToMouse < OPTIMIZATION.RESET_DISTANCE_WHEN_DOWN && pointer.isDown) ||
        p.x < 0 ||
        p.x > size.width ||
        p.y < 0 ||
        p.y > size.height
      ) {
        p.x = Math.random() * size.width;
        p.y = Math.random() * size.height;
        p.vx = 0;
        p.vy = 0;
      }

      ctx.fillStyle = pointer.isDown ? OPTIMIZATION.COLOR_DOWN : OPTIMIZATION.COLOR_IDLE;
      const drawSize = pointer.isDown ? OPTIMIZATION.DRAW_SIZE_DOWN : OPTIMIZATION.DRAW_SIZE_IDLE;
      ctx.fillRect(p.x, p.y, drawSize, drawSize);
    }
  },
};
