import { config } from '../../config';

export function HeroSection() {
  return (
    <div className="text-center">
      {/* Couple Photo */}
      <div className="mb-8">
        <div className="w-40 h-40 md:w-52 md:h-52 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
          <img
            src={config.couplePhoto}
            alt={config.coupleName}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if photo doesn't load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div
            className="w-full h-full bg-gradient-to-br from-wedding-gold to-wedding-sage hidden items-center justify-center"
          >
            <span className="text-white text-4xl md:text-5xl font-display font-semibold">
              {config.coupleName.split('&').map(name => name.trim()[0]).join('&')}
            </span>
          </div>
        </div>
      </div>

      {/* Couple Names */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-800 mb-3">
        {config.coupleName}
      </h1>

      {/* Wedding Date */}
      <p className="text-lg md:text-xl text-wedding-gold font-medium mb-6">
        {config.weddingDate}
      </p>

      {/* Decorative line */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-12 h-0.5 bg-wedding-gold/30" />
        <svg className="w-6 h-6 text-wedding-gold" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <div className="w-12 h-0.5 bg-wedding-gold/30" />
      </div>

      {/* Welcome Message */}
      <p className="text-xl md:text-2xl text-gray-600 font-light max-w-md mx-auto">
        {config.welcomeMessage}
      </p>
    </div>
  );
}
