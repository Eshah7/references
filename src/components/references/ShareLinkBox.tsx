'use client';

import { CopyButton } from '@/components/ui/CopyButton';

interface ShareLinkBoxProps {
  token: string;
}

export function ShareLinkBox({ token }: ShareLinkBoxProps) {
  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/references/request/${token}`
      : `/references/request/${token}`;

  return (
    <div>
      <p className="text-xs font-medium text-[#888] mb-2 uppercase tracking-wider">Share Link</p>
      <div className="flex items-center gap-2 bg-[#111] border border-[#333] rounded-lg px-3 py-2.5">
        <code className="flex-1 text-xs text-[#888] font-mono truncate">{url}</code>
        <CopyButton text={url} label="Copy" size="sm" />
      </div>
      <p className="text-xs text-[#555] mt-1.5">
        Send this link to your referee. It expires in 30 days.
      </p>
    </div>
  );
}
