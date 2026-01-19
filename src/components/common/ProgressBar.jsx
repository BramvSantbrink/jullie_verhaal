export function ProgressBar({ current, total, showText = true, className = '' }) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={className}>
      {showText && (
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-gray-600">
            Question {current} of {total}
          </span>
          <span className="text-gray-500">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-wedding-gold h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
