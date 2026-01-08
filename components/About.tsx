
import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE, UI_TEXT } from '../constants';
import { useLanguage } from './LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-white/40 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-12 gap-12 lg:gap-24"
        >
           {/* Left Column: Title & Graphic */}
           <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                  <span className="font-mono text-xs text-purple-900/60 mb-4 block">{t(UI_TEXT.about.section)}</span>
                  <h3 className="font-serif text-4xl text-obsidian leading-none mb-8">
                    {t(UI_TEXT.about.title)}<br/><span className="italic text-stone-500">{t(UI_TEXT.about.subtitle)}</span>
                  </h3>
              </div>

              {/* Abstract Wave Visualization */}
              <div className="hidden md:block h-32 w-full opacity-40">
                <svg viewBox="0 0 200 100" className="w-full h-full stroke-stone-800" fill="none" strokeWidth="0.5">
                   <motion.path 
                     d="M0,50 Q50,0 100,50 T200,50" 
                     initial={{ pathLength: 0 }} 
                     whileInView={{ pathLength: 1 }} 
                     transition={{ duration: 2, ease: "easeInOut" }}
                   />
                   <motion.path 
                     d="M0,50 Q50,100 100,50 T200,50" 
                     initial={{ pathLength: 0 }} 
                     whileInView={{ pathLength: 1 }} 
                     transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                   />
                    <motion.path 
                     d="M0,50 Q25,25 50,50 T100,50 T150,50 T200,50" 
                     initial={{ pathLength: 0 }} 
                     whileInView={{ pathLength: 1 }} 
                     transition={{ duration: 3, delay: 0.2, ease: "easeInOut" }}
                     className="stroke-purple-900 opacity-50"
                   />
                </svg>
                <p className="font-mono text-[10px] text-stone-400 mt-2 text-center">FIG 1.0: CURIOSITY WAVEFORM</p>
              </div>
           </div>
          
           {/* Right Column: Content */}
           <div className="md:col-span-8">
              <p className="font-serif text-2xl md:text-3xl leading-relaxed text-stone-800 whitespace-pre-line mb-12">
                {t(PROFILE.about)}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-stone-200 pt-8">
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-2">{t(UI_TEXT.about.focus)}</h4>
                  <p className="font-serif text-lg text-stone-800">Machine Learning &<br/>Predictive Analytics</p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-2">{t(UI_TEXT.about.based)}</h4>
                  <p className="font-serif text-lg text-stone-800">Paraíba, Brazil<br/><span className="text-sm italic text-stone-500 text-xs">{t(UI_TEXT.about.remote)}</span></p>
                </div>
                <div>
                   <h4 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-2">{t(UI_TEXT.about.exp)}</h4>
                   <p className="font-serif text-lg text-stone-800">{t(UI_TEXT.about.years)}<br/><span className="text-sm italic text-stone-500 text-xs">Across Industries</span></p>
                </div>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
