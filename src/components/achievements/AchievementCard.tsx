'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import type { Achievement } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { CopyButton } from '@/components/ui/CopyButton';
import { formatMonthYear, formatResumetBullet } from '@/lib/utils';

interface AchievementCardProps {
  achievement: Achievement;
  onDelete?: (id: string) => void;
}

export function AchievementCard({ achievement: ach, onDelete }: AchievementCardProps) {
  const [expanded, setExpanded] = useState(false);
  const bullet = formatResumetBullet(ach.title, ach.impact, ach.date);

  return (
    <div className="bg-[#0a0a0a] border border-[#333] rounded-lg overflow-hidden hover:border-[#444] transition-colors">
      <button
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium text-white">{ach.title}</p>
            <Badge variant={ach.category}>{ach.category}</Badge>
          </div>
          <p className="text-xs text-[#888] mt-0.5 truncate">{ach.impact}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-[#555]">{formatMonthYear(ach.date)}</span>
          <span className="text-xs text-[#555]">·</span>
          <span className="text-xs text-[#555]">{ach.company}</span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-[#555]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#555]" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-[#1a1a1a]">
          <div className="pt-4 space-y-3">
            <div>
              <p className="text-xs text-[#555] mb-1">Description</p>
              <p className="text-sm text-[#ccc] leading-relaxed">{ach.description}</p>
            </div>
            <div>
              <p className="text-xs text-[#555] mb-1">Impact</p>
              <p className="text-sm text-[#ccc]">{ach.impact}</p>
            </div>
            {ach.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {ach.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[#1a1a1a] border border-[#333] text-[#777]">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2 pt-2 border-t border-[#1a1a1a]">
              <CopyButton text={bullet} label="Copy for Resume" />
              {onDelete && (
                <button
                  onClick={() => onDelete(ach.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-transparent text-[#666] hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
