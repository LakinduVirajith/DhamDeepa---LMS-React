import { Badge } from '@/components/ui/badge';
import {
  USER_ROLES,
  USER_STATUS,
  type UserRole,
  type UserStatus,
} from '@/constants/enums';

interface BadgeItem {
  label: string;
  value: number;
  color: string;
  filter: UserRole | UserStatus | null;
}

interface StatsBadgesProps {
  stats: any;
  onFilterClick: (filter: UserRole | UserStatus) => void;
}

export default function StatsBadges({
  stats,
  onFilterClick,
}: StatsBadgesProps) {
  const badges: BadgeItem[] = [
    {
      label: 'Total Users',
      value: stats?.totalUsers || 0,
      color: 'bg-blue-600',
      filter: null,
    },
    {
      label: 'Admins',
      value: stats?.roles.admin || 0,
      color: 'bg-red-600',
      filter: USER_ROLES.ADMIN,
    },
    {
      label: 'Teachers',
      value: stats?.roles.teacher || 0,
      color: 'bg-green-600',
      filter: USER_ROLES.TEACHER,
    },
    {
      label: 'Prefects',
      value: stats?.roles.prefect || 0,
      color: 'bg-purple-600',
      filter: USER_ROLES.PREFECT,
    },
    {
      label: 'Active',
      value: stats?.status.active || 0,
      color: 'bg-teal-600',
      filter: USER_STATUS.ACTIVE,
    },
    {
      label: 'Inactive',
      value: stats?.status.inactive || 0,
      color: 'bg-yellow-600',
      filter: USER_STATUS.INACTIVE,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {badges.map((badge) => (
        <Badge
          key={badge.label}
          className={`${badge.color} px-4 py-2 rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform duration-200`}
          onClick={() => badge.filter && onFilterClick(badge.filter)}
        >
          {badge.label}: {badge.value}
        </Badge>
      ))}
    </div>
  );
}
