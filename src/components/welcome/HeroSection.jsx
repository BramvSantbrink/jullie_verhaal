import { config } from '../../config';
import { Dog, Sailboat, Mountain, ChefHat, Globe, Heart } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="text-center">
      {/* Couple Photo with Adventure Icons */}
      <div className="mb-8 relative">
        <div className="w-40 h-40 md:w-52 md:h-52 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl animate-gentleBounce">
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
            className="w-full h-full bg-gradient-to-br from-adventure-coral to-adventure-teal hidden items-center justify-center"
          >
            <span className="text-white text-4xl md:text-5xl font-display font-semibold">
              {config.coupleName.split('&').map(name => name.trim()[0]).join('&')}
            </span>
          </div>
        </div>

        {/* Floating Adventure Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Dog className="absolute top-0 left-0 w-8 h-8 text-adventure-coral animate-gentleBounce" style={{ animationDelay: '0s' }} />
          <Sailboat className="absolute top-0 right-0 w-8 h-8 text-adventure-teal animate-boatSail" />
          <Mountain className="absolute bottom-0 left-0 w-8 h-8 text-adventure-navy animate-gentleBounce" style={{ animationDelay: '0.3s' }} />
          <ChefHat className="absolute bottom-0 right-0 w-8 h-8 text-adventure-chocolate animate-gentleBounce" style={{ animationDelay: '0.6s' }} />
          <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -ml-24 w-8 h-8 text-adventure-gold animate-sparkle" />
        </div>
      </div>

      {/* Couple Names */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-3">
        {config.coupleName}
      </h1>

      {/* Wedding Date */}
      <p className="text-lg md:text-xl text-adventure-coral font-semibold mb-6">
        {config.weddingDate}
      </p>

      {/* Decorative line with heart */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-adventure-coral" />
        <Heart className="w-6 h-6 text-adventure-coral fill-adventure-coral animate-pulse" />
        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-adventure-coral" />
      </div>

      {/* Welcome Message */}
      <p className="text-xl md:text-2xl text-text-primary font-body font-light max-w-md mx-auto">
        {config.welcomeMessage}
      </p>
    </div>
  );
}
