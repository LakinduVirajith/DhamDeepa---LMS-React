import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './layouts/Layout';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Routes>
      {/* PUBLIC LAYOUT */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
