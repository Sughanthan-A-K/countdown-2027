import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AyudhaPoojaArt({ isDarkMode }) {
  // Cinematic Timeline Steps:
  // 0: Night Battlefield - King close-up lifts sword upward, zoom into gleaming blade
  // 1: Flash Flare -> Border warzone, soldier rapid-firing rifle (daba-daba-daba muzzle flashes)
  // 2: Flying bullet slowed down -> hand swoops in and catches bullet -> morphs into Ink Pen writing
  // 3: Writing pad morphs into Digital Tablet with stylus -> user picks up tab
  // 4: Tablet expands into Modern Laptop -> screen reveals "Happy Pooja Holidays! 🏖️" meme
  // 5: Sudden cut -> Divine Saraswathi with Sacred Veena, Diya & Marigold garland
  // 6: Grand celebration loop (All weapons & tools with flowers, replayable)

  const [scene, setScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    // Cinematic scene durations (ms)
    const sceneTimes = [
      3200, // Scene 0: King close shot & sword elevation + zoom
      2600, // Scene 1: Soldier rapid gunfire & bullet travel
      2600, // Scene 2: Bullet caught in mid-air -> Ink Pen write
      2400, // Scene 3: Paper pad -> Digital Tablet & Stylus
      2500, // Scene 4: Tab -> Laptop open with Pooja Holidays Meme
      3200, // Scene 5: Divine Saraswathi & Sacred Veena
    ];

    if (scene < sceneTimes.length) {
      const timer = setTimeout(() => {
        setScene((prev) => prev + 1);
      }, sceneTimes[scene]);
      return () => clearTimeout(timer);
    }
  }, [scene, isPlaying]);

  const handleReplay = (e) => {
    e.stopPropagation();
    setScene(0);
    setIsPlaying(true);
  };

  const strokeColor = isDarkMode ? '#f5f5f5' : '#1e1e1e';
  const goldColor = '#f59e0b';
  const kumkumColor = '#dc2626';
  const sandalColor = '#fde047';

  return (
    <div
      onClick={handleReplay}
      className="relative w-64 h-52 sm:w-72 sm:h-56 flex flex-col justify-center items-center select-none cursor-pointer group"
      title="Tap to replay Ayudha Pooja Cinematic Evolution"
    >
      {/* Cinematic Phase Tracker */}
      <div
        className="absolute -top-1 px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm z-30 transition-all border flex items-center gap-1.5"
        style={{
          background: isDarkMode ? 'rgba(23, 23, 23, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          color: scene === 4 ? '#ec4899' : goldColor,
          borderColor: isDarkMode ? '#404040' : '#e5e7eb',
        }}
      >
        <span>
          {scene === 0 && "1. Raja Kaalam: Vaal (Sword)"}
          {scene === 1 && "2. Desam: Border Soldier (Rifle)"}
          {scene === 2 && "3. Arivu: Bullet ➔ Pen"}
          {scene === 3 && "4. Digital: Paper ➔ Tab"}
          {scene === 4 && "5. IT Era: Laptop & Pooja Holidays 🏖️"}
          {scene === 5 && "6. Divine: Saraswathi & Veena 🪕"}
          {scene >= 6 && "Ayudha Pooja Vaazhthukkal! ✨"}
        </span>
      </div>

      {/* Main Cinematic Viewport (Screen 16:10 Ratio) */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 border border-neutral-700/50 shadow-inner">
        <AnimatePresence mode="wait">
          {/* ================= SCENE 0: KING CLOSE SHOT & SWORD ELEVATION ================= */}
          {scene === 0 && (
            <motion.div
              key="scene-king-sword"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5, filter: 'brightness(2)' }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-950 via-[#1a0f0a] to-neutral-900"
            >
              {/* Distant battlefield smoke / fire embers */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-red-950/20 to-transparent pointer-events-none" />

              <motion.svg
                viewBox="0 0 240 160"
                className="w-full h-full"
                initial={{ scale: 1, x: 0, y: 0 }}
                animate={{ scale: 1.8, x: -30, y: -25 }}
                transition={{ duration: 2.8, ease: [0.25, 1, 0.5, 1] }}
              >
                {/* King close-up silhouette (Left side profile with crown, beard & intense shoulder) */}
                <g id="king-silhouette">
                  {/* Shoulder / Armor cloak */}
                  <path d="M 0 160 L 0 95 Q 25 80, 55 100 Q 75 115, 85 160 Z" fill="#262626" />
                  {/* Golden Shoulder Guard (Kavacham) */}
                  <path d="M 40 98 Q 60 90, 75 108 L 65 125 Q 48 110, 35 112 Z" fill="#b45309" stroke="#f59e0b" strokeWidth="1.5" />
                  {/* King's Head / Face profile (Facing right towards battlefield) */}
                  <path d="M 15 95 Q 25 75, 42 75 Q 52 82, 54 94 Q 48 102, 38 104 Z" fill="#d97706" />
                  {/* Beard profile */}
                  <path d="M 38 90 L 52 92 L 44 105 L 34 100 Z" fill="#171717" />
                  {/* Intense warrior eye */}
                  <circle cx="44" cy="84" r="1.5" fill="#ffffff" />
                  {/* Royal Crown glint */}
                  <path d="M 22 75 L 26 58 L 34 68 L 44 54 L 50 68 L 54 75 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
                </g>

                {/* Hand coming up from bottom lifting shining royal sword */}
                <motion.g
                  id="king-arm-sword"
                  initial={{ y: 50, rotate: -25, originX: '75px', originY: '140px' }}
                  animate={{ y: 0, rotate: 15 }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                >
                  {/* Muscular Arm */}
                  <path d="M 60 145 Q 75 115, 100 95 L 110 105 Q 85 128, 70 160 Z" fill="#b45309" stroke="#171717" strokeWidth="1.5" />
                  {/* Hand gripping hilt */}
                  <ellipse cx="103" cy="98" rx="8" ry="6" fill="#d97706" stroke="#171717" strokeWidth="1.5" />

                  {/* Shining Royal Sword (Vaal) */}
                  <g id="blade-group">
                    {/* Hilt and Pommel */}
                    <circle cx="92" cy="112" r="5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                    <rect x="94" y="100" width="8" height="14" rx="2" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" transform="rotate(-38 94 100)" />
                    {/* Crossguard */}
                    <rect x="96" y="94" width="22" height="6" rx="2" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" transform="rotate(-38 96 94)" />
                    {/* Blade Body */}
                    <polygon points="106,90 190,24 184,32 102,96" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
                    <line x1="104" y1="93" x2="187" y2="28" stroke="#cbd5e1" strokeWidth="1.5" />
                    {/* Sandhanam & Kumkum on sword */}
                    <circle cx="140" cy="62" r="3" fill={sandalColor} />
                    <circle cx="140" cy="62" r="1.5" fill={kumkumColor} />
                  </g>

                  {/* Blinding Sword Tip Gleam (Triggers the cut transition) */}
                  <motion.g
                    transform="translate(190, 24)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 3], opacity: [0, 1, 1], rotate: [0, 90, 180] }}
                    transition={{ delay: 1.8, duration: 1.1, ease: 'easeIn' }}
                  >
                    <polygon points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4" fill="#ffffff" />
                    <circle cx="0" cy="0" r="10" fill="#fde047" opacity="0.8" />
                  </motion.g>
                </motion.g>
              </motion.svg>
            </motion.div>
          )}

          {/* ================= SCENE 1: SOLDIER RAPID GUNFIRE & BULLET TRAVEL ================= */}
          {scene === 1 && (
            <motion.div
              key="scene-soldier-fire"
              initial={{ opacity: 0, filter: 'brightness(2)' }}
              animate={{ opacity: 1, filter: 'brightness(1)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-full flex items-center justify-center overflow-hidden bg-neutral-900"
            >
              {/* Gunfire strobe flashes across screen */}
              <motion.div
                className="absolute inset-0 bg-amber-500/15 pointer-events-none"
                animate={{ opacity: [0, 0.4, 0, 0.5, 0, 0.3, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />

              <svg viewBox="0 0 240 160" className="w-full h-full">
                {/* Border mountain outpost & sandbags */}
                <path d="M 0 160 L 0 120 L 70 120 L 85 135 L 140 135 L 155 160 Z" fill="#3f3f46" stroke="#27272a" strokeWidth="2" />
                <ellipse cx="35" cy="120" rx="30" ry="10" fill="#71717a" stroke="#27272a" strokeWidth="1.5" />
                <ellipse cx="65" cy="122" rx="28" ry="9" fill="#52525b" stroke="#27272a" strokeWidth="1.5" />

                {/* Soldier with helmet aiming rifle */}
                <g id="soldier" transform="translate(10, 30)">
                  {/* Helmet & Head */}
                  <ellipse cx="50" cy="55" rx="16" ry="14" fill="#3f6212" stroke="#14532d" strokeWidth="1.5" />
                  <rect x="42" y="66" width="16" height="12" fill="#d97706" />
                  {/* Camo Torso */}
                  <path d="M 30 78 L 70 78 L 75 110 L 25 110 Z" fill="#4d7c0f" stroke="#14532d" strokeWidth="1.5" />

                  {/* Rifle Held firmly */}
                  <g id="firing-rifle" transform="translate(45, 65)">
                    {/* Stock */}
                    <rect x="0" y="8" width="22" height="10" rx="2" fill="#78350f" />
                    {/* Body & Magazine */}
                    <rect x="20" y="5" width="40" height="12" rx="2" fill="#1e293b" />
                    <path d="M 35 15 L 30 32 L 40 32 L 43 15 Z" fill="#0f172a" />
                    {/* Barrel */}
                    <rect x="60" y="7" width="55" height="6" fill="#334155" />
                    <rect x="110" y="5" width="8" height="10" fill="#0f172a" />

                    {/* DABA DABA DABA Muzzle Flash animation */}
                    <motion.g
                      transform="translate(120, 10)"
                      animate={{ scale: [0.7, 1.6, 0.8, 1.8, 0.6], opacity: [0.6, 1, 0.4, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 0.18 }}
                    >
                      <polygon points="0,0 12,-10 8,-3 22,0 8,3 12,10" fill="#fef08a" />
                      <polygon points="0,0 8,-6 6,-2 15,0 6,2 8,6" fill="#f97316" />
                    </motion.g>
                  </g>
                </g>

                {/* Golden Bullet flying through air in slow motion */}
                <motion.g
                  id="flying-bullet"
                  initial={{ x: 130, y: 72, scale: 0.6 }}
                  animate={{ x: 215, y: 72, scale: 1.8 }}
                  transition={{ duration: 2.2, ease: 'linear' }}
                >
                  {/* Bullet tracer streak */}
                  <line x1="-30" y1="0" x2="0" y2="0" stroke="#f59e0b" strokeWidth="3" opacity="0.7" />
                  {/* Bullet Head */}
                  <path d="M 0 -3 L 8 -3 Q 14 0, 8 3 L 0 3 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                </motion.g>
              </svg>
            </motion.div>
          )}

          {/* ================= SCENE 2: BULLET CAUGHT IN MID-AIR -> INK PEN WRITING ================= */}
          {scene === 2 && (
            <motion.div
              key="scene-bullet-to-pen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-center justify-center overflow-hidden bg-neutral-900"
            >
              <svg viewBox="0 0 240 160" className="w-full h-full">
                {/* Paper notebook sliding in below */}
                <g id="notebook-paper" transform="translate(40, 85)">
                  <rect x="0" y="0" width="160" height="65" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
                  <line x1="15" y1="20" x2="145" y2="20" stroke="#cbd5e1" strokeWidth="1.5" />
                  <line x1="15" y1="36" x2="145" y2="36" stroke="#cbd5e1" strokeWidth="1.5" />
                  <line x1="15" y1="52" x2="100" y2="52" stroke="#cbd5e1" strokeWidth="1.5" />

                  {/* Animated handwriting text appear */}
                  <motion.path
                    d="M 20 32 Q 35 24, 50 32 T 80 32 T 115 30 T 140 32"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.1, duration: 1.2, ease: 'easeInOut' }}
                  />
                </g>

                {/* Hand reaching in, catching flying bullet & morphing into Pen */}
                <motion.g
                  id="hand-catching-pen"
                  initial={{ x: 230, y: 15 }}
                  animate={{ x: 120, y: 45 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  {/* Fingers grasping */}
                  <ellipse cx="25" cy="20" rx="9" ry="6" fill="#d97706" />
                  <ellipse cx="18" cy="28" rx="8" ry="5" fill="#b45309" />

                  {/* Bullet Morphing into Pen */}
                  <motion.g
                    initial={{ rotate: -15 }}
                    animate={{ rotate: 42 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    {/* Pen Body */}
                    <rect x="5" y="-30" width="14" height="68" rx="3" fill="#0284c7" stroke="#0f172a" strokeWidth="1.5" />
                    <rect x="5" y="-12" width="14" height="5" fill="#f59e0b" />
                    {/* Golden Fountain Nib */}
                    <polygon points="5,-30 12,-46 19,-30" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
                    <line x1="12" y1="-42" x2="12" y2="-32" stroke="#0f172a" strokeWidth="1.2" />
                    {/* Sandhanam Kumkum */}
                    <circle cx="12" cy="0" r="2.5" fill={sandalColor} />
                    <circle cx="12" cy="0" r="1.2" fill={kumkumColor} />
                  </motion.g>
                </motion.g>

                <text x="120" y="32" fill={goldColor} fontSize="11" fontWeight="bold" textAnchor="middle">
                  Bullet ➔ Pen: Arivu dhaan Aayudham! ✒️
                </text>
              </svg>
            </motion.div>
          )}

          {/* ================= SCENE 3: PAPER PAD MORPHS INTO DIGITAL TABLET & STYLUS ================= */}
          {scene === 3 && (
            <motion.div
              key="scene-paper-to-tab"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative w-full h-full flex items-center justify-center overflow-hidden bg-neutral-900"
            >
              <svg viewBox="0 0 240 160" className="w-full h-full">
                {/* Modern Sleek Tablet (iPad / Graphic Tab) */}
                <motion.g
                  id="digital-tablet"
                  transform="translate(45, 25)"
                  initial={{ rotateX: 30 }}
                  animate={{ rotateX: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Tablet Bezel */}
                  <rect x="0" y="0" width="150" height="105" rx="10" fill="#18181b" stroke="#52525b" strokeWidth="2.5" />
                  {/* Screen Glass */}
                  <rect x="7" y="7" width="136" height="91" rx="6" fill="#09090b" />

                  {/* Tablet Front Camera */}
                  <circle cx="75" cy="4" r="1.5" fill="#71717a" />

                  {/* Digital Drawing / UI Elements on Glass */}
                  <rect x="18" y="18" width="55" height="6" rx="2" fill="#38bdf8" />
                  <rect x="18" y="28" width="114" height="2" fill="#27272a" />
                  <path d="M 20 70 Q 50 35, 80 65 T 130 50" fill="none" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="120" cy="80" r="10" fill="#22c55e" opacity="0.8" />

                  {/* Sandhanam Kumkum on Tab top border */}
                  <circle cx="75" cy="2" r="2.5" fill={sandalColor} />
                  <circle cx="75" cy="2" r="1.2" fill={kumkumColor} />
                </motion.g>

                {/* Apple Pencil / Digital Stylus writing on glass */}
                <motion.g
                  id="digital-stylus"
                  initial={{ x: 190, y: 30, rotate: 20 }}
                  animate={{ x: 140, y: 70, rotate: 35 }}
                  transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.2 }}
                >
                  <rect x="0" y="0" width="8" height="60" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                  <polygon points="0,60 4,72 8,60" fill="#cbd5e1" />
                  <circle cx="4" cy="71" r="1" fill="#0284c7" />
                </motion.g>

                <text x="120" y="148" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Paper ➔ Tab & Stylus 📱
                </text>
              </svg>
            </motion.div>
          )}

          {/* ================= SCENE 4: TAB OPENS INTO LAPTOP WITH POOJA HOLIDAYS MEME ================= */}
          {scene === 4 && (
            <motion.div
              key="scene-laptop-meme"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full flex items-center justify-center overflow-hidden bg-neutral-900"
            >
              <svg viewBox="0 0 240 160" className="w-full h-full">
                {/* Modern Laptop Base & Open Display */}
                <g id="laptop-meme-display" transform="translate(30, 15)">
                  {/* Laptop Screen Frame */}
                  <rect x="15" y="5" width="150" height="95" rx="6" fill="#18181b" stroke="#71717a" strokeWidth="2" />
                  {/* Display Screen */}
                  <rect x="20" y="10" width="140" height="85" rx="4" fill="#fdf2f8" />

                  {/* Inside Screen: Pooja Hegde Meme Card */}
                  <g transform="translate(35, 15)">
                    {/* Beach background gradient */}
                    <rect x="0" y="0" width="110" height="55" rx="5" fill="#fbcfe8" />
                    {/* Palm trees / Beach emoji */}
                    <text x="8" y="22" fontSize="16">🏖️</text>
                    <text x="85" y="22" fontSize="16">✨</text>

                    {/* Actress Silhouette with stylish sunglasses & smile */}
                    <g transform="translate(40, 6)">
                      <ellipse cx="15" cy="18" rx="14" ry="15" fill="#fde68a" />
                      {/* Stylish hair */}
                      <path d="M 0 26 C -4 4, 34 4, 30 26 C 26 12, 4 12, 0 26 Z" fill="#171717" />
                      {/* Sunglasses */}
                      <rect x="6" y="14" width="7" height="5" rx="1.5" fill="#0f172a" />
                      <rect x="17" y="14" width="7" height="5" rx="1.5" fill="#0f172a" />
                      <line x1="13" y1="16" x2="17" y2="16" stroke="#0f172a" strokeWidth="1" />
                      {/* Sandhanam Kumkum on actress forehead */}
                      <circle cx="15" cy="10" r="1.8" fill={sandalColor} />
                      <circle cx="15" cy="10" r="0.9" fill={kumkumColor} />
                      {/* Smile */}
                      <path d="M 11 25 Q 15 28, 19 25" stroke="#b91c1c" strokeWidth="1.2" fill="none" />
                    </g>

                    {/* Meme Text on Screen */}
                    <text x="55" y="68" fill="#db2777" fontSize="8.5" fontWeight="900" textAnchor="middle">
                      HAPPY "POOJA" HOLIDAYS! 🏖️
                    </text>
                    <text x="55" y="78" fill="#71717a" fontSize="7" fontWeight="bold" textAnchor="middle">
                      (2026 Gen-Z Meme Special)
                    </text>
                  </g>

                  {/* Sandhanam Kumkum on Laptop apple/center logo */}
                  <circle cx="90" cy="6" r="2.5" fill={sandalColor} />
                  <circle cx="90" cy="6" r="1.2" fill={kumkumColor} />

                  {/* Laptop Keyboard & Trackpad base */}
                  <path d="M 0 100 L 180 100 L 165 118 L 15 118 Z" fill="#52525b" stroke="#27272a" strokeWidth="2" />
                  <rect x="68" y="103" width="44" height="10" rx="2" fill="#3f3f46" />

                  {/* Sevvanthi flower beside keyboard */}
                  <circle cx="20" cy="108" r="5" fill="#f97316" />
                  <circle cx="20" cy="108" r="2.5" fill="#fde047" />
                  <circle cx="160" cy="108" r="5" fill="#fbbf24" />
                  <circle cx="160" cy="108" r="2.5" fill="#ea580c" />
                </g>
              </svg>
            </motion.div>
          )}

          {/* ================= SCENE 5: DIVINE CLIMAX -> SARASWATHI & SACRED VEENA ================= */}
          {scene === 5 && (
            <motion.div
              key="scene-saraswathi"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-t from-amber-950/40 via-neutral-900 to-neutral-950"
            >
              <svg viewBox="0 0 240 160" className="w-full h-full drop-shadow-xl">
                {/* Divine Glowing Sun Aura */}
                <circle cx="120" cy="75" r="56" fill="rgba(245, 158, 11, 0.18)" />

                {/* Holy Books / Granthas */}
                <rect x="65" y="122" width="110" height="14" rx="3" fill="#b91c1c" stroke={strokeColor} strokeWidth="2" />
                <rect x="75" y="110" width="90" height="13" rx="3" fill="#c2410c" stroke={strokeColor} strokeWidth="2" />
                <circle cx="120" cy="116" r="3" fill={sandalColor} />
                <circle cx="120" cy="116" r="1.5" fill={kumkumColor} />

                {/* Saraswathi Sacred Veena (Centered) */}
                <g id="sacred-veena">
                  <rect x="117" y="30" width="6" height="78" rx="2" fill="#78350f" stroke={strokeColor} strokeWidth="2" />
                  <line x1="118.5" y1="34" x2="118.5" y2="104" stroke={goldColor} strokeWidth="1" />
                  <line x1="121.5" y1="34" x2="121.5" y2="104" stroke={goldColor} strokeWidth="1" />
                  <path d="M 120 30 C 113 28, 108 22, 113 16 C 119 12, 126 18, 123 26 Z" fill={goldColor} stroke={strokeColor} strokeWidth="2" />
                  <ellipse cx="120" cy="100" rx="22" ry="16" fill="#9a3412" stroke={strokeColor} strokeWidth="2.5" />
                  <circle cx="120" cy="98" r="3.5" fill={sandalColor} />
                  <circle cx="120" cy="98" r="1.8" fill={kumkumColor} />
                </g>

                {/* Glowing Sacred Diyas / Lamps on Left and Right */}
                <g transform="translate(48, 120)">
                  <ellipse cx="0" cy="0" rx="9" ry="4" fill={goldColor} stroke={strokeColor} strokeWidth="1.5" />
                  <motion.path
                    d="M 0 -2 Q -3 -12, 0 -18 Q 3 -12, 0 -2 Z"
                    fill="#f97316"
                    animate={{ scale: [1, 1.25, 0.9, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                </g>
                <g transform="translate(192, 120)">
                  <ellipse cx="0" cy="0" rx="9" ry="4" fill={goldColor} stroke={strokeColor} strokeWidth="1.5" />
                  <motion.path
                    d="M 0 -2 Q -3 -12, 0 -18 Q 3 -12, 0 -2 Z"
                    fill="#f97316"
                    animate={{ scale: [1.1, 0.9, 1.2, 0.95, 1.1] }}
                    transition={{ repeat: Infinity, duration: 1.3 }}
                  />
                </g>

                <text x="120" y="24" fill={goldColor} fontSize="12" fontWeight="900" textAnchor="middle" className="tracking-widest uppercase">
                  Saraswathi Pooja 🌸
                </text>
              </svg>
            </motion.div>
          )}

          {/* ================= SCENE 6: GRAND FINALE HARMONY ================= */}
          {scene >= 6 && (
            <motion.div
              key="scene-finale"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full flex flex-col items-center justify-center bg-neutral-900/60 p-2"
            >
              <svg viewBox="0 0 240 160" className="w-full h-full drop-shadow-md">
                {/* Aura */}
                <circle cx="120" cy="75" r="58" fill={isDarkMode ? 'rgba(245, 158, 11, 0.12)' : 'rgba(251, 191, 36, 0.2)'} />

                {/* Classical Books & Laptop combo */}
                <rect x="70" y="122" width="100" height="13" rx="3" fill="#b91c1c" stroke={strokeColor} strokeWidth="2" />
                <rect x="80" y="111" width="80" height="12" rx="3" fill="#c2410c" stroke={strokeColor} strokeWidth="2" />

                {/* Sword on Left, Laptop on Right, Veena in Center */}
                <g transform="translate(40, 20) rotate(-22)">
                  <polygon points="40,25 45,95 38,95" fill="#e2e8f0" stroke={strokeColor} strokeWidth="1.5" />
                  <rect x="34" y="93" width="14" height="4" fill={goldColor} />
                  <circle cx="41" cy="60" r="2.5" fill={kumkumColor} />
                </g>

                <g transform="translate(148, 55) rotate(14)">
                  <rect x="0" y="0" width="38" height="26" rx="2" fill="#09090b" stroke={strokeColor} strokeWidth="1.5" />
                  <line x1="6" y1="8" x2="24" y2="8" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx="19" cy="2" r="2" fill={sandalColor} />
                </g>

                {/* Veena Center */}
                <rect x="117" y="28" width="6" height="78" rx="2" fill="#78350f" stroke={strokeColor} strokeWidth="2" />
                <ellipse cx="120" cy="98" rx="22" ry="16" fill="#9a3412" stroke={strokeColor} strokeWidth="2.5" />
                <circle cx="120" cy="96" r="3.5" fill={sandalColor} />
                <circle cx="120" cy="96" r="1.8" fill={kumkumColor} />

                {/* Fresh Sevvanthi flowers shower */}
                <circle cx="60" cy="126" r="6" fill="#f97316" />
                <circle cx="180" cy="126" r="6" fill="#fbbf24" />
                <circle cx="100" cy="132" r="5" fill="#fde047" />
                <circle cx="140" cy="132" r="5" fill="#ea580c" />
              </svg>

              {/* Tap to Replay Pill Prompt */}
              <div className="absolute bottom-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30 flex items-center gap-1">
                <span>🔄 Tap anywhere to replay</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress timeline dots */}
      <div className="flex items-center gap-1.5 mt-2 z-20">
        {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              scene === idx ? 'w-5 bg-amber-500' : 'w-1.5 bg-neutral-400/40 dark:bg-neutral-600/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
