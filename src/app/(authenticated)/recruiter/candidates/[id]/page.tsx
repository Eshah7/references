'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { ShieldCheck, ShieldAlert, Shield, Star, Repeat2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useCandidates } from '@/hooks/useCandidates';
import type { CandidateReferenceSnapshot, ReviewStage } from '@/types';

const STAGE_OPTIONS: { value: ReviewStage; label: string }[] = [
  { value: 'screening', label: 'Screening' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'reference_check', label: 'Ref Check' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
];

const STAGE_VARIANT: Record<ReviewStage, 'other' | 'transferable' | 'pending' | 'verified' | 'expired'> = {
  screening: 'other',
  shortlisted: 'transferable',
  reference_check: 'pending',
  offer: 'verified',
  rejected: 'expired',
};

function avgScore(refs: CandidateReferenceSnapshot[]): number | null {
  const scores = refs.map((r) => r.performancePredictorScore).filter((s): s is number => s !== undefined);
  if (!scores.length) return null;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

function ReferenceRow({ snap: r }: { snap: CandidateReferenceSnapshot }) {
  const [expanded, setExpanded] = useState(false);
  const statusIcon =
    r.verificationStatus === 'verified' ? <ShieldCheck className="w-4 h-4 text-emerald-600" /> :
    r.verificationStatus === 'flagged' ? <ShieldAlert className="w-4 h-4 text-red-500" /> :
    <Shield className="w-4 h-4 text-[#ccc]" />;

  const scoreColor =
    (r.performancePredictorScore ?? 0) >= 80 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
    (r.performancePredictorScore ?? 0) >= 60 ? 'text-amber-700 bg-amber-50 border-amber-200' :
    'text-red-600 bg-red-50 border-red-200';

  return (
    <div className={`rounded-lg border overflow-hidden ${
      r.verificationStatus === 'flagged'
        ? 'border-red-200 bg-red-50/30'
        : 'border-[#eaeaea] bg-white'
    }`}>
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        {statusIcon}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium text-[#111]">{r.refereeName}</p>
            {r.isTransferable && (
              <span className="inline-flex items-center gap-0.5 text-xs text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full">
                <Repeat2 className="w-2.5 h-2.5" />
                portable
              </span>
            )}
            {r.verificationStatus === 'flagged' && (
              <span className="text-xs text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full">
                fraud risk
              </span>
            )}
          </div>
          <p className="text-xs text-[#888] mt-0.5">{r.refereeTitle} · {r.refereeCompany}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Badge variant={r.status}>{r.status}</Badge>
          {r.performancePredictorScore !== undefined && (
            <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${scoreColor}`}>
              {r.performancePredictorScore}
            </span>
          )}
          {r.status === 'received' && (
            expanded ? <ChevronUp className="w-4 h-4 text-[#999]" /> : <ChevronDown className="w-4 h-4 text-[#999]" />
          )}
        </div>
      </button>

      {expanded && r.status === 'received' && (
        <div className="px-4 pb-4 border-t border-[#eaeaea] space-y-4 pt-4">
          {/* Verification checks */}
          {r.verificationDetails && (
            <div className="grid grid-cols-3 gap-2 text-xs">
              <CheckPill label="Work email" ok={r.verificationDetails.workEmailConfirmed} />
              <CheckPill label="Org-graph match" ok={r.verificationDetails.orgGraphMatch} />
              <CheckPill label="IP verified" ok={r.verificationDetails.ipVerified} />
            </div>
          )}

          {/* Recommendation */}
          {r.recommendation && (
            <p className="text-sm text-[#444] leading-relaxed italic">&ldquo;{r.recommendation}&rdquo;</p>
          )}

          {/* Ratings */}
          {r.ratings && (
            <div className="grid grid-cols-5 gap-2">
              {(Object.entries(r.ratings) as [string, number][]).map(([key, val]) => (
                <div key={key} className="text-center">
                  <p className="text-xs text-[#999] capitalize">{key}</p>
                  <p className="text-lg font-bold text-[#111]">{val}</p>
                </div>
              ))}
            </div>
          )}

          {/* Strengths + hire again */}
          {r.strengths && r.strengths.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {r.strengths.map((s) => (
                <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-[#f5f5f5] border border-[#eaeaea] text-[#666]">
                  {s}
                </span>
              ))}
            </div>
          )}
          {r.wouldHireAgain !== undefined && (
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs text-[#666]">
                {r.wouldHireAgain ? 'Would hire again' : 'Would not specifically re-hire'}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CheckPill({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className={`flex items-center justify-between px-2 py-1 rounded text-xs border ${
      ok ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-600'
    }`}>
      <span>{label}</span>
      <span className="font-semibold">{ok ? 'Pass' : 'Fail'}</span>
    </div>
  );
}

export default function CandidateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getById, updateStage, updateNotes } = useCandidates();
  const candidate = getById(id);

  const [notesValue, setNotesValue] = useState(candidate?.notes ?? '');
  const [notesSaved, setNotesSaved] = useState(false);

  if (!candidate) return notFound();

  const score = avgScore(candidate.references);
  const verifiedCount = candidate.references.filter((r) => r.verificationStatus === 'verified').length;
  const flaggedCount = candidate.references.filter((r) => r.verificationStatus === 'flagged').length;
  const portableCount = candidate.references.filter((r) => r.isTransferable).length;

  const scoreColor =
    score !== null && score >= 80 ? 'text-emerald-700' :
    score !== null && score >= 60 ? 'text-amber-700' :
    'text-red-600';

  const handleNotesBlur = () => {
    updateNotes(candidate.id, notesValue);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Breadcrumbs
        items={[
          { label: 'Candidates', href: '/recruiter/candidates' },
          { label: candidate.candidateName },
        ]}
      />

      <PageHeader
        title={candidate.candidateName}
        subtitle={`${candidate.candidateCurrentTitle} · applying for ${candidate.appliedRole}`}
        cta={
          <div className="flex items-center gap-2">
            <select
              value={candidate.stage}
              onChange={(e) => updateStage(candidate.id, e.target.value as ReviewStage)}
              className="text-sm border border-[#eaeaea] rounded-lg px-3 py-1.5 bg-white text-[#111] focus:outline-none focus:border-[#999]"
            >
              {STAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <Badge variant={STAGE_VARIANT[candidate.stage]}>
              {STAGE_OPTIONS.find((o) => o.value === candidate.stage)?.label}
            </Badge>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* References */}
        <div className="md:col-span-2 space-y-3">
          <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider">
            Reference Passport ({candidate.references.length} references)
          </h3>
          {candidate.references.map((r) => (
            <ReferenceRow key={r.id} snap={r} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Proof Layer Summary */}
          <Card>
            <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">Proof Layer Summary</h3>
            <div className="text-center mb-4">
              {score !== null ? (
                <>
                  <p className={`text-4xl font-bold ${scoreColor}`}>{score}</p>
                  <p className="text-xs text-[#888] mt-1">Avg Performance Predictor</p>
                </>
              ) : (
                <p className="text-sm text-[#888]">Awaiting reference data</p>
              )}
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-[#888]">Verified referees</dt>
                <dd className="font-medium text-emerald-700">{verifiedCount}/{candidate.references.length}</dd>
              </div>
              {flaggedCount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-[#888]">Fraud flags</dt>
                  <dd className="font-semibold text-red-600">{flaggedCount}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-[#888]">Portable refs</dt>
                <dd className="font-medium text-blue-600">{portableCount}</dd>
              </div>
            </dl>
            {flaggedCount > 0 && (
              <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                Fraud signal detected — review before advancing.
              </div>
            )}
          </Card>

          {/* Candidate details */}
          <Card>
            <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Details</h3>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-xs text-[#999]">Email</dt>
                <dd className="text-[#444]">{candidate.candidateEmail}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#999]">Req #</dt>
                <dd className="text-[#444] font-mono">{candidate.reqNumber}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#999]">Applied</dt>
                <dd className="text-[#444]">{new Date(candidate.submittedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}</dd>
              </div>
            </dl>
          </Card>

          {/* Recruiter notes (editable) */}
          <Card>
            <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">
              Recruiter Notes
              {notesSaved && <span className="ml-2 text-green-600 normal-case font-normal">Saved</span>}
            </h3>
            <textarea
              className="w-full text-sm text-[#444] bg-[#fafafa] border border-[#eaeaea] rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-[#999]"
              rows={4}
              value={notesValue}
              onChange={(e) => setNotesValue(e.target.value)}
              onBlur={handleNotesBlur}
              placeholder="Add notes about this candidate…"
            />
            <p className="text-xs text-[#999] mt-1">Saved locally on blur.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
