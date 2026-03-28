import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Mail, Phone } from 'lucide-react';
import { formatDate } from '@/utils/dateHelpers';
import type { Teacher } from '@/constants/types';

interface Props {
  teacher: Teacher;
  onView: () => void;
}

export default function TeacherCard({ teacher, onView }: Props) {
  const { user, professionalInfo, personalInfo } = teacher;

  return (
    <div className="group relative bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.firstName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-semibold">
              {user.firstName[0]}
              {user.lastName[0]}
            </span>
          )}
        </div>

        {/* Name + Email */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-base truncate">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray-500 truncate flex items-center gap-1">
            <Mail className="w-3 h-3" />
            {user.email}
          </p>
        </div>

        {/* Status Indicator */}
        <div>
          <span
            className={`w-3 h-3 rounded-full block ${
              user.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
        </div>
      </div>

      {/* Middle Section */}
      <div className="mt-4 space-y-3">
        {/* Employment */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="capitalize">
            {professionalInfo.employmentType.replace('_', ' ')}
          </Badge>
        </div>

        {/* Subjects */}
        <div className="flex flex-wrap gap-1">
          {professionalInfo.subjects.slice(0, 2).map((sub) => (
            <Badge key={sub} variant="outline">
              {sub}
            </Badge>
          ))}
          {professionalInfo.subjects.length > 2 && (
            <Badge variant="outline">
              +{professionalInfo.subjects.length - 2}
            </Badge>
          )}
        </div>

        {/* Key Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>
            Experience:{' '}
            <span className="font-medium">
              {professionalInfo.yearsOfExperience || 0} yrs
            </span>
          </p>

          {professionalInfo.joinedDate && (
            <p>
              Joined:{' '}
              <span className="font-medium">
                {formatDate(professionalInfo.joinedDate)}
              </span>
            </p>
          )}

          <p className="flex items-center gap-1">
            <Phone className="w-3 h-3" />
            {personalInfo.contact.phoneNumber}
          </p>
        </div>
      </div>

      {/* Action */}
      <div className="mt-5">
        <Button
          size="sm"
          className="w-full opacity-90 group-hover:opacity-100 transition"
          onClick={onView}
        >
          <Eye className="w-4 h-4 mr-2" />
          Show ID
        </Button>
      </div>
    </div>
  );
}
