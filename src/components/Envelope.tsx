import React, { useState } from 'react';

interface EnvelopeProps {
  paragraphs: string[];
  isOpen?: boolean;
  onOpen?: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  paragraphs,
  isOpen = true,
  onOpen,
}) => {
  const [opened, setOpened] = useState(isOpen);

  const handleClick = () => {
    if (!opened) {
      setOpened(true);
      if (onOpen) onOpen();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center p-2 cursor-pointer transition-transform duration-500"
    >
      {/* Parchment Letter that slides upward & unfolds */}
      <div
        className={`w-full bg-[#FFFBF5] text-[#4A3353] rounded-2xl p-4 sm:p-8 shadow-2xl border border-[#F6B8CF]/50 relative transition-all duration-1000 ease-out z-20 ${
          opened
            ? 'opacity-100 transform translate-y-0 scale-100'
            : 'opacity-0 transform translate-y-12 scale-90 pointer-events-none'
        }`}
        style={{
          boxShadow: '0 20px 40px rgba(104, 80, 114, 0.35), 0 0 25px rgba(246, 184, 207, 0.4)',
          backgroundImage: 'radial-gradient(#F7EFE8 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        {/* Decorative corner florals */}
        <div className="absolute top-2 left-3 text-[#C9B6F2] font-handwriting text-lg sm:text-xl opacity-60">✿</div>
        <div className="absolute top-2 right-3 text-[#F6B8CF] font-handwriting text-lg sm:text-xl opacity-60">✿</div>
        <div className="absolute bottom-2 right-3 text-[#FFE5A3] font-handwriting text-lg sm:text-xl opacity-80">♡</div>

        {/* Letter Header */}
        <div className="text-center mb-2.5 sm:mb-4 border-b border-[#F6B8CF]/30 pb-2 sm:pb-3">
          <span className="font-handwriting text-xl sm:text-3xl text-[#9C5D76] font-bold block">
            Gửi Những Bông Hoa 12A1
          </span>
          <span className="text-[10px] sm:text-xs text-[#8A7196] tracking-widest uppercase font-semibold">
            Thư chưa gửi • 20 Tháng 10
          </span>
        </div>

        {/* Letter Content */}
        <div className="space-y-2 sm:space-y-4 font-sans text-xs sm:text-base leading-relaxed text-[#3D2647]">
          {paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-justify font-normal"
              style={{
                textIndent: '1rem',
                lineHeight: '1.6',
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Letter Footer */}
        <div className="mt-3 sm:mt-5 pt-2 sm:pt-3 border-t border-[#F6B8CF]/30 text-right">
          <span className="font-handwriting text-lg sm:text-2xl text-[#9C5D76] font-semibold">
            Các chàng trai 12A1 ♡
          </span>
        </div>
      </div>

      {/* Envelope Outer Base (seen if unopened or underneath) */}
      {!opened && (
        <div className="relative w-80 h-52 bg-[#FDE2EC] rounded-xl border-2 border-[#F6B8CF] shadow-2xl flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-300">
          {/* Envelope fold shadows */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 208">
            <polygon points="0,0 160,110 320,0" fill="#F7B2C9" opacity="0.65" />
            <polygon points="0,208 160,110 320,208" fill="#F4BFD4" opacity="0.9" />
            <polygon points="0,0 160,110 0,208" fill="#FAD4E4" opacity="0.75" />
            <polygon points="320,0 160,110 320,208" fill="#FAD4E4" opacity="0.75" />
          </svg>

          {/* Glowing Heart Wax Seal */}
          <div className="relative z-10 w-16 h-16 rounded-full bg-[#E0537A] border-2 border-[#FFE5A3] shadow-lg flex items-center justify-center animate-pulse">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#FFE5A3">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <span className="absolute bottom-3 text-xs text-[#685072] font-semibold tracking-wider">
            Chạm để mở phong bì ♡
          </span>
        </div>
      )}
    </div>
  );
};
