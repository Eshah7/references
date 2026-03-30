'use client';

import { useState } from 'react';
import type { Achievement, ActivityItem } from '@/types';
import { loadState, saveState } from '@/lib/storage';
import { generateId } from '@/lib/tokens';

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(() => loadState().achievements);

  const _persist = (next: Achievement[]) => {
    setAchievements(next);
    const state = loadState();
    saveState({ ...state, achievements: next });
  };

  const _addActivity = (item: Omit<ActivityItem, 'id'>) => {
    const state = loadState();
    saveState({
      ...state,
      activity: [{ ...item, id: generateId() }, ...state.activity],
    });
  };

  const add = (data: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>): Achievement => {
    const now = new Date().toISOString();
    const ach: Achievement = { ...data, id: generateId(), createdAt: now, updatedAt: now };
    const next = [ach, ...achievements];
    _persist(next);
    _addActivity({
      type: 'achievement_added',
      title: `Achievement logged: ${ach.title}`,
      description: `${ach.impact}`,
      entityId: ach.id,
      createdAt: now,
    });
    return ach;
  };

  const update = (id: string, patch: Partial<Achievement>) => {
    const next = achievements.map((a) =>
      a.id === id ? { ...a, ...patch, updatedAt: new Date().toISOString() } : a
    );
    _persist(next);
  };

  const remove = (id: string) => {
    _persist(achievements.filter((a) => a.id !== id));
  };

  const getById = (id: string): Achievement | undefined => achievements.find((a) => a.id === id);

  return { achievements, add, update, remove, getById };
}
