'use client';

import CodeBlock from './CodeBlock';
import Image from 'next/image';
import { withBasePath } from '@/lib/publicPath';

export default function ContentRenderer({ sections, fallbackContent, renderInteractive }) {
  const renderTextWithImages = (text) => {
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = imageRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index)
        });
      }

      parts.push({
        type: 'image',
        alt: match[1],
        src: match[2]
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex)
      });
    }

    if (parts.length === 0) {
      return text.split('\n').map((paragraph, pIndex) => (
        <p key={pIndex} className="mb-4">
          {paragraph}
        </p>
      ));
    }

    return parts.map((part, index) => {
      if (part.type === 'image') {
        return (
          <div key={index} className="my-6 flex justify-center">
            <div className="relative max-w-full">
              <Image
                src={withBasePath(part.src)}
                alt={part.alt || 'Image'}
                width={800}
                height={400}
                className="rounded-lg shadow-lg p-3"
                style={{ width: 'auto', height: 'auto', maxWidth: '100%' }}
              />
            </div>
          </div>
        );
      }
      return part.content.split('\n').map((paragraph, pIndex) => (
        <p key={`${index}-${pIndex}`} className="mb-4">
          {paragraph}
        </p>
      ));
    });
  };

  if (sections && sections.length > 0) {
    return (
      <div className="space-y-4">
        {sections.map((section, index) => {
          if (section.type === 'text') {
            const hasOptions = /-\s*\d+:\s*.+/.test(section.content);
            if (hasOptions && typeof renderInteractive === 'function') {
              return <div key={index}>{renderInteractive(section.content)}</div>;
            }

            return (
              <div key={index} className="max-w-none text-gray-300 leading-relaxed">
                {renderTextWithImages(section.content)}
              </div>
            );
          } else if (section.type === 'code') {
            return (
              <div key={index} className="my-4">
                <CodeBlock
                  code={section.content.code}
                  language={section.content.language}
                />
              </div>
            );
          } else if (section.type === 'image') {
            return (
              <div key={index} className="my-6 flex justify-center">
                <div className="relative max-w-full">
                  <Image
                    src={withBasePath(section.content.src || section.content)}
                    alt={section.content.alt || 'Image'}
                    width={800}
                    height={400}
                    className="rounded-lg border border-[#333]"
                    style={{ width: 'auto', height: 'auto', maxWidth: '100%' }}
                  />
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }

  if (fallbackContent) {
    const hasOptions = /-\s*\d+:\s*.+/.test(fallbackContent);
    if (hasOptions && typeof renderInteractive === 'function') {
      return renderInteractive(fallbackContent);
    }

    return (
      <div className="max-w-none text-gray-300 leading-relaxed">
        {renderTextWithImages(fallbackContent)}
      </div>
    );
  }

  return <p className="text-gray-400 italic">Content not found</p>;
}
