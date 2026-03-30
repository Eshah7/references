import { cn } from '@/lib/utils';

type BadgeVariant =
  | 'pending'
  | 'received'
  | 'expired'
  | 'transferable'
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
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  received: 'bg-green-500/10 text-green-400 border-green-500/20',
  expired: 'bg-red-500/10 text-red-400 border-red-500/20',
  transferable: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  technical: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  leadership: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  delivery: 'bg-green-500/10 text-green-400 border-green-500/20',
  collaboration: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  growth: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  award: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  other: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  'full-time': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  contract: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'part-time': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  internship: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  freelance: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  promotion: 'bg-green-500/10 text-green-400 border-green-500/20',
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
