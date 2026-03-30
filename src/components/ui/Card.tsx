import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: boolean;
}

export function Card({ children, className, onClick, hover = false, padding = true }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-[#0a0a0a] border border-[#333] rounded-lg',
        padding && 'p-6',
        hover && 'hover:border-[#555] transition-colors cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
