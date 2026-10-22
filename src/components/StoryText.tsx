import React from 'react';

interface StoryTextProps {
  lines: string[];
  highlightWords?: string[];
  className?: string;
  speakerName?: string;
}

export const StoryText: React.FC<StoryTextProps> = ({
  lines,
  highlightWords = ['20/10', '12A1', 'Hoa', 'Bướm', 'tráng miệng', 'bữa chính', 'xinh đẹp', 'tự tin', 'rạng rỡ', 'yêu thương'],
  className = '',
  speakerName = 'Hoa ♡',
}) => {
  // Helper to highlight key emotional keywords
  const formatTextWithHighlights = (text: string) => {
    let parts: React.ReactNode[] = [text];

    highlightWords.forEach((word) => {
      const nextParts: React.ReactNode[] = [];
      parts.forEach((part) => {
        if (typeof part === 'string' && part.includes(word)) {
          const split = part.split(word);
          split.forEach((s, idx) => {
            if (s) nextParts.push(s);
            if (idx < split.length - 1) {
              nextParts.push(
                <span
                  key={`${word}-${idx}`}
                  className="font-bold text-[#FF70A6] drop-shadow-[0_0_10px_rgba(255,112,166,0.65)]"
                >
                  {word}
                </span>
              );
            }
          });
        } else {
          nextParts.push(part);
        }
      });
      parts = nextParts;
    });

    return parts;
  };

  return (
    <div
      className={`relative glass-panel rounded-3xl p-5 sm:p-7 max-w-lg mx-auto text-center border border-[#F6B8CF]/40 shadow-2xl transition-all duration-700 ${className}`}
      style={{
        boxShadow: '0 12px 36px rgba(104, 80, 114, 0.4), inset 0 0 20px rgba(255, 247, 236, 0.1)',
      }}
    >
      {/* Speech bubble pointer tail pointing upward to Hoa */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-3 overflow-hidden pointer-events-none">
        <div className="w-4 h-4 bg-[#2A173A]/80 border-t border-l border-[#F6B8CF]/50 transform rotate-45 mx-auto -translate-y-2 backdrop-blur-md" />
      </div>

      {/* Speaker Tag - Cute & Intimate */}
      {speakerName && (
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FF70A6]/20 border border-[#FF70A6]/40 text-[#FFE5A3] font-handwriting text-base sm:text-lg mb-2 shadow-sm">
          <span>🌸</span>
          <span>{speakerName}</span>
        </div>
      )}

      {/* Dialogue Lines - Warm, Direct Conversation with Gentle Text Reveal */}
      <div className="space-y-3.5">
        {lines.map((line, idx) => (
          <p
            key={`${line}-${idx}`}
            className="text-base sm:text-lg md:text-xl text-[#FFF7EC] font-sans font-medium leading-relaxed text-glow transition-all duration-500"
            style={{
              animation: 'fadeInUp 0.5s ease-out both',
              animationDelay: `${idx * 0.12}s`,
            }}
          >
            {formatTextWithHighlights(line)}
          </p>
        ))}
      </div>
    </div>
  );
};
