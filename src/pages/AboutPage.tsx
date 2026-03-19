import { useAuth } from '@clerk/react';
import { useEffect } from 'react';

export default function AboutPage() {
  const { getToken } = useAuth();

  useEffect(() => {
    const token = getToken({ template: 'dhamdeepa-auth' });
    console.log(token);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full p-8 rounded-xl shadow-lg bg-gray-800">
        <h1 className="text-3xl font-bold mb-4 text-center">About DhamDeepa</h1>
        <p className="text-center text-gray-300">
          DhamDeepa is a modern school management platform designed to help
          admins, teachers, and prefects manage student activities, dashboards,
          and assignments efficiently. Log in to explore your dashboard based on
          your role.
        </p>
      </div>
    </div>
  );
}
