import type { EmploymentType, UserStatus } from '@/constants/enums';
import { fetchWithAuth } from './client';

// Get all teachers with filters
export const getAllTeachers = async (
  token: string,
  {
    page = 1,
    limit = 10,
    status,
    employmentType,
    subject,
    search,
  }: {
    page?: number;
    limit?: number;
    status?: UserStatus;
    employmentType?: EmploymentType;
    subject?: string;
    search?: string;
  } = {},
) => {
  const query = new URLSearchParams();

  query.append('page', String(page));
  query.append('limit', String(limit));

  if (status) query.append('status', status);
  if (employmentType) query.append('employmentType', employmentType);
  if (subject) query.append('subject', subject);
  if (search) query.append('search', search);

  const res = await fetchWithAuth(
    `/api/v1/teachers?${query.toString()}`,
    token,
  );

  return res.json();
};

// Get teacher by id
export const getTeacherById = async (token: string, teacherId: string) => {
  const res = await fetchWithAuth(`/api/v1/teachers/${teacherId}`, token);
  return res.json();
};
