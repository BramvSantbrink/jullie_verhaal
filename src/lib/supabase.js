import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// Support both new publishable key and legacy anon key
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
  || import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);

// Storage bucket name for videos
export const VIDEO_BUCKET = 'quiz-videos';

// Helper function to get public URL for a video
export function getVideoPublicUrl(filePath) {
  const { data } = supabase.storage.from(VIDEO_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

// Helper function to upload a video
export async function uploadVideo(file, fileName) {
  const { data, error } = await supabase.storage
    .from(VIDEO_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw error;
  }

  return getVideoPublicUrl(data.path);
}

// Helper function to delete a video
export async function deleteVideo(filePath) {
  const { error } = await supabase.storage
    .from(VIDEO_BUCKET)
    .remove([filePath]);

  if (error) {
    throw error;
  }
}

// Helper function to fetch all questions
export async function fetchQuestions() {
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

// Helper function to create a question
export async function createQuestion(question) {
  const { data, error } = await supabase
    .from('quiz_questions')
    .insert([question])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Helper function to delete a question
export async function deleteQuestion(id) {
  const { error } = await supabase
    .from('quiz_questions')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}
