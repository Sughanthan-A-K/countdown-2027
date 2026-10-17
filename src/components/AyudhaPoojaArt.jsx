import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Play sound synthesizers using native Web Audio API (No external sound files required)
const playEraSound = (soundType) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;

    if (soundType === 'sword') {
      // Metallic sword clash / whoosh
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (soundType === 'gun') {
      // Snappy rifle shot
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (soundType === 'pen') {
      // Crisp nib tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.setValueAtTime(1800, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (soundType === 'laptop') {
      // Tech double mechanical click
      [0, 0.08].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now + delay);
        gain.gain.setValueAtTime(0.15, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.06);
      });
    } else if (soundType === 'veena') {
      // Resonant sacred Veena string pluck / temple tone
      [220, 330, 440, 660].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.16, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.85);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.85);
      });
    } else if (soundType === 'meme') {
      // Playful upbeat pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.2); // C6

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    // Audio context may be blocked before interaction, safe fallback
  }
};

export default function AyudhaPoojaArt({ isDarkMode }) {
  // Timeline Stages:
  // 0: Ancient Battlefield (King victorious with shining sword)
  // 1: Indian Army / Border Era (Soldier rifle & bravery)
  // 2: Educational / Pen Era (Ink pen & knowledge revolution)
  // 3: Modern IT Era (Developer laptop with code, sandhanam & Sevvanthi)
  // 4: Divine Saraswathi & Sacred Tools (Veena, Granthas, Spanner & Diyas)
  // 5: Funny 2026 Meme ("Happy Pooja Holidays" meme card)
  // 6: Grand Finale Harmony (All eras combined with celebration)

  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto time-lapse progression
  useEffect(() => {
    if (!isPlaying) return;

    // Steps duration in ms
    const durations = [
      2600, // 0: Sword & King
      2200, // 1: Border Rifle
      2200, // 2: Ink Pen
      2200, // 3: Modern Laptop
      2800, // 4: Sacred Veena
      2400, // 5: Pooja Hegde Meme
    ];

    if (step < durations.length) {
      const timer = setTimeout(() => {
        const nextStep = step + 1;
        setStep(nextStep);

        // Sound trigger for each era
        if (nextStep === 1) playEraSound('gun');
        else if (nextStep === 2) playEraSound('pen');
        else if (nextStep === 3) playEraSound('laptop');
        else if (nextStep === 4) playEraSound('veena');
        else if (nextStep === 5) playEraSound('meme');
        else if (nextStep === 6) playEraSound('veena');
      }, durations[step]);

      return () => clearTimeout(timer);
    }
  }, [step, isPlaying]);

  // Restart sequence when clicked
  const handleReplay = (e) => {
    e.stopPropagation();
    setStep(0);
    setIsPlaying(true);
    playEraSound('sword');
  };

  const strokeColor = isDarkMode ? '#f5f5f5' : '#1e1e1e';
  const goldColor = '#f59e0b';
  const kumkumColor = '#dc2626';
  const sandalColor = '#fde047';

  return (
    <div 
      onClick={handleReplay}
      className="relative w-64 h-52 sm:w-72 sm:h-56 flex flex-col justify-center items-center select-none cursor-pointer group"
      title="Tap to replay Ayudha Pooja Time-lapse"
    >
      {/* Dynamic Evolution Stage Title Badge */}
      <div className="absolute -top-1 px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm z-30 transition-all border flex items-center gap-1.5"
        style={{
          background: isDarkMode ? 'rgba(23, 23, 23, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          color: step === 5 ? '#ec4899' : goldColor,
          borderColor: isDarkMode ? '#404040' : '#e5e7eb'
        }}
      >
        <span>
          {step === 0 && "Era 1: Raja Kaalam (King's Sword)"}
          {step === 1 && "Era 2: Border Kaalam (Soldier's Rifle)"}
          {step === 2 && "Era 3: Arivu Kaalam (Ink Pen)"}
          {step === 3 && "Era 4: Modern IT Kaalam (Code & Laptop)"}
          {step === 4 && "Era 5: Divine Saraswathi (Sacred Veena)"}
          {step === 5 && "Era 6: 2026 Gen-Z (Pooja Holidays!) 😂"}
          {step >= 6 && "Vetri & Thozhiluku Vandhanam! ✨"}
        </span>
      </div>

      {/* Main Animation Stage Screen */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          {/* STAGE 0: Ancient War / King's Shining Sword */}
          {step === 0 && (
            <motion.div
              key="stage-sword"
              initial={{ opacity: 0, x: -60, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.9 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Sunset Battlefield Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-600/15 via-red-500/10 to-transparent rounded-2xl pointer-events-none" />

              <svg viewBox="0 0 220 160" fill="none" className="w-full h-full">
                {/* King silhouette silhouette hand & shoulder on left */}
                <g id="king-silhouette">
                  <path d="M 0 160 L 0 85 Q 25 75, 45 92 Q 62 108, 68 135 L 70 160 Z" fill={isDarkMode ? '#3f3f46' : '#27272a'} />
                  {/* Royal Crown / Armour glint */}
                  <path d="M 12 75 L 18 55 L 26 65 L 34 50 L 42 66 L 48 76 Z" fill={goldColor} stroke={strokeColor} strokeWidth="1.5" />
                  {/* Warrior Arm raising sword */}
                  <path d="M 45 95 Q 65 80, 85 68 L 92 78 Q 72 90, 52 108 Z" fill={isDarkMode ? '#52525b' : '#3f3f46'} stroke={strokeColor} strokeWidth="1.5" />
                </g>

                {/* Shining Royal Sword (Vaal) held upright */}
                <motion.g
                  id="royal-sword"
                  initial={{ rotate: -25, originX: '90px', originY: '75px' }}
                  animate={{ rotate: 12 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  {/* Sword Blade */}
                  <polygon points="90,70 170,18 165,26 86,76" fill="#e2e8f0" stroke={strokeColor} strokeWidth="2" />
                  <line x1="88" y1="73" x2="168" y2="22" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* Sword Hilt & Guard */}
                  <rect x="74" y="70" width="16" height="6" rx="2" fill={goldColor} stroke={strokeColor} strokeWidth="1.5" transform="rotate(-32 74 70)" />
                  <rect x="68" y="77" width="8" height="15" rx="3" fill="#b45309" stroke={strokeColor} strokeWidth="1.5" transform="rotate(-32 68 77)" />
                  <circle cx="63" cy="91" r="5" fill={goldColor} stroke={strokeColor} strokeWidth="1.5" />
                  {/* Chandanam & Kumkum on sword */}
                  <circle cx="125" cy="46" r="3" fill={sandalColor} />
                  <circle cx="125" cy="46" r="1.5" fill={kumkumColor} />

                  {/* Sun / Gleam flash on blade tip */}
                  <motion.g 
                    animate={{ scale: [0.6, 1.3, 0.8], opacity: [0.4, 1, 0.6], rotate: [0, 90, 180] }} 
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    transform="translate(170, 18)"
                  >
                    <polygon points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3" fill="#fef08a" />
                  </motion.g>
                </motion.g>
              </svg>
            </motion.div>
          )}

          {/* STAGE 1: Soldier Border Rifle */}
          {step === 1 && (
            <motion.div
              key="stage-rifle"
              initial={{ opacity: 0, x: -60, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.9 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <svg viewBox="0 0 220 160" fill="none" className="w-full h-full">
                {/* Army Camo / Border mountain hill silhouette */}
                <path d="M 0 160 L 40 120 L 110 140 L 170 105 L 220 135 L 220 160 Z" fill={isDarkMode ? '#27272a' : '#e2e8f0'} />
                
                {/* Service Rifle / INSAS with Sacred Thilakam */}
                <g id="service-rifle" transform="translate(15, 30) rotate(-14 110 80)">
                  {/* Barrel & Muzzle */}
                  <rect x="40" y="70" width="130" height="7" rx="2" fill="#334155" stroke={strokeColor} strokeWidth="2" />
                  <rect x="165" y="68" width="12" height="11" rx="2" fill="#1e293b" stroke={strokeColor} strokeWidth="1.5" />
                  {/* Scope / Sight */}
                  <rect x="85" y="60" width="35" height="8" rx="2" fill="#475569" stroke={strokeColor} strokeWidth="1.5" />
                  {/* Stock & Grip (Wood / Olive) */}
                  <path d="M 40 70 L 10 95 L 22 108 L 52 82 Z" fill="#65a30d" stroke={strokeColor} strokeWidth="2" />
                  {/* Magazine */}
                  <path d="M 85 77 L 78 108 L 92 108 L 96 77 Z" fill="#1e293b" stroke={strokeColor} strokeWidth="2" />
                  {/* Chandanam & Kumkum on rifle */}
                  <circle cx="110" cy="73" r="3.5" fill={sandalColor} />
                  <circle cx="110" cy="73" r="1.8" fill={kumkumColor} />
                  {/* Sevvanthi flower garland touch */}
                  <circle cx="145" cy="74" r="5" fill="#f97316" />
                  <circle cx="145" cy="74" r="2.5" fill="#fde047" />
                </g>

                {/* Sparkling bravery glint */}
                <motion.circle 
                  cx="180" cy="46" r="4" fill={goldColor}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              </svg>
            </motion.div>
          )}

          {/* STAGE 2: Ink Pen & Knowledge Revolution */}
          {step === 2 && (
            <motion.div
              key="stage-pen"
              initial={{ opacity: 0, x: -60, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.9 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <svg viewBox="0 0 220 160" fill="none" className="w-full h-full">
                {/* Vintage Journal / Open Notebook */}
                <g id="notebook" transform="translate(30, 75)">
                  <rect x="0" y="0" width="160" height="60" rx="6" fill={isDarkMode ? '#27272a' : '#f8fafc'} stroke={strokeColor} strokeWidth="2" />
                  <line x1="80" y1="0" x2="80" y2="60" stroke={strokeColor} strokeWidth="2" strokeDasharray="3 2" />
                  {/* Ruled lines */}
                  <line x1="12" y1="18" x2="70" y2="18" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="12" y1="32" x2="65" y2="32" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="90" y1="18" x2="148" y2="18" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="90" y1="32" x2="140" y2="32" stroke="#94a3b8" strokeWidth="1.5" />
                </g>

                {/* Heroic Fountain / Ink Pen angled writing */}
                <g id="ink-pen" transform="translate(100, 15) rotate(32)">
                  {/* Barrel */}
                  <rect x="0" y="20" width="16" height="75" rx="4" fill="#0284c7" stroke={strokeColor} strokeWidth="2" />
                  <rect x="0" y="32" width="16" height="6" fill={goldColor} stroke={strokeColor} strokeWidth="1" />
                  {/* Golden Nib */}
                  <polygon points="0,20 8,2 16,20" fill={goldColor} stroke={strokeColor} strokeWidth="2" />
                  <line x1="8" y1="5" x2="8" y2="16" stroke="#1e293b" strokeWidth="1.5" />
                  {/* Chandanam & Kumkum Bottu */}
                  <circle cx="8" cy="55" r="3" fill={sandalColor} />
                  <circle cx="8" cy="55" r="1.5" fill={kumkumColor} />
                </g>

                {/* Glowing word: "அறிவு / Arivu" spark */}
                <motion.text
                  x="110" y="112"
                  fill={goldColor}
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  அறிவு dhaan Aayudham ✨
                </motion.text>
              </svg>
            </motion.div>
          )}

          {/* STAGE 3: Modern IT Era (Developer Laptop & Code) */}
          {step === 3 && (
            <motion.div
              key="stage-laptop"
              initial={{ opacity: 0, x: -60, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.9 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <svg viewBox="0 0 220 160" fill="none" className="w-full h-full">
                {/* Modern Laptop */}
                <g id="modern-laptop" transform="translate(35, 30)">
                  {/* Screen Frame */}
                  <rect x="15" y="10" width="120" height="75" rx="5" fill="#18181b" stroke={strokeColor} strokeWidth="2" />
                  {/* Inner Display (Dark IDE / Terminal) */}
                  <rect x="20" y="15" width="110" height="65" rx="3" fill="#09090b" />
                  
                  {/* Code editor window dots */}
                  <circle cx="27" cy="22" r="2" fill="#ef4444" />
                  <circle cx="33" cy="22" r="2" fill="#f59e0b" />
                  <circle cx="39" cy="22" r="2" fill="#22c55e" />
                  
                  {/* Colorful Code lines */}
                  <line x1="27" y1="32" x2="65" y2="32" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="33" y1="40" x2="85" y2="40" stroke="#a855f7" strokeWidth="2" />
                  <line x1="33" y1="48" x2="110" y2="48" stroke="#4ade80" strokeWidth="2" />
                  <line x1="27" y1="58" x2="75" y2="58" stroke="#fbbf24" strokeWidth="2" />

                  {/* Laptop Base & Keyboard */}
                  <path d="M 0 85 L 150 85 L 140 96 L 10 96 Z" fill="#71717a" stroke={strokeColor} strokeWidth="2" />
                  <rect x="55" y="87" width="40" height="6" rx="2" fill="#3f3f46" />

                  {/* Sacred Sandhanam & Kumkum on Laptop screen back/border */}
                  <circle cx="75" cy="13" r="3.5" fill={sandalColor} />
                  <circle cx="75" cy="13" r="1.8" fill={kumkumColor} />

                  {/* Sevvanthi flowers beside keyboard */}
                  <circle cx="15" cy="90" r="5" fill="#f97316" />
                  <circle cx="15" cy="90" r="2.5" fill="#fde047" />
                  <circle cx="135" cy="90" r="5" fill="#fbbf24" />
                  <circle cx="135" cy="90" r="2.5" fill="#ea580c" />
                </g>

                <text x="110" y="145" fill={isDarkMode ? '#38bdf8' : '#0284c7'} fontSize="11" fontWeight="bold" textAnchor="middle">
                  {"// 2026 Developer Pooja 💻"}
                </text>
              </svg>
            </motion.div>
          )}

          {/* STAGE 4: Divine Saraswathi (Sacred Veena & Classical Tools) */}
          {step === 4 && (
            <motion.div
              key="stage-veena"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <svg viewBox="0 0 220 160" fill="none" className="w-full h-full drop-shadow-lg">
                {/* Divine Glowing Halo */}
                <circle cx="110" cy="75" r="55" fill="rgba(245, 158, 11, 0.16)" />

                {/* Holy Books / Granthas */}
                <rect x="55" y="120" width="110" height="14" rx="3" fill="#b91c1c" stroke={strokeColor} strokeWidth="2.5" />
                <rect x="65" y="108" width="90" height="13" rx="3" fill="#c2410c" stroke={strokeColor} strokeWidth="2.5" />
                <circle cx="110" cy="114" r="3" fill={sandalColor} />
                <circle cx="110" cy="114" r="1.5" fill={kumkumColor} />

                {/* Chisel & Spanner across behind Veena */}
                <g transform="rotate(-30 75 75)">
                  <rect x="70" y="45" width="8" height="42" rx="2" fill={goldColor} stroke={strokeColor} strokeWidth="2" />
                  <polygon points="70,45 74,34 78,45" fill="#f8fafc" stroke={strokeColor} strokeWidth="2" />
                </g>
                <g transform="rotate(32 145 75)">
                  <path d="M 142 38 C 137 38, 134 42, 134 47 L 140 85 L 146 89 L 152 55 C 156 50, 156 42, 148 38 Z" fill="#94a3b8" stroke={strokeColor} strokeWidth="2" />
                </g>

                {/* Saraswathi Veena */}
                <g id="veena">
                  <rect x="107" y="30" width="6" height="76" rx="2" fill="#78350f" stroke={strokeColor} strokeWidth="2" />
                  <line x1="108.5" y1="34" x2="108.5" y2="102" stroke={goldColor} strokeWidth="1" />
                  <line x1="111.5" y1="34" x2="111.5" y2="102" stroke={goldColor} strokeWidth="1" />
                  <path d="M 110 30 C 103 28, 98 22, 103 16 C 109 12, 116 18, 113 26 Z" fill={goldColor} stroke={strokeColor} strokeWidth="2" />
                  <ellipse cx="110" cy="98" rx="22" ry="16" fill="#9a3412" stroke={strokeColor} strokeWidth="2.5" />
                  <circle cx="110" cy="96" r="3.5" fill={sandalColor} />
                  <circle cx="110" cy="96" r="1.8" fill={kumkumColor} />
                </g>

                {/* Sacred Diya / Vilakku on Left & Right */}
                <g transform="translate(42, 118)">
                  <ellipse cx="0" cy="0" rx="9" ry="4" fill={goldColor} stroke={strokeColor} strokeWidth="1.5" />
                  <motion.path 
                    d="M 0 -2 Q -3 -12, 0 -18 Q 3 -12, 0 -2 Z" 
                    fill="#f97316"
                    animate={{ scale: [1, 1.25, 0.9, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                </g>
                <g transform="translate(178, 118)">
                  <ellipse cx="0" cy="0" rx="9" ry="4" fill={goldColor} stroke={strokeColor} strokeWidth="1.5" />
                  <motion.path 
                    d="M 0 -2 Q -3 -12, 0 -18 Q 3 -12, 0 -2 Z" 
                    fill="#f97316"
                    animate={{ scale: [1.1, 0.9, 1.2, 0.95, 1.1] }}
                    transition={{ repeat: Infinity, duration: 1.3 }}
                  />
                </g>
              </svg>
            </motion.div>
          )}

          {/* STAGE 5: The Famous 2026 Meme Punch (Pooja Hegde Holidays!) */}
          {step === 5 && (
            <motion.div
              key="stage-meme"
              initial={{ opacity: 0, rotate: -8, scale: 0.7 }}
              animate={{ opacity: 1, rotate: [0, 3, -3, 0], scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="relative w-full h-full flex flex-col items-center justify-center p-2"
            >
              {/* Fun meme polaroid frame */}
              <div className="w-48 bg-white text-neutral-900 rounded-xl p-2.5 shadow-2xl border-4 border-pink-400 rotate-1 flex flex-col items-center">
                {/* Illustrated Meme Character (Pooja Hegde portrait style with cooling glass) */}
                <div className="relative w-full h-24 bg-gradient-to-tr from-pink-300 via-rose-200 to-amber-100 rounded-lg flex items-center justify-center overflow-hidden border border-pink-200">
                  {/* Animated Sunglasses / Stylist Actress silhouette */}
                  <svg viewBox="0 0 100 80" className="w-20 h-20">
                    {/* Hair */}
                    <path d="M 20 60 C 15 20, 85 20, 80 60 C 85 40, 75 10, 50 10 C 25 10, 15 40, 20 60 Z" fill="#1e1e1e" />
                    {/* Face */}
                    <ellipse cx="50" cy="45" rx="22" ry="24" fill="#fde68a" />
                    {/* Sandhanam & Kumkum pottu on actress forehead */}
                    <circle cx="50" cy="32" r="3" fill="#fef08a" />
                    <circle cx="50" cy="32" r="1.5" fill="#dc2626" />
                    {/* Trendy Sunglasses */}
                    <rect x="33" y="38" width="14" height="10" rx="3" fill="#0f172a" />
                    <rect x="53" y="38" width="14" height="10" rx="3" fill="#0f172a" />
                    <line x1="47" y1="43" x2="53" y2="43" stroke="#0f172a" strokeWidth="2" />
                    {/* Smile */}
                    <path d="M 42 56 Q 50 63, 58 56" stroke="#b91c1c" strokeWidth="2" fill="none" />
                  </svg>

                  {/* Vacation Palm Tree Sticker */}
                  <div className="absolute top-1 right-2 text-sm">🏖️</div>
                  <div className="absolute bottom-1 left-2 text-xs">✨</div>
                </div>

                {/* Meme Punchline */}
                <div className="text-center mt-2">
                  <p className="text-[11px] font-black tracking-tight text-pink-600 uppercase">
                    Happy "Pooja" Holidays! 🏖️
                  </p>
                  <p className="text-[9px] font-bold text-neutral-500 italic mt-0.5">
                    (2026 Meme Special)
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STAGE 6: Grand Harmony / Climax (All eras unite) */}
          {step >= 6 && (
            <motion.div
              key="stage-harmony"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full h-full flex flex-col items-center justify-center"
            >
              <svg viewBox="0 0 220 160" fill="none" className="w-full h-full drop-shadow-md">
                {/* Aura */}
                <circle cx="110" cy="75" r="58" fill={isDarkMode ? 'rgba(245, 158, 11, 0.12)' : 'rgba(251, 191, 36, 0.2)'} />

                {/* Classical Books & Laptop combo */}
                <rect x="60" y="122" width="100" height="13" rx="3" fill="#b91c1c" stroke={strokeColor} strokeWidth="2" />
                <rect x="70" y="111" width="80" height="12" rx="3" fill="#c2410c" stroke={strokeColor} strokeWidth="2" />

                {/* Sword on Left, Laptop on Right, Veena in Center */}
                {/* Sword */}
                <g transform="translate(30, 20) rotate(-22)">
                  <polygon points="40,25 45,95 38,95" fill="#e2e8f0" stroke={strokeColor} strokeWidth="1.5" />
                  <rect x="34" y="93" width="14" height="4" fill={goldColor} />
                  <circle cx="41" cy="60" r="2.5" fill={kumkumColor} />
                </g>

                {/* Modern Laptop screen on Right */}
                <g transform="translate(138, 55) rotate(14)">
                  <rect x="0" y="0" width="38" height="26" rx="2" fill="#09090b" stroke={strokeColor} strokeWidth="1.5" />
                  <line x1="6" y1="8" x2="24" y2="8" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="6" y1="14" x2="30" y2="14" stroke="#4ade80" strokeWidth="1.5" />
                  <circle cx="19" cy="2" r="2" fill={sandalColor} />
                </g>

                {/* Veena Center */}
                <g id="veena-center">
                  <rect x="107" y="28" width="6" height="78" rx="2" fill="#78350f" stroke={strokeColor} strokeWidth="2" />
                  <line x1="108.5" y1="32" x2="108.5" y2="102" stroke={goldColor} strokeWidth="1" />
                  <line x1="111.5" y1="32" x2="111.5" y2="102" stroke={goldColor} strokeWidth="1" />
                  <ellipse cx="110" cy="98" rx="22" ry="16" fill="#9a3412" stroke={strokeColor} strokeWidth="2.5" />
                  <circle cx="110" cy="96" r="3.5" fill={sandalColor} />
                  <circle cx="110" cy="96" r="1.8" fill={kumkumColor} />
                </g>

                {/* Fresh Flowers & Offerings shower */}
                <circle cx="50" cy="126" r="6" fill="#f97316" />
                <circle cx="170" cy="126" r="6" fill="#fbbf24" />
                <circle cx="90" cy="132" r="5" fill="#fde047" />
                <circle cx="130" cy="132" r="5" fill="#ea580c" />
              </svg>

              {/* Replay Pill Prompt */}
              <div className="absolute bottom-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30 flex items-center gap-1">
                <span>🔄 Tap anywhere to replay</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Dots Indicator */}
      <div className="flex items-center gap-1.5 mt-1.5 z-20">
        {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === idx 
                ? 'w-5 bg-amber-500' 
                : 'w-1.5 bg-neutral-400/40 dark:bg-neutral-600/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
