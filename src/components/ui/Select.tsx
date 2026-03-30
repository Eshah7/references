import { cn } from '@/lib/utils';
import { type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-[#ccc]">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white',
          'focus:outline-none focus:border-[#555] transition-colors cursor-pointer',
          'appearance-none',
          error && 'border-red-500/50',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#111]">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
