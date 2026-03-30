'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Repeat2, CheckCircle2, Clock, Star } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ShareLinkBox } from '@/components/references/ShareLinkBox';
import { useReferences } from '@/hooks/useReferences';
import { formatDate, timeAgo } from '@/lib/utils';
import type { ReferenceRatings } from '@/types';

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
      <div className="flex-1 h-1.5 bg-[#222] rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-white w-4">{value}</span>
    </div>
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
        <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
          <p className="text-sm text-green-400">
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
                transferable
              </Badge>
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
              <h3 className="text-xs font-semibold text-[#555] uppercase tracking-wider mb-4">
                Written Recommendation
              </h3>
              <p className="text-[#ccc] leading-relaxed text-sm">&ldquo;{ref.recommendation}&rdquo;</p>

              {ref.strengths && ref.strengths.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#222]">
                  <p className="text-xs text-[#555] mb-2">Key Strengths</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ref.strengths.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-[#1a1a1a] border border-[#333] text-[#888]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {ref.wouldHireAgain !== undefined && (
                <div className="mt-4 pt-4 border-t border-[#222] flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-xs text-[#888]">
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
                <Clock className="w-5 h-5 text-[#555]" />
                <div>
                  <p className="text-sm font-medium text-white">Waiting for response</p>
                  <p className="text-xs text-[#666] mt-0.5">
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
              <h3 className="text-xs font-semibold text-[#555] uppercase tracking-wider mb-3">
                Context Note Sent
              </h3>
              <p className="text-sm text-[#888] leading-relaxed">{ref.contextNote}</p>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Ratings */}
          {ref.ratings && (
            <Card>
              <h3 className="text-xs font-semibold text-[#555] uppercase tracking-wider mb-4">
                Ratings
              </h3>
              <div className="space-y-3">
                {(Object.keys(RATING_LABELS) as (keyof ReferenceRatings)[]).map((key) => (
                  <RatingBar key={key} label={RATING_LABELS[key]} value={ref.ratings![key]} />
                ))}
              </div>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <h3 className="text-xs font-semibold text-[#555] uppercase tracking-wider mb-3">
              Details
            </h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-xs text-[#555]">Requested</dt>
                <dd className="text-sm text-[#ccc]">{formatDate(ref.requestedAt)}</dd>
              </div>
              {ref.submittedAt && (
                <div>
                  <dt className="text-xs text-[#555]">Submitted</dt>
                  <dd className="text-sm text-[#ccc]">{formatDate(ref.submittedAt)}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-[#555]">Relationship</dt>
                <dd className="text-sm text-[#ccc] capitalize">{ref.relationship.replace('-', ' ')}</dd>
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
