import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './layouts/Layout';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  return (
    <Routes>
      {/* PUBLIC LAYOUT */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
