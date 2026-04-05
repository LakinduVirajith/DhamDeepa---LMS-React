import type { UserRole, UserStatus } from './user.enums';

export interface User {
  _id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  roles: {
    admin: number;
    teacher: number;
    prefect: number;
  };
  status: {
    active: number;
    inactive: number;
  };
  totalUsers: number;
}
