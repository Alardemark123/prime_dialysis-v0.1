import { useEffect, useRef } from 'react';

export const useGoogleMaps = (apiKey, onLoad) => {
  const isMounted = useRef(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    if (window.google && window.google.maps) {
      if (onLoad) onLoad();
      return;
    }

    if (document.querySelector('#google-maps-script')) {
      // If script is already loading, just wait for it
      window.initMap = onLoad;
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    window.initMap = () => {
      if (isInitialized.current) return;
      isInitialized.current = true;
      if (onLoad) onLoad();
    };

    script.onerror = (error) => {
      console.error('Error loading Google Maps API:', error);
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (window.initMap === onLoad) {
        delete window.initMap;
      }
    };
  }, [apiKey, onLoad]);
};
