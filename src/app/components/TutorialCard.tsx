import React from 'react';

interface TutorialCardProps {
  id: number;
  topic: string;
  subtitle?: string;
  thumbnail: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  subject: string;
  grade: string;
  hasDiscount?: boolean;
  onClick?: () => void;
}

export function TutorialCard({
  topic,
  subtitle,
  thumbnail,
  price,
  originalPrice,
  discount,
  subject,
  grade,
  hasDiscount = false,
  onClick
}: TutorialCardProps) {
  return (
    <div 
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer relative h-full flex flex-col"
      onClick={onClick}
    >
      {/* Discount Badge */}
      {hasDiscount && discount && (
        <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {discount}
        </div>
      )}

      {/* Thumbnail */}
      <div className="aspect-[4/5] bg-gray-200 rounded-lg mb-4 overflow-hidden">
        <img
          src={thumbnail}
          alt={topic}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to a placeholder if image fails to load
            (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x250/6366f1/ffffff?text=${encodeURIComponent(topic.slice(0, 20))}`;
          }}
        />
      </div>

      {/* Content */}
      <div className="space-y-3 flex-1 flex flex-col">
        {/* Subject & Grade Tags */}
        <div className="flex gap-2 flex-wrap">
          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
            {subject}
          </span>
          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
            Grade {grade}
          </span>
        </div>

        {/* Topic Title */}
        <h3 className="text-lg font-semibold text-white leading-tight">
          {topic}
        </h3>

        {/* Subtitle (Optional) */}
        <div className="flex-1">
          {subtitle && (
            <p className="text-sm text-gray-300 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Bottom Section - Fixed at bottom */}
        <div className="mt-auto space-y-3">
          {/* Pricing */}
          <div className="flex items-center gap-2">
            {hasDiscount && originalPrice ? (
              <>
                <span className="text-lg line-through text-gray-400">{originalPrice}</span>
                <span className="text-xl font-bold text-green-400">{price}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-white">{price}</span>
            )}
          </div>

          {/* Book Delivery Note */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>📚</span>
            <span>Printed book delivered to your door</span>
          </div>
        </div>
      </div>
    </div>
  );
}