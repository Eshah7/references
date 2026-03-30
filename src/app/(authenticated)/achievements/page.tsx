'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { AchievementCard } from '@/components/achievements/AchievementCard';
import { CategoryFilter } from '@/components/achievements/CategoryFilter';
import { useAchievements } from '@/hooks/useAchievements';
import type { AchievementCategory } from '@/types';

export default function AchievementsPage() {
  const { achievements, remove } = useAchievements();
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? achievements
      : achievements.filter((a) => a.category === (activeCategory as AchievementCategory));

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <PageHeader
        title="Achievements"
        subtitle="Log accomplishments and export them for your resume"
        cta={
          <Button href="/achievements/new">
            <Star className="w-4 h-4" />
            Log Achievement
          </Button>
        }
      />

      <div className="mt-6">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>

      <div className="mt-4 space-y-2">
        {filtered.length === 0 ? (
          <div className="bg-[#0a0a0a] border border-[#333] rounded-lg">
            <EmptyState
              icon={Star}
              title="No achievements yet"
              description="Log your first accomplishment to start building your career story."
              action="Log Achievement"
              actionHref="/achievements/new"
            />
          </div>
        ) : (
          filtered.map((ach) => (
            <AchievementCard key={ach.id} achievement={ach} onDelete={remove} />
          ))
        )}
      </div>
    </div>
  );
}
