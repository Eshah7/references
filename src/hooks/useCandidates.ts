'use client';

import { useState } from 'react';
import type { CandidateReview, ReviewStage } from '@/types';
import { loadState, saveState } from '@/lib/storage';

export function useCandidates() {
  const [candidates, setCandidates] = useState<CandidateReview[]>(
    () => loadState().candidateReviews ?? []
  );

  const updateStage = (id: string, stage: ReviewStage) => {
    const next = candidates.map((c) => (c.id === id ? { ...c, stage } : c));
    setCandidates(next);
    const state = loadState();
    saveState({ ...state, candidateReviews: next });
  };

  const updateNotes = (id: string, notes: string) => {
    const next = candidates.map((c) => (c.id === id ? { ...c, notes } : c));
    setCandidates(next);
    const state = loadState();
    saveState({ ...state, candidateReviews: next });
  };

  const getById = (id: string) => candidates.find((c) => c.id === id);

  return { candidates, updateStage, updateNotes, getById };
}
