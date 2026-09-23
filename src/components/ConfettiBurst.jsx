import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiBurst({ active }) {
  useEffect(() => {
    if (active) {
      const count = 250; // Huge burst
      const defaults = { origin: { y: 0.6 }, zIndex: 300 }; // Shoots from lower center
      
      function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        }));
      }

      // Layered realistic explosion
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
      
      // Add a secondary pop after 800ms
      setTimeout(() => {
        fire(0.2, { spread: 80, startVelocity: 40, origin: { y: 0.5 } });
      }, 800);
    }
  }, [active]);

  return null;
}
