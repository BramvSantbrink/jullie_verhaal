import { LoadingSpinner } from './LoadingSpinner';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  onClick,
  icon: Icon,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95';

  const variantClasses = {
    primary: 'bg-adventure-coral text-white hover:bg-adventure-coral/90 focus:ring-adventure-coral shadow-lg hover:shadow-xl',
    secondary: 'bg-adventure-teal text-white hover:bg-adventure-teal/90 focus:ring-adventure-teal shadow-lg hover:shadow-xl',
    outline: 'border-2 border-adventure-coral text-adventure-coral hover:bg-adventure-coral hover:text-white focus:ring-adventure-coral',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-lg',
    ghost: 'text-text-secondary hover:bg-adventure-coral/10 hover:text-adventure-coral focus:ring-adventure-coral'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2'
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" />}
      {Icon && !loading && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}
