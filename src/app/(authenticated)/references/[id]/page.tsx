'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Repeat2, CheckCircle2, Clock, Star, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ShareLinkBox } from '@/components/references/ShareLinkBox';
import { useReferences } from '@/hooks/useReferences';
import { formatDate, timeAgo } from '@/lib/utils';
import type { ReferenceRatings, VerificationStatus } from '@/types';

const RATING_LABELS: Record<keyof ReferenceRatings, string> = {
  overall: 'Overall',
  technical: 'Technical Skills',
  communication: 'Communication',
  leadership: 'Leadership',
  teamwork: 'Teamwork',
};

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#888] w-28 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-[#111] w-4">{value}</span>
    </div>
  );
}

function VerificationCard({ status, details }: {
  status?: VerificationStatus;
  details?: { workEmailConfirmed: boolean; orgGraphMatch: boolean; ipVerified: boolean };
}) {
  const Icon = status === 'verified' ? ShieldCheck : status === 'flagged' ? ShieldAlert : Shield;
  const iconColor = status === 'verified' ? 'text-emerald-600' : status === 'flagged' ? 'text-red-500' : 'text-[#999]';
  const label = status === 'verified' ? 'Referee Verified' : status === 'flagged' ? 'Verification Flagged' : 'Not Verified';
  const labelColor = status === 'verified' ? 'text-emerald-700' : status === 'flagged' ? 'text-red-600' : 'text-[#666]';

  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <h3 className={`text-xs font-semibold uppercase tracking-wider ${labelColor}`}>{label}</h3>
      </div>
      {details ? (
        <dl className="space-y-2">
          <CheckRow label="Work email confirmed" ok={details.workEmailConfirmed} />
          <CheckRow label="Org-graph match" ok={details.orgGraphMatch} />
          <CheckRow label="IP / geolocation verified" ok={details.ipVerified} />
        </dl>
      ) : (
        <p className="text-xs text-[#888]">Verification pending — link not yet opened.</p>
      )}
      {status === 'flagged' && (
        <p className="mt-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1.5">
          One or more verification checks failed. Review before proceeding with this candidate.
        </p>
      )}
    </Card>
  );
}

function CheckRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-xs text-[#666]">{label}</dt>
      <dd className={`text-xs font-medium ${ok ? 'text-emerald-700' : 'text-red-500'}`}>
        {ok ? 'Pass' : 'Fail'}
      </dd>
    </div>
  );
}

function PredictorScoreCard({ score }: { score?: number }) {
  if (score === undefined) return null;
  const band = score >= 80 ? 'High signal' : score >= 60 ? 'Moderate signal' : 'Low signal';
  const barColor = score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-400' : 'bg-red-400';
  const textColor = score >= 80 ? 'text-emerald-700' : score >= 60 ? 'text-amber-700' : 'text-red-600';

  return (
    <Card>
      <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">
        Performance Predictor
      </h3>
      <div className="flex items-end gap-2 mb-2">
        <span className={`text-3xl font-bold ${textColor}`}>{score}</span>
        <span className="text-xs text-[#888] mb-1">/100</span>
      </div>
      <div className="w-full h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden mb-2">
        <div className={`h-full ${barColor} rounded-full`} style={{ width: `${score}%` }} />
      </div>
      <p className={`text-xs font-medium ${textColor}`}>{band}</p>
      <p className="text-xs text-[#999] mt-1">
        Composite score based on ratings, structured question depth, and referee verification.
      </p>
    </Card>
  );
}

export default function ReferenceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const isNew = searchParams.get('new') === '1';
  const { getById } = useReferences();
  const ref = getById(id);

  if (!ref) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Breadcrumbs items={[{ label: 'References', href: '/references' }, { label: ref.refereeName }]} />

      {isNew && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <p className="text-sm text-green-700">
            Reference request created! Copy the link below and send it to {ref.refereeName}.
          </p>
        </div>
      )}

      <PageHeader
        title={ref.refereeName}
        subtitle={`${ref.refereeTitle} · ${ref.refereeCompany}`}
        cta={
          <div className="flex items-center gap-2">
            <Badge variant={ref.status}>{ref.status}</Badge>
            {ref.isTransferable && (
              <Badge variant="transferable">
                <Repeat2 className="w-2.5 h-2.5" />
                portable
              </Badge>
            )}
            {ref.verificationStatus === 'flagged' && (
              <Badge variant="flagged">fraud risk</Badge>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          {/* Recommendation */}
          {ref.recommendation ? (
            <Card>
              <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">
                Written Recommendation
              </h3>
              <p className="text-[#444] leading-relaxed text-sm">&ldquo;{ref.recommendation}&rdquo;</p>

              {ref.strengths && ref.strengths.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#f2f2f2]">
                  <p className="text-xs text-[#999] mb-2">Key Strengths</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ref.strengths.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-[#f5f5f5] border border-[#eaeaea] text-[#666]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {ref.wouldHireAgain !== undefined && (
                <div className="mt-4 pt-4 border-t border-[#f2f2f2] flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs text-[#666]">
                    {ref.wouldHireAgain
                      ? 'Would hire or work with again'
                      : 'Would not specifically recommend for re-hire'}
                  </span>
                </div>
              )}
            </Card>
          ) : (
            <Card>
              <div className="flex items-center gap-3 py-4">
                <Clock className="w-5 h-5 text-[#ccc]" />
                <div>
                  <p className="text-sm font-medium text-[#111]">Waiting for response</p>
                  <p className="text-xs text-[#888] mt-0.5">
                    {ref.refereeName} hasn&apos;t submitted their reference yet.
                    Expires {formatDate(ref.expiresAt)}.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Context note */}
          {ref.contextNote && (
            <Card>
              <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">
                Context Note Sent
              </h3>
              <p className="text-sm text-[#666] leading-relaxed">{ref.contextNote}</p>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Performance Predictor */}
          <PredictorScoreCard score={ref.performancePredictorScore} />

          {/* Ratings */}
          {ref.ratings && (
            <Card>
              <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">
                Ratings
              </h3>
              <div className="space-y-3">
                {(Object.keys(RATING_LABELS) as (keyof ReferenceRatings)[]).map((key) => (
                  <RatingBar key={key} label={RATING_LABELS[key]} value={ref.ratings![key]} />
                ))}
              </div>
            </Card>
          )}

          {/* Verification */}
          <VerificationCard status={ref.verificationStatus} details={ref.verificationDetails} />

          {/* Metadata */}
          <Card>
            <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">
              Details
            </h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-xs text-[#999]">Requested</dt>
                <dd className="text-sm text-[#444]">{formatDate(ref.requestedAt)}</dd>
              </div>
              {ref.submittedAt && (
                <div>
                  <dt className="text-xs text-[#999]">Submitted</dt>
                  <dd className="text-sm text-[#444]">{formatDate(ref.submittedAt)}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-[#999]">Relationship</dt>
                <dd className="text-sm text-[#444] capitalize">{ref.relationship.replace('-', ' ')}</dd>
              </div>
            </dl>
          </Card>

          {/* Share link */}
          <Card>
            <ShareLinkBox token={ref.token} />
          </Card>
        </div>
      </div>
    </div>
  );
}
