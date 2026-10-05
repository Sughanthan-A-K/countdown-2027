import React, { useState, useEffect, useRef } from 'react';
import CalendarPage from './components/CalendarPage';
import DiwaliEvent from './components/DiwaliEvent';
import Onboarding from './components/Onboarding';
import SpeechBubble from './components/SpeechBubble';
import ConfettiBurst from './components/ConfettiBurst';
import KeyModal from './components/KeyModal';
import { getDaysRemaining, formatDate, addDays, normalizeDate, getDiffDays } from './utils/date';
import { Moon, Sun, Info, X, Copy, Check, Calendar } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { flushSync } from 'react-dom';

function App() {
  const [actualToday, setActualToday] = useState(() => normalizeDate(new Date()));
  const [calendarDate, setCalendarDate] = useState(() => {
    const isDone = localStorage.getItem('onboardingDone');
    const isDev = localStorage.getItem('isDevMode') === 'true';
    const devStored = localStorage.getItem('devOverrideDate');
    const stored = localStorage.getItem('lastTornDate');
    const today = normalizeDate(new Date());
    
    if (isDev && devStored) {
      return normalizeDate(new Date(parseInt(devStored, 10)));
    }
    if (isDone && stored && !isDev) {
      return new Date(parseInt(stored, 10));
    }
    return today;
  });

  const [hasGandhiKey, setHasGandhiKey] = useState(() => localStorage.getItem('hasGandhiKey') === 'true');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [isWaitingForKey, setIsWaitingForKey] = useState(false);
  const [finalHintStep, setFinalHintStep] = useState('none');
  const [refillingPages, setRefillingPages] = useState([]);

  const [tutorialTears, setTutorialTears] = useState(0);
  const [lastTap, setLastTap] = useState(0);
  const [touchStartPos, setTouchStartPos] = useState(null);
  const [resetCount, setResetCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('isDarkMode');
    return stored !== null ? stored === 'true' : true;
  });
  const [showInfo, setShowInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [globalLang, setGlobalLang] = useState(() => localStorage.getItem('globalLang') || 'tanglish');
  const [isShortScreen, setIsShortScreen] = useState(typeof window !== 'undefined' && window.innerHeight < 550);

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => setIsShortScreen(window.innerHeight < 550);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleInfoClick = (e) => {
    setShowInfo(true);
    if (finalHintStep === 'info') {
      setFinalHintStep('theme');
    }
  };

  // Tutorial State: -1 (Done), 0 (Onboarding), 1 (Learn), 2 (Tearing), 3 (Double Tap), 4 (Epilogue)
  const [tutorialState, setTutorialState] = useState(() => {
    return localStorage.getItem('onboardingDone') ? -1 : 0;
  });
  
  const [bubbleText, setBubbleText] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleAction, setBubbleAction] = useState(null);
  const [bubbleBtnText, setBubbleBtnText] = useState(null);
  const [bubblePosition, setBubblePosition] = useState('bottom');
  const [epilogueStep, setEpilogueStep] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [hasDiscovered, setHasDiscovered] = useState(() => localStorage.getItem('hasDiscoveredTranslate') === 'true');

  const [isDevMode, setIsDevMode] = useState(() => localStorage.getItem('isDevMode') === 'true');
  const [showDiwaliEvent, setShowDiwaliEvent] = useState(false);
  const [diwaliPhase, setDiwaliPhase] = useState(0);
  
  // Diwali Frame states
  const [diwaliRevealed, setDiwaliRevealed] = useState(() => localStorage.getItem('diwaliEventDone_2026') === 'true');
  

  useEffect(() => {
    // 10 = Nov, 8 = 8th
    if (calendarDate.getMonth() === 10 && calendarDate.getDate() === 8) {
      if (isDevMode || !localStorage.getItem('diwaliEventDone_2026')) {
        setDiwaliRevealed(false);
        
        setShowDiwaliEvent(true);
      } else {
        setDiwaliRevealed(true);
        
      }
    }
  }, [calendarDate, isDevMode]);
  const devClickCountRef = useRef(0);
  const devHoldTimerRef = useRef(null);
  const dateInputRef = useRef(null);
  
  const handleDevPillTap = () => {
    if (isDevMode) return;
    devClickCountRef.current += 1;
    if (devClickCountRef.current >= 10) {
      setIsDevMode(true);
      localStorage.setItem('isDevMode', 'true');
      devClickCountRef.current = 0;
      if (navigator.vibrate) navigator.vibrate([100, 100, 100]);
      setBubbleText("Developer Mode Activated!");
      setBubblePosition('bottom');
      setShowBubble(true);
      if (window.devBubbleTimer) clearTimeout(window.devBubbleTimer);
      window.devBubbleTimer = setTimeout(() => setShowBubble(false), 2000);
    }
    
    if (window.devTapResetTimer) clearTimeout(window.devTapResetTimer);
    window.devTapResetTimer = setTimeout(() => {
      devClickCountRef.current = 0;
    }, 2000);
  };

  const handleDevPillHoldStart = () => {
    if (!isDevMode) return;
    if (devHoldTimerRef.current) clearTimeout(devHoldTimerRef.current);
    devHoldTimerRef.current = setTimeout(() => {
      setIsDevMode(false);
      localStorage.setItem('isDevMode', 'false');
      
      const stored = localStorage.getItem('lastTornDate');
      if (stored) {
         setCalendarDate(new Date(parseInt(stored, 10)));
      } else {
         setCalendarDate(normalizeDate(new Date()));
      }

      if (navigator.vibrate) navigator.vibrate([200]);
      setBubbleText("Developer Mode De-Activated!");
      setBubblePosition('bottom');
      setShowBubble(true);
      if (window.devBubbleTimer) clearTimeout(window.devBubbleTimer);
      window.devBubbleTimer = setTimeout(() => setShowBubble(false), 2000);
    }, 5000);
  };

  const handleDevPillHoldEnd = () => {
    if (devHoldTimerRef.current) {
      clearTimeout(devHoldTimerRef.current);
    }
  };

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

  const showMsg = (msg, duration, action = null, btnText = null, position = 'bottom') => {
    setBubbleText(msg);
    setBubbleAction(() => action);
    setBubbleBtnText(btnText);
    setBubblePosition(position);
    setShowBubble(true);
    if (duration > 0) {
      return setTimeout(() => {
        setShowBubble(false);
        setBubbleAction(null);
        setBubbleBtnText(null);
        setBubblePosition('bottom');
      }, duration);
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

  const epilogueMessages = globalLang === 'english' ? [
    <>Ok, after this you won't be able to tear calendar pages this fast...<br/>You can only tear {highlight('one date')} per day.</>,
    <>You'll get a notification every morning at {highlight('6 AM')}....</>,
    <>So hereafter it'll serve as a daily reminder and alert that there are only {highlight(`${getDaysRemaining(actualToday)} days`)} left until this year ends...</>,
    <>So use this and do something {highlight('productive')} man!</>,
    <>So now, I hand over this calendar to you. {highlight('Make it count!')}</>
  ] : [
    <>Ok, ithukku apparam unnala calendar pages-a ivlo fast-a kizhikkave mudiyathu...<br/>Daily {highlight('oru date')} thaan kizhikka mudiyum.</>,
    <>Daily morning {highlight('6 AM')}-ku unakku notification um vanthudum....</>,
    <>So hereafter daily unakku oru reminder and alert ah irukkum like innum intha year mudiya {highlight(`${getDaysRemaining(actualToday)} days`)} thaan irukku nu...</>,
    <>So itha use panni ethavathu {highlight('urupidiya sei')} man!</>,
    <>So now, I hand over this calendar to you. {highlight('Make it count!')}</>
  ];

  const missedDaysNags = globalLang === 'english' ? [
    [<>Hey {highlight('Boss')}, why are you sitting on an old date! Come to today's date!</>],
    [
      <>You finally came {highlight('Bro')}! I prepared this calendar just for you... and you are checking it just now...</>,
      <>{highlight('Bro')} how long are you going to think, tear it and get up-to-date!</>
    ],
    [
      <>Hey {highlight('Chief')}... did you completely forget to tear the calendar?</>, 
      <>To fix your date, first {highlight('tear')} that paper!</>
    ],
    [
      <>Did I make a mistake by {highlight('creating this app...')}</>, 
      <>You're still on an old date! Get updated boss, {highlight('tear that paper!')}</>
    ],
    [
      <>Seeing the speed you tear, even when 2027 comes, your calendar will still be in {highlight('2026')}!</>, 
      <>Quickly {highlight('catch up')} by tearing all those missed dates!</>
    ],
    [
      <>Where are you going {highlight('Boss')}? Are you so busy you don't even have time to tear the calendar?</>, 
      <>Alright, at least you came today. {highlight('Tear away')} those old dates!</>
    ]
  ] : [
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
            const subData = JSON.parse(JSON.stringify(sub));
            subData.language = globalLang; // Include user language
            await fetch('/api/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(subData)
            });
          }
        } catch (e) {
          console.error("Push registration failed:", e);
        }
      };
      subscribePush();
    }
  }, [tutorialState, actualToday, calendarDate, globalLang]);

  // Hint SB for Double Tap Translation
  useEffect(() => {
    let hintTimeout;
    const hasSeenHint = localStorage.getItem('hasSeenTranslateHint');
    
    // Show if they haven't seen the hint (clicked OK) AND haven't discovered it themselves
    if (showInfo && !hasSeenHint && !hasDiscovered) {
      hintTimeout = setTimeout(() => {
        showMsg(
          <><span className="text-cyan-400">Double Tap</span> COUNTDOWN 2027<br/>to change language!</>, 
          0,
          () => {
            localStorage.setItem('hasSeenTranslateHint', 'true'); // Only ignore next time if they click OK
            localStorage.setItem('hasDiscoveredTranslate', 'true');
            setHasDiscovered(true);
            setShowBubble(false);
            setBubbleAction(null);
            setBubbleBtnText(null);
            setBubblePosition('bottom');
          },
          "Got it!",
          "top"
        );
      }, 5000);
    }
    return () => {
      clearTimeout(hintTimeout);
    };
  }, [showInfo, globalLang]);

  // Hide bubble instantly if Info modal is closed
  useEffect(() => {
    if (!showInfo) {
      setShowBubble(false);
      setBubbleAction(null);
      setBubbleBtnText(null);
      setBubblePosition('bottom');
    }
  }, [showInfo]);

  const [lastTapTime, setLastTapTime] = useState(0);

  const handleTitleDoubleTap = () => {
    const newLang = globalLang === 'tanglish' ? 'english' : 'tanglish';
    setGlobalLang(newLang);
    localStorage.setItem('globalLang', newLang);
    localStorage.setItem('hasDiscoveredTranslate', 'true');
    setHasDiscovered(true);
    setShowBubble(false); // Hide the hint if they double tap
    setBubbleAction(null);
    setBubbleBtnText(null);
  };

  const handleTitleClick = (e) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastTapTime < 400) { // 400ms threshold for double tap
      handleTitleDoubleTap();
    }
    setLastTapTime(now);
  };

  useEffect(() => {
    let timeout1, timeout2, interval;
    
    if (tutorialState === 1 && !showKeyModal && !isWaitingForKey) { 
      if (tutorialTears === 0) {
        timeout1 = setTimeout(() => {
          showMsg(globalLang === 'english' ? <>You can tear this calendar...<br/>as much as you want...<br/>{highlight('Swipe')} to tear...</> : <>Nee evlo venalum...<br/>intha calendar-a kizhichi podalam...<br/>{highlight('Swipe panni')} tear pannu...</>, 0);
          timeout2 = setTimeout(() => {
            interval = setInterval(() => {
              const nags = globalLang === 'english' ? [
                <>Hey {highlight('Boss')}, standing in front of the calendar and thinking? Tear it away!</>, 
                <>{highlight('Bro')}, only if you tear that paper our next day will start... try it out!</>, 
                <>So much hesitation to tear a paper {highlight('Chief')}? It'll definitely feel great, tear it off!</>,
                <>Man, how long are you going to think? {highlight('Boldly')} tear it boss!</>
              ] : [
                <>Enna {highlight('Boss')}, Calendar munnadi ninnutu yosikkiringa? Kizhichi thallunga!</>, 
                <>{highlight('Ji')}, antha paper-a kizhicha thaan namakku adutha naal start aagum... try panni paarungalen!</>, 
                <>Oru paper-a kizhikka ivlo thayakkama {highlight('Chief')}? Kandippa nalla feel aagum, kizhichi vidunga!</>,
                <>Epaa, evalo neram thaan yosippinga? {highlight('Dhairiyama')} kizhinga boss!</>
              ];
              const randomNag = nags[Math.floor(Math.random() * nags.length)];
              showMsg(randomNag, 0); 
            }, 8000); 
          }, 8000); // Wait 8 seconds before starting to nag them
        }, 5500); // 5.5 seconds delay to let the confetti and reveal animation finish completely
      } else if (tutorialTears === 1) {
        timeout1 = showMsg(globalLang === 'english' ? <>Yes exactly!<br/>Tear off {highlight('as many as you can')}</> : <>Yes apdithaan!<br/>Unnala {highlight('evlo kizhichi poda mudiyumo')} kizhichi podu</>, 0);
        setTutorialState(2);
      }
    } else if (tutorialState === 2) {
      if (tutorialTears >= 10) {
        timeout1 = showMsg(globalLang === 'english' ? <>That's enough {highlight('tearing!')}</> : <>Pothum da nee {highlight('kizhichathu!')}</>, 3000);
        timeout2 = setTimeout(() => {
          setTutorialState(3);
        }, 3500);
      }
    } else if (tutorialState === 3) {
      showMsg(globalLang === 'english' ? <>Did it feel great to tear it...<br/>Okay, now {highlight('Double Tap')} the Calendar....</> : <>Kizhikkumbothu semmaya irunthucha...<br/>Seri, ippo Calendar-a {highlight('Double Tap')} pannu....</>, 0); 
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
        
        // Show the Info hint bubble (requires manual click to proceed)
        setTimeout(() => {
          setFinalHintStep('info');
        }, 1000);
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
  }, [tutorialState, tutorialTears, actualToday, epilogueStep, nagSequence, nagStep, calendarDate, showKeyModal, isWaitingForKey]);

  const missedDays = getDiffDays(actualToday, calendarDate);

  const handleEyeClick = () => {
    if (!hasGandhiKey) {
       setShowKeyModal(true);
       setShowBubble(false);
       setIsWaitingForKey(false);
       setHasGandhiKey(true);
       localStorage.setItem('hasGandhiKey', 'true');
    }
  };

  const handleTear = () => {
    if (tutorialState === 0 || tutorialState === 3 || tutorialState === 4) return false;
    if (tutorialState === 2 && tutorialTears >= 10) return false;
    if (tutorialState === -1 && !isDevMode && missedDays <= 0) {
       return false;
    }

    const isTopGandhi = calendarDate.getMonth() === 9 && calendarDate.getDate() === 2;
    if (isTopGandhi && !hasGandhiKey) {
       setBubbleText(globalLang === "english" ? "Something is sparkling in the eyes... Tap to see what it is" : "Kannula etho minuminukkuthe... enna nu Tap panni paarunga");
       setBubblePosition('bottom');
       setShowBubble(true);
       setIsWaitingForKey(true);
       return false;
    }

    if (tutorialState !== -1) {
      setTutorialTears(prev => prev + 1);
      setCalendarDate(prev => addDays(prev, 1));
    } else {
      // Normal Mode
      const nextDate = addDays(calendarDate, 1);
      setCalendarDate(nextDate);
      if (!isDevMode) {
        localStorage.setItem('lastTornDate', nextDate.getTime().toString());
      }
      
      // Hide the nagging SB instantly when they tear
      if (nagSequence) {
        setNagSequence(null);
        setShowBubble(false);
      }
    }
  };

  const handleReset = () => {
    if (tutorialState !== 3 && !(tutorialState === -1 && isDevMode)) return;

    if (isDevMode) {
      localStorage.removeItem('devOverrideDate');
    }

    if (navigator.vibrate) navigator.vibrate([50, 50, 50]); 
    setShowBubble(false);

    const today = normalizeDate(new Date());
    // Since calendarDate goes to the future when tearing, calendarDate - today will be positive.
    const diff = Math.abs(getDiffDays(calendarDate, today));

    if (diff > 0) {
      // Trigger cinematic refill animation with actual torn dates
      const burstCount = diff; // No maximum cap, refill all torn pages
      const missingPages = [];
      for (let i = 1; i <= burstCount; i++) {
        const d = addDays(today, diff - i);
        missingPages.push({
          id: `refill-${d.getTime()}`,
          dateText: formatDate(d),
          daysRemaining: getDaysRemaining(d),
          isGandhiJayanti: d.getMonth() === 9 && d.getDate() === 2, isDiwaliDay: d.getMonth() === 10 && d.getDate() === 8, isDiwali: (d.getMonth() === 10 && d.getDate() === 8) && diwaliRevealed,
          
        });
      }
      setRefillingPages(missingPages);
      
      const animationDelay = 600 + (burstCount * 40);
      
      // Delay the actual state reset so they watch the cards fly in
      setTimeout(() => {
        setCalendarDate(today);
        setResetCount(c => c + 1);
        setRefillingPages([]);
        if (tutorialState === 3) setTutorialState(4);
      }, animationDelay + 100); 
    } else {
      setCalendarDate(today);
      setResetCount(c => c + 1);
      if (tutorialState === 3) setTutorialState(4);
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
    
    if (finalHintStep === 'theme') {
      setFinalHintStep('none');
    }

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
      ) + 400; // Large buffer required to push the SVG noise displacement completely off-screen

      const circle = document.getElementById('mask-circle');
      if (circle) circle.setAttribute('cx', x);
      if (circle) circle.setAttribute('cy', y);

      const duration = 3000; 
      const start = performance.now();

      document.documentElement.animate(
        { opacity: [1, 1] },
        { duration: duration, pseudoElement: "::view-transition-new(root)" }
      );

      function animateMask(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        // Linear easing for a perfectly constant, smooth expansion exactly over 3 seconds
        const ease = progress;
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
    (tutorialState === -1 && !isDevMode && missedDays <= 0);

    const pages = [0, 1, 2].map((i) => {
    const pageDate = addDays(calendarDate, i);
    return {
      id: `${pageDate.getTime()}-${resetCount}`, 
      dateText: formatDate(pageDate),
      daysRemaining: getDaysRemaining(pageDate),
      index: i,
      isGandhiJayanti: pageDate.getMonth() === 9 && pageDate.getDate() === 2, isDiwaliDay: pageDate.getMonth() === 10 && pageDate.getDate() === 8, isDiwali: (pageDate.getMonth() === 10 && pageDate.getDate() === 8) && diwaliRevealed,
      
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
  const handleDevDateChange = (e) => {
    if (!e.target.value) return;
    const selected = new Date(e.target.value);
    selected.setHours(0, 0, 0, 0); // Ensure midnight
    setCalendarDate(selected);
    localStorage.setItem('devOverrideDate', selected.getTime().toString());
  };

  return (
    <>
      <style>{`
        ::view-transition {
          pointer-events: none;
        }
        ::view-transition-group(root),
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
          pointer-events: none;
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

      <AnimatePresence>
        {tutorialState === 0 && (
          <Onboarding globalLang={globalLang} setGlobalLang={setGlobalLang} onComplete={() => {
            setTutorialState(1);
            // Delay confetti until the physical drop animation is mostly complete (0.7 seconds)
            setTimeout(() => {
              setIsRevealing(true);
              setTimeout(() => setIsRevealing(false), 4500); // Stop confetti after 4.5 seconds
            }, 700);
          }} />
        )}
      </AnimatePresence>

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
          
          <AnimatePresence>
            {finalHintStep === 'theme' && !showInfo && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                className={`absolute top-[85px] right-8 z-[500] px-4 py-3 rounded-2xl shadow-xl text-xs font-bold border-2 w-max max-w-[220px] text-center flex flex-col items-center gap-2 pointer-events-auto ${isDarkMode ? 'bg-white text-black border-neutral-200' : 'bg-neutral-900 text-white border-neutral-800'}`}
              >
                <span>{globalLang === 'english' ? 'Tap for Dark/Light mode' : 'Dark/Light mode maathikka itha tap pannunga'}</span>
                <button 
                  onClick={() => setFinalHintStep('none')}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-transform active:scale-95 ${
                    isDarkMode ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'
                  }`}
                >
                  Done
                </button>
                <div className={`absolute -top-[8px] right-5 border-l-[8px] border-r-[8px] border-b-[10px] border-transparent ${isDarkMode ? 'border-b-white' : 'border-b-neutral-900'}`} />
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={handleInfoClick}
            className={`absolute top-8 left-8 z-[50] p-3 rounded-full border-2 shadow-md ${
              isDarkMode 
                ? 'bg-neutral-900 border-neutral-400 text-neutral-200 hover:bg-neutral-800' 
                : 'bg-white border-neutral-800 text-neutral-800 hover:bg-neutral-100'
            }`}
          >
            <Info size={20} />
          </button>
          
          {isDevMode && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (dateInputRef.current) {
                  try {
                    dateInputRef.current.showPicker();
                  } catch (err) {
                    dateInputRef.current.focus();
                  }
                }
              }}
              className={`absolute top-8 left-24 z-[50] p-3 rounded-full border-2 shadow-md flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-neutral-900 border-neutral-400 text-neutral-200 hover:bg-neutral-800' 
                  : 'bg-white border-neutral-800 text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              <Calendar size={20} />
              <input 
                ref={dateInputRef}
                type="date" 
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
                min={`${actualToday.getFullYear()}-${String(actualToday.getMonth() + 1).padStart(2, '0')}-${String(actualToday.getDate()).padStart(2, '0')}`}
                max="2027-01-01"
                onChange={handleDevDateChange}
              />
            </button>
          )}

          <AnimatePresence>
            {finalHintStep === 'info' && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                className={`absolute top-[85px] left-8 z-[500] px-4 py-3 rounded-2xl shadow-xl text-xs font-bold border-2 w-max max-w-[220px] text-center flex flex-col items-center gap-2 pointer-events-auto ${isDarkMode ? 'bg-white text-black border-neutral-200' : 'bg-neutral-900 text-white border-neutral-800'}`}
              >
                <span>{globalLang === 'english' ? 'Tap here for Calendar Info' : 'Calendar info theinjikka itha tap pannunga'}</span>
                <button 
                  onClick={() => setFinalHintStep('theme')}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-transform active:scale-95 ${
                    isDarkMode ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'
                  }`}
                >
                  Next
                </button>
                <div className={`absolute -top-[8px] left-5 border-l-[8px] border-r-[8px] border-b-[10px] border-transparent ${isDarkMode ? 'border-b-white' : 'border-b-neutral-900'}`} />
              </motion.div>
            )}
          </AnimatePresence>

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
                  className={`relative flex flex-col w-full max-w-sm max-h-[85vh] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-700 text-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] sm:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]' : 'bg-white border-neutral-900 text-black'
                  }`}
                >
                  <button 
                    onClick={() => setShowInfo(false)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-neutral-500/20 transition-colors z-[600]"
                  >
                    <X size={20} className="sm:w-6 sm:h-6" />
                  </button>
                  <div className="relative flex items-center justify-center mb-4 sm:mb-5 mt-2 sm:mt-0 shrink-0">
                    <motion.h2 
                      onClick={handleTitleClick}
                      animate={showBubble && bubblePosition === 'top' && !hasDiscovered ? {
                        y: [0, -8, 0],
                        color: ["#22d3ee", "#a855f7", "#ec4899", "#22d3ee"],
                        textShadow: [
                          "0px 0px 15px rgba(34,211,238,0.8)", 
                          "0px 0px 15px rgba(168,85,247,0.8)", 
                          "0px 0px 15px rgba(236,72,153,0.8)",
                          "0px 0px 15px rgba(34,211,238,0.8)"
                        ]
                      } : {
                        y: 0,
                        color: isDarkMode ? "#ffffff" : "#000000",
                        textShadow: "0px 0px 0px rgba(0,0,0,0)"
                      }}
                      transition={showBubble && bubblePosition === 'top' && !hasDiscovered ? {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      } : {
                        duration: 0.3
                      }}
                      className="relative z-[500] text-2xl sm:text-3xl font-black uppercase tracking-tight select-none cursor-pointer"
                    >
                      Countdown 2027
                    </motion.h2>

                    <SpeechBubble 
                      text={bubbleText} 
                      show={showBubble && bubblePosition === 'top'} 
                      isDarkMode={isDarkMode} 
                      onNext={bubbleAction}
                      btnText={bubbleBtnText}
                      position={isShortScreen ? "relative-bottom" : "relative-top"}
                    />
                  </div>
                  
                  <div className="overflow-y-auto custom-scrollbar flex-1 pr-1 -mr-1">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={globalLang}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5 sm:space-y-6"
                      >
                        <p className={`text-sm sm:text-base font-medium leading-relaxed select-none ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                          {globalLang === 'tanglish' ? (
                            <>Intha site-oda mukkiyamaana purpose enna na... 2027 kitta namma nerungittu irukkom. So, neenga notification allow panniyiruntha, daily morning unga day-a positive-a start panna ithu oru reminder-a irukkum. Unga time-a proper-a use panna oru chinna indication thaan intha site-oda purpose!</>
                          ) : (
                            <>The main purpose of this site is to remind you that we are getting closer to 2027. If you allow notifications, it will serve as a daily morning reminder to start your day positively. Ultimately, it's just a small indication to help you use your time properly!</>
                          )}
                        </p>
                        
                        <div className={`p-4 rounded-xl sm:rounded-2xl border-2 select-none ${isDarkMode ? 'border-neutral-700 bg-neutral-800' : 'border-neutral-200 bg-neutral-100'}`}>
                          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest opacity-60 mb-2 leading-relaxed">
                            {globalLang === 'tanglish' 
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
                          <p className={`text-xs sm:text-sm font-medium mb-3 leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            {globalLang === 'tanglish'
                              ? 'Ungalukku intha site pudichiruntha, just unga friends-kku share pannunga...'
                              : 'If you like this site, just share it with your friends...'}
                          </p>
                          <button 
                            onClick={handleCopyLink}
                            className={`w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-bold uppercase tracking-widest text-sm transition-all active:scale-95 mb-2 ${
                              copied 
                                ? 'bg-green-500 text-white border-green-600' 
                                : isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                            }`}
                          >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                            {copied 
                              ? (globalLang === 'tanglish' ? 'Link Copied!' : 'Link Copied!') 
                              : (globalLang === 'tanglish' ? 'App Link Copy Pannu' : 'Copy App Link')}
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <SpeechBubble 
            text={bubbleText} 
            show={showBubble && bubblePosition !== 'top'} 
            isDarkMode={isDarkMode} 
            onNext={bubbleAction || getNextHandler()}
            btnText={bubbleBtnText}
            position={bubblePosition}
          />

          <motion.div 
            initial={tutorialState === 1 && tutorialTears === 0 ? { opacity: 0, y: 150, scale: 0.9 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} 
            className="relative w-full max-w-[400px] h-[60vh] min-h-[450px] flex items-center justify-center perspective-[1200px]"
          >
            <AnimatePresence>
                {pages.slice().reverse().map((page) => (
                  <CalendarPage onCalendarReveal={() => { setDiwaliPhase(2); setDiwaliRevealed(true); }} diwaliRevealed={diwaliRevealed} diwaliPhase={diwaliPhase} forceDiwaliMode={diwaliPhase > 0 && page.isDiwaliDay}
                    key={page.id}
                    dateText={page.dateText}
                    daysRemaining={page.daysRemaining}
                    index={page.index}
                    isTop={page.index === 0}
                    onTear={handleTear}
                    onEyeClick={handleEyeClick}
                    isDarkMode={isDarkMode}
                    isGandhiJayanti={page.isGandhiJayanti} isDiwali={page.isDiwali} 
                    
                    hasGandhiKey={hasGandhiKey}
                    isTearLocked={isTearLocked}
                    onDevTap={handleDevPillTap}
                    onDevHoldStart={handleDevPillHoldStart}
                    onDevHoldEnd={handleDevPillHoldEnd}
                  />
                ))}

                {/* Refill Animation Overlay */}
                {refillingPages.length > 0 && refillingPages.map((page, i) => (
                  <motion.div
                    key={page.id}
                    initial={{ 
                      y: "120vh", 
                      x: (Math.random() - 0.5) * 300, 
                      rotateZ: (Math.random() - 0.5) * 60 + (Math.random() > 0.5 ? 20 : -20),
                      scale: 1.1
                    }}
                    animate={{ 
                      y: 0, 
                      x: 0, 
                      rotateZ: 0,
                      scale: 1
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.23, 1, 0.32, 1], // Cinematic deceleration
                      delay: i * 0.04 // Rapid dealing effect
                    }}
                    className="absolute flex items-center justify-center inset-0 pointer-events-none"
                    style={{ zIndex: 100 + i }}
                  >
                    <CalendarPage onCalendarReveal={() => { setDiwaliPhase(2); setDiwaliRevealed(true); }} diwaliRevealed={diwaliRevealed} diwaliPhase={diwaliPhase} forceDiwaliMode={diwaliPhase > 0 && page.isDiwaliDay}
                      dateText={page.dateText}
                      daysRemaining={page.daysRemaining}
                      index={0}
                      isTop={true}
                      onTear={() => {}}
                      onEyeClick={() => {}}
                      isDarkMode={isDarkMode}
                      isGandhiJayanti={page.isGandhiJayanti} isDiwali={page.isDiwali} 
                      
                      hasGandhiKey={hasGandhiKey}
                      globalLang={globalLang}
                      isTearLocked={true}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <KeyModal isOpen={showKeyModal} onClose={() => setShowKeyModal(false)} globalLang={globalLang} />
      {showDiwaliEvent && (
        <DiwaliEvent isDarkMode={isDarkMode} onExplode={() => setDiwaliPhase(1)} onComplete={() => {
          setDiwaliRevealed(true);
          setShowDiwaliEvent(false);
          if (!isDevMode) localStorage.setItem('diwaliEventDone_2026', 'true');
        }} />
      )}
    </>
  );
}

export default App;

