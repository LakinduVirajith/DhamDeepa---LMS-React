export const USER_ROLES = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  PREFECT: 'PREFECT',
} as const;

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export const EMPLOYMENT_TYPE = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  CONTRACT: 'CONTRACT',
  VISITING: 'VISITING',
} as const;

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
export type EmploymentType =
  (typeof EMPLOYMENT_TYPE)[keyof typeof EMPLOYMENT_TYPE];
export type Gender = (typeof GENDER)[keyof typeof GENDER];
