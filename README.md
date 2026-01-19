# Wedding Quiz App

A web application for wedding quizzes where friends and family can upload quiz questions with video clips, and wedding guests can play the quiz during/after the wedding reception.

## Features

- **Welcome Page**: Customizable landing page with couple info and navigation
- **Quiz Player**: Play through video-based quiz questions with immediate feedback
- **Upload Page**: Password-protected admin area to upload questions and manage content
- **Mobile-First**: Responsive design optimized for mobile devices
- **Video Support**: Upload and play MP4 video clips (max 30 seconds, 10MB)

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL + Storage)
- **Hosting**: Vercel

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd quizrine
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase/schema.sql`
3. Create a storage bucket named `quiz-videos` (make it public)
4. Copy your project URL and API key from **Settings > API > Project API keys**:
   - **New projects**: Use the "Publishable" key (starts with `sb_publishable_...`)
   - **Legacy projects**: Use the "anon" key (JWT format)

### 3. Configure Environment

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
VITE_UPLOAD_PASSWORD=your-secure-password
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

## Customization

Edit `src/config.js` to customize:

- Couple names
- Wedding date
- Welcome message
- Quiz categories
- Score messages
- Various settings

## Project Structure

```
src/
├── components/
│   ├── common/         # Shared components (Button, VideoPlayer, etc.)
│   ├── quiz/           # Quiz-specific components
│   ├── upload/         # Upload page components
│   └── welcome/        # Welcome page components
├── hooks/              # Custom React hooks
├── lib/                # Utilities (Supabase, validation, sanitization)
├── pages/              # Page components
├── config.js           # App configuration
├── App.jsx             # Main app with routing
└── index.css           # Tailwind styles
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Build

```bash
npm run build
```

The built files will be in the `dist/` folder.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase publishable key (or legacy anon key) |
| `VITE_UPLOAD_PASSWORD` | Password for the upload/admin page |

## Pages

- `/` - Welcome/Landing page
- `/quiz` - Quiz player
- `/upload` - Upload questions (password protected)
- `/admin` - Redirects to `/upload`

## License

Private - for personal use
