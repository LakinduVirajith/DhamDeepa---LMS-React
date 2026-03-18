import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './layouts/Layout';
import { Show } from '@clerk/react';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      {/* PUBLIC LAYOUT */}
      <Route path="" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="dashboard"
          element={
            <Show when="signed-in" fallback={<HomePage />}>
              <DashboardPage />
            </Show>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
