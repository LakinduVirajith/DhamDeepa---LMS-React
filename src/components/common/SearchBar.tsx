import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  placeholder: string;
  type?: string;
  onSearch: (id: string) => void;
  loading: boolean;
}

export default function SearchBar({
  placeholder,
  type,
  onSearch,
  loading,
}: SearchBarProps) {
  const [id, setId] = useState('');

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md flex gap-3">
      <Input
        placeholder={placeholder}
        value={id}
        onChange={(e) => setId(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(id)}
      />

      <Button onClick={() => onSearch(id)} disabled={loading}>
        {loading ? 'Loading...' : `Fetch ${type || 'Data'}`}
      </Button>
    </div>
  );
}
