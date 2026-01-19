import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage';
import { QuizPage } from './pages/QuizPage';
import { UploadPage } from './pages/UploadPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Welcome page is the default landing */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />

        {/* Quiz player */}
        <Route path="/quiz" element={<QuizPage />} />

        {/* Upload/Admin page */}
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/admin" element={<Navigate to="/upload" replace />} />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
