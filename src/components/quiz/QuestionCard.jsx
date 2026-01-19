import { useState, useEffect } from 'react';
import { VideoPlayer } from '../common/VideoPlayer';
import { AnswerButton } from './AnswerButton';
import { CoupleAnimation } from './CoupleAnimation';
import { Modal } from '../common/Modal';
import { config } from '../../config';

export function QuestionCard({
  question,
  selectedAnswer,
  isAnswered,
  onSelectAnswer
}) {
  const { texts } = config;
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showAnimationModal, setShowAnimationModal] = useState(false);

  const answers = [
    { index: 1, text: question.answer_option_1 },
    { index: 2, text: question.answer_option_2 },
    { index: 3, text: question.answer_option_3 },
    { index: 4, text: question.answer_option_4 }
  ];

  // Determine video position (default to 'before' if not set)
  const videoPosition = question.video_position || 'before';

  // Determine explanation timing (default to 'after' if not set)
  const explanationTiming = question.explanation_timing || 'after';

  // Should show explanation before answering or after?
  const showExplanationBefore = question.explanation && explanationTiming === 'before';
  const showExplanationAfter = question.explanation && explanationTiming === 'after' && isAnswered;

  // Is the selected answer correct?
  const isCorrect = selectedAnswer === question.correct_answer;

  // Show video modal when appropriate
  useEffect(() => {
    if (!question.video_url) return;

    // Show video before question (on mount)
    if (videoPosition === 'before' && !isAnswered) {
      setShowVideoModal(true);
    }
  }, [question.video_url, videoPosition, isAnswered]);

  // Handle answer submission - show video or animation based on config
  useEffect(() => {
    if (!isAnswered) return;

    // If video should show after answering, show it first
    if (question.video_url && videoPosition === 'after') {
      setShowVideoModal(true);
      // Don't show animation yet - wait for video to be closed
    } else {
      // No video after, show animation immediately
      setShowAnimationModal(true);
    }
  }, [isAnswered, question.video_url, videoPosition]);

  const handleVideoClose = () => {
    setShowVideoModal(false);

    // If user answered and video was shown after, now show animation
    if (isAnswered && videoPosition === 'after') {
      setTimeout(() => {
        setShowAnimationModal(true);
      }, 300);
    }
  };

  const handleAnimationEnd = () => {
    setShowAnimationModal(false);
  };

  const ExplanationBlock = () => (
    <div className="bg-wedding-cream rounded-lg p-4 border border-wedding-gold/20">
      <div className="flex items-start gap-2">
        <svg className="w-5 h-5 text-wedding-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-gray-700">{question.explanation}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        {/* Question Text */}
        <h2 className="text-xl md:text-2xl font-display font-semibold text-gray-800">
          {question.question_text}
        </h2>

        {/* Explanation before answering (if configured) */}
        {showExplanationBefore && <ExplanationBlock />}

        {/* Answer Options */}
        <div className="grid gap-3">
          {answers.map(answer => (
            <AnswerButton
              key={answer.index}
              text={answer.text}
              index={answer.index}
              isSelected={selectedAnswer === answer.index}
              isAnswered={isAnswered}
              correctAnswer={question.correct_answer}
              onClick={onSelectAnswer}
            />
          ))}
        </div>

        {/* Explanation after answering (default behavior) */}
        {showExplanationAfter && <ExplanationBlock />}
      </div>

      {/* Video Modal */}
      <Modal
        isOpen={showVideoModal}
        onClose={handleVideoClose}
        closeOnBackdrop={true}
        showCloseButton={true}
      >
        <div className="bg-black rounded-lg overflow-hidden">
          <VideoPlayer
            src={question.video_url}
            autoPlay={true}
          />
        </div>
      </Modal>

      {/* Animation Modal */}
      <Modal
        isOpen={showAnimationModal}
        onClose={handleAnimationEnd}
        closeOnBackdrop={false}
        showCloseButton={false}
      >
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
          <CoupleAnimation
            isCorrect={isCorrect}
            onAnimationEnd={handleAnimationEnd}
          />
        </div>
      </Modal>
    </>
  );
}
