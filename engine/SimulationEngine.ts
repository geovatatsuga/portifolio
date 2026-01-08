import { Particle } from './Particle';
import type { EngineSize, PointerState, RenderContext, SimulationConfig, SimulationContext, SimulationMode, SimulationStrategy } from './types';
import { entropyStrategy } from './entropy';
import { neuralStrategy } from './neural';
import { phaseStrategy } from './phase';
import { optimizationStrategy } from './optimization';

const ENGINE = {
  TIME_STEP: 0.01,

  MAX_ADD_PER_FRAME: 50,

  // Mode caps
  NEURAL_MAX_PARTICLES: 120,
  OPTIMIZATION_MAX_PARTICLES: 2000,

  // Background clears
  BACKGROUND_FILL_DEFAULT: 'rgba(253, 252, 248, 0.4)',
  BACKGROUND_FILL_OPTIMIZATION: 'rgba(253, 252, 248, 0.08)',

  // Neural interference (global)
  INTERFERENCE_INCREASE_PER_FRAME: 1,
  INTERFERENCE_MAX: 50,
  INTERFERENCE_DECAY_PER_FRAME: 2,
} as const;

type EngineState = {
  size: EngineSize;
  particles: Particle[];
  isLiquidPhase: boolean;
  interference: number;
};

export type SimulationEngine = {
  resize(size: EngineSize): void;
  step(ctx: CanvasRenderingContext2D, config: SimulationConfig, pointer: PointerState): void;
  onPointerUp(config: SimulationConfig, pointer: PointerState): void;
};

const strategies: Record<SimulationMode, SimulationStrategy> = {
  entropy: entropyStrategy,
  neural: neuralStrategy,
  phase: phaseStrategy,
  optimization: optimizationStrategy,
};

export function createSimulationEngine(initialSize: EngineSize): SimulationEngine {
  const state: EngineState = {
    size: initialSize,
    particles: [],
    isLiquidPhase: false,
    interference: 0,
  };

  let time = 0;
  let lastMode: SimulationMode | null = null;

  const ensureParticleCount = (mode: SimulationMode, requestedCount: number) => {
    let targetCount = requestedCount;
    if (mode === 'neural') targetCount = Math.min(targetCount, ENGINE.NEURAL_MAX_PARTICLES);
    if (mode === 'optimization') targetCount = Math.min(targetCount, ENGINE.OPTIMIZATION_MAX_PARTICLES);

    if (lastMode !== mode) {
      state.particles = [];
      for (let i = 0; i < targetCount; i++) state.particles.push(new Particle(mode, i, targetCount, state.size));
      state.isLiquidPhase = false;
      state.interference = 0;
      strategies[mode].init(state as any);
      lastMode = mode;
      return;
    }

    if (state.particles.length < targetCount) {
      const toAdd = Math.min(ENGINE.MAX_ADD_PER_FRAME, targetCount - state.particles.length);
      for (let i = 0; i < toAdd; i++) {
        state.particles.push(new Particle(mode, state.particles.length + i, targetCount, state.size));
      }
    } else if (state.particles.length > targetCount) {
      state.particles.length = targetCount;
    }
  };

  const updateGlobalInterference = (mode: SimulationMode, pointer: PointerState) => {
    if (mode === 'neural') {
      if (pointer.isDown) {
        state.interference = Math.min(state.interference + ENGINE.INTERFERENCE_INCREASE_PER_FRAME, ENGINE.INTERFERENCE_MAX);
      } else {
        state.interference = Math.max(state.interference - ENGINE.INTERFERENCE_DECAY_PER_FRAME, 0);
      }
    } else {
      state.interference = 0;
    }
  };

  const clearCanvas = (ctx: CanvasRenderingContext2D, mode: SimulationMode) => {
    if (mode === 'neural') {
      ctx.clearRect(0, 0, state.size.width, state.size.height);
      return;
    }

    const useTrails = mode === 'optimization';
    ctx.fillStyle = useTrails ? ENGINE.BACKGROUND_FILL_OPTIMIZATION : ENGINE.BACKGROUND_FILL_DEFAULT;
    ctx.fillRect(0, 0, state.size.width, state.size.height);
  };

  return {
    resize(size: EngineSize) {
      state.size = size;
    },

    step(ctx: CanvasRenderingContext2D, config: SimulationConfig, pointer: PointerState) {
      time += ENGINE.TIME_STEP;

      updateGlobalInterference(config.mode, pointer);
      ensureParticleCount(config.mode, config.particleCount);

      clearCanvas(ctx, config.mode);

      const pointerSpeed = Math.sqrt(pointer.vx * pointer.vx + pointer.vy * pointer.vy);

      const baseContext: SimulationContext = {
        size: state.size,
        time,
        config,
        pointer,
        pointerSpeed,
      };

      const renderContext: RenderContext = {
        ...baseContext,
        ctx,
      };

      const strategy = strategies[config.mode];

      // Preserve original ordering: some modes draw global first (neural connections).
      strategy.render(state as any, renderContext);
      strategy.update(state as any, renderContext);
    },

    onPointerUp(config: SimulationConfig, pointer: PointerState) {
      const pointerSpeed = Math.sqrt(pointer.vx * pointer.vx + pointer.vy * pointer.vy);

      const context: SimulationContext = {
        size: state.size,
        time,
        config,
        pointer,
        pointerSpeed,
      };

      const strategy = strategies[config.mode];
      strategy.onPointerUp?.(state as any, context);
    },
  };
}
