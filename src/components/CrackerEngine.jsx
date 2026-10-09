import React, { useEffect, useRef } from 'react';

export default function CrackerEngine({ active = true, onFirstBurst }) {
  const canvasRef = useRef(null);
  
  const particlesRef = useRef([]);
  const emittersRef = useRef([]);
  const outCountRef = useRef(0);
  const isRandomModeRef = useRef(false);
  const waveRef = useRef(0);
  const hasFiredInitial = useRef(false);

  const goldenColors = ['#FFD700', '#FFA500', '#FFFFFF', '#FFF8DC', '#DAA520', '#F0E68C'];
  const vibrantPalettes = [
    ['#1E90FF', '#8A2BE2', '#00FFFF', '#9400D3', '#FF00FF', '#4169E1', '#00FA9A', '#FF1493'],
    ['#FF1493', '#FF0000', '#FF4500', '#FF7F50', '#DC143C', '#FF8C00'],
    ['#00FFFF', '#00FF00', '#32CD32', '#00FA9A', '#1E90FF', '#7FFF00'],
    ['#FF00FF', '#8A2BE2', '#9400D3', '#DA70D6', '#BA55D3', '#4B0082'],
    ['#FF4500', '#FF8C00', '#FFA500', '#FFD700', '#FFFF00', '#FF6347']
  ];

  function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    let animationFrameId;
    let intervalId;

    const updateSize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Particle factory
    const createParticle = (x, y, vx, vy, color, size, decay, gravity = 0.1, flicker = 0) => {
      particlesRef.current.push({
        x, y, vx, vy, color, alpha: 1, size, decay, gravity, flickerRate: flicker, history: [], friction: 0.98
      });
    };

    const spawnOut = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const startX = rect.width * 0.5 + (Math.random() - 0.5) * 100;
      const startY = rect.height * 0.8;
      
      const targetY = rect.height * (0.2 + Math.random() * 0.2);
      emittersRef.current.push({
        type: 'rocket',
        x: startX,
        y: startY,
        targetY: targetY,
        vy: -12 - Math.random() * 5,
        vx: (Math.random() - 0.5) * 4,
        colors: isRandomModeRef.current ? vibrantPalettes[waveRef.current % vibrantPalettes.length] : goldenColors,
        active: true
      });
      waveRef.current++;
    };

    const explodeOut = (x, y, colors) => {
      if (onFirstBurst && outCountRef.current === 0) onFirstBurst();
      outCountRef.current++;

      if (outCountRef.current >= 10 && !isRandomModeRef.current) {
        isRandomModeRef.current = true;
      }

      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

      const particleCount = window.innerWidth < 768 ? 120 : 300;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 20 + 5) * (Math.random() * 0.5 + 0.5);
        createParticle(
          x, y, 
          Math.cos(angle) * speed, Math.sin(angle) * speed, 
          colors[Math.floor(Math.random() * colors.length)], 
          Math.random() * 2.5 + 1, 
          Math.random() * 0.015 + 0.005, 
          0.1, Math.random() * 0.02
        );
      }
    };

    const spawnPusvanam = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      emittersRef.current.push({
        type: 'pusvanam',
        x: rect.width * 0.5,
        y: rect.height * 0.9,
        startT: Date.now(),
        duration: 4000,
        active: true
      });
    };

    const spawnSanguSakkaram = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      emittersRef.current.push({
        type: 'sangu_sakkaram',
        x: rect.width * 0.5,
        y: rect.height * 0.8,
        startT: Date.now(),
        duration: 3500,
        angle: 0,
        active: true
      });
    };

    const spawnMathaapu = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      emittersRef.current.push({
        type: 'mathaapu',
        x: rect.width * 0.5,
        y: rect.height * 0.3,
        startT: Date.now(),
        duration: 3000,
        active: true
      });
    };

    const spawnSaravedi = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      emittersRef.current.push({
        type: 'saravedi',
        x: rect.width * 0.2,
        y: rect.height * 0.8,
        targetX: rect.width * 0.8,
        startT: Date.now(),
        duration: 2500,
        lastPopT: 0,
        active: true
      });
    };

    const spawnLakshmi = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      emittersRef.current.push({
        type: 'lakshmi',
        x: rect.width * 0.5,
        y: rect.height * 0.6,
        startT: Date.now(),
        exploded: false,
        active: true
      });
    };

    const scheduleNext = () => {
      let delay = 2500 + Math.random() * 1500;
      
      intervalId = setTimeout(() => {
        if (document.visibilityState === 'visible') {
          if (!isRandomModeRef.current) {
            spawnOut();
          } else {
            const crackers = ['out', 'pusvanam', 'sangu_sakkaram', 'mathaapu', 'saravedi', 'lakshmi'];
            const pick = crackers[Math.floor(Math.random() * crackers.length)];
            
            if (pick === 'out') spawnOut();
            else if (pick === 'pusvanam') spawnPusvanam();
            else if (pick === 'sangu_sakkaram') spawnSanguSakkaram();
            else if (pick === 'mathaapu') spawnMathaapu();
            else if (pick === 'saravedi') spawnSaravedi();
            else if (pick === 'lakshmi') spawnLakshmi();
          }
        }
        scheduleNext();
      }, delay);
    };

    if (active && !hasFiredInitial.current) {
      hasFiredInitial.current = true;
      spawnOut(); 
      scheduleNext();
    }

    const render = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const now = Date.now();

      // Process Emitters
      emittersRef.current.forEach(emitter => {
        if (!emitter.active) return;
        
        if (emitter.type === 'rocket') {
          emitter.x += emitter.vx;
          emitter.y += emitter.vy;
          emitter.vy += 0.2; // gravity
          
          ctx.beginPath();
          ctx.arc(emitter.x, emitter.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#FFA500';
          ctx.fill();
          ctx.shadowBlur = 0;

          createParticle(emitter.x, emitter.y, (Math.random()-0.5)*2, (Math.random()-0.5)*2 + 2, '#FFA500', 2, 0.05, 0.05);

          if (emitter.vy >= 0 || emitter.y <= emitter.targetY) {
            explodeOut(emitter.x, emitter.y, emitter.colors);
            emitter.active = false;
          }
        } 
        else if (emitter.type === 'pusvanam') {
          if (now - emitter.startT < emitter.duration) {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(emitter.x - 10, emitter.y, 20, 30);
            
            for(let i=0; i<8; i++) {
              createParticle(emitter.x + (Math.random()-0.5)*10, emitter.y, (Math.random()-0.5)*6, -10 - Math.random()*8, goldenColors[Math.floor(Math.random()*goldenColors.length)], Math.random()*2+1, 0.02, 0.2);
            }
          } else {
            emitter.active = false;
          }
        }
        else if (emitter.type === 'sangu_sakkaram') {
          if (now - emitter.startT < emitter.duration) {
            emitter.angle += 0.4;
            
            ctx.save();
            ctx.translate(emitter.x, emitter.y);
            ctx.rotate(emitter.angle);
            ctx.fillStyle = '#FFA500';
            ctx.beginPath();
            ctx.arc(0, 0, 15, 0, Math.PI*2);
            ctx.fill();
            ctx.restore();

            for(let i=0; i<3; i++) {
              const a = emitter.angle + (i * Math.PI * (2/3));
              createParticle(emitter.x + Math.cos(a)*10, emitter.y + Math.sin(a)*10, Math.cos(a)*15, Math.sin(a)*15, goldenColors[Math.floor(Math.random()*goldenColors.length)], Math.random()*2+1, 0.03, 0);
            }
          } else {
            emitter.active = false;
          }
        }
        else if (emitter.type === 'mathaapu') {
          if (now - emitter.startT < emitter.duration) {
            ctx.strokeStyle = '#555';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(emitter.x, emitter.y);
            ctx.lineTo(emitter.x, emitter.y + 100);
            ctx.stroke();

            for(let i=0; i<5; i++) {
              createParticle(emitter.x + (Math.random()-0.5)*5, emitter.y + (Math.random()-0.5)*5, (Math.random()-0.5)*8, (Math.random()-0.5)*8, '#FFFFFF', Math.random()*2+1.5, 0.04, 0.05);
            }
          } else {
            emitter.active = false;
          }
        }
        else if (emitter.type === 'saravedi') {
          if (now - emitter.startT < emitter.duration) {
            const progress = (now - emitter.startT) / emitter.duration;
            const currentX = emitter.x + (emitter.targetX - emitter.x) * progress;
            const currentY = emitter.y + Math.sin(progress * Math.PI * 10) * 30;

            ctx.strokeStyle = '#AA3333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(emitter.x, emitter.y);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();

            if (now - emitter.lastPopT > 100) {
              emitter.lastPopT = now;
              if (navigator.vibrate) navigator.vibrate(20);
              
              ctx.fillStyle = 'rgba(255,255,255,0.8)';
              ctx.beginPath();
              ctx.arc(currentX, currentY, 30, 0, Math.PI*2);
              ctx.fill();
              
              for(let i=0; i<15; i++) {
                createParticle(currentX, currentY, (Math.random()-0.5)*10, (Math.random()-0.5)*10, '#FFD700', Math.random()*3+1, 0.05, 0.1);
              }
            }
          } else {
            emitter.active = false;
          }
        }
        else if (emitter.type === 'lakshmi') {
          const elapsed = now - emitter.startT;
          if (elapsed < 2000) {
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(emitter.x - 15, emitter.y - 15, 30, 30);
            
            createParticle(emitter.x, emitter.y - 15, (Math.random()-0.5)*2, -Math.random()*4, '#FFF', 1.5, 0.1, 0.05);
          } else if (!emitter.exploded) {
            emitter.exploded = true;
            if (navigator.vibrate) navigator.vibrate([300, 100, 200]);
            
            for(let i=0; i<200; i++) {
               const angle = Math.random() * Math.PI * 2;
               const speed = Math.random() * 30 + 10;
               createParticle(emitter.x, emitter.y, Math.cos(angle)*speed, Math.sin(angle)*speed, '#FFFFFF', Math.random()*4+2, 0.02, 0);
            }
          } else if (elapsed > 2500) {
            emitter.active = false;
          }
          
          if (emitter.exploded && elapsed < 2200) {
            ctx.fillStyle = `rgba(255,255,255,${1 - (elapsed-2000)/200})`;
            ctx.fillRect(0, 0, rect.width, rect.height);
          }
        }
      });

      emittersRef.current = emittersRef.current.filter(e => e.active);

      particlesRef.current.forEach(p => {
        if (p.history.length > 5) p.history.shift();
        p.history.push({ x: p.x, y: p.y });

        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        let currentAlpha = p.alpha;
        if (p.flickerRate > 0) {
          currentAlpha = Math.max(0, p.alpha - Math.sin(now * p.flickerRate) * 0.3);
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
      });
      
      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0);

      if (active) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (active) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener('resize', updateSize);
    };
  }, [active, onFirstBurst]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}
