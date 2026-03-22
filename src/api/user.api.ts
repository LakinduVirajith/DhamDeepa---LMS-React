import { fetchWithAuth } from './client';
import { type UserRole, type UserStatus } from '@/constants/enums';

// Get all users with filters
export const getAllUsers = async (
  token: string,
  {
    page = 1,
    limit = 10,
    role,
    status,
    search,
  }: {
    page?: number;
    limit?: number;
    role?: UserRole;
    status?: UserStatus;
    search?: string;
  } = {},
) => {
  const query = new URLSearchParams();

  query.append('page', String(page));
  query.append('limit', String(limit));

  if (role) query.append('role', role as string);
  if (status) query.append('status', status);
  if (search) query.append('search', search);

  const res = await fetchWithAuth(`/api/v1/users?${query.toString()}`, token);

  return res.json();
};

// Get user stats
export const getUserStats = async (token: string) => {
  const res = await fetchWithAuth('/api/v1/users/stats', token);
  return res.json();
};

// Update user role
export const updateUserRole = async (
  token: string,
  clerkId: string,
  role: UserRole,
) => {
  const res = await fetchWithAuth(`/api/v1/users/${clerkId}/role`, token, {
    method: 'PUT',
    body: JSON.stringify({ role }),
  });

  return res.json();
};

// Update user status
export const updateUserStatus = async (
  token: string,
  clerkId: string,
  status: UserStatus,
) => {
  const res = await fetchWithAuth(`/api/v1/users/${clerkId}/status`, token, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });

  return res.json();
};
