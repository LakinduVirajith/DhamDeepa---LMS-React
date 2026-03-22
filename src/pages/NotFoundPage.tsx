import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth, useUser } from '@clerk/react';
import { USER_STATUS, type UserStatus } from '@/constants/enums';

export default function NotFoundPage() {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();

  const status = (user?.publicMetadata?.status as UserStatus) || '';

  const isActiveUser = isLoaded && isSignedIn && status === USER_STATUS.ACTIVE;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
      <div className="text-center max-w-xl">
        {/* 404 Number */}
        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>

        {/* Description */}
        <p className="mt-2 text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
          >
            <ArrowLeft size={16} />
            Go Home
          </Link>

          {isActiveUser && (
            <Link
              to="/dashboard"
              className="px-5 py-2 rounded-full border border-gray-700 hover:bg-gray-800 transition text-gray-300"
            >
              Dashboard Page
            </Link>
          )}
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-gray-500">
          © {new Date().getFullYear()} DhamDeepa
        </p>
      </div>
    </div>
  );
}
