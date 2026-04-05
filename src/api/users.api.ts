import { fetchWithAuth } from './client';
import type { getAllUsersResponse } from '@/types/user/user.dto';
import type { UserRole, UserStatus } from '@/types/user/user.enums';
import type { User, UserStats } from '@/types/user/user.types';

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
): Promise<getAllUsersResponse> => {
  const query = new URLSearchParams();

  query.append('page', String(page));
  query.append('limit', String(limit));

  if (role) query.append('role', role as string);
  if (status) query.append('status', status);
  if (search) query.append('search', search);

  const res = await fetchWithAuth(`/api/v1/users?${query.toString()}`, token);

  return (await res.json()) as getAllUsersResponse;
};

// Get user stats
export const getUserStats = async (token: string): Promise<UserStats> => {
  const res = await fetchWithAuth('/api/v1/users/statistics', token);

  return (await res.json()) as UserStats;
};

// Get user by id
export const getUserById = async (
  token: string,
  userId: string,
): Promise<User> => {
  const res = await fetchWithAuth(`/api/v1/users/${userId}`, token);

  return (await res.json()) as User;
};

// Update user role
export const updateUserRole = async (
  token: string,
  userId: string,
  role: UserRole,
): Promise<User> => {
  const res = await fetchWithAuth(`/api/v1/users/${userId}/role`, token, {
    method: 'PUT',
    body: JSON.stringify({ role }),
  });

  return (await res.json()) as User;
};

// Update user status
export const updateUserStatus = async (
  token: string,
  userId: string,
  status: UserStatus,
): Promise<User> => {
  const res = await fetchWithAuth(`/api/v1/users/${userId}/status`, token, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });

  return (await res.json()) as User;
};
