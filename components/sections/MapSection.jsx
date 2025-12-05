"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MapPin, Phone, Mail, Building, Search, X } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { branchLocations } from '@/lib/branchLocatorModule';
import { 
  useMapInteractions, 
  useDirections,
  DirectionsModal,
  useGoogleMaps 
} from '@/components/map';

export default function MapSection() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [isMapReady, setIsMapReady] = useState(false);

  // Initialize map interactions and directions
  const { 
    showDirectionModal, 
    directionUrl, 
    handleGetDirections, 
    handleCloseModal 
  } = useDirections();

  // Initialize map interactions
  const { focusMarker, handleUseMyLocation, resetMap } = useMapInteractions(
    mapInstance,
    markersRef,
    setSearchInput,
    setSelectedBranch,
    branchLocations
  );

  // Initialize Google Maps
  useGoogleMaps(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY, () => {
    if (!mapRef.current || mapInstance.current) return;
    initMap();
  });

  const initMap = useCallback(() => {
    if (!mapRef.current || mapInstance.current) return;

    try {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 14.4791, lng: 120.8967 },
        zoom: 6,
        gestureHandling: "greedy",
      });

      // Initialize markers
      markersRef.current = branchLocations.map((loc, index) => {
        const marker = new window.google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map: mapInstance.current,
          label: `${index + 1}`,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
          <div class="relative w-[200px] md:w-[280px] lg:w-[450px] max-w-[90vw] mx-auto">
            <div class="h-24 sm:h-36 w-full overflow-hidden rounded-t-lg">
              <img 
                src="${loc.image}" 
                alt="${loc.name} Branch" 
                class="w-full h-full object-cover"
                onerror="this.src='https://via.placeholder.com/400x200?text=Prime+Dialysis+Center'"
              />
            </div>
            <div class="p-3 sm:p-4 space-y-2 sm:space-y-3">
              <div>
                <h3 class="text-base sm:text-lg font-medium text-gray-900 leading-tight">${loc.name}</h3>
                <p class="text-xs text-gray-500">Prime Dialysis Center</p>
              </div>
              
              <div class="space-y-2 sm:space-y-3 text-sm text-gray-700">
                <div class="flex items-start">
                  <svg class="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-gray-700 text-xs sm:text-sm">${loc.address}</span>
                </div>
                
                <div class="flex items-center">
                  <svg class="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:${loc.phone}" class="text-gray-700 hover:text-gray-900 transition-colors text-xs sm:text-sm">${loc.phone}</a>
                </div>
                
                <div class="flex items-center">
                  <svg class="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:${loc.email}" class="text-gray-700 hover:text-gray-900 transition-colors text-xs sm:text-sm break-all">${loc.email}</a>
                </div>
              </div>
              
              <div class="pt-2">
                <button 
                  class="inline-flex items-center justify-center w-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors cursor-pointer"
                  onclick="window.handleGetDirections && window.handleGetDirections(event, ${loc.lat}, ${loc.lng})"
                >
                  <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        `,
        });

        marker.addListener('click', () => {
          focusMarker(index);
        });

        return { marker, infoWindow };
      });

      setIsMapReady(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [focusMarker]);

  // Handle search parameter changes (from URL)
  useEffect(() => {
    if (!searchQuery) {
      setSearchInput('');
      return;
    }

    const branchIndex = branchLocations.findIndex(
      branch => branch.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (branchIndex !== -1 && isMapReady) {
      focusMarker(branchIndex);
      setSearchInput(searchQuery);
    } else {
      setSelectedBranch(null);
    }
  }, [searchQuery, isMapReady, focusMarker]);

  // Update URL when searchInput changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput === searchQuery) return;
      
      const params = new URLSearchParams();
      if (searchInput) {
        params.set('search', searchInput);
        window.history.pushState({}, '', `?${params.toString()}`);
      } else {
        window.history.pushState({}, '', window.location.pathname);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, searchQuery]);

  // Filter branches based on search input
  const filteredBranches = branchLocations.filter(branch =>
    branch.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the useEffect above
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Function to handle directions - attached to window for InfoWindow access
  useEffect(() => {
    window.handleGetDirections = handleGetDirections;
    return () => {
      if (window.handleGetDirections) {
        delete window.handleGetDirections;
      }
    };
  }, [handleGetDirections]);

  // ... rest of your component JSX remains the same ...
  // Make sure to update the JSX to use the new handlers and state

  return (
    <section className="w-full md:h-screen md:mb-[0px] flex flex-col-reverse md:flex-row ">
      {/* Map container */}
      <div className="w-full h-64 md:w-1/2 md:h-full">
        <div ref={mapRef} className="w-full h-full" />
      </div>

      {/* Branch list */}
      <div className="w-full md:w-1/2 bg-gray-50 h-auto md:h-full overflow-y-auto p-4">
        {/* Mobile dropdown */}
        <div className="md:hidden mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Building className="w-5 h-5 text-[#0372b9]" />
            <span className="text-lg font-semibold text-[#0372b9]">Select Branch</span>
          </div>

          <div className="relative">
            <select
              className="w-full p-3 border rounded-lg bg-white appearance-none pr-10 shadow-sm focus:ring-2 focus:ring-[#0372b9]/50"
              onChange={e => {
                const index = Number(e.target.value);
                if (!isNaN(index)) focusMarker(index);
              }}
              defaultValue=""
            >
              <option value="">Choose...</option>
              {filteredBranches.map((loc, i) => (
                <option key={i} value={branchLocations.indexOf(loc)}>
                  {loc.name}
                </option>
              ))}
            </select>

            <MapPin className="w-5 h-5 absolute right-3 top-3 text-[#0372b9] pointer-events-none" />
          </div>
        </div>

        {/* Mobile details */}
        {selectedBranch && (
          <div className="md:hidden rounded-xl overflow-hidden bg-gradient-to-r from-[#3ab54a] to-[#2e8a3a] shadow-lg mb-4">
            <div className="p-4 bg-white/90 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-2"> Prime Dialysis Center - {selectedBranch.name}</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{selectedBranch.address}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-green-600 mr-2" />
                  <a href={`tel:${selectedBranch.phone}`} className="text-gray-700 text-sm hover:text-green-600 transition-colors">
                    {selectedBranch.phone}
                  </a>
                </div>
                <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0 text-[#0372b9]" />
                  <a 
                    href={`https://mail.google.com/mail/?view=cm&to=${selectedBranch.email}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#0369a1] transition-colors font-medium line-clamp-1 flex items-center"
                  >
                    {selectedBranch.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop list */}
        <div className="mb-4 hidden md:block bg-gradient-to-r from-[#3ab54a] to-[#2e8a3a] text-white px-4 py-3 rounded-t-lg shadow-md">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Branch Locator</h2>
                  <p className="text-sm text-green-100 opacity-90">Find the nearest Prime Dialysis Center branch</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <p className="text-sm font-medium">
                    <span className="text-green-100">Found:</span>{' '}
                    <span className="text-white font-semibold">{filteredBranches.length}</span>
                  </p>
                </div>
              </div>
              
                 <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search location or branch..."
                    value={searchInput}
                    onChange={handleInputChange}
                    className="block w-full pl-9 pr-20 py-2 text-sm rounded-lg bg-white/95 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-green-500 shadow-sm transition-all duration-150"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleUseMyLocation}
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      title="Use my location"
                    >
                      <MapPin className="h-4 w-4 text-green-600" />
                    </button>
                    {searchInput && (
  <button
    onClick={() => {
      setSearchInput('');
      resetMap(); // reset everything
    }}
    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
    title="Clear search"
  >
    <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
  </button>
)}

                  </div>
                </div>


            </div>
          </div>
        </div>

        <div className="max-h-[700px] overflow-y-auto space-y-3 hidden md:block px-2">
          {filteredBranches.map((loc, index) => {
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
            return (
            <div
              key={index}
              className="relative border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 bg-white h-40 group"
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10"></div>
                <div className="relative w-full h-full overflow-hidden">
                  <img 
                    src={loc.image} 
                    alt="" 
                    className="w-full h-full object-cover object-right transition-transform duration-700 ease-out group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x200?text=Prime+Dialysis+Center';
                    }}
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-20 p-4 w-3/4 h-full flex flex-col justify-center bg-gradient-to-r from-white via-white to-transparent transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-white/95 group-hover:via-white/90 group-hover:to-transparent">
                <div 
                  onClick={() => focusMarker(branchLocations.indexOf(loc))} 
                  className="cursor-pointer space-y-2.5"
                >
                  <h3 className="text-lg font-bold text-[#0372b9] tracking-wide"> Prime Dialysis Center - {loc.name}</h3>
                  <p className="text-sm text-gray-800 flex items-start">
                    <MapPin className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-[#0372b9]" />
                    <span className="line-clamp-2 text-gray-700 font-medium">{loc.address}</span>
                  </p>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-[#0372b9]" />
                    <a 
                      href={`tel:${loc.phone}`} 
                      className="text-gray-700 hover:text-[#0369a1] transition-colors font-medium flex items-center"
                    >
                      {/* <span className="mr-1.5">•</span> */}
                      <span>{loc.phone}</span>
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0 text-[#0372b9]" />
  <a 
    href={`https://mail.google.com/mail/?view=cm&to=${loc.email}`} 
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-700 hover:text-[#0369a1] transition-colors font-medium line-clamp-1 flex items-center"
  >
    {loc.email}
  </a>
                  </div>
                </div>
              </div>
            </div>
          );
          })}
          
        </div>
      </div>
      
      {/* Direction Confirmation Modal */}
      <DirectionsModal 
        show={showDirectionModal}
        onClose={handleCloseModal}
        directionUrl={directionUrl}
      />
    </section>
  );
}