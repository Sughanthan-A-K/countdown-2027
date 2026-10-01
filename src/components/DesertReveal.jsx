import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CoconutTrees = () => (
  <div className="flex items-end">
    <motion.svg viewBox="0 0 50 60" width="35" height="45" animate={{ rotateZ: [-3, 5, -3] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} style={{ originY: 1, originX: 0.5 }}>
       <path d="M25 60 Q35 30 20 10" stroke="black" strokeWidth="4" fill="none" />
       <path d="M20 10 C10 10, 0 20, 5 25 M20 10 C25 0, 35 5, 40 15 M20 10 C15 -5, 30 -5, 25 5 M20 10 C35 15, 35 30, 25 30 M20 10 C5 10, 0 0, 10 5" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" />
    </motion.svg>
    <motion.svg viewBox="0 0 50 60" width="25" height="35" className="-ml-4" animate={{ rotateZ: [-5, 3, -5] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }} style={{ originY: 1, originX: 0.5 }}>
       <path d="M25 60 Q15 30 30 10" stroke="black" strokeWidth="4" fill="none" />
       <path d="M30 10 C20 10, 10 20, 15 25 M30 10 C35 0, 45 5, 50 15 M30 10 C25 -5, 40 -5, 35 5 M30 10 C45 15, 45 30, 35 30 M30 10 C15 10, 10 0, 20 5" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" />
    </motion.svg>
  </div>
);

const Egypt = () => (
  <svg viewBox="0 0 80 50" width="70" height="40">
     <path d="M10 50 L35 15 L60 50 Z" fill="black" />
     <path d="M30 50 L45 25 L75 50 Z" fill="black" />
     <path d="M60 50 L60 35 Q65 30 75 35 L75 50 Z" fill="black" />
     <circle cx="70" cy="32" r="3" fill="black" />
  </svg>
);

const TreasureBox = ({ isOpen }) => (
  <svg viewBox="0 0 50 40" width="45" height="35">
     <rect x="5" y="20" width="40" height="20" fill="black" rx="2" />
     <motion.path d="M5 20 C 5 5, 45 5, 45 20 Z" fill="black"
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpen ? -60 : 0 }}
        style={{ originX: 0, originY: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
     />
     <rect x="20" y="18" width="10" height="6" fill="#f7d13d" rx="1" />
  </svg>
);

export default function DesertReveal({ target }) {
  const [boxOpen, setBoxOpen] = useState(false);

  useEffect(() => {
     const t = setTimeout(() => setBoxOpen(true), 4200);
     return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full max-w-sm flex flex-col items-center relative mt-2 sm:mt-4 h-[350px]">
      {/* 1) Completed Level Slots (L E T) */}
      <div className="flex gap-2 relative z-10 mb-4">
         {['L', 'E', 'T'].map((char, i) => (
            <div key={i} className="w-10 h-12 flex items-center justify-center font-black text-2xl rounded-lg border-2 border-black bg-black text-[#f7d13d] shadow-md">
               {char}
            </div>
         ))}
      </div>

      {/* 2) The Winding Map & Path */}
      <div className="relative w-full h-[300px] mt-[-20px]">
         <svg viewBox="0 0 300 350" className="w-full h-full absolute inset-0 z-0 overflow-visible">
            <motion.path
               d="M 150 10 C 150 60, 50 60, 50 120 C 50 190, 250 190, 250 250 C 250 310, 50 310, 50 340 C 50 360, 150 360, 150 360"
               stroke="black"
               strokeWidth="4"
               strokeDasharray="8 8"
               strokeLinecap="round"
               fill="transparent"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 3.5, delay: 1.0, ease: "easeInOut" }}
            />
         </svg>

         {/* Landmarks */}
         {/* Trees on the Left */}
         <motion.div 
            className="absolute top-[60px] left-[20px]"
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.0, type: "spring", bounce: 0.6 }}
         >
            <CoconutTrees />
         </motion.div>

         {/* Egypt on the Right */}
         <motion.div 
            className="absolute top-[170px] right-[20px]"
            initial={{ scale: 0, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ delay: 2.8, type: "spring", bounce: 0.6 }}
         >
            <Egypt />
         </motion.div>

         {/* Treasure Box on the Left */}
         <motion.div 
            className="absolute top-[280px] left-[30px]"
            initial={{ scale: 0, opacity: 0, rotate: -20 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ delay: 3.8, type: "spring", bounce: 0.6 }}
         >
            <TreasureBox isOpen={boxOpen} />
         </motion.div>

         {/* 3) Destination: Level 2 Pops Out */}
         <motion.div 
            className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            initial={{ y: 80, scale: 0, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 4.8, type: "spring", bounce: 0.5, duration: 1 }}
         >
            {/* Dirt/Sand burst effect */}
            <motion.div
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 3] }}
               transition={{ delay: 4.8, duration: 0.8, ease: "easeOut" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[radial-gradient(circle,rgba(0,0,0,0.4)_0%,transparent_60%)] rounded-full pointer-events-none -z-10"
            />
            <span className="font-bold text-sm sm:text-lg text-black uppercase tracking-widest drop-shadow-md">LEVEL 2</span>
            <div className="flex gap-2">
               {target.map((char, i) => (
                  <div key={i} className="w-12 h-14 flex items-center justify-center font-black text-3xl rounded-lg border-2 border-black border-dashed bg-transparent text-transparent shadow-inner">
                     ?
                  </div>
               ))}
            </div>
         </motion.div>
      </div>
    </div>
  );
}
