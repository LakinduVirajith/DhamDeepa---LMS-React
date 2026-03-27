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
import { formatDate } from '@/utils/dateHelpers';

interface UsersTableProps {
  users: any[];
  selectedUser: any;
  setSelectedUser: (user: any) => void;
}

export default function UserManagementTable({
  users,
  selectedUser,
  setSelectedUser,
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
            className={`cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors ${selectedUser?._id === user._id ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
            onClick={() => setSelectedUser(user)}
          >
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge>{user.role}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{user.status}</Badge>
            </TableCell>
            <TableCell>{formatDate(user.createdAt)}</TableCell>
            <TableCell>{formatDate(user.updatedAt)}</TableCell>
            <TableCell className="opacity-0 hover:opacity-100 transition-opacity">
              <Tooltip>
                <TooltipTrigger>
                  <Button size="sm" onClick={() => setSelectedUser(user)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View User Details</TooltipContent>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
