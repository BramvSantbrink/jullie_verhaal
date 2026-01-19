# Audio Files

Place your MP3 audio files here for the background music playlist.

## Requirements

- **Format**: MP3
- **Naming**: Use the filenames specified in `src/config.js` under `audioSettings.playlist`
  - track1.mp3
  - track2.mp3
  - track3.mp3
  - track4.mp3
  - track5.mp3
  - track6.mp3
  - track7.mp3
  - track8.mp3
  - track9.mp3
  - track10.mp3

## Recommendations

- Keep file sizes reasonable (< 5MB per track for web performance)
- Use a consistent bitrate (128-192 kbps is sufficient for background music)
- Ensure proper loop points if tracks should loop seamlessly
- Wedding/adventure themed instrumental music works best

## Integration

These audio files will be played through the AudioPlayer component with:
- Automatic playlist cycling
- Volume control
- Play/pause toggle
- Auto-mute when quiz videos play
