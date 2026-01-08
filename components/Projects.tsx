
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROJECTS, UI_TEXT } from '../constants';
import { useLanguage } from './LanguageContext';
import { 
  ArrowUpRight, 
  Cpu, 
  Activity, 
  Database, 
  GitBranch, 
  ScanEye, 
  BarChart3, 
  Trophy, 
  Folder 
} from 'lucide-react';

// --- Sub-component: 3D Holographic Card ---
const TiltCard = ({ children, index }: { children: React.ReactNode, index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{ perspective: 1000 }}
            className="h-full"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="h-full relative group"
            >
                {children}
                
                {/* Holographic Glare Effect */}
                <motion.div 
                    style={{
                        background: useTransform(
                            mouseX, 
                            [-0.5, 0.5], 
                            [
                                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.0) 45%, transparent 50%)",
                                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, transparent 50%)" 
                            ]
                        ),
                        opacity: useTransform(mouseX, [-0.5, 0.5], [0, 1])
                    }}
                    className="absolute inset-0 z-20 pointer-events-none rounded-xl"
                />
            </motion.div>
        </motion.div>
    );
};


const Projects: React.FC = () => {
  const { t } = useLanguage();
  // Extract unique categories
  const categories = Array.from(new Set(PROJECTS.map(p => p.category)));
  
  // State for active category
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0]);

  // Helper icons for Projects
  const getIcon = (i: number) => {
    const icons = [Cpu, Activity, Database, GitBranch];
    const Icon = icons[i % icons.length];
    return <Icon className="w-5 h-5 text-stone-400 group-hover:text-purple-900 transition-colors" strokeWidth={1.5} />;
  };

  // Helper icons for Categories
  const getCategoryIcon = (category: string) => {
    if (category.includes('Vision')) return <ScanEye className="w-8 h-8 mb-4" strokeWidth={1} />;
    if (category.includes('Business')) return <BarChart3 className="w-8 h-8 mb-4" strokeWidth={1} />;
    if (category.includes('Sports')) return <Trophy className="w-8 h-8 mb-4" strokeWidth={1} />;
    return <Folder className="w-8 h-8 mb-4" strokeWidth={1} />;
  };

  return (
        <section id="projects" className="scroll-mt-28 md:scroll-mt-32 py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-stone-50/30">
       
       {/* Background: Digital Grid */}
       <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
                <pattern id="binaryGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <text x="10" y="20" fontSize="10" fill="black" opacity="0.5">0</text>
                    <text x="40" y="50" fontSize="10" fill="black" opacity="0.5">1</text>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#binaryGrid)" />
          </svg>
       </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-end justify-between mb-16 border-b border-stone-200 pb-6">
          <div>
             <span className="font-mono text-xs text-purple-900/60 mb-2 block">{t(UI_TEXT.projects.section)}</span>
            <h3 className="font-serif text-4xl md:text-5xl text-obsidian italic">
              {t(UI_TEXT.projects.title)}
            </h3>
          </div>
          <div className="hidden md:block text-right">
            <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">
                {t(UI_TEXT.projects.interact)}
            </p>
          </div>
        </div>

        {/* 1. Horizontal Category Modules (Side by Side) */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
            {categories.map((category, idx) => {
                const isActive = activeCategory === category;
                const count = PROJECTS.filter(p => p.category === category).length;

                return (
                    <motion.button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                            relative overflow-hidden p-8 text-left border transition-all duration-300 group
                            ${isActive 
                                ? 'bg-white border-purple-900/30 shadow-xl shadow-purple-900/5' 
                                : 'bg-white/40 border-stone-200 hover:bg-white hover:border-stone-300'
                            }
                        `}
                    >
                        {/* Active Indicator Scanline */}
                        {isActive && (
                            <motion.div 
                                layoutId="activeGlow"
                                className="absolute top-0 left-0 w-full h-1 bg-purple-900/50" 
                            />
                        )}

                        {/* Icon */}
                        <div className={`transition-colors duration-300 ${isActive ? 'text-purple-900' : 'text-stone-400 group-hover:text-stone-600'}`}>
                            {getCategoryIcon(category)}
                        </div>

                        {/* Text */}
                        <h4 className={`font-serif text-xl md:text-2xl mb-2 transition-colors duration-300 ${isActive ? 'text-obsidian' : 'text-stone-600'}`}>
                            {category}
                        </h4>
                        
                        <div className="flex items-center gap-2">
                             <div className={`h-px flex-1 transition-colors duration-300 ${isActive ? 'bg-purple-900/20' : 'bg-stone-200'}`} />
                             <span className="font-mono text-xs text-stone-400">{count} {t(UI_TEXT.projects.files)}</span>
                        </div>

                        {/* Decorative Background Tech */}
                        <div className="absolute -bottom-4 -right-4 text-[100px] leading-none font-bold text-stone-100 opacity-20 pointer-events-none select-none font-sans">
                            0{idx + 1}
                        </div>
                    </motion.button>
                );
            })}
        </div>

        {/* 2. Projects Display Area (Appears below) */}
        <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
                {activeCategory && (
                    <motion.div
                        key={activeCategory}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {PROJECTS.filter(p => p.category === activeCategory).map((project, index) => (
                            <TiltCard key={t(project.title)} index={index}>
                                <a 
                                    href={project.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block h-full"
                                >
                                    <div className="bg-white border border-stone-200 p-8 h-full flex flex-col justify-between relative transition-all duration-500 hover:border-purple-900/30 hover:shadow-2xl shadow-stone-200/50 rounded-lg transform-style-3d cursor-pointer">
                                        
                                        {/* Tech Corner Brackets */}
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-stone-400 group-hover:border-purple-900/50 transition-colors" />
                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-stone-400 group-hover:border-purple-900/50 transition-colors" />
                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-stone-400 group-hover:border-purple-900/50 transition-colors" />
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-stone-400 group-hover:border-purple-900/50 transition-colors" />

                                        {/* Card Content (Lifted slightly in Z-space) */}
                                        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-mono text-[10px] font-bold text-stone-400 border border-stone-200 px-1 rounded">
                                                        SYS-{index}
                                                    </span>
                                                    {getIcon(index)}
                                                </div>
                                                <ArrowUpRight className="w-5 h-5 text-stone-300 group-hover:text-obsidian group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                                            </div>
                                            
                                            <h4 className="font-serif text-2xl text-obsidian mb-2 group-hover:text-purple-900 transition-colors">
                                                {t(project.title)}
                                            </h4>
                                            
                                            <p className="font-sans text-[10px] font-bold tracking-widest text-stone-500 uppercase mb-4">
                                                {t(project.subtitle)}
                                            </p>
                                            
                                            <p className="font-sans text-sm text-stone-600 leading-relaxed">
                                                {t(project.description)}
                                            </p>
                                        </div>

                                        {/* Tags (Lifted less in Z-space) */}
                                        <div className="relative z-10 pt-6 mt-6 border-t border-stone-100/50 flex flex-wrap gap-2" style={{ transform: "translateZ(10px)" }}>
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="text-[10px] font-mono text-stone-400 bg-stone-50 px-2 py-1 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            </TiltCard>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Projects;
