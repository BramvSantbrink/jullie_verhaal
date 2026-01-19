import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { config } from '../../config';
import { Compass, PlusCircle } from 'lucide-react';

export function CTAButtons() {
  const { texts } = config;

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
      <Link to="/quiz">
        <Button size="lg" icon={Compass} className="w-full sm:w-auto min-w-[200px] font-display">
          {texts.welcome.playQuiz}
        </Button>
      </Link>
      <Link to="/upload">
        <Button variant="secondary" size="lg" icon={PlusCircle} className="w-full sm:w-auto min-w-[200px] font-display">
          {texts.welcome.submitQuestion}
        </Button>
      </Link>
    </div>
  );
}
