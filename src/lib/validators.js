import { config } from '../config';

/**
 * Validate a video file for format, size, and duration
 * @param {File} file - The video file to validate
 * @returns {Promise<{isValid: boolean, errors: string[]}>}
 */
export async function validateVideoFile(file) {
  const errors = [];
  const { maxVideoSizeMB, maxVideoDurationSeconds } = config.constraints;
  const { texts } = config;

  // Check if file exists
  if (!file) {
    return { isValid: true, errors: [] }; // Video is optional
  }

  // Check file type - accept common video formats from mobile devices
  const validTypes = [
    'video/mp4',
    'video/x-m4v',
    'video/quicktime', // iPhone .mov files
    'video/3gpp',      // Some Android phones
    'video/webm',      // WebM format
  ];

  // Also check file extension as fallback
  const validExtensions = ['.mp4', '.m4v', '.mov', '.webm', '.3gp'];
  const fileName = file.name.toLowerCase();
  const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

  if (!validTypes.includes(file.type) && !hasValidExtension) {
    errors.push(texts.validation.videoMp4Only);
  }

  // Check file size
  const maxSizeBytes = maxVideoSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    const currentSize = (file.size / 1024 / 1024).toFixed(1);
    errors.push(
      texts.validation.videoTooLarge
        .replace('{size}', maxVideoSizeMB)
        .replace('{current}', currentSize)
    );
  }

  // Check duration (requires loading video metadata)
  try {
    const duration = await getVideoDuration(file);
    if (duration > maxVideoDurationSeconds) {
      errors.push(
        texts.validation.videoTooLong
          .replace('{duration}', maxVideoDurationSeconds)
          .replace('{current}', Math.round(duration))
      );
    }
  } catch (err) {
    // Don't fail if we can't read duration - some formats may not support it
    console.warn('Could not read video duration:', err);
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Get the duration of a video file
 * @param {File} file - The video file
 * @returns {Promise<number>} - Duration in seconds
 */
function getVideoDuration(file) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    const timeout = setTimeout(() => {
      URL.revokeObjectURL(video.src);
      reject(new Error('Timeout loading video metadata'));
    }, 10000); // 10 second timeout

    video.onloadedmetadata = () => {
      clearTimeout(timeout);
      URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };

    video.onerror = () => {
      clearTimeout(timeout);
      URL.revokeObjectURL(video.src);
      reject(new Error('Failed to load video metadata'));
    };

    try {
      video.src = URL.createObjectURL(file);
    } catch (err) {
      clearTimeout(timeout);
      reject(err);
    }
  });
}

/**
 * Validate question text
 * @param {string} text - The question text
 * @returns {{isValid: boolean, error?: string, value?: string}}
 */
export function validateQuestionText(text) {
  const sanitized = (text || '').trim();
  const { maxQuestionTextLength } = config.constraints;
  const { texts } = config;

  if (!sanitized) {
    return { isValid: false, error: texts.validation.questionRequired };
  }

  if (sanitized.length > maxQuestionTextLength) {
    return {
      isValid: false,
      error: texts.validation.questionTooLong
        .replace('{max}', maxQuestionTextLength)
        .replace('{current}', sanitized.length)
    };
  }

  return { isValid: true, value: sanitized };
}

/**
 * Validate answer options
 * @param {string[]} answers - Array of 4 answer options
 * @param {number} correctIndex - The correct answer index (1-4)
 * @returns {{isValid: boolean, errors: string[]}}
 */
export function validateAnswers(answers, correctIndex) {
  const errors = [];
  const { texts } = config;

  // Check all 4 answers are provided
  for (let i = 0; i < 4; i++) {
    if (!answers[i] || !answers[i].trim()) {
      errors.push(texts.validation.answerRequired.replace('{num}', i + 1));
    }
  }

  // Check correct answer is valid
  if (!correctIndex || correctIndex < 1 || correctIndex > 4) {
    errors.push(texts.validation.selectCorrectAnswer);
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Validate explanation text
 * @param {string} text - The explanation text (optional)
 * @returns {{isValid: boolean, error?: string, value?: string}}
 */
export function validateExplanation(text) {
  if (!text) {
    return { isValid: true, value: '' };
  }

  const sanitized = text.trim();
  const { maxExplanationLength } = config.constraints;

  if (sanitized.length > maxExplanationLength) {
    return {
      isValid: false,
      error: `Uitleg moet korter zijn dan ${maxExplanationLength} tekens (huidige: ${sanitized.length})`
    };
  }

  return { isValid: true, value: sanitized };
}

/**
 * Validate the entire question form
 * @param {Object} formData - The form data
 * @returns {{isValid: boolean, errors: string[]}}
 */
export function validateQuestionForm(formData) {
  const errors = [];

  // Validate question text
  const questionResult = validateQuestionText(formData.questionText);
  if (!questionResult.isValid) {
    errors.push(questionResult.error);
  }

  // Validate answers
  const answers = [
    formData.answer1,
    formData.answer2,
    formData.answer3,
    formData.answer4
  ];
  const answersResult = validateAnswers(answers, formData.correctAnswer);
  errors.push(...answersResult.errors);

  // Validate explanation (optional)
  const explanationResult = validateExplanation(formData.explanation);
  if (!explanationResult.isValid) {
    errors.push(explanationResult.error);
  }

  return { isValid: errors.length === 0, errors };
}
