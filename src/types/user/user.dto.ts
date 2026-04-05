import type { User } from './user.types';

// For API responses that return a users list with pagination
export interface getAllUsersResponse {
  users: User[];
  total: number;
  page: number;
  pages: number;
}
