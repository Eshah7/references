'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { RatingInput } from '@/components/references/RatingInput';
import { useReferences } from '@/hooks/useReferences';
import type { ReferenceRatings, ReferenceRelationship } from '@/types';

const RELATIONSHIP_OPTIONS = [
  { value: 'manager', label: 'Manager (I managed them)' },
  { value: 'peer', label: 'Peer (same level)' },
  { value: 'direct-report', label: 'Direct Report (they managed me)' },
  { value: 'client', label: 'Client' },
  { value: 'mentor', label: 'Mentor / Mentee' },
  { value: 'other', label: 'Other' },
];

const HIRE_AGAIN_OPTIONS = [
  { value: 'true', label: 'Yes, absolutely' },
  { value: 'false', label: 'I would not specifically recommend' },
];

export default function ReferenceRequestPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const { getByToken, update } = useReferences();
  const ref = getByToken(token);

  const [form, setForm] = useState({
    refereeName: ref?.refereeName ?? '',
    refereeTitle: ref?.refereeTitle ?? '',
    refereeCompany: ref?.refereeCompany ?? '',
    relationship: (ref?.relationship ?? 'manager') as ReferenceRelationship,
    recommendation: '',
    wouldHireAgain: 'true',
    strengths: '',
  });

  const [ratings, setRatings] = useState<ReferenceRatings>({
    technical: 0,
    communication: 0,
    leadership: 0,
    teamwork: 0,
    overall: 0,
  });

  const [submitting, setSubmitting] = useState(false);

  const setField = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setRating = (key: keyof ReferenceRatings, value: number) =>
    setRatings((prev) => ({ ...prev, [key]: value }));

  if (!ref) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[#111] font-semibold">Link not found</p>
          <p className="text-[#888] text-sm mt-1">This reference request link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  if (ref.status === 'received') {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-xl">✓</span>
          </div>
          <p className="text-[#111] font-semibold">Already submitted</p>
          <p className="text-[#888] text-sm mt-1">You&apos;ve already submitted a reference for this request. Thank you!</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ref) return;
    setSubmitting(true);

    update(ref.id, {
      refereeName: form.refereeName,
      refereeTitle: form.refereeTitle,
      refereeCompany: form.refereeCompany,
      relationship: form.relationship,
      recommendation: form.recommendation,
      ratings,
      strengths: form.strengths.split(',').map((s) => s.trim()).filter(Boolean),
      wouldHireAgain: form.wouldHireAgain === 'true',
      status: 'received',
      submittedAt: new Date().toISOString(),
    });

    router.push(`/references/request/${token}/thank-you`);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-16 px-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-[#111] rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">V</span>
            </div>
            <span className="text-[#666] text-sm">Vouch</span>
          </div>
          <h1 className="text-2xl font-semibold text-[#111] mt-2">
            You&apos;ve been asked to provide a reference
          </h1>
          <p className="text-[#666] text-sm mt-3 max-w-md mx-auto leading-relaxed">
            This form will only take a few minutes. Your response will be kept confidential.
          </p>
          {ref.contextNote && (
            <div className="mt-4 bg-white border border-[#eaeaea] rounded-lg px-4 py-3 text-sm text-[#555] text-left max-w-md mx-auto">
              <p className="text-xs text-[#999] mb-1">Context from the requester:</p>
              &ldquo;{ref.contextNote}&rdquo;
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your info */}
          <Card>
            <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">Your Information</h3>
            <div className="space-y-4">
              <Input
                label="Your Full Name"
                value={form.refereeName}
                onChange={(e) => setField('refereeName', e.target.value)}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Your Title"
                  value={form.refereeTitle}
                  onChange={(e) => setField('refereeTitle', e.target.value)}
                  required
                />
                <Input
                  label="Your Company"
                  value={form.refereeCompany}
                  onChange={(e) => setField('refereeCompany', e.target.value)}
                  required
                />
              </div>
              <Select
                label="Your Relationship"
                options={RELATIONSHIP_OPTIONS}
                value={form.relationship}
                onChange={(e) => setField('relationship', e.target.value)}
              />
            </div>
          </Card>

          {/* Ratings */}
          <Card>
            <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">Ratings (1 = needs work, 5 = exceptional)</h3>
            <div className="space-y-4">
              <RatingInput label="Technical Skills" value={ratings.technical} onChange={(v) => setRating('technical', v)} />
              <RatingInput label="Communication" value={ratings.communication} onChange={(v) => setRating('communication', v)} />
              <RatingInput label="Leadership" value={ratings.leadership} onChange={(v) => setRating('leadership', v)} />
              <RatingInput label="Team Collaboration" value={ratings.teamwork} onChange={(v) => setRating('teamwork', v)} />
              <div className="pt-3 border-t border-[#f2f2f2]">
                <RatingInput label="Overall Rating" value={ratings.overall} onChange={(v) => setRating('overall', v)} />
              </div>
            </div>
          </Card>

          {/* Written recommendation */}
          <Card>
            <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">Written Recommendation</h3>
            <div className="space-y-4">
              <Textarea
                label="Your Recommendation"
                placeholder={`Please share your experience working with this person — their strengths, the projects you collaborated on, and why you'd recommend them...`}
                value={form.recommendation}
                onChange={(e) => setField('recommendation', e.target.value)}
                rows={6}
                required
              />
              <Input
                label="Key Strengths (comma-separated)"
                placeholder="e.g. technical depth, communication, leadership"
                value={form.strengths}
                onChange={(e) => setField('strengths', e.target.value)}
                hint="Optional — helps the recipient highlight specific skills."
              />
              <Select
                label="Would you hire or work with them again?"
                options={HIRE_AGAIN_OPTIONS}
                value={form.wouldHireAgain}
                onChange={(e) => setField('wouldHireAgain', e.target.value)}
              />
            </div>
          </Card>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Reference'}
          </Button>

          <p className="text-center text-xs text-[#999]">
            Your response is confidential and will only be shared with the requester.
          </p>
        </form>
      </div>
    </div>
  );
}
