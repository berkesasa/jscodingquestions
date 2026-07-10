'use client';

import { useQuestionsContext } from '@/contexts/QuestionsContext';

export function useQuestions() {
  const { data, loading, error, isInitialized, refresh } = useQuestionsContext();

  return { data, loading, error, isInitialized, refresh };
}
