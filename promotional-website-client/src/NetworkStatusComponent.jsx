import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import animationData from './assets/PaperPlain_Offline.json'; // Path to your Lottie animation JSON
import './NetworkError.css'; // CSS for styling

const NetworkStatusComponent = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isAnimating, setIsAnimating] = useState(false); // For handling animation

  useEffect(() => {
    const handleOffline = () => {
      setIsAnimating(true);
      setTimeout(() => setIsOnline(false), 500); // Delay for exit animation
    };

    const handleOnline = () => {
      setIsOnline(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500); // Delay for entrance animation
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (!isOnline) {
    return (
      <div className={`network-error-overlay ${isAnimating ? 'animate-in' : 'animate-out'}`}>
        <h2 className='network-error-heading'>No Network Connection</h2>
        <div className="lottie-animation">
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>
        <button className="refresh-button" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
    );
  }

  return <div>{children}</div>; 
};

export default NetworkStatusComponent;
