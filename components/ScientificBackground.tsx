import React from 'react';
import { motion } from 'framer-motion';

interface ScientificBackgroundProps {
  children: React.ReactNode;
}

const ScientificBackground: React.FC<ScientificBackgroundProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* --- Background Container --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* 1. Technical Grid Overlay - Softened */}
        <div 
            className="absolute inset-0 opacity-[0.05]" 
            style={{ 
                backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', 
                backgroundSize: '100px 100px' 
            }} 
        />

        {/* --- ELEMENTS (Softened Opacity) --- */}
        
        {/* PI Symbol */}
        <motion.div 
            className="absolute top-[10%] left-[5%] text-9xl font-serif text-stone-900 opacity-[0.07] select-none"
            animate={{ y: [0, 40, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
            π
        </motion.div>

        {/* Sigma */}
        <motion.div 
            className="absolute top-[40%] right-[5%] text-8xl font-serif text-purple-900 opacity-[0.07] select-none"
            animate={{ y: [0, -60, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
            Σ
        </motion.div>

        {/* Integral */}
        <motion.div 
            className="absolute bottom-[20%] left-[10%] font-serif text-3xl text-stone-600 opacity-[0.09] select-none whitespace-nowrap"
            animate={{ opacity: [0.09, 0.03, 0.09] }}
            transition={{ duration: 8, repeat: Infinity }}
        >
            ∫ e^x dx = e^x + C
        </motion.div>

        {/* Neural Net */}
        <div className="absolute top-[25%] right-[-10%] w-[600px] h-[600px] opacity-[0.08] text-stone-800">
            <svg viewBox="0 0 400 400" className="w-full h-full">
                <motion.g stroke="currentColor" strokeWidth="1.5">
                    <line x1="50" y1="100" x2="200" y2="50" />
                    <line x1="50" y1="100" x2="200" y2="200" />
                    <line x1="50" y1="300" x2="200" y2="200" />
                    <line x1="50" y1="300" x2="200" y2="350" />
                    <line x1="200" y1="50" x2="350" y2="200" />
                    <line x1="200" y1="200" x2="350" y2="200" />
                    <line x1="200" y1="350" x2="350" y2="200" />
                </motion.g>
                {[
                    {cx:50, cy:100}, {cx:50, cy:300},
                    {cx:200, cy:50}, {cx:200, cy:200}, {cx:200, cy:350},
                    {cx:350, cy:200}
                ].map((node, i) => (
                    <motion.circle 
                        key={i} 
                        cx={node.cx} 
                        cy={node.cy} 
                        r="8" 
                        fill="currentColor"
                        animate={{ r: [8, 12, 8] }}
                        transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                    />
                ))}
            </svg>
        </div>

        {/* Icosahedron */}
        <motion.div 
            className="absolute bottom-[10%] right-[15%] w-64 h-64 opacity-[0.08] text-stone-900"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="1">
                <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
                <line x1="10" y1="25" x2="90" y2="75" />
                <line x1="90" y1="25" x2="10" y2="75" />
                <line x1="50" y1="5" x2="50" y2="95" />
            </svg>
        </motion.div>

        {/* Golden Ratio */}
        <motion.div 
            className="absolute top-[15%] left-[20%] w-96 h-96 opacity-[0.06]"
            style={{ transformOrigin: "bottom left" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity }}
        >
             <svg viewBox="0 0 100 100" className="w-full h-full stroke-stone-900 fill-none" strokeWidth="0.8">
                <path d="M0,100 A100,100 0 0,1 100,0" />
                <path d="M100,0 A61.8,61.8 0 0,0 38.2,61.8" />
                <path d="M38.2,61.8 A38.2,38.2 0 0,0 76.4,100" />
             </svg>
        </motion.div>

        {/* Euler's Identity */}
        <motion.div 
            className="absolute top-[60%] left-[8%] font-serif text-4xl text-stone-800 opacity-[0.09] select-none italic"
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
            e<sup>iπ</sup> + 1 = 0
        </motion.div>

        {/* Floating Binary Stream (Left Side) */}
        <div className="absolute top-[20%] left-[2%] font-mono text-sm text-stone-600 opacity-[0.1] leading-none select-none writing-mode-vertical">
            {Array.from({ length: 25 }).map((_, i) => (
                <motion.div 
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                >
                    {Math.random() > 0.5 ? '1' : '0'}
                </motion.div>
            ))}
        </div>

        {/* Floating Binary Stream (Right Side) */}
        <div className="absolute top-[50%] right-[2%] font-mono text-sm text-stone-600 opacity-[0.1] leading-none select-none">
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div 
                    key={i}
                    animate={{ x: [0, -15, 0] }}
                    transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                    className="my-1.5"
                >
                    01001101 01100001
                </motion.div>
            ))}
        </div>

        {/* Physics: E=mc2 */}
        <motion.div 
             className="absolute bottom-[40%] right-[30%] font-serif text-5xl text-purple-900 opacity-[0.07] select-none"
             animate={{ scale: [1, 1.2, 1], rotate: [-10, 0, -10] }}
             transition={{ duration: 12, repeat: Infinity }}
        >
            E = mc²
        </motion.div>

        {/* Abstract Data Cloud */}
        <div className="absolute top-[80%] left-[40%] w-64 h-32 opacity-[0.08] font-mono text-sm text-stone-800 flex flex-wrap content-center justify-center gap-3">
            {Array.from({ length: 15 }).map((_, i) => (
                <motion.span 
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 4, delay: Math.random() * 2, repeat: Infinity }}
                >
                    {(Math.random() * 100).toFixed(2)}
                </motion.span>
            ))}
        </div>

        {/* Rotating Tesseract */}
        <motion.div 
             className="absolute top-[5%] right-[30%] w-48 h-48 opacity-[0.08] text-stone-900"
             animate={{ rotate: -360 }}
             transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="1">
                <rect x="25" y="25" width="50" height="50" />
                <rect x="15" y="15" width="70" height="70" strokeDasharray="4 2"/>
                <line x1="25" y1="25" x2="15" y2="15" />
                <line x1="75" y1="25" x2="85" y2="15" />
                <line x1="25" y1="75" x2="15" y2="85" />
                <line x1="75" y1="75" x2="85" y2="85" />
            </svg>
        </motion.div>

        {/* Sine Wave */}
        <div className="absolute bottom-[5%] left-[30%] w-80 h-32 opacity-[0.08]">
             <svg viewBox="0 0 200 100" className="w-full h-full stroke-purple-900 fill-none" strokeWidth="2">
                 <motion.path 
                    d="M0,50 Q25,0 50,50 T100,50 T150,50 T200,50" 
                    animate={{ d: [
                        "M0,50 Q25,0 50,50 T100,50 T150,50 T200,50",
                        "M0,50 Q25,100 50,50 T100,50 T150,50 T200,50",
                        "M0,50 Q25,0 50,50 T100,50 T150,50 T200,50"
                    ]}}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                 />
             </svg>
        </div>

        {/* Sigmoid Formula */}
        <motion.div 
             className="absolute top-[35%] left-[45%] font-serif text-2xl text-stone-800 opacity-[0.09] select-none"
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 6, repeat: Infinity }}
        >
            P(y=1|x) = 1 / (1 + e^-z)
        </motion.div>

        {/* Matrix Brackets */}
        <div className="absolute top-[15%] right-[50%] opacity-[0.06] font-serif text-8xl text-stone-600">
             [ ]
        </div>

        {/* Schrödinger Equation */}
        <motion.div 
            className="absolute bottom-[60%] left-[20%] font-serif text-3xl text-stone-900 opacity-[0.09] select-none"
            animate={{ opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 10, repeat: Infinity }}
        >
            iħ <span className="italic">∂Ψ/∂t</span> = ĤΨ
        </motion.div>

        {/* DNA Helix Representation */}
        <div className="absolute top-[60%] right-[15%] w-20 h-64 opacity-[0.08]">
            <svg viewBox="0 0 100 400" className="w-full h-full stroke-stone-800 fill-none" strokeWidth="2">
                 <motion.path 
                    d="M30,0 Q70,50 30,100 T30,200 T30,300 T30,400"
                    animate={{ d: ["M30,0 Q70,50 30,100 T30,200 T30,300 T30,400", "M70,0 Q30,50 70,100 T70,200 T70,300 T70,400", "M30,0 Q70,50 30,100 T30,200 T30,300 T30,400"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                 />
                 <motion.path 
                    d="M70,0 Q30,50 70,100 T70,200 T70,300 T70,400"
                    animate={{ d: ["M70,0 Q30,50 70,100 T70,200 T70,300 T70,400", "M30,0 Q70,50 30,100 T30,200 T30,300 T30,400", "M70,0 Q30,50 70,100 T70,200 T70,300 T70,400"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                 />
                 {/* Cross links */}
                 {Array.from({length: 8}).map((_, i) => (
                    <motion.line 
                        key={i} 
                        x1="30" y1={50 * i + 25} x2="70" y2={50 * i + 25} 
                        strokeWidth="1" 
                        strokeDasharray="4 2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    />
                 ))}
            </svg>
        </div>

        {/* Benzene / Hexagonal Grid */}
        <div className="absolute bottom-[15%] right-[5%] w-48 h-48 opacity-[0.06] text-purple-900">
             <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="1">
                <path d="M25,25 L10,50 L25,75 L50,75 L65,50 L50,25 Z" />
                <path d="M65,50 L80,25 L95,50 L80,75 L65,50" />
                <path d="M50,75 L65,100 L50,125" /> 
                <circle cx="37.5" cy="50" r="15" strokeDasharray="4 2" />
             </svg>
        </div>

        {/* Planck's Constant */}
        <motion.div 
            className="absolute top-[5%] left-[45%] font-serif text-2xl text-stone-600 opacity-[0.09] select-none"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
        >
            h = 6.626 × 10<sup>-34</sup> J⋅s
        </motion.div>

        {/* Infinity Symbol */}
        <motion.div 
            className="absolute bottom-[30%] left-[50%] -translate-x-1/2 text-8xl font-sans text-stone-300 opacity-[0.09]"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
        >
            ∞
        </motion.div>

      </div>

      {/* Content Rendered Here */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ScientificBackground;