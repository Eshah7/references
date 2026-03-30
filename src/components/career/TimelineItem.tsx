'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import type { CareerEntry } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatMonthYear, careerDuration } from '@/lib/utils';

interface TimelineItemProps {
  entry: CareerEntry;
  isFirst: boolean;
}

export function TimelineItem({ entry, isFirst }: TimelineItemProps) {
  const [expanded, setExpanded] = useState(isFirst);
  const duration = careerDuration(entry.startDate, entry.endDate);
  const dateRange = `${formatMonthYear(entry.startDate)} — ${entry.isCurrent ? 'Present' : formatMonthYear(entry.endDate!)}`;

  return (
    <div className="flex gap-6 pb-8">
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center shrink-0 w-4">
        <div className={`w-3 h-3 rounded-full border-2 mt-1.5 shrink-0 z-10 ${
          entry.isCurrent
            ? 'border-white bg-white'
            : 'border-[#555] bg-black'
        }`} />
        <div className="flex-1 w-px bg-[#333] mt-1" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-0">
        <button
          className="w-full text-left"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-base font-semibold text-white">{entry.role}</p>
                {entry.isPromotion && (
                  <span className="inline-flex items-center gap-1 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded-full">
                    <TrendingUp className="w-2.5 h-2.5" />
                    Promoted
                  </span>
                )}
                {entry.isCurrent && (
                  <span className="text-xs text-[#888] bg-[#1a1a1a] border border-[#333] px-1.5 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </div>
              <p className="text-sm text-[#888] mt-0.5">{entry.company} · {entry.location}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge variant={entry.employmentType}>{entry.employmentType}</Badge>
                <span className="text-xs text-[#555]">{dateRange}</span>
                <span className="text-xs text-[#555]">· {duration}</span>
              </div>
            </div>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-[#555] mt-1 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#555] mt-1 shrink-0" />
            )}
          </div>
        </button>

        {expanded && (
          <div className="mt-4 space-y-3">
            {entry.description && (
              <p className="text-sm text-[#aaa] leading-relaxed">{entry.description}</p>
            )}
            {entry.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {entry.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-0.5 rounded-full bg-[#1a1a1a] border border-[#333] text-[#777]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
