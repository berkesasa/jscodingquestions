export default function AdSlot({ className = '', type = 'display' }) {
    return (
        <div className={`flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden adsense-placeholder ${className}`}>
            <div className="text-center p-4">
                <p className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Advertisement</p>
                <div className="text-gray-300 text-xs">
                    {type === 'leaderboard' ? '728x90' : type === 'sidebar' ? 'Vertical Ad' : 'Responsive Ad'}
                </div>
            </div>
        </div>
    );
}
