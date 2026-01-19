import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Fisher-Yates shuffle algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * useAudio Hook
 *
 * Manages background music playback with playlist support.
 * Handles autoplay policies, volume control, shuffle mode, and persistent preferences.
 *
 * @param {Array<string>} playlist - Array of audio file paths
 * @param {boolean} autoPlay - Whether to auto-start on mount (respects browser policies)
 * @param {boolean} shuffleOnInit - Whether to shuffle playlist on initialization
 * @returns {object} Audio controls and state
 */
export function useAudio(playlist = [], autoPlay = false, shuffleOnInit = false) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem('quizrine_audio_volume');
    return saved ? parseFloat(saved) : 0.6;
  });
  const [isEnabled, setIsEnabledState] = useState(() => {
    const saved = localStorage.getItem('quizrine_audio_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffledState] = useState(() => {
    const saved = localStorage.getItem('quizrine_audio_shuffle');
    return saved !== null ? JSON.parse(saved) : shuffleOnInit;
  });
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
  const originalPlaylistRef = useRef(playlist);

  // Get active playlist (shuffled or original)
  const activePlaylist = isShuffled && shuffledPlaylist.length > 0 ? shuffledPlaylist : playlist;

  // Initialize shuffled playlist on mount if shuffle is enabled
  useEffect(() => {
    if (isShuffled && playlist.length > 0 && shuffledPlaylist.length === 0) {
      setShuffledPlaylist(shuffleArray(playlist));
    }
  }, [isShuffled, playlist, shuffledPlaylist.length]);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current && activePlaylist.length > 0) {
      audioRef.current = new Audio(activePlaylist[currentTrackIndex]);
      audioRef.current.volume = volume;
      audioRef.current.loop = false; // We'll handle playlist cycling manually

      // Handle track end
      audioRef.current.addEventListener('ended', () => {
        // Auto-advance to next track
        setCurrentTrackIndex((prev) => (prev + 1) % activePlaylist.length);
      });

      // Handle loading states
      audioRef.current.addEventListener('loadstart', () => setIsLoading(true));
      audioRef.current.addEventListener('canplay', () => setIsLoading(false));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []); // Only run once

  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current && activePlaylist.length > 0) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = activePlaylist[currentTrackIndex];

      if (wasPlaying && isEnabled) {
        audioRef.current.play().catch((error) => {
          console.warn('Audio playback failed:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrackIndex, activePlaylist, isEnabled]);

  // Auto-play on mount if enabled
  useEffect(() => {
    if (autoPlay && isEnabled && audioRef.current && !isPlaying) {
      // Attempt autoplay (may be blocked by browser)
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        // Autoplay blocked - user needs to interact first
        console.info('Autoplay prevented by browser. User interaction required.');
        setIsPlaying(false);
      });
    }
  }, [autoPlay]);

  // Play audio
  const play = useCallback(() => {
    if (audioRef.current && isEnabled) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch((error) => {
        console.error('Failed to play audio:', error);
      });
    }
  }, [isEnabled]);

  // Pause audio
  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Toggle play/pause
  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Skip to next track
  const next = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % activePlaylist.length);
  }, [activePlaylist.length]);

  // Skip to previous track
  const previous = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev - 1 + activePlaylist.length) % activePlaylist.length);
  }, [activePlaylist.length]);

  // Toggle shuffle mode
  const toggleShuffle = useCallback(() => {
    const newShuffleState = !isShuffled;
    setIsShuffledState(newShuffleState);
    localStorage.setItem('quizrine_audio_shuffle', JSON.stringify(newShuffleState));

    if (newShuffleState) {
      // Enabling shuffle: create shuffled playlist
      const shuffled = shuffleArray(playlist);
      setShuffledPlaylist(shuffled);
      // Reset to first track of shuffled playlist
      setCurrentTrackIndex(0);
    } else {
      // Disabling shuffle: reset to original playlist
      setCurrentTrackIndex(0);
    }
  }, [isShuffled, playlist]);

  // Set volume (0-1 range)
  const setVolume = useCallback((newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
    localStorage.setItem('quizrine_audio_volume', clampedVolume.toString());
  }, []);

  // Enable/disable audio system
  const setIsEnabled = useCallback((enabled) => {
    setIsEnabledState(enabled);
    localStorage.setItem('quizrine_audio_enabled', JSON.stringify(enabled));
    if (!enabled && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Mute (temporary, doesn't change isPlaying state)
  const mute = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsMuted(true);
    }
  }, [isPlaying]);

  // Unmute (resume if was playing before mute)
  const unmute = useCallback(() => {
    if (audioRef.current && isMuted && isEnabled) {
      audioRef.current.play().catch(console.error);
      setIsMuted(false);
    }
  }, [isMuted, isEnabled]);

  // Fade out effect (for smooth transitions)
  const fadeOut = useCallback((duration = 1000) => {
    if (!audioRef.current) return Promise.resolve();

    return new Promise((resolve) => {
      const startVolume = audioRef.current.volume;
      const step = startVolume / (duration / 50);
      const interval = setInterval(() => {
        if (audioRef.current.volume > step) {
          audioRef.current.volume -= step;
        } else {
          audioRef.current.volume = 0;
          clearInterval(interval);
          pause();
          audioRef.current.volume = startVolume;
          resolve();
        }
      }, 50);
    });
  }, [pause]);

  // Fade in effect
  const fadeIn = useCallback((duration = 1000) => {
    if (!audioRef.current) return Promise.resolve();

    return new Promise((resolve) => {
      const targetVolume = volume;
      audioRef.current.volume = 0;
      play();
      const step = targetVolume / (duration / 50);
      const interval = setInterval(() => {
        if (audioRef.current.volume < targetVolume - step) {
          audioRef.current.volume += step;
        } else {
          audioRef.current.volume = targetVolume;
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }, [volume, play]);

  return {
    isPlaying,
    isEnabled,
    isLoading,
    isMuted,
    isShuffled,
    currentTrackIndex,
    currentTrack: activePlaylist[currentTrackIndex] || null,
    playlist: activePlaylist,
    originalPlaylist: playlist,
    volume,
    play,
    pause,
    toggle,
    next,
    previous,
    toggleShuffle,
    setVolume,
    setIsEnabled,
    mute,
    unmute,
    fadeOut,
    fadeIn
  };
}
