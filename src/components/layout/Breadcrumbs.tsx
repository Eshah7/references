import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 text-sm mb-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#ccc]" />}
          {item.href ? (
            <Link href={item.href} className="text-[#888] hover:text-[#111] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#111]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
