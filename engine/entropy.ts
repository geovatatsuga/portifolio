import type { RenderContext, SimulationContext, SimulationStrategy } from './types';

const ENTROPY = {
  MIN_FORCE_DISTANCE: 50,
  INFLUENCE_RADIUS: 300,

  MAX_G_DOWN: 5000,
  MAX_G_BASE: 200,
  MAX_G_GRAVITY_SCALE: 1000,

  PULL_DOWN: 2,
  PULL_HOVER: 0.5,

  FORCE_DENSITY_SCALE: 0.003,
  VELOCITY_DAMPING: 0.95,

  EXPLOSION_RADIUS: 300,
  EXPLOSION_MIN_SPEED: 10,
  EXPLOSION_SPEED_RANGE: 30,
} as const;

export const entropyStrategy: SimulationStrategy = {
  mode: 'entropy',

  init() {
    // no-op (particles already created for mode)
  },

  render() {
    // no-op (per-particle drawing happens in update)
  },

  update(state, context: RenderContext) {
    const { ctx, size, config, pointer } = context;

    for (let i = 0; i < state.particles.length; i++) {
      const p = state.particles[i];

      const dx = pointer.x - p.x;
      const dy = pointer.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const forceDist = Math.max(dist, ENTROPY.MIN_FORCE_DISTANCE);
      const maxG = pointer.isDown
        ? ENTROPY.MAX_G_DOWN
        : ENTROPY.MAX_G_BASE + config.gravityStrength * ENTROPY.MAX_G_GRAVITY_SCALE;

      const force = (maxG - dist) / forceDist;

      if (pointer.isDown || dist < ENTROPY.INFLUENCE_RADIUS) {
        const pull = pointer.isDown ? ENTROPY.PULL_DOWN : ENTROPY.PULL_HOVER;
        const safeDist = dist === 0 ? 0.0001 : dist;

        p.vx += (dx / safeDist) * force * p.density * ENTROPY.FORCE_DENSITY_SCALE * pull;
        p.vy += (dy / safeDist) * force * p.density * ENTROPY.FORCE_DENSITY_SCALE * pull;
      }

      p.vx *= ENTROPY.VELOCITY_DAMPING;
      p.vy *= ENTROPY.VELOCITY_DAMPING;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = size.width;
      else if (p.x > size.width) p.x = 0;

      if (p.y < 0) p.y = size.height;
      else if (p.y > size.height) p.y = 0;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  onPointerUp(state, context: SimulationContext) {
    const mx = context.pointer.x;
    const my = context.pointer.y;

    state.particles.forEach((p) => {
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < ENTROPY.EXPLOSION_RADIUS) {
        const safeDist = dist === 0 ? 0.0001 : dist;
        const speed = Math.random() * ENTROPY.EXPLOSION_SPEED_RANGE + ENTROPY.EXPLOSION_MIN_SPEED;
        p.vx = (dx / safeDist) * speed;
        p.vy = (dy / safeDist) * speed;
      }
    });
  },
};
