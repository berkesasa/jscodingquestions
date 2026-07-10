'use client';

import Link from 'next/link';
import { Home, MoveLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="glass rounded-3xl p-12 max-w-lg w-full relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500"></div>

                <div className="mb-8 relative">
                    <div className="text-9xl font-black text-[#222] select-none">404</div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
                <p className="text-gray-400 mb-8 text-lg">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1a1a1a] border border-[#333] text-white font-bold rounded-xl hover:bg-[#222] transition-colors"
                    >
                        <MoveLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
