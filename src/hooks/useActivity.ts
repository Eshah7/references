'use client';

import { useState } from 'react';
import type { ActivityItem } from '@/types';
import { loadState } from '@/lib/storage';

export function useActivity() {
  const [activity] = useState<ActivityItem[]>(() =>
    [...loadState().activity].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  );

  return { activity };
}
