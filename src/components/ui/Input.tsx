import { cn } from '@/lib/utils';
import { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[#444]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full bg-white border border-[#eaeaea] rounded-lg px-3 py-2 text-sm text-[#111] placeholder:text-[#999]',
          'focus:outline-none focus:border-[#999] focus:ring-2 focus:ring-[#0070f3]/10 transition-all duration-150',
          error && 'border-red-400',
          className
        )}
        {...props}
      />
      {hint && !error && <p className="text-xs text-[#888]">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
