
import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE, EDUCATION, UI_TEXT } from '../constants';
import { Download, CircleDot } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Resume: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="resume" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      
      {/* Background Circuit lines */}
      <svg className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02] z-0" xmlns="http://www.w3.org/2000/svg">
         <path d="M50,0 V1000" stroke="black" strokeWidth="1" strokeDasharray="10,10" />
         <path d="M100,0 V1000" stroke="black" strokeWidth="1" strokeDasharray="20,20" />
      </svg>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-between items-end mb-16 border-t border-stone-200 pt-4">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-400">
            {t(UI_TEXT.resume.title)}
          </h3>
          <button className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-obsidian hover:text-purple-900 transition-colors border border-stone-200 px-4 py-2 rounded-full hover:bg-stone-50">
            <Download className="w-4 h-4" />
            {t(UI_TEXT.resume.download)}
          </button>
        </div>

        <div className="grid md:grid-cols-[1fr_3fr] gap-12">
            
            {/* Education Column */}
            <div className="space-y-12">
                <h4 className="font-mono text-sm text-purple-900/60 uppercase tracking-widest mb-6">{t(UI_TEXT.resume.education)}</h4>
                {EDUCATION.map((edu, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative pl-6 border-l border-stone-300"
                    >
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-stone-100 border border-stone-400 rounded-full" />
                        <h5 className="font-serif text-xl text-obsidian">{edu.institution}</h5>
                        <p className="font-sans text-sm text-stone-600 mt-1">{t(edu.degree)}</p>
                        <p className="font-mono text-[10px] text-stone-400 mt-2">{t(edu.period)}</p>
                    </motion.div>
                ))}
            </div>

            {/* Experience Column (Timeline) */}
            <div>
                 <h4 className="font-mono text-sm text-purple-900/60 uppercase tracking-widest mb-10">{t(UI_TEXT.resume.experience)}</h4>
                 
                 <div className="relative">
                    {/* The Circuit Line */}
                    <div className="absolute left-[11px] top-2 bottom-0 w-px bg-stone-200"></div>

                    <div className="space-y-16">
                        {EXPERIENCE.map((exp, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="relative pl-12"
                            >
                                {/* Node on the timeline */}
                                <div className="absolute left-0 top-1 w-6 h-6 flex items-center justify-center bg-ivory z-10">
                                    <div className="w-2.5 h-2.5 bg-obsidian rounded-full ring-4 ring-stone-100" />
                                </div>

                                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                                    <h5 className="font-serif text-2xl text-obsidian">{exp.company}</h5>
                                    <span className="font-mono text-[10px] text-stone-400 border border-stone-200 px-2 py-0.5 rounded">{exp.period}</span>
                                </div>
                                <p className="font-sans font-medium text-stone-600 mb-4">{t(exp.role)}</p>
                                
                                <ul className="space-y-2">
                                    {exp.description.map((desc, i) => (
                                    <li key={i} className="font-sans text-sm text-stone-500 leading-relaxed flex items-start gap-3">
                                        <span className="mt-1.5 w-1 h-1 bg-stone-300 rounded-full shrink-0" />
                                        {t(desc)}
                                    </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                 </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Resume;
