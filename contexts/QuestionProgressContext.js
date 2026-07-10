'use client';

import { createContext, useContext } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const QuestionProgressContext = createContext();

export function QuestionProgressProvider({ children }) {
  const [progress, setProgress] = useLocalStorage('questionProgress', {});

  const updateQuestionStatus = (questionId, status) => {
    const key = typeof questionId === 'object' 
      ? questionId.globalId || `${questionId.type[0]}_${questionId.id}` 
      : questionId;
    
    setProgress(prev => ({
      ...prev,
      [key]: {
        status,
        timestamp: new Date().toISOString()
      }
    }));
  };

  const getQuestionStatus = (questionId) => {
    const key = typeof questionId === 'object' 
      ? questionId.globalId || `${questionId.type[0]}_${questionId.id}` 
      : questionId;
    const status = progress[key]?.status;
    
    // Migrate old status names to new ones
    if (status === 'understood') return 'learned';
    
    return status;
  };

  const getStats = (totalItems = 0) => {
    const statuses = Object.values(progress);
    const learned = statuses.filter(p => p.status === 'learned' || p.status === 'understood').length;
    const review = statuses.filter(p => p.status === 'review').length;
    const explicitNotLearned = statuses.filter(p => p.status === 'not_learned').length;
    
    // Calculate actual not learned: total items - (learned + review)
    // This includes both explicitly marked as "not_learned" AND untouched items
    const actualNotLearned = totalItems > 0 ? totalItems - (learned + review) : explicitNotLearned;
    
    return {
      total: statuses.length,
      learned,
      review,
      notLearned: actualNotLearned
    };
  };

  return (
    <QuestionProgressContext.Provider value={{
      progress,
      updateQuestionStatus,
      getQuestionStatus,
      getStats
    }}>
      {children}
    </QuestionProgressContext.Provider>
  );
}

export function useQuestionProgress() {
  const context = useContext(QuestionProgressContext);
  if (!context) {
    throw new Error('useQuestionProgress must be used within QuestionProgressProvider');
  }
  return context;
}

