'use client';

import { useQuestions } from '@/hooks/useQuestions';
import QuestionList from '@/components/QuestionList';
import AdSlot from '@/components/AdSlot';

export default function OnlinePracticePage() {
    const { data, loading, error } = useQuestions();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="glass rounded-3xl p-12 text-center shadow-2xl">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-4 border-violet-200"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-t-violet-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                    </div>
                    <p className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        ✨ Loading exercises...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass rounded-3xl p-12 text-center shadow-2xl max-w-md mx-auto mt-12">
                <div className="text-6xl mb-4">⚠️</div>
                <div className="text-red-600 text-2xl font-bold mb-3">Error!</div>
                <p className="text-gray-700 text-lg">An error occurred: {error}</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="hidden lg:block lg:col-span-2 space-y-4 !transition-none">
                <div className="sticky top-24">
                    <AdSlot className="w-full h-[600px]" type="sidebar" />
                </div>
            </div>

            <div className="lg:col-span-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-3">Online JavaScript Practice Exercises</h1>
                    <p className="text-gray-400">
                        Interactive <strong>JavaScript coding exercises</strong> to test your knowledge.
                        Predict the output of code snippets and master JS concepts through practice.
                    </p>
                </div>

                <QuestionList
                    items={data.exercises || []}
                    stats={null}
                    showTypeFilter={false}
                    showStatusFilter={true}
                />
            </div>

            <div className="hidden lg:block lg:col-span-2 space-y-4 !transition-none">
                <div className="sticky top-24">
                    <AdSlot className="w-full h-[600px]" type="sidebar" />
                </div>
            </div>
        </div>
    );
}
