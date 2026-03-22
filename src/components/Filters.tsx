import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  USER_ROLES,
  USER_STATUS,
  type UserRole,
  type UserStatus,
} from '@/constants/enums';

interface FiltersProps {
  roleFilter?: UserRole;
  setRoleFilter: (role?: UserRole) => void;
  statusFilter?: UserStatus;
  setStatusFilter: (status?: UserStatus) => void;
  searchFilter: string;
  setSearchFilter: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export default function Filters({
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  searchFilter,
  setSearchFilter,
  onApply,
  onClear,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md transition-colors duration-300">
      <Input
        placeholder="Search by name or email..."
        className="w-[250px]"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      />

      <Select
        value={roleFilter}
        onValueChange={(v) => setRoleFilter(v as UserRole)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(USER_ROLES).map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={statusFilter}
        onValueChange={(v) => setStatusFilter(v as UserStatus)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(USER_STATUS).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="ml-auto" onClick={onApply}>
        Apply Filters
      </Button>
      <Button variant="outline" onClick={onClear}>
        Clear Filters
      </Button>
    </div>
  );
}
