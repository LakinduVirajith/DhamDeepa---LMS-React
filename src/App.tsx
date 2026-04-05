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
import AllTeachersPage from './pages/dashboard/admin/AllTeachersPage';
import AdminTeacherProfilePage from './pages/dashboard/admin/AdminTeacherProfilePage';
import TeacherProfilePage from './pages/dashboard/teacher/TeacherProfilePage';

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

      {/* PRIVATE LAYOUT - ADMIN */}
      <Route path="/dashboard/admin" element={<DashboardLayout />}>
        <Route index element={<UserManagementPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="access" element={<AccessControlPage />} />
        <Route path="teachers/all" element={<AllTeachersPage />} />
        <Route path="teachers/profile" element={<AdminTeacherProfilePage />} />
      </Route>

      {/* PRIVATE LAYOUT - TEACHER */}
      <Route path="/dashboard/teachers" element={<DashboardLayout />}>
        <Route index element={<TeacherProfilePage />} />
        <Route path="profile" element={<TeacherProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
