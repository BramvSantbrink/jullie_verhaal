# Audio Testing Guide

Your wedding quiz app now has a fully functional audio player with **autoplay** and **shuffle** enabled! Here's how to test it:

## ✅ Setup Complete

- **15 MP3 files** copied to `public/audio/` folder
- **Config updated** with all track paths
- **Autoplay enabled** - Music starts automatically (after browser allows)
- **Shuffle enabled** - Playlist randomized on each session
- **Audio player** with track info tooltip and controls

## 🎵 How to Test the Audio

### 1. Open the App
Navigate to: **http://localhost:5178** (or the port shown in your terminal)

### 2. Audio Should Start Automatically
- Music should begin playing within 1-2 seconds of page load
- If not, click the Play button (browser autoplay policy may block first-time autoplay)
- Once you interact with the page, autoplay will work on subsequent visits

### 3. Verify Shuffle is Working
To confirm shuffle is enabled:
- Check browser console (F12) - localStorage key `quizrine_audio_shuffle` should be `true`
- Listen to track order - it should be randomized, not sequential
- Refresh the page - the shuffle order should change (new random order)

### 4. Audio Player Location
Look for the **round audio controls in the bottom-right corner** of the screen.

### 5. Controls Available

| Button | Function | Description |
|--------|----------|-------------|
| 🎵 Music Icon | Enable/Disable | Toggle the entire audio system on/off |
| ▶️ Play | Play Music | Start playing the current track |
| ⏸️ Pause | Pause Music | Pause the current track |
| ⏭️ Next | Next Track | Skip to the next song in the shuffled playlist |
| 🔊 Volume | Volume Control | Hover to show volume slider (0-100%) |

### 6. Track Information
**Hover over the audio player** to see:
- Current track name
- Track number (e.g., "Track 3 of 15")

### 7. Testing Checklist

- [ ] Music starts automatically when page loads (or after first click)
- [ ] Tracks play in random order (not 1, 2, 3...)
- [ ] Hover over player - Track info tooltip appears
- [ ] Click Next (⏭️) - Should skip to next track in shuffle order
- [ ] Hover over Volume (🔊) - Volume slider appears
- [ ] Adjust volume - Sound gets louder/quieter
- [ ] Click Pause (⏸️) - Music pauses
- [ ] Click Play (▶️) - Music resumes
- [ ] Navigate to Quiz page - Audio player persists and continues
- [ ] Refresh page - Shuffle order changes, autoplay starts
- [ ] Play a video in quiz - Audio auto-mutes (when implemented)

## 🎼 Your Playlist (15 tracks)

1. Bas & Q op Avontuur.mp3
2. Bas & Q op Avontuur (1).mp3
3. Bas & Q op Avontuur (2).mp3
4. Bas & Q, tot aan de horizon.mp3
5. Bas & Q, tot aan de horizon (1).mp3
6. Bas, Q en Loe.mp3
7. Bas, Q en Loe (1).mp3
8. Bas, Q en Loe (2).mp3
9. Bas, Q en Loe (3).mp3
10. Bas, Q en Loe (4).mp3
11. Bas, Q en Loe (5).mp3
12. Bas, Q en Loe (6).mp3
13. Bas, Q en Loe (7).mp3
14. Quirien & Bas, Wat Een Leven.mp3
15. Quirien & Bas, Wat Een Leven (1).mp3

## 🔧 Troubleshooting

### Autoplay Not Working?
1. **Browser autoplay policy** - Some browsers block autoplay until user interacts with page
   - Solution: Click anywhere on the page, then music should start
   - After first interaction, autoplay will work on page refreshes
2. **Check browser console** (F12) for errors
3. **Check audio enabled** - Music icon in player should be highlighted

### Shuffle Not Working?
1. **Open browser console** (F12)
2. **Check localStorage**: Type `localStorage.getItem('quizrine_audio_shuffle')` - should return `"true"`
3. **Listen to track order** - Should not be sequential (1→2→3)
4. **Refresh page** - New shuffle order should be generated

### No Sound?
1. **Check browser console** (F12) for errors
2. **Check volume** - Both in app and system volume
3. **Try clicking Play** - Browser autoplay policies require user interaction
4. **Check file paths** - Audio files must be in `public/audio/` folder

### Audio Player Not Showing?
1. **Check config** - `audioSettings.enabled` should be `true`
2. **Refresh page** - Clear cache (Ctrl+Shift+R)
3. **Check console** - Look for JavaScript errors

### Track Not Changing?
1. **Check playlist** - All file paths should be correct in [config.js](src/config.js)
2. **Wait for current track to load** - May take a moment for large files
3. **Check browser compatibility** - Ensure browser supports MP3 playback

## 📁 File Locations

- **Audio Files**: `public/audio/*.mp3`
- **Config**: [src/config.js](src/config.js) (audioSettings section)
- **Audio Hook**: [src/hooks/useAudio.js](src/hooks/useAudio.js)
- **Audio Player**: [src/components/common/AudioPlayer.jsx](src/components/common/AudioPlayer.jsx)

## 🎨 Features Implemented

✅ **Playlist Management** - Automatically cycles through 15 tracks
✅ **Shuffle Mode** - Randomizes playlist on initialization (enabled by default)
✅ **Auto-Play** - Music starts automatically on page load (respects browser policies)
✅ **Play/Pause Control** - Toggle playback
✅ **Next Track** - Skip to next song in shuffle order
✅ **Volume Control** - Adjustable 0-100%
✅ **Track Info** - Hover tooltip shows current song
✅ **Persistent State** - Volume, enabled state, and shuffle preference saved in localStorage
✅ **Cross-Page** - Audio continues when navigating between pages
✅ **Auto-Mute on Video** - Ready to mute when quiz videos play

## 🚀 Browser Autoplay Notes

Modern browsers (Chrome, Firefox, Safari) have autoplay policies:

### Chrome/Edge
- **First visit**: Autoplay may be blocked until user clicks anywhere on page
- **After interaction**: Autoplay works on subsequent page loads
- **Check policy**: chrome://media-engagement (shows sites allowed to autoplay)

### Firefox
- **Default**: Blocks autoplay with audio
- **After interaction**: Allows autoplay
- **User override**: about:preferences → search "autoplay"

### Safari
- **Strict policy**: Usually blocks autoplay
- **After interaction**: Allows autoplay
- **Per-site settings**: Safari → Preferences → Websites → Auto-Play

### Workaround
The app handles this gracefully:
1. Attempts autoplay on page load
2. If blocked, waits for user to click Play button
3. After first interaction, autoplay works on future visits

## 💡 Configuration

All audio settings are in [src/config.js](src/config.js):

```javascript
audioSettings: {
  enabled: true,        // Show audio player
  autoPlay: true,       // Auto-start on page load
  shuffle: true,        // Randomize playlist
  muteOnVideo: true,    // Mute when videos play
  volume: 0.6,          // Default volume (60%)
  playlist: [...]       // List of MP3 files
}
```

## 🎉 Enjoy!

Your personalized wedding quiz music is now:
- **Automatically playing** on page load
- **Shuffled** for variety
- **Persistent** across pages
- **Controllable** with easy-to-use player

Guests will enjoy the adventure-themed soundtrack as they explore Quirine & Bas's story! 🎵⛵
