import { useCallback } from 'react';
import { haversineDistance } from '../utils/distanceUtils';

export const useMapInteractions = (mapInstance, markersRef, setSearchInput, setSelectedBranch, branchLocations) => {
  const focusMarker = useCallback((index) => {
    if (!mapInstance.current || !markersRef.current[index]) {
      setTimeout(() => focusMarker(index), 200);
      return;
    }

    const { marker, infoWindow } = markersRef.current[index];

    // Close all other info windows
    markersRef.current.forEach(m => m.infoWindow.close());
    
    // Pan to marker
    mapInstance.current.panTo(marker.getPosition());
    
    // Set zoom and open info window
    google.maps.event.addListenerOnce(mapInstance.current, "idle", () => {
      mapInstance.current.setZoom(15);
      infoWindow.open(mapInstance.current, marker);
    });
    
    setSelectedBranch(branchLocations[index]);
  }, [mapInstance, markersRef, setSelectedBranch, branchLocations]);

  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Show user location marker
        if (mapInstance.current) {
          if (window.userMarker) window.userMarker.setMap(null);

          const userMarker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: mapInstance.current,
            title: "You are here",
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#0372b9",
              fillOpacity: 0.9,
              strokeWeight: 2,
              strokeColor: "#ffffff",
            },
          });

          window.userMarker = userMarker;
          mapInstance.current.panTo({ lat: latitude, lng: longitude });
          mapInstance.current.setZoom(14);
        }

        // Find closest branch
        let closestIndex = 0;
        let minDistance = Infinity;

        branchLocations.forEach((branch, i) => {
          const distance = haversineDistance(latitude, longitude, branch.lat, branch.lng);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        });

        // Focus on the closest branch
        focusMarker(closestIndex);
        setSearchInput(branchLocations[closestIndex].name);
      },
      (err) => {
        console.error(err);
        alert("Unable to get your location. Please allow location access.");
      },
      { enableHighAccuracy: true }
    );
  }, [mapInstance, branchLocations, focusMarker, setSearchInput]);

  const resetMap = useCallback(() => {
    // Clear selected branch
    setSelectedBranch(null);

    // Reset map center & zoom
    if (mapInstance.current) {
      mapInstance.current.panTo({ lat: 14.4791, lng: 120.8967 });
      mapInstance.current.setZoom(6);
    }

    // Close all InfoWindows
    markersRef.current.forEach(({ infoWindow }) => infoWindow.close());

    // Remove user location marker if exists
    if (window.userMarker) {
      window.userMarker.setMap(null);
      delete window.userMarker;
    }
  }, [mapInstance, markersRef, setSelectedBranch]);

  return {
    focusMarker,
    handleUseMyLocation,
    resetMap
  };
};
