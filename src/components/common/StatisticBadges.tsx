import { Badge } from '@/components/ui/badge';
import type { UserStats } from '@/constants/types';

interface BadgeItem {
  label: string;
  value: number;
  color: string;
}

export default function StatisticBadges({
  stats,
}: {
  stats: UserStats | null;
}) {
  const badges: BadgeItem[] = [
    {
      label: 'Total Users',
      value: stats?.totalUsers || 0,
      color: 'bg-blue-600',
    },
    {
      label: 'Admins',
      value: stats?.roles.admin || 0,
      color: 'bg-red-600',
    },
    {
      label: 'Teachers',
      value: stats?.roles.teacher || 0,
      color: 'bg-green-600',
    },
    {
      label: 'Prefects',
      value: stats?.roles.prefect || 0,
      color: 'bg-purple-600',
    },
    {
      label: 'Active',
      value: stats?.status.active || 0,
      color: 'bg-teal-600',
    },
    {
      label: 'Inactive',
      value: stats?.status.inactive || 0,
      color: 'bg-yellow-600',
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {badges.map((badge) => (
        <Badge
          key={badge.label}
          className={`${badge.color} p-4 rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform`}
        >
          {badge.label}: {badge.value}
        </Badge>
      ))}
    </div>
  );
}
