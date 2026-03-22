import SideNav from '@/components/SideNav';
import { USER_ROLES, type UserRole } from '@/constants/enums';
import { useUser } from '@clerk/react';
import { useEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

export default function DashboardLayout() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const role = (user?.publicMetadata?.role as string) || '';

      const isValidRole = (r: string): r is UserRole =>
        Object.values(USER_ROLES).includes(r as UserRole);

      if (!role || !isValidRole(role)) {
        navigate('/home');
      }
    }
  }, [user, isLoaded]);

  if (!isLoaded || !user) return null;
  return (
    <section className="min-h-screen flex flex-row">
      <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={`flex-1 p-8 overflow-y-auto min-h-screen bg-gray-50 transition-all duration-300`}
        style={{ marginLeft: collapsed ? '4rem' : '16rem' }}
      >
        <Outlet />
      </main>
    </section>
  );
}
