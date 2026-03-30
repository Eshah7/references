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
        <label htmlFor={inputId} className="text-sm font-medium text-[#ccc]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#555]',
          'focus:outline-none focus:border-[#555] focus:ring-0 transition-colors',
          error && 'border-red-500/50',
          className
        )}
        {...props}
      />
      {hint && !error && <p className="text-xs text-[#666]">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
