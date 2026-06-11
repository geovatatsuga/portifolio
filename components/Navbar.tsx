
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { UI_TEXT } from '../constants';

const USFlag: React.FC = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-xs inline-block" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="12" fill="#3C3B6E" />
    <path d="M0 1H18M0 3H18M0 5H18M0 7H18M0 9H18M0 11H18" stroke="#B22234" strokeWidth="1" />
    <path d="M0 0.5H18M0 2.5H18M0 4.5H18M0 6.5H18M0 8.5H18M0 10.5H18M0 12.5H18" stroke="#FFFFFF" strokeWidth="1" />
    <rect width="8" height="6" fill="#3C3B6E" />
    <circle cx="2" cy="1.5" r="0.4" fill="white" />
    <circle cx="6" cy="1.5" r="0.4" fill="white" />
    <circle cx="4" cy="3" r="0.4" fill="white" />
    <circle cx="2" cy="4.5" r="0.4" fill="white" />
    <circle cx="6" cy="4.5" r="0.4" fill="white" />
  </svg>
);

const BRFlag: React.FC = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-xs inline-block" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="12" fill="#009739" />
    <polygon points="9,1.5 16.5,6 9,10.5 1.5,6" fill="#FEDF00" />
    <circle cx="9" cy="6" r="2.5" fill="#2D3866" />
    <path d="M7 6.3C8 6.3 9.2 5.9 10.8 5.1" stroke="white" strokeWidth="0.4" fill="none" />
  </svg>
);

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
          className="flex items-center gap-2 font-mono text-[10px] md:text-xs font-bold text-obsidian hover:text-purple-900 transition-colors"
        >
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1 ${language === 'en' ? 'text-obsidian' : 'text-stone-400'}`}>
                <USFlag /> EN
              </span>
              <span className="text-stone-300">/</span>
              <span className={`flex items-center gap-1 ${language === 'pt' ? 'text-obsidian' : 'text-stone-400'}`}>
                <BRFlag /> PT
              </span>
            </div>
        </button>

      </div>
    </motion.nav>
  );
};

export default Navbar;
