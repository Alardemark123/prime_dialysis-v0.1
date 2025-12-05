import { useState, useCallback } from 'react';

export const useDirections = () => {
  const [showDirectionModal, setShowDirectionModal] = useState(false);
  const [directionUrl, setDirectionUrl] = useState('');

  const handleGetDirections = useCallback((e, lat, lng) => {
    if (e && e.preventDefault) e.preventDefault();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    setDirectionUrl(url);
    setShowDirectionModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowDirectionModal(false);
    setDirectionUrl('');
  }, []);

  return {
    showDirectionModal,
    directionUrl,
    handleGetDirections,
    handleCloseModal
  };
};
