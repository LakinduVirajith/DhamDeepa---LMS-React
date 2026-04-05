import { GENDER } from '@/types/teacher/teacher.enums';
import { z } from 'zod';

// For admin updates to teacher profiles (without personal info)
export const teacherAdminUpdateSchema = z.object({
  professionalInfo: z.object({
    subjects: z
      .array(z.string().min(1))
      .min(1, 'At least one subject is required'),
    maxStudents: z
      .number()
      .min(1, 'Minimum 1 student')
      .max(100, 'Max 100 students'),
    employmentType: z.string().min(1, 'Employment type is required'),
    salary: z.object({
      amount: z.number().min(0, 'Salary must be positive'),
      currency: z.string().min(1, 'Currency is required'),
    }),
    joinedDate: z.string().min(1, 'Joined date is required'),
  }),
});

// For teacher profile creation and update by the teacher themselves
export const teacherCreateUpdateSchema = z.object({
  user: z.string().optional(),
  personalInfo: z.object({
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    gender: z.enum(GENDER),
    nic: z
      .string()
      .min(10, 'NIC must be at least 10 characters')
      .max(12, 'NIC must be at most 12 characters'),
    contact: z.object({
      phoneNumber: z
        .string()
        .regex(/^\d{10}$/, 'Phone number must be 10 digits'),
    }),
    address: z.object({
      street: z
        .string()
        .min(5, 'Street must be at least 5 characters')
        .max(100),
      city: z.string().min(2, 'City is required').max(100),
      postalCode: z.string().regex(/^\d{5}$/, 'Postal code must be 5 digits'),
      policeDivision: z.string().min(2, 'Police division is required').max(100),
    }),
  }),

  professionalInfo: z.object({
    qualifications: z.array(z.string()).optional(),
    yearsOfExperience: z
      .number()
      .min(0, 'Experience cannot be negative')
      .max(50, 'Max 50 years')
      .optional(),
    subjects: z
      .array(z.string().min(1))
      .min(1, 'At least one subject is required'),
    bio: z.string().max(1000, 'Bio too long').optional(),
    maxStudents: z
      .number()
      .min(1, 'Minimum 1 student')
      .max(100, 'Max 100 students')
      .optional(),
  }),

  bankInfo: z
    .object({
      bankName: z.string().min(2).max(100).optional(),
      accountNumber: z
        .string()
        .min(6, 'Min 6 digits')
        .max(20, 'Max 20 digits')
        .optional(),
    })
    .optional(),
});

export type TeacherAdminUpdateForm = z.infer<typeof teacherAdminUpdateSchema>;
export type TeacherCreateUpdateForm = z.infer<typeof teacherCreateUpdateSchema>;
