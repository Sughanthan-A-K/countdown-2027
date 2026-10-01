import React from 'react';

export default function GoldenKey({ className = "", style, size = 64, isInserted = false }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="goldLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7D1" />
          <stop offset="25%" stopColor="#FFDF00" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="75%" stopColor="#AA6C39" />
          <stop offset="100%" stopColor="#FFDF00" />
        </linearGradient>
        <linearGradient id="goldDark" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#8A5A19" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <filter id="keyGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="bevel">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur"/>
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.75" 
                              specularExponent="20" lightingColor="#FFF7D1" result="specOut">
            <fePointLight x="-50" y="-50" z="200"/>
          </feSpecularLighting>
          <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" 
                       k1="0" k2="1" k3="1" k4="0"/>
        </filter>
        <clipPath id="insertedClip">
          <rect x="0" y="0" width="100" height="58" />
        </clipPath>
      </defs>

      <g filter="url(#keyGlow)" transform="rotate(-45 50 50)" clipPath={isInserted ? "url(#insertedClip)" : undefined}>
        {/* Outer Ring / Bow */}
        <path 
          d="M 50 10 C 20 10 20 45 50 45 C 80 45 80 10 50 10 Z" 
          fill="url(#goldDark)" 
          filter="url(#bevel)"
        />
        <path 
          d="M 50 15 C 28 15 28 40 50 40 C 72 40 72 15 50 15 Z" 
          fill="#1a1a1a" 
        />
        
        {/* Inner Ornamental details */}
        <path 
          d="M 50 15 C 40 25 40 30 50 40 C 60 30 60 25 50 15 Z" 
          fill="url(#goldLight)"
          filter="url(#bevel)"
        />
        <circle cx="50" cy="27.5" r="4" fill="#1a1a1a" />

        {/* Shaft */}
        <rect x="46" y="44" width="8" height="46" rx="2" fill="url(#goldLight)" filter="url(#bevel)" />
        
        {/* Shaft details (grooves) */}
        <rect x="48" y="46" width="1" height="40" fill="#8A5A19" opacity="0.5" />
        <rect x="51" y="46" width="1" height="40" fill="#FFF7D1" opacity="0.8" />

        {/* Teeth Base */}
        <path d="M 50 65 L 70 65 L 70 73 L 50 73 Z" fill="url(#goldLight)" filter="url(#bevel)" />
        <path d="M 50 78 L 65 78 L 65 85 L 50 85 Z" fill="url(#goldLight)" filter="url(#bevel)" />
        
        {/* Intricate Teeth cutouts */}
        <rect x="58" y="65" width="4" height="4" fill="#1a1a1a" />
        <rect x="65" y="70" width="3" height="3" fill="#1a1a1a" />
        <rect x="55" y="78" width="4" height="4" fill="#1a1a1a" />
        
        {/* Bottom Tip */}
        <path d="M 46 88 C 46 95 54 95 54 88 Z" fill="url(#goldDark)" filter="url(#bevel)" />
      </g>
    </svg>
  );
}
