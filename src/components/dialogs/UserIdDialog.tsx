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
import { toast } from 'sonner';

interface UserIdDialogProps {
  userType: string;
  id: string | null;
  setId: (string: string | null) => void;
}

export default function UserIdDialog({
  userType,
  id,
  setId,
}: UserIdDialogProps) {
  if (!id) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      toast.success('User ID copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy User ID');
    }
  };

  return (
    <Dialog open={!!id} onOpenChange={() => setId(null)}>
      <DialogContent className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-[380px]">
        <DialogHeader>
          <DialogTitle>{userType} ID</DialogTitle>
          <DialogDescription>
            {userType === 'User'
              ? 'Copy this ID to manage user access or share with admin tools.'
              : 'Copy this ID to manage teacher profile or share with admin tools.'}
          </DialogDescription>
        </DialogHeader>

        {/* ID */}
        <div className="mt-4 flex items-center justify-between gap-2 bg-gray-200 dark:bg-gray-700 p-3 rounded-md">
          <span className="text-sm font-mono break-all">{id}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={handleCopy}>
                <Copy className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy {userType} ID</TooltipContent>
          </Tooltip>
        </div>
      </DialogContent>
    </Dialog>
  );
}
