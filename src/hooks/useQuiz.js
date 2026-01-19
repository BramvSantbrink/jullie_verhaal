import { useState, useCallback } from 'react';

/**
 * Hook for managing quiz state and progression
 */
export function useQuiz(questions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState([]); // Track all answers for review

  const currentQuestion = questions[currentIndex] || null;
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  /**
   * Select an answer for the current question
   */
  const selectAnswer = useCallback((answerIndex) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    const isCorrect = answerIndex === currentQuestion.correct_answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Track the answer
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selected: answerIndex,
      correct: currentQuestion.correct_answer,
      isCorrect
    }]);
  }, [isAnswered, currentQuestion]);

  /**
   * Move to the next question or complete the quiz
   */
  const nextQuestion = useCallback(() => {
    if (!isAnswered) return;

    if (isLastQuestion) {
      setIsComplete(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [isAnswered, isLastQuestion]);

  /**
   * Reset the quiz to start over
   */
  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsComplete(false);
    setAnswers([]);
  }, []);

  return {
    // State
    currentIndex,
    currentQuestion,
    score,
    selectedAnswer,
    isAnswered,
    isComplete,
    totalQuestions,
    answers,

    // Computed
    progress: totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0,
    isLastQuestion,

    // Actions
    selectAnswer,
    nextQuestion,
    resetQuiz
  };
}
