import { useAuth } from '@clerk/react';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { getToken } = useAuth();

  useEffect(() => {
    const token = getToken({ template: 'dhamdeepa-auth' });
    console.log(token);
  }, []);

  return <div>DashboardPage</div>;
}
