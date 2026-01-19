import { Link } from 'react-router-dom';
import { useQuestions } from '../hooks/useQuestions';
import { useQuiz } from '../hooks/useQuiz';
import { ProgressBar } from '../components/common/ProgressBar';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { ResultsCard } from '../components/quiz/ResultsCard';
import { Button } from '../components/common/Button';
import { FullPageLoader } from '../components/common/LoadingSpinner';
import { config } from '../config';

export function QuizPage() {
  const { questions, isLoading, error, reload } = useQuestions();
  const quiz = useQuiz(questions);
  const { texts } = config;

  if (isLoading) {
    return <FullPageLoader message={texts.quiz.loading} />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-cream-light p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-display font-semibold text-gray-800 mb-2">
            {texts.quiz.error}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={reload}>{texts.quiz.tryAgain}</Button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-cream-light p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <svg className="w-16 h-16 text-wedding-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h2 className="text-xl font-display font-semibold text-gray-800 mb-2">
            {texts.quiz.noQuestions}
          </h2>
          <p className="text-gray-600 mb-6">
            {texts.quiz.noQuestionsMessage}
          </p>
          <Link to="/upload">
            <Button>{texts.quiz.submitQuestion}</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Show results when quiz is complete
  if (quiz.isComplete) {
    return (
      <div className="min-h-screen bg-wedding-cream-light py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="text-wedding-gold hover:text-wedding-gold-dark text-sm font-medium">
              {texts.upload.backToHome}
            </Link>
          </div>

          <ResultsCard
            score={quiz.score}
            total={quiz.totalQuestions}
            onPlayAgain={quiz.resetQuiz}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wedding-cream-light">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link to="/" className="text-wedding-gold hover:text-wedding-gold-dark text-sm font-medium">
              {config.coupleName}'s Quiz
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">{texts.quiz.score}:</span>
              <span className="font-semibold text-wedding-gold">{quiz.score}</span>
            </div>
          </div>
          <ProgressBar
            current={quiz.currentIndex + 1}
            total={quiz.totalQuestions}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <QuestionCard
          question={quiz.currentQuestion}
          selectedAnswer={quiz.selectedAnswer}
          isAnswered={quiz.isAnswered}
          onSelectAnswer={quiz.selectAnswer}
        />

        {/* Next Button */}
        {quiz.isAnswered && (
          <div className="mt-8 flex justify-end">
            <Button onClick={quiz.nextQuestion} size="lg">
              {quiz.isLastQuestion ? texts.quiz.seeResults : texts.quiz.nextQuestion}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
