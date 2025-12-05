
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export const HeroSlider = ({ branchLocations }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animateGradient, setAnimateGradient] = useState(false);
  
    const nextSlide = () => {
      setAnimateGradient(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % branchLocations.length);
        setAnimateGradient(false);
      }, 500); // gradient duration
    };
  
    const prevSlide = () => {
      setAnimateGradient(true);
      setTimeout(() => {
        setCurrentIndex(
          (prev) => (prev - 1 + branchLocations.length) % branchLocations.length
        );
        setAnimateGradient(false);
      }, 500);
    };
  
    // Auto-play effect
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // change slide every 5 seconds
  
      return () => clearInterval(interval); // cleanup on unmount
    }, [branchLocations]); // re-run if branchLocations change
  
    return (
      <div className="relative w-full h-[600px] overflow-hidden rounded-2xl shadow-2xl">
        
        {/* Slides */}
        {branchLocations.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
           <Image
  src={slide.image}
  alt={`Prime Dialysis Center Inc ${index + 1}`}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
  priority={index < 2} // Preload first 2 images
  quality={index === 0 ? 90 : 75} // Higher quality for first image
  className="object-cover object-center"
  loading={index < 2 ? 'eager' : 'lazy'}
  placeholder="blur"
  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0372b9]/20 to-transparent" />
  
            {/* Animated Gradient */}
            {animateGradient && <div className="animate-gradientSlide" />}
          </div>
        ))}
  
        {/* Floating Badge */}
        <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg z-10">
          <Link
            href={`/map-branches?search=${encodeURIComponent(
              branchLocations[currentIndex]?.name || ""
            )}`}
            className="flex items-center space-x-2"
          >
            <div className="w-3 h-3 rounded-full bg-[#3ab54a] animate-pulse" />
            <span className="text-sm font-medium text-[#0372b9]">
              Prime Dialysis Center Inc - {branchLocations[currentIndex]?.name || "Branch Name"}
            </span>
          </Link>
        </div>
  
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg z-10 transform transition-transform duration-300 hover:scale-110"
          aria-label="Previous Slide"
        >
          <svg
            className="w-6 h-6 text-[#0372b9]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
  
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg z-10 transform transition-transform duration-300 hover:scale-110"
          aria-label="Next Slide"
        >
          <svg
            className="w-6 h-6 text-[#0372b9]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
  
        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {branchLocations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-3 rounded-full transition-all duration-300 ease-out
                ${idx === currentIndex
                  ? "w-6 bg-gradient-to-r from-[#0372b9] to-[#3ab54a] shadow-lg"
                  : "w-3 bg-gray-300 hover:w-5 hover:bg-[#0372b9]/50"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }
  

  export default HeroSlider;