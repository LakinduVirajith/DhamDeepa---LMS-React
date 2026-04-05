import { fetchWithAuth } from './client';
import type { UserStatus } from '@/types/user/user.enums';
import type { EmploymentType } from '@/types/teacher/teacher.enums';
import type { Teacher } from '@/types/teacher/teacher.types';
import type {
  GetAllTeachersResponse,
  TeacherAdminUpdateDTO,
  TeacherCreateUpdateDTO,
} from '@/types/teacher/teacher.dto';

// Create a new teacher profile
export const createTeacher = async (
  token: string,
  data: TeacherCreateUpdateDTO,
): Promise<Teacher> => {
  const res = await fetchWithAuth(`/api/v1/teachers`, token, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return (await res.json()) as Teacher;
};

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
): Promise<GetAllTeachersResponse> => {
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

  return (await res.json()) as GetAllTeachersResponse;
};

// Get teacher by id
export const getTeacherById = async (
  token: string,
  teacherId: string,
): Promise<Teacher> => {
  const res = await fetchWithAuth(`/api/v1/teachers/${teacherId}`, token);

  return (await res.json()) as Teacher;
};

// Get teacher by clerk user id
export const getTeacherByClerkId = async (
  token: string,
  clerkId: string,
): Promise<Teacher> => {
  const res = await fetchWithAuth(`/api/v1/teachers/clerk/${clerkId}`, token);

  return (await res.json()) as Teacher;
};

// Update teacher profile
export const updateTeacher = async (
  token: string,
  teacherId: string,
  data: TeacherAdminUpdateDTO | TeacherCreateUpdateDTO,
): Promise<Teacher> => {
  const res = await fetchWithAuth(`/api/v1/teachers/${teacherId}`, token, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  return (await res.json()) as Teacher;
};

// Delete teacher profile
export const deleteTeacher = async (
  token: string,
  teacherId: string,
): Promise<String> => {
  const res = await fetchWithAuth(`/api/v1/teachers/${teacherId}`, token, {
    method: 'DELETE',
  });

  return (await res.json()) as String;
};
