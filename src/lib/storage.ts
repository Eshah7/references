import type { AppState } from '@/types';
import { SEED_STATE } from './seed';

const STORAGE_KEY = 'references_app_v1';

export function loadState(): AppState {
  if (typeof window === 'undefined') return SEED_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveState(SEED_STATE);
      return SEED_STATE;
    }
    const parsed = JSON.parse(raw) as AppState;
    // Migrate: backfill candidateReviews if missing (added in v2)
    if (!parsed.candidateReviews) {
      const migrated = { ...parsed, candidateReviews: SEED_STATE.candidateReviews };
      saveState(migrated);
      return migrated;
    }
    return parsed;
  } catch {
    return SEED_STATE;
  }
}

export function saveState(state: AppState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota exceeded — silently ignore for prototype
  }
}

export function resetState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
