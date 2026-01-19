import { useState, useEffect } from 'react';
import { fetchQuestions } from '../lib/supabase';
import { config } from '../config';

/**
 * Hook for fetching and managing quiz questions
 */
export function useQuestions() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let data = await fetchQuestions();

      // Shuffle questions if enabled in config
      if (config.quizSettings.shuffleQuestions) {
        data = shuffleArray(data);
      }

      setQuestions(data);
    } catch (err) {
      setError(err.message || 'Failed to load questions');
    } finally {
      setIsLoading(false);
    }
  };

  const reload = () => {
    loadQuestions();
  };

  return {
    questions,
    isLoading,
    error,
    reload
  };
}

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
