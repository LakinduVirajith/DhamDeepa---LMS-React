import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/react';
import { getAllTeachers } from '@/api/teachers.api';

import TeacherFilters from '@/components/filters/TeacherFilters';
import Pagination from '@/components/common/Pagination';
import TeacherCard from '@/components/cards/TeacherCard';
import UserIdDialog from '@/components/dialogs/UserIdDialog';
import CardSkeleton from '@/components/common/CardSkeleton';

import type { Teacher } from '@/constants/types';
import type { UserStatus, EmploymentType } from '@/constants/enums';

export default function AllTeachersPage() {
  const { getToken } = useAuth();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [status, setStatus] = useState<UserStatus>();
  const [employmentType, setEmploymentType] = useState<EmploymentType>();
  const [subject, setSubject] = useState('');
  const [search, setSearch] = useState('');

  // Applied
  const [appliedStatus, setAppliedStatus] = useState<UserStatus>();
  const [appliedEmploymentType, setAppliedEmploymentType] =
    useState<EmploymentType>();
  const [appliedSubject, setAppliedSubject] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = await getToken({ template: 'dhamdeepa-auth' });
      if (!token) return;

      const res = await getAllTeachers(token, {
        status: appliedStatus,
        employmentType: appliedEmploymentType,
        subject: appliedSubject,
        search: appliedSearch,
        page: currentPage,
        limit: rowsPerPage,
      });

      setTeachers(res.teachers);
      setTotalPages(res.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    appliedStatus,
    appliedEmploymentType,
    appliedSubject,
    appliedSearch,
    currentPage,
    rowsPerPage,
  ]);

  // Handle Filters
  const handleApplyFilters = () => {
    setAppliedStatus(status);
    setAppliedEmploymentType(employmentType);
    setAppliedSubject(subject);
    setAppliedSearch(search);
    setCurrentPage(1);
  };

  // Handle Clear Filters
  const handleClearFilters = () => {
    setStatus(undefined);
    setEmploymentType(undefined);
    setSubject('');
    setSearch('');

    setAppliedStatus(undefined);
    setAppliedEmploymentType(undefined);
    setAppliedSubject('');
    setAppliedSearch('');

    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6 space-y-6 min-h-screen">
      {/* Filters */}
      <TeacherFilters
        status={status}
        setStatus={setStatus}
        employmentType={employmentType}
        setEmploymentType={setEmploymentType}
        subject={subject}
        setSubject={setSubject}
        search={search}
        setSearch={setSearch}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      {/* Table */}
      {loading ? (
        <CardSkeleton count={rowsPerPage} />
      ) : teachers.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No teachers found 😕
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher._id}
              teacher={teacher}
              onView={() => setSelectedId(teacher._id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalPages={totalPages}
      />

      <UserIdDialog userType="Teacher" id={selectedId} setId={setSelectedId} />
    </div>
  );
}
