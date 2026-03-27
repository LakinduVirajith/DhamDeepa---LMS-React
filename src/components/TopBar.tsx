import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import useTheme from '@/hooks/useTheme';

export default function TopBar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div
      className="
        h-14 px-4 
        sticky top-0 z-50 
        flex items-center justify-end gap-2
        border-b
        backdrop-blur-md
      "
    >
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="flex gap-2"
      >
        {darkMode ? <Sun /> : <Moon />}
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </Button>
    </div>
  );
}
