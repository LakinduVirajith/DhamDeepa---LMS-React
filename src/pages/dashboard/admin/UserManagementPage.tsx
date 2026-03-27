import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/react';
import { getAllUsers, getUserStats } from '@/api/user.api';
import StatisticBadges from '@/components/common/StatisticBadges';
import UserManagementFilters from '@/components/filters/UserManagementFilters';
import UserManagementTable from '@/components/tables/UserManagementTable';
import LoadingTableSkeleton from '@/components/common/LoadingTableSkeleton';
import UserDetailsDialog from '@/components/dialogs/UserDetailsDialog';
import Pagination from '@/components/common/Pagination';
import type { UserRole, UserStatus } from '@/constants/enums';
import type { User, UserStats } from '@/constants/types';

export default function UserManagementPage() {
  const { getToken } = useAuth();

  // Data
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [roleFilter, setRoleFilter] = useState<UserRole>();
  const [statusFilter, setStatusFilter] = useState<UserStatus>();
  const [searchFilter, setSearchFilter] = useState('');

  // Applied filters
  const [appliedRoleFilter, setAppliedRoleFilter] = useState<UserRole>();
  const [appliedStatusFilter, setAppliedStatusFilter] = useState<UserStatus>();
  const [appliedSearchFilter, setAppliedSearchFilter] = useState('');

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

      const [statisticsRes, usersRes] = await Promise.all([
        getUserStats(token),
        getAllUsers(token, {
          role: appliedRoleFilter,
          status: appliedStatusFilter,
          search: appliedSearchFilter,
          page: currentPage,
          limit: rowsPerPage,
        }),
      ]);

      setStats(statisticsRes);
      setUsers(usersRes.users);
      setTotalPages(usersRes.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when filters or pagination change
  useEffect(() => {
    fetchData();
  }, [
    appliedRoleFilter,
    appliedStatusFilter,
    appliedSearchFilter,
    currentPage,
    rowsPerPage,
  ]);

  // Handle filters
  const handleApplyFilters = () => {
    setAppliedRoleFilter(roleFilter);
    setAppliedStatusFilter(statusFilter);
    setAppliedSearchFilter(searchFilter);
    setCurrentPage(1);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setRoleFilter(undefined);
    setStatusFilter(undefined);
    setSearchFilter('');
    setAppliedRoleFilter(undefined);
    setAppliedStatusFilter(undefined);
    setAppliedSearchFilter('');
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white p-6 space-y-6 min-h-screen">
      <StatisticBadges stats={stats} />
      <UserManagementFilters
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
        {loading ? (
          <LoadingTableSkeleton
            columns={[
              'Name',
              'Email',
              'Role',
              'Status',
              'Signed Up',
              'Last Updated',
              'Actions',
            ]}
            rows={10}
          />
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-gray-500 space-y-2">
            <p>No users found 😕</p>
          </div>
        ) : (
          <UserManagementTable
            users={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalPages={totalPages}
      />
      <UserDetailsDialog user={selectedUser} setUser={setSelectedUser} />
    </div>
  );
}
