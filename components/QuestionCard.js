'use client';

import Link from 'next/link';
import { useQuestionProgress } from '@/contexts/QuestionProgressContext';
import { CheckCircle2, RotateCw, XCircle } from 'lucide-react';

const statusConfig = {
  learned: {
    label: 'Learned',
    activeClass: 'bg-emerald-600 text-white border-emerald-600',
    inactiveClass: 'hover:border-emerald-500/50 hover:text-emerald-400'
  },
  review: {
    label: 'Review Later',
    activeClass: 'bg-amber-600 text-white border-amber-600',
    inactiveClass: 'hover:border-amber-500/50 hover:text-amber-400'
  },
  not_learned: {
    label: 'Not Learned',
    activeClass: 'bg-rose-600 text-white border-rose-600',
    inactiveClass: 'hover:border-rose-500/50 hover:text-rose-400'
  }
};

export default function QuestionCard({ question, showExerciseInfo = false }) {
  const { getQuestionStatus, updateQuestionStatus, progress } = useQuestionProgress();
  // Default to 'not_learned' if no status is set
  const questionId = question.globalId || `${question.type[0]}_${question.id}`;
  const rawStatus = getQuestionStatus(questionId);
  const currentStatus = rawStatus && statusConfig[rawStatus] ? rawStatus : 'not_learned';

  const handleStatusChange = (status) => {
    const key = question.globalId || `${question.type[0]}_${question.id}`;
    updateQuestionStatus(key, status);
  };

  return (
    <div className="glass rounded-xl p-5 mb-4 hover:border-gray-500 transition-colors group">
      <Link
        href={
          question.type === 'exercise'
            ? `/online-javascript-practice/${question.slug || question.id}`
            : `/javascript-interview-questions/${question.slug || question.id}`
        }
        className="block focus:!outline-none"
      >
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-bold text-gray-500 bg-[#262626] border border-[#333] px-2 py-1 rounded font-mono">
              #{question.id}
            </span>

            {question.type === 'exercise' && (
              <span className="text-xs font-bold text-purple-400 bg-purple-400/10 border border-purple-400/20 px-2 py-1 rounded">
                🎯 Exercise
              </span>
            )}

            {question.type === 'interview' && (
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded">
                💼 Interview
              </span>
            )}

            {question.hasCodeExample && (
              <span className="text-xs font-bold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2 py-1 rounded">
                💻 Code
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors cursor-pointer mb-3 leading-tight tracking-tight">
            {question.title}
          </h3>

          {question.content && (
            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
              {question.content.substring(0, 150)}...
            </p>
          )}
        </div>
      </Link>

      {/* Status Buttons */}
      <div className="flex gap-2 pt-3 border-t border-[#333]">
        {Object.entries(statusConfig).map(([status, config]) => (
          <button
            key={status}
            onClick={(e) => {
              e.preventDefault();
              handleStatusChange(status);
            }}
            className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${currentStatus === status
              ? config.activeClass
              : `bg-[#1a1a1a] border-[#333] text-gray-500 ${config.inactiveClass} hover:bg-[#222]`
              }`}
          >
            {status === 'learned' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Learned
              </>
            ) : status === 'review' ? (
              <>
                <RotateCw className="w-3.5 h-3.5" /> Review
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5" /> Not Learned
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
