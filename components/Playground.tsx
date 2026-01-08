
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Share2, Activity, Droplets, TrendingUp, Minus, Plus } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { UI_TEXT } from '../constants';

type SimulationMode = 'entropy' | 'neural' | 'phase' | 'optimization';

const Playground: React.FC = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // --- Config State (UI) ---
  const [mode, setMode] = useState<SimulationMode>('entropy');
  const [particleCount, setParticleCount] = useState(2000);
  const [gravityStrength, setGravityStrength] = useState(0.5); 
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  // Refs for animation loop
  const configRef = useRef({ mode, particleCount, gravityStrength });
  
  // Neural Interference State
  const interferenceRef = useRef(0); // 0 to 100
  
  useEffect(() => {
    configRef.current = { mode, particleCount, gravityStrength };
  }, [mode, particleCount, gravityStrength]);

  // Interaction State
  const mouseRef = useRef({ x: -1000, y: -1000, isDown: false, vx: 0, vy: 0, lastX: 0, lastY: 0 });
  const [isPressed, setIsPressed] = useState(false); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initial sizing based on container
    let width = canvas.width = container.clientWidth;
    let height = canvas.height = container.clientHeight;
    
    // --- Phase State ---
    let isLiquidPhase = false; 

    // --- Particle System ---
    class Particle {
      // 2D Props
      x: number; y: number; 
      vx: number; vy: number;
      originX: number; originY: number; 
      size: number; color: string; density: number;
      
      // Optimization Mode Specific
      maxSpeed: number;
      history: {x: number, y: number}[];

      constructor(currentMode: SimulationMode, index: number, total: number) {
        // Init 2D
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.originX = this.x;
        this.originY = this.y;
        this.vx = 0; this.vy = 0; 
        
        this.size = 1; this.color = '#000'; this.density = 1;
        this.history = [];
        this.maxSpeed = 2;

        this.resetStats(currentMode, index, total);
      }

      resetStats(currentMode: SimulationMode, index: number, total: number) {
         this.vx = 0; this.vy = 0;
         this.history = []; // Clear trails

         if (currentMode === 'neural') {
            this.size = Math.random() * 2 + 1.5;
            this.color = Math.random() > 0.5 ? 'rgba(88, 28, 135, 1)' : 'rgba(18, 18, 18, 0.8)';
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
         
         } else if (currentMode === 'phase') {
            const cols = Math.ceil(Math.sqrt(total * (width/height)));
            const padding = width / cols;
            const col = index % cols;
            const row = Math.floor(index / cols);
            
            this.originX = (col * padding) + (padding/2) + (width - (cols*padding))/2;
            this.originY = (row * padding) + (padding/2);
            this.x = this.originX;
            this.y = this.originY;
            this.size = 2;
            this.color = `rgba(15, 118, 110, ${Math.random() * 0.4 + 0.4})`;
         
         } else if (currentMode === 'optimization') {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.5 + 0.5;
            this.maxSpeed = Math.random() * 2 + 2; 
            this.color = `rgba(20, 20, 20, ${Math.random() * 0.5 + 0.2})`;
         
         } else {
            // Entropy
            this.size = Math.random() * 1.5 + 0.5;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            const shade = Math.floor(Math.random() * 100);
            this.color = `rgba(${shade}, ${shade}, ${shade}, ${Math.random() * 0.5 + 0.2})`;
         }
         this.density = (Math.random() * 30) + 1;
      }
    }

    let particles: Particle[] = [];
    
    // --- Helper: Perlin-ish Noise Function for Flow Field ---
    const getFlowFieldAngle = (x: number, y: number, time: number) => {
        const scale = 0.003;
        const val = Math.sin(x * scale) + Math.cos(y * scale) 
                  + Math.sin((x + y) * scale * 0.5 + time) 
                  + Math.cos((x - y) * scale * 0.5);
        return val * Math.PI; 
    }

    // --- Animation Loop ---
    let animationFrameId: number;
    let lastMode = configRef.current.mode;
    let time = 0;

    const animate = () => {
        const { mode: currentMode, particleCount: currentCount, gravityStrength: currentGravity } = configRef.current;
        const { x: mx, y: my, isDown, vx: mvx, vy: mvy } = mouseRef.current;
        const mouseSpeed = Math.sqrt(mvx*mvx + mvy*mvy);
        
        time += 0.01; 

        // --- GLOBAL LOGIC ---
        // Neural Interference Logic
        if (currentMode === 'neural') {
            if (isDown) {
                interferenceRef.current = Math.min(interferenceRef.current + 1, 50); 
            } else {
                interferenceRef.current = Math.max(interferenceRef.current - 2, 0); 
            }
        } else {
            interferenceRef.current = 0;
        }

        // Manage Particle Count & Mode Switch
        let targetCount = currentCount;
        if (currentMode === 'neural') targetCount = Math.min(currentCount, 120); 
        if (currentMode === 'optimization') targetCount = Math.min(currentCount, 2000); 

        if (currentMode !== lastMode) {
             particles = [];
             for(let i=0; i<targetCount; i++) particles.push(new Particle(currentMode, i, targetCount));
             lastMode = currentMode;
             isLiquidPhase = false; 
             interferenceRef.current = 0;
        }

        if (particles.length < targetCount) {
             const toAdd = Math.min(50, targetCount - particles.length); 
             for(let i=0; i<toAdd; i++) particles.push(new Particle(currentMode, particles.length+i, targetCount));
        } else if (particles.length > targetCount) {
             particles.length = targetCount;
        }

        // --- CANVAS CLEARING ---
        if (currentMode === 'neural') {
             ctx.clearRect(0, 0, width, height);
        } else if (currentMode === 'optimization') {
             ctx.fillStyle = 'rgba(253, 252, 248, 0.08)'; 
             ctx.fillRect(0, 0, width, height);
        } else {
             ctx.fillStyle = 'rgba(253, 252, 248, 0.4)';
             ctx.fillRect(0, 0, width, height);
        }

        // --- UPDATE LOOP ---
        
        // 1. NEURAL CONNECTIONS
        if (currentMode === 'neural') {
            const interference = interferenceRef.current;
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distSq = dx*dx + dy*dy;
                    if (distSq < 15000) { 
                        const dist = Math.sqrt(distSq);
                        const opacity = 1 - (distSq/15000);
                        const isGlitch = interference > 20 && Math.random() > 0.8;
                        ctx.strokeStyle = isGlitch ? `rgba(220, 38, 38, ${opacity})` : `rgba(88, 28, 135, ${opacity * (interference > 0 ? 0.8 : 0.2)})`;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        if (interference > 5 && Math.random() > 0.95) {
                            const midX = (p.x + p2.x) / 2;
                            const midY = (p.y + p2.y) / 2;
                            ctx.font = '10px monospace';
                            ctx.fillStyle = isGlitch ? 'red' : 'black';
                            const bin = Math.random().toString(2).substring(2, 6); 
                            ctx.fillText(bin, midX, midY);
                        }
                    }
                }
            }
        }

        // 2. PARTICLE PHYSICS
        for (let i = 0; i < particles.length; i++) {
             const p = particles[i];
             const dx = mx - p.x;
             const dy = my - p.y;
             const dist = Math.sqrt(dx*dx + dy*dy);

             // ==========================
             // MODE: OPTIMIZATION
             // ==========================
             if (currentMode === 'optimization') {
                const fieldAngle = getFlowFieldAngle(p.x, p.y, time);
                const mouseAngle = Math.atan2(dy, dx);
                const mouseInfluence = isDown ? 0.95 : 0.05; 
                
                const fieldVx = Math.cos(fieldAngle);
                const fieldVy = Math.sin(fieldAngle);
                const mouseVx = Math.cos(mouseAngle);
                const mouseVy = Math.sin(mouseAngle);

                let targetVx = (fieldVx * (1 - mouseInfluence)) + (mouseVx * mouseInfluence);
                let targetVy = (fieldVy * (1 - mouseInfluence)) + (mouseVy * mouseInfluence);

                p.vx += targetVx * 0.2;
                p.vy += targetVy * 0.2;
                
                const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
                const limit = isDown ? p.maxSpeed * 3 : p.maxSpeed;
                if (speed > limit) {
                    p.vx = (p.vx / speed) * limit;
                    p.vy = (p.vy / speed) * limit;
                }

                p.x += p.vx;
                p.y += p.vy;

                const distToMouse = Math.sqrt(Math.pow(mx - p.x, 2) + Math.pow(my - p.y, 2));
                if ((distToMouse < 5 && isDown) || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
                    p.x = Math.random() * width;
                    p.y = Math.random() * height;
                    p.vx = 0; p.vy = 0;
                }
                
                ctx.fillStyle = isDown ? 'rgba(220, 38, 38, 0.5)' : 'rgba(0,0,0,0.4)';
                ctx.fillRect(p.x, p.y, isDown ? 2 : 1.5, isDown ? 2 : 1.5);
             }
             
             // ==========================
             // MODE: NEURAL
             // ==========================
             else if (currentMode === 'neural') {
                 p.x += p.vx;
                 p.y += p.vy;
                 if (interferenceRef.current > 0) {
                     const intensity = interferenceRef.current; 
                     p.x += (Math.random() - 0.5) * intensity * 0.5;
                     p.y += (Math.random() - 0.5) * intensity * 0.5;
                     if (intensity > 30) {
                         const angle = Math.atan2(dy, dx);
                         p.vx += Math.cos(angle) * 0.5;
                         p.vy += Math.sin(angle) * 0.5;
                     }
                 }
                 if (p.x < 0 || p.x > width) p.vx *= -1;
                 if (p.y < 0 || p.y > height) p.vy *= -1;
                 ctx.beginPath();
                 const radius = p.size + (interferenceRef.current > 0 ? Math.random() * 2 : 0);
                 ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
                 ctx.fillStyle = p.color;
                 ctx.fill();
             }

             // ==========================
             // MODE: PHASE
             // ==========================
             else if (currentMode === 'phase') {
                 const heatRadius = isLiquidPhase ? 150 : 250;
                 if (dist < heatRadius) {
                     const force = (heatRadius - dist) / heatRadius;
                     const shake = isLiquidPhase ? 0 : Math.random() * mouseSpeed * 0.1; 
                     const pushStrength = isLiquidPhase ? 2 : (mouseSpeed > 10 ? 10 : 0.5);
                     p.vx -= (dx/dist) * force * pushStrength + (Math.random()-0.5)*shake;
                     p.vy -= (dy/dist) * force * pushStrength + (Math.random()-0.5)*shake;
                 }
                 if (!isLiquidPhase) { 
                     const k = 0.08 * (1 + currentGravity);
                     p.vx += (p.originX - p.x) * k;
                     p.vy += (p.originY - p.y) * k;
                     p.vx *= 0.85; p.vy *= 0.85;
                 } else { 
                     p.vx += (Math.random() - 0.5) * 0.1;
                     p.vy += (Math.random() - 0.5) * 0.1;
                     p.vx *= 0.96; p.vy *= 0.96;
                 }
                 p.x += p.vx; p.y += p.vy;
                 ctx.fillStyle = p.color;
                 if (!isLiquidPhase) {
                     const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
                     const stretch = Math.min(speed, 5);
                     ctx.fillRect(p.x, p.y, p.size + stretch, p.size - (stretch/2));
                 } else {
                     ctx.beginPath();
                     ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                     ctx.fill();
                 }
             }

             // ==========================
             // MODE: ENTROPY
             // ==========================
             else {
                const forceDist = Math.max(dist, 50);
                const maxG = isDown ? 5000 : 200 + (currentGravity * 1000); 
                const force = (maxG - dist) / forceDist;
                if (isDown || dist < 300) {
                     const pull = isDown ? 2 : 0.5;
                     p.vx += (dx/dist) * force * p.density * 0.003 * pull;
                     p.vy += (dy/dist) * force * p.density * 0.003 * pull;
                }
                p.vx *= 0.95; p.vy *= 0.95;
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = width; else if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height; else if (p.y > height) p.y = 0;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
             }
        }

        animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    // --- Event Handlers ---
    const handleResize = () => {
        if (containerRef.current && canvasRef.current) {
            width = canvasRef.current.width = containerRef.current.clientWidth;
            height = canvasRef.current.height = containerRef.current.clientHeight;
        }
    }
    const handleMove = (x: number, y: number) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const cx = x - rect.left;
        const cy = y - rect.top;
        
        mouseRef.current.vx = cx - mouseRef.current.lastX;
        mouseRef.current.vy = cy - mouseRef.current.lastY;
        mouseRef.current.lastX = cx;
        mouseRef.current.lastY = cy;
        mouseRef.current.x = cx;
        mouseRef.current.y = cy;
    }
    const handleDown = () => { 
        mouseRef.current.isDown = true; 
        setIsPressed(true); 
    }
    const handleUp = () => { 
        mouseRef.current.isDown = false; 
        setIsPressed(false); 
        
        // Mode Specific Click Triggers
        if (configRef.current.mode === 'entropy') {
             const mx = mouseRef.current.x;
             const my = mouseRef.current.y;
             particles.forEach(p => {
                 const dx = p.x - mx;
                 const dy = p.y - my;
                 const dist = Math.sqrt(dx*dx + dy*dy);
                 if (dist < 300) {
                     p.vx = (dx/dist) * (Math.random() * 30 + 10);
                     p.vy = (dy/dist) * (Math.random() * 30 + 10);
                 }
             });
        } 
        else if (configRef.current.mode === 'phase') {
             isLiquidPhase = !isLiquidPhase;
        }
    }

    // Attach Listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
    canvas.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    
    // Touch
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault(); 
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
        handleDown();
    }, { passive: false });
    window.addEventListener('touchend', handleUp);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mouseup', handleUp);
        window.removeEventListener('touchend', handleUp);
        cancelAnimationFrame(animationFrameId);
    };

  }, []);

  return (
    <section id="lab" className="w-full bg-ivory border-b border-stone-200">
       
       {/* --- SECTION HEADER (Static, outside canvas) --- */}
       <div className="pt-24 pb-8 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pointer-events-none">
             <span className="font-mono text-xs text-purple-900/60 mb-2 block">{t(UI_TEXT.lab.section)}</span>
             <h3 className="font-serif text-3xl md:text-5xl text-obsidian italic mb-1">
                {t(UI_TEXT.lab.title)}
             </h3>
             <p className="font-mono text-[10px] text-stone-400 tracking-widest uppercase">
                 {t(UI_TEXT.lab.subtitle)}
             </p>
       </div>

       {/* --- INTERACTIVE CONTAINER --- */}
       <div ref={containerRef} className="relative w-full h-[75vh] bg-ivory overflow-hidden cursor-crosshair border-t border-stone-100">
            <canvas ref={canvasRef} className="absolute inset-0 block touch-none" />

            {/* --- TOP FLOATING BAR (Controls) --- */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 md:gap-2 bg-white/90 backdrop-blur-md border border-stone-200 p-1.5 rounded-full shadow-lg pointer-events-auto overflow-x-auto max-w-[95vw]">
                    <button 
                        onClick={() => setMode('entropy')}
                        className={`relative px-3 py-2 md:px-4 rounded-full text-[10px] md:text-xs font-bold transition-all duration-300 shrink-0 ${mode === 'entropy' ? 'text-ivory' : 'text-stone-500 hover:text-obsidian'}`}
                    >
                        {mode === 'entropy' && <motion.div layoutId="bg" className="absolute inset-0 bg-obsidian rounded-full" />}
                        <span className="relative flex items-center gap-1.5"><Share2 className="w-3 h-3"/> {t(UI_TEXT.lab.modes.entropy)}</span>
                    </button>
                    <button 
                        onClick={() => setMode('neural')}
                        className={`relative px-3 py-2 md:px-4 rounded-full text-[10px] md:text-xs font-bold transition-all duration-300 shrink-0 ${mode === 'neural' ? 'text-ivory' : 'text-stone-500 hover:text-obsidian'}`}
                    >
                        {mode === 'neural' && <motion.div layoutId="bg" className="absolute inset-0 bg-purple-900 rounded-full" />}
                        <span className="relative flex items-center gap-1.5"><Activity className="w-3 h-3"/> {t(UI_TEXT.lab.modes.neural)}</span>
                    </button>
                    <button 
                        onClick={() => setMode('phase')}
                        className={`relative px-3 py-2 md:px-4 rounded-full text-[10px] md:text-xs font-bold transition-all duration-300 shrink-0 ${mode === 'phase' ? 'text-ivory' : 'text-stone-500 hover:text-obsidian'}`}
                    >
                        {mode === 'phase' && <motion.div layoutId="bg" className="absolute inset-0 bg-teal-700 rounded-full" />}
                        <span className="relative flex items-center gap-1.5"><Droplets className="w-3 h-3"/> {t(UI_TEXT.lab.modes.phase)}</span>
                    </button>
                    <button 
                        onClick={() => setMode('optimization')}
                        className={`relative px-3 py-2 md:px-4 rounded-full text-[10px] md:text-xs font-bold transition-all duration-300 shrink-0 ${mode === 'optimization' ? 'text-ivory' : 'text-stone-500 hover:text-obsidian'}`}
                    >
                        {mode === 'optimization' && <motion.div layoutId="bg" className="absolute inset-0 bg-red-600 rounded-full" />}
                        <span className="relative flex items-center gap-1.5"><TrendingUp className="w-3 h-3"/> {t(UI_TEXT.lab.modes.optimize)}</span>
                    </button>
            </div>

            {/* --- CENTER TEXT (Context Aware) --- */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center select-none z-10 px-4 pt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode} 
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                        transition={{ duration: 0.4 }}
                        className={`text-center transition-opacity duration-500 ${isPressed ? 'opacity-20' : 'opacity-100'}`}
                    >
                        <h3 className="font-serif text-4xl md:text-6xl text-obsidian mb-2">
                            {mode === 'entropy' && t(UI_TEXT.lab.titles.entropy)}
                            {mode === 'neural' && t(UI_TEXT.lab.titles.neural)}
                            {mode === 'phase' && t(UI_TEXT.lab.titles.phase)}
                            {mode === 'optimization' && t(UI_TEXT.lab.titles.optimize)}
                        </h3>
                        <p className="font-mono text-[10px] md:text-xs text-stone-500 tracking-[0.2em] uppercase">
                            {mode === 'entropy' && t(UI_TEXT.lab.hints.entropy)}
                            {mode === 'neural' && t(UI_TEXT.lab.hints.neural)}
                            {mode === 'phase' && t(UI_TEXT.lab.hints.phase)}
                            {mode === 'optimization' && t(UI_TEXT.lab.hints.optimize)}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* --- SETTINGS --- */}
            <div className="absolute bottom-8 right-6 z-30 flex flex-col items-end pointer-events-auto">
                <button 
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                    className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all text-stone-600 font-mono text-xs uppercase tracking-widest"
                >
                    <Settings className="w-3 h-3" />
                    Config
                </button>

                <AnimatePresence>
                    {isPanelOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: -10, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="bg-white/95 backdrop-blur-xl border border-stone-200 p-6 rounded-2xl shadow-2xl w-72 mb-2 origin-bottom-right"
                        >
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                                        Count
                                    </span>
                                    <span className="text-[10px] font-mono font-bold text-obsidian">
                                        {particleCount}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Minus className="w-3 h-3 text-stone-400 cursor-pointer hover:text-obsidian" onClick={() => setParticleCount(p => Math.max(100, p - 100))} />
                                    <input 
                                        type="range" 
                                        min="100" 
                                        max="4000" 
                                        step="100"
                                        value={particleCount}
                                        onChange={(e) => setParticleCount(Number(e.target.value))}
                                        className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-obsidian"
                                    />
                                    <Plus className="w-3 h-3 text-stone-400 cursor-pointer hover:text-obsidian" onClick={() => setParticleCount(p => Math.min(4000, p + 100))} />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                                        Factor
                                    </span>
                                    <div className="flex gap-0.5">
                                        {[1,2,3,4,5].map(i => (
                                            <div key={i} className={`w-1 h-2 rounded-sm transition-colors ${i <= gravityStrength * 5 ? 'bg-purple-900' : 'bg-stone-200'}`} />
                                        ))}
                                    </div>
                                </div>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="1" 
                                    step="0.1"
                                    value={gravityStrength}
                                    onChange={(e) => setGravityStrength(Number(e.target.value))}
                                    className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-purple-900"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Scientific HUD Elements (Bottom Left) */}
            <div className="absolute bottom-6 left-6 font-mono text-[10px] text-stone-400 pointer-events-none space-y-1 z-20">
                <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isPressed ? 'bg-red-500 animate-pulse' : 'bg-obsidian'}`} />
                    SYS.MODE: {mode.toUpperCase()}
                </div>
                <div>COMPUTE_LOAD: {Math.round((particleCount / 4000) * 100)}%</div>
            </div>
       </div>

    </section>
  );
};

export default Playground;
