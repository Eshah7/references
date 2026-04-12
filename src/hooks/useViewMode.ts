'use client';

import { useState, useEffect } from 'react';

export type ViewMode = 'candidate' | 'recruiter';

const KEY = 'vouch_view_mode';

export function useViewMode() {
  const [mode, setModeState] = useState<ViewMode>('candidate');

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as ViewMode | null;
    if (stored === 'recruiter' || stored === 'candidate') {
      setModeState(stored);
    }
  }, []);

  const setMode = (next: ViewMode) => {
    setModeState(next);
    localStorage.setItem(KEY, next);
  };

  return { mode, setMode };
}
