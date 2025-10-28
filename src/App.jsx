import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Slide from './components/Slide';
import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';
import { slides } from './data/slides';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('roadKnowsProgress');
    if (saved) {
      const progress = parseInt(saved);
      if (progress >= 0 && progress < slides.length) {
        setCurrentSlide(progress);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('roadKnowsProgress', currentSlide.toString());
  }, [currentSlide]);

  // Scroll to top on slide change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
        goNext();
      }
      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        goPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const goNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      // Loop back to start from last slide
      setCurrentSlide(0);
    }
  };

  const goPrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const goToSlide = (slideIndex) => {
    if (slideIndex >= 0 && slideIndex < slides.length) {
      setCurrentSlide(slideIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4EFE4] to-[#FFF8DC] flex flex-col">
      {/* Yellow Brick Road at the top */}
      <ProgressBar
        current={currentSlide + 1}
        total={slides.length}
        onSlideClick={goToSlide}
      />

      {/* Main content */}
      <Layout>
        <div className="w-full">
          <Slide data={slides[currentSlide]} />
          <Navigation
            onNext={goNext}
            onPrevious={goPrevious}
            canGoNext={currentSlide < slides.length - 1 || currentSlide === slides.length - 1}
            canGoPrevious={currentSlide > 0}
            isFirstSlide={currentSlide === 0}
            isLastSlide={currentSlide === slides.length - 1}
          />
        </div>
      </Layout>
    </div>
  );
}

export default App;
