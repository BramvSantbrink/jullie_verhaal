import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUpload } from '../hooks/useUpload';
import { PasswordModal } from '../components/upload/PasswordModal';
import { UploadForm } from '../components/upload/UploadForm';
import { QuestionList } from '../components/upload/QuestionList';
import { FullPageLoader } from '../components/common/LoadingSpinner';
import { config } from '../config';

export function UploadPage() {
  const auth = useAuth();
  const { isUploading, uploadProgress, error, uploadQuestion, resetUpload } = useUpload();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const { texts } = config;

  if (auth.isLoading) {
    return <FullPageLoader message={texts.quiz.loading} />;
  }

  if (!auth.isAuthenticated) {
    return <PasswordModal onSuccess={() => {}} auth={auth} />;
  }

  const handleSubmit = async (formData, videoFile) => {
    setSuccessMessage('');
    resetUpload();

    const result = await uploadQuestion(formData, videoFile);

    if (result.success) {
      setSuccessMessage(texts.upload.questionUploaded);
      setRefreshTrigger(prev => prev + 1);
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    }

    return result;
  };

  return (
    <div className="min-h-screen bg-wedding-cream-light">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-display font-semibold text-gray-800">
              {texts.upload.title}
            </h1>
            <p className="text-sm text-gray-500">{config.coupleName}'s {config.appName}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-wedding-gold hover:text-wedding-gold-dark text-sm font-medium"
            >
              {texts.upload.backToHome}
            </Link>
            <button
              onClick={auth.logout}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              {texts.upload.logout}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Form Section */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-display font-semibold text-gray-800 mb-6">
                {texts.upload.submitNewQuestion}
              </h2>
              <UploadForm
                onSubmit={handleSubmit}
                isUploading={isUploading}
                uploadProgress={uploadProgress}
                error={error}
              />
            </div>
          </div>

          {/* Questions List Section */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <QuestionList refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
