'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ code, language = 'javascript' }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-[#333] bg-[#0d0d0d] my-6">
      <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-[#333]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#333]"></div>
          <div className="w-3 h-3 rounded-full bg-[#333]"></div>
          <div className="w-3 h-3 rounded-full bg-[#333]"></div>
        </div>
        <span className="text-xs text-gray-500 font-mono lowercase ml-2">{language}</span>
        <button
          onClick={copyToClipboard}
          className="ml-auto text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto text-sm">
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
            fontSize: '0.9rem',
            lineHeight: '1.6',
          }}
          wrapLines={true}
          showLineNumbers={true}
          lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: '#444', textAlign: 'right' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
