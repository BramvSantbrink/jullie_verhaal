import { HeroSection } from '../components/welcome/HeroSection';
import { CTAButtons } from '../components/welcome/CTAButtons';
import { config } from '../config';

export function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-wedding-cream-light to-wedding-cream flex flex-col items-center justify-center p-6">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-wedding-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-wedding-sage/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-wedding-blush/10 rounded-full blur-2xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full">
        <HeroSection />
        <CTAButtons />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-sm text-gray-400">
        {config.texts.welcome.footer}
      </footer>
    </div>
  );
}
