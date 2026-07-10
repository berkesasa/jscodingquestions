'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Only sync when key changes, not initialValue
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [key]);

  return [storedValue, setValue];
}

// Hook for managing question progress
export function useQuestionProgress() {
  const [progress, setProgress] = useLocalStorage('questionProgress', {});

  const updateQuestionStatus = (questionId, status) => {
    // Support both old and new ID formats
    const key = typeof questionId === 'object' ? questionId.globalId || `${questionId.type[0]}_${questionId.id}` : questionId;
    setProgress(prev => ({
      ...prev,
      [key]: {
        status,
        timestamp: new Date().toISOString()
      }
    }));
  };

  const getQuestionStatus = (questionId) => {
    // Support both old and new ID formats
    const key = typeof questionId === 'object' ? questionId.globalId || `${questionId.type[0]}_${questionId.id}` : questionId;
    const status = progress[key]?.status;
    
    // Migrate old status names to new ones
    if (status === 'understood') return 'learned';
    
    return status;
  };

  const getStats = () => {
    const statuses = Object.values(progress);
    return {
      total: statuses.length,
      learned: statuses.filter(p => p.status === 'learned' || p.status === 'understood').length,
      review: statuses.filter(p => p.status === 'review').length,
      notLearned: statuses.filter(p => p.status === 'not_learned').length
    };
  };

  return {
    updateQuestionStatus,
    getQuestionStatus,
    getStats,
    progress
  };
}
