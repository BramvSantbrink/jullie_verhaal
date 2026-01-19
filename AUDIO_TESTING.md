# Audio Testing Guide

Your wedding quiz app now has a fully functional audio player! Here's how to test it:

## ✅ Setup Complete

- **15 MP3 files** copied to `public/audio/` folder
- **Config updated** with all track paths
- **Audio player** with track info tooltip and controls

## 🎵 How to Test the Audio

### 1. Open the App
Navigate to: **http://localhost:5178** (or the port shown in your terminal)

### 2. Audio Player Location
Look for the **round audio controls in the bottom-right corner** of the screen.

### 3. Controls Available

| Button | Function | Description |
|--------|----------|-------------|
| 🎵 Music Icon | Enable/Disable | Toggle the entire audio system on/off |
| ▶️ Play | Play Music | Start playing the current track |
| ⏸️ Pause | Pause Music | Pause the current track |
| ⏭️ Next | Next Track | Skip to the next song in the playlist |
| 🔊 Volume | Volume Control | Hover to show volume slider (0-100%) |

### 4. Track Information
**Hover over the audio player** to see:
- Current track name
- Track number (e.g., "Track 3 of 15")

### 5. Testing Checklist

- [ ] Click the Music Icon (🎵) - Audio system should enable
- [ ] Click Play (▶️) - First track should start playing
- [ ] Hover over player - Track info tooltip should appear
- [ ] Click Next (⏭️) - Should skip to next track
- [ ] Hover over Volume (🔊) - Volume slider should appear
- [ ] Adjust volume - Sound should get louder/quieter
- [ ] Click Pause (⏸️) - Music should pause
- [ ] Navigate to Quiz page - Audio player should persist
- [ ] Play a video in quiz - Audio should auto-mute (when implemented)

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
1. **Check playlist** - All file paths should be correct in `config.js`
2. **Wait for current track to load** - May take a moment for large files
3. **Check browser compatibility** - Ensure browser supports MP3 playback

## 📁 File Locations

- **Audio Files**: `public/audio/*.mp3`
- **Config**: `src/config.js` (audioSettings section)
- **Audio Hook**: `src/hooks/useAudio.js`
- **Audio Player**: `src/components/common/AudioPlayer.jsx`

## 🎨 Features Implemented

✅ **Playlist Management** - Automatically cycles through 15 tracks
✅ **Play/Pause Control** - Toggle playback
✅ **Next Track** - Skip to next song
✅ **Volume Control** - Adjustable 0-100%
✅ **Track Info** - Hover tooltip shows current song
✅ **Persistent State** - Volume and enabled state saved in localStorage
✅ **Cross-Page** - Audio continues when navigating between pages
✅ **Auto-Mute on Video** - Ready to mute when quiz videos play

## 🚀 Browser Autoplay Notes

Modern browsers (Chrome, Firefox, Safari) block autoplay until user interacts with the page:
- **Expected**: Music won't start automatically on page load
- **Solution**: User must click the Play button to start music
- This is a browser security feature we cannot bypass

## 💡 Tips

- **Best Practice**: Let users discover and enable the audio player themselves
- **Volume**: Default is set to 60% for comfortable listening
- **Persistence**: User's preferences are saved across sessions
- **Performance**: Audio files are served from public folder for optimal performance

Enjoy your personalized wedding quiz music! 🎉🎵
