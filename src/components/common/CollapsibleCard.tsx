import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CollapsibleCard({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 text-left"
      >
        <span className="font-semibold">{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Content */}
      {open && <div className="px-4 pb-4 text-sm">{children}</div>}
    </div>
  );
}
