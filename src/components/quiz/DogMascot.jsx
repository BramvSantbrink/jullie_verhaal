import { Dog } from 'lucide-react';

/**
 * DogMascot Component
 *
 * Animated Berner Sennen dog mascot with different emotional states.
 * Represents the couple's beloved dog throughout the quiz experience.
 *
 * @param {string} state - Emotional state: 'happy', 'curious', 'celebrating', 'neutral'
 * @param {string} size - Size: 'sm', 'md', 'lg', 'xl'
 * @param {string} className - Additional CSS classes
 */
export default function DogMascot({ state = 'neutral', size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const animations = {
    happy: 'animate-dogWag',
    curious: 'hover:rotate-12 transition-transform duration-300',
    celebrating: 'animate-gentleBounce',
    neutral: ''
  };

  const colors = {
    happy: 'text-adventure-coral',
    curious: 'text-adventure-teal',
    celebrating: 'text-adventure-yellow',
    neutral: 'text-adventure-gold'
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${animations[state]} ${sizes[size]}`}>
        <Dog className={`w-full h-full ${colors[state]} drop-shadow-lg`} strokeWidth={2} />
      </div>

      {/* Optional emoji overlay for extra expressiveness */}
      {state === 'celebrating' && (
        <div className="text-2xl animate-heartFloat">🎉</div>
      )}
      {state === 'curious' && (
        <div className="text-xl mt-1">🤔</div>
      )}
      {state === 'happy' && (
        <div className="text-xl mt-1">❤️</div>
      )}
    </div>
  );
}

/**
 * DogMascotWithMessage Component
 *
 * Dog mascot with a speech bubble message.
 */
export function DogMascotWithMessage({ state = 'neutral', message, size = 'md', className = '' }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <DogMascot state={state} size={size} />
      {message && (
        <div className="relative bg-white border-2 border-adventure-coral rounded-lg px-4 py-2 shadow-lg max-w-xs animate-slideUpFade">
          {/* Speech bubble arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-adventure-coral rotate-45" />
          <p className="text-sm text-text-primary text-center font-body">{message}</p>
        </div>
      )}
    </div>
  );
}
