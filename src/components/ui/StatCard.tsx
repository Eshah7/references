import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  delta?: string;
  deltaPositive?: boolean;
  className?: string;
}

export function StatCard({ icon: Icon, value, label, delta, deltaPositive = true, className }: StatCardProps) {
  return (
    <Card className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between">
        <Icon className="w-4 h-4 text-[#555]" />
        {delta && (
          <span className={cn('text-xs', deltaPositive ? 'text-green-400' : 'text-red-400')}>
            {delta}
          </span>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
        <p className="text-sm text-[#888] mt-1">{label}</p>
      </div>
    </Card>
  );
}
