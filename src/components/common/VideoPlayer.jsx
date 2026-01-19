import { useState, useRef, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function VideoPlayer({ src, autoPlay = false, className = '' }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
  }, [src]);

  const handleLoadedData = () => {
    setIsLoading(false);
    if (autoPlay && videoRef.current) {
      // Try to autoplay (may be blocked by browser)
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, user will need to click play
      });
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <LoadingSpinner className="text-white" />
        </div>
      )}

      {error ? (
        <div className="aspect-video flex items-center justify-center bg-gray-900">
          <div className="text-center text-white">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400">Failed to load video</p>
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={src}
          className="w-full aspect-video object-contain"
          controls
          playsInline
          onLoadedData={handleLoadedData}
          onError={handleError}
        />
      )}
    </div>
  );
}
