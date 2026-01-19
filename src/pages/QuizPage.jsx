import { Link } from 'react-router-dom';
import { useQuestions } from '../hooks/useQuestions';
import { useQuiz } from '../hooks/useQuiz';
import AdventureProgress from '../components/quiz/AdventureProgress';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { ResultsCard } from '../components/quiz/ResultsCard';
import { Button } from '../components/common/Button';
import ThemedLoading from '../components/common/ThemedLoading';
import AudioPlayer from '../components/common/AudioPlayer';
import { useAudio } from '../hooks/useAudio';
import { config } from '../config';
import { ChevronRight, AlertTriangle, FileQuestion } from 'lucide-react';

export function QuizPage() {
  const { questions, isLoading, error, reload } = useQuestions();
  const quiz = useQuiz(questions);
  const audio = useAudio(config.audioSettings.playlist, config.audioSettings.autoPlay, config.audioSettings.shuffle);
  const { texts } = config;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-adventure-bg flex items-center justify-center">
        <ThemedLoading />
        {audio && <AudioPlayer audio={audio} />}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-adventure-bg p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-adventure-coral/20">
          <AlertTriangle className="w-16 h-16 text-adventure-warning mx-auto mb-4" />
          <h2 className="text-xl font-display font-semibold text-text-primary mb-2">
            {texts.quiz.error}
          </h2>
          <p className="text-text-secondary mb-6">{error}</p>
          <Button onClick={reload}>{texts.quiz.tryAgain}</Button>
        </div>
        {audio && <AudioPlayer audio={audio} />}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-adventure-bg p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-adventure-teal/20">
          <FileQuestion className="w-16 h-16 text-adventure-teal mx-auto mb-4" />
          <h2 className="text-xl font-display font-semibold text-text-primary mb-2">
            {texts.quiz.noQuestions}
          </h2>
          <p className="text-text-secondary mb-6">
            {texts.quiz.noQuestionsMessage}
          </p>
          <Link to="/upload">
            <Button>{texts.quiz.submitQuestion}</Button>
          </Link>
        </div>
        {audio && <AudioPlayer audio={audio} />}
      </div>
    );
  }

  // Show results when quiz is complete
  if (quiz.isComplete) {
    return (
      <div className="min-h-screen bg-adventure-bg py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="text-adventure-coral hover:text-adventure-coral/80 text-sm font-medium font-body transition-colors">
              {texts.upload.backToHome}
            </Link>
          </div>

          <ResultsCard
            score={quiz.score}
            total={quiz.totalQuestions}
            onPlayAgain={quiz.resetQuiz}
          />
        </div>
        {audio && <AudioPlayer audio={audio} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-adventure-bg">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b-2 border-adventure-coral/20 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link to="/" className="text-adventure-coral hover:text-adventure-coral/80 text-sm font-semibold font-display transition-colors">
              {config.coupleName}'s Avontuur
            </Link>
            <div className="flex items-center gap-2 text-sm bg-adventure-coral/10 px-3 py-1 rounded-full">
              <span className="text-text-secondary font-body">{texts.quiz.score}:</span>
              <span className="font-bold text-adventure-coral">{quiz.score}</span>
            </div>
          </div>
          <AdventureProgress
            current={quiz.currentIndex + 1}
            total={quiz.totalQuestions}
            theme="sailing"
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
          audio={audio}
        />

        {/* Next Button */}
        {quiz.isAnswered && (
          <div className="mt-8 flex justify-end">
            <Button onClick={quiz.nextQuestion} size="lg" icon={ChevronRight}>
              {quiz.isLastQuestion ? texts.quiz.seeResults : texts.quiz.nextQuestion}
            </Button>
          </div>
        )}
      </main>

      {/* Audio Player */}
      {audio && <AudioPlayer audio={audio} />}
    </div>
  );
}
