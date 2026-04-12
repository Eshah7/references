import { cn } from '@/lib/utils';
import Link from 'next/link';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: ReactNode;
}

const variantClasses = {
  primary: 'bg-[#111] text-white hover:bg-[#222] active:bg-[#333] border border-transparent shadow-sm',
  secondary: 'bg-white text-[#111] border border-[#eaeaea] hover:border-[#ccc] hover:bg-[#fafafa] active:bg-[#f0f0f0]',
  ghost: 'bg-transparent text-[#666] hover:text-[#111] border border-transparent hover:border-[#eaeaea] hover:bg-[#fafafa] active:bg-[#f0f0f0]',
  danger: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 active:bg-red-200',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
    'transition-all duration-150 cursor-pointer',
    'active:scale-[0.97]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
