import React, { useState } from 'react';
import { X, Copy, Check, Heart } from 'lucide-react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!message.trim()) return;
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in select-none">
      <div
        className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-7 relative border-2 border-[#F6B8CF]/60 shadow-[0_0_50px_rgba(246,184,207,0.4)] bg-[#1A1028]/90"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#C9B6F2] hover:text-[#FFF7EC] p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FF70A6]/20 border border-[#FF70A6]/40 mb-2">
            <Heart size={24} className="text-[#FF70A6]" fill="#FF70A6" />
          </div>
          <h3 className="font-handwriting text-3xl text-[#FFE5A3] font-bold">
            Gửi Lời Nhắn Đến 12A1
          </h3>
          <p className="text-xs text-[#C9B6F2] mt-1">
            Gửi đôi lời cảm ơn hoặc chia sẻ tâm tư lại cho các bạn nam nhé ♡
          </p>
        </div>

        {/* Text Input Area */}
        <div className="relative mb-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Viết điều gì đó thật dễ thương gửi đến các bạn nam 12A1 nè... (ví dụ: Cảm ơn các bạn nam vì món quà bất ngờ nha! 🥰)"
            className="w-full bg-[#2A1B3D]/80 text-[#FFF7EC] text-sm p-4 rounded-2xl border border-[#F6B8CF]/40 focus:outline-none focus:border-[#FF70A6] focus:ring-2 focus:ring-[#FF70A6]/30 resize-none placeholder-[#8C7A9E]"
          />
        </div>

        {/* Note about privacy & clipboard */}
        <p className="text-[11px] text-[#A695B5] text-center mb-4 italic">
          💡 Vì website tôn trọng sự riêng tư và không lưu dữ liệu trên máy chủ, hãy bấm "Sao chép" rồi dán vào nhóm chat lớp 12A1 nha!
        </p>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          disabled={!message.trim()}
          className="w-full glass-button py-3.5 rounded-full font-semibold text-white flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF70A6] to-[#9C80D8] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(255,112,166,0.4)]"
        >
          {copied ? (
            <>
              <Check size={18} className="text-[#B9DFC8]" />
              <span className="text-[#B9DFC8]">Đã sao chép vào bộ nhớ tạm! ♡</span>
            </>
          ) : (
            <>
              <Copy size={18} />
              <span>Sao chép lời nhắn ♡</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
