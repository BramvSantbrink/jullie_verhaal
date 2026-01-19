import DOMPurify from 'dompurify';

/**
 * Sanitize text input, removing all HTML tags
 * Use for plain text fields like question text, answers, etc.
 */
export function sanitizeText(input) {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input.trim(), { ALLOWED_TAGS: [] });
}

/**
 * Sanitize HTML input, allowing safe tags
 * Use for rich text content if needed
 */
export function sanitizeHtml(input) {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input.trim());
}

/**
 * Sanitize an object's string properties
 * Useful for sanitizing form data before submission
 */
export function sanitizeObject(obj) {
  const sanitized = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeText(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}
