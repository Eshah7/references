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
        'bg-white border border-[#eaeaea] rounded-xl',
        'transition-all duration-150',
        padding && 'p-6',
        hover && 'hover:border-[#ccc] hover:shadow-sm cursor-pointer active:scale-[0.99]',
        onClick && 'cursor-pointer hover:border-[#ccc] hover:shadow-sm active:scale-[0.99]',
        className
      )}
    >
      {children}
    </div>
  );
}
