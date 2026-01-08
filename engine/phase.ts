import type { RenderContext, SimulationContext, SimulationStrategy } from './types';

const PHASE = {
  // Interaction region around pointer
  HEAT_RADIUS_SOLID: 250,
  HEAT_RADIUS_LIQUID: 150,

  // Semantic “material” params
  LIQUID_VISCOSITY: 0.96,
  SOLID_DAMPING: 0.85,
  SOLID_ELASTICITY: 0.08,

  // Input coupling
  SOLID_SHAKE_GAIN: 0.1,
  LIQUID_NOISE_GAIN: 0.1,

  LIQUID_PUSH_STRENGTH: 2,
  SOLID_PUSH_STRONG: 10,
  SOLID_PUSH_WEAK: 0.5,
  SOLID_STRONG_PUSH_SPEED_THRESHOLD: 10,

  // Rendering
  MAX_STRETCH: 5,
} as const;

export const phaseStrategy: SimulationStrategy = {
  mode: 'phase',

  init(state) {
    // Matches original: entering phase mode resets to solid state.
    state.isLiquidPhase = false;
  },

  render() {
    // no-op (per-particle drawing happens in update)
  },

  update(state, context: RenderContext) {
    const { ctx, config, pointer, pointerSpeed } = context;

    for (let i = 0; i < state.particles.length; i++) {
      const p = state.particles[i];

      const dx = pointer.x - p.x;
      const dy = pointer.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const heatRadius = state.isLiquidPhase ? PHASE.HEAT_RADIUS_LIQUID : PHASE.HEAT_RADIUS_SOLID;

      if (dist < heatRadius) {
        const force = (heatRadius - dist) / heatRadius;
        const shake = state.isLiquidPhase ? 0 : Math.random() * pointerSpeed * PHASE.SOLID_SHAKE_GAIN;

        const pushStrength = state.isLiquidPhase
          ? PHASE.LIQUID_PUSH_STRENGTH
          : pointerSpeed > PHASE.SOLID_STRONG_PUSH_SPEED_THRESHOLD
            ? PHASE.SOLID_PUSH_STRONG
            : PHASE.SOLID_PUSH_WEAK;

        const safeDist = dist === 0 ? 0.0001 : dist;
        p.vx -= (dx / safeDist) * force * pushStrength + (Math.random() - 0.5) * shake;
        p.vy -= (dy / safeDist) * force * pushStrength + (Math.random() - 0.5) * shake;
      }

      if (!state.isLiquidPhase) {
        const k = PHASE.SOLID_ELASTICITY * (1 + config.gravityStrength);
        p.vx += (p.originX - p.x) * k;
        p.vy += (p.originY - p.y) * k;
        p.vx *= PHASE.SOLID_DAMPING;
        p.vy *= PHASE.SOLID_DAMPING;
      } else {
        p.vx += (Math.random() - 0.5) * PHASE.LIQUID_NOISE_GAIN;
        p.vy += (Math.random() - 0.5) * PHASE.LIQUID_NOISE_GAIN;
        p.vx *= PHASE.LIQUID_VISCOSITY;
        p.vy *= PHASE.LIQUID_VISCOSITY;
      }

      p.x += p.vx;
      p.y += p.vy;

      ctx.fillStyle = p.color;

      if (!state.isLiquidPhase) {
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const stretch = Math.min(speed, PHASE.MAX_STRETCH);
        ctx.fillRect(p.x, p.y, p.size + stretch, p.size - stretch / 2);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },

  onPointerUp(state, _context: SimulationContext) {
    state.isLiquidPhase = !state.isLiquidPhase;
  },
};
