import { useState } from 'react';
import { useAuth } from '@clerk/react';
import { getTeacherById } from '@/api/teachers.api';
import { toast } from 'sonner';

import SearchBar from '@/components/common/SearchBar';
import UserAvatar from '@/components/common/UserAvatar';
import TeacherProfileView from '@/components/views/TeacherProfileView';
import AdminTeacherForm from '@/components/forms/AdminTeacherForm';

import type { Teacher } from '@/types/teacher/teacher.types';

export default function AdminTeacherProfilePage() {
  const { getToken } = useAuth();

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async (teacherId: string) => {
    setLoading(true);
    try {
      const token = await getToken({ template: 'dhamdeepa-auth' });
      if (!token) return;

      const res = await getTeacherById(token, teacherId);
      setTeacher(res);
    } catch (err) {
      console.error(err);
      setTeacher(null);
      toast.error(
        'Failed to fetch teacher. Please check the ID and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <SearchBar
        placeholder="Enter Teacher ID..."
        type="Teacher"
        onSearch={handleFetch}
        loading={loading}
      />

      {teacher && (
        <div className="space-y-4">
          {/* User Information */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex items-center gap-4">
            <UserAvatar
              firstName={teacher.user.firstName}
              lastName={teacher.user.lastName}
              avatarUrl={teacher.user.avatarUrl}
              size="lg"
            />

            <div>
              <h2 className="font-semibold text-lg">
                {teacher.user.firstName} {teacher.user.lastName}
              </h2>
              <p className="text-sm text-gray-500">{teacher.user.email}</p>
              <p className="text-xs text-gray-400">
                {teacher.user.role} • {teacher.user.status}
              </p>
            </div>
          </div>

          {/* Detailed Information */}
          <TeacherProfileView teacher={teacher!} />

          {/* Edit Form */}
          <AdminTeacherForm teacher={teacher} setTeacher={setTeacher} />
        </div>
      )}

      {/* Empty */}
      {!teacher && !loading && (
        <div className="text-center text-gray-500">
          Enter a Teacher ID above to view and manage their profile 👆
        </div>
      )}
    </div>
  );
}
