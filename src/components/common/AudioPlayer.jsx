import { Volume2, VolumeX, SkipForward, Play, Pause, Music, Shuffle } from 'lucide-react';
import { useState } from 'react';

/**
 * AudioPlayer Component
 *
 * Fixed-position audio player controls for background music.
 * Displays play/pause, next track, and volume controls.
 *
 * @param {object} audio - Audio state and controls from useAudio hook
 * @param {string} className - Additional CSS classes
 */
export default function AudioPlayer({ audio, className = '' }) {
  const [showVolume, setShowVolume] = useState(false);
  const [showTrackInfo, setShowTrackInfo] = useState(false);

  if (!audio || !audio.currentTrack) {
    return null; // Don't render if no audio system or playlist
  }

  const { isPlaying, isEnabled, isShuffled, volume, toggle, next, toggleShuffle, setVolume, setIsEnabled, currentTrackIndex, currentTrack } = audio;

  // Extract track name from path
  const trackName = currentTrack ? currentTrack.split('/').pop().replace('.mp3', '') : 'Track';

  return (
    <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
      {/* Track Info Tooltip */}
      {showTrackInfo && isEnabled && (
        <div className="absolute bottom-full right-0 mb-2 bg-white/95 backdrop-blur-md shadow-xl rounded-lg p-3 border-2 border-adventure-coral/20 animate-slideUpFade min-w-[200px]">
          <p className="text-xs text-text-secondary mb-1">Nu aan het spelen:</p>
          <p className="text-sm font-semibold text-text-primary truncate">{trackName}</p>
          <p className="text-xs text-adventure-coral mt-1">Track {currentTrackIndex + 1} van {audio.playlist?.length || 0}</p>
        </div>
      )}

      <div
        className="bg-white/90 backdrop-blur-md shadow-xl rounded-full p-2 border-2 border-adventure-coral/20 flex items-center gap-2"
        onMouseEnter={() => setShowTrackInfo(true)}
        onMouseLeave={() => setShowTrackInfo(false)}
      >
        {/* Music Icon */}
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className={`p-2 rounded-full transition-all duration-200 ${
            isEnabled
              ? 'bg-adventure-coral text-white hover:bg-adventure-coral/80'
              : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
          }`}
          aria-label={isEnabled ? 'Disable music' : 'Enable music'}
          title={isEnabled ? 'Muziek uitschakelen' : 'Muziek inschakelen'}
        >
          <Music className="w-5 h-5" />
        </button>

        {/* Only show controls if audio is enabled */}
        {isEnabled && (
          <>
            {/* Play/Pause Button */}
            <button
              onClick={toggle}
              className="p-2 rounded-full bg-adventure-teal text-white hover:bg-adventure-teal/80 transition-all duration-200 hover:scale-110"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              title={isPlaying ? 'Pauzeren' : 'Afspelen'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>

            {/* Next Track Button */}
            <button
              onClick={next}
              className="p-2 rounded-full bg-adventure-gold text-white hover:bg-adventure-gold/80 transition-all duration-200 hover:scale-110"
              aria-label="Next track"
              title="Volgende track"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {/* Shuffle Button */}
            <button
              onClick={toggleShuffle}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isShuffled
                  ? 'bg-adventure-purple text-white'
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
              aria-label={isShuffled ? 'Shuffle on' : 'Shuffle off'}
              title={isShuffled ? 'Shuffle uitschakelen' : 'Shuffle inschakelen'}
            >
              <Shuffle className="w-5 h-5" />
            </button>

            {/* Volume Control */}
            <div
              className="relative"
              onMouseEnter={() => setShowVolume(true)}
              onMouseLeave={() => setShowVolume(false)}
            >
              <button
                className="p-2 rounded-full bg-adventure-navy text-white hover:bg-adventure-navy/80 transition-all duration-200"
                aria-label="Volume"
                title="Volume"
              >
                {volume > 0 ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </button>

              {/* Volume Slider (appears on hover) */}
              {showVolume && (
                <div className="absolute bottom-full right-0 mb-2 bg-white/95 backdrop-blur-md shadow-xl rounded-lg p-3 border-2 border-adventure-navy/20 animate-slideUpFade">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={(e) => setVolume(parseFloat(e.target.value) / 100)}
                    className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-adventure-coral [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-adventure-coral [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                    aria-label="Volume slider"
                  />
                  <p className="text-xs text-center text-text-secondary mt-1">
                    {Math.round(volume * 100)}%
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Compact AudioPlayer Component
 *
 * Smaller version for mobile or constrained spaces.
 */
export function CompactAudioPlayer({ audio, className = '' }) {
  if (!audio || !audio.currentTrack || !audio.isEnabled) {
    return null;
  }

  const { isPlaying, toggle } = audio;

  return (
    <button
      onClick={toggle}
      className={`fixed bottom-4 right-4 p-3 rounded-full bg-adventure-coral text-white shadow-lg hover:scale-110 transition-all duration-200 z-40 ${className}`}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <Pause className="w-6 h-6" />
      ) : (
        <Play className="w-6 h-6" />
      )}
    </button>
  );
}
