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
  reference_requested: 'text-blue-400 bg-blue-500/10',
  reference_received: 'text-green-400 bg-green-500/10',
  achievement_added: 'text-yellow-400 bg-yellow-500/10',
  career_entry_added: 'text-purple-400 bg-purple-500/10',
  profile_updated: 'text-[#888] bg-[#222]',
};

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card padding={false}>
      <div className="px-5 py-4 border-b border-[#333]">
        <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
      </div>
      <div className="divide-y divide-[#1a1a1a]">
        {items.slice(0, 8).map((item) => {
          const Icon = iconMap[item.type];
          const color = colorMap[item.type];
          return (
            <div key={item.id} className="flex items-start gap-3 px-5 py-3.5">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white leading-snug">{item.title}</p>
                <p className="text-xs text-[#666] mt-0.5">{item.description}</p>
              </div>
              <span className="text-xs text-[#555] shrink-0 mt-0.5">{timeAgo(item.createdAt)}</span>
            </div>
          );
        })}
        {items.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-[#555]">No activity yet.</div>
        )}
      </div>
    </Card>
  );
}
