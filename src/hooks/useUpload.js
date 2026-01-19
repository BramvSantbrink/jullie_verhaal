import { useState, useCallback } from 'react';
import { uploadVideo, createQuestion, deleteVideo } from '../lib/supabase';
import { sanitizeObject } from '../lib/sanitize';
import { validateVideoFile, validateQuestionForm } from '../lib/validators';

/**
 * Hook for managing video upload and question creation
 */
export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  /**
   * Upload a question with its optional video
   * @param {Object} formData - The form data
   * @param {File|null} videoFile - The video file (optional)
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
   */
  const uploadQuestion = useCallback(async (formData, videoFile) => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Validate video file (if provided)
      if (videoFile) {
        const videoValidation = await validateVideoFile(videoFile);
        if (!videoValidation.isValid) {
          throw new Error(videoValidation.errors.join('. '));
        }
      }

      // Validate form data
      const formValidation = validateQuestionForm(formData);
      if (!formValidation.isValid) {
        throw new Error(formValidation.errors.join('. '));
      }

      setUploadProgress(10);

      let videoUrl = null;

      // Upload video if provided
      if (videoFile) {
        // Generate unique filename with original extension
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 8);
        const originalExt = videoFile.name.split('.').pop().toLowerCase() || 'mp4';
        const fileName = `${timestamp}_${randomId}.${originalExt}`;

        setUploadProgress(20);
        videoUrl = await uploadVideo(videoFile, fileName);
        setUploadProgress(70);
      } else {
        setUploadProgress(70);
      }

      // Sanitize form data
      const sanitizedData = sanitizeObject({
        questionText: formData.questionText,
        answer1: formData.answer1,
        answer2: formData.answer2,
        answer3: formData.answer3,
        answer4: formData.answer4,
        explanation: formData.explanation || '',
        submitterName: formData.submitterName || ''
      });

      // Create question record
      const questionData = {
        question_text: sanitizedData.questionText,
        answer_option_1: sanitizedData.answer1,
        answer_option_2: sanitizedData.answer2,
        answer_option_3: sanitizedData.answer3,
        answer_option_4: sanitizedData.answer4,
        correct_answer: parseInt(formData.correctAnswer, 10),
        explanation: sanitizedData.explanation || null,
        explanation_timing: formData.explanationTiming || 'after',
        video_url: videoUrl,
        video_position: formData.videoPosition || 'before',
        submitter_name: sanitizedData.submitterName || null
      };

      setUploadProgress(85);
      const data = await createQuestion(questionData);
      setUploadProgress(100);

      return { success: true, data };
    } catch (err) {
      const errorMessage = err.message || 'Failed to upload question';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsUploading(false);
    }
  }, []);

  /**
   * Reset the upload state
   */
  const resetUpload = useCallback(() => {
    setIsUploading(false);
    setUploadProgress(0);
    setError(null);
  }, []);

  return {
    isUploading,
    uploadProgress,
    error,
    uploadQuestion,
    resetUpload
  };
}

/**
 * Hook for managing question deletion
 */
export function useDeleteQuestion() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteQuestionWithVideo = useCallback(async (question) => {
    setIsDeleting(true);
    setError(null);

    try {
      // Extract file path from video URL if video exists
      const videoUrl = question.video_url;
      if (videoUrl) {
        const urlParts = videoUrl.split('/quiz-videos/');
        const filePath = urlParts.length > 1 ? urlParts[1] : null;

        // Delete video from storage if we can extract the path
        if (filePath) {
          try {
            await deleteVideo(filePath);
          } catch {
            // Continue even if video deletion fails
            console.warn('Failed to delete video file:', filePath);
          }
        }
      }

      // Delete question from database
      const { deleteQuestion } = await import('../lib/supabase');
      await deleteQuestion(question.id);

      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete question';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return {
    isDeleting,
    error,
    deleteQuestionWithVideo
  };
}
