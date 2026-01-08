
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PROFILE, UI_TEXT } from '../constants';
import { ArrowDown, Orbit } from 'lucide-react';
import ScrambleText from './ScrambleText';
import { useLanguage } from './LanguageContext';

// --- Sub-component: Neural Network Canvas ---
const NeuralNetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      binary: string;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];
    // Increased count slightly to compensate for fading particles
    const particleCount = width < 768 ? 40 : 80; 
    const connectionDistance = 160;
    const mouseDistance = 250;
    
    let mouse = { x: -1000, y: -1000, lastMove: Date.now() };

    // Initialize Particle Helper
    const initParticle = (p?: Particle): Particle => {
      const isRespawn = !!p;
      const newP = p || {} as Particle;
      
      newP.x = Math.random() * width;
      newP.y = Math.random() * height;
      
      newP.vx = (Math.random() - 0.5) * 1.5;
      newP.vy = (Math.random() - 0.5) * 1.5;
      newP.binary = Math.random() > 0.5 ? '1' : '0';
      newP.life = 0;
      // Random lifespan between 200 and 500 frames (~3 to 8 seconds)
      newP.maxLife = 200 + Math.random() * 300; 

      return newP;
    };

    // Create initial batch
    for (let i = 0; i < particleCount; i++) {
      particles.push(initParticle());
      // Randomize initial life so they don't all die at once
      particles[i].life = Math.random() * particles[i].maxLife;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.lastMove = Date.now();
    };

    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const now = Date.now();
      const isMouseActive = now - mouse.lastMove < 2000; // Mouse considered active if moved in last 2s

      // Update & Draw Particles
      particles.forEach((p, i) => {
        // 1. Lifecycle Management
        p.life++;
        if (p.life >= p.maxLife) {
            initParticle(p); // Respawn
        }

        // Calculate Opacity based on life (Sine wave for smooth fade in/out)
        // 0 -> 1 -> 0
        const opacity = Math.sin((p.life / p.maxLife) * Math.PI); 

        // 2. Movement Logic
        // If mouse is inactive, disperse faster (higher random jitter)
        const jitter = isMouseActive ? 0.05 : 0.15;
        
        p.vx += (Math.random() - 0.5) * jitter;
        p.vy += (Math.random() - 0.5) * jitter;

        // Friction
        p.vx *= 0.99; 
        p.vy *= 0.99;

        // Apply
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen instead of bounce (better for "cloud" feel)
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        // Calculate distance to mouse
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        // --- DRAW LOGIC ---
        ctx.beginPath();

        // INTERFERENCE LOGIC: 
        if (distToMouse < mouseDistance) {
            if (Math.random() > 0.9) p.binary = Math.random() > 0.5 ? '1' : '0';

            ctx.font = '12px "Courier New", monospace';
            // Opacity affected by both distance AND lifecycle
            ctx.fillStyle = `rgba(88, 28, 135, ${opacity * 0.8 * (1 - distToMouse / mouseDistance)})`; 
            
            const glitchOffset = distToMouse < 100 ? (Math.random() - 0.5) * 3 : 0;
            ctx.fillText(p.binary, p.x + glitchOffset, p.y + glitchOffset);
        } else {
            // NORMAL DOT
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(168, 162, 158, ${opacity * 0.3})`; // Base opacity 0.3
            ctx.fill();
        }

        // Connect to other particles
        // Optimization: Only connect if particle has decent opacity
        if (opacity > 0.1) {
            for (let j = i + 1; j < particles.length; j++) {
              const p2 = particles[j];
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
    
              if (dist < connectionDistance) {
                ctx.beginPath();
                // Combine opacities of both particles for line strength
                const lineOpacity = Math.min(opacity, Math.sin((p2.life / p2.maxLife) * Math.PI));
                
                ctx.strokeStyle = `rgba(168, 162, 158, ${lineOpacity * 0.15 * (1 - dist / connectionDistance)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
        }

        // Connect to mouse
        if (distToMouse < mouseDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(107, 33, 168, ${opacity * 0.2 * (1 - distToMouse / mouseDistance)})`; 
            ctx.lineWidth = 1;
            
            if (distToMouse < 100) {
                 ctx.setLineDash([5, 5]);
            } else {
                 ctx.setLineDash([]);
            }

            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Attraction
            if (distToMouse > 50) {
               p.x -= dxMouse * 0.02;
               p.y -= dyMouse * 0.02;
            }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};


// --- Sub-component: Fluctuating System Stats (Bottom Right HUD) ---
const LiveStats: React.FC = () => {
  const [cpu, setCpu] = useState(25);
  const [mem, setMem] = useState(4184);
  const [bars, setBars] = useState<number[]>(Array(5).fill(0.2));

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(prev => Math.min(99, Math.max(10, prev + Math.floor(Math.random() * 20) - 10)));
      setMem(prev => Math.min(8192, Math.max(3000, prev + Math.floor(Math.random() * 300) - 150)));
      setBars(Array.from({ length: 5 }).map(() => Math.random()));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="absolute bottom-8 right-6 md:right-12 flex flex-col items-end gap-3 font-mono text-[10px] text-stone-400 z-20 pointer-events-none"
    >
      <div className="flex flex-col items-end">
          <span className="text-stone-500 uppercase tracking-widest text-[9px] mb-0.5">CPU_LOAD</span>
          <span className="text-obsidian font-bold text-lg leading-none">{cpu}%</span>
      </div>
      
      <div className="w-8 h-[1px] bg-stone-300 my-1" />

      <div className="flex flex-col items-end">
          <span className="text-stone-500 uppercase tracking-widest text-[9px] mb-0.5">MEM_ALLOC</span>
          <span className="text-obsidian font-bold text-lg leading-none">{mem}MB</span>
      </div>

      <div className="w-8 h-[1px] bg-stone-300 my-1" />

      <div className="flex flex-col items-end">
          <span className="text-stone-500 uppercase tracking-widest text-[9px] mb-0.5">NET_IO</span>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 h-3 items-end">
                {bars.map((h, i) => (
                    <motion.div 
                        key={i} 
                        animate={{ height: `${20 + (h * 80)}%` }}
                        className="w-1 bg-green-500/60" 
                    />
                ))}
            </div>
            <span className="text-green-600 font-bold tracking-wider">CONNECTED</span>
          </div>
      </div>
    </motion.div>
  );
};

// --- Sub-component: Decrypting ID Tag ---
const DecryptingID: React.FC = () => {
    const [id, setId] = useState("8439-X");
    
    useEffect(() => {
        const chars = "ABCDEF0123456789";
        const interval = setInterval(() => {
            setId(`84${chars[Math.floor(Math.random() * chars.length)]}${chars[Math.floor(Math.random() * chars.length)]}-X`);
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute -top-4 right-0 text-[9px] font-mono text-stone-400 font-normal tracking-widest"
        >
            SUB_ID: {id}
        </motion.div>
    );
};


const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden perspective-1000">
      
      {/* 1. Neural Network Canvas (Interactive) */}
      <NeuralNetworkCanvas />
      
      {/* 2. Existing Astrolabe (Subtle background) */}
      <div className="absolute top-1/2 right-0 md:right-[-10%] -translate-y-1/2 w-[700px] h-[700px] md:w-[900px] md:h-[900px] pointer-events-none opacity-10 select-none z-0">
        <motion.div 
            className="w-full h-full relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        >
             {/* Outer Ring */}
            <svg viewBox="0 0 800 800" className="absolute inset-0 w-full h-full text-stone-400">
                <circle cx="400" cy="400" r="380" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                <circle cx="400" cy="400" r="395" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            </svg>
        </motion.div>
      </div>
      
      <div className="max-w-5xl z-10 relative">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-[1px] w-12 bg-stone-400" />
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-mono text-xs text-stone-500 uppercase tracking-widest flex items-center gap-2"
          >
            Portfolio 2025 <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"/> {t(UI_TEXT.hero.active)}
          </motion.span>
        </motion.div>

        {/* Main Title Area */}
        <div className="relative inline-block mb-8">
            
            {/* Tech Brackets */}
            <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: [0.5, 1, 0.5], width: 40 }}
                transition={{ width: { delay: 0.8, duration: 0.5 }, opacity: { duration: 4, repeat: Infinity } }}
                className="absolute -top-4 -left-4 md:-left-8 h-[1px] bg-stone-400"
            />
             <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: [0.5, 1, 0.5], height: 40 }}
                transition={{ height: { delay: 0.8, duration: 0.5 }, opacity: { duration: 4, repeat: Infinity, delay: 1 } }}
                className="absolute -top-4 -left-4 md:-left-8 w-[1px] bg-stone-400"
            />

            <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: [0.5, 1, 0.5], width: 40 }}
                transition={{ width: { delay: 0.8, duration: 0.5 }, opacity: { duration: 4, repeat: Infinity, delay: 2 } }}
                className="absolute -bottom-4 -right-4 md:-right-8 h-[1px] bg-stone-400"
            />
             <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: [0.5, 1, 0.5], height: 40 }}
                transition={{ height: { delay: 0.8, duration: 0.5 }, opacity: { duration: 4, repeat: Infinity, delay: 3 } }}
                className="absolute -bottom-4 -right-4 md:-right-8 w-[1px] bg-stone-400"
            />

            {/* The Name with Scramble Effect */}
            <div className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-obsidian leading-[0.9] relative z-10">
                <ScrambleText text={PROFILE.name} delay={500} />
            </div>
            
            {/* Decrypting ID Tag */}
            <DecryptingID />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pl-2 md:pl-4 border-l-2 border-purple-900/20 relative flex flex-col md:flex-row gap-6 md:items-start"
        >
          {/* Decorative bracket */}
          <div className="absolute -left-[2px] -top-2 w-2 h-2 bg-purple-900/20" />
          <div className="absolute -left-[2px] -bottom-2 w-2 h-2 bg-purple-900/20" />

          <div>
              <h2 className="font-sans text-xl md:text-2xl font-light text-stone-700 flex items-center gap-2">
                <ScrambleText text={t(PROFILE.role)} delay={1500} revealSpeed={30} className="min-h-[2rem]" />
                <Orbit className="w-4 h-4 text-purple-900/40 animate-spin-slow" />
              </h2>
              <p className="font-serif italic text-xl md:text-2xl text-stone-500 max-w-lg mt-4 leading-relaxed">
                {t(PROFILE.tagline)}
              </p>
          </div>

        </motion.div>
      </div>

      {/* 4. Live Stats HUD (Fixed to Bottom Right) */}
      <LiveStats />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-6 flex items-center gap-4 cursor-pointer hover:opacity-70 transition-opacity z-20"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="flex flex-col gap-2 items-center">
          <motion.div 
            animate={{ height: [40, 60, 40] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px bg-stone-300" 
          />
          <ArrowDown className="w-4 h-4 text-stone-400" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 -rotate-90 origin-left translate-x-4">
          {t(UI_TEXT.hero.scroll)}
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
