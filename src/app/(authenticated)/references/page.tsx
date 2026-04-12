'use client';

import { useState } from 'react';
import { Link2 } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { EmptyState } from '@/components/ui/EmptyState';
import { ReferenceCard } from '@/components/references/ReferenceCard';
import { useReferences } from '@/hooks/useReferences';
import type { ReferenceStatus } from '@/types';

const TABS = ['All', 'Received', 'Pending', 'Transferable'];

export default function ReferencesPage() {
  const { references, remove } = useReferences();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = references.filter((r) => {
    if (activeTab === 'Received') return r.status === 'received';
    if (activeTab === 'Pending') return r.status === 'pending';
    if (activeTab === 'Transferable') return r.isTransferable;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <PageHeader
        title="References"
        subtitle="Collect and manage your professional references"
        cta={
          <Button href="/references/new">
            <Link2 className="w-4 h-4" />
            Request Reference
          </Button>
        }
      />

      <Tabs items={TABS} active={activeTab} onChange={setActiveTab} className="mt-6" />

      <Card padding={false} className="mt-4">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Link2}
            title="No references here"
            description={activeTab === 'All' ? 'Request your first reference to get started.' : `No ${activeTab.toLowerCase()} references yet.`}
            action="Request Reference"
            actionHref="/references/new"
          />
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#eaeaea]">
                <th className="px-5 py-3 text-left text-xs font-medium text-[#999] uppercase tracking-wider">Referee</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-[#999] uppercase tracking-wider">Relationship</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-[#999] uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-[#999] uppercase tracking-wider" title="Performance Predictor Score (0–100)">Predictor</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-[#999] uppercase tracking-wider">Requested</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-[#999] uppercase tracking-wider w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ref) => (
                <ReferenceCard key={ref.id} reference={ref} onDelete={remove} />
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
