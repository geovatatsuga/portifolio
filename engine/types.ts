export type SimulationMode = 'entropy' | 'neural' | 'phase' | 'optimization';

export type SimulationConfig = {
  mode: SimulationMode;
  particleCount: number;
  gravityStrength: number;
};

export type PointerState = {
  x: number;
  y: number;
  isDown: boolean;
  vx: number;
  vy: number;
  lastX: number;
  lastY: number;
};

export type EngineSize = {
  width: number;
  height: number;
};

export type SimulationContext = {
  size: EngineSize;
  time: number;
  config: SimulationConfig;
  pointer: PointerState;
  pointerSpeed: number;
};

export type RenderContext = SimulationContext & {
  ctx: CanvasRenderingContext2D;
};

// Structural type (keeps engine/types.ts independent from engine/Particle.ts)
export type EngineParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  density: number;
  maxSpeed: number;
  history: { x: number; y: number }[];
};

export type EngineState = {
  size: EngineSize;
  particles: EngineParticle[];
  isLiquidPhase: boolean;
  interference: number;
};

export interface SimulationStrategy {
  readonly mode: SimulationMode;

  init(state: EngineState): void;
  render(state: EngineState, context: RenderContext): void;
  update(state: EngineState, context: RenderContext): void;

  onPointerUp?(state: EngineState, context: SimulationContext): void;
}
