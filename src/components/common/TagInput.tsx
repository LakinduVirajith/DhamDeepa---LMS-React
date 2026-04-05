import { useState } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  value = [],
  onChange,
  placeholder = 'Type and press Enter',
}: TagInputProps) {
  const [input, setInput] = useState('');

  const addTag = () => {
    const trimmed = input.trim();

    if (!trimmed) return;
    if (value.includes(trimmed)) return; // avoid duplicates

    onChange([...value, trimmed]);
    setInput('');
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="border rounded-lg p-2 flex flex-wrap gap-2">
      {/* Tags */}
      {value.map((tag, index) => (
        <span
          key={index}
          className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="hover:text-red-500"
          >
            <X size={14} />
          </button>
        </span>
      ))}

      {/* Input */}
      <input
        className="flex-1 outline-none bg-transparent text-sm min-w-[120px]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
          }
        }}
      />
    </div>
  );
}
