import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Navigation = ({ onNext, onPrevious, canGoNext, canGoPrevious, isFirstSlide, isLastSlide }) => {
  return (
    <div className="py-8 bg-gradient-to-t from-[#F4EFE4] to-transparent">
      <div className="max-w-4xl mx-auto px-4 flex justify-center items-center gap-6">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-['Cinzel'] text-lg font-semibold
            transition-all duration-300 min-w-[140px] justify-center
            ${canGoPrevious
              ? 'bg-[#FFD700] text-[#2C1810] hover:bg-[#FFA500] hover:-translate-y-1 hover:shadow-lg cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
            }
          `}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        {/* Next/Finish Button */}
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-['Cinzel'] text-lg font-semibold
            transition-all duration-300 min-w-[140px] justify-center
            ${canGoNext
              ? 'bg-[#FFD700] text-[#2C1810] hover:bg-[#FFA500] hover:-translate-y-1 hover:shadow-lg cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
            }
          `}
          aria-label={isLastSlide ? "Return to start" : "Next slide"}
        >
          {isFirstSlide ? 'Begin the Journey' : isLastSlide ? 'Return to Start' : 'Next'}
          {!isLastSlide && canGoNext && <ChevronRight size={20} />}
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="text-center mt-4">
        <p className="text-sm text-[#8B7355] font-['Libre_Baskerville']">
          Use arrow keys ← → to navigate
        </p>
      </div>
    </div>
  );
};

export default Navigation;
