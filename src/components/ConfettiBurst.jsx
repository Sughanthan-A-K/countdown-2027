import React, { useEffect, useRef } from 'react';

export default function ConfettiBurst({ active = true, origin = { y: 0.25, x: 0.5 }, launchOrigin = null, loop = false, skipInitial = false, forceRocket = false, onFirstBurst }) {
  const canvasRef = useRef(null);
  
  // Persist physics state across re-renders (like when 'loop' prop toggles)
  const particlesRef = useRef([]);
  const waveRef = useRef(0);
  const hasFiredInitial = useRef(false);
  const hasFiredFirstBurstCallback = useRef(false);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let intervalId;

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
    const redColors = ['#FF1493', '#FF0000', '#FF4500', '#FF7F50', '#DC143C'];
    const blueGreenColors = ['#00FFFF', '#00FF00', '#32CD32', '#00FA9A', '#1E90FF'];

    const explode = (startX, startY, selectedColors) => {
      const particleCount = loop ? 120 : 450; // High burst for initial fullscreen, smaller for loop frame
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 20 + 5) * (Math.random() * 0.5 + 0.5);
        
        particlesRef.current.push({
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

    const fire = (directExplode = false) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      
      // If looping (inside Calendar), make the first explosion colorful! If grand finale (!loop), keep it Golden.
      const pinkBlueColors = ['#FF1493', '#FF69B4', '#00FFFF', '#1E90FF', '#8A2BE2', '#FF00FF'];
      let selectedColors = loop ? pinkBlueColors : goldenColors;

      // Determine colors based on wave sequence if we are looping
      if (hasFiredInitial.current && loop) {
        const waveType = waveRef.current % 3;
        if (waveType === 0) selectedColors = goldenColors;
        else if (waveType === 1) selectedColors = redColors;
        else selectedColors = blueGreenColors;
        waveRef.current++;
      }
      
      if (directExplode && !forceRocket) {
        // Explode directly at origin (used for the very first fullscreen golden shower)
        const startX = width * origin.x;
        const startY = height * origin.y;
        explode(startX, startY, selectedColors);
      } else {
        // Launch a rocket from the bottom of the container!
        const startX = launchOrigin ? width * launchOrigin.x : width * (0.3 + Math.random() * 0.4); 
        const startY = launchOrigin ? height * launchOrigin.y : height + 10;
        
        // Apex is origin.y if forceRocket, otherwise random upper half
        const targetY = (forceRocket || launchOrigin) ? height * origin.y : height * (0.1 + Math.random() * 0.4); 
        
        // Physics: v^2 = u^2 + 2as -> u = sqrt(-2as) (where v=0 at apex)
        const distanceY = startY - targetY;
        const gravity = launchOrigin ? 0.04 : 0.15; // Lower gravity for 3s cinematic hangtime
        const initialVy = -Math.sqrt(2 * gravity * Math.max(10, distanceY));
        
        particlesRef.current.push({
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

    // Fire the initial logic
    if (!hasFiredInitial.current) {
      if (!skipInitial) {
        // If it's the fullscreen event (!loop), the HTML matchstick already acted as the rocket, so direct explode.
        // If it's the calendar frame (loop), start with a rocket!
        fire(!loop);
      }
      hasFiredInitial.current = true;
    }

    // Start interval only if loop is true
    if (loop) {
      intervalId = setInterval(() => {
        // Prevent massive queued explosions when user switches tabs
        if (document.visibilityState === 'visible') {
          fire(false);
        }
      }, 2400); // Launch a new rocket every 2.4s
    }

    const render = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      let activeParticles = 0;

      particlesRef.current.forEach((p) => {
        if (p.alpha <= 0) return;
        activeParticles++;

        p.history.push({ x: p.x, y: p.y });
        
        if (p.isRocket) {
          if (p.initialY === undefined) p.initialY = p.y;
          
          // CRITICAL FIX: Safeguard against initialY being 0 (which causes NaN and silent canvas failure)
          const safeInitialY = Math.max(1, p.initialY);
          
          // Calculate scale based on height to create 3D depth effect (shrinks as it goes up)
          const progress = Math.max(0, Math.min(1, (safeInitialY - p.y) / (safeInitialY * 0.75)));
          const scale = Math.max(0.1, 1.0 - (progress * 0.7)); // Shrinks down to 30% size, never below 0.1!

          if (p.history.length > 12) p.history.shift(); // Tail length of 12 frames
          
          p.vy += p.gravity;
          p.x += p.vx;
          p.y += p.vy;

          const cylinderWidth = 32; // Exact visual width of w-8 in Tailwind
          const headRadius = (cylinderWidth / 2) * scale;
          const tailWidth = cylinderWidth * scale;

          // Draw the tapering rocket tail with beautiful flickering (minnu minnikira kodu)
          if (p.history.length > 1) {
            // Add rapid flicker/sparkle effect specifically requested by user (Calculated ONCE per frame so it doesn't look like separated circles)
            const tailFlicker = 0.6 + Math.random() * 0.4;
            const widthFlicker = 0.8 + Math.random() * 0.4;
            
            for (let i = 1; i < p.history.length; i++) {
              const segmentScale = (i / p.history.length); // 0 at tail end, 1 at head
              
              ctx.beginPath();
              ctx.moveTo(p.history[i-1].x, p.history[i-1].y);
              ctx.lineTo(p.history[i].x, p.history[i].y);
              
              // Color gets hotter towards the head
              ctx.strokeStyle = `rgba(255, ${100 + segmentScale * 155}, 0, ${segmentScale * scale * tailFlicker})`;
              ctx.lineWidth = tailWidth * segmentScale * widthFlicker;
              ctx.lineCap = 'round';
              ctx.stroke();
            }
          }

          // Draw bright core spark at the head matching the cylinder width
          const headFlicker = 0.8 + Math.random() * 0.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, headRadius * headFlicker, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 20 * scale;
          ctx.shadowColor = '#FFA500';
          ctx.fill();
          
          // Inner core for intense brightness
          ctx.beginPath();
          ctx.arc(p.x, p.y, headRadius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFDD';
          ctx.fill();
          
          ctx.shadowBlur = 0; // Reset

          // Explode when it reaches apex (velocity becomes positive/downward)
          if (p.vy >= -0.5) {
            p.alpha = 0; // kill rocket
            explode(p.x, p.y, p.colorTheme); // spawn the beautiful shower
            
            // Trigger the external callback if provided
            if (onFirstBurst && !hasFiredFirstBurstCallback.current) {
              onFirstBurst();
              hasFiredFirstBurstCallback.current = true;
            }
          }
        } else {
          // Standard falling particle logic
          if (p.history.length > 20) p.history.shift();

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
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${Math.max(0, currentAlpha)})`;
            ctx.fill();
          }
        }
      });
      
      if (particlesRef.current.length > 1500) {
        particlesRef.current = particlesRef.current.filter(p => p.alpha > 0);
      }

      if (activeParticles > 0 || loop) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (intervalId) clearInterval(intervalId);
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
