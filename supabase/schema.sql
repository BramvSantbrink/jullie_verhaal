-- Jullie Verhaal - Bruiloft Quiz App Database Schema
-- Voer dit uit in je Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create quiz_questions table
CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_text TEXT NOT NULL CHECK (char_length(question_text) <= 200),
    answer_option_1 TEXT NOT NULL,
    answer_option_2 TEXT NOT NULL,
    answer_option_3 TEXT NOT NULL,
    answer_option_4 TEXT NOT NULL,
    correct_answer INTEGER NOT NULL CHECK (correct_answer >= 1 AND correct_answer <= 4),
    explanation TEXT CHECK (char_length(explanation) <= 300),
    explanation_timing TEXT NOT NULL DEFAULT 'after' CHECK (explanation_timing IN ('before', 'after')),
    video_url TEXT,
    video_position TEXT DEFAULT 'before' CHECK (video_position IN ('before', 'after')),
    submitter_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for ordering by creation date
CREATE INDEX idx_quiz_questions_created_at ON quiz_questions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for quiz players)
CREATE POLICY "Allow public read access" ON quiz_questions
    FOR SELECT
    USING (true);

-- Allow public insert access (for upload form)
-- Note: Password protection is handled client-side
CREATE POLICY "Allow public insert access" ON quiz_questions
    FOR INSERT
    WITH CHECK (true);

-- Allow public delete access (for admin functionality)
-- Note: This is protected by the password on the client
CREATE POLICY "Allow public delete access" ON quiz_questions
    FOR DELETE
    USING (true);

-- ================================================
-- STORAGE BUCKET SETUP
-- ================================================
-- After running the above SQL, go to Storage in Supabase dashboard:
-- 1. Click "New Bucket"
-- 2. Name: quiz-videos
-- 3. Check "Public bucket"
-- 4. Click "Create bucket"
--
-- Then run the following policies in SQL Editor:

-- Allow public uploads to quiz-videos bucket
CREATE POLICY "Allow public uploads to quiz-videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'quiz-videos');

-- Allow public reads from quiz-videos bucket
CREATE POLICY "Allow public reads from quiz-videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'quiz-videos');

-- Allow public deletes from quiz-videos bucket
CREATE POLICY "Allow public deletes from quiz-videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'quiz-videos');

-- ================================================
-- MIGRATION: Als je een bestaande database hebt
-- ================================================
-- Voer dit uit om de tabel bij te werken:
--
-- Video optioneel maken:
-- ALTER TABLE quiz_questions ALTER COLUMN video_url DROP NOT NULL;
--
-- Video positie toevoegen:
-- ALTER TABLE quiz_questions ADD COLUMN IF NOT EXISTS video_position TEXT DEFAULT 'before' CHECK (video_position IN ('before', 'after'));
--
-- Uitleg timing toevoegen:
-- ALTER TABLE quiz_questions ADD COLUMN IF NOT EXISTS explanation_timing TEXT NOT NULL DEFAULT 'after' CHECK (explanation_timing IN ('before', 'after'));
--
-- Category en difficulty verwijderen (optioneel):
-- ALTER TABLE quiz_questions DROP COLUMN IF EXISTS category;
-- ALTER TABLE quiz_questions DROP COLUMN IF EXISTS difficulty;
