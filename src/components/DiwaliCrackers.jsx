import React, { useEffect, useRef } from 'react';

export default function DiwaliCrackers({ active, onFirstBurst }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationId;
    let particles = [];
    let flashes = [];

    // State Machine
    let outCount = 0;
    let currentCracker = null;
    let idleTicks = 30; // Start almost immediately
    let hasFiredFirst = false;

    let shakeX = 0;
    let shakeY = 0;
    let shakeTicks = 0;
    let shakeIntensity = 0;

    const types = ['pusvanam', 'chakra', 'mathaapu', 'saravedi', 'lakshmi', 'out'];
    let lastType = 'out';

    const random = (min, max) => Math.random() * (max - min) + min;
    const isMobile = window.innerWidth < 768;

    const spawnParticles = (x, y, count, config) => {
      const adjustedCount = isMobile ? Math.floor(count * 0.5) : count;
      for (let i = 0; i < adjustedCount; i++) {
        particles.push({
          x, y,
          vx: config.vx !== undefined ? config.vx : random(-5, 5),
          vy: config.vy !== undefined ? config.vy : random(-5, 5),
          size: config.size || random(1.5, 3.5),
          color: config.color || '#fff',
          alpha: 1,
          decay: config.decay || 0.02,
          gravity: config.gravity !== undefined ? config.gravity : 0.1
        });
      }
    };

    const startNextCracker = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;

      let type = 'out';
      if (outCount < 10) {
        type = 'out';
        outCount++;
      } else {
        do {
          type = types[Math.floor(Math.random() * types.length)];
        } while (type === lastType);
        lastType = type;
      }

      currentCracker = {
        type,
        ticks: 0,
        w, h,
        state: {}
      };

      if (type === 'out') {
        currentCracker.maxTicks = 160;
        currentCracker.state = { phase: 'up', x: w / 2 + random(-50, 50), y: h, vy: -12 };
      } else if (type === 'pusvanam') {
        currentCracker.maxTicks = 200; // ~3.3 seconds
      } else if (type === 'chakra') {
        currentCracker.maxTicks = 180; // 3 seconds
        currentCracker.state = { angle: 0 };
      } else if (type === 'mathaapu') {
        currentCracker.maxTicks = 180; // 3 seconds
        currentCracker.state = { time: 0, cx: w/2, cy: h/2 };
      } else if (type === 'saravedi') {
        currentCracker.maxTicks = 140; // ~2.3 seconds
      } else if (type === 'lakshmi') {
        currentCracker.maxTicks = 100; // ~1.6 seconds
      }
    };

    const updateCracker = () => {
      if (!currentCracker) {
        idleTicks--;
        if (idleTicks <= 0) {
          startNextCracker();
        }
        return;
      }

      const { type, ticks, maxTicks, state, w, h } = currentCracker;

      if (type === 'out') {
        if (state.phase === 'up') {
          state.y += state.vy;
          state.vy += 0.2; // gravity
          
          // Tail
          spawnParticles(state.x, state.y, 1, { vx: random(-1, 1), vy: random(0, 2), size: 2, color: '#facc15', decay: 0.1 });
          
          if (state.vy >= 0) {
            state.phase = 'explode';
            
            if (!hasFiredFirst && onFirstBurst) {
              onFirstBurst();
              hasFiredFirst = true;
            }

            const colors = ['#ff3333', '#33ff33', '#3333ff', '#ffff33', '#ff33ff', '#33ffff', '#ffa500'];
            const col = colors[Math.floor(Math.random() * colors.length)];
            const particleCount = isMobile ? 80 : 150;
            
            for (let i = 0; i < particleCount; i++) {
              const angle = random(0, Math.PI * 2);
              const speed = random(2, 12);
              spawnParticles(state.x, state.y, 1, {
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: col,
                decay: random(0.015, 0.03),
                gravity: 0.1
              });
            }
          }
        }
      } else if (type === 'pusvanam') {
        if (ticks < maxTicks - 60) { // Keep erupting until last 1s
          spawnParticles(w / 2 + random(-20, 20), h, 5, {
            vx: random(-3, 3),
            vy: random(-18, -8),
            color: Math.random() > 0.4 ? '#facc15' : '#ffffff',
            decay: random(0.015, 0.03),
            gravity: 0.25,
            size: random(2, 4)
          });
        }
      } else if (type === 'chakra') {
        if (ticks < maxTicks - 40) {
          state.angle += 0.6;
          for (let i = 0; i < 4; i++) {
            const a = state.angle + (i * Math.PI / 2);
            spawnParticles(w / 2, h / 2 + 50, 2, {
              vx: Math.cos(a) * 14,
              vy: Math.sin(a) * 14,
              color: Math.random() > 0.2 ? '#facc15' : '#ff4500',
              decay: 0.04,
              gravity: 0
            });
          }
        }
      } else if (type === 'mathaapu') {
        if (ticks < maxTicks - 40) {
          state.time += 0.05;
          const cx = w / 2 + Math.sin(state.time * 2.5) * 80;
          const cy = h / 2 + Math.cos(state.time * 1.8) * 60;
          
          flashes.push({ type: 'core', x: cx, y: cy });
          spawnParticles(cx, cy, 6, {
            vx: random(-8, 8),
            vy: random(-8, 8),
            color: '#ffffff',
            decay: random(0.03, 0.06),
            gravity: 0.1,
            size: random(1.5, 3)
          });
        }
      } else if (type === 'saravedi') {
        if (ticks < maxTicks - 30 && ticks % 8 === 0) {
          const ex = w / 2 + random(-120, 120);
          const ey = h / 2 + random(-180, 180);
          for (let i = 0; i < 25; i++) {
            const a = random(0, Math.PI * 2);
            const s = random(2, 8);
            spawnParticles(ex, ey, 1, { vx: Math.cos(a) * s, vy: Math.sin(a) * s, color: '#ffea00', decay: 0.05 });
          }
          flashes.push({ type: 'flash', alpha: 0.4 });
          shakeTicks = 4;
          shakeIntensity = 6;
        }
      } else if (type === 'lakshmi') {
        if (ticks === 15) {
          const particleCount = isMobile ? 150 : 300;
          for (let i = 0; i < particleCount; i++) {
            const a = random(0, Math.PI * 2);
            const s = random(8, 25);
            spawnParticles(w / 2, h / 2, 1, { vx: Math.cos(a) * s, vy: Math.sin(a) * s, color: '#ffffff', decay: 0.02, gravity: 0 });
          }
          flashes.push({ type: 'flash', alpha: 1.0 });
          shakeTicks = 25;
          shakeIntensity = 18;
        }
      }

      currentCracker.ticks++;
      if (currentCracker.ticks >= currentCracker.maxTicks) {
        currentCracker = null;
        idleTicks = random(60, 120); // 1 to 2 seconds gap
      }
    };

    const render = () => {
      if (!canvas) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;
      
      if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);

      if (shakeTicks > 0) {
        shakeX = random(-shakeIntensity, shakeIntensity);
        shakeY = random(-shakeIntensity, shakeIntensity);
        shakeTicks--;
      } else {
        shakeX = 0; shakeY = 0;
      }

      ctx.save();
      ctx.translate(shakeX, shakeY);

      // Draw flashes
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        if (f.type === 'flash') {
          ctx.fillStyle = `rgba(255, 255, 255, ${f.alpha})`;
          ctx.fillRect(-shakeX, -shakeY, w, h);
          f.alpha -= 0.08;
          if (f.alpha <= 0) flashes.splice(i, 1);
        } else if (f.type === 'core') {
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(f.x, f.y, 4, 0, Math.PI * 2);
          ctx.fill();
          flashes.splice(i, 1);
        }
      }

      // Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        
        if (isMobile) {
          ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      updateCracker();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [active, onFirstBurst]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}
