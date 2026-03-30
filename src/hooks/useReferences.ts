'use client';

import { useState } from 'react';
import type { Reference, ActivityItem } from '@/types';
import { loadState, saveState } from '@/lib/storage';
import { generateId, generateToken } from '@/lib/tokens';

export function useReferences() {
  const [references, setReferences] = useState<Reference[]>(() => loadState().references);

  const _persist = (next: Reference[]) => {
    setReferences(next);
    const state = loadState();
    saveState({ ...state, references: next });
  };

  const _addActivity = (item: Omit<ActivityItem, 'id'>) => {
    const state = loadState();
    saveState({
      ...state,
      activity: [{ ...item, id: generateId() }, ...state.activity],
    });
  };

  const add = (
    data: Omit<Reference, 'id' | 'token' | 'status' | 'requestedAt' | 'expiresAt'>
  ): Reference => {
    const now = new Date();
    const expires = new Date(now);
    expires.setDate(expires.getDate() + 30);
    const ref: Reference = {
      ...data,
      id: generateId(),
      token: generateToken(),
      status: 'pending',
      requestedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
    };
    const next = [ref, ...references];
    _persist(next);
    _addActivity({
      type: 'reference_requested',
      title: `Reference requested from ${ref.refereeName}`,
      description: `Sent a reference request to ${ref.refereeTitle} at ${ref.refereeCompany}.`,
      entityId: ref.id,
      createdAt: now.toISOString(),
    });
    return ref;
  };

  const update = (id: string, patch: Partial<Reference>) => {
    const next = references.map((r) => (r.id === id ? { ...r, ...patch } : r));
    _persist(next);
    if (patch.status === 'received') {
      _addActivity({
        type: 'reference_received',
        title: `Reference received from ${references.find((r) => r.id === id)?.refereeName}`,
        description: 'A reference was submitted.',
        entityId: id,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const remove = (id: string) => {
    _persist(references.filter((r) => r.id !== id));
  };

  const getByToken = (token: string): Reference | undefined =>
    references.find((r) => r.token === token);

  const getById = (id: string): Reference | undefined => references.find((r) => r.id === id);

  return { references, add, update, remove, getByToken, getById };
}
