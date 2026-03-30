import { cn } from '@/lib/utils';
import { type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, className, id, ...props }: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-[#ccc]">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#555]',
          'focus:outline-none focus:border-[#555] transition-colors resize-none',
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
