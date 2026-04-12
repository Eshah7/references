'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { loadState } from '@/lib/storage';
import { useViewMode } from '@/hooks/useViewMode';

const CANDIDATE_LINKS = [
  { href: '/', label: 'Dashboard' },
  { href: '/references', label: 'My References' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/career', label: 'Career' },
];

const RECRUITER_LINKS = [
  { href: '/recruiter', label: 'Overview' },
  { href: '/recruiter/candidates', label: 'Candidates' },
];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { mode, setMode } = useViewMode();
  const profile = loadState().profile;

  const links = mode === 'recruiter' ? RECRUITER_LINKS : CANDIDATE_LINKS;

  const handleModeSwitch = (next: 'candidate' | 'recruiter') => {
    setMode(next);
    router.push(next === 'recruiter' ? '/recruiter' : '/');
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-[#eaeaea] bg-white/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href={mode === 'recruiter' ? '/recruiter' : '/'}
          className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-70"
        >
          <div className="w-6 h-6 bg-[#111] rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">V</span>
          </div>
          <span className="text-[#111] font-semibold text-sm">Vouch</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-0.5">
          {links.map(({ href, label }) => {
            const isActive =
              href === '/' || href === '/recruiter'
                ? pathname === href
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm transition-all duration-150',
                  isActive
                    ? 'text-[#111] font-medium bg-[#f5f5f5]'
                    : 'text-[#666] hover:text-[#111] hover:bg-[#fafafa] active:bg-[#f0f0f0]'
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right side: view toggle + avatar */}
        <div className="flex items-center gap-3 shrink-0">
          {/* View mode toggle */}
          <div className="flex items-center rounded-lg border border-[#eaeaea] bg-[#fafafa] p-0.5 text-xs font-medium">
            <button
              onClick={() => handleModeSwitch('candidate')}
              className={cn(
                'px-2.5 py-1 rounded-md transition-all duration-150',
                mode === 'candidate'
                  ? 'bg-white text-[#111] shadow-sm border border-[#eaeaea]'
                  : 'text-[#888] hover:text-[#444] hover:bg-white/60 active:bg-white'
              )}
            >
              Candidate
            </button>
            <button
              onClick={() => handleModeSwitch('recruiter')}
              className={cn(
                'px-2.5 py-1 rounded-md transition-all duration-150',
                mode === 'recruiter'
                  ? 'bg-white text-[#111] shadow-sm border border-[#eaeaea]'
                  : 'text-[#888] hover:text-[#444] hover:bg-white/60 active:bg-white'
              )}
            >
              Recruiter
            </button>
          </div>

          {/* Profile avatar */}
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full bg-[#f0f0f0] border border-[#eaeaea] flex items-center justify-center transition-all duration-150 hover:border-[#ccc] hover:shadow-sm active:scale-95"
          >
            <span className="text-xs font-semibold text-[#444]">{profile.avatarInitials}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
