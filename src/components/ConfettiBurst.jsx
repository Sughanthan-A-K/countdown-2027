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

    // 2. BISWAANAM / PUSVANAM (Flower Pot / Fountain)
    const firePusvanam = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      const baseX = width * 0.5; // Centered
      const baseY = height * 0.90;

      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([120, 60, 200]);
      }

      // Runs for 5.5s with majestic rising height
      const duration = 5500;
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
          // Smooth bell curve: starts gentle, soars high, holds, then settles
          let heightMult = progress < 0.25 
            ? (progress / 0.25) 
            : progress < 0.75 
            ? 1.0 
            : Math.max(0.2, (1 - (progress - 0.75) / 0.25));

          const particleBatch = Math.floor(12 * heightMult);

          for (let i = 0; i < particleBatch; i++) {
            // Shoots high up into the card (height scaling up to top half)
            const spreadAngle = -Math.PI / 2 + (Math.random() - 0.5) * 0.42; 
            const speed = (Math.random() * 14 + 11) * heightMult; // Higher velocity for tall eruption
            const goldColors = ['#FFFFFF', '#FFF8DC', '#FFE4B5', '#FFD700', '#FFA500', '#FF8C00', '#FFFFE0'];
            
            particlesRef.current.push({
              type: 'spark',
              isRocket: false,
              x: baseX + (Math.random() - 0.5) * 6,
              y: baseY - 4,
              vx: Math.cos(spreadAngle) * speed,
              vy: Math.sin(spreadAngle) * speed,
              friction: 0.97, // Lower friction so it climbs very high
              gravity: 0.28,  // Gravity pulls it down in magnificent arching umbrella
              alpha: 1,
              decay: Math.random() * 0.016 + 0.010,
              color: goldColors[Math.floor(Math.random() * goldColors.length)],
              size: Math.random() * 2.2 + 0.8,
              history: [],
              flickerRate: 0.18
            });
          }
          return true;
        },
        draw: (ctx) => {
          // Clay pot base
          ctx.save();
          ctx.fillStyle = '#8B4513';
          ctx.beginPath();
          ctx.moveTo(baseX - 14, baseY + 18);
          ctx.lineTo(baseX + 14, baseY + 18);
          ctx.lineTo(baseX + 7, baseY);
          ctx.lineTo(baseX - 7, baseY);
          ctx.closePath();
          ctx.fill();
          // Sparkling rim
          ctx.fillStyle = '#FFA500';
          ctx.shadowBlur = 18;
          ctx.shadowColor = '#FF8C00';
          ctx.fillRect(baseX - 6, baseY - 3, 12, 5);
          ctx.restore();
        }
      });
    };

    // 3. SANGU SAKKARAM (Ground Spinner - Roving naturally around the card)
    const fireSanguSakkaram = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      let posX = width * 0.5;
      let posY = height * 0.78;
      
      // Velocity vector for roving motion across screen
      let moveVx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1.5 + 1.2);
      let moveVy = (Math.random() - 0.5) * 0.8;

      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([150, 40, 100, 40, 200]);
      }

      const duration = 5200;
      const startTime = Date.now();
      let angle = 0;

      activeCrackersRef.current.push({
        type: 'sanguSakkaram',
        startTime,
        duration,
        update: () => {
          const elapsed = Date.now() - startTime;
          if (elapsed > duration) return false;

          const progress = elapsed / duration;
          const spinSpeed = progress < 0.15 ? (0.3 + progress * 3) : progress > 0.85 ? 0.35 : 0.75;
          angle += spinSpeed;

          // Natural roving: wanders across screen, bounces gently off card margins
          posX += moveVx;
          posY += moveVy;

          // Wall bounce boundaries within card width & bottom zone
          const minX = width * 0.15;
          const maxX = width * 0.85;
          const minY = height * 0.65;
          const maxY = height * 0.88;

          if (posX <= minX || posX >= maxX) {
            moveVx = -moveVx * 0.95;
            moveVy += (Math.random() - 0.5) * 0.6;
          }
          if (posY <= minY || posY >= maxY) {
            moveVy = -moveVy * 0.95;
            moveVx += (Math.random() - 0.5) * 0.6;
          }

          // Random slight redirection to feel unpredictable like real chakkara
          if (Math.random() < 0.05) {
            moveVx += (Math.random() - 0.5) * 0.8;
            moveVy += (Math.random() - 0.5) * 0.5;
          }

          const sparksPerFrame = 8;
          const colors = ['#00FFFF', '#FF1493', '#FFD700', '#FF4500', '#7CFC00', '#FFFFFF', '#00FA9A'];

          for (let i = 0; i < sparksPerFrame; i++) {
            const armAngle = angle + (i % 2 === 0 ? 0 : Math.PI);
            const nozzleDistance = 14;
            const originX = posX + Math.cos(armAngle) * nozzleDistance;
            const originY = posY + Math.sin(armAngle) * nozzleDistance;

            const tangentAngle = armAngle + Math.PI / 2 + (Math.random() - 0.5) * 0.35;
            const speed = Math.random() * 8 + 5;

            particlesRef.current.push({
              type: 'spark',
              isRocket: false,
              x: originX,
              y: originY,
              vx: Math.cos(tangentAngle) * speed,
              vy: Math.sin(tangentAngle) * speed,
              friction: 0.92,
              gravity: 0.10,
              alpha: 1,
              decay: 0.024,
              color: colors[Math.floor(Math.random() * colors.length)],
              size: Math.random() * 2 + 1,
              history: [],
              flickerRate: 0.1
            });
          }
          return true;
        },
        draw: (ctx) => {
          ctx.save();
          ctx.translate(posX, posY);
          ctx.rotate(angle);
          ctx.shadowBlur = 14;
          ctx.shadowColor = '#FFD700';
          ctx.fillStyle = '#222';
          ctx.beginPath();
          ctx.arc(0, 0, 11, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FF3333';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(-10, 0);
          ctx.lineTo(10, 0);
          ctx.stroke();
          ctx.restore();
        }
      });
    };

    // 4. KAMBI MATHAAPU (Handheld Sparkler - Swirled in Playful Hand Circles!)
    const fireKambiMathaapu = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      
      const centerX = width * 0.5;
      const centerY = height * 0.55;
      
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([60, 40, 60]);
      }

      const duration = 5800;
      const startTime = Date.now();
      let motionAngle = 0;

      activeCrackersRef.current.push({
        type: 'kambiMathaapu',
        startTime,
        duration,
        update: () => {
          const elapsed = Date.now() - startTime;
          if (elapsed > duration) return false;

          // Hand swirling circular / figure-8 motion!
          motionAngle += 0.06;
          const radiusX = width * 0.22;
          const radiusY = height * 0.14;
          const tipX = centerX + Math.cos(motionAngle) * radiusX;
          const tipY = centerY + Math.sin(motionAngle * 1.5) * radiusY;

          // Spark emission from the moving burning tip
          const sparkCount = 9;
          const sparklerColors = ['#FFFFFF', '#FFF8DC', '#FFFACD', '#FFFFE0', '#FFFAF0', '#FFD700', '#F0E68C'];

          for (let i = 0; i < sparkCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 9 + 2;

            particlesRef.current.push({
              type: 'spark',
              isRocket: false,
              x: tipX + (Math.random() - 0.5) * 4,
              y: tipY + (Math.random() - 0.5) * 4,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              friction: 0.88,
              gravity: 0.05,
              alpha: 1,
              decay: 0.032 + Math.random() * 0.02,
              color: sparklerColors[Math.floor(Math.random() * sparklerColors.length)],
              size: Math.random() * 1.8 + 0.6,
              history: [],
              flickerRate: 0.35
            });
          }
          return true;
        },
        draw: (ctx) => {
          // Calculate current moving tip position
          const elapsed = Date.now() - startTime;
          const currentMotionAngle = (elapsed / duration) * (0.06 * (duration / 16.6));
          const radiusX = width * 0.22;
          const radiusY = height * 0.14;
          const tipX = centerX + Math.cos(currentMotionAngle) * radiusX;
          const tipY = centerY + Math.sin(currentMotionAngle * 1.5) * radiusY;

          // Handle angled stick pointing from hand towards moving tip
          const handleX = tipX - 35;
          const handleY = tipY + 65;

          ctx.save();
          // Metal wire
          ctx.strokeStyle = '#C0C0C0';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(handleX, handleY);
          ctx.lineTo(tipX, tipY);
          ctx.stroke();

          // Blazing star core spark
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#FFF';
          ctx.beginPath();
          ctx.arc(tipX, tipY, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
    };

    // 5. SARA VEDI (Garland Cracker - Left-Right-Left-Right Authentic Herringbone Braided String)
    const fireSaraVedi = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;

      // Garland hangs vertically down the center
      const totalPattasus = 26;
      const stringTopX = width * 0.5;
      const stringTopY = height * 0.22;
      const stringBottomY = height * 0.82;

      let currentIdx = 0;
      const duration = 4000;
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
            // Alternates strictly LEFT then RIGHT off the central fuse cord!
            const isLeft = (currentIdx % 2 === 0);
            const sideOffset = (isLeft ? -22 : 22);
            const px = stringTopX + sideOffset + (Math.random() - 0.5) * 8;
            const py = centerY + (Math.random() - 0.5) * 6;

            // Sharp vibration on each pop
            if (typeof window !== 'undefined' && navigator.vibrate) {
              navigator.vibrate(35);
            }
            screenShakeRef.current = (Math.random() - 0.5) * 6;

            // Crisp snappy pop spark blast
            const colors = ['#FF4500', '#FFD700', '#FFFFFF', '#DC143C'];
            for (let i = 0; i < 20; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 7 + 3;
              particlesRef.current.push({
                type: 'spark',
                isRocket: false,
                x: px,
                y: py,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                friction: 0.89,
                gravity: 0.12,
                alpha: 1,
                decay: 0.045,
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
            // Draw remaining unburnt central fuse cord
            const t = currentIdx / totalPattasus;
            const currentY = stringTopY + (stringBottomY - stringTopY) * t;

            ctx.strokeStyle = '#DDD';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(stringTopX, currentY);
            ctx.lineTo(stringTopX, stringBottomY);
            ctx.stroke();

            // Draw unburnt red cracker rolls on LEFT and RIGHT branches
            for (let i = currentIdx; i < totalPattasus; i++) {
              const rowT = i / totalPattasus;
              const rowY = stringTopY + (stringBottomY - stringTopY) * rowT;
              const isL = (i % 2 === 0);

              ctx.fillStyle = '#CC1111';
              // Cracker cylinder roll
              if (isL) {
                ctx.fillRect(stringTopX - 18, rowY - 3, 16, 6);
              } else {
                ctx.fillRect(stringTopX + 2, rowY - 3, 16, 6);
              }
            }
            ctx.restore();
          }
        }
      });
    };

    // 6. LAKSHMI VEDI / ATOM BOMB (Heavy tight single blast, instant 'dub' boom)
    const fireLakshmiVedi = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      const bombX = width * 0.5;
      const bombY = height * 0.72;

      // Small fuse burning for 900ms, then localized heavy blast!
      const startTime = Date.now();
      let hasDetonated = false;

      activeCrackersRef.current.push({
        type: 'lakshmiVedi',
        update: () => {
          const elapsed = Date.now() - startTime;
          if (elapsed < 900) {
            // Fuse sparkling spark
            const fuseY = bombY - 14 - (1 - elapsed / 900) * 12;
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
            // Massive screen flash and heavy screen shake
            flashAlphaRef.current = 0.95;
            screenShakeRef.current = 16;

            if (typeof window !== 'undefined' && navigator.vibrate) {
              navigator.vibrate([400, 80, 200]);
            }

            // Localized dense blast: tight radius, disappears fast like a real atom bomb 'dub'!
            const colors = ['#FFFFFF', '#FFD700', '#FF4500'];
            for (let i = 0; i < 70; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = (Math.random() * 10 + 3); // Tight radius, no aerial shower!
              particlesRef.current.push({
                type: 'spark',
                isRocket: false,
                x: bombX,
                y: bombY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                friction: 0.88, // Decelerates fast
                gravity: 0.12,
                alpha: 1,
                decay: 0.045, // Dissipates in a split second!
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 2.5 + 1.2,
                history: [],
                flickerRate: 0
              });
            }

            // Green/Red triangular paper casing shreds exploding out
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
                color: p % 2 === 0 ? '#228B22' : '#B22222',
                size: Math.random() * 4 + 2,
                history: [],
                flickerRate: 0
              });
            }
          }

          return elapsed < 1600; // Fast finish
        },
        draw: (ctx) => {
          const elapsed = Date.now() - startTime;
          if (elapsed < 900) {
            // Draw green & red atom bomb with golden band
            ctx.save();
            ctx.fillStyle = '#228B22';
            ctx.fillRect(bombX - 10, bombY - 14, 20, 22);
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(bombX - 10, bombY - 6, 20, 6);
            ctx.strokeStyle = '#FFF';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(bombX, bombY - 14);
            ctx.lineTo(bombX + 3, bombY - 24);
            ctx.stroke();
            ctx.restore();
          }
        }
      });
    };

    // Central cracker trigger function with Authentic Story Flow:
    // Flow: 
    // Step 0: 1st Calendar Out (already fired on reveal)
    // Step 1: Biswaanam (Flower Pot)
    // Step 2 & 3: Sangu Sakkaram & Kambi Mathaapu (or vice versa)
    // Step 4: Lakshmi Vedi (Atom Bomb)
    // Step 5: Sara Vedi (1000-Wala)
    // Step 6+: Endless Random Variety (with calm 1.5s - 2.5s peaceful gaps)
    const triggerNextCracker = () => {
      const step = burstCountRef.current;
      burstCountRef.current++;

      let nextChoice = 'pusvanam';
      let delayAfterThis = 7000; // Generous natural pacing so crackers finish cleanly

      if (step === 1) {
        // Step 1: Always Biswaanam first!
        nextChoice = 'pusvanam';
      } else if (step === 2) {
        // Step 2: Randomly either Sangu Sakkaram or Kambi Mathaapu
        nextChoice = (Math.random() > 0.5 ? 'sanguSakkaram' : 'kambiMathaapu');
      } else if (step === 3) {
        // Step 3: The remaining one from Sangu Sakkaram / Kambi Mathaapu
        nextChoice = (lastRandomCrackerRef.current === 'sanguSakkaram' ? 'kambiMathaapu' : 'sanguSakkaram');
      } else if (step === 4) {
        // Step 4: Atom Bomb
        nextChoice = 'lakshmiVedi';
      } else if (step === 5) {
        // Step 5: Sara Vedi
        nextChoice = 'saraVedi';
      } else {
        // Step 6+: Endless random mode (no consecutive duplicates)
        const choices = availableCrackers.filter(c => c !== lastRandomCrackerRef.current);
        nextChoice = choices[Math.floor(Math.random() * choices.length)];
      }

      lastRandomCrackerRef.current = nextChoice;
      currentCrackerRef.current = nextChoice;

      switch (nextChoice) {
        case 'pusvanam':
          firePusvanam();
          // Pusvanam burns for 5.5s + 2.0s peaceful gap
          delayAfterThis = 7500;
          break;
        case 'sanguSakkaram':
          fireSanguSakkaram();
          // Chakkara spins for 5.2s + 1.8s peaceful gap
          delayAfterThis = 7000;
          break;
        case 'kambiMathaapu':
          fireKambiMathaapu();
          // Sparkler circles for 5.8s + 1.8s peaceful gap
          delayAfterThis = 7600;
          break;
        case 'lakshmiVedi':
          fireLakshmiVedi();
          // Atom bomb explodes at 0.9s, clears by 1.6s + 2.4s peaceful quiet after the huge blast
          delayAfterThis = 4200;
          break;
        case 'saraVedi':
          fireSaraVedi();
          // Garland pops for 4.0s + 2.0s peaceful smoke clearing gap
          delayAfterThis = 6200;
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
          burstCountRef.current = 1;
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
      
      // Gentle 3.2s gap after the 1st calendar out reaches apex before Biswaanam lights up
      loopTimerRef.current = setTimeout(scheduleNext, 3200);
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

