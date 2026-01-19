import { Sailboat, Mountain, Map } from 'lucide-react';

/**
 * AdventureProgress Component
 *
 * Visual journey progress indicator with adventure theming.
 * Shows the user's progress through the quiz as a voyage, climb, or road trip.
 *
 * @param {number} current - Current question number (1-indexed)
 * @param {number} total - Total number of questions
 * @param {string} theme - Theme: 'sailing', 'skiing', 'road-trip'
 * @param {string} className - Additional CSS classes
 */
function AdventureProgress({ current, total, theme = 'sailing', className = '' }) {
  const percentage = (current / total) * 100;

  const themes = {
    sailing: {
      icon: Sailboat,
      color: 'bg-adventure-teal',
      gradientFrom: 'from-adventure-teal',
      gradientTo: 'to-adventure-coral',
      label: 'Zeilvaardig'
    },
    skiing: {
      icon: Mountain,
      color: 'bg-adventure-navy',
      gradientFrom: 'from-adventure-navy',
      gradientTo: 'to-adventure-snow',
      label: 'Skiers'
    },
    'road-trip': {
      icon: Map,
      color: 'bg-adventure-gold',
      gradientFrom: 'from-adventure-gold',
      gradientTo: 'to-adventure-coral',
      label: 'Reizigers'
    }
  };

  const { icon: Icon, color, gradientFrom, gradientTo } = themes[theme] || themes.sailing;

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar Container */}
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        {/* Gradient Progress Fill */}
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </div>

        {/* Waypoint Markers */}
        <div className="absolute inset-0 flex justify-between items-center px-1">
          {Array.from({ length: total }, (_, i) => {
            const questionNum = i + 1;
            const isPast = questionNum < current;
            const isCurrent = questionNum === current;

            return (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isPast
                    ? `${color} scale-110`
                    : isCurrent
                    ? `${color} scale-150 ring-2 ring-white`
                    : 'bg-gray-300 scale-90'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Animated Icon (boat, skier, etc.) */}
      <div
        className="relative transition-all duration-500 ease-out"
        style={{ marginLeft: `calc(${percentage}% - 12px)`, marginTop: '-8px' }}
      >
        <div className={`${theme === 'sailing' ? 'animate-boatSail' : 'animate-gentleBounce'}`}>
          <Icon className={`w-6 h-6 text-white ${color} rounded-full p-1 shadow-lg`} />
        </div>
      </div>

      {/* Progress Text */}
      <div className="flex justify-between items-center mt-2 text-xs text-text-secondary font-body">
        <span>Vraag {current} van {total}</span>
        <span className="font-semibold text-adventure-coral">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}

/**
 * CompactAdventureProgress Component
 *
 * Simplified progress indicator for mobile or header use.
 */
export function CompactAdventureProgress({ current, total, className = '' }) {
  const percentage = (current / total) * 100;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-adventure-coral to-adventure-teal transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-text-primary whitespace-nowrap">
        {current}/{total}
      </span>
    </div>
  );
}

export default AdventureProgress;
