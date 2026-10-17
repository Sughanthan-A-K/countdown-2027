import React from 'react';
import { motion } from 'framer-motion';

export default function AyudhaPoojaArt({ isDarkMode }) {
  const strokeColor = isDarkMode ? '#f5f5f5' : '#1e1e1e';
  const goldColor = '#f59e0b';
  const yellowColor = '#fbbf24';
  const kumkumColor = '#dc2626';
  const sandalColor = '#fde047';

  return (
    <div className="relative w-48 h-36 sm:w-56 sm:h-44 flex justify-center items-center select-none">
      <svg 
        viewBox="0 0 220 160" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full drop-shadow-md"
      >
        {/* Soft Sacred Aura Background */}
        <circle cx="110" cy="75" r="50" fill={isDarkMode ? 'rgba(245, 158, 11, 0.08)' : 'rgba(251, 191, 36, 0.15)'} />

        {/* 1. Sacred Books / Holy Grantha at the base (Saraswathi Pooja) */}
        <g id="sacred-books">
          {/* Bottom Book */}
          <rect x="55" y="118" width="110" height="14" rx="3" fill="#b91c1c" stroke={strokeColor} strokeWidth="2.5" />
          <line x1="58" y1="125" x2="162" y2="125" stroke={goldColor} strokeWidth="2" strokeDasharray="4 3" />
          
          {/* Top Book */}
          <rect x="65" y="106" width="90" height="13" rx="3" fill="#c2410c" stroke={strokeColor} strokeWidth="2.5" />
          <line x1="68" y1="112" x2="152" y2="112" stroke={sandalColor} strokeWidth="1.5" />

          {/* Chandanam & Kumkum Bottu on Books */}
          <circle cx="110" cy="112" r="3" fill={sandalColor} />
          <circle cx="110" cy="112" r="1.5" fill={kumkumColor} />
          <circle cx="110" cy="125" r="3" fill={sandalColor} />
          <circle cx="110" cy="125" r="1.5" fill={kumkumColor} />
        </g>

        {/* 2. Symbolic Tools of Craft & Work (Ayudha Pooja) */}
        {/* Classical Chisel / Pen across left */}
        <g id="pen-chisel" transform="rotate(-30 75 75)">
          <rect x="70" y="45" width="8" height="42" rx="2" fill={goldColor} stroke={strokeColor} strokeWidth="2" />
          <polygon points="70,45 74,34 78,45" fill="#f8fafc" stroke={strokeColor} strokeWidth="2" />
          {/* Kumkum thilakam */}
          <circle cx="74" cy="62" r="2" fill={kumkumColor} />
        </g>

        {/* Engineering Spanner / Modern Instrument across right */}
        <g id="spanner" transform="rotate(32 145 75)">
          <path 
            d="M 142 38 C 137 38, 134 42, 134 47 C 134 50, 136 53, 138 55 L 140 85 C 140 87, 142 89, 144 89 L 146 89 C 148 89, 150 87, 150 85 L 152 55 C 154 53, 156 50, 156 47 C 156 42, 153 38, 148 38 C 146 41, 144 41, 142 38 Z" 
            fill="#94a3b8" 
            stroke={strokeColor} 
            strokeWidth="2" 
          />
          {/* Chandanam & Kumkum on spanner */}
          <circle cx="145" cy="70" r="2" fill={sandalColor} />
          <circle cx="145" cy="70" r="1" fill={kumkumColor} />
        </g>

        {/* 3. Saraswathi Veena (Centered Sacred Instrument) */}
        <g id="veena">
          {/* Veena Dandi (Neck) */}
          <rect x="107" y="32" width="6" height="74" rx="2" fill="#78350f" stroke={strokeColor} strokeWidth="2" />
          
          {/* Veena Strings (Gold) */}
          <line x1="108.5" y1="36" x2="108.5" y2="102" stroke={goldColor} strokeWidth="1" />
          <line x1="111.5" y1="36" x2="111.5" y2="102" stroke={goldColor} strokeWidth="1" />

          {/* Veena Yali Top (Dragon/Bird motif top head) */}
          <path d="M 110 32 C 103 30, 98 24, 103 18 C 109 14, 116 20, 113 28 Z" fill={goldColor} stroke={strokeColor} strokeWidth="2" />
          <circle cx="106" cy="22" r="1.5" fill={kumkumColor} />

          {/* Veena Kudam (Resonator bowl at bottom) */}
          <ellipse cx="110" cy="98" rx="22" ry="16" fill="#9a3412" stroke={strokeColor} strokeWidth="2.5" />
          <ellipse cx="110" cy="96" rx="14" ry="9" fill="#78350f" stroke={goldColor} strokeWidth="1.5" strokeDasharray="3 2" />

          {/* Sacred Chandanam & Kumkum on Veena Kudam */}
          <circle cx="110" cy="96" r="3.5" fill={sandalColor} />
          <circle cx="110" cy="96" r="1.8" fill={kumkumColor} />
        </g>

        {/* 4. Auspicious Sevvanthi / Marigold Flowers & Pori Kadalai offerings */}
        {/* Flower Left */}
        <g id="flower-left" transform="translate(48, 122)">
          <circle cx="0" cy="0" r="5" fill="#f97316" />
          <circle cx="0" cy="0" r="2.5" fill="#fbbf24" />
        </g>
        {/* Flower Center Left */}
        <g id="flower-c-left" transform="translate(80, 130)">
          <circle cx="0" cy="0" r="6" fill="#fbbf24" />
          <circle cx="0" cy="0" r="3" fill="#ea580c" />
        </g>
        {/* Flower Center Right */}
        <g id="flower-c-right" transform="translate(140, 130)">
          <circle cx="0" cy="0" r="6" fill="#fbbf24" />
          <circle cx="0" cy="0" r="3" fill="#ea580c" />
        </g>
        {/* Flower Right */}
        <g id="flower-right" transform="translate(172, 122)">
          <circle cx="0" cy="0" r="5" fill="#f97316" />
          <circle cx="0" cy="0" r="2.5" fill="#fbbf24" />
        </g>

        {/* Subtle Pori Kadalai (Puffed rice offerings) at the base */}
        <ellipse cx="98" cy="136" rx="3" ry="1.5" fill="#fef08a" opacity="0.9" />
        <ellipse cx="104" cy="138" rx="2.5" ry="1.5" fill="#fef08a" opacity="0.9" />
        <ellipse cx="116" cy="137" rx="3" ry="1.5" fill="#fef08a" opacity="0.9" />
        <ellipse cx="122" cy="136" rx="2.5" ry="1.5" fill="#fef08a" opacity="0.9" />
        <circle cx="110" cy="138" r="2" fill="#d97706" /> {/* Kadalai */}
      </svg>

      {/* Divine Twinkling Sparks on the Veena strings */}
      <motion.div
        className="absolute text-amber-400 pointer-events-none"
        style={{ top: '22%', left: '50%', transform: 'translate(-50%, -50%)', filter: 'drop-shadow(0 0 5px rgba(245, 158, 11, 0.9))' }}
        animate={{
          scale: [0.6, 1.2, 0.6],
          opacity: [0.4, 1, 0.4],
          rotate: [0, 90, 180]
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 0 C 10 8, 12 10, 20 10 C 12 10, 10 12, 10 20 C 10 12, 8 10, 0 10 C 8 10, 10 8, 10 0 Z" />
        </svg>
      </motion.div>
    </div>
  );
}
