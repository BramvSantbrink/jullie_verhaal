import { useState, useEffect, useCallback } from 'react';
import { config } from '../config';

const AUTH_KEY = 'quizrine_authenticated';
const ATTEMPTS_KEY = 'quizrine_auth_attempts';
const LOCKOUT_KEY = 'quizrine_auth_lockout';

/**
 * Hook for managing password authentication for the upload page
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { maxPasswordAttempts, passwordCooldownMinutes } = config.constraints;

  // Initialize state from storage
  useEffect(() => {
    const storedAuth = sessionStorage.getItem(AUTH_KEY);
    const storedAttempts = parseInt(localStorage.getItem(ATTEMPTS_KEY) || '0', 10);
    const storedLockout = localStorage.getItem(LOCKOUT_KEY);

    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }

    setAttempts(storedAttempts);

    if (storedLockout) {
      const lockoutTime = parseInt(storedLockout, 10);
      if (lockoutTime > Date.now()) {
        setLockoutUntil(lockoutTime);
      } else {
        // Lockout expired, clear it
        localStorage.removeItem(LOCKOUT_KEY);
        localStorage.removeItem(ATTEMPTS_KEY);
        setAttempts(0);
      }
    }

    setIsLoading(false);
  }, []);

  // Check if currently locked out
  const isLockedOut = lockoutUntil && lockoutUntil > Date.now();

  // Get remaining lockout time in seconds
  const getRemainingLockoutTime = useCallback(() => {
    if (!lockoutUntil) return 0;
    const remaining = Math.max(0, lockoutUntil - Date.now());
    return Math.ceil(remaining / 1000);
  }, [lockoutUntil]);

  // Verify password
  const verifyPassword = useCallback((password) => {
    // Check if locked out
    if (isLockedOut) {
      return { success: false, error: 'Too many attempts. Please wait.' };
    }

    const correctPassword = import.meta.env.VITE_UPLOAD_PASSWORD;

    if (!correctPassword) {
      console.error('VITE_UPLOAD_PASSWORD not set in environment');
      return { success: false, error: 'Configuration error. Please contact the admin.' };
    }

    if (password === correctPassword) {
      // Success - authenticate and clear attempts
      sessionStorage.setItem(AUTH_KEY, 'true');
      localStorage.removeItem(ATTEMPTS_KEY);
      localStorage.removeItem(LOCKOUT_KEY);
      setIsAuthenticated(true);
      setAttempts(0);
      setLockoutUntil(null);
      return { success: true };
    }

    // Failed attempt
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    localStorage.setItem(ATTEMPTS_KEY, String(newAttempts));

    if (newAttempts >= maxPasswordAttempts) {
      // Lock out the user
      const lockoutTime = Date.now() + (passwordCooldownMinutes * 60 * 1000);
      setLockoutUntil(lockoutTime);
      localStorage.setItem(LOCKOUT_KEY, String(lockoutTime));
      return {
        success: false,
        error: `Too many attempts. Please wait ${passwordCooldownMinutes} minutes.`,
        isLockedOut: true
      };
    }

    const remaining = maxPasswordAttempts - newAttempts;
    return {
      success: false,
      error: `Incorrect password. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
    };
  }, [attempts, isLockedOut, maxPasswordAttempts, passwordCooldownMinutes]);

  // Logout function
  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    isLockedOut,
    attempts,
    remainingAttempts: maxPasswordAttempts - attempts,
    getRemainingLockoutTime,
    verifyPassword,
    logout
  };
}
