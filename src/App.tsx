import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './layouts/Layout';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import DashboardLayout from './layouts/DashboardLayout';
import NotFoundPage from './pages/NotFoundPage';
import UserManagementPage from './pages/dashboard/admin/UserManagementPage';
import AccessControlPage from './pages/dashboard/admin/AccessControlPage';

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

      {/* PRIVATE LAYOUT */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<UserManagementPage />} />
        <Route path="admin/users" element={<UserManagementPage />} />
        <Route path="admin/access" element={<AccessControlPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
