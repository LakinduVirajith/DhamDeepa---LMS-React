import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/react';
import { toast } from 'sonner';

import {
  getTeacherByClerkId,
  createTeacher,
  updateTeacher,
} from '@/api/teachers.api';

import { Button } from '@/components/ui/button';

import TeacherForm from '@/components/forms/TeacherForm';
import UserAvatar from '@/components/common/UserAvatar';
import TeacherProfileView from '@/components/views/TeacherProfileView';

import type { Teacher } from '@/types/teacher/teacher.types';
import type { TeacherCreateUpdateForm } from '@/schemas/teacher.schema';

export default function TeacherProfilePage() {
  const { userId, getToken } = useAuth();

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'create' | 'view' | 'edit'>('view');

  // Fetch teacher profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken({ template: 'dhamdeepa-auth' });
        if (!token || !userId) return;

        const res = await getTeacherByClerkId(token, userId);

        if (!res) {
          setMode('create');
        } else {
          setTeacher(res);
          setMode('view');
        }
      } catch (err) {
        console.error(err);
        setMode('create');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle form submission for both create and update
  const handleSubmit = async (formData: TeacherCreateUpdateForm) => {
    try {
      const token = await getToken({ template: 'dhamdeepa-auth' });
      if (!token) return;

      // Convert date strings to Date objects before sending to API
      let payload = {
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          dateOfBirth: new Date(
            formData.personalInfo.dateOfBirth,
          ).toISOString(),
        },
      };

      let res: Teacher;

      if (mode === 'create') {
        console.log('payload', payload);
        res = await createTeacher(token, payload);
        console.log('response', res);
        setTeacher(res);
        toast.success('Profile created successfully');
      } else if (mode === 'edit' && teacher) {
        res = await updateTeacher(token, teacher._id, payload);
        setTeacher(res);
        toast.success('Profile updated successfully');
      }

      setMode('view');
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while saving your profile.');
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  // Create or Edit Mode
  if (mode === 'create' || mode === 'edit') {
    return (
      <div className="p-6">
        <TeacherForm
          initialData={teacher}
          onSubmit={handleSubmit}
          mode={mode}
          setMode={setMode}
        />
      </div>
    );
  }

  // View Mode
  return (
    <div className="p-6 space-y-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* User Information */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex items-center justify-between">
        <div className="flex items-center gap-4">
          <UserAvatar
            firstName={teacher!.user.firstName}
            lastName={teacher!.user.lastName}
            avatarUrl={teacher!.user.avatarUrl}
            size="lg"
          />

          <div>
            <h2 className="font-semibold text-lg">
              {teacher!.user.firstName} {teacher!.user.lastName}
            </h2>
            <p className="text-sm text-gray-500">{teacher!.user.email}</p>
          </div>
        </div>

        <Button className="p-5 cursor-pointer" onClick={() => setMode('edit')}>
          Edit Profile
        </Button>
      </div>

      {/* Detailed Information */}
      <TeacherProfileView teacher={teacher!} />
    </div>
  );
}
