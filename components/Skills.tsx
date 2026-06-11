
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS, UI_TEXT } from '../constants';
import { useLanguage } from './LanguageContext';

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const cardVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
    hover: { y: -8, scale: 1.02, transition: { duration: 0.25 } }
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 6, clipPath: 'inset(0 0 100% 0)' },
    show: { opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)', transition: { duration: 0.35, ease: 'easeOut' } }
  };

  const statusVariants = {
    idle: { scale: 1, opacity: 0.6 },
    hover: { scale: 1.4, opacity: 1, transition: { duration: 0.6, repeat: Infinity, repeatType: 'mirror' } }
  };
  
  // Helper to render background visuals based on category
  const getCategoryVisual = (category: string) => {
    // Note: Checking English category names since mapping key logic might depend on it, 
    // but better to check index or just simple strings if constant
    if (category.includes('Languages') || category.includes('Linguagens')) {
        return (
          <div className="absolute right-4 bottom-4 opacity-[0.07] pointer-events-none overflow-hidden">
             <motion.div 
               className="font-mono text-8xl font-bold leading-none select-none"
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 3, repeat: Infinity }}
             >
                `{ }`
             </motion.div>
          </div>
        );
    }
    if (category.includes('Analysis') || category.includes('Análise')) {
        return (
          <div className="absolute right-4 bottom-4 w-24 h-16 opacity-10 pointer-events-none flex items-end justify-end gap-1">
             {[30, 60, 40, 80, 50].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-3 bg-stone-900"
                  initial={{ height: "10%" }}
                  animate={{ height: `${h}%` }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.2, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut" 
                  }}
                />
             ))}
          </div>
        );
    }
    if (category.includes('Business Intelligence') || category.includes('Business Intelligence')) {
        return (
          <div className="absolute right-4 bottom-4 w-24 h-16 opacity-10 pointer-events-none flex items-end justify-end gap-1">
             {[40, 70, 50, 90, 60].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-3 bg-purple-900"
                  initial={{ height: "10%" }}
                  animate={{ height: `${h}%` }}
                  transition={{ 
                    duration: 2.5, 
                    delay: i * 0.15, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut" 
                  }}
                />
             ))}
          </div>
        );
    }
    if (category.includes('Machine') || category.includes('Learning')) {
        return (
           <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                 <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "50px 50px" }}
                 >
                    <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 2" />
                    <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="20" r="3" fill="currentColor" />
                    <circle cx="80" cy="50" r="3" fill="currentColor" />
                    <circle cx="50" cy="80" r="3" fill="currentColor" />
                    <circle cx="20" cy="50" r="3" fill="currentColor" />
                 </motion.g>
              </svg>
           </div>
        );
    }
    if (category.includes('Engineering') || category.includes('Engenharia')) {
        return (
            <div className="absolute left-0 bottom-8 w-full h-4 opacity-10 pointer-events-none overflow-hidden">
                <svg width="100%" height="100%">
                    <motion.line 
                        x1="0" y1="50%" x2="100%" y2="50%" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        strokeDasharray="10 20"
                        animate={{ strokeDashoffset: -30 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                </svg>
            </div>
        );
    }
    // Tools / Ferramentas
    return (
         <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.15] pointer-events-none text-stone-800">
             <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             >
                <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Outer Gear */}
                    <circle cx="50" cy="50" r="40" strokeDasharray="8 4" />
                    <path d="M50 10 L50 20 M50 80 L50 90 M10 50 L20 50 M80 50 L90 50" strokeWidth="2" />
                    <path d="M22 22 L28 28 M72 72 L78 78 M22 78 L28 72 M72 28 L78 22" strokeWidth="2" />
                   
                    {/* Inner Hexagon */}
                    <path d="M50 35 L63 42.5 L63 57.5 L50 65 L37 57.5 L37 42.5 Z" strokeWidth="1" />
                    <circle cx="50" cy="50" r="5" fill="currentColor" />
                </svg>
             </motion.div>
         </div>
     )
  }

  return (
    <section id="skills" className="scroll-mt-28 md:scroll-mt-32 py-32 px-6 md:px-12 lg:px-24 bg-stone-50 relative overflow-hidden">
      
      {/* Abstract Data Flow Lines Background */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="mb-16 flex items-center justify-between border-b border-stone-300 pb-4"
        >
          <div className="flex flex-col">
            <span className="font-mono text-xs text-purple-900/60 mb-1">{t(UI_TEXT.skills.section)}</span>
            <h3 className="font-serif text-3xl italic text-stone-800">
                {t(UI_TEXT.skills.title)}
            </h3>
          </div>
          <div className="hidden md:flex gap-4 font-mono text-[10px] text-stone-400">
             <span>SYS.STATUS: ONLINE</span>
             <span>V.2.5.0</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skillGroup, index) => (
            <motion.div
              key={index}
              variants={prefersReducedMotion ? undefined : cardVariants}
              initial={prefersReducedMotion ? undefined : 'hidden'}
              whileInView={prefersReducedMotion ? undefined : 'show'}
              whileHover={prefersReducedMotion ? undefined : 'hover'}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-stone-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-purple-900/20 relative overflow-hidden group will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Category-Specific Animated Background */}
              {getCategoryVisual(t(skillGroup.category))}

              {/* Status Light */}
              <div className="absolute top-4 right-4 flex gap-1 z-20">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-500/50"
                  variants={prefersReducedMotion ? undefined : statusVariants}
                  initial={prefersReducedMotion ? undefined : 'idle'}
                  animate={prefersReducedMotion ? undefined : undefined}
                />
                <div className="w-1.5 h-1.5 rounded-full bg-stone-200" />
              </div>

              <h4 className="font-mono text-xs font-bold text-stone-400 uppercase tracking-widest mb-6 relative z-10 group-hover:text-purple-900/60 transition-colors">
                {t(skillGroup.category)}
              </h4>

              <motion.ul className="space-y-3 relative z-10" variants={prefersReducedMotion ? undefined : {}}
                initial={prefersReducedMotion ? undefined : 'hidden'}
                whileInView={prefersReducedMotion ? undefined : 'show'}
                viewport={{ once: true }}
              >
                {skillGroup.items.map((item, i) => (
                  <motion.li key={i} variants={prefersReducedMotion ? undefined : listItemVariants} className="font-sans text-sm text-stone-700 flex items-center justify-between border-b border-stone-100 pb-2 last:border-0 last:pb-0">
                    <span>{item}</span>
                    <motion.span className="text-[10px] text-stone-300 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        0{i+1}
                    </motion.span>
                  </motion.li>
                ))}
              </motion.ul>
              
              {/* Decorative Bar Code-ish thing */}
              <div className="absolute bottom-0 left-0 w-full h-0.5">
                <motion.div className="h-0.5 bg-gradient-to-r from-stone-200 via-purple-900/40 to-stone-200"
                  initial={{ width: '0%' }}
                  whileHover={prefersReducedMotion ? {} : { width: '100%' }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
