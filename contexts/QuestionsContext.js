'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const QuestionsContext = createContext(null);

export function QuestionsProvider({ children }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const loadQuestions = useCallback(async (forceRefresh = false) => {
        if (isInitialized && !forceRefresh) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/questions.json');

            if (!response.ok) {
                throw new Error('Failed to load questions');
            }

            const jsonData = await response.json();
            setData(jsonData);
            setIsInitialized(true);
        } catch (err) {
            setError(err.message);
            console.error('Error loading questions:', err);
        } finally {
            setLoading(false);
        }
    }, [isInitialized]);

    useEffect(() => {
        if (!isInitialized) {
            loadQuestions();
        }
    }, [isInitialized, loadQuestions]);

    const refresh = useCallback(() => {
        loadQuestions(true);
    }, [loadQuestions]);

    const value = {
        data,
        loading: !isInitialized && loading,
        error,
        isInitialized,
        refresh
    };

    return (
        <QuestionsContext.Provider value={value}>
            {children}
        </QuestionsContext.Provider>
    );
}

export function useQuestionsContext() {
    const context = useContext(QuestionsContext);
    if (!context) {
        throw new Error('useQuestionsContext must be used within a QuestionsProvider');
    }
    return context;
}
