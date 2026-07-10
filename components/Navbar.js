'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { withBasePath } from '@/lib/publicPath';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 glass border-b border-[#333]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="">
                        <Image
                            src={withBasePath('/logo.png')}
                            alt="JS Coding Questions Logo"
                            width={24}
                            height={24}
                            className="w-8 h-8 rounded-lg object-contain"
                        />
                    </div>
                    <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:to-white transition-all">
                        JS Coding Questions
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/javascript-interview-questions" className="text-gray-400 hover:text-white font-medium transition-colors text-sm">
                        Interview Questions
                    </Link>
                    <Link href="/online-javascript-practice" className="text-gray-400 hover:text-white font-medium transition-colors text-sm">
                        Practice Exercises
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-[#333] hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-[#333] bg-[#0a0a0a]">
                    <nav className="flex flex-col p-4 space-y-4">
                        <Link
                            href="/javascript-interview-questions"
                            className="text-gray-400 hover:text-white font-medium transition-colors text-base py-2 px-3 rounded-lg hover:bg-[#222]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Interview Questions
                        </Link>
                        <Link
                            href="/online-javascript-practice"
                            className="text-gray-400 hover:text-white font-medium transition-colors text-base py-2 px-3 rounded-lg hover:bg-[#222]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Practice Exercises
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
