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
import { useAchievements } from '@/hooks/useAchievements';
import { useCareer } from '@/hooks/useCareer';
import type { AchievementCategory } from '@/types';

const CATEGORY_OPTIONS = [
  { value: 'technical', label: 'Technical' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'delivery', label: 'Delivery / Project' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'growth', label: 'Personal Growth' },
  { value: 'award', label: 'Award / Recognition' },
  { value: 'other', label: 'Other' },
];

export default function NewAchievementPage() {
  const router = useRouter();
  const { add } = useAchievements();
  const { career } = useCareer();

  const currentRole = career.find((c) => c.isCurrent);

  const [form, setForm] = useState({
    title: '',
    description: '',
    impact: '',
    category: 'delivery' as AchievementCategory,
    date: new Date().toISOString().slice(0, 10),
    company: currentRole?.company ?? '',
    role: currentRole?.role ?? '',
    tags: '',
  });

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    add({
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    router.push('/achievements');
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Breadcrumbs items={[{ label: 'Achievements', href: '/achievements' }, { label: 'New Achievement' }]} />
      <PageHeader title="Log Achievement" subtitle="Record an accomplishment for your career record." />

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <Card>
          <h3 className="text-xs font-semibold text-[#555] uppercase tracking-wider mb-4">Achievement</h3>
          <div className="space-y-4">
            <Input
              label="Title"
              placeholder="Launched developer API"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              required
            />
            <Textarea
              label="Description"
              placeholder="What did you do? What was the context, your role, and how did you approach it?"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={4}
              required
            />
            <Textarea
              label="Impact"
              placeholder="What was the measurable result? e.g. 'Reduced costs by 40%' or '200+ integrations in 6 months'"
              value={form.impact}
              onChange={(e) => set('impact', e.target.value)}
              rows={2}
              required
              hint="Be specific and quantifiable — this becomes your resume bullet."
            />
          </div>
        </Card>

        <Card>
          <h3 className="text-xs font-semibold text-[#555] uppercase tracking-wider mb-4">Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Category"
                options={CATEGORY_OPTIONS}
                value={form.category}
                onChange={(e) => set('category', e.target.value as AchievementCategory)}
              />
              <Input
                label="Date"
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Company"
                value={form.company}
                onChange={(e) => set('company', e.target.value)}
                required
              />
              <Input
                label="Role"
                value={form.role}
                onChange={(e) => set('role', e.target.value)}
                required
              />
            </div>
            <Input
              label="Tags (comma-separated)"
              placeholder="e.g. react, api design, growth"
              value={form.tags}
              onChange={(e) => set('tags', e.target.value)}
            />
          </div>
        </Card>

        <div className="flex gap-3">
          <Button type="submit">Save Achievement</Button>
          <Button type="button" variant="ghost" href="/achievements">Cancel</Button>
        </div>
      </form>
    </div>
  );
}
