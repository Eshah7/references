'use client';

import { useState } from 'react';
import type { Profile } from '@/types';
import { loadState, saveState } from '@/lib/storage';
import { getInitials } from '@/lib/utils';

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() => loadState().profile);

  const update = (patch: Partial<Omit<Profile, 'id' | 'createdAt'>>) => {
    const updated: Profile = {
      ...profile,
      ...patch,
      avatarInitials: patch.name ? getInitials(patch.name) : profile.avatarInitials,
      updatedAt: new Date().toISOString(),
    };
    setProfile(updated);
    const state = loadState();
    saveState({ ...state, profile: updated });
  };

  return { profile, update };
}
