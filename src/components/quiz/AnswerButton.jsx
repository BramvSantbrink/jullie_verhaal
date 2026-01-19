export function AnswerButton({
  text,
  index,
  isSelected,
  isCorrect,
  isAnswered,
  correctAnswer,
  onClick
}) {
  // Determine button state
  const isThisCorrect = index === correctAnswer;
  const showAsCorrect = isAnswered && isThisCorrect;
  const showAsIncorrect = isAnswered && isSelected && !isThisCorrect;

  let buttonClasses = 'w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ';

  if (showAsCorrect) {
    // Correct answer
    buttonClasses += 'bg-green-100 border-green-500 text-green-800';
  } else if (showAsIncorrect) {
    // Selected wrong answer
    buttonClasses += 'bg-red-100 border-red-500 text-red-800';
  } else if (isSelected && !isAnswered) {
    // Selected but not submitted yet (shouldn't happen with immediate feedback)
    buttonClasses += 'bg-wedding-gold/10 border-wedding-gold text-gray-800';
  } else if (isAnswered) {
    // Other answers after revealing
    buttonClasses += 'bg-gray-50 border-gray-200 text-gray-500';
  } else {
    // Default state
    buttonClasses += 'bg-white border-gray-200 hover:border-wedding-gold hover:bg-wedding-gold/5 text-gray-800';
  }

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <button
      onClick={() => onClick(index)}
      disabled={isAnswered}
      className={buttonClasses}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            showAsCorrect
              ? 'bg-green-500 text-white'
              : showAsIncorrect
              ? 'bg-red-500 text-white'
              : isAnswered
              ? 'bg-gray-200 text-gray-500'
              : 'bg-wedding-gold/10 text-wedding-gold'
          }`}
        >
          {showAsCorrect ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : showAsIncorrect ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            letters[index - 1]
          )}
        </span>
        <span className="pt-1">{text}</span>
      </div>
    </button>
  );
}
