import { HeroSection } from '../components/welcome/HeroSection';
import { CTAButtons } from '../components/welcome/CTAButtons';
import { config } from '../config';
import AudioPlayer from '../components/common/AudioPlayer';
import { useAudio } from '../hooks/useAudio';

export function WelcomePage() {
  const audio = useAudio(config.audioSettings.playlist, config.audioSettings.autoPlay, config.audioSettings.shuffle);

  return (
    <div className="min-h-screen bg-gradient-to-b from-adventure-bg to-adventure-snow flex flex-col items-center justify-center p-6">
      {/* Decorative elements - Adventure themed */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-adventure-coral/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-adventure-teal/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-adventure-yellow/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-adventure-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full">
        <HeroSection />
        <CTAButtons />
      </div>

      {/* Audio Player */}
      {audio && <AudioPlayer audio={audio} />}

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-sm text-text-secondary font-body">
        {config.texts.welcome.footer}
      </footer>
    </div>
  );
}
