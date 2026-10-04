const fs = require('fs');
let content = fs.readFileSync('src/components/SecretGame.jsx', 'utf8');

const newYB = `{/* Level 1 & 2 Normal Transition */}
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
                            <React.Fragment key={lvlIndex}>
                               {lvlIndex > 0 && (
                                 <svg className={"w-8 h-8 sm:w-12 sm:h-12 my-auto rotate-90 sm:rotate-0 transition-opacity duration-1000 " + (isCompleted || isCurrent ? "opacity-100" : "opacity-20")} viewBox="0 0 24 24" fill="none" stroke="black">
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                 </svg>
                               )}
                               <motion.div 
                                 initial={isCurrent ? { y: 60, scale: 0.3, rotateZ: (lvlIndex % 2 === 0 ? 15 : -15), opacity: 0 } : { y: 0, scale: 1, rotateZ: 0, opacity: 1 }}
                                 animate={{ y: 0, scale: 1, rotateZ: 0, opacity: 1 }}
                                 transition={{ type: "spring", bounce: 0.7, duration: 1, delay: isCurrent ? 3.5 : 0 }}
                                 className={'flex flex-col items-center gap-2 relative ' + (!isCompleted && !isCurrent ? 'opacity-30' : '')}
                               >
                                  <div className="flex gap-1 relative z-10">
                                     {target.map((char, charIdx) => (
                                        <div key={charIdx} className={'w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center font-black text-2xl rounded-lg border-2 border-black ' + (isCompleted ? 'bg-black text-[#f7d13d]' : 'bg-transparent text-black')}>
                                           {isCompleted ? char : ''}
                                        </div>
                                     ))}
                                  </div>
                                  <span className="text-black font-black uppercase tracking-widest text-xs mt-2 bg-white/50 px-2 py-1 rounded">Level {lvlIndex + 1}</span>
                               </motion.div>
                            </React.Fragment>
                         );
                      })}
                   </div>
                </motion.div>
             )}`;

const oldYBStart = "{/* Level 1 & 2 Normal Transition */}";
const oldYBEnd = "{/* Level 3 Chat Climax */}";

const startIdx = content.indexOf(oldYBStart);
const endIdx = content.indexOf(oldYBEnd);

if(startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + newYB + "\n\n             " + content.substring(endIdx);
    fs.writeFileSync('src/components/SecretGame.jsx', content);
    console.log("Replaced perfectly");
}
