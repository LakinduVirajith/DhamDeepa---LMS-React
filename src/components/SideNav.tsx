import { NavLink } from 'react-router-dom';
import {
  Menu,
  UserCheck,
  UserPlus,
  Award,
  ClipboardList,
  Shield,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { USER_ROLES } from '@/constants/enums';
import { UserButton, useUser } from '@clerk/react';

interface SideNavProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

interface MenuChild {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  icon: any;
  children: MenuChild[];
  roles: string[]; // allowed roles
}

export default function SideNav({ collapsed, setCollapsed }: SideNavProps) {
  const { user, isLoaded } = useUser();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Handle responsive collapse
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isLoaded || !user) return null;

  const role = (user?.publicMetadata?.role as string) ?? '';

  // Define menu items with allowed roles
  const menuItems: MenuItem[] = [
    {
      name: 'System',
      icon: Shield,
      roles: [USER_ROLES.ADMIN],
      children: [
        { name: 'User Management', path: 'admin/users' },
        { name: 'Access Control', path: 'admin/access' },
      ],
    },
    {
      name: 'Teachers',
      icon: UserCheck,
      roles: [USER_ROLES.ADMIN],
      children: [
        { name: 'View Teachers', path: '/admin/teachers/view' },
        { name: 'Create Teacher', path: '/admin/teachers/create' },
      ],
    },
    {
      name: 'Students',
      icon: UserPlus,
      roles: [USER_ROLES.ADMIN],
      children: [{ name: 'View Students', path: '/admin/teachers/view' }],
    },
    {
      name: 'Competitions',
      icon: Award,
      roles: [USER_ROLES.ADMIN],
      children: [
        { name: 'View Competitions', path: '/teachers/competitions/view' },
      ],
    },
    {
      name: 'Students',
      icon: UserPlus,
      roles: [USER_ROLES.TEACHER],
      children: [
        { name: 'View Students', path: '/teachers/students/view' },
        { name: 'Create Student', path: '/teachers/students/create' },
      ],
    },
    {
      name: 'Competitions',
      icon: Award,
      roles: [USER_ROLES.TEACHER],
      children: [
        { name: 'View Competitions', path: '/teachers/competitions/view' },
        { name: 'Create Competition', path: '/teachers/competitions/create' },
        { name: 'Manage Participants', path: '/competitions/parefects' },
      ],
    },
    {
      name: 'Prefects',
      icon: ClipboardList,
      roles: [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
      children: [
        { name: 'View Prefects', path: '/users/prefects/view' },
        { name: 'Create Prefects', path: '/users/prefects/create' },
      ],
    },
    {
      name: 'Competitions',
      icon: Award,
      roles: [USER_ROLES.PREFECT],
      children: [
        { name: 'Manage Participants', path: '/competitions/parefects' },
      ],
    },
  ];

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } h-screen bg-slate-900 text-white flex flex-col border-r fixed left-0 top-0 transition-all duration-300`}
    >
      {/* HEADER */}
      <div className="px-4 py-4 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && (
          <div>
            <h2 className="text-xl font-bold tracking-wide">DhamDeepa</h2>
            <p className="text-sm text-slate-400">
              {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()} Panel
            </p>
          </div>
        )}
        <button
          className="p-1 hover:bg-slate-800 rounded-md"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {menuItems
          .filter((item) => item.roles.includes(role))
          .map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name}>
                {/* Parent Menu */}
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === item.name ? null : item.name)
                  }
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition ${
                    collapsed ? 'justify-center' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    {!collapsed && (
                      <span className="font-medium">{item.name}</span>
                    )}
                  </div>

                  {!collapsed && (
                    <span className="text-xs">
                      {openMenu === item.name ? '-' : '+'}
                    </span>
                  )}
                </button>

                {/* Sub Routes */}
                {openMenu === item.name && !collapsed && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-sm transition ${
                            isActive
                              ? 'bg-indigo-600 text-white'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          }`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </nav>

      {/* FOOTER */}
      <div className="border-t border-slate-700 p-3">
        <div className="flex items-center gap-3">
          {/* Clerk Avatar */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-9 h-9',
              },
            }}
          />

          {/* User Info (only when expanded) */}
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">
                {user?.fullName || 'User'}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          )}
        </div>

        {/* App Footer Text */}
        {!collapsed && (
          <p className="mt-3 text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} DhamDeepa
          </p>
        )}
      </div>
    </aside>
  );
}
