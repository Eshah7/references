'use client';

import { useState } from 'react';
import { Users, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { useCandidates } from '@/hooks/useCandidates';
import Link from 'next/link';
import type { ReviewStage } from '@/types';

const TABS = ['All', 'Screening', 'Shortlisted', 'Ref Check', 'Offer', 'Rejected'];

const STAGE_LABELS: Record<ReviewStage, string> = {
  screening: 'Screening',
  shortlisted: 'Shortlisted',
  reference_check: 'Ref Check',
  offer: 'Offer',
  rejected: 'Rejected',
};

const STAGE_VARIANT: Record<ReviewStage, 'other' | 'transferable' | 'pending' | 'verified' | 'expired'> = {
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

function VerificationSummary({ refs }: { refs: { verificationStatus?: string }[] }) {
  const verified = refs.filter((r) => r.verificationStatus === 'verified').length;
  const flagged = refs.filter((r) => r.verificationStatus === 'flagged').length;
  const total = refs.length;

  if (flagged > 0) return <span title="Fraud flag detected"><ShieldAlert className="w-4 h-4 text-red-500" /></span>;
  if (verified === total && total > 0) return <span title="All verified"><ShieldCheck className="w-4 h-4 text-emerald-600" /></span>;
  return <span title="Pending verification"><Shield className="w-4 h-4 text-[#ccc]" /></span>;
}

export default function CandidatesPage() {
  const { candidates } = useCandidates();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = candidates.filter((c) => {
    if (activeTab === 'All') return true;
    return STAGE_LABELS[c.stage] === activeTab;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <PageHeader
        title="Candidates"
        subtitle="Review reference passports and proof layer scores for each candidate"
      />

      <Tabs items={TABS} active={activeTab} onChange={setActiveTab} className="mt-6" />

      <Card padding={false} className="mt-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#eaeaea]">
              <th className="px-5 py-3 text-left text-xs font-medium text-[#999] uppercase tracking-wider">Candidate</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[#999] uppercase tracking-wider">Role / Req</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[#999] uppercase tracking-wider">Stage</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[#999] uppercase tracking-wider" title="Avg Performance Predictor Score">Avg Score</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[#999] uppercase tracking-wider">References</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[#999] uppercase tracking-wider">Verify</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const scores = c.references.map((r) => r.performancePredictorScore);
              const score = avgScore(scores);
              const received = c.references.filter((r) => r.status === 'received').length;
              const isFlagged = c.references.some((r) => r.verificationStatus === 'flagged');

              return (
                <tr
                  key={c.id}
                  className={`border-b border-[#f2f2f2] hover:bg-[#fafafa] transition-colors ${
                    isFlagged ? 'bg-red-50/30' : ''
                  }`}
                >
                  <td className="px-5 py-4">
                    <Link href={`/recruiter/candidates/${c.id}`} className="group">
                      <p className="text-sm font-medium text-[#111] group-hover:text-accent transition-colors">
                        {c.candidateName}
                      </p>
                      <p className="text-xs text-[#888] mt-0.5">{c.candidateCurrentTitle}</p>
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-[#444]">{c.appliedRole}</p>
                    <p className="text-xs text-[#888] font-mono mt-0.5">{c.reqNumber}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={STAGE_VARIANT[c.stage]}>{STAGE_LABELS[c.stage]}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    {score !== null ? (
                      <span className={`text-sm font-semibold ${
                        score >= 80 ? 'text-emerald-700' :
                        score >= 60 ? 'text-amber-700' :
                        'text-red-600'
                      }`}>
                        {score}
                        <span className="text-xs font-normal text-[#999]">/100</span>
                      </span>
                    ) : (
                      <span className="text-sm text-[#999]">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-[#444]">
                      {received}/{c.references.length}
                    </span>
                    <span className="text-xs text-[#888]"> received</span>
                  </td>
                  <td className="px-5 py-4">
                    <VerificationSummary refs={c.references} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-[#999]">
            No candidates in this stage.
          </div>
        )}
      </Card>
    </div>
  );
}
