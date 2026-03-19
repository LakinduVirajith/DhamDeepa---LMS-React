import { useUser, useAuth, SignInButton, SignUpButton } from '@clerk/react';
import { USER_ROLES, USER_STATUS } from '@/constants/enums';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  let message = '';
  let bgColor = 'bg-gray-800';

  if (!isSignedIn) {
    message = 'Welcome! Please sign up or log in to continue.';
    bgColor = 'bg-gray-800';
  } else {
    const status = (user?.publicMetadata?.status as string) ?? '';
    const role = (user?.publicMetadata?.roles as string) ?? '';

    if (status !== USER_STATUS.ACTIVE) {
      message = 'Your account is not active. Please contact admin.';
      bgColor = 'bg-yellow-600';
    } else {
      switch (role) {
        case USER_ROLES.ADMIN:
          message = 'Welcome Admin! You have full access.';
          bgColor = 'bg-red-600';
          break;
        case USER_ROLES.TEACHER:
          message = 'Welcome Teacher! You can manage your students.';
          bgColor = 'bg-blue-600';
          break;
        case USER_ROLES.PREFECT:
          message = 'Welcome Prefect! You can manage prefect duties.';
          bgColor = 'bg-green-600';
          break;
        default:
          message = 'Welcome User! Your role is undefined.';
          bgColor = 'bg-gray-600';
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <div
        className={`max-w-lg w-full p-8 rounded-xl shadow-lg ${bgColor} transition-all duration-500`}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">DhamDeepa LMS</h1>
        <p className="text-center mb-6">{message}</p>

        {!isSignedIn && (
          <div className="flex justify-center gap-4">
            <SignInButton mode="modal">
              <Button className="px-5 py-2 rounded-full bg-gray-700 hover:bg-gray-600">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        )}
      </div>
    </div>
  );
}
