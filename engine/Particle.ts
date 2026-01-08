import type { EngineSize, SimulationMode } from './types';

export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;

  originX: number;
  originY: number;

  size: number;
  color: string;
  density: number;

  // Optimization mode
  maxSpeed: number;
  history: { x: number; y: number }[];

  constructor(mode: SimulationMode, index: number, total: number, size: EngineSize) {
    this.x = Math.random() * size.width;
    this.y = Math.random() * size.height;

    this.originX = this.x;
    this.originY = this.y;

    this.vx = 0;
    this.vy = 0;

    this.size = 1;
    this.color = '#000';
    this.density = 1;

    this.history = [];
    this.maxSpeed = 2;

    this.resetStats(mode, index, total, size);
  }

  resetStats(mode: SimulationMode, index: number, total: number, size: EngineSize) {
    this.vx = 0;
    this.vy = 0;
    this.history = [];

    if (mode === 'neural') {
      const cols = Math.ceil(Math.sqrt(total * (size.width / size.height)));
      const rows = Math.ceil(total / cols);
      const stepX = size.width / (cols + 1);
      const stepY = size.height / (rows + 1);

      const col = index % cols;
      const row = Math.floor(index / cols);

      const jitter = 2;
      this.originX = (col + 1) * stepX + (Math.random() - 0.5) * jitter;
      this.originY = (row + 1) * stepY + (Math.random() - 0.5) * jitter;

      this.x = this.originX;
      this.y = this.originY;

      this.size = Math.random() * 2 + 1.5;
      this.color = Math.random() > 0.5 ? 'rgba(88, 28, 135, 1)' : 'rgba(18, 18, 18, 0.8)';
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = (Math.random() - 0.5) * 0.2;
    } else if (mode === 'phase') {
      const cols = Math.ceil(Math.sqrt(total * (size.width / size.height)));
      const padding = size.width / cols;
      const col = index % cols;
      const row = Math.floor(index / cols);

      this.originX = col * padding + padding / 2 + (size.width - cols * padding) / 2;
      this.originY = row * padding + padding / 2;
      this.x = this.originX;
      this.y = this.originY;
      this.size = 2;
      this.color = `rgba(15, 118, 110, ${Math.random() * 0.4 + 0.4})`;
    } else if (mode === 'optimization') {
      this.x = Math.random() * size.width;
      this.y = Math.random() * size.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.maxSpeed = Math.random() * 2 + 2;
      this.color = `rgba(20, 20, 20, ${Math.random() * 0.5 + 0.2})`;
    } else {
      // entropy
      this.size = Math.random() * 1.5 + 0.5;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      const shade = Math.floor(Math.random() * 100);
      this.color = `rgba(${shade}, ${shade}, ${shade}, ${Math.random() * 0.5 + 0.2})`;
    }

    this.density = Math.random() * 30 + 1;
  }
}
