import { Dog, Sailboat, Mountain, ChefHat, Globe } from 'lucide-react';
import { config } from '../../config';

/**
 * ThemedLoading Component
 *
 * Adventure-themed loading spinner with rotating icons and personalized messages.
 * Replaces the generic LoadingSpinner with couple's personality elements.
 *
 * @param {string} message - Optional custom loading message
 */
export default function ThemedLoading({ message }) {
  // Randomly select a loading message if none provided
  const loadingMessage = message ||
    config.messages.loading[Math.floor(Math.random() * config.messages.loading.length)];

  // Icons representing the couple's adventure elements
  const icons = [
    { Icon: Dog, color: 'text-adventure-coral', label: 'Berner Sennen' },
    { Icon: Sailboat, color: 'text-adventure-teal', label: 'Sailing' },
    { Icon: Mountain, color: 'text-adventure-navy', label: 'Skiing' },
    { Icon: ChefHat, color: 'text-adventure-chocolate', label: 'Food' },
    { Icon: Globe, color: 'text-adventure-gold', label: 'Ethiopia' }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      {/* Rotating Icons Circle */}
      <div className="relative w-32 h-32 mb-6">
        {icons.map(({ Icon, color, label }, index) => {
          const angle = (index * 360) / icons.length;
          const radius = 45;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={label}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                animation: `spin 3s linear infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              <Icon
                className={`w-8 h-8 ${color} animate-gentleBounce`}
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            </div>
          );
        })}

        {/* Center Icon - Dog (mascot) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dog className="w-12 h-12 text-adventure-coral animate-pulse" />
        </div>
      </div>

      {/* Loading Message */}
      <p className="text-lg font-display text-text-primary text-center animate-fadeIn">
        {loadingMessage}
      </p>

      {/* Animated dots */}
      <div className="flex gap-2 mt-4">
        <span className="w-2 h-2 bg-adventure-coral rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <span className="w-2 h-2 bg-adventure-teal rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
        <span className="w-2 h-2 bg-adventure-yellow rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg) translateY(-45px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateY(-45px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
