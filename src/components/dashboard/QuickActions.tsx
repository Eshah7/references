import Link from 'next/link';
import { Link2, Star, Briefcase, User } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const actions = [
  {
    href: '/references/new',
    icon: Link2,
    label: 'Request Reference',
    description: 'Get a reference from a colleague',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    href: '/achievements/new',
    icon: Star,
    label: 'Log Achievement',
    description: 'Record an accomplishment',
    color: 'text-amber-700 bg-amber-50',
  },
  {
    href: '/career',
    icon: Briefcase,
    label: 'Update Career',
    description: 'Add a new role or promotion',
    color: 'text-purple-700 bg-purple-50',
  },
  {
    href: '/profile',
    icon: User,
    label: 'Edit Profile',
    description: 'Update your summary',
    color: 'text-[#666] bg-[#f5f5f5]',
  },
];

export function QuickActions() {
  return (
    <Card padding={false}>
      <div className="px-5 py-4 border-b border-[#eaeaea]">
        <h3 className="text-sm font-semibold text-[#111]">Quick Actions</h3>
      </div>
      <div className="divide-y divide-[#f2f2f2]">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#fafafa] transition-colors"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${action.color}`}>
              <action.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#111]">{action.label}</p>
              <p className="text-xs text-[#888]">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
