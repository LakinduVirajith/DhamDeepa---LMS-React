import { USER_ROLES, USER_STATUS } from '@/constants/enums';

export function roleColor(role: string) {
  switch (role) {
    case USER_ROLES.ADMIN:
      return 'default';
    case USER_ROLES.TEACHER:
      return 'secondary';
    case USER_ROLES.PREFECT:
      return 'destructive';
    default:
      return 'default';
  }
}

export function statusColor(status: string) {
  switch (status) {
    case USER_STATUS.ACTIVE:
      return 'default';
    case USER_STATUS.INACTIVE:
      return 'destructive';
    default:
      return 'default';
  }
}
