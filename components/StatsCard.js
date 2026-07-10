'use client';

import { useState } from 'react';
import { useQuestionProgress } from '@/contexts/QuestionProgressContext';
import { Activity, CheckCircle, RotateCw, XCircle, BarChart2, ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function StatsCard({ totalQuestions, totalExercises }) {
  const { getStats, progress } = useQuestionProgress();
  const [isChartOpen, setIsChartOpen] = useState(false);

  const totalItems = totalQuestions + totalExercises;
  const stats = getStats(totalItems);

  const actualProgress = stats.learned + stats.review;
  const progressPercentage = totalItems > 0 ? (actualProgress / totalItems) * 100 : 0;

  const calculatePercentages = () => {
    if (totalItems === 0) {
      return { learned: 0, review: 0, toDo: 100, hasApprox: false, learnedApprox: false, reviewApprox: false, toDoApprox: false };
    }

    const learnedRaw = ((stats.learned || 0) / totalItems) * 100;
    const reviewRaw = ((stats.review || 0) / totalItems) * 100;
    const toDoRaw = ((stats.notLearned || 0) / totalItems) * 100;

    const learnedRounded = Math.ceil(learnedRaw);
    const reviewRounded = Math.ceil(reviewRaw);
    const toDoRounded = 100 - learnedRounded - reviewRounded;

    const learnedApprox = learnedRaw !== learnedRounded && learnedRaw > 0;
    const reviewApprox = reviewRaw !== reviewRounded && reviewRaw > 0;
    const toDoApprox = toDoRaw !== toDoRounded;

    return {
      learned: learnedRounded,
      review: reviewRounded,
      toDo: Math.max(0, toDoRounded),
      hasApprox: learnedApprox || reviewApprox || toDoApprox,
      learnedApprox,
      reviewApprox,
      toDoApprox,
    };
  };

  const percentages = calculatePercentages();

  const formatPercent = (value, isApprox) => {
    return isApprox ? `~${value}%` : `${value}%`;
  };

  const pieData = [
    { name: 'Learned', value: stats.learned || 0, count: stats.learned || 0, displayValue: formatPercent(percentages.learned, percentages.learnedApprox), color: '#10b981' },
    { name: 'Review', value: stats.review || 0, count: stats.review || 0, displayValue: formatPercent(percentages.review, percentages.reviewApprox), color: '#f59e0b' },
    { name: 'To Do', value: stats.notLearned || 0, count: stats.notLearned || 0, displayValue: formatPercent(percentages.toDo, percentages.toDoApprox), color: '#ef4444' },
  ];

  const barData = [
    { name: 'Learned', count: stats.learned || 0, percent: percentages.learned, displayPercent: formatPercent(percentages.learned, percentages.learnedApprox), fill: '#10b981' },
    { name: 'Review', count: stats.review || 0, percent: percentages.review, displayPercent: formatPercent(percentages.review, percentages.reviewApprox), fill: '#f59e0b' },
    { name: 'To Do', count: stats.notLearned || 0, percent: percentages.toDo, displayPercent: formatPercent(percentages.toDo, percentages.toDoApprox), fill: '#ef4444' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 shadow-lg">
          <p className="text-white font-semibold text-sm">{payload[0].name}</p>
          <p className="text-gray-400 text-xs">
            {data.count !== undefined ? `${data.count} items` : ''}
            {data.displayValue ? ` (${data.displayValue})` : data.displayPercent ? ` (${data.displayPercent})` : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 mb-8 hover:border-gray-500 transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#262626] border border-[#333] flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Your Progress
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">Keep up the great work!</p>
          </div>
        </div>
        <div className="w-full sm:w-auto text-left sm:text-right flex flex-row sm:flex-col justify-between items-center sm:items-end">
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {progressPercentage.toFixed(0)}%
          </div>
          <p className="text-xs text-gray-500 mt-0 sm:mt-1">
            {actualProgress} / {totalItems}
          </p>
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="relative w-full h-3 bg-[#111] rounded-full overflow-hidden border border-[#333]">
          <div
            className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          >
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#171717] rounded-xl p-3 sm:p-4 border border-[#333] hover:border-emerald-900 transition-all">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-emerald-900/20 mb-2 sm:mb-3 mx-auto border border-emerald-900/30">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white text-center">{stats.learned || 0}</div>
          <div className="text-[10px] sm:text-xs text-gray-500 font-semibold text-center mt-1">Learned</div>
        </div>

        <div className="bg-[#171717] rounded-xl p-3 sm:p-4 border border-[#333] hover:border-amber-900 transition-all">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-amber-900/20 mb-2 sm:mb-3 mx-auto border border-amber-900/30">
            <RotateCw className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white text-center">{stats.review || 0}</div>
          <div className="text-[10px] sm:text-xs text-gray-500 font-semibold text-center mt-1">Review</div>
        </div>

        <div className="bg-[#171717] rounded-xl p-3 sm:p-4 border border-[#333] hover:border-rose-900 transition-all">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-rose-900/20 mb-2 sm:mb-3 mx-auto border border-rose-900/30">
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white text-center">{stats.notLearned}</div>
          <div className="text-[10px] sm:text-xs text-gray-500 font-semibold text-center mt-1">To Do</div>
        </div>

        <div className="bg-[#171717] rounded-xl p-3 sm:p-4 border border-[#333] hover:border-blue-900 transition-all">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-blue-900/20 mb-2 sm:mb-3 mx-auto border border-blue-900/30">
            <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white text-center">{actualProgress}</div>
          <div className="text-[10px] sm:text-xs text-gray-500 font-semibold text-center mt-1">Total</div>
        </div>
      </div>

      <button
        onClick={() => setIsChartOpen(!isChartOpen)}
        className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <span className="text-sm font-medium">
          {isChartOpen ? 'Hide Charts' : 'View Charts'}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isChartOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isChartOpen ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111] border border-[#333] rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 text-center">Progress Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-500">{item.name}</span>
                  <span className="text-xs text-gray-400 font-medium">{item.displayValue}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111] border border-[#333] rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 text-center">Items by Status</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  radius={[0, 6, 6, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
