import { cn } from '@/lib/utils';
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
  useUser,
} from '@clerk/react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import {
  USER_ROLES,
  USER_STATUS,
  type UserRole,
  type UserStatus,
} from '@/constants/enums';

export default function Header() {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const [open, setOpen] = useState(false);

  // 🔗 Nav Links
  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <nav
      className={cn(
        'flex items-center gap-6 text-sm font-medium',
        mobile && 'flex-col items-start gap-5',
      )}
    >
      {[
        { name: 'Home', to: '/home' },
        { name: 'About', to: '/about' },
      ].map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={() => mobile && setOpen(false)}
          className={({ isActive }) =>
            cn(
              'relative px-1 py-1 transition-all duration-300',
              'text-gray-300 hover:text-white',
              'after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0',
              'after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500',
              'after:transition-all after:duration-500',
              isActive
                ? 'text-white font-semibold after:w-full'
                : 'hover:after:w-full',
            )
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );

  // 🔐 Auth Section
  const AuthSection = ({ mobile = false }: { mobile?: boolean }) => {
    if (!isLoaded) return null;

    const role = (user?.publicMetadata?.roles as UserRole) ?? '';
    const status = (user?.publicMetadata?.status as UserStatus) ?? '';

    const getDashboardLabel = () => {
      switch (role) {
        case USER_ROLES.ADMIN:
          return 'Admin Dashboard';
        case USER_ROLES.TEACHER:
          return 'Teacher Dashboard';
        case USER_ROLES.PREFECT:
          return 'Prefect Dashboard';
      }
    };

    return (
      <div
        className={cn(
          'flex items-center gap-4',
          mobile && 'flex-col w-full gap-4',
        )}
      >
        {isSignedIn ? (
          <>
            {status === USER_STATUS.ACTIVE && role && (
              <Link to="/dashboard" onClick={() => mobile && setOpen(false)}>
                <Button
                  className={cn(
                    'rounded-full px-5 bg-gradient-to-r from-green-400 to-teal-500 text-black hover:opacity-90 shadow-md',
                    mobile && 'w-full h-10',
                  )}
                >
                  {getDashboardLabel()}
                </Button>
              </Link>
            )}

            <UserButton />
          </>
        ) : (
          <>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className={cn(
                  'rounded-full text-gray-300 hover:text-white hover:bg-white/10',
                  mobile && 'w-full h-10',
                )}
              >
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button
                className={cn(
                  'rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-md',
                  mobile && 'w-full h-10',
                )}
              >
                Sign Up
              </Button>
            </SignUpButton>
          </>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        {/* 🔥 Logo */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-wide text-white hover:opacity-80 transition"
        >
          DhamDeepa
        </Link>

        {/* 🖥 Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
        </div>

        {/* 🖥 Desktop Auth */}
        <div className="hidden md:flex">
          <AuthSection />
        </div>

        {/* 📱 Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[280px] bg-black text-white border-l border-white/10 p-6"
            >
              <div className="flex flex-col h-full justify-between">
                {/* Top */}
                <div className="space-y-6">
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="text-lg font-semibold"
                  >
                    DhamDeepa
                  </Link>

                  <NavLinks mobile />
                </div>

                {/* Bottom */}
                <div className="pt-6 border-t border-white/10">
                  <AuthSection mobile />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
