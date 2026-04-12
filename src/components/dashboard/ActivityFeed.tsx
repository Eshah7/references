import { type ActivityItem } from '@/types';
import { timeAgo } from '@/lib/utils';
import {
  Link2,
  Star,
  Briefcase,
  User,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';

const iconMap = {
  reference_requested: Link2,
  reference_received: CheckCircle2,
  achievement_added: Star,
  career_entry_added: Briefcase,
  profile_updated: User,
};

const colorMap = {
  reference_requested: 'text-blue-600 bg-blue-50',
  reference_received: 'text-green-700 bg-green-50',
  achievement_added: 'text-amber-700 bg-amber-50',
  career_entry_added: 'text-purple-700 bg-purple-50',
  profile_updated: 'text-[#666] bg-[#f5f5f5]',
};

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card padding={false}>
      <div className="px-5 py-4 border-b border-[#eaeaea]">
        <h3 className="text-sm font-semibold text-[#111]">Recent Activity</h3>
      </div>
      <div className="divide-y divide-[#f2f2f2]">
        {items.slice(0, 8).map((item) => {
          const Icon = iconMap[item.type];
          const color = colorMap[item.type];
          return (
            <div key={item.id} className="flex items-start gap-3 px-5 py-3.5 transition-colors duration-100 hover:bg-[#fafafa]">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#111] leading-snug">{item.title}</p>
                <p className="text-xs text-[#888] mt-0.5">{item.description}</p>
              </div>
              <span className="text-xs text-[#999] shrink-0 mt-0.5">{timeAgo(item.createdAt)}</span>
            </div>
          );
        })}
        {items.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-[#999]">No activity yet.</div>
        )}
      </div>
    </Card>
  );
}
