export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 border-wedding-gold/30 border-t-wedding-gold rounded-full animate-spin`}
      />
    </div>
  );
}

export function FullPageLoader({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-wedding-cream-light">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600 font-body">{message}</p>
    </div>
  );
}
