'use client';

import { Link2, Star, Clock, Inbox, ShieldCheck, Brain, Repeat2 } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useReferences } from '@/hooks/useReferences';
import { useAchievements } from '@/hooks/useAchievements';
import { useCareer } from '@/hooks/useCareer';
import { useActivity } from '@/hooks/useActivity';
import { totalCareerDuration } from '@/lib/utils';

function MoatPillar({
  icon: Icon,
  color,
  title,
  description,
}: {
  icon: React.ElementType;
  color: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm font-semibold text-[#111]">{title}</p>
        <p className="text-xs text-[#666] mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { references } = useReferences();
  const { achievements } = useAchievements();
  const { career } = useCareer();
  const { activity } = useActivity();

  const received = references.filter((r) => r.status === 'received').length;
  const pending = references.filter((r) => r.status === 'pending').length;
  const verified = references.filter((r) => r.verificationStatus === 'verified').length;
  const flagged = references.filter((r) => r.verificationStatus === 'flagged').length;
  const portable = references.filter((r) => r.isTransferable).length;
  const careerDur = totalCareerDuration(career.map((c) => c.startDate));

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <PageHeader
        title="Dashboard"
        subtitle="Verified reference intelligence — proof, not promises."
      />

      {/* MOAT Banner */}
      <div className="mt-8 bg-[#fafafa] border border-[#eaeaea] rounded-xl p-5">
        <p className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">The Proof Layer — Vouch&apos;s Moat</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <MoatPillar
            icon={Brain}
            color="text-blue-600 bg-blue-50"
            title="Predictive Intelligence"
            description="Role-specific reference instruments correlated with on-job performance. Each reference gets a 0–100 Performance Predictor score."
          />
          <MoatPillar
            icon={ShieldCheck}
            color="text-emerald-700 bg-emerald-50"
            title="Anti-Fraud Infrastructure"
            description="Multi-signal referee verification: work email, org-graph match, IP/geolocation. Flags suspicious references before damage is done."
          />
          <MoatPillar
            icon={Repeat2}
            color="text-purple-700 bg-purple-50"
            title="Reusable Reference Passport"
            description="Verified references are portable — candidates carry them across jobs and contexts instead of repeating the process from scratch."
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <StatCard
          icon={Link2}
          value={received}
          label="References Received"
          delta={`${references.length} total`}
        />
        <StatCard
          icon={ShieldCheck}
          value={verified}
          label="Verified Referees"
          delta={flagged > 0 ? `${flagged} flagged` : undefined}
          deltaPositive={false}
        />
        <StatCard
          icon={Repeat2}
          value={portable}
          label="Portable References"
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
