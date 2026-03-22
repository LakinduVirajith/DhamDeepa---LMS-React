import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/react';
import { getAllUsers, getUserStats } from '@/api/user.api';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import StatsBadges from '@/components/StatsBadges';
import Filters from '@/components/Filters';
import UsersTable from '@/components/tables/UsersTable';
import LoadingTableSkeleton from '@/components/tables/LoadingTableSkeleton';
import UserDetailDialog from '@/components/dialogs/UserDetailDialog';
import Pagination from '@/components/tables/Pagination';
import type { UserRole, UserStatus } from '@/constants/enums';
import { useTheme } from '@/context/ThemeContext';

export default function UserManagementPage() {
  const { getToken } = useAuth();

  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [hoveredUserId, setHoveredUserId] = useState<string | null>(null);

  const [roleFilter, setRoleFilter] = useState<UserRole>();
  const [statusFilter, setStatusFilter] = useState<UserStatus>();
  const [searchFilter, setSearchFilter] = useState('');

  const [appliedRoleFilter, setAppliedRoleFilter] = useState<UserRole>();
  const [appliedStatusFilter, setAppliedStatusFilter] = useState<UserStatus>();
  const [appliedSearchFilter, setAppliedSearchFilter] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { darkMode, toggleTheme } = useTheme();

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = await getToken({ template: 'dhamdeepa-auth' });
      if (!token) return;

      const [statsRes, usersRes] = await Promise.all([
        getUserStats(token),
        getAllUsers(token, {
          role: appliedRoleFilter,
          status: appliedStatusFilter,
          search: appliedSearchFilter,
          page: currentPage,
        }),
      ]);

      setStats(statsRes);
      setUsers(usersRes.users);
      setTotalPages(usersRes.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    appliedRoleFilter,
    appliedStatusFilter,
    appliedSearchFilter,
    currentPage,
  ]);

  const handleBadgeFilter = (filter: string) => {
    if (!filter) return;
    if (['Admin', 'Teacher', 'Prefect'].includes(filter)) {
      setAppliedRoleFilter(filter as UserRole);
      setAppliedStatusFilter(undefined);
    } else {
      setAppliedStatusFilter(filter as UserStatus);
      setAppliedRoleFilter(undefined);
    }
    setAppliedSearchFilter('');
    setRoleFilter(undefined);
    setStatusFilter(undefined);
    setSearchFilter('');
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    setAppliedRoleFilter(roleFilter);
    setAppliedStatusFilter(statusFilter);
    setAppliedSearchFilter(searchFilter);
    setCurrentPage(1);
  };

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
    <div
      className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-6 space-y-6 min-h-screen transition-colors duration-300`}
    >
      {/* Theme Toggle */}
      <div className="flex justify-end mb-2">
        <Button variant="outline" size="sm" onClick={() => toggleTheme()}>
          {darkMode ? (
            <Sun className="w-4 h-4 mr-1" />
          ) : (
            <Moon className="w-4 h-4 mr-1" />
          )}
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Button>
      </div>

      <StatsBadges stats={stats} onFilterClick={handleBadgeFilter} />
      <Filters
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto transition-colors duration-300">
        {loading ? (
          <LoadingTableSkeleton />
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-gray-500 space-y-2">
            <p>No users found 😕</p>
          </div>
        ) : (
          <UsersTable
            users={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            hoveredUserId={hoveredUserId}
            setHoveredUserId={setHoveredUserId}
          />
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <UserDetailDialog user={selectedUser} setUser={setSelectedUser} />
    </div>
  );
}
