'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useProfile } from '@/hooks/useProfile';
import { getInitials } from '@/lib/utils';

export default function ProfilePage() {
  const { profile, update } = useProfile();
  const [form, setForm] = useState({
    name: profile.name,
    title: profile.title,
    email: profile.email,
    summary: profile.summary,
    linkedinUrl: profile.linkedinUrl ?? '',
  });
  const [saved, setSaved] = useState(false);

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update({ ...form, linkedinUrl: form.linkedinUrl || undefined });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <PageHeader title="Profile" subtitle="Your personal information and career summary." />

      <div className="mt-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#222] border border-[#333] flex items-center justify-center shrink-0">
          <span className="text-xl font-semibold text-white">
            {getInitials(form.name || profile.name)}
          </span>
        </div>
        <div>
          <p className="text-base font-semibold text-white">{form.name}</p>
          <p className="text-sm text-[#888]">{form.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <Card>
          <h3 className="text-xs font-semibold text-[#555] uppercase tracking-wider mb-4">
            Basic Information
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                required
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                required
              />
            </div>
            <Input
              label="Current Title"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Senior Product Engineer"
              required
            />
            <Input
              label="LinkedIn URL"
              type="url"
              value={form.linkedinUrl}
              onChange={(e) => set('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com/in/yourname"
            />
          </div>
        </Card>

        <Card>
          <h3 className="text-xs font-semibold text-[#555] uppercase tracking-wider mb-4">
            Professional Summary
          </h3>
          <Textarea
            label="Summary"
            value={form.summary}
            onChange={(e) => set('summary', e.target.value)}
            rows={5}
            placeholder="A brief overview of your background, expertise, and what makes you unique..."
            hint="Shown on your profile and used as context for reference requests."
          />
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit">Save Changes</Button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm text-green-400">
              <CheckCircle2 className="w-4 h-4" />
              Saved!
            </span>
          )}
        </div>
      </form>

      {/* Danger zone */}
      <div className="mt-10 pt-6 border-t border-[#1a1a1a]">
        <h3 className="text-xs font-semibold text-[#555] uppercase tracking-wider mb-3">
          Data
        </h3>
        <p className="text-sm text-[#666] mb-3">
          Your data is stored locally in your browser. You can reset it to the demo state at any time.
        </p>
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            if (confirm('Reset all data to demo state? This cannot be undone.')) {
              localStorage.removeItem('references_app_v1');
              window.location.reload();
            }
          }}
        >
          Reset to Demo Data
        </Button>
      </div>
    </div>
  );
}
