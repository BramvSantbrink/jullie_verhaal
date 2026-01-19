import { config } from '../../config';
import { Button } from '../common/Button';

export function ResultsCard({ score, total, onPlayAgain }) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const { texts } = config;

  // Get appropriate message based on score
  const getMessage = () => {
    const { scoreMessages } = config;

    if (percentage >= scoreMessages.perfect.threshold) {
      return scoreMessages.perfect.message;
    } else if (percentage >= scoreMessages.high.threshold) {
      return scoreMessages.high.message;
    } else if (percentage >= scoreMessages.medium.threshold) {
      return scoreMessages.medium.message;
    } else {
      return scoreMessages.low.message;
    }
  };

  // Get emoji based on score
  const getEmoji = () => {
    if (percentage >= 90) return '🎉';
    if (percentage >= 60) return '👏';
    if (percentage >= 30) return '😊';
    return '💪';
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Celebration emoji */}
        <div className="text-6xl mb-4">{getEmoji()}</div>

        {/* Title */}
        <h2 className="text-2xl font-display font-semibold text-gray-800 mb-2">
          {texts.quiz.quizComplete}
        </h2>

        {/* Score display */}
        <div className="my-8">
          <div className="text-6xl font-display font-bold text-wedding-gold">
            {score}
            <span className="text-2xl text-gray-400">/{total}</span>
          </div>
          <div className="text-xl text-gray-600 mt-2">
            {percentage}% {texts.quiz.correct}
          </div>
        </div>

        {/* Score visualization */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              percentage >= 90
                ? 'bg-green-500'
                : percentage >= 60
                ? 'bg-wedding-gold'
                : percentage >= 30
                ? 'bg-yellow-500'
                : 'bg-orange-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Message */}
        <p className="text-lg text-gray-700 mb-8">
          {getMessage()}
        </p>

        {/* Actions */}
        <div className="space-y-3">
          {config.quizSettings.allowRetakes && (
            <Button onClick={onPlayAgain} className="w-full" size="lg">
              {texts.quiz.playAgain}
            </Button>
          )}
        </div>
      </div>

      {/* Thank you message */}
      <p className="mt-6 text-gray-500">
        {texts.quiz.thanks} {config.coupleName}'s {config.appName}!
      </p>
    </div>
  );
}
