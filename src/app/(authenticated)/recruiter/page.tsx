'use client';

import { Users, ShieldCheck, ShieldAlert, Brain, TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useCandidates } from '@/hooks/useCandidates';
import Link from 'next/link';
import type { ReviewStage } from '@/types';

const STAGE_LABELS: Record<ReviewStage, string> = {
  screening: 'Screening',
  shortlisted: 'Shortlisted',
  reference_check: 'Ref Check',
  offer: 'Offer',
  rejected: 'Rejected',
};

const STAGE_VARIANT: Record<ReviewStage, 'pending' | 'received' | 'expired' | 'transferable' | 'verified' | 'flagged' | 'other'> = {
  screening: 'other',
  shortlisted: 'transferable',
  reference_check: 'pending',
  offer: 'verified',
  rejected: 'expired',
};

function avgScore(scores: (number | undefined)[]): number | null {
  const valid = scores.filter((s): s is number => s !== undefined);
  if (!valid.length) return null;
  return Math.round(valid.reduce((a, b) => a + b, 0) / valid.length);
}

export default function RecruiterOverviewPage() {
  const { candidates } = useCandidates();

  const active = candidates.filter((c) => c.stage !== 'rejected');
  const flagged = candidates.filter((c) =>
    c.references.some((r) => r.verificationStatus === 'flagged')
  );
  const verified = candidates.filter((c) =>
    c.references.every((r) => r.status !== 'received' || r.verificationStatus === 'verified')
  );
  const offerStage = candidates.filter((c) => c.stage === 'offer');

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <PageHeader
        title="Recruiter Overview"
        subtitle="Jordan Park · Senior TA Lead, Meridian Tech"
        cta={
          <Link
            href="/recruiter/candidates"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#111] text-white rounded-lg hover:bg-[#333] transition-colors"
          >
            <Users className="w-4 h-4" />
            View All Candidates
          </Link>
        }
      />

      {/* Persona context */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Persona Context</p>
        <p className="text-sm text-amber-800 leading-relaxed">
          <strong>The pain:</strong> Drowning in AI-amplified application volume — resumes are polished but untrustworthy.{' '}
          <strong>Job-to-be-done:</strong> &ldquo;I need proof, not promises — a fast, verified way to see how candidates actually performed so I can advocate for the right hire with confidence.&rdquo;
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <StatCard icon={Users} value={active.length} label="Active Candidates" delta={`${candidates.length} total`} />
        <StatCard icon={ShieldCheck} value={verified.length} label="Clean References" deltaPositive={true} />
        <StatCard
          icon={ShieldAlert}
          value={flagged.length}
          label="Fraud Flags"
          delta={flagged.length > 0 ? 'Review needed' : undefined}
          deltaPositive={false}
        />
        <StatCard icon={TrendingUp} value={offerStage.length} label="At Offer Stage" />
      </div>

      {/* Recent candidate activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <Card padding={false}>
            <div className="px-5 py-4 border-b border-[#eaeaea]">
              <h3 className="text-sm font-semibold text-[#111]">Pipeline</h3>
            </div>
            <div className="divide-y divide-[#f2f2f2]">
              {candidates.map((c) => {
                const scores = c.references.map((r) => r.performancePredictorScore);
                const score = avgScore(scores);
                const fraudCount = c.references.filter((r) => r.verificationStatus === 'flagged').length;
                const verifiedCount = c.references.filter((r) => r.verificationStatus === 'verified').length;

                return (
                  <Link
                    key={c.id}
                    href={`/recruiter/candidates/${c.id}`}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#fafafa] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-[#111]">{c.candidateName}</p>
                        {fraudCount > 0 && <ShieldAlert className="w-3.5 h-3.5 text-red-500" />}
                      </div>
                      <p className="text-xs text-[#888] mt-0.5">{c.appliedRole} · {c.reqNumber}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {score !== null && (
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${
                          score >= 80 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
                          score >= 60 ? 'text-amber-700 bg-amber-50 border-amber-200' :
                          'text-red-600 bg-red-50 border-red-200'
                        }`}>
                          {score}
                        </span>
                      )}
                      <span className="text-xs text-[#888]">{verifiedCount}/{c.references.length} verified</span>
                      <Badge variant={STAGE_VARIANT[c.stage]}>{STAGE_LABELS[c.stage]}</Badge>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>

        {/* MOAT summary */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">Proof Layer Active</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-[#444]">Predictive Intel</span>
                </div>
                <span className="text-xs font-semibold text-blue-600">ON</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-[#444]">Anti-Fraud</span>
                </div>
                <span className="text-xs font-semibold text-emerald-600">ON</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-[#444]">Ref Passport</span>
                </div>
                <span className="text-xs font-semibold text-purple-600">ON</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#f2f2f2]">
              <p className="text-xs text-[#666]">
                {flagged.length} fraud flag{flagged.length !== 1 ? 's' : ''} detected this cycle — estimated <strong className="text-[#111]">${flagged.length * 60}K</strong> in bad-hire costs avoided.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
