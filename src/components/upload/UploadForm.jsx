import { useState, useMemo } from 'react';
import { Button } from '../common/Button';
import { VideoUploader } from './VideoUploader';
import { QuestionPreview } from './QuestionPreview';
import { config } from '../../config';

const initialFormState = {
  questionText: '',
  answer1: '',
  answer2: '',
  answer3: '',
  answer4: '',
  correctAnswer: '',
  explanation: '',
  explanationTiming: 'after',
  videoPosition: 'before',
  submitterName: ''
};

export function UploadForm({ onSubmit, isUploading, uploadProgress, error }) {
  const [formData, setFormData] = useState(initialFormState);
  const [videoFile, setVideoFile] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const { texts, videoPositions, explanationTimings, constraints } = config;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors([]);

    // Basic validation
    const errors = [];
    if (!formData.questionText.trim()) errors.push(texts.validation.questionRequired);
    if (!formData.answer1.trim()) errors.push(texts.validation.answerRequired.replace('{num}', '1'));
    if (!formData.answer2.trim()) errors.push(texts.validation.answerRequired.replace('{num}', '2'));
    if (!formData.answer3.trim()) errors.push(texts.validation.answerRequired.replace('{num}', '3'));
    if (!formData.answer4.trim()) errors.push(texts.validation.answerRequired.replace('{num}', '4'));
    if (!formData.correctAnswer) errors.push(texts.validation.selectCorrectAnswer);

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    const result = await onSubmit(formData, videoFile);
    if (result.success) {
      // Reset form on success
      setFormData(initialFormState);
      setVideoFile(null);
      setShowPreview(false);
    }
  };

  // Check if we have enough data to show a meaningful preview
  const canShowPreview = useMemo(() => {
    return formData.questionText.trim() &&
           formData.answer1.trim() &&
           formData.answer2.trim() &&
           formData.answer3.trim() &&
           formData.answer4.trim();
  }, [formData]);

  // Create video URL for preview
  const videoPreviewUrl = useMemo(() => {
    if (videoFile) {
      return URL.createObjectURL(videoFile);
    }
    return null;
  }, [videoFile]);

  const allErrors = [...formErrors, ...(error ? [error] : [])];

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error display */}
        {allErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-800 font-medium mb-2">{texts.upload.fixErrors}</h3>
            <ul className="list-disc list-inside space-y-1">
              {allErrors.map((err, index) => (
                <li key={index} className="text-red-600 text-sm">{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Question Text */}
        <div>
          <label htmlFor="questionText" className="block text-sm font-medium text-gray-700 mb-1">
            {texts.upload.question} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="questionText"
            name="questionText"
            value={formData.questionText}
            onChange={handleChange}
            rows={3}
            maxLength={constraints.maxQuestionTextLength}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold resize-none"
            placeholder={texts.upload.questionPlaceholder}
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.questionText.length}/{constraints.maxQuestionTextLength} {texts.upload.characters}
          </p>
        </div>

        {/* Video Upload */}
        <VideoUploader
          onFileSelect={setVideoFile}
          selectedFile={videoFile}
        />

        {/* Video Position (only show if video is selected) */}
        {videoFile && (
          <div>
            <label htmlFor="videoPosition" className="block text-sm font-medium text-gray-700 mb-1">
              {texts.upload.videoPosition}
            </label>
            <p className="text-sm text-gray-500 mb-2">{texts.upload.videoPositionHelp}</p>
            <select
              id="videoPosition"
              name="videoPosition"
              value={formData.videoPosition}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold"
            >
              <option value="before">{videoPositions.before}</option>
              <option value="after">{videoPositions.after}</option>
            </select>
          </div>
        )}

        {/* Answer Options */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            {texts.upload.answerOptions} <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-500 -mt-3">{texts.upload.answerOptionsHelp}</p>

          {[1, 2, 3, 4].map(num => (
            <div key={num} className="flex items-center gap-3">
              <input
                type="radio"
                name="correctAnswer"
                value={num}
                checked={formData.correctAnswer === String(num)}
                onChange={handleChange}
                className="w-5 h-5 text-wedding-gold focus:ring-wedding-gold"
              />
              <input
                type="text"
                name={`answer${num}`}
                value={formData[`answer${num}`]}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold"
                placeholder={`${texts.upload.answerOption} ${num}`}
              />
              {formData.correctAnswer === String(num) && (
                <span className="text-wedding-sage text-sm font-medium">{texts.upload.correct}</span>
              )}
            </div>
          ))}
        </div>

        {/* Optional Fields */}
        <div className="border-t pt-6 space-y-4">
          <h3 className="text-sm font-medium text-gray-700">{texts.upload.optionalFields}</h3>

          {/* Explanation */}
          <div>
            <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">
              {texts.upload.explanation}
            </label>
            <textarea
              id="explanation"
              name="explanation"
              value={formData.explanation}
              onChange={handleChange}
              rows={2}
              maxLength={constraints.maxExplanationLength}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold resize-none"
              placeholder={texts.upload.explanationPlaceholder}
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.explanation.length}/{constraints.maxExplanationLength} {texts.upload.characters}
            </p>
          </div>

          {/* Explanation Timing (only show if explanation is entered) */}
          {formData.explanation && (
            <div>
              <label htmlFor="explanationTiming" className="block text-sm font-medium text-gray-700 mb-1">
                {texts.upload.explanationTiming}
              </label>
              <p className="text-sm text-gray-500 mb-2">{texts.upload.explanationTimingHelp}</p>
              <select
                id="explanationTiming"
                name="explanationTiming"
                value={formData.explanationTiming}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold"
              >
                <option value="after">{explanationTimings.after}</option>
                <option value="before">{explanationTimings.before}</option>
              </select>
            </div>
          )}

          {/* Submitter Name */}
          <div>
            <label htmlFor="submitterName" className="block text-sm font-medium text-gray-700 mb-1">
              {texts.upload.yourName}
            </label>
            <input
              type="text"
              id="submitterName"
              name="submitterName"
              value={formData.submitterName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold"
              placeholder={texts.upload.yourNamePlaceholder}
            />
          </div>
        </div>

        {/* Preview Toggle Button */}
        {canShowPreview && (
          <div className="border-t pt-4">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 text-wedding-gold hover:text-wedding-gold-dark font-medium text-sm transition-colors"
            >
              <svg
                className={`w-5 h-5 transition-transform ${showPreview ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {showPreview ? texts.upload.hidePreview : texts.upload.showPreview}
            </button>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          {isUploading && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <span>{texts.upload.uploading}</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-wedding-gold h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            loading={isUploading}
            disabled={isUploading}
          >
            {isUploading ? texts.upload.uploading : texts.upload.submitQuestion}
          </Button>
        </div>
      </form>

      {/* Preview Section */}
      {showPreview && canShowPreview && (
        <QuestionPreview
          formData={formData}
          videoUrl={videoPreviewUrl}
        />
      )}
    </div>
  );
}
