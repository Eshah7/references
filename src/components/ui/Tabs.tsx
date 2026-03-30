'use client';

import { cn } from '@/lib/utils';

interface TabsProps {
  items: string[];
  active: string;
  onChange: (item: string) => void;
  className?: string;
}

export function Tabs({ items, active, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-1 border-b border-[#333]', className)}>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={cn(
            'px-4 py-2.5 text-sm font-medium transition-colors relative',
            active === item
              ? 'text-white'
              : 'text-[#888] hover:text-[#ccc]'
          )}
        >
          {item}
          {active === item && (
            <span className="absolute bottom-0 left-0 right-0 h-px bg-white" />
          )}
        </button>
      ))}
    </div>
  );
}
