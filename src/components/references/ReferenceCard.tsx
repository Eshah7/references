'use client';

import Link from 'next/link';
import { Repeat2, ExternalLink, Trash2 } from 'lucide-react';
import { type Reference } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatDate, timeAgo } from '@/lib/utils';

interface ReferenceCardProps {
  reference: Reference;
  onDelete?: (id: string) => void;
}

const relationshipLabels: Record<string, string> = {
  manager: 'Manager',
  peer: 'Peer',
  'direct-report': 'Direct Report',
  client: 'Client',
  mentor: 'Mentor',
  other: 'Other',
};

export function ReferenceCard({ reference: ref, onDelete }: ReferenceCardProps) {
  return (
    <tr className="border-b border-[#1a1a1a] hover:bg-white/[0.02] transition-colors group">
      {/* Referee */}
      <td className="px-5 py-4">
        <div>
          <p className="text-sm font-medium text-white">{ref.refereeName}</p>
          <p className="text-xs text-[#666] mt-0.5">
            {ref.refereeTitle} · {ref.refereeCompany}
          </p>
        </div>
      </td>

      {/* Relationship */}
      <td className="px-5 py-4">
        <span className="text-sm text-[#888]">{relationshipLabels[ref.relationship]}</span>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <Badge variant={ref.status}>{ref.status}</Badge>
          {ref.isTransferable && (
            <Badge variant="transferable">
              <Repeat2 className="w-2.5 h-2.5" />
              transferable
            </Badge>
          )}
        </div>
      </td>

      {/* Requested */}
      <td className="px-5 py-4">
        <span className="text-sm text-[#666]">{timeAgo(ref.requestedAt)}</span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/references/${ref.id}`}
            className="p-1.5 rounded text-[#666] hover:text-white hover:bg-white/10 transition-colors"
            title="View details"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(ref.id)}
              className="p-1.5 rounded text-[#666] hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
