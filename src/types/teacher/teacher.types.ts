import type { User } from '../user/user.types';
import type { EmploymentType, Gender } from './teacher.enums';

export interface Teacher {
  _id: string;
  user: User;

  personalInfo: {
    dateOfBirth: string;
    gender: Gender;
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

  professionalInfo: {
    qualifications?: string[];
    yearsOfExperience?: number;
    subjects: string[];
    bio?: string;
    maxStudents?: number;
    employmentType: EmploymentType;
    salary: {
      amount?: number;
      currency: string;
    };
    joinedDate?: string;
  };

  bankInfo?: {
    bankName?: string;
    accountNumber?: string;
  };

  createdAt: string;
  updatedAt: string;
}
