import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROJECTS, UI_TEXT, GENAI_PROJECTS } from '../constants';
import { useLanguage } from './LanguageContext';
import { 
  ArrowUpRight, 
  Cpu, 
  Activity, 
  Database, 
  GitBranch,
  Brain
} from 'lucide-react';

// --- Sub-component: 3D Holographic Card ---
const TiltCard = ({ children, index }: { children: React.ReactNode, index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const rectRef = useRef<DOMRect | null>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        rectRef.current = e.currentTarget.getBoundingClientRect();
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!rectRef.current) {
            rectRef.current = e.currentTarget.getBoundingClientRect();
        }
        const rect = rectRef.current;
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
        rectRef.current = null;
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
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
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

  // Helper icons for Projects
  const getIcon = (i: number) => {
    const icons = [Cpu, Activity, Database, GitBranch];
    const Icon = icons[i % icons.length];
    return <Icon className="w-5 h-5 text-stone-400 group-hover:text-purple-900 transition-colors" strokeWidth={1.5} />;
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

        <div className="min-h-[400px]">
            <motion.div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
                {PROJECTS.map((project, index) => {
                    const subProject = (project as any).subProject;
                    return (
                        <div key={t(project.title)} className="flex flex-col gap-6">
                            <TiltCard index={index}>
                                <a 
                                    href={project.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block h-full"
                                >
                                    <div className="bg-white border border-stone-200 h-[520px] flex flex-col justify-between relative transition-all duration-500 hover:border-purple-900/30 hover:shadow-2xl shadow-stone-200/50 rounded-lg transform-style-3d cursor-pointer overflow-hidden">
                                        
                                        {/* Tech Corner Brackets */}
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-stone-400 group-hover:border-purple-900/50 transition-colors" />
                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-stone-400 group-hover:border-purple-900/50 transition-colors" />
                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-stone-400 group-hover:border-purple-900/50 transition-colors" />
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-stone-400 group-hover:border-purple-900/50 transition-colors" />

                                        {'image' in project && project.image && (
                                            <div
                                                className="relative z-10 h-36 overflow-hidden border-b border-stone-200 bg-stone-100"
                                                style={{ transform: "translateZ(12px)" }}
                                            >
                                                <img 
                                                    src={project.image} 
                                                    alt={`${t(project.title)} preview`}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                                                <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-widest text-white/85">
                                                    {project.category}
                                                </span>
                                            </div>
                                        )}

                                        {/* Card Content (Lifted slightly in Z-space) */}
                                        <div className="relative z-10 p-5 flex-1" style={{ transform: "translateZ(20px)" }}>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-mono text-[10px] font-bold text-stone-400 border border-stone-200 px-1 rounded">
                                                        SYS-{index}
                                                    </span>
                                                    {getIcon(index)}
                                                </div>
                                                <ArrowUpRight className="w-5 h-5 text-stone-300 group-hover:text-obsidian group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                                            </div>
                                            
                                            <h4 className="font-serif text-xl leading-tight text-obsidian mb-2 group-hover:text-purple-900 transition-colors">
                                                {t(project.title)}
                                            </h4>
                                            
                                            <p className="font-sans text-[9px] font-bold tracking-widest text-stone-500 uppercase mb-3 min-h-[28px]">
                                                {t(project.subtitle)}
                                            </p>
                                            
                                            <p className="font-sans text-xs text-stone-600 leading-relaxed line-clamp-5">
                                                {t(project.description)}
                                            </p>
                                        </div>

                                        {/* Tags (Lifted less in Z-space) */}
                                        <div className="relative z-10 p-5 pt-4 mt-0 border-t border-stone-100/50 flex flex-wrap gap-1.5 min-h-[86px]" style={{ transform: "translateZ(10px)" }}>
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="text-[9px] font-mono text-stone-400 bg-stone-50 px-1.5 py-0.5 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            </TiltCard>

                            {subProject && (
                                <>
                                    {/* Visual Connector */}
                                    <div className="flex flex-col items-center -my-3 relative z-20">
                                        <div className="w-[1.5px] h-4 bg-gradient-to-b from-purple-900/30 to-purple-900/60 border-dashed border-l border-purple-900/40" />
                                        <div className="bg-white text-purple-950 font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-purple-900/20 shadow-sm flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-900 animate-pulse" />
                                            {t({ en: "DATA SOURCE", pt: "FONTE DE DADOS" })}
                                        </div>
                                        <div className="w-[1.5px] h-4 bg-gradient-to-b from-purple-900/60 to-purple-900/30 border-dashed border-l border-purple-900/40" />
                                    </div>
                                    
                                    {/* Simpler connected card */}
                                    {subProject.url ? (
                                        <a 
                                            href={subProject.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="block bg-white/75 backdrop-blur-sm border border-stone-200/80 rounded-lg p-4 relative transition-all duration-300 hover:border-purple-900/30 hover:bg-white hover:shadow-xl group cursor-pointer"
                                        >
                                            {/* Tech Corner Brackets */}
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-stone-300 group-hover:border-purple-900/30 transition-colors" />
                                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-stone-300 group-hover:border-purple-900/30 transition-colors" />
                                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-stone-300 group-hover:border-purple-900/30 transition-colors" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-stone-300 group-hover:border-purple-900/30 transition-colors" />
                                            
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-mono text-[10px] font-bold text-stone-400 border border-stone-200 px-1 rounded">
                                                        {subProject.code}
                                                    </span>
                                                    <Database className="w-4 h-4 text-stone-400 group-hover:text-purple-900 transition-colors" />
                                                </div>
                                                <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-obsidian group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                            </div>
                                            
                                            <h4 className="font-serif text-base leading-tight text-obsidian mb-1 group-hover:text-purple-900 transition-colors">
                                                {t(subProject.title)}
                                            </h4>
                                            
                                            <p className="font-sans text-[8px] font-bold tracking-widest text-stone-500 uppercase mb-2">
                                                {t(subProject.subtitle)}
                                            </p>
                                            
                                            <p className="font-sans text-[11px] text-stone-600 leading-relaxed mb-3 line-clamp-4">
                                                {t(subProject.description)}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-1.5">
                                                {subProject.tags.map((tag: string, i: number) => (
                                                    <span key={i} className="text-[8px] font-mono text-stone-400 bg-stone-50 px-1.5 py-0.5 rounded border border-stone-100">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="bg-white/75 backdrop-blur-sm border border-stone-200/80 rounded-lg p-6 relative transition-all duration-300 hover:border-purple-900/30 hover:bg-white hover:shadow-xl group">
                                            {/* Tech Corner Brackets */}
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-stone-300 group-hover:border-purple-900/30 transition-colors" />
                                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-stone-300 group-hover:border-purple-900/30 transition-colors" />
                                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-stone-300 group-hover:border-purple-900/30 transition-colors" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-stone-300 group-hover:border-purple-900/30 transition-colors" />
                                            
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-mono text-[10px] font-bold text-stone-400 border border-stone-200 px-1 rounded">
                                                        {subProject.code}
                                                    </span>
                                                    <Database className="w-4 h-4 text-stone-400 group-hover:text-purple-900 transition-colors" />
                                                </div>
                                            </div>
                                            
                                            <h4 className="font-serif text-lg text-obsidian mb-1 group-hover:text-purple-900 transition-colors">
                                                {t(subProject.title)}
                                            </h4>
                                            
                                            <p className="font-sans text-[9px] font-bold tracking-widest text-stone-500 uppercase mb-3">
                                                {t(subProject.subtitle)}
                                            </p>
                                            
                                            <p className="font-sans text-xs text-stone-600 leading-relaxed mb-4">
                                                {t(subProject.description)}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-1.5">
                                                {subProject.tags.map((tag: string, i: number) => (
                                                    <span key={i} className="text-[9px] font-mono text-stone-400 bg-stone-50 px-1.5 py-0.5 rounded border border-stone-100">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}
            </motion.div>
        </div>

        {/* Subsection: Generative AI & LLMs */}
        <div className="mt-24 pt-16 border-t border-stone-200/50">
          <div className="mb-10">
             <span className="font-mono text-xs text-purple-900/60 mb-2 block">{t({ en: "02.1 / LAB", pt: "02.1 / LAB" })}</span>
             <h4 className="font-serif text-2xl md:text-3xl text-obsidian italic">
               {t({ en: "Generative AI & LLM Systems", pt: "Sistemas de IA Generativa & LLM" })}
             </h4>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
             {GENAI_PROJECTS.map((project, index) => {
                 const hasImage = 'image' in project && project.image;
                 return (
                     <TiltCard key={t(project.title)} index={index}>
                         <a 
                             href={project.url} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="block h-full"
                         >
                             <div className="bg-white border border-stone-200 h-[520px] flex flex-col justify-between relative transition-all duration-500 hover:border-purple-900/30 hover:shadow-2xl shadow-stone-200/50 rounded-lg transform-style-3d cursor-pointer overflow-hidden">
                                 
                                 {/* Tech Corner Brackets */}
                                 <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-stone-400 group-hover:border-purple-900/50 transition-colors" />
                                 <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-stone-400 group-hover:border-purple-900/50 transition-colors" />
                                 <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-stone-400 group-hover:border-purple-900/50 transition-colors" />
                                 <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-stone-400 group-hover:border-purple-900/50 transition-colors" />
                                 
                                 {hasImage && (
                                     <div 
                                         className="relative h-36 overflow-hidden border-b border-stone-200 bg-stone-100 w-full"
                                         style={{ 
                                             transform: "translateZ(12px)"
                                         }}
                                     >
                                         <img 
                                             src={project.image} 
                                             alt={`${t(project.title)} preview`}
                                             className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                         />
                                         <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                                         <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-widest text-white/85">
                                             {(project as any).category}
                                         </span>
                                     </div>
                                 )}

                                 <div className="relative z-10 p-5 flex-1" style={{ transform: "translateZ(20px)" }}>
                                     <div className="flex justify-between items-start mb-4">
                                         <div className="flex items-center gap-3">
                                             <span className="font-mono text-[10px] font-bold text-stone-400 border border-stone-200 px-1 rounded">
                                                 {project.code}
                                             </span>
                                             <Brain className="w-4 h-4 text-stone-400 group-hover:text-purple-900 transition-colors" />
                                         </div>
                                         <ArrowUpRight className="w-5 h-5 text-stone-300 group-hover:text-obsidian group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                                     </div>
                                     
                                     <h4 className="font-serif text-xl leading-tight text-obsidian mb-2 group-hover:text-purple-900 transition-colors">
                                         {t(project.title)}
                                     </h4>
                                     
                                     <p className="font-sans text-[9px] font-bold tracking-widest text-stone-500 uppercase mb-3 min-h-[28px]">
                                         {t(project.subtitle)}
                                     </p>
                                     
                                     <p className="font-sans text-xs text-stone-600 leading-relaxed line-clamp-5">
                                         {t(project.description)}
                                     </p>
                                 </div>
                                 
                                 <div className="relative z-10 p-5 pt-4 mt-0 border-t border-stone-100/50 flex flex-wrap gap-1.5 min-h-[86px]" style={{ transform: "translateZ(10px)" }}>
                                     {project.tags.map((tag: string, i: number) => (
                                         <span key={i} className="text-[9px] font-mono text-stone-400 bg-stone-50 px-1.5 py-0.5 rounded">
                                             {tag}
                                         </span>
                                     ))}
                                 </div>
                             </div>
                         </a>
                     </TiltCard>
                 );
             })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
