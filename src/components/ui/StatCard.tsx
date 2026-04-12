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
        <Icon className="w-4 h-4 text-[#999]" />
        {delta && (
          <span className={cn('text-xs', deltaPositive ? 'text-green-600' : 'text-red-500')}>
            {delta}
          </span>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-[#111] tracking-tight">{value}</p>
        <p className="text-sm text-[#666] mt-1">{label}</p>
      </div>
    </Card>
  );
}
