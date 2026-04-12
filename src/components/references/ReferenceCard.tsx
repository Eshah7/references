'use client';

import Link from 'next/link';
import { Repeat2, ExternalLink, Trash2, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import { type Reference } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { timeAgo } from '@/lib/utils';

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

function VerificationIcon({ status }: { status?: string }) {
  if (status === 'verified') {
    return <span title="Referee verified"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /></span>;
  }
  if (status === 'flagged') {
    return <span title="Verification flagged"><ShieldAlert className="w-3.5 h-3.5 text-red-500" /></span>;
  }
  return <span title="Not yet verified"><Shield className="w-3.5 h-3.5 text-[#ccc]" /></span>;
}

function PredictorScore({ score }: { score?: number }) {
  if (score === undefined) return null;
  const color =
    score >= 80 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
    score >= 60 ? 'text-amber-700 bg-amber-50 border-amber-200' :
    'text-red-600 bg-red-50 border-red-200';
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded border ${color}`} title="Performance Predictor Score">
      {score}
    </span>
  );
}

export function ReferenceCard({ reference: ref, onDelete }: ReferenceCardProps) {
  return (
    <tr className="border-b border-[#f2f2f2] hover:bg-[#fafafa] transition-all duration-150 group">
      {/* Referee */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <VerificationIcon status={ref.verificationStatus} />
          <div>
            <p className="text-sm font-medium text-[#111]">{ref.refereeName}</p>
            <p className="text-xs text-[#888] mt-0.5">
              {ref.refereeTitle} · {ref.refereeCompany}
            </p>
          </div>
        </div>
      </td>

      {/* Relationship */}
      <td className="px-5 py-4">
        <span className="text-sm text-[#666]">{relationshipLabels[ref.relationship]}</span>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
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
      </td>

      {/* Predictor Score */}
      <td className="px-5 py-4">
        <PredictorScore score={ref.performancePredictorScore} />
      </td>

      {/* Requested */}
      <td className="px-5 py-4">
        <span className="text-sm text-[#888]">{timeAgo(ref.requestedAt)}</span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/references/${ref.id}`}
            className="p-1.5 rounded text-[#888] hover:text-[#111] hover:bg-[#f0f0f0] transition-colors"
            title="View details"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(ref.id)}
              className="p-1.5 rounded text-[#888] hover:text-red-500 hover:bg-red-50 transition-colors"
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
