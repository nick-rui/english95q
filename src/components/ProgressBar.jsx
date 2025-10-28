import React, { useRef, useEffect } from 'react';

const ProgressBar = ({ current, total, onSlideClick }) => {
  const roadRef = useRef(null);
  const currentBrickRef = useRef(null);

  // Auto-scroll to current brick on mobile
  useEffect(() => {
    if (currentBrickRef.current && roadRef.current) {
      const brick = currentBrickRef.current;
      const container = roadRef.current;
      const brickLeft = brick.offsetLeft;
      const brickWidth = brick.offsetWidth;
      const containerWidth = container.offsetWidth;

      // Center the current brick in the viewport
      const scrollPosition = brickLeft - (containerWidth / 2) + (brickWidth / 2);
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [current]);

  return (
    <div className="sticky top-0 z-50 py-6 bg-gradient-to-b from-[#F4EFE4] via-[#FFF8DC] to-transparent shadow-md border-b-4 border-[#FFD700]/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl font-['Cinzel'] text-[#2C1810] font-bold">
            The Road Knows
          </h1>
          <p className="text-xs md:text-sm font-['Libre_Baskerville'] text-[#654321] mt-1 italic">
            Your Journey Along the Yellow Brick Road
          </p>
        </div>

        {/* Interactive Yellow Brick Road with Character */}
        <div className="relative">
          {/* Mobile scroll hint */}
          <div className="md:hidden text-center mb-2">
            <p className="text-xs text-[#8B7355] font-['Libre_Baskerville'] italic">
              ← Scroll to see all bricks →
            </p>
          </div>

          {/* The Road Path - Scrollable on mobile */}
          <div ref={roadRef} className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-gray-200">
            <div className="flex items-center justify-between mb-8 px-4 min-w-max md:min-w-0">
              {Array.from({ length: total }).map((_, i) => {
              const isVisited = i < current;
              const isCurrent = i === current - 1;
              const slideNumber = i + 1;

              return (
                <div key={i} className="flex items-center flex-1">
                  {/* Brick Node - Clickable */}
                  <button
                    ref={isCurrent ? currentBrickRef : null}
                    onClick={() => onSlideClick(i)}
                    className={`relative group transition-all duration-300 ${
                      isCurrent ? 'z-20' : 'z-10'
                    }`}
                    aria-label={`Go to slide ${slideNumber}`}
                  >
                    {/* The Brick - Road-like styling */}
                    <div
                      className={`
                        w-14 h-14 rounded-md flex items-center justify-center
                        transition-all duration-300 transform relative
                        ${
                          isCurrent
                            ? 'bg-gradient-to-br from-[#FFD700] via-[#FFB700] to-[#FFA500] scale-125 shadow-[0_8px_20px_rgba(255,215,0,0.5)] ring-4 ring-yellow-300 ring-opacity-50'
                            : isVisited
                            ? 'bg-gradient-to-br from-[#FFD700] via-[#FFB700] to-[#FFA500] hover:scale-110 shadow-[0_4px_15px_rgba(255,215,0,0.4)]'
                            : 'bg-gradient-to-br from-gray-300 via-gray-350 to-gray-400 hover:scale-105 shadow-md'
                        }
                        cursor-pointer
                        border-2 ${
                          isCurrent || isVisited
                            ? 'border-[#CC8800]'
                            : 'border-gray-500'
                        }
                      `}
                      style={{
                        boxShadow: isCurrent
                          ? '0 8px 20px rgba(255, 215, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.2)'
                          : isVisited
                          ? '0 4px 15px rgba(255, 215, 0, 0.4), inset 0 2px 3px rgba(255, 255, 255, 0.3), inset 0 -2px 3px rgba(0, 0, 0, 0.15)'
                          : '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {/* Brick texture overlay */}
                      <div className={`absolute inset-0 rounded-md opacity-30 ${
                        isCurrent || isVisited ? 'bg-[url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h2v2H0V0zm2 2h2v2H2V2z\' fill=\'%23000\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")]' : ''
                      }`} />

                      {/* Character on current slide */}
                      {isCurrent && (
                        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 text-5xl animate-bounce filter drop-shadow-lg">
                          👧
                        </div>
                      )}
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                      <div className="bg-[#2C1810] text-white px-3 py-2 rounded-lg text-xs font-['Libre_Baskerville'] whitespace-nowrap shadow-xl">
                        Slide {slideNumber}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#2C1810] rotate-45"></div>
                      </div>
                    </div>
                  </button>

                  {/* Road Path Between Bricks - Enhanced 3D road effect */}
                  {i < total - 1 && (
                    <div className="flex-1 px-2 flex items-center">
                      <div className="relative w-full h-3 flex items-center">
                        {/* Road base with 3D effect */}
                        <div
                          className={`w-full h-3 rounded-sm transition-all duration-500 relative ${
                            i < current - 1
                              ? 'bg-gradient-to-r from-[#FFA500] via-[#FFB700] to-[#FFD700]'
                              : 'bg-gradient-to-r from-gray-300 to-gray-400'
                          }`}
                          style={{
                            boxShadow: i < current - 1
                              ? '0 2px 8px rgba(255, 165, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.2)'
                              : '0 1px 4px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          {/* Road center line texture */}
                          <div className={`absolute inset-0 rounded-sm ${
                            i < current - 1
                              ? 'bg-[url("data:image/svg+xml,%3Csvg width=\'8\' height=\'2\' viewBox=\'0 0 8 2\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'0\' y=\'0\' width=\'4\' height=\'2\' fill=\'%23CC8800\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")]'
                              : 'bg-[url("data:image/svg+xml,%3Csvg width=\'8\' height=\'2\' viewBox=\'0 0 8 2\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'0\' y=\'0\' width=\'4\' height=\'2\' fill=\'%23000\' fill-opacity=\'0.05\'/%3E%3C/svg%3E")]'
                          }`} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            </div>
          </div>

          {/* Current Slide Info - Compact */}
          <div className="text-center mt-4">
            <p className="text-sm font-['Cinzel'] text-[#2C1810] font-semibold">
              Slide {current} of {total} • <span className="text-xs font-['Libre_Baskerville'] font-normal italic">Click any brick to navigate</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
