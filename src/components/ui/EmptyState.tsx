import { type LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-[#f5f5f5] border border-[#eaeaea] flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-[#999]" />
        </div>
      )}
      <p className="text-sm font-medium text-[#111]">{title}</p>
      {description && <p className="text-sm text-[#888] mt-1 max-w-xs">{description}</p>}
      {action && (actionHref || onAction) && (
        <div className="mt-4">
          {actionHref ? (
            <Button href={actionHref} variant="secondary" size="sm">
              {action}
            </Button>
          ) : (
            <Button onClick={onAction} variant="secondary" size="sm">
              {action}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
