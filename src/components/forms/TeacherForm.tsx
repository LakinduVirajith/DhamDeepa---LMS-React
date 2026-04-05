import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  teacherCreateUpdateSchema,
  type TeacherCreateUpdateForm,
} from '@/schemas/teacher.schema';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import TagInput from '@/components/common/TagInput';
import ConfirmDialog from '@/components/common/ConfirmDialog';

import type { Teacher } from '@/types/teacher/teacher.types';
import { GENDER, type Gender } from '@/types/teacher/teacher.enums';

import { CalendarIcon } from 'lucide-react';

import { formatDate } from '@/lib/dateFormatters';
import { cn } from '@/lib/utils';

type Props = {
  initialData: Teacher | null;
  onSubmit: (data: TeacherCreateUpdateForm) => void;
  mode: 'create' | 'view' | 'edit';
  setMode: (mode: 'create' | 'view' | 'edit') => void;
};

export default function TeacherForm({
  initialData,
  onSubmit,
  mode,
  setMode,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<TeacherCreateUpdateForm>({
    resolver: zodResolver(teacherCreateUpdateSchema),
    defaultValues: {},
  });

  // Populate form with initial data when in edit mode
  useEffect(() => {
    if (initialData) {
      reset({
        personalInfo: {
          dateOfBirth: initialData.personalInfo.dateOfBirth
            ?.toString()
            .slice(0, 10),
          gender: initialData.personalInfo.gender,
          nic: initialData.personalInfo.nic,
          contact: {
            phoneNumber: initialData.personalInfo.contact.phoneNumber,
          },
          address: initialData.personalInfo.address,
        },
        professionalInfo: {
          qualifications: initialData.professionalInfo.qualifications || [],
          yearsOfExperience:
            initialData.professionalInfo.yearsOfExperience || 0,
          subjects: initialData.professionalInfo.subjects || [],
          bio: initialData.professionalInfo.bio || '',
          maxStudents: initialData.professionalInfo.maxStudents || 0,
        },
        bankInfo: initialData.bankInfo || {},
      });
    }
  }, [initialData, reset]);

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {mode === 'edit' ? 'Update Profile' : 'Create Profile'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === 'edit'
                ? 'Update your teacher details below'
                : 'Fill in your teacher details below'}
            </p>
          </div>
          <div>
            {mode === 'edit' && (
              <Button
                className="p-5 cursor-pointer"
                onClick={() => {
                  setMode('view');
                }}
              >
                View Profile
              </Button>
            )}
          </div>
        </div>

        <form className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow space-y-4">
            <h3 className="font-semibold text-lg">Personal Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !watch('personalInfo.dateOfBirth') &&
                          'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {watch('personalInfo.dateOfBirth')
                        ? formatDate(
                            new Date(watch('personalInfo.dateOfBirth')),
                          )
                        : 'Select date of birth'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={
                        watch('personalInfo.dateOfBirth')
                          ? new Date(watch('personalInfo.dateOfBirth'))
                          : undefined
                      }
                      onSelect={(date) =>
                        setValue(
                          'personalInfo.dateOfBirth',
                          date ? date.toISOString() : '',
                          { shouldDirty: true },
                        )
                      }
                    />
                  </PopoverContent>
                </Popover>
                {errors.personalInfo?.dateOfBirth && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.personalInfo.dateOfBirth.message}
                  </p>
                )}
              </div>

              <div>
                <Select
                  value={watch('personalInfo.gender')}
                  onValueChange={(val) =>
                    setValue('personalInfo.gender', val as Gender, {
                      shouldDirty: true,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(GENDER).map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.personalInfo?.gender && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.personalInfo.gender.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register('personalInfo.nic')}
                  placeholder="NIC Number"
                />
                {errors.personalInfo?.nic && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.personalInfo.nic.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register('personalInfo.contact.phoneNumber')}
                  type="tel"
                  placeholder="Phone Number"
                />
                {errors.personalInfo?.contact?.phoneNumber && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.personalInfo.contact.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow space-y-4">
            <h3 className="font-semibold text-lg">Address</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  {...register('personalInfo.address.street')}
                  placeholder="Street"
                />
                {errors.personalInfo?.address?.street && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.personalInfo.address.street.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register('personalInfo.address.city')}
                  placeholder="City"
                />
                {errors.personalInfo?.address?.city && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.personalInfo.address.city.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register('personalInfo.address.postalCode')}
                  placeholder="Postal Code"
                />
                {errors.personalInfo?.address?.postalCode && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.personalInfo.address.postalCode.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register('personalInfo.address.policeDivision')}
                  placeholder="Police Division"
                />
                {errors.personalInfo?.address?.policeDivision && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.personalInfo.address.policeDivision.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow space-y-4">
            <h3 className="font-semibold text-lg">Professional Information</h3>

            <div>
              <TagInput
                value={watch('professionalInfo.qualifications') || []}
                onChange={(val) =>
                  setValue('professionalInfo.qualifications', val)
                }
                placeholder="Type qualifications and press Enter"
              />
              {errors.professionalInfo?.qualifications && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.professionalInfo.qualifications.message}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="number"
                  placeholder="Years of Experience"
                  {...register('professionalInfo.yearsOfExperience', {
                    valueAsNumber: true,
                  })}
                />
                {errors.professionalInfo?.yearsOfExperience && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.professionalInfo.yearsOfExperience.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="number"
                  placeholder="Max Students"
                  {...register('professionalInfo.maxStudents', {
                    valueAsNumber: true,
                  })}
                />
                {errors.professionalInfo?.maxStudents && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.professionalInfo.maxStudents.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <TagInput
                value={watch('professionalInfo.subjects') || []}
                onChange={(val) =>
                  setValue('professionalInfo.subjects', val, {
                    shouldDirty: true,
                  })
                }
                placeholder="Type subjects and press Enter"
              />
              {errors.professionalInfo?.subjects && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.professionalInfo.subjects.message}
                </p>
              )}
            </div>

            <div>
              <Textarea
                {...register('professionalInfo.bio')}
                placeholder="Short bio about you"
              />
              {errors.professionalInfo?.bio && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.professionalInfo.bio.message}
                </p>
              )}
            </div>
          </div>

          {/* Bank Information */}
          <div className="bg-white dark:bg-gray-800 p-5 mb-8 rounded-2xl shadow space-y-4">
            <h3 className="font-semibold text-lg">Bank Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  {...register('bankInfo.bankName')}
                  placeholder="Bank Name"
                />
                {errors.bankInfo?.bankName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.bankInfo.bankName.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register('bankInfo.accountNumber')}
                  placeholder="Account Number"
                />
                {errors.bankInfo?.accountNumber && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.bankInfo.accountNumber.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Actions */}
      <div className="sticky w-full bottom-0 bg-gray-50 dark:bg-gray-900 p-8 shadow flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          className="w-1/2"
        >
          Reset Form
        </Button>

        <ConfirmDialog
          title={mode === 'edit' ? 'Update Profile' : 'Create Profile'}
          description="Are you sure you want to continue? Make sure all the information is correct before proceeding."
          confirmText={mode === 'edit' ? 'Update Profile' : 'Create Profile'}
          onConfirm={handleSubmit(onSubmit)}
          trigger={
            <Button className="w-1/2" disabled={!isDirty}>
              {mode === 'edit' ? 'Update Profile' : 'Create Profile'}
            </Button>
          }
        />
      </div>
    </>
  );
}
