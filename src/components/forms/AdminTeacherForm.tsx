import { useState } from 'react';
import { useAuth } from '@clerk/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { updateTeacher } from '@/api/teachers.api';
import {
  teacherAdminUpdateSchema,
  type TeacherAdminUpdateForm,
} from '@/schemas/teacher.schema';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '../ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { toast } from 'sonner';

import ConfirmDialog from '@/components/common/ConfirmDialog';
import TagInput from '../common/TagInput';
import SalaryInput from './SalaryInput';

import {
  EMPLOYMENT_TYPE,
  type EmploymentType,
} from '@/types/teacher/teacher.enums';

import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/dateFormatters';

export default function AdminTeacherForm({ teacher, setTeacher }: any) {
  const { getToken } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<TeacherAdminUpdateForm>({
    resolver: zodResolver(teacherAdminUpdateSchema),
    defaultValues: {
      professionalInfo: {
        subjects: teacher.professionalInfo.subjects || [],
        maxStudents: teacher.professionalInfo.maxStudents || 0,
        employmentType: teacher.professionalInfo.employmentType || '',
        salary: {
          amount: teacher.professionalInfo.salary?.amount || 0,
          currency: teacher.professionalInfo.salary?.currency || 'LKR',
        },
      },
    },
  });

  // Submit Handler
  const onSubmit = async (data: TeacherAdminUpdateForm) => {
    setUpdating(true);

    try {
      const token = await getToken({ template: 'dhamdeepa-auth' });
      if (!token) return;

      await updateTeacher(token, teacher._id, data);

      toast.success('Teacher updated successfully');

      setTeacher((prev: any) => ({
        ...prev,
        professionalInfo: data.professionalInfo,
      }));

      reset(data);
      setIsEdit(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update teacher');
    } finally {
      setUpdating(false);
    }
  };

  // Revert Edit
  const handleRevert = () => {
    reset();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Professional Info</h3>

        <Button variant="outline" onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? 'Close' : 'Edit'}
        </Button>
      </div>

      {/* View Mode */}
      {!isEdit && (
        <div className="text-sm space-y-1 text-gray-600">
          <p>
            <strong>Subjects: </strong>
            {teacher.professionalInfo.subjects.join(', ')}
          </p>
          <p>
            <strong>Max Students: </strong>
            {teacher.professionalInfo.maxStudents}
          </p>
          <p>
            <strong>Employment: </strong>
            {teacher.professionalInfo.employmentType}
          </p>
          <p>
            <strong>Salary: </strong>
            {teacher.professionalInfo.salary?.amount
              ? `${teacher.professionalInfo.salary.currency}: ${teacher.professionalInfo.salary.amount}`
              : 'N/A'}
          </p>
        </div>
      )}

      {/* Edit Mode */}
      {isEdit && (
        <form className="space-y-4">
          {/* Subjects */}
          <div>
            <TagInput
              value={watch('professionalInfo.subjects') || []}
              onChange={(val) =>
                setValue('professionalInfo.subjects', val, {
                  shouldDirty: true,
                })
              }
              placeholder="Type subject and press Enter"
            />
            {errors.professionalInfo?.subjects && (
              <p className="text-red-500 text-xs">
                {errors.professionalInfo.subjects.message}
              </p>
            )}
          </div>

          {/* Max Students */}
          <div>
            <Input
              type="number"
              {...register('professionalInfo.maxStudents', {
                valueAsNumber: true,
              })}
            />
            {errors.professionalInfo?.maxStudents && (
              <p className="text-red-500 text-xs">
                {errors.professionalInfo.maxStudents.message}
              </p>
            )}
          </div>

          <div className="flex justify-between gap-2">
            {/* Employment */}
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1 block">
                Employment Type
              </label>
              <Select
                value={watch('professionalInfo.employmentType') || ''}
                onValueChange={(value) =>
                  setValue(
                    'professionalInfo.employmentType',
                    value as EmploymentType,
                    {
                      shouldDirty: true,
                    },
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(EMPLOYMENT_TYPE).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.professionalInfo?.employmentType && (
                <p className="text-red-500 text-xs">
                  {errors.professionalInfo.employmentType.message}
                </p>
              )}
            </div>

            {/* Joined Date */}
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1 block">
                Joined Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !watch('professionalInfo.joinedDate') &&
                        'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {watch('professionalInfo.joinedDate')
                      ? formatDate(
                          new Date(watch('professionalInfo.joinedDate')),
                        )
                      : 'Select joined date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={
                      watch('professionalInfo.joinedDate')
                        ? new Date(watch('professionalInfo.joinedDate'))
                        : undefined
                    }
                    onSelect={(date) =>
                      setValue(
                        'professionalInfo.joinedDate',
                        date ? date.toISOString() : '',
                        { shouldDirty: true },
                      )
                    }
                  />
                </PopoverContent>
              </Popover>
              {errors.professionalInfo?.joinedDate && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.professionalInfo.joinedDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Salary */}
          <div>
            <SalaryInput
              value={watch('professionalInfo.salary')}
              onChange={(val) =>
                setValue('professionalInfo.salary', val, {
                  shouldDirty: true,
                })
              }
            />
            {errors.professionalInfo?.salary && (
              <p className="text-red-500 text-xs">
                {errors.professionalInfo.salary.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleRevert}
              disabled={updating}
              className="w-1/2"
            >
              Revert Changes
            </Button>

            <ConfirmDialog
              title="Update Teacher"
              description="Are you sure you want to update teacher details? This action cannot be undone."
              confirmText="Update"
              onConfirm={handleSubmit(onSubmit)}
              loading={updating}
              trigger={
                <Button
                  type="button"
                  className="w-1/2"
                  disabled={!isDirty || updating}
                >
                  Save Changes
                </Button>
              }
            />
          </div>
        </form>
      )}
    </div>
  );
}
