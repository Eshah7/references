'use client';

import { Link2, Star, Clock, Inbox } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useReferences } from '@/hooks/useReferences';
import { useAchievements } from '@/hooks/useAchievements';
import { useCareer } from '@/hooks/useCareer';
import { useActivity } from '@/hooks/useActivity';
import { totalCareerDuration } from '@/lib/utils';

export default function DashboardPage() {
  const { references } = useReferences();
  const { achievements } = useAchievements();
  const { career } = useCareer();
  const { activity } = useActivity();

  const received = references.filter((r) => r.status === 'received').length;
  const pending = references.filter((r) => r.status === 'pending').length;
  const careerDur = totalCareerDuration(career.map((c) => c.startDate));

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <PageHeader
        title="Dashboard"
        subtitle="Your career development overview"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <StatCard
          icon={Link2}
          value={received}
          label="References"
          delta={received > 0 ? `${references.length} total` : undefined}
        />
        <StatCard
          icon={Star}
          value={achievements.length}
          label="Achievements"
        />
        <StatCard
          icon={Clock}
          value={careerDur}
          label="Career Duration"
        />
        <StatCard
          icon={Inbox}
          value={pending}
          label="Pending Requests"
          deltaPositive={false}
        />
      </div>

      {/* Activity + Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <ActivityFeed items={activity} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
