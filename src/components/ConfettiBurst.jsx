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

    // 2. PUSHWANAM / BISWAANAM (Flower Pot / Fountain) - Majestic 6.0s smooth burn with rising height
    const firePusvanam = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      const baseX = width * 0.5; // Centered
      const baseY = height * 0.88; // Standing upright near bottom

      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([100, 50, 150]);
      }

      // 5.5 - 6 seconds of erupting fountain as requested
      const duration = 5800;
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
          
          // Eruption intensity curve: builds up slowly, stays high, then gracefully simmers down
          const progress = elapsed / duration;
          let intensity = progress < 0.25 
            ? (progress / 0.25) 
            : progress < 0.75 
            ? 1.0 
            : Math.max(0.2, (1 - (progress - 0.75) / 0.25));

          const fountainParticles = Math.floor(11 * intensity);

          for (let i = 0; i < fountainParticles; i++) {
            // Erupts high up into the card, arching like a golden tree
            const spreadAngle = -Math.PI / 2 + (Math.random() - 0.5) * 0.48; 
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
              gravity: 0.24, // Arching gracefully down
              alpha: 1,
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
          // Draw clay flower pot base
          ctx.save();
          ctx.fillStyle = '#8B4513';
          ctx.beginPath();
          ctx.moveTo(baseX - 13, baseY + 18);
          ctx.lineTo(baseX + 13, baseY + 18);
          ctx.lineTo(baseX + 6, baseY);
          ctx.lineTo(baseX - 6, baseY);
          ctx.closePath();
          ctx.fill();
          // Eruption rim glow
          ctx.fillStyle = '#FFA500';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#FF4500';
          ctx.fillRect(baseX - 5, baseY - 2, 10, 4);
          ctx.restore();
        }
      });
    };

    // 3. SANGU SAKKARAM (Ground Spinner) - Exact 94a4c5e design restored! Smooth ~5.0s spin
    const fireSanguSakkaram = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      let posX = width * (0.35 + Math.random() * 0.3);
      let posY = height * (0.7 + Math.random() * 0.12);
      
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([150, 40, 100, 40, 200]);
      }

      const duration = 5000;
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

          // Sakkaram wanders slightly on the floor (smooth natural drift)
          posX += (Math.random() - 0.5) * 1.5;
          posY += (Math.random() - 0.5) * 0.8;

          const sparksPerFrame = 7;
          const colors = ['#00FFFF', '#FF1493', '#FFD700', '#FF4500', '#7CFC00', '#FFFFFF'];

          for (let i = 0; i < sparksPerFrame; i++) {
            // Eject sparks tangentially from 2 nozzle arms
            const armAngle = angle + (i % 2 === 0 ? 0 : Math.PI);
            const nozzleDistance = 14;
            const originX = posX + Math.cos(armAngle) * nozzleDistance;
            const originY = posY + Math.sin(armAngle) * nozzleDistance;

            const tangentAngle = armAngle + Math.PI / 2 + (Math.random() - 0.5) * 0.3;
            const speed = Math.random() * 7 + 4;

            particlesRef.current.push({
              type: 'spark',
              isRocket: false,
              x: originX,
              y: originY,
              vx: Math.cos(tangentAngle) * speed,
              vy: Math.sin(tangentAngle) * speed,
              friction: 0.92,
              gravity: 0.08,
              alpha: 1,
              decay: 0.025,
              color: colors[Math.floor(Math.random() * colors.length)],
              size: Math.random() * 2 + 1,
              history: [],
              flickerRate: 0.1
            });
          }
          return true;
        },
        draw: (ctx) => {
          // Draw spinning wheel disc
          ctx.save();
          ctx.translate(posX, posY);
          ctx.rotate(angle);
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#FFD700';
          ctx.fillStyle = '#222';
          ctx.beginPath();
          ctx.arc(0, 0, 10, 0, Math.PI * 2);
          ctx.fill();
          // Red & Green spiral markings on chakkara
          ctx.strokeStyle = '#FF3333';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(-9, 0);
          ctx.lineTo(9, 0);
          ctx.stroke();
          ctx.restore();
        }
      });
    };

    // 4. KAMBI MATHAAPU (Handheld Sparkler) - Exact 94a4c5e design restored! Smooth ~6.0s burn
    const fireKambiMathaapu = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      
      const stickX = width * (0.45 + Math.random() * 0.1);
      const stickStartY = height * 0.28;
      const stickEndY = height * 0.75;
      
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([60, 40, 60]);
      }

      // Around 6 seconds slow, smooth burn
      const duration = 6000;
      const startTime = Date.now();

      activeCrackersRef.current.push({
        type: 'kambiMathaapu',
        startTime,
        duration,
        update: () => {
          const elapsed = Date.now() - startTime;
          if (elapsed > duration) return false;

          // Tip moves down as the sparkler chemical coating burns
          const progress = elapsed / duration;
          const currentBurnY = stickStartY + progress * (stickEndY - stickStartY * 1.3);

          // Crackling burst of needle sparks
          const sparkCount = 8;
          const sparklerColors = ['#FFFFFF', '#FFF8DC', '#FFFACD', '#FFFFE0', '#FFFAF0', '#FFD700'];

          for (let i = 0; i < sparkCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 2;

            particlesRef.current.push({
              type: 'spark',
              isRocket: false,
              x: stickX + (Math.random() - 0.5) * 4,
              y: currentBurnY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              friction: 0.88, // Quick deceleration into crackle
              gravity: 0.05,
              alpha: 1,
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
          const currentBurnY = stickStartY + progress * (stickEndY - stickStartY * 1.3);

          ctx.save();
          // Steel wire
          ctx.strokeStyle = '#B0C4DE';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(stickX, currentBurnY);
          ctx.lineTo(stickX, stickEndY);
          ctx.stroke();

          // Unburnt chemical coating below current burn point
          ctx.strokeStyle = '#708090';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(stickX, currentBurnY);
          ctx.lineTo(stickX, stickEndY - 20);
          ctx.stroke();

          // Blazing white hot sparkler core
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 18;
          ctx.shadowColor = '#FFF';
          ctx.beginPath();
          ctx.arc(stickX, currentBurnY, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
    };

    // 5. SARA VEDI (Garland Cracker / 1000-Wala) - Continuous Zigzag Braided Pattern, 7 seconds total
    const fireSaraVedi = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;

      // 40 pairs of crackers running down central fuse
      const totalPattasus = 40;
      const stringTopX = width * 0.5;
      const stringTopY = height * 0.20;
      const stringBottomY = height * 0.82;

      let currentIdx = 0;
      // 7.0 seconds of rhythmic continuous popping as requested
      const duration = 7000;
      const intervalDelay = duration / totalPattasus;
      let nextBurstTime = Date.now();

      activeCrackersRef.current.push({
        type: 'saraVedi',
        update: () => {
          if (currentIdx >= totalPattasus) return false;

          const now = Date.now();
          if (now >= nextBurstTime) {
            nextBurstTime = now + intervalDelay;

            // Progressive top-to-bottom fuse travel
            const t = currentIdx / totalPattasus;
            const centerY = stringTopY + (stringBottomY - stringTopY) * t;
            
            // Continuous zigzag: alternates left and right across the braided cord
            const isLeft = (currentIdx % 2 === 0);
            const sideOffset = (isLeft ? -16 : 16);
            const px = stringTopX + sideOffset + (Math.random() - 0.5) * 6;
            const py = centerY + (Math.random() - 0.5) * 4;

            // Vibrate on each pop
            if (typeof window !== 'undefined' && navigator.vibrate) {
              navigator.vibrate(25);
            }
            screenShakeRef.current = (Math.random() - 0.5) * 4;

            // Snappy red/gold sparks
            const colors = ['#FF4500', '#FFD700', '#FFFFFF', '#DC143C'];
            for (let i = 0; i < 18; i++) {
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
                decay: 0.04,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 2 + 1,
                history: [],
                flickerRate: 0.2
              });
            }

            // Red paper debris flying out
            for (let d = 0; d < 4; d++) {
              particlesRef.current.push({
                type: 'paper',
                isRocket: false,
                x: px,
                y: py,
                vx: (Math.random() - 0.5) * 6,
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

            currentIdx++;
          }
          return true;
        },
        draw: (ctx) => {
          if (currentIdx < totalPattasus) {
            ctx.save();
            // Draw central cord
            const t = currentIdx / totalPattasus;
            const currentY = stringTopY + (stringBottomY - stringTopY) * t;

            ctx.strokeStyle = '#DDD';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(stringTopX, currentY);
            ctx.lineTo(stringTopX, stringBottomY);
            ctx.stroke();

            // Draw unburnt pairs on both Left and Right in continuous zigzag layout
            for (let i = currentIdx; i < totalPattasus; i++) {
              const rowT = i / totalPattasus;
              const rowY = stringTopY + (stringBottomY - stringTopY) * rowT;
              ctx.fillStyle = '#CC1111';
              // Left roll
              ctx.fillRect(stringTopX - 14, rowY - 2.5, 12, 5);
              // Right roll
              ctx.fillRect(stringTopX + 2, rowY - 2.5, 12, 5);
            }
            ctx.restore();
          }
        }
      });
    };

    // 6. ATOM BOMB / LAKSHMI VEDI - Green casing with wrapped thread, rounded corners, 2s fuse + 1s blast + 1s clear = 4s total
    const fireLakshmiVedi = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      const bombX = width * 0.5;
      const bombY = height * 0.70;

      // Fuse burns for 2.0s, blast at 2s, total complete by 4.0s
      const startTime = Date.now();
      let hasDetonated = false;

      activeCrackersRef.current.push({
        type: 'lakshmiVedi',
        update: () => {
          const elapsed = Date.now() - startTime;
          if (elapsed < 2000) {
            // Burning fuse spark for 2 seconds
            const fuseProgress = elapsed / 2000;
            const fuseY = bombY - 14 - (1 - fuseProgress) * 16;
            particlesRef.current.push({
              type: 'spark',
              isRocket: false,
              x: bombX + (Math.random() - 0.5) * 3,
              y: fuseY,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              friction: 0.9,
              gravity: 0.05,
              alpha: 1,
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

          return elapsed < 3800; // Cleared by ~4s
        },
        draw: (ctx) => {
          const elapsed = Date.now() - startTime;
          if (elapsed < 2000) {
            // Draw authentic Green Atom Bomb with rounded corners and wrapped jute thread (nool)
            ctx.save();
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

            // White fuse wire coming out top
            ctx.strokeStyle = '#FFF';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(bombX, y);
            ctx.lineTo(bombX + 2, y - 16);
            ctx.stroke();

            ctx.restore();
          }
        }
      });
    };

    // Central cracker trigger function:
    // Flow strictly honored:
    // 1. Initial 10 Outs run first (as requested: "Calendar: First namma usual-ah vachirundha pattaasu varanum. Adha remove panna koodaadhu.")
    // 2. Step 10: Pushwanam (5-6s)
    // 3. Step 11: Sangu Sakkaram (5s)
    // 4. Step 12: Kambi Mathappu (6s)
    // 5. Step 13: Atom Bomb (4s)
    // 6. Step 14: Saravedi (7s)
    // 7. Step 15+: Remaining fireworks random in smooth, natural, slow timing!
    const triggerNextCracker = () => {
      // 1. First 10 crackers are strictly the usual OUTS!
      if (burstCountRef.current < 10) {
        burstCountRef.current++;
        currentCrackerRef.current = 'out';
        fireOut(false);
        return 3200 + Math.random() * 600; // Smooth natural timing between outs
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
          // 5.8s burn + 1.8s peaceful gap = 7.6s
          delayAfterThis = 7600;
          break;
        case 'sanguSakkaram':
          fireSanguSakkaram();
          // 5.0s spin + 1.8s peaceful gap = 6.8s
          delayAfterThis = 6800;
          break;
        case 'kambiMathaapu':
          fireKambiMathaapu();
          // 6.0s burn + 1.8s peaceful gap = 7.8s
          delayAfterThis = 7800;
          break;
        case 'lakshmiVedi':
          fireLakshmiVedi();
          // 2s fuse + 1s blast + 1s clear + 1.5s quiet = 5.5s
          delayAfterThis = 5500;
          break;
        case 'saraVedi':
          fireSaraVedi();
          // 7.0s continuous zigzag + 1.8s smoke clear gap = 8.8s
          delayAfterThis = 8800;
          break;
        case 'out':
        default:
          fireOut(false);
          // Out hangs for ~3s + 1.8s gap
          delayAfterThis = 4800;
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
    if (loop && !loopTimerRef.current) {
      const scheduleNext = () => {
        const delay = triggerNextCracker();
        
        loopTimerRef.current = setTimeout(() => {
          if (document.visibilityState === 'visible') {
            scheduleNext();
          } else {
            const onVisible = () => {
              if (document.visibilityState === 'visible') {
                document.removeEventListener('visibilitychange', onVisible);
                scheduleNext();
              }
            };
            document.addEventListener('visibilitychange', onVisible);
          }
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

      // 1. Update and draw active grounded cracker models (Pusvanam base, Chakkara disc, Sparkler wire)
      activeCrackersRef.current = activeCrackersRef.current.filter((cracker) => {
        const isStillActive = cracker.update();
        if (isStillActive && cracker.draw) {
          cracker.draw(ctx);
        }
        return isStillActive;
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

      // 3. Blinding Screen Flash (for Lakshmi vedi)
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

