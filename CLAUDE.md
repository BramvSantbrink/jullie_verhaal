# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quizrine is a wedding quiz web application where friends and family can upload video-based quiz questions, and wedding guests can play the quiz. Built with React + Vite, Supabase backend, and deployed on Vercel.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Configure three required environment variables:
   - `VITE_SUPABASE_URL` - Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase publishable key (or legacy anon key)
   - `VITE_UPLOAD_PASSWORD` - Password for upload/admin page access

3. Set up Supabase:
   - Run [supabase/schema.sql](supabase/schema.sql) in Supabase SQL Editor
   - Create a public storage bucket named `quiz-videos`

## Architecture

### State Management Pattern

The app uses custom React hooks for state management instead of Redux/Context:

- **[src/hooks/useQuiz.js](src/hooks/useQuiz.js)** - Quiz game state (current question, score, answers, progression)
- **[src/hooks/useQuestions.js](src/hooks/useQuestions.js)** - Fetching and shuffling questions from Supabase
- **[src/hooks/useAuth.js](src/hooks/useAuth.js)** - Password authentication with rate limiting and lockout
- **[src/hooks/useUpload.js](src/hooks/useUpload.js)** - Form state and video upload logic
- **[src/hooks/useAudio.js](src/hooks/useAudio.js)** - Background music playback with shuffle, volume control, and persistent preferences

This pattern keeps state logic decoupled from UI components and makes it easy to reuse state management across different components.

### Configuration System

All app customization is centralized in [src/config.js](src/config.js):
- Couple information (names, wedding date)
- UI text translations (currently Dutch)
- Quiz behavior (shuffling, retakes)
- Audio settings (playlist, autoplay, shuffle, volume)
- Validation constraints (video size/duration limits)
- Score messages based on percentage thresholds
- Adventure theme elements (mascot, journey type, colors)

**Important**: When adding new features that require user-facing text, validation rules, or configurable behavior, add them to this config file rather than hardcoding them.

### Data Flow

1. **Quiz Flow**: [QuizPage.jsx](src/pages/QuizPage.jsx) → useQuestions (fetch) → useQuiz (game logic) → QuestionCard (display)
2. **Upload Flow**: [UploadPage.jsx](src/pages/UploadPage.jsx) → useAuth (password check) → useUpload (form + video) → Supabase
3. **Video Storage**: Files uploaded to Supabase storage → public URLs stored in database → VideoPlayer component renders
4. **Audio Flow**: useAudio hook → Audio element → AudioPlayer UI controls → persistent state in localStorage

### Supabase Integration

All Supabase operations are abstracted in [src/lib/supabase.js](src/lib/supabase.js):
- Helper functions: `fetchQuestions()`, `createQuestion()`, `deleteQuestion()`
- Storage helpers: `uploadVideo()`, `deleteVideo()`, `getVideoPublicUrl()`
- Direct `supabase` client export for custom queries

**Database Schema**:
- Single table: `quiz_questions`
- Storage bucket: `quiz-videos` (public)
- Row Level Security (RLS) enabled with public read/insert/delete policies (password protection is client-side)

### Security & Validation

- **Input Sanitization**: [src/lib/sanitize.js](src/lib/sanitize.js) uses DOMPurify to strip HTML tags from user input
- **Validation**: [src/lib/validators.js](src/lib/validators.js) validates question text, answers, video files (format, size, duration)
- **Authentication**: Client-side password check in useAuth hook with rate limiting (3 attempts, 5-minute lockout)
- **Video Validation**: Accepts MP4, MOV (iPhone), WebM, 3GP formats; checks file size and duration by loading metadata

### Routing

Simple React Router setup in [src/App.jsx](src/App.jsx):
- `/` - Landing page
- `/quiz` - Quiz player
- `/upload` - Password-protected admin upload page
- `/admin` - Redirects to `/upload`

## Key Design Patterns

1. **Modal Overlay System**: Videos and animations are displayed as modal overlays to keep everything visible within a single screen:
   - **[src/components/common/Modal.jsx](src/components/common/Modal.jsx)** - Reusable modal component with backdrop blur, escape key support, and optional close button
   - Videos hover over the question content based on `video_position` config
   - Couple animation displays as modal after answering
   - Prevents body scroll when modals are open
   - Smooth fade-in and scale-in animations for better UX

2. **Video and Animation Timing Flow**:
   - **Before answering**: If `video_position === 'before'`, video modal shows on question load
   - **After answering**:
     - If `video_position === 'after'`, video modal shows first
     - After video is closed (or if no video), animation modal appears
     - Animation auto-closes after 3 seconds via `onAnimationEnd` callback
   - **Explanations**: Can show "before" or "after" answering (controlled by `explanation_timing`)

3. **Question Shuffling**: Controlled by `config.quizSettings.shuffleQuestions` - uses Fisher-Yates algorithm in useQuestions hook.

4. **Component Organization**:
   - `components/common/` - Reusable UI components (Button, VideoPlayer, LoadingSpinner, Modal, AudioPlayer)
   - `components/quiz/` - Quiz-specific components (QuestionCard, CoupleAnimation, AnswerButton, ResultsCard)
   - `components/upload/` - Upload page specific components
   - `components/welcome/` - Landing page components

5. **Audio System**: Background music with shuffle and autoplay capabilities:
   - **[src/hooks/useAudio.js](src/hooks/useAudio.js)** manages playback state, playlist shuffling (Fisher-Yates algorithm), volume, and track progression
   - **[src/components/common/AudioPlayer.jsx](src/components/common/AudioPlayer.jsx)** provides fixed-position controls (play/pause, next, shuffle toggle, volume slider)
   - Audio state persists across pages and browser sessions via localStorage (volume, enabled state, shuffle preference)
   - Supports `muteOnVideo` config to auto-mute when quiz videos play
   - Playlist defined in `config.audioSettings.playlist` as array of `/audio/*.mp3` paths

6. **Persistent State**:
   - Authentication: `sessionStorage` for auth state (cleared on tab close), `localStorage` for rate limiting
   - Audio: `localStorage` for volume, enabled state, and shuffle preference

## Deployment

Configured for Vercel deployment via [vercel.json](vercel.json):
- SPA fallback routing (all routes → index.html)
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)

## Notes

- UI text is currently in Dutch - modify [src/config.js](src/config.js) `texts` object for translations
- Video upload max size/duration can be adjusted in `config.constraints`
- The app expects couple photos at `/person1.jpg` and `/person2.jpg` for stick figure animation heads
- Audio files should be placed in `public/audio/` directory and referenced in `config.audioSettings.playlist`
- Browser autoplay policies may block automatic playback until user interaction - the app handles this gracefully by allowing manual play
