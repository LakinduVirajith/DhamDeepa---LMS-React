import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { USER_STATUS, type UserStatus } from '@/constants/enums';
import type { EmploymentType } from '@/constants/enums';

interface TeacherFiltersProps {
  status?: UserStatus;
  setStatus: (v?: UserStatus) => void;
  employmentType?: EmploymentType;
  setEmploymentType: (v?: EmploymentType) => void;
  subject?: string;
  setSubject: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export default function TeacherFilters({
  status,
  setStatus,
  employmentType,
  setEmploymentType,
  subject,
  setSubject,
  search,
  setSearch,
  onApply,
  onClear,
}: TeacherFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md">
      {/* Search */}
      <Input
        placeholder="Search by name or email..."
        className="w-[220px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Status */}
      <Select
        value={status || ''}
        onValueChange={(v) => setStatus(v ? (v as UserStatus) : undefined)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(USER_STATUS).map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Employment Type */}
      <Select
        value={employmentType || ''}
        onValueChange={(v) =>
          setEmploymentType(v ? (v as EmploymentType) : undefined)
        }
      >
        <SelectTrigger className="w-[170px]">
          <SelectValue placeholder="Employment Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="FULL_TIME">Full Time</SelectItem>
          <SelectItem value="PART_TIME">Part Time</SelectItem>
          <SelectItem value="VISITING">Visiting</SelectItem>
        </SelectContent>
      </Select>

      {/* Subject */}
      <Input
        placeholder="Subject (e.g. Math)"
        className="w-[180px]"
        value={subject || ''}
        onChange={(e) => setSubject(e.target.value)}
      />

      {/* Actions */}
      <Button className="ml-auto" onClick={onApply}>
        Apply Filters
      </Button>

      <Button variant="outline" onClick={onClear}>
        Clear Filters
      </Button>
    </div>
  );
}
