import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { config } from '../../config';

export function CTAButtons() {
  const { texts } = config;

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
      <Link to="/quiz">
        <Button size="lg" className="w-full sm:w-auto min-w-[200px]">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {texts.welcome.playQuiz}
        </Button>
      </Link>
      <Link to="/upload">
        <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px]">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {texts.welcome.submitQuestion}
        </Button>
      </Link>
    </div>
  );
}
