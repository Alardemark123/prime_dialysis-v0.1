import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

export const MockupGridVertical = ({ branchLocations }) => {
    const [slideHeight, setSlideHeight] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
  
    const duplicatedLocations = useMemo(
      () => [...branchLocations, ...branchLocations, ...branchLocations],
      [branchLocations]
    );
  
    useEffect(() => {
      if (typeof document !== "undefined") {
        const SINGLE_SET_HEIGHT = branchLocations.length * (200 + 50);
        document.documentElement.style.setProperty(
          "--slide-height",
          `${SINGLE_SET_HEIGHT}px`
        );
        setSlideHeight(SINGLE_SET_HEIGHT);
      }
    }, [branchLocations]);

    // Image loading state handler
    const handleImageLoad = () => {
      setIsLoading(false);
    };

    // Set loading to true when branch locations change
    useEffect(() => {
      setIsLoading(true);
    }, [branchLocations]);
  
    return (
      <div className="absolute top-[-50%] right-0 w-[1690px] h-[2500px] flex justify-between overflow-hidden rotate-45">
        {/* Left Column - scroll down */}
        <div className="relative w-[550px] h-full overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full animate-vertical-loop-down flex flex-col gap-4"
            style={{ height: `calc(3 * var(--slide-height))` }}
          >
            {duplicatedLocations.map((branch, index) => (
              <div
                key={`left-${index}`}
                className={`relative w-full h-[300px] bg-white shadow-xl rounded-xl overflow-hidden transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  sizes="(max-width: 550px) 100vw, 550px"
                  className="object-cover"
                  onLoad={handleImageLoad}
                  priority={index < 3} // Only prioritize first few images
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      
        {/* Right Column - scroll up */}
        <div className="relative w-[550px] h-full overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full animate-vertical-loop-up flex flex-col gap-4"
            style={{ height: `calc(3 * var(--slide-height))` }}
          >
            {duplicatedLocations.map((branch, index) => (
              <div
                key={`right-${index}`}
                className={`relative w-full h-[300px] bg-white shadow-xl rounded-xl overflow-hidden transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  sizes="(max-width: 550px) 100vw, 550px"
                  className="object-cover"
                  onLoad={handleImageLoad}
                  priority={index < 3} // Only prioritize first few images
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      
        {/* Third Column - scroll down */}
        <div className="relative w-[550px] h-full overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full animate-vertical-loop-down flex flex-col gap-4"
            style={{ height: `calc(3 * var(--slide-height))` }}
          >
            {duplicatedLocations.map((branch, index) => (
              <div
                key={`left2-${index}`}
                className={`relative w-full h-[300px] bg-white shadow-xl rounded-xl overflow-hidden transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  sizes="(max-width: 550px) 100vw, 550px"
                  className="object-cover"
                  onLoad={handleImageLoad}
                  priority={index < 3} // Only prioritize first few images
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default MockupGridVertical;