'use client';

import { useCallback, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BanSelectProps {
  options: string[];
  selected: string;
  onSelect?: (ban: string) => void;
}

export const BanSelect = ({ options, selected, onSelect }: BanSelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (value: string) => {
      onSelect?.(value);
      setOpen(false);
    },
    [onSelect]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-40 justify-between"
        >
          {selected}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>No ban date found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-80">
              {options.map((banDate) => (
                <CommandItem key={banDate} onSelect={handleSelect}>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected === banDate ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {banDate}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
