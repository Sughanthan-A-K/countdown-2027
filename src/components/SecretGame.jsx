import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, animate, useTransform, AnimatePresence } from 'framer-motion';

const LEVELS = [
  "LET".split(''),
  "ME".split(''),
  "OUT".split('')
];

const STORY_WORDS = ["RULES", "SO", "SHALL", "WE", "START", "THE", "GAME"];

const MagicStar = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const TypingIndicator = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10, scale: 0.9, originX: 0, originY: 1 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="self-start bg-neutral-900 border border-[#f7d13d]/20 px-4 py-3 rounded-2xl rounded-tl-sm w-16 flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
  >
    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-[#f7d13d] rounded-full drop-shadow-[0_0_3px_rgba(247,209,61,0.8)]" />
    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#f7d13d] rounded-full drop-shadow-[0_0_3px_rgba(247,209,61,0.8)]" />
    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#f7d13d] rounded-full drop-shadow-[0_0_3px_rgba(247,209,61,0.8)]" />
  </motion.div>
);

const GameBubble = ({ children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10, scale: 0.9, originX: 0, originY: 1 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    className="self-start bg-neutral-900 border border-[#f7d13d]/20 text-[#f7d13d] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] shadow-[0_4px_15px_rgba(0,0,0,0.5)] text-[15px] font-bold tracking-wide leading-relaxed"
  >
    {children}
  </motion.div>
);

const AnimatedDoor = ({ onClick }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20, scale: 0.9, originX: 0, originY: 1 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    onClick={onClick}
    className="self-start relative cursor-pointer mt-2 perspective-[1000px]"
  >
    <div className="w-20 h-28 sm:w-24 sm:h-32 border-4 border-[#f7d13d] bg-black relative flex items-end shadow-[0_0_15px_rgba(247,209,61,0.3)] hover:shadow-[0_0_30px_rgba(247,209,61,0.6)] transition-shadow">
       {/* Inside room / glowing void */}
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f7d13d]/60 to-transparent pointer-events-none" />
       
       {/* The Door Panel */}
       <motion.div 
         initial={{ rotateY: 0 }}
         animate={{ rotateY: 95 }}
         transition={{ delay: 0.5, duration: 1.2, type: "spring", bounce: 0.3 }}
         style={{ transformOrigin: 'left' }}
         className="absolute inset-y-0 left-0 w-full bg-[#f7d13d] border-r border-[#c2a222] flex items-center justify-end pr-2 sm:pr-3"
       >
          {/* Door Handle */}
          <div className="w-1.5 h-4 sm:w-2 sm:h-5 rounded-full bg-black shadow-sm" />
       </motion.div>
    </div>
  </motion.div>
);

const PortalExitAnimation = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-[1000000] bg-black overflow-hidden flex items-center justify-center pointer-events-none"
  >
    {/* Screen Shake Wrapper */}
    <motion.div
      animate={{ x: [-8, 8, -8, 8, -5, 5, 0], y: [-8, 8, 8, -8, 5, -5, 0] }}
      transition={{ duration: 0.3, repeat: 5, repeatType: "mirror" }}
      className="absolute inset-0 flex items-center justify-center perspective-[1000px]"
    >
      {/* Flying Doorway / Portal Frames */}
      {[...Array(6)].map((_, i) => (
         <motion.div
            key={`frame-${i}`}
            initial={{ scale: 0.1, opacity: 0, z: -1000 }}
            animate={{ scale: 20, opacity: [0, 1, 0.5, 0], z: 500 }}
            transition={{ duration: 1.2, delay: i * 0.25, ease: "easeIn" }}
            className="absolute w-32 h-48 sm:w-48 sm:h-72 border-[6px] border-[#f7d13d] shadow-[0_0_80px_rgba(247,209,61,0.6),inset_0_0_80px_rgba(247,209,61,0.6)] rounded-sm"
         />
      ))}

      {/* Yellow Wind / Speed Lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 40 }).map((_, i) => {
          const angle = Math.random() * 360;
          return (
            <motion.div
              key={`wind-${i}`}
              initial={{ width: 0, x: 100, opacity: 0 }}
              animate={{ width: 400 + Math.random() * 600, x: 1500, opacity: [0, 1, 0] }}
              transition={{
                duration: 0.3 + Math.random() * 0.3,
                repeat: Infinity,
                delay: Math.random() * 0.5,
                ease: "easeIn"
              }}
              className="absolute h-[3px] bg-[#f7d13d] origin-left shadow-[0_0_15px_rgba(247,209,61,0.9)]"
              style={{ rotate: `${angle}deg` }}
            />
          );
        })}
      </div>
    </motion.div>

    {/* Final Jump Flash */}
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: [0, 2.5] }}
      transition={{ delay: 1.5, duration: 0.5, ease: "easeIn" }}
      className="absolute inset-0 flex items-center justify-center"
    >
       <div className="w-full h-full bg-[#f7d13d] rounded-full scale-[2] shadow-[0_0_200px_rgba(247,209,61,1)]" />
    </motion.div>
    
    {/* Final Text */}
    <motion.span
       initial={{ opacity: 0, scale: 0.5 }}
       animate={{ opacity: 1, scale: 1 }}
       transition={{ delay: 1.7, duration: 0.3 }}
       className="absolute z-10 text-black font-black text-6xl tracking-widest drop-shadow-md"
    >
       2 0 2 7
    </motion.span>
  </motion.div>
);

export default function SecretGame({ isDarkMode }) {
  const [gameState, setGameState] = useState('intro');
  const [showCinematic, setShowCinematic] = useState(true);
  
  const [swipeCount, setSwipeCount] = useState(0);
  const [isLevelTwinkling, setIsLevelTwinkling] = useState(false);
  const [boxesRevealed, setBoxesRevealed] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [isDevMenuOpen, setIsDevMenuOpen] = useState(false);
  const [completedLevels, setCompletedLevels] = useState(0);
  const [placementHistory, setPlacementHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [currentLevel, setCurrentLevel] = useState(1);
  const LEVEL_TARGET = LEVELS[currentLevel - 1] || LEVELS[0];
  const LEVEL_CHARS = ['L', 'E', 'V', 'E', 'L', String(currentLevel)];
  
  const [slots, setSlots] = useState(Array(LEVEL_TARGET.length).fill(''));
  const [deck, setDeck] = useState([]);
  const [refillStack, setRefillStack] = useState([]);
  
  const [transitionStage, setTransitionStage] = useState('none');

  const cx = useMotionValue(0);
  const cy = useMotionValue(800);
  const cz = useMotionValue(-400);
  const cRotX = useMotionValue(0);
  const cRotY = useMotionValue(0);
  const cRotZ = useMotionValue(-180);
  const cScale = useMotionValue(0.1);
  const cOpacity = useMotionValue(0);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const pRotZ = useTransform(px, [-200, 200], [-10, 10]);

  const forceResetPhysics = () => {
    px.stop(); py.stop(); cx.stop(); cy.stop(); cz.stop();
    cRotX.stop(); cRotY.stop(); cRotZ.stop(); cScale.stop(); cOpacity.stop();
    px.set(0); py.set(0);
    cx.set(0); cy.set(0); cz.set(0); cRotX.set(0); cRotY.set(0); cRotZ.set(0); cScale.set(1); cOpacity.set(1);
    setTransitionStage('none');
    setPlacementHistory([]);
    setIsAnimating(false);
  };

  const playMountAnimation = () => {
    // Reset Everything
    cy.set(800); cz.set(-400); cScale.set(0.1); cOpacity.set(0); cRotZ.set(-180); cRotY.set(0);
    cx.set(0); px.set(0); py.set(0);
    
    setShowCinematic(true);
    setGameState('intro');
    setSwipeCount(0);
    setCurrentLevel(1);
    setCompletedLevels(0);
    setBoxesRevealed(false);
    setSlots(['', '', '']);
    setDeck([]);
    setPlacementHistory([]);
    setTransitionStage('none');
    setIsAnimating(false);

    const duration = 6;
    const times = [0, 0.2, 0.3, 0.7, 1];
    const ease = ["easeOut", "easeOut", "linear", "easeInOut"];

    animate(cy, [800, 0, 0, 0, 0], { duration, times, ease });
    animate(cScale, [0.1, 1, 1.15, 1.15, 1], { duration, times, ease });
    animate(cOpacity, [0, 1, 1, 1, 1], { duration, times, ease });
    animate(cz, [-400, 0, 150, 150, 0], { duration, times, ease });
    animate(cRotZ, [-180, 0, 0, 0, 0], { duration, times, ease }); 
    animate(cRotY, [0, 1080, 1260, 1620, 2520], { duration, times, ease, onComplete: () => {
      setGameState('awaiting_first_swipe');
    }});
  };

  const generateDeck = (target) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const newDeck = [];
    
    // 1. Fill deck with pure random letters
    for (let i = 0; i < 20; i++) {
        newDeck.push(chars[Math.floor(Math.random() * chars.length)]);
    }

    // 2. Guarantee exactly 2 sets of the required letters scattered randomly
    if (target) {
        let guaranteed = [];
        for (let i = 0; i < 2; i++) { // 2 copies of the word
            guaranteed = guaranteed.concat(target);
        }

        // Generate and shuffle positions 0-19
        let positions = Array.from({ length: 20 }, (_, i) => i);
        for (let i = positions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }

        // Overwrite random spots with the guaranteed letters
        for (let i = 0; i < guaranteed.length; i++) {
            newDeck[positions[i]] = guaranteed[i];
        }
    }
    
    return newDeck;
  };

  useEffect(() => {
    const timer = setTimeout(playMountAnimation, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && slots.join('') === LEVEL_TARGET.join('')) {
      setTimeout(() => {
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
      }, 400);
    }
  }, [slots, gameState, LEVEL_TARGET, currentLevel, px, py]);

  useEffect(() => {
    if (transitionStage === 'chat_climax') {
        const sequence = async () => {
            const delay = (ms) => new Promise(res => setTimeout(res, ms));
            await delay(1000);
            setChatStep(1); // User: "LET ME OUT"
            await delay(1000);
            setChatStep(2); // Double tick
            await delay(500);
            setChatStep(3); // Typing...
            await delay(2500);
            setChatStep(4); // "Ok Sure...."
            await delay(1000);
            setChatStep(5); // Typing...
            await delay(2000);
            setChatStep(6); // "You Played well"
            await delay(1000);
            setChatStep(7); // Typing...
            await delay(1500);
            setChatStep(8); // "🚪"
        };
        sequence();
    }
  }, [transitionStage]);

  const handleExitGame = () => {
     setTransitionStage('exit_flash');
     setTimeout(() => {
        localStorage.setItem('secretGameMode', 'false');
        window.location.reload();
     }, 2200);
  };


  const playBoomerangAndWindshield = () => {
    setGameState('boomerang');
    const startRotY = cRotY.get();

    animate(cz, [0, -800, -400, 600], { duration: 1.5, times: [0, 0.4, 0.7, 1], ease: "easeInOut" });
    animate(cx, [0, 300, -300, 0], { duration: 1.5, times: [0, 0.4, 0.7, 1], ease: "easeInOut" });
    animate(cy, [cy.get(), -200, 100, 0], { duration: 1.5, times: [0, 0.4, 0.7, 1], ease: "easeInOut" });
    animate(cScale, [1, 1, 1, 1], { duration: 1.5 });
    
    animate(cRotZ, [0, 180, 540, 720, 0], { duration: 1.5, ease: "linear" });
    animate(cRotY, [startRotY, startRotY + 720, startRotY + 1440, startRotY + 2160, startRotY + 2520], { 
       duration: 1.5, ease: "linear",
       onComplete: () => {
         setGameState('windshield');
         
         let flutterCount = 0;
         const flutterTimer = setInterval(() => {
            flutterCount++;
            animate(cRotX, (Math.random() * 8) - 4, { duration: 0.1 });
            animate(cRotZ, (Math.random() * 4) - 2, { duration: 0.1 });
         }, 100);

         setTimeout(() => {
           clearInterval(flutterTimer);
           setGameState('blowing_away');
           
           animate(cx, 1500, { duration: 0.8, ease: "easeIn" });
           animate(cy, -1000, { duration: 0.8, ease: "easeIn" });
           animate(cRotZ, 120, { duration: 0.8, ease: "linear" });
           animate(cRotY, cRotY.get() + 360, { duration: 0.8, ease: "linear", onComplete: () => {
              setShowCinematic(false);
              setGameState('story_mode');
           }});
         }, 3500);
       }
    });
  };

  const startClimax = () => {
    const newDeck = generateDeck(LEVEL_TARGET);
    const climaxCards = ['X', 'B', 'M', 'T', 'K', 'R', newDeck[newDeck.length - 1]];
    setRefillStack(climaxCards);
    
    setGameState('climax_animation');
    setIsLevelTwinkling(true);
    
    setTimeout(() => { setIsLevelTwinkling(false); }, 1000);
    setTimeout(() => { setBoxesRevealed(true); }, 1800);

    setTimeout(() => {
       px.set(0);
       py.set(0);
       setDeck(newDeck);
       setGameState('playing');
    }, 3500);
  };

  const handleManualRefill = () => {
    const newDeck = generateDeck(LEVEL_TARGET);
    const climaxCards = ['Q', 'W', 'E', 'R', 'T', 'Y', newDeck[newDeck.length - 1]];
    setRefillStack(climaxCards);
    setGameState('climax_animation');
    setTimeout(() => {
       px.set(0);
       py.set(0);
       setDeck(newDeck);
       setGameState('playing');
    }, 3500);
  };

  const throwCardAway = (direction, targetSlotIndex = -1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const currentCard = deck[deck.length - 1];
    const throwX = direction === 'left' ? -400 : direction === 'right' ? 400 : 0;
    const throwY = direction === 'down' ? 400 : 0;
    
    if (direction === 'down' && gameState === 'playing' && boxesRevealed) {
        setSlots(prevSlots => {
            const newSlots = [...prevSlots];
            if (targetSlotIndex !== -1) {
                newSlots[targetSlotIndex] = currentCard;
            } else {
                const emptyIndex = newSlots.findIndex(s => s === '');
                if (emptyIndex !== -1) newSlots[emptyIndex] = currentCard;
            }
            return newSlots;
        });
        
        const actualSlot = targetSlotIndex !== -1 ? targetSlotIndex : slots.findIndex(s => s === '');
        if (actualSlot !== -1) {
             setPlacementHistory(prev => [...prev, { slotIndex: actualSlot, letter: currentCard }]);
        }
    }

    // Stop any residual physics drag before starting programmatic throw
    px.stop(); py.stop();

    animate(px, throwX, { duration: 0.3 });
    animate(py, throwY, { 
        duration: 0.3, 
        onComplete: () => {
           // Kill any residual velocity before state update
           px.stop(); py.stop();

           if (gameState === 'story_mode') {
              const nextCount = swipeCount + 1;
              setSwipeCount(nextCount);
              
              if (nextCount === STORY_WORDS.length) {
                  startClimax();
              } else {
                  px.set(0); py.set(0);
              }
           } else if (gameState === 'playing') {
              if (deck.length > 1) {
                 px.set(0); py.set(0);
              }
              setDeck(prev => prev.slice(0, -1));
           }
           setIsAnimating(false);
        }
    });
  };

  const handleUndo = () => {
    if (placementHistory.length === 0) return;
    const newHistory = [...placementHistory];
    const lastPlay = newHistory.pop();
    
    setSlots(prev => {
       const newSlots = [...prev];
       newSlots[lastPlay.slotIndex] = '';
       return newSlots;
    });
    setPlacementHistory(newHistory);
    
    setDeck(prev => [...prev, lastPlay.letter]);
    
    px.set(0);
    py.set(200);
    animate(py, 0, { type: "spring", bounce: 0.5 });
  };

  const handleCinematicDragEnd = (e, info) => {
    if (gameState === 'awaiting_first_swipe') playBoomerangAndWindshield();
  };

  const handlePlayDragEnd = (e, info) => {
    if (!['story_mode', 'playing'].includes(gameState)) return;

    const thresholdX = 100;
    const thresholdY = 100;
    const xOffset = info.offset.x;

    let targetSlotIndex = -1;
    if (LEVEL_TARGET.length === 3) {
        if (xOffset < -40) targetSlotIndex = 0;
        else if (xOffset > 40) targetSlotIndex = 2;
        else targetSlotIndex = 1;
    } else if (LEVEL_TARGET.length === 2) {
        if (xOffset < 0) targetSlotIndex = 0;
        else targetSlotIndex = 1;
    }

    if (targetSlotIndex !== -1 && slots[targetSlotIndex] !== '') {
        targetSlotIndex = -1; // Slot is full, force bounce
    }

    const isDownSwipe = info.offset.y > thresholdY || info.velocity.y > 500;
    const isRightSwipe = info.offset.x > thresholdX || info.velocity.x > 500;
    const isLeftSwipe = info.offset.x < -thresholdX || info.velocity.x < -500;

    if (isDownSwipe) {
      if (gameState === 'playing' && boxesRevealed) {
         if (targetSlotIndex !== -1) {
             throwCardAway('down', targetSlotIndex);
         } else {
             animate(px, 0, { type: 'spring', bounce: 0.5 });
             animate(py, 0, { type: 'spring', bounce: 0.5 });
         }
      } else {
         throwCardAway('down');
      }
    } else if (isRightSwipe) {
      throwCardAway('right');
    } else if (isLeftSwipe) {
      throwCardAway('left');
    } else {
      animate(px, 0, { type: 'spring', bounce: 0.5 });
      animate(py, 0, { type: 'spring', bounce: 0.5 });
    }
  };

  const handleClear = () => {
      const correctSlots = slots.map((s, i) => s === LEVEL_TARGET[i] ? s : '');
      setSlots(correctSlots);
      setPlacementHistory([]);
  };

  const showGameDeck = ['windshield', 'blowing_away', 'story_mode', 'climax_animation', 'playing'].includes(gameState);
  const allowInteraction = ['story_mode', 'playing'].includes(gameState) && transitionStage === 'none' && !isAnimating;
  const isLastStoryCard = gameState === 'story_mode' && swipeCount === STORY_WORDS.length - 1;
  const isCenterDeckVisible = ['windshield', 'blowing_away', 'story_mode', 'playing'].includes(gameState);
  const showNextCard = isCenterDeckVisible && !isLastStoryCard;

  const renderGlowingWord = (word, isHuge = false) => {
    const cornerText = isHuge ? word : word.substring(0, 2);
    return (
      <div className={`absolute inset-0 w-full h-full ${isDarkMode ? 'bg-[#111]' : 'bg-neutral-800'} overflow-hidden rounded-xl z-0 border border-neutral-700`}>
        <motion.div 
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.2, 1] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f7d13d]/20 to-transparent blur-[50px] pointer-events-none"
        />
        <motion.div 
          animate={{ y: [-3, 3, -3] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full flex flex-col items-center justify-center relative z-10"
        >
          <div className="absolute top-4 left-4 flex flex-col items-center justify-center">
            <span className="text-[#f7d13d] text-lg sm:text-xl font-black leading-none">{cornerText}</span>
            <motion.div animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
              <MagicStar className="w-4 h-4 sm:w-5 sm:h-5 text-[#f7d13d] mt-1 drop-shadow-[0_0_8px_rgba(247,209,61,0.8)]" />
            </motion.div>
          </div>
          <div className="relative flex items-center justify-center w-full h-full px-4">
            <h1 className={`text-[#f7d13d] ${isHuge ? 'text-8xl sm:text-9xl' : 'text-4xl sm:text-5xl'} font-black drop-shadow-[0_0_25px_rgba(247,209,61,0.9)] text-center`}>
              {word}
            </h1>
          </div>
          <div className="absolute bottom-4 right-4 flex flex-col items-center justify-center rotate-180">
            <span className="text-[#f7d13d] text-lg sm:text-xl font-black leading-none">{cornerText}</span>
            <motion.div animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
              <MagicStar className="w-4 h-4 sm:w-5 sm:h-5 text-[#f7d13d] mt-1 drop-shadow-[0_0_8px_rgba(247,209,61,0.8)]" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderRules = () => (
    <div className={`absolute inset-0 w-full h-full ${isDarkMode ? 'bg-[#111]' : 'bg-neutral-800'} overflow-hidden rounded-xl border border-neutral-700 flex flex-col items-center justify-center text-center px-6`}>
       <motion.div 
         animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }} 
         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
         className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f7d13d]/20 to-transparent blur-[50px] pointer-events-none"
       />
       <h2 className="text-[#f7d13d] text-3xl font-black uppercase mb-4 drop-shadow-[0_0_15px_rgba(247,209,61,0.8)] relative z-10">
         Read this first:
       </h2>
       <p className="text-white text-lg font-bold uppercase tracking-wider mb-8 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] relative z-10">
         Find a way to escape this game.
       </p>
       <p className="text-[#f7d13d] text-xs font-black uppercase tracking-widest mt-6 animate-pulse relative z-10">Swipe to begin</p>
    </div>
  );

  let activeCardContent;
  let nextCardContent;
  
  if (['intro', 'awaiting_first_swipe', 'boomerang', 'windshield', 'blowing_away'].includes(gameState)) {
     activeCardContent = renderRules();
     nextCardContent = renderGlowingWord(STORY_WORDS[1]);
  } else if (gameState === 'story_mode') {
     if (swipeCount === 0) activeCardContent = renderRules();
     else activeCardContent = renderGlowingWord(STORY_WORDS[swipeCount]);
     const nextIndex = swipeCount + 1;
     nextCardContent = nextIndex < STORY_WORDS.length ? renderGlowingWord(STORY_WORDS[nextIndex]) : null;
  } else if (gameState === 'playing') {
     activeCardContent = deck.length > 0 ? renderGlowingWord(deck[deck.length - 1], true) : null;
     nextCardContent = deck.length > 1 ? renderGlowingWord(deck[deck.length - 2], true) : null;
  } else {
     activeCardContent = null;
     nextCardContent = null;
  }

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i) => ({
      opacity: 1,
      scale: [0.5, 1.3, 1],
      boxShadow: ["0px 0px 0px rgba(247,209,61,0)", "0px 0px 30px rgba(247,209,61,1)", "0px 0px 0px rgba(247,209,61,0)"],
      transition: { delay: i * 0.4, duration: 0.6, ease: "easeInOut" }
    }),
    glow: {
      scale: 1.5,
      boxShadow: "0px 0px 150px 100px rgba(247,209,61,1)",
      backgroundColor: "rgba(247,209,61,1)",
      borderColor: "rgba(247,209,61,1)",
      zIndex: 100,
      transition: { duration: 1, ease: "easeIn" }
    }
  };

  const isFull = slots.every(s => s !== '');
  const isWin = slots.join('') === LEVEL_TARGET.join('');
  const isDeckEmpty = gameState === 'playing' && deck.length === 0;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-50 px-4 pt-10 pb-10 gap-6">
      
      {/* --- DEVELOPER PANEL (Quick Jump Tools) --- */}
      {typeof document !== 'undefined' && createPortal(
        <>
          <button 
            onClick={() => setIsDevMenuOpen(!isDevMenuOpen)}
            className={`fixed top-4 left-4 z-[100000] w-10 h-10 rounded-full flex items-center justify-center border shadow-xl backdrop-blur-md transition-all ${isDevMenuOpen ? 'bg-[#f7d13d] border-[#f7d13d] text-black' : 'bg-neutral-900/80 border-neutral-700 text-[#f7d13d] hover:bg-neutral-800'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>

          <AnimatePresence>
            {isDevMenuOpen && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                className="fixed inset-0 z-[99998]" 
                onClick={() => setIsDevMenuOpen(false)} 
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isDevMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -20, originX: 0, originY: 0 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
                className="fixed top-16 left-4 z-[99999] flex flex-col p-3 bg-black/90 rounded-xl border border-neutral-700 shadow-xl w-[160px] max-h-[75vh] overflow-hidden backdrop-blur-md"
              >
                <h3 className="text-[#f7d13d] text-[10px] font-black tracking-widest mb-3 text-center shrink-0">DEV CONTROLS</h3>
                
                <div className="flex flex-col gap-1.5 overflow-y-auto pr-1 pb-1 custom-scrollbar">
                   <button onClick={() => { forceResetPhysics(); setTransitionStage('none'); playMountAnimation(); setIsDevMenuOpen(false); }} className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs p-1.5 rounded font-bold transition-colors text-left">1. Mount Intro</button>
                   <button onClick={() => { forceResetPhysics(); setTransitionStage('none'); playBoomerangAndWindshield(); setIsDevMenuOpen(false); }} className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs p-1.5 rounded font-bold transition-colors text-left">2. Boomerang</button>
                   <button onClick={() => { forceResetPhysics(); setTransitionStage('none'); setShowCinematic(false); setGameState('story_mode'); setSwipeCount(0); setIsDevMenuOpen(false); }} className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs p-1.5 rounded font-bold transition-colors text-left">3. Story Start</button>
                   <button onClick={() => { forceResetPhysics(); setTransitionStage('none'); setShowCinematic(false); setSwipeCount(6); setGameState('story_mode'); startClimax(); setIsDevMenuOpen(false); }} className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs p-1.5 rounded font-bold transition-colors text-left">4. Story Finish</button>
                   
                   <div className="h-px w-full bg-neutral-700 my-1 shrink-0" />
                   
                   <button onClick={() => { forceResetPhysics(); setTransitionStage('none'); setShowCinematic(false); setGameState('playing'); setCurrentLevel(1); setCompletedLevels(0); setSlots(['', '', '']); setBoxesRevealed(true); setSwipeCount(6); setIsDevMenuOpen(false); }} className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs p-1.5 rounded font-bold transition-colors text-left">5. Play Lvl 1</button>
                   <button onClick={() => { forceResetPhysics(); setTransitionStage('none'); setShowCinematic(false); setGameState('playing'); setCurrentLevel(1); setCompletedLevels(0); setBoxesRevealed(true); setSlots(['L', 'E', 'T']); setSwipeCount(6); setIsDevMenuOpen(false); }} className="bg-[#f7d13d] hover:bg-yellow-300 text-black text-xs p-1.5 rounded font-black transition-colors shadow-[0_0_10px_rgba(247,209,61,0.5)] text-left">6. WIN LVL 1</button>
                   
                   <div className="h-px w-full bg-neutral-700 my-1 shrink-0" />
                   
                   <button onClick={() => { forceResetPhysics(); setTransitionStage('none'); setShowCinematic(false); setGameState('playing'); setCurrentLevel(2); setCompletedLevels(1); setSlots(['', '']); setBoxesRevealed(true); setSwipeCount(6); setIsDevMenuOpen(false); }} className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs p-1.5 rounded font-bold transition-colors text-left">7. Play Lvl 2</button>
                   <button onClick={() => { forceResetPhysics(); setTransitionStage('none'); setShowCinematic(false); setGameState('playing'); setCurrentLevel(2); setCompletedLevels(1); setBoxesRevealed(true); setSlots(['M', 'E']); setSwipeCount(6); setIsDevMenuOpen(false); }} className="bg-[#f7d13d] hover:bg-yellow-300 text-black text-xs p-1.5 rounded font-black transition-colors shadow-[0_0_10px_rgba(247,209,61,0.5)] text-left">8. WIN LVL 2</button>
                   
                   <div className="h-px w-full bg-neutral-700 my-1 shrink-0" />
                   
                   <button onClick={() => { forceResetPhysics(); setTransitionStage('none'); setShowCinematic(false); setGameState('playing'); setCurrentLevel(3); setCompletedLevels(2); setSlots(['', '', '']); setBoxesRevealed(true); setSwipeCount(6); setIsDevMenuOpen(false); }} className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs p-1.5 rounded font-bold transition-colors text-left">9. Play Lvl 3</button>
                   <button onClick={() => { forceResetPhysics(); setTransitionStage('none'); setShowCinematic(false); setGameState('playing'); setCurrentLevel(3); setCompletedLevels(2); setBoxesRevealed(true); setSlots(['O', 'U', 'T']); setSwipeCount(6); setIsDevMenuOpen(false); }} className="bg-blue-500 hover:bg-blue-400 text-white text-xs p-1.5 rounded font-black transition-colors shadow-[0_0_10px_rgba(59,130,246,0.5)] text-left">10. WIN LVL 3</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}

      {/* --- TRANSITION & CLIMAX LAYERS --- */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
           {/* Level 1 & 2 Normal Transition */}
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
                          <div key={lvlIndex} className={`flex flex-col items-center gap-4 ${!isCompleted && !isCurrent ? 'opacity-30' : ''}`}>
                             <span className="font-bold text-xl text-black">LEVEL {lvlIndex + 1}</span>
                             <div className="flex gap-2">
                                {target.map((char, charIdx) => (
                                   <div key={charIdx} className={`w-10 h-12 sm:w-14 sm:h-16 flex items-center justify-center font-black text-2xl rounded-lg border-2 border-black ${isCompleted ? 'bg-black text-[#f7d13d]' : 'bg-transparent text-black'}`}>
                                      {isCompleted ? char : ''}
                                   </div>
                                ))}
                             </div>
                          </div>
                       );
                    })}
                 </div>
              </motion.div>
           )}

           {/* Level 3 Chat Climax */}
           {transitionStage === 'chat_climax' && (
              <motion.div 
                 key="chat-climax"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="fixed inset-0 w-full h-full z-[100000] bg-black flex flex-col pointer-events-auto font-sans"
              >
                 <div className="h-16 border-b border-[#f7d13d]/20 flex items-center justify-center bg-black shrink-0 relative">
                    <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 bg-[#f7d13d]/5 pointer-events-none" />
                    <span className="font-black text-[#f7d13d] tracking-widest text-lg drop-shadow-[0_0_10px_rgba(247,209,61,0.5)]">2 0 2 7</span>
                 </div>
                 
                 <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto pt-6 relative">
                    <AnimatePresence>
                       {chatStep >= 1 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 20, scale: 0.9, originX: 1, originY: 1 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="self-end bg-[#f7d13d] text-black px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%] shadow-[0_4px_15px_rgba(247,209,61,0.3)]"
                          >
                            <div className="flex items-end gap-2">
                              <span className="text-[15px] font-black tracking-wide">LET ME OUT!</span>
                              <span className="text-[11px] text-black/70 mb-0.5 tracking-tighter font-bold">
                                {chatStep >= 2 ? '✓✓' : '✓'}
                              </span>
                            </div>
                          </motion.div>
                       )}
                    </AnimatePresence>

                    <AnimatePresence mode="popLayout">
                       {chatStep === 3 && <TypingIndicator key="typing-1" />}
                       {chatStep >= 4 && <GameBubble key="msg-1">Ok Sure....</GameBubble>}
                       
                       {chatStep === 5 && <TypingIndicator key="typing-2" />}
                       {chatStep >= 6 && <GameBubble key="msg-2">You Played well</GameBubble>}
                       
                       {chatStep === 7 && <TypingIndicator key="typing-3" />}
                       {chatStep >= 8 && <AnimatedDoor key="door-btn" onClick={handleExitGame} />}
                    </AnimatePresence>
                 </div>
              </motion.div>
           )}

           {/* Final Escape Flash */}
           {transitionStage === 'exit_flash' && <PortalExitAnimation key="exit-flash" />}
        </AnimatePresence>,
        document.body
      )}

      
      {/* Top Header */}
      <div className="h-10 flex items-center justify-center w-full relative shrink-0">
         <AnimatePresence>
           {gameState === 'awaiting_first_swipe' && (
             <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`absolute text-sm sm:text-lg font-black uppercase tracking-widest opacity-80 text-center ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
               SWIPE THIS CARD
             </motion.h2>
           )}
         </AnimatePresence>
         <AnimatePresence>
           {['story_mode', 'climax_animation', 'playing'].includes(gameState) && swipeCount > 0 && (
             <motion.div 
               key={currentLevel}
               animate={isLevelTwinkling ? { textShadow: ["0px 0px 0px #fff", "0px 0px 25px #fff", "0px 0px 10px #fff", "0px 0px 30px #fff", "0px 0px 0px #fff"], scale: [1, 1.1, 1] } : {}}
               transition={{ duration: 1 }}
               className={`absolute flex items-center justify-center text-2xl sm:text-3xl font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-black'}`}
             >
               {LEVEL_CHARS.map((char, i) => (
                 <div key={i} className={`flex items-center justify-center w-6 sm:w-8 ${i === 5 ? 'ml-3 sm:ml-4' : ''}`}>
                   <AnimatePresence>
                     {swipeCount > i && (
                       <motion.span initial={{ opacity: 0, scale: 0, filter: "brightness(3)" }} animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }} transition={{ type: "spring", bounce: 0.6, duration: 0.6 }}>
                         {char}
                       </motion.span>
                     )}
                   </AnimatePresence>
                 </div>
               ))}
             </motion.div>
           )}
         </AnimatePresence>
      </div>

      {/* Card Container */}
      <div className="relative w-full aspect-[3/4] max-w-[260px] sm:max-w-[320px] flex items-center justify-center my-auto shrink-0" style={{ perspective: 1200 }}>
        
        {showGameDeck && (
            <div className={`absolute w-full h-full border-4 border-dashed rounded-2xl flex items-center justify-center -z-40 ${isDarkMode ? 'border-neutral-700/50' : 'border-neutral-300/80'}`}>
               {!(gameState === 'playing' && deck.length <= 1) && (
                 <span className={`text-5xl font-black opacity-20 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>?</span>
               )}
            </div>
        )}

        <AnimatePresence>
          {showGameDeck && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="absolute inset-0 z-0 flex items-center justify-center">
              
              {showNextCard && (
                <div className="absolute w-full h-full rounded-2xl -z-10 shadow-md">
                   {nextCardContent}
                </div>
              )}
              
              <AnimatePresence>
                {gameState === 'climax_animation' && refillStack.map((char, i) => (
                   <motion.div key={'refill'+i} initial={{ y: 800, x: (Math.random() - 0.5) * 400, rotateZ: Math.random() * 90 - 45, opacity: 0 }} animate={{ y: 0, x: 0, rotateZ: 0, opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0 } }} transition={{ duration: 0.5, delay: 0.6 + (i * 0.1), type: "spring", bounce: 0.3 }} className="w-full h-full rounded-2xl absolute flex items-center justify-center z-20 shadow-xl">
                     {renderGlowingWord(char, true)}
                     <div className="absolute inset-2 border border-[#f7d13d]/30 rounded-xl pointer-events-none" />
                   </motion.div>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                 {isCenterDeckVisible && !isDeckEmpty && (
                   <motion.div
                     initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0 } }}
                     drag={allowInteraction} dragConstraints={allowInteraction ? { left: 0, right: 0, top: 0, bottom: 0 } : false} dragElastic={1} onDragEnd={handlePlayDragEnd}
                     style={{ x: px, y: py, rotateZ: pRotZ, transformStyle: "preserve-3d" }}
                     className={`w-full h-full rounded-2xl shadow-[0_0_40px_rgba(247,209,61,0.6)] flex flex-col items-center justify-center absolute z-30 ${allowInteraction ? 'cursor-grab active:cursor-grabbing' : ''}`}
                   >
                     {activeCardContent}
                     <div className="absolute inset-2 border border-[#f7d13d]/40 rounded-xl pointer-events-none z-50" />
                   </motion.div>
                 )}
              </AnimatePresence>

              {/* EMPTY DECK REFILL BUTTON */}
              {(gameState === 'playing' && deck.length <= 1) && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-auto">
                     <span className={`text-sm font-bold uppercase tracking-widest mb-6 opacity-60 ${isDarkMode ? 'text-white' : 'text-black'}`}>Out of Cards</span>
                     <button 
                        onClick={handleManualRefill} 
                        className="bg-[#f7d13d] text-black px-6 py-3 rounded-full font-black tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(247,209,61,0.5)] border-2 border-yellow-300 flex items-center gap-2"
                     >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                        REFILL
                     </button>
                 </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {showCinematic && (
          <motion.div drag={gameState === 'awaiting_first_swipe'} dragConstraints={gameState === 'awaiting_first_swipe' ? { left: 0, right: 0, top: 0, bottom: 0 } : false} dragElastic={1} onDragEnd={handleCinematicDragEnd} style={{ x: cx, y: cy, z: cz, scale: cScale, rotateX: cRotX, rotateY: cRotY, rotateZ: cRotZ, opacity: cOpacity, transformStyle: "preserve-3d" }} className={`w-full h-full ${isDarkMode ? 'bg-[#111]' : 'bg-neutral-800'} border-4 border-[#f7d13d] rounded-2xl shadow-[0_0_40px_rgba(247,209,61,0.6)] flex flex-col items-center justify-center absolute overflow-hidden z-[100] ${gameState === 'awaiting_first_swipe' ? 'cursor-grab active:cursor-grabbing' : ''}`}>
            {['windshield', 'blowing_away'].includes(gameState) ? (
              <div className="flex flex-col items-center justify-center h-full w-full px-2 text-center absolute inset-0 z-10 rounded-2xl" style={{ transform: "translateZ(30px)" }}>
                <h2 className="text-[#f7d13d] text-2xl font-black leading-snug drop-shadow-[0_0_15px_rgba(247,209,61,0.8)]" style={{ transform: "translateZ(10px)" }}>
                  Welcome,<br/>You found the<br/>Secret Game
                </h2>
              </div>
            ) : (
              renderGlowingWord('A', true)
            )}
            <div className="absolute inset-2 border border-[#f7d13d]/30 rounded-xl pointer-events-none" />
          </motion.div>
        )}
      </div>

      {/* Target Slots Area */}
      <div className="h-16 w-full flex justify-center gap-2 sm:gap-4 shrink-0 px-2 relative mt-4">
        
        {/* CLEAR Button */}
        <AnimatePresence>
          {isFull && !isWin && transitionStage === 'none' && (
             <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -10 }}
                onClick={() => { if (!isAnimating) handleClear(); }}
                className="absolute -top-16 bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full font-black tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.6)] border-2 border-red-400 z-50 transition-colors"
             >
                CLEAR WRONG
             </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showGameDeck && boxesRevealed && slots.map((char, i) => {
              const isWrong = isFull && char !== LEVEL_TARGET[i];
              return (
                <motion.div 
                  key={`slotContainer-${currentLevel}-${i}`} custom={i} variants={boxVariants} initial="hidden" animate={(isWin && transitionStage !== 'none') ? "glow" : "visible"}
                  className={`relative w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center rounded-lg border-2 transition-colors duration-500 ${
                    char && !isWrong ? 'border-[#f7d13d] bg-[#f7d13d]/20 shadow-[0_0_15px_rgba(247,209,61,0.5)]' 
                    : char && isWrong ? 'border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                    : (isDarkMode ? 'border-neutral-700/30 bg-neutral-800/20' : 'border-neutral-300 bg-neutral-200/50')
                  }`}>
                  
                  <AnimatePresence mode="popLayout">
                     {char && (
                        <motion.span
                           key={`${char}-${i}`}
                           initial={{ scale: 2, opacity: 0, y: -20 }}
                           animate={{ scale: 1, opacity: 1, y: 0 }}
                           exit={{ y: 80, x: (Math.random() - 0.5) * 50, rotateZ: Math.random() * 90 - 45, opacity: 0, scale: 0.5 }}
                           transition={{ type: "spring", bounce: 0.5 }}
                           className={`text-xl sm:text-2xl font-black absolute ${isWrong ? 'text-red-500' : 'text-[#f7d13d]'}`}
                        >
                           {char}
                        </motion.span>
                     )}
                  </AnimatePresence>
                </motion.div>
              );
          })}
        </AnimatePresence>

        {/* UNDO Button */}
        <AnimatePresence>
          {placementHistory.length > 0 && !isWin && transitionStage === 'none' && (
             <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={() => { if (!isAnimating) handleUndo(); }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-neutral-400 hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1 bg-neutral-900/80 px-3 py-1.5 rounded-full border border-neutral-700 shadow-md transition-colors"
             >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
                UNDO
             </motion.button>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
