import type { Teacher } from './teacher.types';

// For API responses that return a teachers list with pagination
export interface GetAllTeachersResponse {
  teachers: Teacher[];
  total: number;
  page: number;
  pages: number;
}

// For admin use - allows updating professional info only
export interface TeacherAdminUpdateDTO {
  professionalInfo?: {
    subjects?: string[];
    maxStudents?: number;
    employmentType?: string;
    salary: {
      amount?: number;
      currency: string;
    };
    joinedDate: string;
  };
}

// For teacher profile creation and update by the teacher themselves
export interface TeacherCreateUpdateDTO {
  user?: string;
  personalInfo: {
    dateOfBirth: string;
    gender: string;
    nic: string;
    contact: {
      phoneNumber: string;
    };
    address: {
      street: string;
      city: string;
      postalCode: string;
      policeDivision: string;
    };
  };
  professionalInfo?: {
    qualifications?: string[];
    yearsOfExperience?: number;
    subjects: string[];
    bio?: string;
    maxStudents?: number;
    joinedDate?: string;
  };
  bankInfo?: {
    bankName?: string;
    accountNumber?: string;
  };
}
