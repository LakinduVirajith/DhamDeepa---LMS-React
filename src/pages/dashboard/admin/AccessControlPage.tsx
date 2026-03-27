import { useState } from 'react';
import { useAuth } from '@clerk/react';
import { getUserById, updateUserRole, updateUserStatus } from '@/api/user.api';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

import {
  USER_ROLES,
  USER_STATUS,
  type UserRole,
  type UserStatus,
} from '@/constants/enums';

import { formatDate } from '@/utils/dateHelpers';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/common/ConfirmDialog';

export default function AccessControlPage() {
  const { getToken } = useAuth();

  const [userId, setUserId] = useState('');
  const [user, setUser] = useState<any>(null);

  const [role, setRole] = useState<UserRole | undefined>();
  const [status, setStatus] = useState<UserStatus | undefined>();

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Fetch User
  const handleFetchUser = async () => {
    if (!userId) {
      toast.error('Please enter a User ID to continue.');
      return;
    }

    setLoading(true);
    try {
      const token = await getToken({ template: 'dhamdeepa-auth' });
      if (!token) return;

      const res = await getUserById(token, userId);

      setUser(res);
      setRole(res.role);
      setStatus(res.status);

      toast.success('User details loaded successfully.');
    } catch (err) {
      console.error(err);
      setUser(null);
      toast.error(
        "We couldn't find a user with that ID. Please check and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Update Role
  const handleUpdateRole = async () => {
    if (!user || !role) return;

    setUpdating(true);
    try {
      const token = await getToken({ template: 'dhamdeepa-auth' });
      if (!token) return;

      await updateUserRole(token, user._id, role);

      setUser((prev: any) => ({ ...prev, role }));

      toast.success('Role updated successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update role');
    } finally {
      setUpdating(false);
    }
  };

  // Update Status
  const handleUpdateStatus = async () => {
    if (!user || !status) return;

    setUpdating(true);
    try {
      const token = await getToken({ template: 'dhamdeepa-auth' });
      if (!token) return;

      await updateUserStatus(token, user._id, status);

      setUser((prev: any) => ({ ...prev, status }));

      toast.success('Status updated successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 space-y-6">
      {/* Search */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md flex gap-3">
        <Input
          placeholder="Enter User ID..."
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleFetchUser()}
        />
        <Button onClick={handleFetchUser} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch User'}
        </Button>
      </div>

      {/* User Info */}
      {user && (
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <div>
            <p className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <div className="flex gap-3">
            <Badge>{user.role}</Badge>
            <Badge variant="outline">{user.status}</Badge>
          </div>

          <div className="text-sm text-gray-500">
            Signed Up: {formatDate(user.createdAt)} | Last Updated:{' '}
            {formatDate(user.updatedAt)}
          </div>

          {/* Role */}
          <div className="flex gap-3 items-center flex-wrap">
            <Select
              value={role || ''}
              onValueChange={(v) => setRole(v ? (v as UserRole) : undefined)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(USER_ROLES).map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <ConfirmDialog
              title="Update User Role"
              description={`Are you sure you want to change this user's role to "${role}"? This will update their permissions.`}
              confirmText="Yes, Update Role"
              onConfirm={handleUpdateRole}
              loading={updating}
              trigger={
                <Button disabled={updating || role === user.role}>
                  Update Role
                </Button>
              }
            />
          </div>

          {/* Status */}
          <div className="flex gap-3 items-center flex-wrap">
            <Select
              value={status || ''}
              onValueChange={(v) =>
                setStatus(v ? (v as UserStatus) : undefined)
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(USER_STATUS).map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <ConfirmDialog
              title="Update User Status"
              description={`Are you sure you want to change this user's status to "${status}"? This may affect their access.`}
              confirmText="Yes, Update Status"
              onConfirm={handleUpdateStatus}
              loading={updating}
              trigger={
                <Button
                  variant="outline"
                  disabled={updating || status === user.status}
                >
                  Update Status
                </Button>
              }
            />
          </div>
        </div>
      )}

      {/* Empty */}
      {!user && !loading && (
        <div className="text-center text-gray-500">
          Enter a User ID above to view and manage user access 👆
        </div>
      )}
    </div>
  );
}
