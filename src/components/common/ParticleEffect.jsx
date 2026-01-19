import { useEffect } from 'react';
import confetti from 'canvas-confetti';

/**
 * ParticleEffect Component
 *
 * Creates celebratory particle effects using canvas-confetti.
 * Automatically triggers when the trigger prop changes to true.
 *
 * @param {boolean} trigger - When true, fires the particle effect
 * @param {string} type - Type of effect: 'confetti', 'hearts', 'stars', 'custom'
 * @param {object} customConfig - Custom confetti configuration (optional)
 */
export default function ParticleEffect({ trigger, type = 'confetti', customConfig = {} }) {
  useEffect(() => {
    if (!trigger) return;

    const configs = {
      confetti: {
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B9D', '#4ECDC4', '#FFE66D', '#F4A261'],
        shapes: ['circle', 'square'],
        ...customConfig
      },
      hearts: {
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF6B9D', '#FFB6C1', '#FF1493'],
        shapes: ['heart'],
        scalar: 2,
        ...customConfig
      },
      stars: {
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFE66D', '#F4A261', '#FFD700'],
        shapes: ['star'],
        scalar: 1.5,
        ...customConfig
      },
      custom: {
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        ...customConfig
      }
    };

    const config = configs[type] || configs.confetti;

    // Fire the confetti
    confetti(config);

    // Optional: Fire multiple bursts for dramatic effect
    if (type === 'confetti') {
      setTimeout(() => {
        confetti({
          ...config,
          particleCount: 50,
          spread: 90,
          origin: { x: 0.3, y: 0.6 }
        });
      }, 150);
      setTimeout(() => {
        confetti({
          ...config,
          particleCount: 50,
          spread: 90,
          origin: { x: 0.7, y: 0.6 }
        });
      }, 300);
    }
  }, [trigger, type, customConfig]);

  return null; // This component doesn't render anything
}

/**
 * Helper function to create a custom confetti burst from a specific element
 *
 * @param {HTMLElement} element - The element to fire confetti from
 * @param {object} options - Custom confetti options
 */
export function fireConfettiFromElement(element, options = {}) {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  confetti({
    particleCount: 50,
    spread: 60,
    origin: { x, y },
    colors: ['#FF6B9D', '#4ECDC4', '#FFE66D', '#F4A261'],
    ...options
  });
}
