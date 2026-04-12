import { cn } from '@/lib/utils';

type BadgeVariant =
  | 'pending'
  | 'received'
  | 'expired'
  | 'transferable'
  | 'verified'
  | 'flagged'
  | 'technical'
  | 'leadership'
  | 'delivery'
  | 'collaboration'
  | 'growth'
  | 'award'
  | 'other'
  | 'full-time'
  | 'contract'
  | 'part-time'
  | 'internship'
  | 'freelance'
  | 'promotion';

const variantClasses: Record<BadgeVariant, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  received: 'bg-green-50 text-green-700 border-green-200',
  expired: 'bg-red-50 text-red-600 border-red-200',
  transferable: 'bg-blue-50 text-blue-600 border-blue-200',
  verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  flagged: 'bg-red-50 text-red-600 border-red-200',
  technical: 'bg-purple-50 text-purple-700 border-purple-200',
  leadership: 'bg-orange-50 text-orange-700 border-orange-200',
  delivery: 'bg-green-50 text-green-700 border-green-200',
  collaboration: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  growth: 'bg-pink-50 text-pink-700 border-pink-200',
  award: 'bg-amber-50 text-amber-700 border-amber-200',
  other: 'bg-gray-50 text-gray-600 border-gray-200',
  'full-time': 'bg-blue-50 text-blue-600 border-blue-200',
  contract: 'bg-orange-50 text-orange-700 border-orange-200',
  'part-time': 'bg-purple-50 text-purple-700 border-purple-200',
  internship: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  freelance: 'bg-pink-50 text-pink-700 border-pink-200',
  promotion: 'bg-green-50 text-green-700 border-green-200',
};

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border',
        variantClasses[variant] ?? variantClasses.other,
        className
      )}
    >
      {children}
    </span>
  );
}
