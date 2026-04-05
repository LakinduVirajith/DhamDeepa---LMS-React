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

export type EmploymentType =
  (typeof EMPLOYMENT_TYPE)[keyof typeof EMPLOYMENT_TYPE];
export type Gender = (typeof GENDER)[keyof typeof GENDER];
