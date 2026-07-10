'use client';

import { useState } from 'react';

export default function ExerciseInteractive({ question, answer }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showResult, setShowResult] = useState(false);

    // Parse logic similar to what we observed in questions.json
    // Format: "- 1: Option A\n- 2: Option B..."
    const parseOptions = (text) => {
        if (!text) return [];

        const lines = text.split('\n').filter(line => line.trim().length > 0);

        const optionRegex = /^-\s*(\d+):\s*(.+)$/;

        const options = [];

        lines.forEach(line => {
            const match = line.match(optionRegex);
            if (match) {
                options.push({
                    id: parseInt(match[1]),
                    text: match[2].trim()
                });
            }
        });

        return options.length > 0 ? options : null;
    };

    const options = parseOptions(question);

    if (!options) return null;

    const handleCheck = () => {
        if (!selectedOption) return;

        let correctId = null;
        const answerTrimmed = answer ? answer.trim() : '';

        const ansMatch = answerTrimmed.match(/^Answer:\s*(\d+)/i);
        if (ansMatch) {
            correctId = parseInt(ansMatch[1]);
        } else {
            if (/^\d+$/.test(answerTrimmed)) {
                correctId = parseInt(answerTrimmed);
            }
        }

        if (!correctId && answerTrimmed) {
            const match = answerTrimmed.match(/(\d+)/);
            if (match) correctId = parseInt(match[1]);
        }

        if (correctId) {
            setIsCorrect(selectedOption === correctId);
        } else {
            setIsCorrect(true);
        }

        setShowResult(true);
    };

    return (
        <div className="my-8 space-y-4">
            <h3 className="text-lg font-bold text-gray-200 mb-4">Choose the correct output:</h3>

            <div className="space-y-3">
                {options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => !showResult && setSelectedOption(option.id)}
                        className={`
              relative p-4 rounded-xl border cursor-pointer transition-all
              ${selectedOption === option.id
                                ? 'border-violet-500 bg-violet-500/10'
                                : 'border-[#333] bg-[#1a1a1a] hover:border-gray-500 hover:bg-[#222]'
                            }
              ${showResult && selectedOption === option.id && isCorrect ? 'border-emerald-500 bg-emerald-500/10' : ''}
              ${showResult && selectedOption === option.id && !isCorrect ? 'border-rose-500 bg-rose-500/10' : ''}
              ${showResult ? 'cursor-default' : ''}
            `}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`
                w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold transition-all
                ${selectedOption === option.id
                                    ? 'border-violet-500 bg-violet-500 text-white'
                                    : 'border-[#444] text-gray-500'
                                }
                ${showResult && selectedOption === option.id && isCorrect ? '!border-emerald-500 !bg-emerald-500' : ''}
                ${showResult && selectedOption === option.id && !isCorrect ? '!border-rose-500 !bg-rose-500' : ''}
              `}>
                                {String.fromCharCode(64 + option.id)}
                            </div>
                            <span className="font-mono text-sm font-medium text-gray-300">
                                {option.text}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {!showResult ? (
                <button
                    onClick={handleCheck}
                    disabled={!selectedOption}
                    className="mt-6 w-full py-4 bg-white text-black border border-white font-bold rounded-xl hover:bg-gray-200 transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Check Answer
                </button>
            ) : (
                <div className={`mt-6 p-6 rounded-2xl border ${isCorrect ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-rose-900/10 border-rose-500/30'}`}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`text-2xl ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {isCorrect ? '🎉' : '❌'}
                        </div>
                        <h4 className={`text-lg font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isCorrect ? 'Correct Answer!' : 'Incorrect'}
                        </h4>
                    </div>
                    <div className="pl-9">
                        <p className="text-gray-300 leading-relaxed mb-4">
                            {isCorrect ? "Great job! You got it right." : "Don't worry, mistakes help you learn. Try again!"}
                        </p>

                        {!isCorrect && (
                            <button
                                onClick={() => {
                                    setShowResult(false);
                                    setIsCorrect(null);
                                }}
                                className="px-5 py-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold rounded-lg hover:bg-rose-500/20 transition-colors text-sm"
                            >
                                ↺ Try Again
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
