'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { useReferences } from '@/hooks/useReferences';
import { useProfile } from '@/hooks/useProfile';
import type { ReferenceRelationship } from '@/types';

const RELATIONSHIP_OPTIONS = [
  { value: 'manager', label: 'Manager (they managed me)' },
  { value: 'peer', label: 'Peer (same level)' },
  { value: 'direct-report', label: 'Direct Report (I managed them)' },
  { value: 'client', label: 'Client' },
  { value: 'mentor', label: 'Mentor' },
  { value: 'other', label: 'Other' },
];

export default function NewReferencePage() {
  const router = useRouter();
  const { add } = useReferences();
  const { profile } = useProfile();

  const [form, setForm] = useState({
    refereeName: '',
    refereeEmail: '',
    refereeTitle: '',
    refereeCompany: '',
    relationship: 'manager' as ReferenceRelationship,
    contextNote: '',
    isTransferable: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const ref = add({ ...form, requesterProfileId: profile.id });
    router.push(`/references/${ref.id}?new=1`);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Breadcrumbs items={[{ label: 'References', href: '/references' }, { label: 'New Request' }]} />
      <PageHeader
        title="Request a Reference"
        subtitle="Send a reference request link to a colleague or manager."
      />

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <Card>
          <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">
            About Your Referee
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="Jane Smith"
                value={form.refereeName}
                onChange={(e) => set('refereeName', e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="jane@company.com"
                value={form.refereeEmail}
                onChange={(e) => set('refereeEmail', e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Their Title"
                placeholder="Engineering Manager"
                value={form.refereeTitle}
                onChange={(e) => set('refereeTitle', e.target.value)}
                required
              />
              <Input
                label="Their Company"
                placeholder="Acme Corp"
                value={form.refereeCompany}
                onChange={(e) => set('refereeCompany', e.target.value)}
                required
              />
            </div>
            <Select
              label="Your Relationship"
              options={RELATIONSHIP_OPTIONS}
              value={form.relationship}
              onChange={(e) => set('relationship', e.target.value as ReferenceRelationship)}
            />
          </div>
        </Card>

        <Card>
          <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">
            Context for Your Referee
          </h3>
          <Textarea
            label="Context Note"
            placeholder={`We worked together on the platform team at Acme Corp for 2 years. I led the migration project and Alex can speak to my technical leadership and delivery.`}
            value={form.contextNote}
            onChange={(e) => set('contextNote', e.target.value)}
            rows={4}
            hint="This note is shown to your referee at the top of the form."
          />
        </Card>

        <Card>
          <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">
            Settings
          </h3>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 accent-blue-500"
              checked={form.isTransferable}
              onChange={(e) => set('isTransferable', e.target.checked)}
            />
            <div>
              <p className="text-sm font-medium text-[#111]">Make this reference portable</p>
              <p className="text-xs text-[#666] mt-0.5">
                Portable references can be shared with any employer — not just one specific job application. This is the &ldquo;reference passport&rdquo; model.
              </p>
            </div>
          </label>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Creating…' : 'Create Request & Get Link'}
          </Button>
          <Button type="button" variant="ghost" href="/references">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
