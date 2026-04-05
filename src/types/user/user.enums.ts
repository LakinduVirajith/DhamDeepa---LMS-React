export const USER_ROLES = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  PREFECT: 'PREFECT',
} as const;

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
