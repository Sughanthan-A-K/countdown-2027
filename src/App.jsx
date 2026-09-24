import React, { useState, useEffect } from 'react';
import CalendarPage from './components/CalendarPage';
import Onboarding from './components/Onboarding';
import SpeechBubble from './components/SpeechBubble';
import ConfettiBurst from './components/ConfettiBurst';
import { getDaysRemaining, formatDate, addDays, normalizeDate, getDiffDays } from './utils/date';
import { Moon, Sun, Info, X, Copy, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { flushSync } from 'react-dom';

function App() {
  const [actualToday, setActualToday] = useState(() => normalizeDate(new Date()));
  const [calendarDate, setCalendarDate] = useState(() => {
    const isDone = localStorage.getItem('onboardingDone');
    const stored = localStorage.getItem('lastTornDate');
    const today = normalizeDate(new Date());
    if (isDone && stored) {
      return new Date(parseInt(stored, 10));
    }
    return today;
  });

  const [tutorialTears, setTutorialTears] = useState(0);
  const [lastTap, setLastTap] = useState(0);
  const [touchStartPos, setTouchStartPos] = useState(null);
  const [resetCount, setResetCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [infoLang, setInfoLang] = useState('tanglish');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Tutorial State: -1 (Done), 0 (Onboarding), 1 (Learn), 2 (Tearing), 3 (Double Tap), 4 (Epilogue)
  const [tutorialState, setTutorialState] = useState(() => {
    return localStorage.getItem('onboardingDone') ? -1 : 0;
  });
  
  const [bubbleText, setBubbleText] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [epilogueStep, setEpilogueStep] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  // Nag State for returning users
  const [nagSequence, setNagSequence] = useState(null);
  const [nagStep, setNagStep] = useState(0);
  const [hasNaggedThisSession, setHasNaggedThisSession] = useState(() => {
    const today = normalizeDate(new Date()).getTime().toString();
    return localStorage.getItem('lastNaggedDate') === today;
  });

  useEffect(() => {
    const timer = setInterval(() => setActualToday(normalizeDate(new Date())), 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = `${getDaysRemaining(actualToday)} Days to go...`;
  }, [actualToday]);

  const showMsg = (msg, duration) => {
    setBubbleText(msg);
    setShowBubble(true);
    if (duration > 0) {
      return setTimeout(() => setShowBubble(false), duration);
    }
  };

  const highlight = (text) => (
    <span className={`bg-clip-text text-transparent font-black ${
      isDarkMode 
        ? 'bg-gradient-to-r from-blue-800 to-cyan-600' 
        : 'bg-gradient-to-r from-cyan-400 to-blue-500'
    }`}>
      {text}
    </span>
  );

  const epilogueMessages = [
    <>Ok, ithukku apparam unnala calendar pages-a ivlo fast-a kizhikkave mudiyathu...<br/>Daily {highlight('oru date')} thaan kizhikka mudiyum.</>,
    <>Daily morning {highlight('6 AM')}-ku unakku notification um vanthudum....</>,
    <>So hereafter daily unakku oru reminder and alert ah irukkum like innum intha year mudiya {highlight(`${getDaysRemaining(actualToday)} days`)} thaan irukku nu...</>,
    <>So itha use panni ethavathu {highlight('urupidiya sei')} man!</>,
    <>So now, I hand over this calendar to you. {highlight('Make it count!')}</>
  ];

  const missedDaysNags = [
    [<>Enna {highlight('Boss')}, ipdi pazhaya date-laye ukkanthutu irukkinga! Innaiku date-kku vaanga!</>],
    [
      <>Vanthutingala {highlight('Ji')}! Naan ungalukkaaga calendar ready panni kudutha... Neenga ippa thaan vanthu paakkuringa...</>,
      <>{highlight('Epaa')} evlo neram thaan yosippinga, kizhichi up-to-date aakkunga boss!</>
    ],
    [
      <>Enna {highlight('Chief')}... calendar kizhikkave maranthutingala?</>, 
      <>Unga date-a correct panna antha paper-a muthalla {highlight('kizhinga!')}</>
    ],
    [
      <>Oru vela naama thaan app create panni {highlight('thappu pannittomo...')}</>, 
      <>Neenga innum pazhaya date-laye irukkinga! Update aagunga boss, {highlight('kizhinga antha paper-a!')}</>
    ],
    [
      <>Neenga kizhikkira vegatha paatha, 2027 vanthalum calendar {highlight('2026-laye thaan')} irukkum pola!</>, 
      <>Sikiram antha missed dates ellam kizhichi {highlight('catch up')} pannunga!</>
    ],
    [
      <>Enga {highlight('Boss')} poreenga? Calendar kizhikka kooda time illatha alavukku busy aagitingala?</>, 
      <>Sari sari, inaikavathu vanthingale. Antha palaya dates-a {highlight('kizhichi thallunga!')}</>
    ]
  ];

  const askNotification = () => {
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    // Send daily local notification when they open the site (if permission granted)
    if ('serviceWorker' in navigator && 'PushManager' in window && Notification.permission === 'granted' && tutorialState === -1) {
      const subscribePush = async () => {
        try {
          const urlBase64ToUint8Array = (base64String) => {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
            for (let i = 0; i < rawData.length; ++i) { outputArray[i] = rawData.charCodeAt(i); }
            return outputArray;
          };

          const reg = await navigator.serviceWorker.register('/sw.js');
          let sub = await reg.pushManager.getSubscription();
          
          if (!sub) {
            sub = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY)
            });
          }
          
          if (sub) {
            await fetch('/api/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(sub)
            });
          }
        } catch (e) {
          console.error("Push registration failed:", e);
        }
      };
      subscribePush();
    }
  }, [tutorialState, actualToday, calendarDate]);

  // Hint SB for Double Tap Translation
  useEffect(() => {
    let hintTimeout;
    const hasSeenHint = localStorage.getItem('hasSeenTranslateHint');
    const hasDiscovered = localStorage.getItem('hasDiscoveredTranslate');
    
    // Only show if they haven't seen the hint AND haven't discovered it themselves
    if (showInfo && infoLang === 'tanglish' && !hasSeenHint && !hasDiscovered) {
      hintTimeout = setTimeout(() => {
        showMsg(<>Title mela <span className="text-cyan-400">Double Tap</span> panni paathiya? English-la maarum!</>, 0);
        localStorage.setItem('hasSeenTranslateHint', 'true'); // Never show this hint again
      }, 5000);
    }
    return () => {
      clearTimeout(hintTimeout);
    };
  }, [showInfo, infoLang]);

  const handleTitleDoubleTap = () => {
    setInfoLang(prev => prev === 'tanglish' ? 'english' : 'tanglish');
    localStorage.setItem('hasDiscoveredTranslate', 'true');
    setShowBubble(false); // Hide the hint if they double tap
  };

  useEffect(() => {
    let timeout1, timeout2, interval;
    
    if (tutorialState === 1) { 
      if (tutorialTears === 0) {
        timeout1 = setTimeout(() => {
          showMsg(<>Nee evlo venalum...<br/>intha calendar-a kizhichi podalam...<br/>{highlight('Swipe panni')} tear pannu...</>, 0);
          timeout2 = setTimeout(() => {
            interval = setInterval(() => {
              const nags = [
                <>Enna {highlight('Boss')}, Calendar munnadi ninnutu yosikkiringa? Kizhichi thallunga!</>, 
                <>{highlight('Ji')}, antha paper-a kizhicha thaan namakku adutha naal start aagum... try panni paarungalen!</>, 
                <>Oru paper-a kizhikka ivlo thayakkama {highlight('Chief')}? Kandippa nalla feel aagum, kizhichi vidunga!</>,
                <>Epaa, evalo neram thaan yosippinga? {highlight('Dhairiyama')} kizhinga boss!</>
              ];
              const randomNag = nags[Math.floor(Math.random() * nags.length)];
              showMsg(randomNag, 0); 
            }, 5000); 
          }, 8000); // Wait 8 seconds before starting to nag them
        }, 4500); // 4.5 seconds delay to let the confetti and reveal animation finish completely
      } else if (tutorialTears === 1) {
        timeout1 = showMsg(<>Yes apdithaan!<br/>Unnala {highlight('evlo kizhichi poda mudiyumo')} kizhichi podu</>, 0);
        setTutorialState(2);
      }
    } else if (tutorialState === 2) {
      if (tutorialTears >= 10) {
        timeout1 = showMsg(<>Pothum da nee {highlight('kizhichathu!')}</>, 3000);
        timeout2 = setTimeout(() => {
          setTutorialState(3);
        }, 3500);
      }
    } else if (tutorialState === 3) {
      showMsg(<>Kizhikkumbothu semmaya irunthucha...<br/>Seri, ippo Calendar-a {highlight('Double Tap')} pannu....</>, 0); 
    } else if (tutorialState === 4) {
      if (epilogueStep < epilogueMessages.length) {
        showMsg(epilogueMessages[epilogueStep], 0); 
      } else {
        setShowBubble(false);
        const today = normalizeDate(new Date());
        setCalendarDate(today);
        localStorage.setItem('lastTornDate', today.getTime().toString());
        localStorage.setItem('onboardingDone', 'true');
        setTutorialState(-1);
      }
    } else if (tutorialState === -1) {
      const missedDays = getDiffDays(actualToday, calendarDate);
      // Only nag if they missed MORE than 1 day. 
      // 1 day missed is normal (it means they are opening the app to tear yesterday's page).
      if (missedDays > 1 && !hasNaggedThisSession && !nagSequence) {
        const seq = missedDaysNags[Math.floor(Math.random() * missedDaysNags.length)];
        setNagSequence(seq);
        setNagStep(0);
        setHasNaggedThisSession(true);
        localStorage.setItem('lastNaggedDate', actualToday.getTime().toString());
      }
      
      if (nagSequence) {
        if (nagStep < nagSequence.length) {
          showMsg(nagSequence[nagStep], 0);
          
          // Auto advance if there are multiple nagging messages
          if (nagStep < nagSequence.length - 1) {
            timeout1 = setTimeout(() => {
              setNagStep(s => s + 1);
            }, 10000); // 10 seconds delay
          }
        } else {
          // Finished reading nag, hide it so they can tear
          if (bubbleText !== "") setShowBubble(false);
        }
      }
    }
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearInterval(interval);
    };
  }, [tutorialState, tutorialTears, actualToday, epilogueStep, nagSequence, nagStep, calendarDate]);

  const missedDays = getDiffDays(actualToday, calendarDate);

  const handleTear = () => {
    if (tutorialState === 0 || tutorialState === 3 || tutorialState === 4) return;
    if (tutorialState === 2 && tutorialTears >= 10) return;
    if (tutorialState === -1 && missedDays <= 0) return; // Cannot tear today's date!

    if (tutorialState !== -1) {
      setTutorialTears(prev => prev + 1);
      setCalendarDate(prev => addDays(prev, 1));
    } else {
      // Normal Mode
      const nextDate = addDays(calendarDate, 1);
      setCalendarDate(nextDate);
      localStorage.setItem('lastTornDate', nextDate.getTime().toString());
      
      // Hide the nagging SB instantly when they tear
      if (nagSequence) {
        setNagSequence(null);
        setShowBubble(false);
      }
    }
  };

  const handleReset = () => {
    if (tutorialState === 3) {
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]); 
      // Reset calendar date back to normal for epilogue
      setCalendarDate(normalizeDate(new Date()));
      setResetCount(c => c + 1); 
      setTutorialState(4);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    
    // Hide nagging bubble the exact moment they touch the screen to start tearing
    if (tutorialState === -1 && nagSequence) {
      setNagSequence(null);
      setShowBubble(false);
    }
  };

  // Expose to window for CalendarPage (desktop mouse drag support)
  window.hideBubble = () => {
    if (tutorialState === -1 && nagSequence) {
      setNagSequence(null);
      setShowBubble(false);
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartPos) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const distance = Math.sqrt(Math.pow(endX - touchStartPos.x, 2) + Math.pow(endY - touchStartPos.y, 2));
    
    if (distance < 15) {
      if (navigator.vibrate) navigator.vibrate(15); 
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 500 && tapLength > 0) {
        handleReset();
      }
      setLastTap(currentTime);
    }
    setTouchStartPos(null);
  };

  const toggleTheme = (e) => {
    e.stopPropagation();
    if (!document.startViewTransition) {
      setIsDarkMode(!isDarkMode);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode(prev => !prev);
      });
    });

    transition.ready.then(() => {
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      ) + 400; 

      const circle = document.getElementById('mask-circle');
      if (circle) circle.setAttribute('cx', x);
      if (circle) circle.setAttribute('cy', y);

      const duration = 5000; 
      const start = performance.now();

      document.documentElement.animate(
        { opacity: [1, 1] },
        { duration: duration, pseudoElement: "::view-transition-new(root)" }
      );

      function animateMask(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        if (circle) circle.setAttribute('r', ease * radius);
        if (progress < 1) requestAnimationFrame(animateMask);
      }
      requestAnimationFrame(animateMask);
    });
  };

  const isTearLocked = 
    tutorialState === 0 || 
    tutorialState === 3 || 
    tutorialState === 4 || 
    (tutorialState === 2 && tutorialTears >= 10) || 
    (tutorialState === -1 && missedDays <= 0);

  const pages = [0, 1, 2].map((i) => {
    const pageDate = addDays(calendarDate, i);
    return {
      id: `${pageDate.getTime()}-${resetCount}`, 
      dateText: formatDate(pageDate),
      daysRemaining: getDaysRemaining(pageDate),
      index: i
    };
  });

  const getNextHandler = () => {
    if (tutorialState === 4) {
      return () => {
        if (epilogueStep === 1) askNotification();
        setEpilogueStep(s => s + 1);
      };
    }
    return null;
  };

  return (
    <>
      <style>{`
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
        ::view-transition-old(root) { z-index: 1; }
        ::view-transition-new(root) {
          z-index: 2;
          mask: url(#transition-mask);
          -webkit-mask: url(#transition-mask);
        }
      `}</style>
      
      <svg width="0" height="0" className="absolute pointer-events-none z-0">
        <defs>
          <filter id="blocky-noise" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="400" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <mask id="transition-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100vw" height="100vh">
            <rect x="0" y="0" width="100vw" height="100vh" fill="black" />
            <circle id="mask-circle" cx="0" cy="0" r="0" fill="white" filter="url(#blocky-noise)" />
          </mask>
        </defs>
      </svg>

      {tutorialState === 0 && (
        <Onboarding onComplete={() => {
          setTutorialState(1);
          setIsRevealing(true);
          setTimeout(() => setIsRevealing(false), 4500); // 4.5 seconds
        }} />
      )}

      <div>
        <div 
          className={`w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden touch-none ${isDarkMode ? 'bg-black' : 'bg-neutral-100'}`}
          onDoubleClick={handleReset}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ConfettiBurst active={isRevealing} />

          <button 
            onClick={toggleTheme}
            className={`absolute top-8 right-8 z-[50] p-3 rounded-full border-2 shadow-md ${
              isDarkMode 
                ? 'bg-neutral-900 border-neutral-400 text-neutral-200 hover:bg-neutral-800' 
                : 'bg-white border-neutral-800 text-neutral-800 hover:bg-neutral-100'
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            onClick={() => setShowInfo(true)}
            className={`absolute top-8 left-8 z-[50] p-3 rounded-full border-2 shadow-md ${
              isDarkMode 
                ? 'bg-neutral-900 border-neutral-400 text-neutral-200 hover:bg-neutral-800' 
                : 'bg-white border-neutral-800 text-neutral-800 hover:bg-neutral-100'
            }`}
          >
            <Info size={20} />
          </button>

          <AnimatePresence>
            {showInfo && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center p-6 touch-auto"
                onClick={() => setShowInfo(false)}
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={e => e.stopPropagation()}
                  className={`relative w-full max-w-sm rounded-3xl p-8 border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-700 text-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]' : 'bg-white border-neutral-900 text-black'
                  }`}
                >
                  <button 
                    onClick={() => setShowInfo(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-500/20 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  
                  <h2 
                    onDoubleClick={handleTitleDoubleTap}
                    className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4 select-none cursor-pointer"
                  >
                    Countdown 2027
                  </h2>
                  
                  <div className="space-y-6">
                    <p className={`text-sm sm:text-base font-medium leading-relaxed select-none ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      {infoLang === 'tanglish' ? (
                        <>Intha site-oda mukkiyamaana purpose enna na... 2027 kitta namma nerungittu irukkom. So, neenga notification allow panniyiruntha, daily morning unga day-a positive-a start panna ithu oru reminder-a irukkum. Unga time-a proper-a use panna oru chinna indication thaan intha site-oda purpose!</>
                      ) : (
                        <>The main purpose of this site is to remind you that we are getting closer to 2027. If you allow notifications, it will serve as a daily morning reminder to start your day positively. Ultimately, it's just a small indication to help you use your time properly!</>
                      )}
                    </p>
                    
                    <div className={`p-4 rounded-2xl border-2 select-none ${isDarkMode ? 'border-neutral-700 bg-neutral-800' : 'border-neutral-200 bg-neutral-100'}`}>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">
                        {infoLang === 'tanglish' 
                          ? 'Ennoda contact panna, just click my name and text me! :)' 
                          : 'To get in touch with me, just click my name and drop a text! :)'}
                      </p>
                      <a 
                        href="https://www.linkedin.com/in/sughanthan-a-k" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-fit"
                      >
                        <motion.span 
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80"
                        >
                          Sughanthan A K
                        </motion.span>
                      </a>
                    </div>

                    <div className="pt-2 select-none">
                      <p className={`text-xs font-medium mb-3 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {infoLang === 'tanglish'
                          ? 'Ungalukku intha site pudichiruntha, just unga friends-kku share pannunga...'
                          : 'If you like this site, just share it with your friends...'}
                      </p>
                      <button 
                        onClick={handleCopyLink}
                        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all active:scale-95 ${
                          copied 
                            ? 'bg-green-500 text-white border-green-600' 
                            : isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                        }`}
                      >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied 
                          ? (infoLang === 'tanglish' ? 'Link Copied!' : 'Link Copied!') 
                          : (infoLang === 'tanglish' ? 'App Link Copy Pannu' : 'Copy App Link')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <SpeechBubble 
            text={bubbleText} 
            show={showBubble} 
            isDarkMode={isDarkMode} 
            onNext={getNextHandler()}
          />

          <motion.div 
            initial={tutorialState === 1 && tutorialTears === 0 ? { opacity: 0, y: 150, scale: 0.9 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} 
            className="relative w-full max-w-[400px] h-[60vh] min-h-[450px] flex items-center justify-center perspective-[1200px]"
          >
            <AnimatePresence>
              {pages.slice().reverse().map((page) => (
                <CalendarPage
                  key={page.id}
                  dateText={page.dateText}
                  daysRemaining={page.daysRemaining}
                  index={page.index}
                  isTop={page.index === 0}
                  onTear={handleTear}
                  isDarkMode={isDarkMode}
                  isTearLocked={isTearLocked}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default App;
