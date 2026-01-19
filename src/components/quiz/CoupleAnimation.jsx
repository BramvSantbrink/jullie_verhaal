import { useEffect, useState } from 'react';
import { config } from '../../config';

/**
 * Animated stick figures with couple photos that walk together and either kiss (correct) or trip (incorrect)
 */
export function CoupleAnimation({ isCorrect, onAnimationEnd }) {
  const [phase, setPhase] = useState('walking'); // 'walking' | 'ending'
  const { couplePhotos } = config;

  useEffect(() => {
    // After walking animation, show ending
    const walkTimer = setTimeout(() => {
      setPhase('ending');
    }, 1500);

    // Call onAnimationEnd after full animation
    const endTimer = setTimeout(() => {
      if (onAnimationEnd) onAnimationEnd();
    }, 3000);

    return () => {
      clearTimeout(walkTimer);
      clearTimeout(endTimer);
    };
  }, [onAnimationEnd]);

  return (
    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-b from-sky-100 to-green-100 rounded-xl my-4">
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-green-300" />

      {/* Hearts for correct answer */}
      {isCorrect && phase === 'ending' && (
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-4 left-1/2 -translate-x-1/2 animate-float-up" style={{ animationDelay: '0ms' }} />
          <Heart className="absolute top-8 left-[45%] animate-float-up" style={{ animationDelay: '200ms' }} />
          <Heart className="absolute top-6 left-[55%] animate-float-up" style={{ animationDelay: '400ms' }} />
        </div>
      )}

      {/* Person 1 (left) */}
      <div
        className={`absolute bottom-8 transition-all duration-1000 ease-out ${
          phase === 'walking' ? 'left-4' : 'left-[calc(50%-3rem)]'
        }`}
      >
        <StickFigure
          photoSrc={couplePhotos?.person1}
          isWalking={phase === 'walking'}
          isTripping={!isCorrect && phase === 'ending'}
          facingRight={true}
        />
      </div>

      {/* Person 2 (right) */}
      <div
        className={`absolute bottom-8 transition-all duration-1000 ease-out ${
          phase === 'walking' ? 'right-4' : 'right-[calc(50%-3rem)]'
        }`}
      >
        <StickFigure
          photoSrc={couplePhotos?.person2}
          isWalking={phase === 'walking'}
          isKissing={isCorrect && phase === 'ending'}
          facingRight={false}
        />
      </div>

      {/* Kiss effect */}
      {isCorrect && phase === 'ending' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl animate-pulse">
          💋
        </div>
      )}

      {/* Trip effect */}
      {!isCorrect && phase === 'ending' && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xl animate-bounce">
          💥
        </div>
      )}
    </div>
  );
}

/**
 * Individual stick figure with photo head
 */
function StickFigure({ photoSrc, isWalking, isTripping, isKissing, facingRight }) {
  return (
    <div className={`relative w-16 flex flex-col items-center ${isTripping ? 'animate-trip' : ''}`}>
      {/* Head with photo */}
      <div
        className={`w-12 h-12 rounded-full overflow-hidden border-2 border-gray-800 bg-gray-200 ${
          isKissing ? 'animate-lean-in' : ''
        }`}
        style={{ transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)' }}
      >
        {photoSrc ? (
          <img
            src={photoSrc}
            alt="Person"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to emoji face if image fails to load
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<span class="text-2xl flex items-center justify-center h-full">😊</span>';
            }}
          />
        ) : (
          <span className="text-2xl flex items-center justify-center h-full">😊</span>
        )}
      </div>

      {/* Body (SVG stick figure) */}
      <svg
        viewBox="0 0 40 60"
        className={`w-10 h-16 ${isWalking ? 'animate-walk' : ''}`}
        style={{ transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)' }}
      >
        {/* Neck and body */}
        <line x1="20" y1="0" x2="20" y2="30" stroke="#374151" strokeWidth="3" strokeLinecap="round" />

        {/* Arms */}
        <line
          x1="20" y1="8" x2="8" y2="20"
          stroke="#374151" strokeWidth="3" strokeLinecap="round"
          className={isKissing ? 'animate-arm-hug' : ''}
        />
        <line
          x1="20" y1="8" x2="32" y2="20"
          stroke="#374151" strokeWidth="3" strokeLinecap="round"
          className={isKissing ? 'animate-arm-hug-2' : ''}
        />

        {/* Legs */}
        <line
          x1="20" y1="30" x2="10" y2="55"
          stroke="#374151" strokeWidth="3" strokeLinecap="round"
          className={isWalking ? 'origin-top animate-leg-left' : isTripping ? 'animate-leg-trip' : ''}
        />
        <line
          x1="20" y1="30" x2="30" y2="55"
          stroke="#374151" strokeWidth="3" strokeLinecap="round"
          className={isWalking ? 'origin-top animate-leg-right' : ''}
        />
      </svg>
    </div>
  );
}

/**
 * Floating heart component
 */
function Heart({ className, style }) {
  return (
    <span className={`text-red-500 text-2xl ${className}`} style={style}>
      ❤️
    </span>
  );
}
