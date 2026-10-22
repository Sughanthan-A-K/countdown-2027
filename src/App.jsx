import React, { useState, useEffect, useRef } from 'react';
import CalendarPage from './components/CalendarPage';
import DiwaliEvent from './components/DiwaliEvent';
import Onboarding from './components/Onboarding';
import SpeechBubble from './components/SpeechBubble';
import ConfettiBurst from './components/ConfettiBurst';
import BirthdaySecretSurprise from './components/BirthdaySecretSurprise';
import KeyModal from './components/KeyModal';
import LokiTimelinePortal from './components/LokiTimelinePortal';
import confetti from 'canvas-confetti';
import { getDaysRemaining, formatDate, addDays, normalizeDate, getDiffDays, getOnboardingTier, isSpecialCardDate, isKeyEligible } from './utils/date';
import { Moon, Sun, Info, X, Copy, Check, Calendar, RotateCcw } from 'lucide-react';
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
  const [hasFirstTearAfterOnboarding, setHasFirstTearAfterOnboarding] = useState(() => {
    return localStorage.getItem('hasFirstTearAfterOnboarding') === 'true';
  });
  const [starVisible, setStarVisible] = useState(() => {
    const isDone = localStorage.getItem('onboardingDone') === 'true';
    const hasTorn = localStorage.getItem('hasFirstTearAfterOnboarding') === 'true';
    const hasKey = localStorage.getItem('hasGandhiKey') === 'true';
    return isDone && hasTorn && !hasKey && isKeyEligible();
  });
  const [shouldAnimateStarFlight, setShouldAnimateStarFlight] = useState(false);
  const [finalHintStep, setFinalHintStep] = useState('none');
  // When an onboarding user completes the tutorial and intro steps (Info + Theme tooltip),
  // wait 2 seconds before unlocking special event cards (Ayudha Pooja, Birthday, Diwali, Gandhi)
  const [isSpecialEventsUnlocked, setIsSpecialEventsUnlocked] = useState(() => {
    return localStorage.getItem('onboardingDone') === 'true';
  });
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

  // Shared Card View detection from URL query params (e.g. ?card=birthday or ?date=2026-10-14)
  const [sharedCardData, setSharedCardData] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const params = new URLSearchParams(window.location.search);
      const cardParam = (params.get('card') || '').toLowerCase();
      const dateParam = params.get('date');

      let target = null;
      let cardType = null;

      if (cardParam === 'birthday' || cardParam === 'oct14' || cardParam === 'bday') {
        target = new Date(2026, 9, 14); // Oct 14
        cardType = 'birthday';
      } else if (cardParam === 'gandhi' || cardParam === 'oct2') {
        target = new Date(2026, 9, 2); // Oct 2
        cardType = 'gandhi';
      } else if (cardParam === 'ayudhapooja' || cardParam === 'ayudha' || cardParam === 'oct19' || cardParam === 'pooja') {
        target = new Date(2026, 9, 19); // Oct 19
        cardType = 'ayudhapooja';
      } else if (cardParam === 'vijayadashami' || cardParam === 'vijaya' || cardParam === 'oct20' || cardParam === 'dashami') {
        target = new Date(2026, 9, 20); // Oct 20
        cardType = 'vijayadashami';
      } else if (cardParam === 'diwali' || cardParam === 'nov8') {
        target = new Date(2026, 10, 8); // Nov 8
        cardType = 'diwali';
      } else if (dateParam) {
        const parts = dateParam.split('-');
        if (parts.length === 3) {
          target = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          if (target.getMonth() === 9 && target.getDate() === 14) cardType = 'birthday';
          else if (target.getMonth() === 9 && target.getDate() === 2) cardType = 'gandhi';
          else if (target.getMonth() === 9 && target.getDate() === 19) cardType = 'ayudhapooja';
          else if (target.getMonth() === 9 && target.getDate() === 20) cardType = 'vijayadashami';
          else if (target.getMonth() === 10 && target.getDate() === 8) cardType = 'diwali';
        }
      }

      const isDev = localStorage.getItem('isDevMode') === 'true';
      const now = new Date();
      now.setHours(23, 59, 59, 999); // Allow viewing shared cards once the festival date has arrived

      if (target && cardType) {
        target.setHours(0, 0, 0, 0);

        // Security check: Block future festival cards from URL params in production!
        // Future cards can ONLY be previewed if Developer Mode is explicitly enabled.
        if (!isDev && target > now) {
          console.warn(`Future card "${cardType}" (${target.toDateString()}) is locked until its release date.`);
          return null;
        }

        return { date: target, type: cardType };
      }
    } catch (e) {
      console.warn('Error parsing shared card query:', e);
    }
    return null;
  });

  const isSharedCardView = !!sharedCardData;
  const effectiveDarkMode = isSharedCardView 
    ? (sharedCardData?.type === 'diwali' ? isDarkMode : false) 
    : isDarkMode;

  const [shareToastText, setShareToastText] = useState("");
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShareSpecialCard = async (type = 'birthday', customDate = null) => {
    let shareUrl = window.location.origin;
    let title = "Countdown 2027";
    let text = "Check out this special card on Countdown 2027!";

    const targetDate = customDate || calendarDate;

    if (type === 'birthday' || (targetDate.getMonth() === 9 && targetDate.getDate() === 14)) {
      shareUrl += '/?card=birthday';
      title = "Sughanthan's Birthday - Countdown 2027 🎂";
      text = globalLang === 'english'
        ? "Hey! Today is Sughanthan's Birthday! Drop your wish in Countdown 2027: "
        : "Hey! Innaiku Sughanthan Birthday! Countdown 2027-la unga wish-a drop pannunga: ";
    } else if (type === 'gandhi' || (targetDate.getMonth() === 9 && targetDate.getDate() === 2)) {
      shareUrl += '/?card=gandhi';
      title = "Happy Gandhi Jayanti - Countdown 2027 👓";
      text = "Happy Gandhi Jayanti on Countdown 2027: ";
    } else if (type === 'ayudhapooja' || (targetDate.getMonth() === 9 && targetDate.getDate() === 19)) {
      shareUrl += '/?card=ayudhapooja';
      title = "Happy Ayudha Pooja - Countdown 2027 🌸";
      text = globalLang === 'english'
        ? "Wishing you and your family a very Happy Ayudha Pooja & Saraswathi Pooja on Countdown 2027: "
        : "Ungalukkum ungal kudumbathirkum iniya Ayudha Pooja & Saraswathi Pooja nalvazhthukkal on Countdown 2027: ";
    } else if (type === 'vijayadashami' || (targetDate.getMonth() === 9 && targetDate.getDate() === 20)) {
      shareUrl += '/?card=vijayadashami';
      title = "Happy Vijayadashami - Countdown 2027 🏹";
      text = globalLang === 'english'
        ? "Wishing you and your family a very Happy Vijayadashami on Countdown 2027: "
        : "Ungalukkum ungal kudumbathirkum iniya Vijayadashami nalvazhthukkal on Countdown 2027: ";
    } else if (type === 'diwali' || (targetDate.getMonth() === 10 && targetDate.getDate() === 8)) {
      shareUrl += '/?card=diwali';
      title = "Happy Diwali - Countdown 2027 🪔";
      text = "Happy Diwali on Countdown 2027: ";
    } else {
      shareUrl += `/?date=${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;
    }

    // Share ONLY the link directly without extra wish text
    if (navigator.share) {
      try {
        await navigator.share({ url: shareUrl });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Share error:', err);
        }
      }
    }

    // Fallback: Copy link
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareToastText(globalLang === 'english' ? "Special Card link copied! 📋" : "Special Card link copy aagiduchi! 📋");
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleStartCountdown = () => {
    const currentSharedType = sharedCardData?.type;
    const currentSharedDate = sharedCardData?.date;

    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('card');
      url.searchParams.delete('date');
      window.history.replaceState({}, '', url.pathname);
    } catch (e) {
      console.warn('URL cleanup error:', e);
    }

    const isDone = localStorage.getItem('onboardingDone') === 'true';

    if (!isDone) {
      // NEW USER: Strictly go through Onboarding Tutorial first!
      // Save the shared date and mark Diwali event witnessed so it continues after onboarding
      if (currentSharedDate) {
        setPendingSharedDate(currentSharedDate);
        if (currentSharedType === 'diwali') {
          localStorage.setItem('diwaliEventDone_2026', 'true');
        } else if (currentSharedType === 'ayudhapooja') {
          localStorage.setItem('ayudhaPoojaEventDone_2026', 'true');
        } else if (currentSharedType === 'vijayadashami') {
          localStorage.setItem('vijayadashamiEventDone_2026', 'true');
        }
      }
      setTutorialState(0);
    } else {
      // EXISTING USER (Onboarding already completed):
      // Navigate directly into the calendar with smooth continuation
      if (currentSharedDate) {
        setCalendarDate(currentSharedDate);
        if (currentSharedType === 'diwali') {
          localStorage.setItem('diwaliEventDone_2026', 'true');
          setDiwaliRevealed(true);
          setDiwaliPhase(2);
          setShowDiwaliEvent(false);
          setIsDarkMode(true);
          localStorage.setItem('isDarkMode', 'true');
        } else if (currentSharedType === 'ayudhapooja') {
          localStorage.setItem('ayudhaPoojaEventDone_2026', 'true');
        } else if (currentSharedType === 'vijayadashami') {
          localStorage.setItem('vijayadashamiEventDone_2026', 'true');
        }
      }
      setTutorialState(-1);
    }

    setSharedCardData(null);
  };

  // Saved shared card date for new user completing onboarding
  const [pendingSharedDate, setPendingSharedDate] = useState(null);

  // Tutorial State: -1 (Done), 0 (Onboarding), 1 (Learn), 2 (Tearing), 3 (Double Tap), 4 (Epilogue)
  const [tutorialState, setTutorialState] = useState(() => {
    if (localStorage.getItem('onboardingDone')) return -1;
    return 0; // Both full and skip tiers start at 0 so user selects their language first
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
  const [lokiCrackStage, setLokiCrackStage] = useState(0); // 0 = normal, 1 = first crack, 2 = deep branching, 3 = full cosmos breach

  // Ensure Loki crack stage is strictly 0 whenever we are NOT on Dec 16
  const isDec16Card = calendarDate.getFullYear() === 2026 && calendarDate.getMonth() === 11 && calendarDate.getDate() === 16;
  useEffect(() => {
    if (!isDec16Card && lokiCrackStage !== 0) {
      setLokiCrackStage(0);
    }
  }, [isDec16Card, lokiCrackStage]);
  
  // Diwali Frame states
  const [diwaliRevealed, setDiwaliRevealed] = useState(() => localStorage.getItem('diwaliEventDone_2026') === 'true');
  const [sharedCtaReady, setSharedCtaReady] = useState(false);

  // Sync Start Countdown button, tooltip, and beacon for festival cards
  useEffect(() => {
    if (isSharedCardView) {
      if (sharedCardData?.type === 'diwali') {
        // Controlled dynamically by 5 Outs burst callback via onCtaReady
        setSharedCtaReady(false);
      } else if (sharedCardData?.type === 'ayudhapooja' || sharedCardData?.type === 'vijayadashami') {
        // For Ayudha Pooja & Vijayadashami: Show buttons and tooltip ONLY after wish video finishes playing!
        setSharedCtaReady(false);
      } else {
        const t = setTimeout(() => {
          setSharedCtaReady(true);
        }, 1200);
        return () => clearTimeout(t);
      }
    }
  }, [isSharedCardView, sharedCardData]);
  
  // Birthday Secret Surprise states
  const [showBirthdaySecret, setShowBirthdaySecret] = useState(false);
  const [birthdaySecretWishes, setBirthdaySecretWishes] = useState(24);

  useEffect(() => {
    // 10 = Nov, 8 = 8th
    if (calendarDate.getMonth() === 10 && calendarDate.getDate() === 8) {
      if (isSpecialEventsUnlocked && !diwaliRevealed) {
        if (isDevMode || !localStorage.getItem('diwaliEventDone_2026')) {
          setDiwaliPhase(0);
          setDiwaliRevealed(false);
          setShowDiwaliEvent(true);
          // Force Dark Mode during the blackout flicker (safely fully black at 3.3s)
          setTimeout(() => {
            setIsDarkMode(true);
            localStorage.setItem('isDarkMode', 'true');
          }, 3300);
        } else {
          setDiwaliRevealed(true);
        }
      }
    } else {
      if (isDevMode) {
        setDiwaliPhase(0);
        setDiwaliRevealed(false);
        setShowDiwaliEvent(false);
      }
    }
  }, [calendarDate, isDevMode, isSpecialEventsUnlocked]);

  useEffect(() => {
    // Shared card Diwali trigger
    if (isSharedCardView && sharedCardData?.type === 'diwali') {
      const alreadyDone = !isDevMode && localStorage.getItem('diwaliEventDone_2026') === 'true';
      if (alreadyDone) {
        // User already witnessed the wish celebration earlier:
        // Skip match & blackout, directly continue the crackers celebration in Dark Mode!
        setIsDarkMode(true);
        setDiwaliPhase(2);
        setDiwaliRevealed(true);
        setShowDiwaliEvent(false);
      } else {
        // First-time viewer: show blackout, match stick & lighting event
        setIsDarkMode(false);
        setDiwaliPhase(0);
        setDiwaliRevealed(false);
        setShowDiwaliEvent(true);
        const timer = setTimeout(() => {
          setIsDarkMode(true);
        }, 3300);
        return () => clearTimeout(timer);
      }
    }
  }, [isSharedCardView, sharedCardData, isDevMode]);
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
          showMsg(
            globalLang === 'english' 
              ? <>You can tear this calendar...<br/>as much as you want...<br/>{highlight('Swipe')} to tear...</> 
              : <>Nee evlo venalum...<br/>intha calendar-a kizhichi podalam...<br/>{highlight('Swipe panni')} tear pannu...</>,
            0
          );
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
        timeout1 = showMsg(
          globalLang === 'english' 
            ? <>Yes exactly!<br/>Tear off {highlight('as many as you can')}</> 
            : <>Yes apdithaan!<br/>Unnala {highlight('evlo kizhichi poda mudiyumo')} kizhichi podu</>, 
          0
        );
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
        const targetDate = pendingSharedDate || today;
        setCalendarDate(targetDate);
        setPendingSharedDate(null);
        localStorage.setItem('lastTornDate', targetDate.getTime().toString());
        localStorage.setItem('onboardingDone', 'true');
        localStorage.setItem('onboardingDoneDate', targetDate.getTime().toString());
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
    }
  };

  const handleStarClick = () => {
    setShowKeyModal(true);
    setShowBubble(false);
  };

  const handleTear = () => {
    if (tutorialState === 0 || tutorialState === 3 || tutorialState === 4) return false;
    if (tutorialState === 2 && tutorialTears >= 10) return false;
    if (tutorialState === -1 && !isDevMode && missedDays <= 0) {
       return false;
    }

    // Dec 16 Tear Block: The card refuses to tear!
    // It remains completely normal until the user starts tapping it.
    if (isDec16Card) {
      return false;
    }

    const isTopGandhi = calendarDate.getMonth() === 9 && calendarDate.getDate() === 2;
    if (isTopGandhi && !hasGandhiKey && isKeyEligible()) {
       setBubbleText(globalLang === "english" ? "Something is sparkling in the eyes... Tap to see what it is" : "Kannula etho minuminukkuthe... enna nu Tap panni paarunga");
       setBubblePosition('bottom');
       setShowBubble(true);
       setIsWaitingForKey(true);
       return false;
    }

    const isStarCardBlocked = tutorialState === -1 && !hasGandhiKey && isKeyEligible() && hasFirstTearAfterOnboarding && !isSpecialCardDate(calendarDate);
    if (isStarCardBlocked) {
       setBubbleText(globalLang === "english" ? "Something is sparkling in the corner... Tap to see what it is" : "Corner-la oru natchathiram minunguthe... enna nu Tap panni paarunga");
       setBubblePosition('bottom');
       setShowBubble(true);
       setStarVisible(true);
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

      // Track first tear after onboarding
      if (!hasFirstTearAfterOnboarding) {
        setHasFirstTearAfterOnboarding(true);
        localStorage.setItem('hasFirstTearAfterOnboarding', 'true');
      }

      // Spawn star on newly revealed card if it is a normal day (Rule 1 & 2) and eligible
      if (!hasGandhiKey && isKeyEligible() && !isSpecialCardDate(nextDate)) {
        setTimeout(() => {
          setShouldAnimateStarFlight(true);
          setStarVisible(true);
        }, 2000);
      } else {
        setStarVisible(false);
      }
    }
  };

  const handleReset = () => {
    if (tutorialState !== 3 && !(tutorialState === -1 && isDevMode)) return;

    if (isDevMode) {
      localStorage.removeItem('devOverrideDate');
    }
    // Always reset Dec 16 crack / timeline state when double tapping to reset back to today
    setLokiCrackStage(0);

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
          isGandhiJayanti: d.getMonth() === 9 && d.getDate() === 2, 
          isDiwaliDay: d.getMonth() === 10 && d.getDate() === 8, 
          isDiwali: (d.getMonth() === 10 && d.getDate() === 8) && diwaliRevealed,
          isBirthday: tutorialState === -1 && d.getMonth() === 9 && d.getDate() === 14,
        });
      }
      setRefillingPages(missingPages);
      
      const animationDelay = 600 + (burstCount * 40);
      
      // Delay the actual state reset so they watch the cards fly in
      setTimeout(() => {
        setCalendarDate(today);
        if (dateInputRef.current) {
          dateInputRef.current.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        }
        setResetCount(c => c + 1);
        setRefillingPages([]);
        if (tutorialState === 3) setTutorialState(4);
      }, animationDelay + 100); 
    } else {
      setCalendarDate(today);
      if (dateInputRef.current) {
        dateInputRef.current.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      }
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
    
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
      handleReset();
    }
    setLastTap(currentTime);
    setTouchStartPos(null);
  };

  const dismissFinalHints = () => {
    setFinalHintStep('none');
    // If completing onboarding intro, wait 2 seconds before activating special event animations!
    setTimeout(() => {
      setIsSpecialEventsUnlocked(true);
    }, 2000);
  };

  const toggleTheme = (e) => {
    e.stopPropagation();
    
    if (finalHintStep === 'theme') {
      dismissFinalHints();
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

    const isTutorialActive = tutorialState !== -1 || !isSpecialEventsUnlocked;
    const isDec16Active = isDec16Card;
    const pages = [0, 1, 2].map((i) => {
    const pageDate = addDays(calendarDate, i);
    const isHiddenBehindDec16 = isDec16Active && i > 0;
    return {
      id: `${pageDate.getTime()}-${resetCount}`, 
      dateText: isHiddenBehindDec16 ? "" : formatDate(pageDate),
      daysRemaining: isHiddenBehindDec16 ? 0 : getDaysRemaining(pageDate),
      index: i,
      isGandhiJayanti: !isTutorialActive && pageDate.getMonth() === 9 && pageDate.getDate() === 2,
      isBirthday: !isTutorialActive && pageDate.getMonth() === 9 && pageDate.getDate() === 14,
      isAyudhaPooja: !isTutorialActive && pageDate.getMonth() === 9 && pageDate.getDate() === 19,
      isVijayadashami: !isTutorialActive && pageDate.getMonth() === 9 && pageDate.getDate() === 20,
      isDiwaliDay: !isTutorialActive && pageDate.getMonth() === 10 && pageDate.getDate() === 8,
      isDiwali: !isTutorialActive && (pageDate.getMonth() === 10 && pageDate.getDate() === 8) && diwaliRevealed,
      isDec16UnderlyingHidden: isHiddenBehindDec16
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
        {tutorialState === 0 && !isSharedCardView && (
          <Onboarding globalLang={globalLang} setGlobalLang={setGlobalLang} tier={getOnboardingTier(actualToday)} onComplete={() => {
            const tier = getOnboardingTier(actualToday);

            // Delay confetti until the physical drop animation is mostly complete (0.7 seconds)
            setTimeout(() => {
              setIsRevealing(true);
              
              // Restore original Popper Confetti logic
              const count = 250;
              const defaults = { origin: { y: 0.6 }, zIndex: 300 };
              
              function fire(particleRatio, opts) {
                confetti(Object.assign({}, defaults, opts, {
                  particleCount: Math.floor(count * particleRatio)
                }));
              }
        
              // Layered realistic explosion
              fire(0.25, { spread: 26, startVelocity: 55 });
              fire(0.2, { spread: 60 });
              fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
              fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
              fire(0.1, { spread: 120, startVelocity: 45 });
              
              // Add a secondary pop after 800ms
              setTimeout(() => {
                fire(0.2, { spread: 80, startVelocity: 40, origin: { y: 0.5 } });
              }, 800);

              setTimeout(() => setIsRevealing(false), 4500); // Stop confetti state after 4.5 seconds

              if (tier === 'skip') {
                // Dec 15 onwards: Language chosen -> direct to today countdown with 2-step SpeechBubble guidance
                const today = normalizeDate(new Date());
                const effectiveToday = isDevMode ? calendarDate : today;
                setCalendarDate(effectiveToday);
                localStorage.setItem('lastTornDate', effectiveToday.getTime().toString());
                localStorage.setItem('onboardingDone', 'true');
                localStorage.setItem('onboardingDoneDate', effectiveToday.getTime().toString());
                setTutorialState(-1);

                setTimeout(() => {
                  // Message 1: Welcome & Purpose with Next button
                  showMsg(
                    globalLang === 'english'
                      ? <>Welcome to the {highlight('Final Countdown of 2026')}!<br/>Make every day count and {highlight('do something good')} every day...</>
                      : <>Welcome to the {highlight('Final Countdown of 2026')}!<br/>Intha Calendar-ah use panni {highlight('do something good')} every day...</>,
                    0,
                    () => {
                      // Message 2: Tear Date rule & Daily Notification with Next button -> Info hint
                      showMsg(
                        globalLang === 'english'
                          ? <>Once the day ends, you can swipe to {highlight('tear today\'s Date')}.<br/>You will get a daily notification!</>
                          : <>Once intha day mudinjathum, neenga innaiku {highlight('Date-ah swipe panni')} kizhichidalam.<br/>Daily ungalukku notification varum!</>,
                        0,
                        () => {
                          askNotification();
                          setShowBubble(false);
                          setFinalHintStep('info');
                        },
                        'Next'
                      );
                    },
                    'Next'
                  );
                }, 1200);
              }
            }, 700);

            if (tier !== 'skip') {
              setTutorialState(1);
            }
          }} />
        )}
      </AnimatePresence>

      <div>
        <div 
          className={`w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden touch-none transition-colors duration-1000 ${
            lokiCrackStage >= 2 ? 'bg-black' : (effectiveDarkMode ? 'bg-black' : 'bg-neutral-100')
          }`}
          onDoubleClick={handleReset}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Full Screen Multiverse Cosmos / Portal Environment (Floods entire viewport for Dec 16) */}
          {isDec16Card && (
            <>
              {/* Cosmos Nebula while cracking */}
              {lokiCrackStage >= 2 && lokiCrackStage < 5 && (
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                  {/* Deep Space Emerald Nebula Backdrop */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: lokiCrackStage >= 3 ? 1 : 0.6, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.35)_0%,_rgba(6,78,59,0.25)_40%,_rgba(0,0,0,0.95)_75%)]"
                  />

                  {/* Glowing green multiverse stars specks */}
                  {[...Array(35)].map((_, i) => (
                    <motion.div
                      key={`cosmos-star-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0.1, 0.9, 0.1],
                        scale: [0.5, 1.3, 0.5]
                      }}
                      transition={{
                        duration: 2 + (i % 4) * 0.7,
                        repeat: Infinity,
                        delay: (i * 0.12) % 2,
                        ease: "easeInOut"
                      }}
                      className="absolute rounded-full bg-emerald-200 shadow-[0_0_10px_#34d399]"
                      style={{
                        width: `${(i % 3) + 1.5}px`,
                        height: `${(i % 3) + 1.5}px`,
                        top: `${(i * 19) % 95}%`,
                        left: `${(i * 29) % 95}%`
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Loki Time Portal on stage 5: Rendered directly at root level with fixed inset-0 to ensure 100% full screen coverage without any top/bottom dead bars */}
              {lokiCrackStage >= 5 && (
                <LokiTimelinePortal />
              )}
            </>
          )}
          {/* Confetti (Popper) is now triggered via canvas-confetti function call */}

          {!isSharedCardView && (
            <>
              {isDevMode && (
                <button 
                  onClick={() => {
                    // Reset Vijayadashami / special festival progress in dev mode on single click
                    try {
                      localStorage.removeItem('vijayadashamiEventDone_2026');
                      localStorage.removeItem('ayudhaPoojaEventDone_2026');
                    } catch (e) {}

                    const stored = localStorage.getItem('devOverrideDate');
                    if (stored) {
                      const selected = new Date(parseInt(stored, 10));
                      selected.setHours(0, 0, 0, 0);
                      // Create a new fresh Date object reference to trigger complete React state re-render
                      setCalendarDate(new Date(selected.getTime()));
                    } else {
                      const today = normalizeDate(new Date());
                      setCalendarDate(new Date(today.getTime()));
                    }

                    if (navigator.vibrate) navigator.vibrate([50]);
                  }}
                  className={`absolute top-8 right-24 z-[50] p-3 rounded-full border-2 shadow-md ${
                    isDarkMode 
                      ? 'bg-neutral-900 border-neutral-400 text-neutral-200 hover:bg-neutral-800' 
                      : 'bg-white border-neutral-800 text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  <RotateCcw size={20} />
                </button>
              )}

              {/* Theme Toggle Button (Flies away like glass explosion on Dec 16 Stage 4) */}
              <motion.button 
                onClick={toggleTheme}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                animate={
                  isDec16Card && lokiCrackStage >= 4 ? {
                    opacity: 0,
                    x: 200,
                    y: -180,
                    scale: 0.2,
                    rotate: 180,
                    transition: { duration: 1.2, ease: [0.15, 0.85, 0.35, 1] }
                  } : {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0
                  }
                }
                style={{
                  pointerEvents: isDec16Card && lokiCrackStage >= 4 ? 'none' : 'auto'
                }}
                className={`absolute top-8 right-8 z-[50] p-3 rounded-full border-2 shadow-md ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-400 text-neutral-200 hover:bg-neutral-800' 
                    : 'bg-white border-neutral-800 text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              
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
                      onClick={dismissFinalHints}
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

              {/* Info Button (Flies away like glass explosion on Dec 16 Stage 4) */}
              <motion.button 
                onClick={handleInfoClick}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                animate={
                  isDec16Card && lokiCrackStage >= 4 ? {
                    opacity: 0,
                    x: -200,
                    y: -180,
                    scale: 0.2,
                    rotate: -180,
                    transition: { duration: 1.2, ease: [0.15, 0.85, 0.35, 1] }
                  } : {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0
                  }
                }
                style={{
                  pointerEvents: isDec16Card && lokiCrackStage >= 4 ? 'none' : 'auto'
                }}
                className={`absolute top-8 left-8 z-[50] p-3 rounded-full border-2 shadow-md ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-400 text-neutral-200 hover:bg-neutral-800' 
                    : 'bg-white border-neutral-800 text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                <Info size={20} />
              </motion.button>
              
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
                    value={`${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}-${String(calendarDate.getDate()).padStart(2, '0')}`}
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
            </>
          )}

          <AnimatePresence>
            {!isSharedCardView && showInfo && (
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

          {!isSharedCardView && (
            <SpeechBubble 
              text={bubbleText} 
              show={showBubble && bubblePosition !== 'top'} 
              isDarkMode={isDarkMode} 
              onNext={bubbleAction || getNextHandler()}
              btnText={bubbleBtnText}
              position={bubblePosition}
            />
          )}

          <motion.div 
            initial={tutorialState === 1 && tutorialTears === 0 ? { opacity: 0, y: 150, scale: 0.9 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} 
            className={`relative w-full max-w-[400px] h-[60vh] min-h-[450px] flex items-center justify-center perspective-[1200px] ${diwaliPhase >= 1 ? 'z-[1000]' : 'z-[60]'}`}
          >
            <AnimatePresence>
                {isSharedCardView ? (
                  <CalendarPage
                    key={`shared-${sharedCardData.date.getTime()}`}
                    dateText={formatDate(sharedCardData.date)}
                    daysRemaining={getDaysRemaining(sharedCardData.date)}
                    index={0}
                    isTop={true}
                    onTear={() => false}
                    onEyeClick={handleEyeClick}
                    isDarkMode={effectiveDarkMode}
                    isGandhiJayanti={sharedCardData.type === 'gandhi'}
                    isBirthday={sharedCardData.type === 'birthday'}
                    isAyudhaPooja={sharedCardData.type === 'ayudhapooja'}
                    isVijayadashami={sharedCardData.type === 'vijayadashami'}
                    onBirthdaySecret={(count) => {
                      setBirthdaySecretWishes(count);
                      setShowBirthdaySecret(true);
                    }}
                    isDiwali={sharedCardData.type === 'diwali' && diwaliRevealed}
                    forceDiwaliMode={sharedCardData.type === 'diwali' && diwaliPhase > 0}
                    diwaliPhase={sharedCardData.type === 'diwali' ? diwaliPhase : 0}
                    diwaliRevealed={sharedCardData.type === 'diwali' ? diwaliRevealed : false}
                    onCalendarReveal={() => { setDiwaliPhase(2); setTimeout(() => setDiwaliRevealed(true), 1200); }}
                    hasGandhiKey={hasGandhiKey}
                    hasCornerStar={false}
                    onStarClick={() => {}}
                    shouldAnimateStarFlight={false}
                    isTearLocked={true}
                    onShareSpecialCard={() => handleShareSpecialCard(sharedCardData.type, sharedCardData.date)}
                    globalLang={globalLang}
                    isSharedCardView={true}
                    forceShowShareHint={sharedCtaReady}
                    onCtaReady={() => setSharedCtaReady(true)}
                  />
                ) : (
                  pages.slice().reverse().map((page) => (
                    <CalendarPage onCalendarReveal={() => { setDiwaliPhase(2); setTimeout(() => setDiwaliRevealed(true), 1200); }} diwaliRevealed={diwaliRevealed} diwaliPhase={diwaliPhase} forceDiwaliMode={diwaliPhase > 0 && page.isDiwaliDay}
                      key={page.id}
                      dateText={page.dateText}
                      daysRemaining={page.daysRemaining}
                      index={page.index}
                      isTop={page.index === 0}
                      onTear={handleTear}
                      onEyeClick={handleEyeClick}
                      isDarkMode={isDarkMode}
                      isGandhiJayanti={page.isGandhiJayanti}
                      isBirthday={page.isBirthday}
                      isAyudhaPooja={page.isAyudhaPooja}
                      isVijayadashami={page.isVijayadashami}
                      onBirthdaySecret={(count) => {
                        setBirthdaySecretWishes(count);
                        setShowBirthdaySecret(true);
                      }}
                      isDiwali={page.isDiwali} 
                      hasGandhiKey={hasGandhiKey}
                      hasCornerStar={page.index === 0 && starVisible && !isSpecialCardDate(calendarDate)}
                      onStarClick={handleStarClick}
                      shouldAnimateStarFlight={shouldAnimateStarFlight}
                      isTearLocked={isTearLocked}
                      onDevTap={handleDevPillTap}
                      onDevHoldStart={handleDevPillHoldStart}
                      onDevHoldEnd={handleDevPillHoldEnd}
                      onShareSpecialCard={page.index === 0 ? () => handleShareSpecialCard(
                        page.isBirthday ? 'birthday' : page.isGandhiJayanti ? 'gandhi' : page.isAyudhaPooja ? 'ayudhapooja' : page.isVijayadashami ? 'vijayadashami' : 'diwali',
                        addDays(calendarDate, page.index)
                      ) : undefined}
                      globalLang={globalLang}
                      isDec16Blocked={page.index === 0 && isDec16Card}
                      lokiCrackStage={page.index === 0 ? lokiCrackStage : 0}
                      isDec16UnderlyingHidden={page.isDec16UnderlyingHidden}
                      onLokiCardTap={() => {
                        if (navigator.vibrate) navigator.vibrate(30);
                        setLokiCrackStage(prev => {
                          const next = Math.min(prev + 1, 4);
                          // On 4th tap (green sunbeam light rays creeping through cracks):
                          // Switch into Dark Mode, and after 2.0s trigger Stage 5 (natural glass shatter into portal!)
                          if (next === 4) {
                            setIsDarkMode(true);
                            localStorage.setItem('isDarkMode', 'true');
                            setTimeout(() => {
                              setLokiCrackStage(5);
                            }, 1500);
                          }
                          return next;
                        });
                      }}
                    />
                  ))
                )}

                {/* Refill Animation Overlay */}
                {!isSharedCardView && refillingPages.length > 0 && refillingPages.map((page, i) => (
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
                    style={{ zIndex: 1200 + i }}
                  >
                    <CalendarPage onCalendarReveal={() => { setDiwaliPhase(2); setTimeout(() => setDiwaliRevealed(true), 1200); }} diwaliRevealed={diwaliRevealed} diwaliPhase={diwaliPhase} forceDiwaliMode={diwaliPhase > 0 && page.isDiwaliDay}
                      dateText={page.dateText}
                      daysRemaining={page.daysRemaining}
                      index={0}
                      isTop={true}
                      onTear={() => {}}
                      onEyeClick={() => {}}
                      isDarkMode={isDarkMode}
                      isGandhiJayanti={page.isGandhiJayanti}
                      isBirthday={page.isBirthday}
                      isDiwali={page.isDiwali} 
                      hasGandhiKey={hasGandhiKey}
                      globalLang={globalLang}
                      isTearLocked={true}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>

          {/* Start Countdown 2027 Button (Reserved slot below the card for shared card view to eliminate layout shift) */}
          {isSharedCardView && (
            <div className="h-16 mt-4 flex items-center justify-center z-50 pointer-events-auto">
              <AnimatePresence>
                {sharedCtaReady && (
                  <motion.div
                    key="shared-start-countdown-cta"
                    initial={{ opacity: 0, scale: 0.88, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: 12 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStartCountdown}
                      className="px-6 py-3 rounded-full bg-neutral-900 text-white font-bold text-sm sm:text-base tracking-wide shadow-xl hover:bg-neutral-800 active:bg-black transition-all flex items-center gap-2.5 cursor-pointer border border-neutral-700/40"
                    >
                      <span>Start Countdown 2027</span>
                      <span className="text-amber-400 font-black text-base">➔</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Special Card Link Copied Toast */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[600] px-5 py-2.5 rounded-full bg-neutral-900/95 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-2xl backdrop-blur-md border border-neutral-700/60 pointer-events-none flex items-center gap-2"
          >
            <span>{shareToastText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <KeyModal 
        isOpen={showKeyModal} 
        onClose={() => {
          setShowKeyModal(false);
          setHasGandhiKey(true);
          localStorage.setItem('hasGandhiKey', 'true');
          setStarVisible(false);
          setShowBubble(false);
          setIsWaitingForKey(false);
        }} 
        globalLang={globalLang} 
      />
      <BirthdaySecretSurprise 
        isOpen={showBirthdaySecret} 
        onClose={() => setShowBirthdaySecret(false)} 
        wishesCount={birthdaySecretWishes} 
        isDarkMode={effectiveDarkMode} 
      />
      {showDiwaliEvent && (
        <DiwaliEvent isDarkMode={effectiveDarkMode} onExplode={() => setDiwaliPhase(1)} onComplete={() => {
          setDiwaliRevealed(true);
          setShowDiwaliEvent(false);
          if (!isDevMode && !isSharedCardView) localStorage.setItem('diwaliEventDone_2026', 'true');
        }} />
      )}
    </>
  );
}

export default App;

