import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function RelatedExerciseCard({ exercise }) {
    if (!exercise) return null;

    return (
        <div className="mt-12 bg-[#111] border border-[#333] rounded-2xl p-8 text-white relative overflow-hidden group hover:border-gray-500 transition-colors">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 transform group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-24 -mb-24"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-white/10 text-white">
                        🎯 Practice Now
                    </span>
                    <span className="text-gray-400 text-sm">Related Challenge</span>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white transition-colors">
                    {exercise.title}
                </h3>

                <p className="text-gray-300 mb-6 line-clamp-2 max-w-2xl opacity-90">
                    {exercise.content || "Test your knowledge with this interactive coding challenge."}
                </p>

                <Link
                    href={`/online-javascript-practice/${exercise.slug || exercise.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                >
                    Start Coding
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
