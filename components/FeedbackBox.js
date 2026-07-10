'use client';

import { MessageSquare } from 'lucide-react';

const CONTACT_EMAIL = 'jscodingquestions@gmail.com';

export default function FeedbackButton({ questionTitle, questionId, type = 'interview' }) {
    const itemType = type === 'exercise' ? 'Exercise' : 'Question';
    const subject = encodeURIComponent(`Feedback for ${itemType} #${questionId}: ${questionTitle}`);
    const body = encodeURIComponent(
        `Hi,\n\nI have feedback regarding the following ${itemType.toLowerCase()}:\n\n` +
        `Title: ${questionTitle}\n` +
        `ID: #${questionId}\n` +
        `Type: ${itemType}\n\n` +
        `---\n\n` +
        `My feedback:\n\n` +
        `[ ] Bug Report - Something is incorrect or not working\n` +
        `[ ] Suggestion - I have an improvement idea\n` +
        `[ ] Question - I need clarification\n\n` +
        `Details:\n\n\n\n` +
        `---\n` +
        `Thank you!`
    );

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    return (
        <a
            href={mailtoLink}
            className="px-3 py-2 text-xs font-medium text-gray-400 bg-[#1a1a1a] border border-[#333] rounded-lg hover:bg-[#222] hover:text-violet-400 hover:border-violet-500/50 transition-all flex items-center gap-1.5"
            title="Report Issue / Suggestion"
        >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Feedback</span>
        </a>
    );
}
