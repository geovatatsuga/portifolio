
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { UI_TEXT } from '../constants';
import { Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t(UI_TEXT.nav.about), href: '#about' },
    { name: t(UI_TEXT.nav.work), href: '#projects' },
    { name: t(UI_TEXT.nav.skills), href: '#skills' },
    { name: t(UI_TEXT.nav.lab), href: '#lab' },
    { name: t(UI_TEXT.nav.resume), href: '#resume' },
    { name: t(UI_TEXT.nav.contact), href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6 pointer-events-none`}
    >
      <div className={`
        pointer-events-auto
        flex items-center gap-4 md:gap-8 px-6 py-3 md:px-8 md:py-4 rounded-full
        transition-all duration-500
        ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border border-stone-100' : 'bg-transparent'}
      `}>
        {/* Links */}
        <div className="flex items-center gap-4 md:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-stone-500 hover:text-obsidian transition-colors"
              >
                {link.name}
              </a>
            ))}
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-stone-300 mx-2" />

        {/* Language Switcher */}
        <button 
          onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
          className="flex items-center gap-2 font-mono text-xs font-bold text-obsidian hover:text-purple-900 transition-colors"
        >
            <Globe className="w-3 h-3 text-stone-400" />
            <span className={language === 'en' ? 'text-obsidian' : 'text-stone-400'}>EN</span>
            <span className="text-stone-300">/</span>
            <span className={language === 'pt' ? 'text-obsidian' : 'text-stone-400'}>PT</span>
        </button>

      </div>
    </motion.nav>
  );
};

export default Navbar;
