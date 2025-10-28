import React, { useEffect, useState } from 'react';

const Slide = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [data.id]);

  return (
    <div
      className={`w-full max-w-6xl mx-auto px-4 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Narration Box */}
      <div className="bg-white/95 rounded-lg border-l-6 border-[#FFD700] p-8 shadow-lg max-w-3xl mx-auto">
        <h2 className="font-['Cinzel'] text-2xl md:text-3xl text-[#2C1810] mb-2 font-bold">
          {data.title}
        </h2>
        {data.subtitle && (
          <h3 className="font-['Cinzel'] text-lg text-[#654321] mb-6 italic">
            {data.subtitle}
          </h3>
        )}

        {/* Handle both narration and content (for credits slide) */}
        {data.narration && (
          <div className="font-['Libre_Baskerville'] text-lg leading-relaxed text-[#2C1810] whitespace-pre-line">
            {data.narration}
          </div>
        )}

        {data.content && (
          <div className="font-['Libre_Baskerville'] text-base leading-relaxed text-[#2C1810] whitespace-pre-line">
            {data.content}
          </div>
        )}

        {/* Custom button text for first slide */}
        {data.id === 1 && data.buttonText && (
          <div className="mt-6 text-center">
            <span className="text-sm text-[#654321] italic">
              Click "{data.buttonText}" below to begin
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide;
