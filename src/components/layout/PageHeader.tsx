import { type ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  cta?: ReactNode;
}

export function PageHeader({ title, subtitle, cta }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#333]">
      <div>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-[#888] mt-1">{subtitle}</p>}
      </div>
      {cta && <div className="shrink-0">{cta}</div>}
    </div>
  );
}
