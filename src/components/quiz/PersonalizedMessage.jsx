import { CheckCircle, XCircle, Trophy, Compass } from 'lucide-react';
import { config } from '../../config';

/**
 * PersonalizedMessage Component
 *
 * Displays adventure-themed feedback messages with matching icons.
 * Messages reference the couple's interests (skiing, sailing, food, Ethiopia).
 *
 * @param {string} type - Message type: 'correct', 'incorrect', 'complete'
 * @param {number} score - Score percentage (for complete type)
 * @param {string} customMessage - Optional custom message override
 * @param {string} className - Additional CSS classes
 */
export default function PersonalizedMessage({ type, score, customMessage, className = '' }) {
  // Get random message from config based on type
  const getMessage = () => {
    if (customMessage) return customMessage;

    switch (type) {
      case 'correct':
        const correctMessages = config.messages.correct;
        return correctMessages[Math.floor(Math.random() * correctMessages.length)];

      case 'incorrect':
        const incorrectMessages = config.messages.incorrect;
        return incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];

      case 'complete':
        const percentage = score || 0;
        if (percentage === 100) return config.messages.results.perfect;
        if (percentage >= 70) return config.messages.results.high;
        if (percentage >= 40) return config.messages.results.medium;
        return config.messages.results.low;

      default:
        return '';
    }
  };

  // Get icon and styling based on type
  const getStyle = () => {
    switch (type) {
      case 'correct':
        return {
          icon: CheckCircle,
          bgColor: 'bg-adventure-success/10',
          borderColor: 'border-adventure-success',
          iconColor: 'text-adventure-success',
          textColor: 'text-adventure-success'
        };

      case 'incorrect':
        return {
          icon: XCircle,
          bgColor: 'bg-adventure-warning/10',
          borderColor: 'border-adventure-warning',
          iconColor: 'text-adventure-gold',
          textColor: 'text-text-primary'
        };

      case 'complete':
        return {
          icon: score >= 70 ? Trophy : Compass,
          bgColor: 'bg-adventure-coral/10',
          borderColor: 'border-adventure-coral',
          iconColor: 'text-adventure-coral',
          textColor: 'text-text-primary'
        };

      default:
        return {
          icon: Compass,
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-300',
          iconColor: 'text-gray-500',
          textColor: 'text-text-primary'
        };
    }
  };

  const message = getMessage();
  const style = getStyle();
  const Icon = style.icon;

  if (!message) return null;

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border-2
        ${style.bgColor} ${style.borderColor}
        animate-slideUpFade shadow-md
        ${className}
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={`w-6 h-6 ${style.iconColor}`} strokeWidth={2.5} />
      </div>

      {/* Message Text */}
      <p className={`flex-1 text-base font-body ${style.textColor} leading-relaxed`}>
        {message}
      </p>
    </div>
  );
}

/**
 * MessageBubble Component
 *
 * Floating bubble-style message for celebrations or tips.
 */
export function MessageBubble({ children, type = 'info', className = '' }) {
  const styles = {
    info: 'bg-adventure-info/20 border-adventure-info text-adventure-navy',
    success: 'bg-adventure-success/20 border-adventure-success text-adventure-navy',
    warning: 'bg-adventure-warning/20 border-adventure-warning text-adventure-chocolate',
    celebrate: 'bg-gradient-to-r from-adventure-coral to-adventure-teal text-white border-white'
  };

  return (
    <div
      className={`
        inline-block px-6 py-3 rounded-full border-2 shadow-lg
        font-display text-lg font-semibold
        animate-gentleBounce
        ${styles[type] || styles.info}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
