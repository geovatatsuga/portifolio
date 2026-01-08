
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Share2, Activity, Droplets, TrendingUp, Minus, Plus } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { UI_TEXT } from '../constants';

import type { PointerState, SimulationConfig, SimulationMode } from '../engine/types';
import { createSimulationEngine } from '../engine/SimulationEngine';

const Playground: React.FC = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<ReturnType<typeof createSimulationEngine> | null>(null);
  
  // --- Config State (UI) ---
  const [mode, setMode] = useState<SimulationMode>('entropy');
  const [particleCount, setParticleCount] = useState(2000);
  const [gravityStrength, setGravityStrength] = useState(0.5); 
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  // Refs for animation loop
  const configRef = useRef({ mode, particleCount, gravityStrength });
  
  useEffect(() => {
    configRef.current = { mode, particleCount, gravityStrength };
  }, [mode, particleCount, gravityStrength]);

  // Interaction State
    const mouseRef = useRef<PointerState>({ x: -1000, y: -1000, isDown: false, vx: 0, vy: 0, lastX: 0, lastY: 0 });
  const [isPressed, setIsPressed] = useState(false); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initial sizing based on container
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    engineRef.current = createSimulationEngine({ width, height });

    // --- Animation Loop ---
    let animationFrameId: number;

    const animate = () => {
        const engine = engineRef.current;
        if (engine) {
          const config: SimulationConfig = {
            mode: configRef.current.mode,
            particleCount: configRef.current.particleCount,
            gravityStrength: configRef.current.gravityStrength,
          };
          engine.step(ctx, config, mouseRef.current);
        }

        animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    // --- Event Handlers ---
    const handleResize = () => {
        if (containerRef.current && canvasRef.current) {
            width = canvasRef.current.width = containerRef.current.clientWidth;
            height = canvasRef.current.height = containerRef.current.clientHeight;
            engineRef.current?.resize({ width, height });
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

                const engine = engineRef.current;
                if (engine) {
                    const config: SimulationConfig = {
                        mode: configRef.current.mode,
                        particleCount: configRef.current.particleCount,
                        gravityStrength: configRef.current.gravityStrength,
                    };
                    engine.onPointerUp(config, mouseRef.current);
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
        <section id="lab" className="scroll-mt-28 md:scroll-mt-32 w-full bg-ivory border-b border-stone-200">
       
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
