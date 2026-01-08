
import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE, UI_TEXT } from '../constants';
import { useLanguage } from './LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="scroll-mt-28 md:scroll-mt-32 py-32 px-6 md:px-12 lg:px-24 bg-obsidian text-ivory relative overflow-hidden">
        
        {/* Event Horizon Animation */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[400px] pointer-events-none">
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-[100%] bg-gradient-to-t from-purple-900/20 via-transparent to-transparent blur-3xl opacity-50"
             />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Starfield */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
            <svg width="100%" height="100%">
                <pattern id="stars" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="0.5" fill="white" />
                    <circle cx="50" cy="80" r="0.8" fill="white" />
                    <circle cx="80" cy="40" r="0.5" fill="white" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#stars)" />
            </svg>
        </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-stone-400 italic mb-6 text-xl"
        >
          {t(UI_TEXT.contact.signal)}
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-sans text-5xl md:text-7xl font-light mb-12 tracking-tight text-white glow-text"
          style={{ textShadow: "0 0 20px rgba(255,255,255,0.1)" }}
        >
          {t(UI_TEXT.contact.title)}
        </motion.h2>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-8"
        >
            <a href={`mailto:${PROFILE.contact.email}`} className="text-2xl md:text-3xl font-serif hover:text-stone-300 transition-colors border-b border-stone-700 hover:border-white pb-2">
                {PROFILE.contact.email}
            </a>

            <div className="flex gap-8 mt-12">
                {PROFILE.contact.social.map((social, idx) => (
                    <a 
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 text-stone-400 hover:text-white transition-colors group"
                    >
                        <div className="p-3 border border-stone-800 rounded-full group-hover:bg-white/10 transition-colors">
                            <social.icon className="w-5 h-5" />
                        </div>
                        <span className="uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                            {social.name}
                        </span>
                    </a>
                ))}
            </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-6 left-0 w-full text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
             <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
             <span className="text-[10px] text-stone-600 font-mono uppercase">{t(UI_TEXT.contact.system)}</span>
        </div>
        <p className="text-[10px] text-stone-600 uppercase tracking-widest">
            © {new Date().getFullYear()} {PROFILE.name}. {t(UI_TEXT.contact.rights)}
        </p>
      </div>
    </section>
  );
};

export default Contact;
