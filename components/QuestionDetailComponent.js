'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuestionProgress } from '@/contexts/QuestionProgressContext';
import ContentRenderer from '@/components/ContentRenderer';
import AdSlot from '@/components/AdSlot';
import RelatedExerciseCard from '@/components/RelatedExerciseCard';
import ExerciseInteractive from '@/components/ExerciseInteractive';
import { ChevronLeft, Eye, EyeOff, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import FeedbackButton from '@/components/FeedbackBox';

const statusConfig = {
    learned: {
        label: 'Learned',
        activeClass: 'bg-emerald-600 text-white border-emerald-600 shadow-[0_0_15px_rgba(5,150,105,0.4)]',
        inactiveClass: 'hover:border-emerald-500/50 hover:text-emerald-400'
    },
    review: {
        label: 'Review Later',
        activeClass: 'bg-amber-600 text-white border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.4)]',
        inactiveClass: 'hover:border-amber-500/50 hover:text-amber-400'
    },
    not_learned: {
        label: 'Not Learned',
        activeClass: 'bg-rose-600 text-white border-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.4)]',
        inactiveClass: 'hover:border-rose-500/50 hover:text-rose-400'
    }
};

export default function QuestionDetailComponent({
    question,
    prevLink,
    nextLink,
    position,
    backLink,
    relatedExercise
}) {
    const router = useRouter();
    const { getQuestionStatus, updateQuestionStatus } = useQuestionProgress();

    const [currentStatus, setCurrentStatus] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        if (question) {
            const key = question.globalId || `${question.type[0]}_${question.id}`;
            const status = getQuestionStatus(key);
            setCurrentStatus(status || 'not_learned');
            setShowAnswer(false); // Reset answer visibility when question changes
        }
    }, [question, getQuestionStatus]);

    const handleStatusChange = (status) => {
        if (question) {
            const key = question.globalId || `${question.type[0]}_${question.id}`;
            updateQuestionStatus(key, status);
            setCurrentStatus(status);
        }
    };

    if (!question) return null;

    const renderAnswerWithAd = () => {
        const sections = question.answerSections || [];

        if (!sections.length) {
            return (
                <div className="bg-[#111] border border-[#333] rounded-2xl p-6">
                    <AdSlot className="mb-6 w-full h-32 md:h-24 ad-slot-in-article" type="display" />
                    <div className="prose prose-lg prose-invert max-w-none">
                        <ContentRenderer fallbackContent={question.answer} />
                    </div>
                </div>
            );
        }

        const midIndex = Math.max(1, Math.floor(sections.length / 2));
        const firstHalf = sections.slice(0, midIndex);
        const secondHalf = sections.slice(midIndex);

        return (
            <div className="bg-[#111] border border-[#333] rounded-2xl p-6">
                <div className="prose prose-lg prose-invert max-w-none">
                    <ContentRenderer sections={firstHalf} />
                </div>

                <div className="my-8">
                    <AdSlot className="w-full h-64 md:h-32 ad-slot-in-article" type="display" />
                </div>

                <div className="prose prose-lg prose-invert max-w-none">
                    <ContentRenderer sections={secondHalf} />
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="glass rounded-2xl p-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <button
                        onClick={() => router.push(backLink || '/')}
                        className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#333] text-gray-300 font-semibold rounded-xl hover:bg-[#222] hover:text-white transition-all w-full sm:w-auto"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to list
                    </button>

                    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
                        <span className="text-sm font-bold text-gray-500 bg-[#262626] border border-[#333] px-3 py-1 rounded-lg font-mono">
                            #{question.id}
                        </span>
                        {question.type === 'exercise' && (
                            <span className="px-3 py-1 text-xs font-bold bg-purple-400/10 border border-purple-400/20 text-purple-400 rounded-lg">
                                🎯 Exercise
                            </span>
                        )}
                        {question.type === 'interview' && (
                            <span className="px-3 py-1 text-xs font-bold bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-lg">
                                💼 Interview
                            </span>
                        )}
                        {question.hasCodeExample && (
                            <span className="px-3 py-1 text-xs font-bold bg-blue-400/10 border border-blue-400/20 text-blue-400 rounded-lg">
                                💻 Code
                            </span>
                        )}
                    </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight break-words">
                    {question.title}
                </h1>

                <div className="flex gap-2 sm:gap-3 flex-wrap items-center">
                    {Object.entries(statusConfig).map(([status, config]) => (
                        <button
                            key={status}
                            onClick={() => handleStatusChange(status)}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all border ${currentStatus === status
                                ? config.activeClass
                                : `bg-[#1a1a1a] border-[#333] text-gray-400 ${config.inactiveClass} hover:bg-[#222]`
                                }`}
                        >
                            {status === 'learned' ? '✅ ' : status === 'review' ? '🔄 ' : '❌ '}
                            {config.label}
                        </button>
                    ))}
                    <FeedbackButton
                        questionTitle={question.title}
                        questionId={question.id}
                        type={question.type}
                    />
                </div>
            </div>

            <div className="mb-8">
                <AdSlot className="w-full h-24 sm:h-[90px] ad-slot-leaderboard" type="leaderboard" />
            </div>

            <div className="">
                <div className={`glass rounded-2xl p-6 sm:p-8 mb-8 ${question.type === 'exercise' ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
                    {question.type === 'interview' ? (
                        <div className="prose prose-lg prose-invert max-w-none text-gray-300">
                            <ContentRenderer
                                sections={question.sections}
                                fallbackContent={question.content}
                            />
                            <div className="mt-8 not-prose">
                                <AdSlot className="w-full h-[250px]" type="display" />
                            </div>
                        </div>
                    ) : question.type === 'exercise' ? (
                        <>
                            <div className="mb-8 prose prose-lg prose-invert max-w-none text-gray-300">
                                <ContentRenderer
                                    sections={question.questionSections}
                                    fallbackContent={question.question}
                                    renderInteractive={(content) => (
                                        <ExerciseInteractive
                                            question={content}
                                            answer={question.answer || 'Check Explanation'}
                                        />
                                    )}
                                />
                            </div>

                            <div className="lg:hidden my-8">
                                <AdSlot className="w-full h-[250px]" type="responsive" />
                            </div>
                        </>
                    ) : (
                        <div>
                            <div className="mb-8 prose prose-lg prose-invert max-w-none text-gray-300">
                                <ContentRenderer
                                    sections={question.questionSections}
                                    fallbackContent={question.question}
                                />
                            </div>

                            {question.hasAnswer && (question.answer || question.answerSections) && (
                                <div className="pt-8 border-t border-[#333]">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                                        <h3 className="text-xl sm:text-2xl font-bold text-emerald-400 flex items-center gap-2">
                                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                            Answer
                                        </h3>
                                        <button
                                            onClick={() => setShowAnswer(!showAnswer)}
                                            className={`w-full sm:w-auto px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-all border border-gray-600 hover:border-white flex items-center justify-center gap-2 ${showAnswer
                                                ? 'bg-[#222]'
                                                : 'bg-[#111]'
                                                }`}
                                        >
                                            {showAnswer ? (
                                                <>
                                                    <EyeOff className="w-4 h-4" />
                                                    Hide
                                                </>
                                            ) : (
                                                <>
                                                    <Eye className="w-4 h-4" />
                                                    Show Answer
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {showAnswer && renderAnswerWithAd()}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {question.type === 'exercise' && (
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="glass rounded-2xl p-6 sticky top-24 ad-slot-sidebar">
                            <AdSlot className="min-h-[400px]" type="sidebar" />
                        </div>
                    </div>
                )}
            </div>

            {question.type === 'interview' && relatedExercise && (
                <RelatedExerciseCard exercise={relatedExercise} />
            )}

            {question.type === 'interview' && (
                <div className="my-8">
                    <AdSlot className="w-full h-24 sm:h-[90px]" type="leaderboard" />
                </div>
            )}

            <div className="glass rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                <button
                    onClick={() => prevLink && router.push(prevLink)}
                    disabled={!prevLink}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-gray-300 bg-[#1a1a1a] border border-[#333] font-bold rounded-xl hover:bg-[#222] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all order-2 sm:order-1"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Previous
                </button>

                <div className="flex items-center justify-center gap-2 bg-[#111] border border-[#333] text-gray-300 px-6 py-3 rounded-xl font-bold w-full sm:w-auto order-1 sm:order-2">
                    <span className="text-lg text-white">{position.current}</span>
                    <span className="text-sm opacity-60">of</span>
                    <span className="text-lg text-white">{position.total}</span>
                </div>

                <button
                    onClick={() => nextLink && router.push(nextLink)}
                    disabled={!nextLink}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-gray-300 bg-[#1a1a1a] border border-[#333] font-bold rounded-xl hover:bg-[#222] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all order-3"
                >
                    Next
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
