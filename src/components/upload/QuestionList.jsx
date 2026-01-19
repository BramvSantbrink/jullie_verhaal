import { useState, useEffect } from 'react';
import { fetchQuestions } from '../../lib/supabase';
import { useDeleteQuestion } from '../../hooks/useUpload';
import { Button } from '../common/Button';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { config } from '../../config';

export function QuestionList({ refreshTrigger }) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { isDeleting, deleteQuestionWithVideo } = useDeleteQuestion();
  const { texts } = config;

  useEffect(() => {
    loadQuestions();
  }, [refreshTrigger]);

  const loadQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchQuestions();
      setQuestions(data);
    } catch (err) {
      setError(err.message || 'Kon vragen niet laden');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (question) => {
    const result = await deleteQuestionWithVideo(question);
    if (result.success) {
      setQuestions(prev => prev.filter(q => q.id !== question.id));
      setDeleteConfirm(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
        <span className="ml-2 text-gray-600">{texts.upload.loadingQuestions}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
        <Button variant="ghost" size="sm" onClick={loadQuestions} className="mt-2">
          {texts.quiz.tryAgain}
        </Button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-gray-600">{texts.upload.noQuestionsYet}</p>
        <p className="text-sm text-gray-500 mt-1">{texts.upload.noQuestionsHelp}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-display font-semibold text-gray-800">
          {texts.upload.uploadedQuestions} ({questions.length})
        </h3>
        <Button variant="ghost" size="sm" onClick={loadQuestions}>
          {texts.upload.refresh}
        </Button>
      </div>

      <div className="space-y-3">
        {questions.map(question => (
          <QuestionRow
            key={question.id}
            question={question}
            onDelete={() => setDeleteConfirm(question)}
          />
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-display font-semibold text-gray-800 mb-2">
              {texts.upload.deleteConfirm}
            </h3>
            <p className="text-gray-600 mb-4">
              {texts.upload.deleteWarning}
            </p>
            <p className="text-sm bg-gray-50 rounded-lg p-3 mb-4 text-gray-700">
              "{deleteConfirm.question_text}"
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="ghost"
                onClick={() => setDeleteConfirm(null)}
                disabled={isDeleting}
              >
                {texts.upload.cancel}
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(deleteConfirm)}
                loading={isDeleting}
              >
                {texts.upload.delete}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionRow({ question, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { texts } = config;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncate = (str, length) => {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  };

  // Get video position label
  const getVideoLabel = () => {
    if (!question.video_url) return texts.upload.noVideo;
    return question.video_position === 'after' ? texts.upload.videoAfter : texts.upload.videoBefore;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-800">
              {truncate(question.question_text, 80)}
            </p>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 flex-wrap">
              {question.video_url && (
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-wedding-sage/20 text-wedding-sage-dark text-xs">
                  {getVideoLabel()}
                </span>
              )}
              {question.submitter_name && (
                <span>{texts.upload.by} {question.submitter_name}</span>
              )}
              <span>{formatDate(question.created_at)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {/* Video preview */}
          {question.video_url && (
            <div className="mb-4">
              <video
                src={question.video_url}
                className="w-full max-w-md rounded-lg"
                controls
              />
            </div>
          )}

          {/* Answers */}
          <div className="space-y-2 mb-4">
            <p className="text-sm font-medium text-gray-700">{texts.upload.answers}:</p>
            {[1, 2, 3, 4].map(num => (
              <div
                key={num}
                className={`flex items-center gap-2 p-2 rounded ${
                  question.correct_answer === num
                    ? 'bg-green-100 text-green-800'
                    : 'bg-white text-gray-700'
                }`}
              >
                {question.correct_answer === num && (
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="text-sm">{question[`answer_option_${num}`]}</span>
              </div>
            ))}
          </div>

          {/* Explanation */}
          {question.explanation && (
            <div className="mb-4 p-3 bg-wedding-cream rounded-lg">
              <p className="text-sm font-medium text-gray-700">{texts.upload.explanation}:</p>
              <p className="text-sm text-gray-600">{question.explanation}</p>
            </div>
          )}

          {/* Delete button */}
          <div className="flex justify-end">
            <Button variant="danger" size="sm" onClick={onDelete}>
              {texts.upload.deleteQuestion}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
