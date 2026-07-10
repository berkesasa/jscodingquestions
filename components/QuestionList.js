'use client';

import { useState, useMemo } from 'react';
import { useQuestionProgress } from '@/contexts/QuestionProgressContext';
import QuestionCard from '@/components/QuestionCard';
import StatsCard from '@/components/StatsCard';
import SearchAndFilter from '@/components/SearchAndFilter';

export default function QuestionList({
    items = [],
    stats,
    showTypeFilter = true,
    showStatusFilter = true
}) {
    const { getQuestionStatus, progress } = useQuestionProgress();

    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [jumpPage, setJumpPage] = useState('');
    const itemsPerPage = 20;

    // Filter and search logic
    const filteredItems = useMemo(() => {
        let result = [...items];

        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.title.toLowerCase().includes(term) ||
                (item.content && item.content.toLowerCase().includes(term)) ||
                (item.question && item.question.toLowerCase().includes(term))
            );
        }

        // Type filter
        if (showTypeFilter && typeFilter !== 'all') {
            result = result.filter(item => item.type === typeFilter);
        }

        // Status filter
        if (showStatusFilter && statusFilter !== 'all') {
            result = result.filter(item => {
                const questionId = item.globalId || `${item.type[0]}_${item.id}`;
                const status = getQuestionStatus(questionId);
                if (statusFilter === 'not_started') {
                    return !status || status === 'not_learned';
                }
                if (statusFilter === 'learned') {
                    return status === 'learned' || status === 'understood';
                }
                return status === statusFilter;
            });
        }

        return result;
    }, [items, searchTerm, typeFilter, statusFilter, getQuestionStatus, progress, showTypeFilter, showStatusFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, endIndex);

    const handleJumpPage = (e) => {
        e.preventDefault();
        const pageNum = parseInt(jumpPage);
        if (pageNum >= 1 && pageNum <= totalPages) {
            setCurrentPage(pageNum);
            setJumpPage('');
        }
    };

    // Reset to first page when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchTerm, typeFilter, statusFilter]);

    return (
        <div>
            {/* Stats Card */}
            {stats && (
                <StatsCard
                    totalQuestions={stats.totalQuestions}
                    totalExercises={stats.totalExercises}
                />
            )}

            {/* Search and Filter */}
            <SearchAndFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                totalResults={filteredItems.length}
                showTypeFilter={showTypeFilter}
                showStatusFilter={showStatusFilter}
            />

            {/* Results */}
            {filteredItems.length === 0 ? (
                <div className="glass rounded-3xl p-16 text-center">
                    <div className="text-8xl mb-6 grayscale opacity-50">🔍</div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                        No results found
                    </h3>
                    <p className="text-gray-400 text-lg">Try adjusting your search criteria</p>
                </div>
            ) : (
                <>
                    {/* Question List */}
                    <div className="mb-8 space-y-4">
                        {currentItems.map((item) => (
                            <QuestionCard
                                key={item.globalId || `${item.type}-${item.id}`}
                                question={item}
                                showExerciseInfo={true}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="glass rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between sm:justify-center gap-3">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 text-sm font-bold text-gray-300 bg-[#171717] border border-[#333] rounded-xl hover:bg-[#262626] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                ← <span className="hidden sm:inline ml-1">Previous</span>
                            </button>

                            {/* Mobile Page Indicator */}
                            <span className="sm:hidden text-sm font-bold text-gray-400">
                                {currentPage} / {totalPages}
                            </span>

                            {/* Desktop Page Numbers */}
                            <div className="hidden sm:flex space-x-2">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-11 h-11 text-sm font-bold rounded-xl transition-all ${currentPage === pageNum
                                                ? 'bg-[#333] text-white border border-[#555]'
                                                : 'text-gray-400 bg-[#171717] border border-[#333] hover:bg-[#262626] hover:text-gray-200'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 text-sm font-bold text-gray-300 bg-[#171717] border border-[#333] rounded-xl hover:bg-[#262626] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                <span className="hidden sm:inline mr-1">Next</span> →
                            </button>

                            {/* Go to Page */}
                            <form onSubmit={handleJumpPage} className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start pt-3 sm:pt-0 sm:ml-4 sm:border-l sm:border-[#333] sm:pl-4">
                                <span className="text-sm text-gray-500 whitespace-nowrap">Go to</span>
                                <input
                                    type="number"
                                    min="1"
                                    max={totalPages}
                                    value={jumpPage}
                                    onChange={(e) => setJumpPage(e.target.value)}
                                    placeholder="Page"
                                    className="w-20 h-9 bg-[#171717] border border-[#333] rounded-lg text-center text-sm text-white focus:outline-none focus:border-gray-500 transition-colors px-2"
                                />
                                <button
                                    type="submit"
                                    disabled={!jumpPage}
                                    className="px-3 py-2 text-xs font-bold bg-[#333] text-white rounded-lg hover:bg-[#444] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Go
                                </button>
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
