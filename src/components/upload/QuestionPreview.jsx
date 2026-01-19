import { useState } from 'react';
import { VideoPlayer } from '../common/VideoPlayer';
import { CoupleAnimation } from '../quiz/CoupleAnimation';
import { config } from '../../config';

/**
 * Interactive preview component that shows how the question will appear to quiz players
 */
export function QuestionPreview({ formData, videoUrl }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const { texts } = config;

  const answers = [
    { index: 1, text: formData.answer1 },
    { index: 2, text: formData.answer2 },
    { index: 3, text: formData.answer3 },
    { index: 4, text: formData.answer4 }
  ];

  const correctAnswer = parseInt(formData.correctAnswer, 10) || 0;
  const videoPosition = formData.videoPosition || 'before';
  const explanationTiming = formData.explanationTiming || 'after';

  // Should show video before question (immediately) or after answering?
  const showVideoBefore = videoUrl && videoPosition === 'before';
  const showVideoAfter = videoUrl && videoPosition === 'after' && isAnswered;

  // Should show explanation before answering or after?
  const showExplanationBefore = formData.explanation && explanationTiming === 'before';
  const showExplanationAfter = formData.explanation && explanationTiming === 'after' && isAnswered;

  // Is the selected answer correct?
  const isCorrect = selectedAnswer === correctAnswer;

  const handleAnswerClick = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const getAnswerClassName = (index) => {
    const baseClasses = "w-full p-4 rounded-lg border-2 text-left transition-all duration-200";

    if (!isAnswered) {
      return `${baseClasses} border-gray-200 hover:border-wedding-gold hover:bg-wedding-gold/5 cursor-pointer`;
    }

    if (index === correctAnswer) {
      return `${baseClasses} border-green-500 bg-green-50 text-green-800`;
    }

    if (index === selectedAnswer && index !== correctAnswer) {
      return `${baseClasses} border-red-500 bg-red-50 text-red-800`;
    }

    return `${baseClasses} border-gray-200 opacity-50`;
  };

  const ExplanationBlock = () => (
    <div className="bg-wedding-cream rounded-lg p-4 border border-wedding-gold/20">
      <div className="flex items-start gap-2">
        <svg className="w-5 h-5 text-wedding-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-gray-700">{formData.explanation}</p>
      </div>
    </div>
  );

  const VideoBlock = () => (
    <VideoPlayer
      src={videoUrl}
      autoPlay={false}
      className="shadow-lg"
    />
  );

  return (
    <div className="border-2 border-dashed border-wedding-gold/30 rounded-xl p-6 bg-wedding-cream/30">
      {/* Preview Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-display font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-wedding-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {texts.upload.preview}
          </h3>
          <p className="text-sm text-gray-500">{texts.upload.previewDescription}</p>
        </div>
        {isAnswered && (
          <button
            onClick={handleReset}
            className="text-sm text-wedding-gold hover:text-wedding-gold-dark font-medium"
          >
            Reset
          </button>
        )}
      </div>

      {/* Preview Content - mimics QuestionCard layout */}
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
        {/* Video before question */}
        {showVideoBefore && <VideoBlock />}

        {/* Question Text */}
        <h2 className="text-xl font-display font-semibold text-gray-800">
          {formData.questionText}
        </h2>

        {/* Explanation before answering (if configured) */}
        {showExplanationBefore && <ExplanationBlock />}

        {/* Video after question text but before answers */}
        {showVideoAfter && <VideoBlock />}

        {/* Answer Options */}
        <div className="grid gap-3">
          {answers.map(answer => (
            <button
              key={answer.index}
              onClick={() => handleAnswerClick(answer.index)}
              className={getAnswerClassName(answer.index)}
              disabled={isAnswered}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">
                  {String.fromCharCode(64 + answer.index)}
                </span>
                <span className="flex-1">{answer.text}</span>
                {isAnswered && answer.index === correctAnswer && (
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {isAnswered && answer.index === selectedAnswer && answer.index !== correctAnswer && (
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Couple Animation after answering */}
        {isAnswered && (
          <CoupleAnimation isCorrect={isCorrect} />
        )}

        {/* Explanation after answering (default behavior) */}
        {showExplanationAfter && <ExplanationBlock />}
      </div>

      {/* Preview Note */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        {texts.upload.previewNote}
      </p>
    </div>
  );
}
