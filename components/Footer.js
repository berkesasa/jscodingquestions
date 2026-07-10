'use client';

import Image from 'next/image';
import { Mail } from 'lucide-react';

const CONTACT_EMAIL = 'jscodingquestions@gmail.com';

export default function Footer() {
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=Contact%20from%20JSCodingQuestions.com&body=Hi%2C%0A%0AI%20would%20like%20to%20reach%20out%20regarding%3A%0A%0A`;

    return (
        <footer className="glass mt-auto border-t border-[#333]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#222] p-1.5 rounded-lg border border-[#333]">
                            <Image
                                src="/logo.png"
                                alt="JS Coding Questions Logo"
                                width={16}
                                height={16}
                                className="w-4 h-4 rounded-sm object-contain"
                            />
                        </div>
                        <span className="text-sm font-semibold text-gray-400">
                            © {new Date().getFullYear()} JS Coding Questions
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a
                            href={mailtoLink}
                            className="px-4 py-2.5 bg-[#1a1a1a] border border-[#333] rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:border-violet-500/50 hover:bg-[#222] transition-all flex items-center gap-2"
                        >
                            <Mail className="w-5 h-5" />
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
