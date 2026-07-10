import { Search, Filter, CheckCircle2, Trash2, List } from 'lucide-react';

export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  totalResults,
  showTypeFilter = true,
  showStatusFilter = true
}) {
  return (
    <div className="mb-8">
      {/* Search Input */}
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="🔍 Search questions... (e.g., closure, promise, array)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="glass block w-full pl-12 pr-4 py-4 border border-[#333] rounded-2xl text-base text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all bg-[#111]"
        />
      </div>

      {/* Filters */}
      {(showTypeFilter || showStatusFilter) && (
        <div className="glass rounded-2xl p-5">
          <div className="flex flex-wrap items-center gap-4">
            {showTypeFilter && (
              <div className="flex items-center gap-3">
                <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  Type:
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-xl text-sm font-semibold text-gray-200 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                >
                  <option value="all">✨ All</option>
                  <option value="interview">💼 Interview</option>
                  <option value="exercise">🎯 Exercise</option>
                </select>
              </div>
            )}

            {showStatusFilter && (
              <div className="flex items-center gap-3">
                <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-500" />
                  Status:
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-xl text-sm font-semibold text-gray-200 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                >
                  <option value="all">🌟 All</option>
                  <option value="not_started">🆕 Not Started</option>
                  <option value="learned">✅ Learned</option>
                  <option value="review">🔄 Review Later</option>
                  <option value="not_learned">❌ Not Learned</option>
                </select>
              </div>
            )}

            <button
              onClick={() => {
                if (showTypeFilter) setTypeFilter('all');
                if (showStatusFilter) setStatusFilter('all');
                setSearchTerm('');
              }}
              className="px-4 py-2 bg-[#1a1a1a] border border-[#333] text-gray-400 text-sm font-semibold rounded-xl hover:text-white hover:border-gray-500 transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>

            <div className="ml-auto flex items-center gap-2 bg-[#111] border border-[#333] text-gray-300 px-5 py-2 rounded-xl">
              <List className="w-4 h-4" />
              <span className="text-sm font-bold">{totalResults}</span>
              <span className="text-xs opacity-60">results</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
