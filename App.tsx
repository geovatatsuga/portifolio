
import React from 'react';
import { LanguageProvider } from './components/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact';
import ScientificBackground from './components/ScientificBackground';
import Playground from './components/Playground';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <main className="bg-ivory selection:bg-stone-200 selection:text-obsidian min-h-screen relative overflow-x-hidden">
        <Navbar />
        
        {/* Scientific Grid Background (Global) */}
        <div 
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]"
          style={{ 
            backgroundImage: `
              linear-gradient(to right, #e7e5e4 1px, transparent 1px),
              linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
          }}
        />

        {/* Smooth scroll container */}
        <div className="flex flex-col relative z-10">
          <Hero />
          <About />
          
          {/* The Scientific Layer wraps Research -> Resume */}
          <ScientificBackground>
              <Projects />
              <Skills />
              <Resume />
              <Playground />
          </ScientificBackground>

          <Contact />
        </div>

        {/* Global Grainy Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[100] mix-blend-multiply" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      </main>
    </LanguageProvider>
  );
};

export default App;
