import { useState, useRef, useCallback } from 'react';
import { validateVideoFile } from '../../lib/validators';
import { config } from '../../config';

export function VideoUploader({ onFileSelect, selectedFile, error: externalError }) {
  const [isDragging, setIsDragging] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { maxVideoSizeMB, maxVideoDurationSeconds } = config.constraints;
  const { texts } = config;

  const handleFile = useCallback(async (file) => {
    setValidationErrors([]);
    setVideoPreview(null);
    setVideoDuration(null);
    setIsLoading(true);

    if (!file) {
      onFileSelect(null);
      setIsLoading(false);
      return;
    }

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);

      // Get duration (with error handling)
      try {
        const video = document.createElement('video');
        video.preload = 'metadata';

        await new Promise((resolve) => {
          const timeout = setTimeout(() => {
            resolve(); // Don't fail on timeout
          }, 5000);

          video.onloadedmetadata = () => {
            clearTimeout(timeout);
            setVideoDuration(video.duration);
            resolve();
          };

          video.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Don't fail, just skip duration
          };

          video.src = previewUrl;
        });
      } catch {
        // Ignore duration errors
      }

      // Validate file
      const result = await validateVideoFile(file);
      if (!result.isValid) {
        setValidationErrors(result.errors);
        onFileSelect(null);
      } else {
        onFileSelect(file);
      }
    } catch (err) {
      console.error('Error handling file:', err);
      setValidationErrors(['Er ging iets mis bij het laden van de video. Probeer opnieuw.']);
      onFileSelect(null);
    } finally {
      setIsLoading(false);
    }
  }, [onFileSelect]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const clearFile = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    setVideoDuration(null);
    setValidationErrors([]);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  };

  const errors = [...validationErrors, ...(externalError ? [externalError] : [])];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {texts.upload.videoClip} <span className="text-gray-400">{texts.upload.videoOptional}</span>
      </label>

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging
            ? 'border-wedding-gold bg-wedding-gold/5'
            : errors.length > 0
            ? 'border-red-300 bg-red-50'
            : selectedFile
            ? 'border-wedding-sage bg-wedding-sage/5'
            : 'border-gray-300 hover:border-wedding-gold'
        }`}
      >
        {isLoading ? (
          <div className="text-center py-4">
            <div className="w-8 h-8 border-4 border-wedding-gold/30 border-t-wedding-gold rounded-full animate-spin mx-auto" />
            <p className="mt-2 text-sm text-gray-500">Video laden...</p>
          </div>
        ) : videoPreview ? (
          <div className="space-y-4">
            {/* Video preview */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video
                src={videoPreview}
                className="w-full h-full object-contain"
                controls
                playsInline
              />
            </div>

            {/* File info */}
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-600">
                <span className="font-medium">{selectedFile?.name || 'Video'}</span>
                {selectedFile && (
                  <span className="ml-2 text-gray-400">
                    ({formatFileSize(selectedFile.size)})
                  </span>
                )}
                {videoDuration && (
                  <span className="ml-2 text-gray-400">
                    {formatDuration(videoDuration)}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="text-red-500 hover:text-red-700"
              >
                {texts.upload.remove}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div className="mt-4">
              <label
                htmlFor="video-upload"
                className="cursor-pointer text-wedding-gold hover:text-wedding-gold-dark font-medium"
              >
                {texts.upload.clickToUpload}
              </label>
              <span className="text-gray-500"> {texts.upload.orDragDrop}</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              MP4, MOV, max {maxVideoSizeMB}MB, max {maxVideoDurationSeconds} sec
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          id="video-upload"
          type="file"
          accept="video/mp4,video/quicktime,video/x-m4v,video/webm,video/3gpp,.mp4,.mov,.m4v,.webm,.3gp"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((err, index) => (
            <p key={index} className="text-sm text-red-600">
              {err}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
