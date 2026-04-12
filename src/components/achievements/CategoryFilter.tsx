'use client';

import { cn } from '@/lib/utils';
import type { AchievementCategory } from '@/types';

const CATEGORIES: { value: AchievementCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'technical', label: 'Technical' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'growth', label: 'Growth' },
  { value: 'award', label: 'Award' },
  { value: 'other', label: 'Other' },
];

interface CategoryFilterProps {
  active: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-full border transition-all',
            active === cat.value
              ? 'bg-[#111] text-white border-[#111]'
              : 'bg-transparent text-[#666] border-[#eaeaea] hover:border-[#ccc] hover:text-[#111]'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
