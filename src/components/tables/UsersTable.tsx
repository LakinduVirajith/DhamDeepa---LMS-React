import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { roleColor, statusColor } from '@/utils/tableHelpers';
import { formatDate } from '@/utils/dateHelpers';

interface UsersTableProps {
  users: any[];
  selectedUser: any;
  setSelectedUser: (user: any) => void;
  hoveredUserId: string | null;
  setHoveredUserId: (id: string | null) => void;
}

export default function UsersTable({
  users,
  selectedUser,
  setSelectedUser,
  hoveredUserId,
  setHoveredUserId,
}: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
          {[
            'Name',
            'Email',
            'Role',
            'Status',
            'Signed Up',
            'Last Updated',
            'Actions',
          ].map((h) => (
            <TableHead key={h}>{h}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user._id}
            className={`cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 ${selectedUser?._id === user._id ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
            onMouseEnter={() => setHoveredUserId(user._id)}
            onMouseLeave={() => setHoveredUserId(null)}
            onClick={() => setSelectedUser(user)}
          >
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant={roleColor(user.role)}>{user.role}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={statusColor(user.status)}>{user.status}</Badge>
            </TableCell>
            <TableCell>{formatDate(user.createdAt)}</TableCell>
            <TableCell>{formatDate(user.updatedAt)}</TableCell>
            <TableCell className="flex gap-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
              {(hoveredUserId === user._id ||
                selectedUser?._id === user._id) && (
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedUser(user)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View User Details</TooltipContent>
                </Tooltip>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
