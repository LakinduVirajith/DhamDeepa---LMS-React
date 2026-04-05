import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CURRENCIES } from '@/constants/currencies';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from '@/components/ui/command';

import { ChevronDown } from 'lucide-react';

type Props = {
  value: {
    amount: number;
    currency: string;
  };
  onChange: (value: { amount: number; currency: string }) => void;
};

export default function SalaryInput({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* Currency Picker - Searchable */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[140px] justify-between">
            <span>{value.currency || 'Currency'}</span>
            <ChevronDown className="h-4 w-4 opacity-60" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Search currency..." />

            <CommandList>
              {CURRENCIES.map((c) => (
                <CommandItem
                  key={c.code}
                  onSelect={() => {
                    onChange({ ...value, currency: c.code });
                    setOpen(false);
                  }}
                >
                  <div className="flex justify-between w-full">
                    <span>{c.label}</span>
                    <span className="text-gray-400">{c.code}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Amount */}
      <Input
        type="number"
        value={value.amount}
        onChange={(e) =>
          onChange({
            ...value,
            amount: Number(e.target.value),
          })
        }
        placeholder="Salary amount"
      />
    </div>
  );
}
