'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { loadState } from '@/lib/storage';

const NAV_LINKS = [
  { href: '/', label: 'Dashboard' },
  { href: '/references', label: 'References' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/career', label: 'Career' },
];

export function Nav() {
  const pathname = usePathname();
  const profile = loadState().profile;

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-[#333] bg-black/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
            <span className="text-black text-xs font-bold">R</span>
          </div>
          <span className="text-white font-semibold text-sm">References</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm transition-colors',
                  isActive ? 'text-white' : 'text-[#888] hover:text-white'
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Profile avatar */}
        <Link
          href="/profile"
          className="w-8 h-8 rounded-full bg-[#222] border border-[#333] flex items-center justify-center hover:border-[#555] transition-colors shrink-0"
        >
          <span className="text-xs font-semibold text-white">{profile.avatarInitials}</span>
        </Link>
      </div>
    </header>
  );
}
