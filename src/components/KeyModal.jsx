import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoldenKey from './GoldenKey';

export default function KeyModal({ isOpen, onClose }) {
  const [isCollecting, setIsCollecting] = useState(false);

  const handleCollect = () => {
    setIsCollecting(true);
    setTimeout(() => {
      onClose();
      // Reset internal state after modal unmounts so next open starts fresh
      setTimeout(() => setIsCollecting(false), 500);
    }, 2800); // Wait for the new slow magic vanish animation to finish
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 px-4"
        >
          <motion.div 
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            className="max-w-sm w-full flex flex-col items-center text-center relative"
          >
            {/* Yellow Background & Rays that fade out when collecting */}
            <AnimatePresence>
              {!isCollecting && (
                <motion.div 
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-[#f7d13d] rounded-2xl shadow-[0_0_50px_rgba(247,209,61,0.3)] overflow-hidden z-0"
                >
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.4)_30deg,transparent_60deg,rgba(255,255,255,0.4)_90deg,transparent_120deg,rgba(255,255,255,0.4)_150deg,transparent_180deg,rgba(255,255,255,0.4)_210deg,transparent_240deg,rgba(255,255,255,0.4)_270deg,transparent_300deg,rgba(255,255,255,0.4)_330deg,transparent_360deg)] opacity-50"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Key Container */}
            <motion.div 
              layout
              initial={{ rotate: -180, scale: 0 }}
              animate={isCollecting 
                ? { scale: 1.5, backgroundColor: 'rgba(0,0,0,0)', boxShadow: 'none' } 
                : { rotate: 0, scale: 1, backgroundColor: '#000', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }
              }
              transition={isCollecting 
                ? { duration: 1.0, ease: "easeInOut", layout: { duration: 1.0, ease: "easeInOut" } } 
                : { delay: 0.3, type: "spring", bounce: 0.6 }
              }
              className="w-24 h-24 rounded-full flex items-center justify-center mt-8 mb-6 relative z-10"
            >
              <motion.div 
                animate={isCollecting 
                  ? { 
                      rotateY: [0, 0, 1080, 1080], // Wait 1s, then spin exactly 3 times, then stay
                      scale: [1, 1, 1.2, 0], // Normal, normal, grow slightly, POP!
                      filter: ["brightness(1)", "brightness(1)", "brightness(2.5)", "brightness(0)"]
                    } 
                  : { rotateY: [0, 1080, 1080] }
                } 
                transition={isCollecting 
                  ? { duration: 2.4, times: [0, 0.4, 0.9, 1], ease: "easeInOut" } 
                  : { duration: 2.5, times: [0, 0.8, 1], ease: "easeOut", delay: 0.5 }
                }
              >
                <GoldenKey size={64} />
              </motion.div>
              
              {/* Magic Sparkle Burst when it vanishes */}
              {isCollecting && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
                   {[...Array(8)].map((_, i) => (
                     <motion.div
                       key={i}
                       initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                       animate={{ 
                         scale: [0, 1.5, 0], 
                         x: Math.cos(i * (Math.PI / 4)) * 120, 
                         y: Math.sin(i * (Math.PI / 4)) * 120,
                         opacity: [1, 1, 0]
                       }}
                       transition={{ delay: 2.16, duration: 0.6, ease: "easeOut" }}
                       className="absolute w-3 h-3 bg-[#f7d13d] rounded-full shadow-[0_0_15px_#f7d13d]"
                     />
                   ))}
                </div>
              )}
            </motion.div>
            
            {/* Content (Text, Button) that fades out smoothly */}
            <AnimatePresence>
              {!isCollecting && (
                <motion.div 
                  exit={{ opacity: 0, height: 0, paddingBottom: 0 }} 
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                  className="relative z-10 px-8 pb-8 flex flex-col items-center w-full overflow-hidden"
                >
                  <h2 className="text-3xl font-black text-black tracking-widest uppercase mb-2">
                    You got One Key!
                  </h2>
                  
                  <div className="bg-black/10 p-4 rounded-lg mt-4 border border-black/20 w-full text-center">
                     <p className="text-sm font-bold text-black/80 italic">
                       "Ingha vera etho Secret iruku... Ungalukku eppo Key thevai-padutho apo just double-tap pannunga...."
                     </p>
                  </div>
                  
                  <button 
                    onClick={handleCollect}
                    className="mt-8 bg-black text-[#f7d13d] px-8 py-3 rounded-full font-black tracking-widest uppercase hover:scale-105 active:scale-95 transition-transform"
                  >
                    Collect
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
