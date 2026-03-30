'use client';

import { cn } from '@/lib/utils';

interface RatingInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function RatingInput({ label, value, onChange }: RatingInputProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm text-[#ccc]">{label}</label>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              'w-8 h-8 rounded-full text-xs font-semibold transition-all border',
              value >= n
                ? 'bg-accent border-accent text-white'
                : 'bg-transparent border-[#333] text-[#555] hover:border-[#555] hover:text-[#888]'
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
