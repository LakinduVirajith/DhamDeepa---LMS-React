import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { formatDateTime } from '@/utils/dateHelpers';
import type { User } from '@/constants/types';

interface UserDetailsDialogProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function UserDetailDialog({
  user,
  setUser,
}: UserDetailsDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={!!user} onOpenChange={() => setUser(null)}>
      <DialogContent className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white w-[400px] transition-colors duration-300">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>View detailed user information</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Status:</strong> {user.status}
          </p>
          <p>
            <strong>Signed Up:</strong> {formatDateTime(user.createdAt)}
          </p>
          <p>
            <strong>Last Updated:</strong> {formatDateTime(user.updatedAt)}
          </p>
          <p className="flex items-center gap-2">
            <strong>User ID:</strong> {user._id}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  onClick={() => navigator.clipboard.writeText(user._id)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy User ID</TooltipContent>
            </Tooltip>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
