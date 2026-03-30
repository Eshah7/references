'use client';

import { useState } from 'react';
import type { CareerEntry, ActivityItem } from '@/types';
import { loadState, saveState } from '@/lib/storage';
import { generateId } from '@/lib/tokens';

export function useCareer() {
  const [career, setCareer] = useState<CareerEntry[]>(() => loadState().career);

  const _persist = (next: CareerEntry[]) => {
    setCareer(next);
    const state = loadState();
    saveState({ ...state, career: next });
  };

  const _addActivity = (item: Omit<ActivityItem, 'id'>) => {
    const state = loadState();
    saveState({
      ...state,
      activity: [{ ...item, id: generateId() }, ...state.activity],
    });
  };

  const add = (data: Omit<CareerEntry, 'id' | 'createdAt' | 'updatedAt'>): CareerEntry => {
    const now = new Date().toISOString();
    const entry: CareerEntry = { ...data, id: generateId(), createdAt: now, updatedAt: now };
    // If new entry is current, mark others as not current
    let next = data.isCurrent
      ? career.map((c) => ({ ...c, isCurrent: false }))
      : [...career];
    next = [entry, ...next];
    _persist(next);
    _addActivity({
      type: 'career_entry_added',
      title: `${entry.isPromotion ? 'Promoted to' : 'Joined'} ${entry.role} at ${entry.company}`,
      description: `Career milestone added.`,
      entityId: entry.id,
      createdAt: now,
    });
    return entry;
  };

  const update = (id: string, patch: Partial<CareerEntry>) => {
    const next = career.map((c) =>
      c.id === id ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c
    );
    _persist(next);
  };

  const remove = (id: string) => {
    _persist(career.filter((c) => c.id !== id));
  };

  const getById = (id: string): CareerEntry | undefined => career.find((c) => c.id === id);

  // Sort by start date descending
  const sorted = [...career].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return { career: sorted, add, update, remove, getById };
}
