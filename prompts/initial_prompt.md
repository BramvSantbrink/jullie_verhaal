Wedding Quiz App - Requirements Document
Project Overview
Build a wedding quiz web application for a newly married couple. The app allows friends and family to upload quiz questions with video clips, and wedding guests can play the quiz during/after the wedding reception.
Technical Stack

Frontend Framework: React with Tailwind CSS
Backend/Database: Supabase (PostgreSQL database + file storage)
Hosting: Vercel (static site deployment)
Video Format: MP4, max 30 seconds, max 10MB per file
Authentication: Simple password protection (no user accounts needed)

Application Structure
Three Main Pages:

Quiz Player Page (/quiz or /)

Public-facing, no authentication required
Displays questions one at a time
Shows associated video clip for each question
Multiple choice answers (4 options per question)
Score tracking throughout the quiz
Results page at the end showing final score


Upload/Admin Page (/upload or /admin)

Password-protected access
Form to submit new quiz questions
Fields required:

Question text (max 200 characters)
Category/tag (dropdown: "How We Met", "Family Stories", "Funny Moments", "Predictions", "Other")
Video clip upload (must validate: MP4 format, max 30 seconds, max 10MB)
4 answer options (text inputs)
Correct answer indicator (radio button or dropdown)
Optional: Difficulty level (Easy/Medium/Hard)


Shows list of all submitted questions (admin view)
Ability to delete questions if needed


Landing/Welcome Page (optional /welcome)

Customized for the couple (names, wedding date, photo)
Brief instructions
Two call-to-action buttons:

"Play Quiz" → directs to quiz player
"Submit a Question" → directs to upload page





Detailed Feature Requirements
Quiz Player Functionality

Load all questions from Supabase on page load
Shuffle questions randomly (or allow option to sort by category)
Display one question at a time with:

Question number (e.g., "Question 5 of 23")
Category tag displayed prominently
Video player (autoplay when question loads, with controls)
Four clickable answer buttons
"Next" button (only enabled after answer selection)


Immediate feedback when answer is selected:

Highlight correct answer in green
Highlight selected wrong answer in red (if applicable)
Show brief explanation or fun fact (optional field in database)


Score counter visible throughout quiz
Progress bar showing completion percentage
Final results page:

Total score (X out of Y correct)
Percentage score
Fun message based on score ranges
"Play Again" button



Upload Page Functionality

Simple password entry modal/page before accessing form
Password stored as environment variable (not hardcoded)
Form validation:

All required fields must be filled
Video file type validation (only MP4)
Video duration validation (max 30 seconds) - check before upload
Video file size validation (max 10MB)
At least 2 answer options required, exactly 1 correct answer


Upload progress indicator for video files
Success/error messages after submission
Admin view showing:

Table of all submitted questions
Question text, category, submitter name (optional field), timestamp
Delete button for each question
Video preview thumbnail



Database Schema (Supabase)
Table: quiz_questions
id: UUID (primary key, auto-generated)
question_text: TEXT (required, max 200 chars)
category: TEXT (required)
answer_option_1: TEXT (required)
answer_option_2: TEXT (required)
answer_option_3: TEXT (required)
answer_option_4: TEXT (required)
correct_answer: INTEGER (1-4, required)
difficulty: TEXT (optional: "Easy", "Medium", "Hard")
explanation: TEXT (optional, max 300 chars)
video_url: TEXT (required, Supabase storage URL)
submitter_name: TEXT (optional)
created_at: TIMESTAMP (auto-generated)
Supabase Storage Bucket: quiz-videos

Public read access
Organized by question ID or timestamp
File naming convention: {questionId}_{timestamp}.mp4

Customization Requirements
Branding/Theming

Couple's names displayed prominently on all pages
Wedding date displayed on welcome page
Color scheme: Customizable via Tailwind config (suggest elegant wedding colors: soft gold, sage green, cream)
Option to upload couple's photo for welcome page hero image
Custom fonts: Elegant serif for headings (e.g., Playfair Display), clean sans-serif for body

Configuration File
Create a config.js file with easily editable values:
javascript{
  coupleName: "Sarah & James",
  weddingDate: "June 15, 2024",
  welcomeMessage: "Test your knowledge about our love story!",
  categories: ["How We Met", "Family Stories", "Funny Moments", "Predictions", "Other"],
  quizSettings: {
    shuffleQuestions: true,
    showCategoryFilter: false,
    allowRetakes: true
  }
}
User Experience Requirements
Responsive Design

Mobile-first approach (most wedding guests will use phones)
Video player must work well on mobile devices
Touch-friendly buttons and controls
Optimized for screens 320px - 1920px wide

Performance

Lazy load videos (only load current question's video)
Compress videos on upload if possible (or provide compression guidelines)
Fast page loads (< 3 seconds on 4G)
Progress indicators for all loading states

Accessibility

Proper ARIA labels for form inputs
Keyboard navigation support
Video captions/subtitles support (optional field in upload form)
High contrast mode compatibility
Screen reader friendly

Error Handling

Graceful handling of failed video uploads (show clear error message)
Network error handling (show retry option)
Empty quiz state (if no questions uploaded yet, show friendly message)
Invalid password attempts (limit to 3 tries, show cooldown)
Supabase connection errors (fallback UI)

Security Requirements

Environment variables for:

Supabase URL and anon key
Upload page password


Input sanitization for all text fields (prevent XSS)
File type validation on both client and server side
Rate limiting on uploads (prevent spam)
CORS configuration for Supabase

Deployment Requirements

Environment-specific configs (development vs. production)
Vercel deployment configuration file
Environment variables setup guide
Supabase project setup instructions
Post-deployment testing checklist

Documentation Needed

README.md with:

Project setup instructions
Environment variables configuration
Supabase setup steps (with SQL schema)
Deployment guide
Customization guide (how to change couple names, colors, etc.)


User Guide (simple markdown file):

How to upload questions (for friends/family)
How to play the quiz (for wedding guests)
Troubleshooting common issues



Optional Enhancements (Nice to Have)

Timer per question (configurable)
Leaderboard (store top 10 scores with names)
Social sharing (share your score on social media)
Export quiz results as PDF
Multiple quiz modes (easy/medium/hard filtered)
Question reporting (flag inappropriate content)

Constraints

Maximum 100 questions total
Maximum 100 video clips (1GB total storage limit)
Free tier hosting (Vercel + Supabase free tiers)
No user authentication system needed (just simple password for uploads)
Must work on modern browsers (Chrome, Safari, Firefox, Edge - last 2 versions)

Success Criteria

Friends/family can easily upload questions without technical knowledge
Wedding guests can play quiz smoothly on mobile devices
All 100 questions can be uploaded and played without hitting storage limits
App works reliably during wedding reception (offline fallback not required, but good error handling)
Couple can customize branding in under 10 minutes


Start with: Build the database schema and Supabase configuration first, then the upload page (so we can test data flow), then the quiz player page, and finally the welcome landing page.