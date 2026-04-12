'use client';

import { useState } from 'react';
import { Briefcase, Plus, X } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { EmptyState } from '@/components/ui/EmptyState';
import { TimelineItem } from '@/components/career/TimelineItem';
import { useCareer } from '@/hooks/useCareer';
import type { EmploymentType } from '@/types';

const EMPLOYMENT_OPTIONS = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'internship', label: 'Internship' },
  { value: 'freelance', label: 'Freelance' },
];

const EMPTY_FORM = {
  company: '',
  role: '',
  employmentType: 'full-time' as EmploymentType,
  startDate: '',
  endDate: '',
  isCurrent: false,
  location: '',
  description: '',
  skills: '',
  isPromotion: false,
};

export default function CareerPage() {
  const { career, add } = useCareer();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const set = (key: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    add({
      ...form,
      endDate: form.isCurrent ? undefined : form.endDate || undefined,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
    });
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <PageHeader
        title="Career Timeline"
        subtitle="Your professional history and progression"
        cta={
          <Button onClick={() => setShowForm(!showForm)} variant={showForm ? 'secondary' : 'primary'}>
            {showForm ? (
              <>
                <X className="w-4 h-4" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Position
              </>
            )}
          </Button>
        }
      />

      {showForm && (
        <Card className="mt-6">
          <h3 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-4">New Position</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Company"
                value={form.company}
                onChange={(e) => set('company', e.target.value)}
                required
              />
              <Input
                label="Role / Title"
                value={form.role}
                onChange={(e) => set('role', e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Employment Type"
                options={EMPLOYMENT_OPTIONS}
                value={form.employmentType}
                onChange={(e) => set('employmentType', e.target.value as EmploymentType)}
              />
              <Input
                label="Location"
                value={form.location}
                onChange={(e) => set('location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={form.startDate}
                onChange={(e) => set('startDate', e.target.value)}
                required
              />
              {!form.isCurrent && (
                <Input
                  label="End Date"
                  type="date"
                  value={form.endDate}
                  onChange={(e) => set('endDate', e.target.value)}
                />
              )}
            </div>
            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              placeholder="What did you work on, own, or accomplish in this role?"
            />
            <Input
              label="Skills (comma-separated)"
              value={form.skills}
              onChange={(e) => set('skills', e.target.value)}
              placeholder="e.g. TypeScript, React, PostgreSQL"
            />
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#444]">
                <input
                  type="checkbox"
                  checked={form.isCurrent}
                  onChange={(e) => set('isCurrent', e.target.checked)}
                  className="accent-blue-500"
                />
                This is my current role
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#444]">
                <input
                  type="checkbox"
                  checked={form.isPromotion}
                  onChange={(e) => set('isPromotion', e.target.checked)}
                  className="accent-blue-500"
                />
                This was a promotion
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit">Add to Timeline</Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="mt-8">
        {career.length === 0 ? (
          <div className="bg-white border border-[#eaeaea] rounded-lg">
            <EmptyState
              icon={Briefcase}
              title="No career entries yet"
              description="Add your first position to start building your timeline."
              action="Add Position"
              onAction={() => setShowForm(true)}
            />
          </div>
        ) : (
          <div className="relative">
            {career.map((entry, i) => (
              <TimelineItem key={entry.id} entry={entry} isFirst={i === 0} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
