import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Create a skeleton loading component
function MapSectionSkeleton() {
  return (
    <div className="h-[800px] w-full bg-gray-100 animate-pulse rounded-lg">
      <div className="flex h-full">
        {/* Map placeholder skeleton */}
        <div className="hidden md:block w-1/3 h-full bg-gray-200">
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-gray-400">Loading map...</div>
          </div>
        </div>
        {/* Left sidebar skeleton */}
        <div className="w-full md:w-2/3 p-4 space-y-4 overflow-y-auto">
          {/* Search bar skeleton */}
          <div className="relative">
            <div className="h-12 bg-gray-200 rounded-lg"></div>
            <div className="absolute right-3 top-3 h-6 w-6 bg-gray-300 rounded"></div>
          </div>
          
          {/* Branch list skeleton */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="mt-2 flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        
      </div>
    </div>
  );
}

// Dynamically import the MapSection component with no SSR
const MapSection = dynamic(
  () => import('@/components/sections/MapSection'),
  { 
    ssr: false,
    loading: () => <MapSectionSkeleton />
  }
);

export default function MapBranchesPage() {
  return (
    <Suspense fallback={<MapSectionSkeleton />}>
      <MapSection />
    </Suspense>
  );
}
