import { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { config } from '../../config';

export function PasswordModal({ onSuccess, auth }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const { texts } = config;

  const { isLockedOut, remainingAttempts, getRemainingLockoutTime, verifyPassword } = auth;

  // Update lockout timer
  useEffect(() => {
    if (!isLockedOut) return;

    const updateTimer = () => {
      const time = getRemainingLockoutTime();
      setRemainingTime(time);
      if (time <= 0) {
        window.location.reload();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isLockedOut, getRemainingLockoutTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError(texts.upload.password + ' is verplicht');
      return;
    }

    const result = verifyPassword(password);
    if (result.success) {
      onSuccess();
    } else {
      setError(texts.upload.incorrectPassword);
      setPassword('');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-wedding-cream-light p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-wedding-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-wedding-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-semibold text-gray-800">{texts.upload.adminAccess}</h1>
          <p className="text-gray-600 mt-2">{texts.upload.enterPassword}</p>
        </div>

        {isLockedOut ? (
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600 font-medium">{texts.upload.tooManyAttempts}</p>
              <p className="text-red-500 text-sm mt-1">{texts.upload.pleaseWait}</p>
            </div>
            <div className="text-4xl font-mono text-gray-800 mb-2">
              {formatTime(remainingTime)}
            </div>
            <p className="text-gray-500 text-sm">{texts.upload.timeRemaining}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {texts.upload.password}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold transition-colors"
                placeholder={texts.upload.enterPassword}
                autoFocus
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg">
              {texts.upload.enter}
            </Button>

            {remainingAttempts < 3 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                {remainingAttempts} {texts.upload.attemptsRemaining}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
