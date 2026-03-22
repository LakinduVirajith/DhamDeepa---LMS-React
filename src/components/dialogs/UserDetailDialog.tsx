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
import { useTheme } from '@/context/ThemeContext';

interface UserDetailDialogProps {
  user: any;
  setUser: (user: any) => void;
}

export default function UserDetailDialog({
  user,
  setUser,
}: UserDetailDialogProps) {
  const { darkMode } = useTheme();
  if (!user) return null;

  const truncateClerkId = (id: string) => {
    if (id.length <= 15) return id;
    return `${id.slice(0, 8)}...${id.slice(-6)}`;
  };

  return (
    <Dialog open={!!user} onOpenChange={() => setUser(null)}>
      <DialogContent
        className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} w-[400px] transition-colors duration-300`}
      >
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
            <strong>Clerk ID:</strong>
            <span className="truncate max-w-[180px]">
              {truncateClerkId(user.clerkId)}
              {'...'}
            </span>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  size="sm"
                  variant="outline"
                  className={`${
                    darkMode
                      ? 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600'
                      : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => navigator.clipboard.writeText(user.clerkId)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy Clerk ID</TooltipContent>
            </Tooltip>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
