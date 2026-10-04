const fs = require('fs');
const path = 'd:/Sughanthan/Countdown/src/components/SecretGame.jsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Add ConfettiBurst and TreasureMapPath components
const components = `
const ConfettiBurst = () => {
  const particles = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
      {particles.map((_, i) => {
        const angle = (Math.random() * Math.PI) * 2;
        const velocity = 40 + Math.random() * 120;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 30;
        const color = Math.random() > 0.5 ? '#f7d13d' : '#ffffff';
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: Math.random() + 0.5, x: tx, y: ty, rotate: Math.random() * 360 }}
            transition={{ duration: 1 + Math.random(), ease: "easeOut" }}
            className="absolute w-2 h-2 sm:w-3 sm:h-3"
            style={{ backgroundColor: color, borderRadius: Math.random() > 0.5 ? '50%' : '2px' }}
          />
        );
      })}
    </div>
  );
};

const TreasureMapPath = ({ isCurrent, delayStart }) => {
  return (
    <svg width="300" height="260" viewBox="0 0 300 260" className={'my-4 overflow-visible ' + (!isCurrent ? 'opacity-30' : '')}>
      <motion.path
        d="M 150 0 C 150 40, 40 50, 40 90 C 40 140, 260 130, 260 170 C 260 210, 150 210, 150 230 L 150 260"
        stroke="black"
        strokeWidth="4"
        strokeDasharray="8 8"
        strokeLinecap="round"
        fill="transparent"
        initial={{ pathLength: isCurrent ? 0 : 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: isCurrent ? delayStart : 0, ease: "linear" }}
      />
      
      {/* Left Side: Coconut Trees (near x=40, y=90) */}
      <motion.g 
        initial={isCurrent ? { scale: 0 } : { scale: 1 }} 
        animate={{ scale: 1 }} 
        transition={{ delay: isCurrent ? delayStart + 0.6 : 0, type: "spring", bounce: 0.6 }}
        transform="translate(40, 90)"
      >
        <motion.g animate={{ rotateZ: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ transformOrigin: "0px 0px" }}>
          <path d="M -5 0 Q -10 -20 -5 -40" stroke="black" strokeWidth="3" fill="transparent" />
          <path d="M 5 0 Q 15 -15 10 -30" stroke="black" strokeWidth="2" fill="transparent" />
          <path d="M -5 -40 Q -25 -40 -20 -25 M -5 -40 Q -15 -60 5 -50 M -5 -40 Q 15 -45 5 -25" stroke="black" strokeWidth="3" fill="transparent" strokeLinecap="round" />
          <path d="M 10 -30 Q -5 -35 0 -20 M 10 -30 Q 15 -45 25 -35 M 10 -30 Q 25 -25 20 -15" stroke="black" strokeWidth="2" fill="transparent" strokeLinecap="round" />
        </motion.g>
      </motion.g>

      {/* Right Side: Egyptian Pyramids (near x=260, y=170) */}
      <motion.g 
        initial={isCurrent ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: isCurrent ? delayStart + 1.5 : 0, type: "spring", bounce: 0.5 }}
        transform="translate(260, 170)"
      >
        <polygon points="-25,0 0,-40 25,0" fill="black" />
        <polygon points="-10,0 0,-40 25,0" fill="rgba(0,0,0,0.6)" />
        <polygon points="-40,0 -20,-25 0,0" fill="black" opacity="0.8" />
        <circle cx="-20" cy="-35" r="6" fill="black" opacity="0.9" />
      </motion.g>

      {/* Center: Treasure Box (near x=150, y=230) */}
      <motion.g 
        initial={isCurrent ? { scale: 0 } : { scale: 1 }} 
        animate={{ scale: 1 }} 
        transition={{ delay: isCurrent ? delayStart + 2.4 : 0, type: "spring", bounce: 0.6 }}
        transform="translate(150, 230)"
      >
        <rect x="-16" y="-12" width="32" height="12" rx="2" fill="black" />
        <rect x="-10" y="-12" width="4" height="12" fill="#f7d13d" />
        <rect x="6" y="-12" width="4" height="12" fill="#f7d13d" />
        
        <motion.g
          initial={isCurrent ? { rotateX: 0 } : { rotateX: 180 }}
          animate={{ rotateX: 180 }}
          transition={{ delay: isCurrent ? delayStart + 2.7 : 0, type: "spring", duration: 1 }}
          style={{ transformOrigin: "0px -12px" }}
        >
          <path d="M -16 -12 Q 0 -25 16 -12 Z" fill="black" />
          <path d="M -10 -12 Q 0 -22 10 -12" stroke="#f7d13d" strokeWidth="3" fill="transparent" />
          <rect x="-3" y="-14" width="6" height="4" fill="#f7d13d" />
        </motion.g>
        
        <motion.g
           initial={{ opacity: 0, scale: 0, y: 0 }}
           animate={isCurrent ? { opacity: [0, 1, 0], scale: [0.5, 2, 2.5], y: -20 } : { opacity: 0 }}
           transition={{ delay: isCurrent ? delayStart + 2.7 : 0, duration: 1.5, ease: "easeOut" }}
        >
           <circle cx="0" cy="-12" r="15" fill="rgba(247,209,61,0.8)" style={{ mixBlendMode: 'screen' }} />
           <path d="M 0 -12 L 0 -30 M 0 -12 L -15 -25 M 0 -12 L 15 -25" stroke="#f7d13d" strokeWidth="2" />
        </motion.g>
      </motion.g>
    </svg>
  );
};

export default function SecretGame({ isDarkMode }) {
`;
code = code.replace('export default function SecretGame({ isDarkMode }) {', components);

// 2. Add boxVariants fix
const old_glow = `glow: {
      scale: 1.5,
      boxShadow: "0px 0px 150px 100px rgba(247,209,61,1)",
      backgroundColor: "rgba(247,209,61,1)",
      borderColor: "rgba(247,209,61,1)",
      zIndex: 100,
      transition: { duration: 1, ease: "easeIn" }
    }`;

const new_glow = `glow: {
      opacity: 1,
      scale: 1.1,
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "rgba(247,209,61,1)",
      boxShadow: [
        "0px 0px 0px rgba(247,209,61,0)",
        "0px 0px 25px 10px rgba(247,209,61,0.8)",
        "0px 0px 0px rgba(247,209,61,0)",
        "0px 0px 25px 10px rgba(247,209,61,0.8)",
        "0px 0px 0px rgba(247,209,61,0)",
        "0px 0px 40px 15px rgba(247,209,61,1)"
      ],
      zIndex: 100,
      transition: { duration: 1.2, ease: "easeInOut" }
    }`;
code = code.replace(old_glow, new_glow);

// 3. Add useEffect timings + pause swing
const old_use_effect = `setTimeout(() => {
           if (currentLevel === 3) {
              setTransitionStage('chat_climax');
              setCompletedLevels(3);
           } else {
              setTransitionStage('glow');
              setCompletedLevels(currentLevel);
              
              setTimeout(() => {
                 if (currentLevel < LEVELS.length) {
                    const nextLevel = currentLevel + 1;
                    setCurrentLevel(nextLevel);
                    const nextTarget = LEVELS[nextLevel - 1];
                    setSlots(Array(nextTarget.length).fill(''));
                    setPlacementHistory([]);
                    px.set(0);
                    py.set(0);
                    setDeck(generateDeck(nextTarget));
                 }
              }, 1000);
  
              setTimeout(() => {
                 setTransitionStage('swing');
              }, 3500);
  
              setTimeout(() => {
                 setTransitionStage('fall');
              }, 4300);
  
              setTimeout(() => {
                 setTransitionStage('none');
              }, 5300);
           }
        }, 400);`;

const new_use_effect = `setTimeout(() => {
           if (currentLevel === 3) {
              setTransitionStage('chat_climax');
              setCompletedLevels(3);
           } else {
              setTransitionStage('pre_glow');
              setCompletedLevels(currentLevel);
              setTimeout(() => { setTransitionStage('glow'); }, 1500);
  
              setTimeout(() => {
                 if (currentLevel < LEVELS.length) {
                    const nextLevel = currentLevel + 1;
                    setCurrentLevel(nextLevel);
                    const nextTarget = LEVELS[nextLevel - 1];
                    setSlots(Array(nextTarget.length).fill(''));
                    setPlacementHistory([]);
                    px.set(0);
                    py.set(0);
                    setDeck(generateDeck(nextTarget));
                 }
              }, 7000);
  
              // USER REQUEST: Pause it at glow. Do not swing or fall yet!
              /*
              setTimeout(() => {
                 setTransitionStage('swing');
              }, 8500);
  
              setTimeout(() => {
                 setTransitionStage('fall');
              }, 9500);
  
              setTimeout(() => {
                 setTransitionStage('none');
              }, 10500);
              */
           }
        }, 400);`;
code = code.replace(old_use_effect, new_use_effect);

// 4. Add ConfettiBurst in slots area
code = code.replace('{/* CLEAR Button */}', '{isWin && (transitionStage === "pre_glow" || transitionStage === "glow") && <ConfettiBurst />}\n        {/* CLEAR Button */}');

// 5. Fix portal and yellow-board completion board
const old_portal = `{/* Level 1 & 2 Normal Transition */}
           {(transitionStage === 'glow' || transitionStage === 'swing' || transitionStage === 'fall') && (
              <motion.div
                 key="yellow-board"
                 initial={{ clipPath: "circle(0% at 50% 85%)", rotateZ: 0, y: 0 }}
                 animate={
                    transitionStage === 'glow' ? { clipPath: "circle(150% at 50% 85%)", rotateZ: 0, y: 0, transition: { duration: 1, ease: "easeInOut" } } :
                    transitionStage === 'swing' ? { clipPath: "circle(150% at 50% 85%)", rotateZ: 35, y: 0, transition: { type: "spring", bounce: 0.6, duration: 1.2 } } :
                    transitionStage === 'fall' ? { clipPath: "circle(150% at 50% 85%)", rotateZ: 50, y: 1500, transition: { duration: 1, ease: "easeIn" } } : {}
                 }
                 exit={{ opacity: 0 }}
                 style={{ transformOrigin: "20% 5%" }}
                 className="fixed inset-0 w-full h-full z-[100000] bg-[#f7d13d] flex flex-col items-center justify-center pointer-events-none"
              >
                 <motion.div animate={transitionStage === 'fall' ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} className="absolute top-[5%] left-[10%] sm:left-[20%] w-4 h-4 bg-neutral-800 rounded-full shadow-inner border border-neutral-900" />
                 <motion.div animate={(transitionStage === 'swing' || transitionStage === 'fall') ? { y: 200, opacity: 0, rotateZ: 180 } : { y: 0, opacity: 1 }} className="absolute top-[5%] right-[10%] sm:right-[20%] w-4 h-4 bg-neutral-800 rounded-full shadow-inner border border-neutral-900" />

                 <h1 className="text-4xl sm:text-6xl font-black text-black tracking-widest text-center mb-16 drop-shadow-lg leading-tight mt-10">
                    LEVEL {completedLevels} <br /> COMPLETED
                 </h1>
                 
                 <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 scale-75 sm:scale-100">
                    {LEVELS.map((target, lvlIndex) => {
                       const isCompleted = lvlIndex < completedLevels;
                       const isCurrent = lvlIndex === completedLevels;
                       return (
                          <div key={lvlIndex} className={\`flex flex-col items-center gap-4 \${!isCompleted && !isCurrent ? 'opacity-30' : ''}\`}>
                             <span className="font-bold text-xl text-black">LEVEL {lvlIndex + 1}</span>
                             <div className="flex gap-2">
                                {target.map((char, charIdx) => (
                                   <div key={charIdx} className={\`w-10 h-12 sm:w-14 sm:h-16 flex items-center justify-center font-black text-2xl rounded-lg border-2 border-black \${isCompleted ? 'bg-black text-[#f7d13d]' : 'bg-transparent text-black'}\`}>
                                      {isCompleted ? char : ''}
                                   </div>
                                ))}
                             </div>
                          </div>
                       );
                    })}
                 </div>
              </motion.div>
           )}`;

const new_portal = `{/* Level 1 & 2 Normal Transition */}
           {(transitionStage === 'glow' || transitionStage === 'swing' || transitionStage === 'fall') && (
              <motion.div
                 key="yellow-board"
                 initial={{ clipPath: "circle(0% at 50% 82%)", rotateZ: 0, y: 0 }}
                 animate={
                    transitionStage === 'glow' ? { clipPath: "circle(150% at 50% 82%)", rotateZ: 0, y: 0, transition: { duration: 2, ease: "easeInOut" } } :
                    transitionStage === 'swing' ? { clipPath: "circle(150% at 50% 82%)", rotateZ: 35, y: 0, transition: { type: "spring", bounce: 0.6, duration: 1.2 } } :
                    transitionStage === 'fall' ? { clipPath: "circle(150% at 50% 82%)", rotateZ: 50, y: 1500, transition: { duration: 1, ease: "easeIn" } } : {}
                 }
                 exit={{ opacity: 0 }}
                 style={{ transformOrigin: "20% 5%", transform: "translateZ(9999px)" }}
                 className="fixed inset-0 w-full h-full z-[100000] bg-[#f7d13d] flex flex-col items-center justify-center pointer-events-none"
              >
                 <motion.div animate={transitionStage === 'fall' ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} className="absolute top-[5%] left-[10%] sm:left-[20%] w-4 h-4 bg-neutral-800 rounded-full shadow-inner border border-neutral-900" />
                 <motion.div animate={(transitionStage === 'swing' || transitionStage === 'fall') ? { y: 200, opacity: 0, rotateZ: 180 } : { y: 0, opacity: 1 }} className="absolute top-[5%] right-[10%] sm:right-[20%] w-4 h-4 bg-neutral-800 rounded-full shadow-inner border border-neutral-900" />

                 <motion.div 
                    initial={{ rotateZ: 0 }}
                    animate={{ rotateZ: -5 }}
                    transition={{ delay: 1, type: "spring", bounce: 0.5 }}
                    className="flex flex-col items-center w-full"
                 >
                   <h1 className="text-4xl sm:text-6xl font-black text-black tracking-widest text-center mb-2 drop-shadow-lg leading-tight mt-10">
                      LEVEL {completedLevels} <br /> COMPLETED
                   </h1>
                   
                   <div className="flex flex-col items-center gap-0 scale-75 sm:scale-100">
                      {LEVELS.slice(0, completedLevels + 1).map((target, lvlIndex) => {
                         const isCompleted = lvlIndex < completedLevels;
                         const isCurrent = lvlIndex === completedLevels;
                         return (
                            <React.Fragment key={lvlIndex}>
                               {lvlIndex > 0 && (
                                 <TreasureMapPath isCurrent={isCurrent} delayStart={1.5} />
                               )}
                               <motion.div 
                                 initial={isCurrent ? { y: 60, scale: 0.3, rotateZ: (lvlIndex % 2 === 0 ? 15 : -15), opacity: 0 } : { y: 0, scale: 1, rotateZ: 0, opacity: 1 }}
                                 animate={{ y: 0, scale: 1, rotateZ: 0, opacity: 1 }}
                                 transition={{ type: "spring", bounce: 0.7, duration: 1, delay: isCurrent ? 4.5 : 0 }}
                                 className={'flex flex-col items-center gap-2 relative ' + (!isCompleted && !isCurrent ? 'opacity-30' : '')}
                               >
                                  {isCurrent && (
                                     <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 2.5] }}
                                        transition={{ delay: 4.5, duration: 0.8, ease: "easeOut" }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[radial-gradient(circle,rgba(0,0,0,0.3)_0%,transparent_60%)] rounded-full pointer-events-none -z-10"
                                     />
                                  )}
                                  <span className="font-bold text-sm sm:text-lg text-black uppercase tracking-widest">LEVEL {lvlIndex + 1}</span>
                                  <div className="flex gap-2">
                                     {target.map((char, charIdx) => (
                                        <div key={charIdx} className={'w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center font-black text-2xl rounded-lg border-2 border-black ' + (isCompleted ? 'bg-black text-[#f7d13d]' : 'bg-transparent text-black')}>
                                           {isCompleted ? char : ''}
                                        </div>
                                     ))}
                                  </div>
                               </motion.div>
                            </React.Fragment>
                         );
                      })}
                   </div>
                 </motion.div>
              </motion.div>
           )}`;

code = code.replace(old_portal, new_portal);

fs.writeFileSync(path, code);
