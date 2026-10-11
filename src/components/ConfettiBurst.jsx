import React, { useEffect, useRef } from 'react';

export default function ConfettiBurst({ active = true, origin = { y: 0.25, x: 0.5 }, launchOrigin = null, loop = false, skipInitial = false, forceRocket = false, onFirstBurst }) {
  const canvasRef = useRef(null);
  const loopTimerRef = useRef(null);
  
  // Persist physics state across re-renders (like when 'loop' prop toggles)
  const particlesRef = useRef([]);
  const waveRef = useRef(0);
  const hasFiredInitial = useRef(false);
  const hasFiredFirstBurstCallback = useRef(false);

  // Tracking state for sequential crackers
  // We want 10 Outs first, then random cracker selection where only ONE cracker runs at a time
  const burstCountRef = useRef(0);
  const currentCrackerRef = useRef('out');
  const lastRandomCrackerRef = useRef('');
  const activeCrackersRef = useRef([]); // Active generator objects (pusvanam, sangu sakkaram, etc.)
  const screenShakeRef = useRef(0); // Screen shake offset for atom bomb / saravedi
  const flashAlphaRef = useRef(0); // Blinding flash for Lakshmi vedi / bombs

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle high DPI screens
    const dpr = window.devicePixelRatio || 1;
    
    const updateSize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Specific sequential colors
    const goldenColors = ['#FFD700', '#FFA500', '#FFFFFF', '#FFF8DC', '#DAA520', '#F0E68C'];
    const vibrantPalettes = [
      ['#1E90FF', '#8A2BE2', '#00FFFF', '#9400D3', '#FF00FF', '#4169E1', '#00FA9A', '#FF1493'],
      ['#FF1493', '#FF0000', '#FF4500', '#FF7F50', '#DC143C', '#FF8C00'],
      ['#00FFFF', '#00FF00', '#32CD32', '#00FA9A', '#1E90FF', '#7FFF00'],
      ['#FF00FF', '#8A2BE2', '#9400D3', '#DA70D6', '#BA55D3', '#4B0082'],
      ['#FF4500', '#FF8C00', '#FFA500', '#FFD700', '#FFFF00', '#FF6347']
    ];

    const availableCrackers = [
      'out',           // Aerial Shell
      'pusvanam',      // Flower Pot
      'sanguSakkaram', // Ground Spinner
      'kambiMathaapu', // Sparkler
      'saraVedi',      // Garland Cracker (1000-wala string)
      'lakshmiVedi'    // Atom Bomb with massive shockwave
    ];

    const explode = (startX, startY, selectedColors) => {
      // Trigger a satisfying haptic feedback when any rocket explodes
      if (typeof window !== 'undefined' && navigator.vibrate) {
        // Massive boom [400ms] + small echo [150ms] for Golden Shower, quick double-tap for calendar outs
        navigator.vibrate(loop ? [80, 50, 80] : [400, 50, 150]);
      }

      // Restored original cinematic density
      const particleCount = loop ? 120 : 450;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 20 + 5) * (Math.random() * 0.5 + 0.5);
        
        particlesRef.current.push({
          type: 'spark',
          isRocket: false,
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          friction: 0.94, 
          gravity: 0.05, 
          alpha: 1, 
          decay: Math.random() * 0.006 + 0.003, 
          color: selectedColors[Math.floor(Math.random() * selectedColors.length)],
          size: Math.random() * 1.5 + 0.5,
          history: [], 
          flickerRate: Math.random() > 0.5 ? Math.random() * 0.1 : 0
        });
      }
    };

    // 1. OUT (Aerial Shell Rocket)
    const fireOut = (directExplode = false) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      
      let selectedColors = goldenColors;
      if (loop) {
        selectedColors = vibrantPalettes[waveRef.current % vibrantPalettes.length];
        waveRef.current++;
      }
      
      if (directExplode && !forceRocket) {
        const startX = width * origin.x;
        const startY = height * origin.y;
        explode(startX, startY, selectedColors);
      } else {
        const startX = launchOrigin ? width * launchOrigin.x : width * (0.3 + Math.random() * 0.4); 
        const startY = launchOrigin ? height * launchOrigin.y : height + 10;
        const targetY = (forceRocket || launchOrigin) ? height * origin.y : height * (0.1 + Math.random() * 0.4); 
        
        const distanceY = startY - targetY;
        const gravity = launchOrigin ? 0.04 : 0.15;
        const initialVy = -Math.sqrt(2 * gravity * Math.max(10, distanceY));
        
        particlesRef.current.push({
          type: 'rocket',
          isRocket: true,
          x: startX,
          y: startY,
          vx: launchOrigin ? (width * origin.x - startX) / (-initialVy / gravity) + (Math.random()-0.5)*1 : (Math.random() - 0.5) * 3,
          vy: initialVy,
          gravity: gravity,
          alpha: 1,
          colorTheme: selectedColors,
          history: []
        });
      }
    };

    // 2. PUSHWANAM / BISWAANAM (Flower Pot) - Lowered by ~12px to height * 0.61, Authentic dark maroon/reddish-orange pot with gold border lines
    const firePusvanam = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      const baseX = width * 0.5; // Centered
      // Lowered by ~10-12px from 0.58 to 0.61 so it's not too center/high, looks grounded and perfectly proportioned
      const baseY = height * 0.61; 

      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([100, 50, 150]);
      }

      // 9.0 seconds long glorious eruption as requested (9-10s)
      const duration = 9000;
      const startTime = Date.now();
      
      activeCrackersRef.current.push({
        type: 'pusvanam',
        baseX,
        baseY,
        startTime,
        duration,
        update: () => {
          const elapsed = Date.now() - startTime;
          if (elapsed > duration) return false;
          
          const progress = elapsed / duration;
          // Smooth fade-in entry factor (0 to 1 over first 600ms)
          const fadeInAlpha = Math.min(1, elapsed / 600);

          // Smooth bell curve: starts gentle, builds up tall, stays peak, settles down
          let intensity = progress < 0.20 
            ? (progress / 0.20) 
            : progress < 0.80 
            ? 1.0 
            : Math.max(0.2, (1 - (progress - 0.80) / 0.20));

          const fountainParticles = Math.floor(12 * intensity);

          for (let i = 0; i < fountainParticles; i++) {
            // Shoots high up into the card, arching up above the Happy Diwali text
            const spreadAngle = -Math.PI / 2 + (Math.random() - 0.5) * 0.46; 
            const speed = (Math.random() * 13 + 9) * intensity;
            const goldColors = ['#FFF8DC', '#FFE4B5', '#FFD700', '#FFA500', '#FF8C00', '#FFFFFF'];
            
            particlesRef.current.push({
              type: 'spark',
              isRocket: false,
              x: baseX + (Math.random() - 0.5) * 8,
              y: baseY,
              vx: Math.cos(spreadAngle) * speed,
              vy: Math.sin(spreadAngle) * speed,
              friction: 0.965,
              gravity: 0.22, // Arching gracefully down
              alpha: fadeInAlpha,
              decay: Math.random() * 0.016 + 0.010,
              color: goldColors[Math.floor(Math.random() * goldColors.length)],
              size: Math.random() * 2 + 1,
              history: [],
              flickerRate: 0.15
            });
          }
          return true;
        },
        draw: (ctx) => {
          // Draw authentic dark maroon / reddish-orange clay flower pot with golden border & base line
          const elapsed = Date.now() - startTime;
          const fadeInAlpha = Math.min(1, elapsed / 600);

          ctx.save();
          ctx.globalAlpha = fadeInAlpha;
          // Dark maroon / rich terracotta body
          ctx.fillStyle = '#801818'; 
          ctx.beginPath();
          ctx.moveTo(baseX - 14, baseY + 19);
          ctx.lineTo(baseX + 14, baseY + 19);
          ctx.lineTo(baseX + 6, baseY);
          ctx.lineTo(baseX - 6, baseY);
          ctx.closePath();
          ctx.fill();

          // Golden border line at the base
          ctx.strokeStyle = '#FFD700';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(baseX - 14, baseY + 19);
          ctx.lineTo(baseX + 14, baseY + 19);
          ctx.stroke();

          // Golden decorative neck band
          ctx.strokeStyle = '#DAA520';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(baseX - 8, baseY + 8);
          ctx.lineTo(baseX + 8, baseY + 8);
          ctx.stroke();

          // Reddish-orange & golden glowing eruption rim
          ctx.fillStyle = '#FFA500';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#FF4500';
          ctx.fillRect(baseX - 5, baseY - 2, 10, 4);
          ctx.restore();
        }
      });
    };

    // 3. SANGU SAKKARAM (Ground Spinner) - Circle movement and sparks 100% perfectly synced! Realistic golden/amber sparks & maroon-gold disc
    const fireSanguSakkaram = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      let posX = width * 0.5;
      let posY = height * 0.55;
      
      // Gentle, smooth roving velocities across entire card (both X and Y)
      let moveVx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.8 + 0.6);
      let moveVy = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.7 + 0.5);

      if (typeof window !== 'undefined' && navigator.vibrate) {
        // Mild rhythmic whirling vibration pattern for ground spinner
        navigator.vibrate([40, 80, 40]);
      }

      // 7.5 seconds smooth roving spin as requested (7-8s)
      const duration = 7500;
      const startTime = Date.now();
      let angle = 0;
      let spinSpeed = 0.5;

      activeCrackersRef.current.push({
        type: 'sanguSakkaram',
        startTime,
        duration,
        update: () => {
          const elapsed = Date.now() - startTime;
          if (elapsed > duration) return false;

          const progress = elapsed / duration;
          spinSpeed = progress < 0.2 ? 0.3 + progress * 2 : 0.7; // Fast spinning
          angle += spinSpeed;

          // 1. UPDATE POSITION FIRST so disc and spark origins are 100% frame-perfect in sync!
          posX += moveVx;
          posY += moveVy;

          // Card boundary reflections (up, down, left, right)
          const minX = width * 0.20;
          const maxX = width * 0.80;
          const minY = height * 0.25;
          const maxY = height * 0.78;

          if (posX <= minX || posX >= maxX) {
            moveVx = -moveVx * 0.95;
            moveVy += (Math.random() - 0.5) * 0.4;
          }
          if (posY <= minY || posY >= maxY) {
            moveVy = -moveVy * 0.95;
            moveVx += (Math.random() - 0.5) * 0.4;
          }

          // Smooth fade-in entry factor (0 to 1 over first 600ms)
          const fadeInAlpha = Math.min(1, elapsed / 600);

          const sparksPerFrame = 9;
          // Realistic golden-yellow, warm white, and fire orange sparks - exactly like real Chakkara!
          const realisticColors = ['#FFD700', '#FFA500', '#FF8C00', '#FFFFFF', '#FFF8DC', '#FFE4B5'];

          for (let i = 0; i < sparksPerFrame; i++) {
            // Eject sparks tangentially from exact updated disc rim (radius 18px)
            const armAngle = angle + (i % 2 === 0 ? 0 : Math.PI);
            const nozzleDistance = 18; // Right at the outer edge of enlarged visible disc
            const originX = posX + Math.cos(armAngle) * nozzleDistance;
            const originY = posY + Math.sin(armAngle) * nozzleDistance;

            const tangentAngle = armAngle + Math.PI / 2 + (Math.random() - 0.5) * 0.35;
            // Expanded speed & spread so the fiery radial umbrella is visibly wider and fuller
            const speed = Math.random() * 11 + 6;

            particlesRef.current.push({
              type: 'spark',
              isRocket: false,
              x: originX,
              y: originY,
              vx: Math.cos(tangentAngle) * speed + moveVx * 0.4, // Inherits disc movement vector
              vy: Math.sin(tangentAngle) * speed + moveVy * 0.4,
              friction: 0.94,
              gravity: 0.07,
              alpha: fadeInAlpha,
              decay: 0.020,
              color: realisticColors[Math.floor(Math.random() * realisticColors.length)],
              size: Math.random() * 2.2 + 1.2,
              history: [],
              flickerRate: 0.12
            });
          }
          return true;
        },
        draw: (ctx) => {
          // Draw bold, prominent spinning wheel disc directly at (posX, posY)
          const elapsed = Date.now() - startTime;
          const fadeInAlpha = Math.min(1, elapsed / 600);

          ctx.save();
          ctx.globalAlpha = fadeInAlpha;
          ctx.translate(posX, posY);
          ctx.rotate(angle);
          
          // Outer warm fiery glow
          ctx.shadowBlur = 16;
          ctx.shadowColor = '#FF8C00';

          // 1. Dark terracotta/maroon base disc (enlarged to 18px radius so it's vividly visible!)
          ctx.fillStyle = '#8B1E0F';
          ctx.beginPath();
          ctx.arc(0, 0, 18, 0, Math.PI * 2);
          ctx.fill();

          // 2. Thick bright Golden border rim
          ctx.strokeStyle = '#FFD700';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.arc(0, 0, 17, 0, Math.PI * 2);
          ctx.stroke();

          // 3. Inner concentric gold ring
          ctx.strokeStyle = '#FFA500';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, 10, 0, Math.PI * 2);
          ctx.stroke();

          // 4. Vivid swirling curved spiral blades (2 S-arms)
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.arc(0, -6, 8, Math.PI * 0.5, Math.PI * 1.5);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 6, 8, -Math.PI * 0.5, Math.PI * 0.5);
          ctx.stroke();

          // 5. Bright center brass pivot eyelet / nail head
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#8B0000';
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      });
    };

    // 4. KAMBI MATHAAPU (Handheld Sparkler) - Full wire persists! Chemical burns away, leaving glowing reddish-orange hot ember zone on wire
    const fireKambiMathaapu = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      
      const baseX = width * 0.5;
      const baseY = height * 0.35;
      
      if (typeof window !== 'undefined' && navigator.vibrate) {
        // Mild soft fizzing vibration for sparkler
        navigator.vibrate([25, 60, 25]);
      }

      // Around 7.5 seconds slow, smooth burn
      const duration = 7500;
      const startTime = Date.now();

      activeCrackersRef.current.push({
        type: 'kambiMathaapu',
        startTime,
        duration,
        update: () => {
          const elapsed = Date.now() - startTime;
          if (elapsed > duration) return false;

          // Gentle natural sway around the screen like hand movement (smooth sine curves)
          const swayX = Math.sin(elapsed * 0.002) * (width * 0.18) + Math.cos(elapsed * 0.0035) * (width * 0.08);
          const swayY = Math.cos(elapsed * 0.0025) * (height * 0.09);
          const currentX = baseX + swayX;

          // Tip moves down as the sparkler chemical coating burns
          const progress = elapsed / duration;
          const fadeInAlpha = Math.min(1, elapsed / 600);
          const stickStartY = (baseY + swayY);
          const coatedLength = 110;
          const currentBurnY = stickStartY + progress * coatedLength;

          // Crackling burst of needle sparks
          const sparkCount = 8;
          const sparklerColors = ['#FFFFFF', '#FFF8DC', '#FFFACD', '#FFFFE0', '#FFFAF0', '#FFD700'];

          for (let i = 0; i < sparkCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 2;

            particlesRef.current.push({
              type: 'spark',
              isRocket: false,
              x: currentX + (Math.random() - 0.5) * 4,
              y: currentBurnY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              friction: 0.88, // Quick deceleration into crackle
              gravity: 0.05,
              alpha: fadeInAlpha,
              decay: 0.035 + Math.random() * 0.02,
              color: sparklerColors[Math.floor(Math.random() * sparklerColors.length)],
              size: Math.random() * 1.6 + 0.6,
              history: [],
              flickerRate: 0.3 // High sparkle
            });
          }
          return true;
        },
        draw: (ctx) => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(1, elapsed / duration);
          const fadeInAlpha = Math.min(1, elapsed / 600);
          
          const swayX = Math.sin(elapsed * 0.002) * (width * 0.18) + Math.cos(elapsed * 0.0035) * (width * 0.08);
          const swayY = Math.cos(elapsed * 0.0025) * (height * 0.09);
          const currentX = baseX + swayX;
          const stickStartY = (baseY + swayY);
          const totalWireLength = 170;
          const coatedLength = 110;
          const stickEndY = stickStartY + totalWireLength;
          const currentBurnY = stickStartY + progress * coatedLength;

          ctx.save();
          ctx.globalAlpha = fadeInAlpha;
          // 1. Full wire always stays intact! (Bare steel wire running from top to bottom)
          ctx.strokeStyle = '#B0C4DE';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(currentX, stickStartY);
          ctx.lineTo(currentX, stickEndY);
          ctx.stroke();

          // 2. Unburnt chemical coating below the burning flame (dark charcoal grey)
          if (currentBurnY < stickStartY + coatedLength) {
            ctx.strokeStyle = '#5A636A';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(currentX, currentBurnY);
            ctx.lineTo(currentX, stickStartY + coatedLength);
            ctx.stroke();
          }

          // 3. Just-burnt glowing REDDISH-ORANGE heat zone on the bare wire immediately above the flame!
          const hotZoneLength = Math.min(22, currentBurnY - stickStartY);
          if (hotZoneLength > 0) {
            ctx.strokeStyle = '#FF4500';
            ctx.lineWidth = 3.5;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#FF2200';
            ctx.beginPath();
            ctx.moveTo(currentX, currentBurnY - hotZoneLength);
            ctx.lineTo(currentX, currentBurnY);
            ctx.stroke();

            // Inner hot yellow-orange heat gradient
            ctx.strokeStyle = '#FFA500';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(currentX, currentBurnY - hotZoneLength * 0.5);
            ctx.lineTo(currentX, currentBurnY);
            ctx.stroke();
          }

          // 4. Blazing white-hot sparkler burning head
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 18;
          ctx.shadowColor = '#FFF';
          ctx.beginPath();
          ctx.arc(currentX, currentBurnY, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
    };

    // 5. SARA VEDI (Garland Cracker) - Center intense blast zone, simultaneous left-right bursts, plus physical red cracker cylinder popping and landing away!
    const fireSaraVedi = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;

      // 40 pairs of crackers running down central fuse with a mild natural gap between rows
      const totalPairs = 40;
      const stringTopX = width * 0.5;
      const stringTopY = height * 0.18;
      const stringBottomY = height * 0.78;

      let currentPairIdx = 0;
      // 8.0 seconds total rhythmic explosion as requested
      const duration = 8000;
      const intervalDelay = duration / totalPairs;
      const startTime = Date.now();
      let nextBurstTime = startTime;

      activeCrackersRef.current.push({
        type: 'saraVedi',
        startTime,
        update: () => {
          if (currentPairIdx >= totalPairs) return false;

          const now = Date.now();
          if (now >= nextBurstTime) {
            nextBurstTime = now + intervalDelay;

            // Progressive top-to-bottom fuse travel
            const t = currentPairIdx / totalPairs;
            const centerY = stringTopY + (stringBottomY - stringTopY) * t;
            
            // Both LEFT and RIGHT explode SIMULTANEOUSLY from the central cord!
            const sides = [-18, 18]; // Left cracker and Right cracker

            // Very mild subtle click vibration on periodic beats (not vibrating constantly on every frame)
            if (typeof window !== 'undefined' && navigator.vibrate) {
              if (currentPairIdx % 4 === 0) {
                navigator.vibrate(18); // Ultra mild pop
              }
            }
            screenShakeRef.current = (Math.random() - 0.5) * 4;

            // Central blast zone: intense dub-dub-pada-pada center sparks so it's a unified roaring blast
            const centerColors = ['#FFFFFF', '#FFD700', '#FF4500'];
            for (let c = 0; c < 12; c++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 8 + 3;
              particlesRef.current.push({
                type: 'spark',
                isRocket: false,
                x: stringTopX + (Math.random() - 0.5) * 6,
                y: centerY + (Math.random() - 0.5) * 6,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                friction: 0.90,
                gravity: 0.10,
                alpha: 1,
                decay: 0.045,
                color: centerColors[Math.floor(Math.random() * centerColors.length)],
                size: Math.random() * 2 + 1,
                history: [],
                flickerRate: 0.2
              });
            }

            sides.forEach((sideOffset) => {
              const px = stringTopX + sideOffset + (Math.random() - 0.5) * 4;
              const py = centerY + (Math.random() - 0.5) * 4;

              // Snappy red/gold sparks
              const colors = ['#FF4500', '#FFD700', '#FFFFFF', '#DC143C'];
              for (let i = 0; i < 14; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 7 + 3;
                particlesRef.current.push({
                  type: 'spark',
                  isRocket: false,
                  x: px,
                  y: py,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed,
                  friction: 0.90,
                  gravity: 0.12,
                  alpha: 1,
                  decay: 0.045,
                  color: colors[Math.floor(Math.random() * colors.length)],
                  size: Math.random() * 2 + 1,
                  history: [],
                  flickerRate: 0.2
                });
              }

              // Red paper debris flying out from each side
              for (let d = 0; d < 3; d++) {
                particlesRef.current.push({
                  type: 'paper',
                  isRocket: false,
                  x: px,
                  y: py,
                  vx: (sideOffset > 0 ? 1 : -1) * (Math.random() * 3 + 1) + (Math.random() - 0.5) * 2,
                  vy: (Math.random() - 0.8) * 4,
                  friction: 0.94,
                  gravity: 0.14,
                  alpha: 1,
                  decay: 0.015,
                  color: '#FF2222',
                  size: Math.random() * 3 + 2,
                  history: [],
                  flickerRate: 0
                });
              }
            });

            // OCCASIONAL ROGUE STRAY CRACKER (Left/Right-la irukkura oru RED pattaasu mattum therichu parandhu poi keezha vizhuradhu!):
            // Exactly preserves the red cracker size/shape, flies with tumbling rotation, and lands with a satisfying pop & vibration!
            if (Math.random() < 0.28) {
              const isLeft = Math.random() > 0.5;
              const strayDirection = isLeft ? -1 : 1;
              const originCrackerX = stringTopX + (strayDirection * 16);
              const straySpeedX = strayDirection * (Math.random() * 5 + 4);
              const straySpeedY = -(Math.random() * 4 + 2); // Arches up into the air

              // Mild sharp tap vibration when the stray cracker pops off and lands
              if (typeof window !== 'undefined' && navigator.vibrate) {
                navigator.vibrate([20, 40, 20]);
              }

              // Physical red cracker roll object (type: 'strayCracker')
              particlesRef.current.push({
                type: 'strayCracker',
                isRocket: false,
                x: originCrackerX,
                y: centerY,
                vx: straySpeedX,
                vy: straySpeedY,
                rotation: 0,
                vRot: (Math.random() - 0.5) * 0.25,
                width: 14,
                height: 5.5,
                friction: 0.97,
                gravity: 0.18,
                alpha: 1,
                decay: 0.012, // Lasts for the full flight arc
                history: []
              });
            }

            currentPairIdx++;
          }
          return true;
        },
        draw: (ctx) => {
          if (currentPairIdx < totalPairs) {
            const elapsed = Date.now() - startTime;
            const fadeInAlpha = Math.min(1, elapsed / 600);

            ctx.save();
            ctx.globalAlpha = fadeInAlpha;
            // Draw central cord
            const t = currentPairIdx / totalPairs;
            const currentY = stringTopY + (stringBottomY - stringTopY) * t;

            ctx.strokeStyle = '#DDD';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(stringTopX, currentY);
            ctx.lineTo(stringTopX, stringBottomY);
            ctx.stroke();

            // Draw unburnt pairs with a pleasant mild dark gap between each row
            const rowStep = (stringBottomY - stringTopY) / totalPairs;
            const rollHeight = 5.2; // Leaves a clean ~1.8px dark gap between rows

            for (let i = currentPairIdx; i < totalPairs; i++) {
              const rowY = stringTopY + i * rowStep;
              ctx.fillStyle = '#C81010';
              // Left roll
              ctx.fillRect(stringTopX - 16, rowY, 13, rollHeight);
              // Right roll
              ctx.fillRect(stringTopX + 3, rowY, 13, rollHeight);

              // Tiny gold jute binding line across each roll for authentic saravedi look
              ctx.fillStyle = '#DAA520';
              ctx.fillRect(stringTopX - 11, rowY + rollHeight * 0.45, 3, 1.2);
              ctx.fillRect(stringTopX + 8, rowY + rollHeight * 0.45, 3, 1.2);
            }
            ctx.restore();
          }
        }
      });
    };

    // 6. ATOM BOMB / LAKSHMI VEDI - Complete 3.0s: 2.0s burning fuse shortening down into the body, then instant heavy blast!
    const fireLakshmiVedi = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      const bombX = width * 0.5;
      const bombY = height * 0.60; // Visible above 54th day area

      // Fuse burns for 2.0s, blast at 2.0s, clears by 3.0s total as requested
      const startTime = Date.now();
      let hasDetonated = false;

      activeCrackersRef.current.push({
        type: 'lakshmiVedi',
        startTime,
        update: () => {
          const elapsed = Date.now() - startTime;
          const fadeInAlpha = Math.min(1, elapsed / 500);

          if (elapsed < 2000) {
            // Fuse wire physical shortening: top of fuse starts at (bombY - 28) and burns down to bomb top (bombY - 14)
            const burnProgress = elapsed / 2000;
            const currentSparkY = (bombY - 28) + burnProgress * 14;

            particlesRef.current.push({
              type: 'spark',
              isRocket: false,
              x: bombX + (Math.random() - 0.5) * 3,
              y: currentSparkY,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              friction: 0.9,
              gravity: 0.05,
              alpha: fadeInAlpha,
              decay: 0.06,
              color: '#FFA500',
              size: 2,
              history: [],
              flickerRate: 0
            });
            return true;
          }

          if (!hasDetonated) {
            hasDetonated = true;
            // Heavy single blast!
            flashAlphaRef.current = 0.95;
            screenShakeRef.current = 15;

            if (typeof window !== 'undefined' && navigator.vibrate) {
              navigator.vibrate([400, 80, 200]);
            }

            // Localized dense blast - tight radius, quick dissipation
            const colors = ['#FFFFFF', '#FFD700', '#FF4500'];
            for (let i = 0; i < 80; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = (Math.random() * 12 + 4);
              particlesRef.current.push({
                type: 'spark',
                isRocket: false,
                x: bombX,
                y: bombY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                friction: 0.89,
                gravity: 0.12,
                alpha: 1,
                decay: 0.045,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 2.5 + 1.2,
                history: [],
                flickerRate: 0
              });
            }

            // Green paper shreds flying out
            for (let p = 0; p < 28; p++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 12 + 4;
              particlesRef.current.push({
                type: 'paper',
                isRocket: false,
                x: bombX,
                y: bombY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                friction: 0.93,
                gravity: 0.20,
                alpha: 1,
                decay: 0.015,
                color: p % 2 === 0 ? '#1E792C' : '#2EA043',
                size: Math.random() * 4 + 2,
                history: [],
                flickerRate: 0
              });
            }
          }

          return elapsed < 3000; // 3.0s total duration!
        },
        draw: (ctx) => {
          const elapsed = Date.now() - startTime;
          const fadeInAlpha = Math.min(1, elapsed / 500);

          if (elapsed < 2000) {
            // Draw authentic Green Atom Bomb with rounded corners and wrapped jute thread (nool)
            ctx.save();
            ctx.globalAlpha = fadeInAlpha;
            const w = 22;
            const h = 26;
            const r = 5; // Rounded corner radius
            const x = bombX - w / 2;
            const y = bombY - 14;

            // Green rounded body
            ctx.fillStyle = '#1E792C';
            ctx.beginPath();
            ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h);
            ctx.fill();

            // Wrapped jute thread (nool) criss-crossing corners and center
            ctx.strokeStyle = '#D2B48C';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            // Horizontal wrapping bands
            ctx.moveTo(x, y + 8);
            ctx.lineTo(x + w, y + 8);
            ctx.moveTo(x, y + 17);
            ctx.lineTo(x + w, y + 17);
            // Vertical wrapping
            ctx.moveTo(x + w / 2, y);
            ctx.lineTo(x + w / 2, y + h);
            ctx.stroke();

            // Gold label in the middle
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(x + 3, y + 10, w - 6, 5);

            // Dynamically shortening fuse wire: top burns down to the body!
            const burnProgress = elapsed / 2000;
            const currentFuseTopY = (bombY - 28) + burnProgress * 14;

            ctx.strokeStyle = '#FFF';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(bombX, y);
            ctx.lineTo(bombX, currentFuseTopY);
            ctx.stroke();

            ctx.restore();
          }
        }
      });
    };

    // Central cracker trigger function:
    // Flow: 
    // 1. Initial 10 Outs run first (around 3s apart)
    // 2. Step 10: Pushwanam (9s burn + 2.0s peaceful gap = 11.0s)
    // 3. Step 11: Sangu Sakkaram (7.5s spin + 2.0s peaceful gap = 9.5s)
    // 4. Step 12: Kambi Mathappu (7.5s burn + 2.0s peaceful gap = 9.5s)
    // 5. Step 13: Atom Bomb (3.0s total + 2.0s peaceful quiet = 5.0s)
    // 6. Step 14: Saravedi (8.0s continuous + 2.0s peaceful gap = 10.0s)
    // 7. Step 15+: Remaining fireworks random in smooth, natural timing with 2.0s gap between every cracker!
    const triggerNextCracker = () => {
      // STRICT REQUIREMENT: Only ONE cracker can ever exist at a time! Clean up any lingering cracker models
      activeCrackersRef.current = [];

      // 1. First 10 crackers are strictly the usual OUTS!
      if (burstCountRef.current < 10) {
        burstCountRef.current++;
        currentCrackerRef.current = 'out';
        fireOut(false);
        return 3200 + Math.random() * 500; // Smooth timing between outs
      }

      const step = burstCountRef.current;
      burstCountRef.current++;

      let nextChoice = 'pusvanam';
      let delayAfterThis = 7000;

      if (step === 10) {
        // Position 2: Pushwanam
        nextChoice = 'pusvanam';
      } else if (step === 11) {
        // Position 3: Sangu Sakkaram
        nextChoice = 'sanguSakkaram';
      } else if (step === 12) {
        // Position 4: Kambi Mathappu
        nextChoice = 'kambiMathaapu';
      } else if (step === 13) {
        // Position 5: Atom Bomb
        nextChoice = 'lakshmiVedi';
      } else if (step === 14) {
        // Position 6: Saravedi
        nextChoice = 'saraVedi';
      } else {
        // Position 7+: Random variety with smooth timing, no consecutive duplicates
        const choices = availableCrackers.filter(c => c !== lastRandomCrackerRef.current);
        nextChoice = choices[Math.floor(Math.random() * choices.length)];
      }

      lastRandomCrackerRef.current = nextChoice;
      currentCrackerRef.current = nextChoice;

      switch (nextChoice) {
        case 'pusvanam':
          firePusvanam();
          // 9.0s duration + 2.0s peaceful gap = 11.0s
          delayAfterThis = 11000;
          break;
        case 'sanguSakkaram':
          fireSanguSakkaram();
          // 7.5s spin + 2.0s peaceful gap = 9.5s
          delayAfterThis = 9500;
          break;
        case 'kambiMathaapu':
          fireKambiMathaapu();
          // 7.5s burn + 2.0s peaceful gap = 9.5s
          delayAfterThis = 9500;
          break;
        case 'lakshmiVedi':
          fireLakshmiVedi();
          // 3.0s duration + 2.0s peaceful quiet = 5.0s
          delayAfterThis = 5000;
          break;
        case 'saraVedi':
          fireSaraVedi();
          // 8.0s duration + 2.0s peaceful gap = 10.0s
          delayAfterThis = 10000;
          break;
        case 'out':
        default:
          fireOut(false);
          // Out hangs for ~3s + 2.0s gap = 5.0s
          delayAfterThis = 5000;
          break;
      }

      return delayAfterThis;
    };

    // Fire the initial logic
    if (!hasFiredInitial.current) {
      if (!skipInitial) {
        if (!loop) {
          fireOut(true);
        } else {
          burstCountRef.current++;
          fireOut(false); // 1st calendar Out
        }
      }
      hasFiredInitial.current = true;
    }

    // Start sequential loop only if loop is true
    let visibilityHandler = null;

    if (loop && !loopTimerRef.current) {
      const scheduleNext = () => {
        if (document.hidden) {
          // Tab is backgrounded: wait until user returns, do NOT accumulate or stack crackers!
          if (!visibilityHandler) {
            visibilityHandler = () => {
              if (!document.hidden) {
                document.removeEventListener('visibilitychange', visibilityHandler);
                visibilityHandler = null;
                // Clear any leftover stacked particles or crackers while tab was idle
                activeCrackersRef.current = [];
                particlesRef.current = [];
                scheduleNext();
              }
            };
            document.addEventListener('visibilitychange', visibilityHandler);
          }
          return;
        }

        const delay = triggerNextCracker();
        
        loopTimerRef.current = setTimeout(() => {
          scheduleNext();
        }, delay);
      };
      
      // Delay before 2nd calendar out starts
      loopTimerRef.current = setTimeout(scheduleNext, 2800);
    }

    const render = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Handle screen shake (from Lakshmi vedi / Sara vedi)
      ctx.save();
      if (Math.abs(screenShakeRef.current) > 0.1) {
        const shakeX = (Math.random() - 0.5) * screenShakeRef.current;
        const shakeY = (Math.random() - 0.5) * screenShakeRef.current;
        ctx.translate(shakeX, shakeY);
        screenShakeRef.current *= 0.88; // Damping
      }

      // 1. Update active grounded cracker physics state (Pusvanam base, Chakkara disc, Sparkler wire)
      activeCrackersRef.current = activeCrackersRef.current.filter((cracker) => {
        return cracker.update();
      });

      let activeParticles = 0;

      // 2. Render all particles
      particlesRef.current.forEach((p) => {
        if (p.alpha <= 0) return;
        activeParticles++;

        p.history.push({ x: p.x, y: p.y });
        
        if (p.isRocket) {
          if (p.initialY === undefined) p.initialY = p.y;
          const safeInitialY = Math.max(1, p.initialY);
          const progress = Math.max(0, Math.min(1, (safeInitialY - p.y) / (safeInitialY * 0.75)));
          const scale = Math.max(0.1, 1.0 - (progress * 0.7));

          if (p.history.length > 12) p.history.shift();
          
          p.vy += p.gravity;
          p.x += p.vx;
          p.y += p.vy;

          const cylinderWidth = 32;
          const headRadius = (cylinderWidth / 2) * scale;
          const tailWidth = cylinderWidth * scale;

          if (p.history.length > 1) {
            const tailFlicker = 0.6 + Math.random() * 0.4;
            const widthFlicker = 0.8 + Math.random() * 0.4;
            
            for (let i = 1; i < p.history.length; i++) {
              const segmentScale = (i / p.history.length);
              ctx.beginPath();
              ctx.moveTo(p.history[i-1].x, p.history[i-1].y);
              ctx.lineTo(p.history[i].x, p.history[i].y);
              ctx.strokeStyle = `rgba(255, ${100 + segmentScale * 155}, 0, ${segmentScale * scale * tailFlicker})`;
              ctx.lineWidth = tailWidth * segmentScale * widthFlicker;
              ctx.lineCap = 'round';
              ctx.stroke();
            }
          }

          const headFlicker = 0.8 + Math.random() * 0.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, headRadius * headFlicker, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 20 * scale;
          ctx.shadowColor = '#FFA500';
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, headRadius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFDD';
          ctx.fill();
          ctx.shadowBlur = 0;

          // Explode when reaching apex
          if (p.vy >= -0.5) {
            p.alpha = 0;
            explode(p.x, p.y, p.colorTheme);
            
            if (onFirstBurst && !hasFiredFirstBurstCallback.current) {
              onFirstBurst();
              hasFiredFirstBurstCallback.current = true;
            }
          }
        } else if (p.type === 'strayCracker') {
          // Physical Red Cracker Cylinder flying, tumbling in the air and landing!
          p.vx *= p.friction;
          p.vy *= p.friction;
          p.vy += p.gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += (p.vRot || 0.1);
          p.alpha -= p.decay;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          // Draw authentic red paper cylinder roll matching the garland crackers
          ctx.fillStyle = `rgba(204, 17, 17, ${Math.max(0, p.alpha)})`;
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
          // Tiny white/grey fuse tip on the flying cracker
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.alpha)})`;
          ctx.fillRect(-p.width / 2 - 2, -1, 2, 2);
          ctx.restore();
        } else if (p.type === 'paper') {
          // Debris / Paper flakes fluttering down
          p.vx *= p.friction;
          p.vy *= p.friction;
          p.vy += p.gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${Math.max(0, p.alpha)})`;
          ctx.fillRect(p.x, p.y, p.size, p.size * 0.8);
        } else {
          // Standard sparks (from outs, flowerpot, chakkara, sparkler, bombs)
          if (p.history.length > 16) p.history.shift();

          p.vx *= p.friction;
          p.vy *= p.friction;
          p.vy += p.gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          let currentAlpha = p.alpha;
          if (p.flickerRate > 0) {
            currentAlpha = Math.max(0, p.alpha - Math.sin(Date.now() * p.flickerRate) * 0.3);
          }

          if (p.history.length > 1) {
            ctx.beginPath();
            ctx.moveTo(p.history[0].x, p.history[0].y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${hexToRgb(p.color)}, ${Math.max(0, currentAlpha)})`;
            ctx.lineWidth = p.size;
            ctx.lineCap = 'round';
            ctx.stroke();
          } else {
            ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${Math.max(0, currentAlpha)})`;
            if (window.innerWidth < 768) {
              ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
            } else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          
          if (p.vy > 1.0 && Math.random() < 0.15 && currentAlpha > 0.2) {
            ctx.fillStyle = '#FFFFFF';
            if (window.innerWidth < 768) {
              const sSize = Math.random() * 2 + 0.5;
              ctx.fillRect(p.x + (Math.random() - 0.5) * 5 - sSize, p.y + (Math.random() - 0.5) * 5 - sSize, sSize * 2, sSize * 2);
            } else {
              ctx.beginPath();
              ctx.arc(p.x + (Math.random() - 0.5) * 5, p.y + (Math.random() - 0.5) * 5, Math.random() * 2 + 0.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      });

      // 3. Draw active cracker physical models (Pusvanam base, Sangu Sakkaram disc, Sparkler wire) in FOREGROUND so center circles are never hidden under sparks!
      activeCrackersRef.current.forEach((cracker) => {
        if (cracker.draw) {
          cracker.draw(ctx);
        }
      });

      // 4. Blinding Screen Flash (for Lakshmi vedi)
      if (flashAlphaRef.current > 0.01) {
        ctx.fillStyle = `rgba(255, 255, 255, ${flashAlphaRef.current})`;
        ctx.fillRect(0, 0, rect.width, rect.height);
        flashAlphaRef.current *= 0.85; // Fades out very fast in 100-200ms
      }

      ctx.restore();
      
      if (particlesRef.current.length > 2000) {
        particlesRef.current = particlesRef.current.filter(p => p.alpha > 0);
      }

      if (activeParticles > 0 || activeCrackersRef.current.length > 0 || loop) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (loopTimerRef.current) {
        clearTimeout(loopTimerRef.current);
        loopTimerRef.current = null;
      }
      if (visibilityHandler) {
        document.removeEventListener('visibilitychange', visibilityHandler);
        visibilityHandler = null;
      }
      window.removeEventListener('resize', updateSize);
    };
  }, [active, origin.x, origin.y, loop]);

  function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }

  return (
    <canvas 
      id="firework-canvas"
      ref={canvasRef} 
      style={{ width: '100%', height: '100%', display: 'block' }}
      className="absolute inset-0 pointer-events-none z-[1000]"
    />
  );
}

