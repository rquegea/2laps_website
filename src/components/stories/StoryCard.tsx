'use client';

import { motion } from 'framer-motion';
import { SignalVisual } from './SignalVisual';
import { SourceChips } from './SourceChips';
import { formatRelative } from '@/lib/time';
import type { Story } from '@/types/story';

const CATEGORY_LABELS: Record<string, string> = {
  seo: 'SEO',
  'social-to-search': 'Social → Búsqueda',
  reputation: 'Reputación',
  paid: 'Paid',
  'weak-signal': 'Señal débil',
  breaking: 'Breaking',
};

export const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

type Props = { story: Story };

export function StoryCard({ story }: Props) {
  return (
    <motion.article
      variants={cardVariants}
      className="flex flex-col gap-2.5 cursor-pointer group"
      onClick={() => console.log(story.id)}
    >
      {/* Thumbnail */}
      <div className="rounded-lg overflow-hidden">
        <SignalVisual signal={story.signal} brand={story.brand} size="card" />
      </div>

      {/* Category */}
      <p className="text-[9px] font-sans font-bold uppercase tracking-[0.12em] text-ink-tertiary">
        {CATEGORY_LABELS[story.category] ?? story.category}
      </p>

      {/* Headline */}
      <h2 className="font-serif font-normal text-[15px] leading-[1.3] text-ink group-hover:opacity-70 transition-opacity">
        {story.headline}
      </h2>

      {/* Brand + time */}
      <div className="flex items-center gap-1.5">
        <span
          className="flex items-center justify-center w-[13px] h-[13px] text-white text-[7px] font-bold rounded-[2px] shrink-0"
          style={{ backgroundColor: story.brand.color }}
          aria-hidden="true"
        >
          {story.brand.initial}
        </span>
        <span className="text-[10px] font-sans text-ink-secondary">{story.brand.name}</span>
        {story.competitor && (
          <>
            <span className="text-ink-tertiary text-[9px]">→</span>
            <span
              className="flex items-center justify-center w-[13px] h-[13px] text-white text-[7px] font-bold rounded-[2px] shrink-0"
              style={{ backgroundColor: story.competitor.color }}
              aria-hidden="true"
            >
              {story.competitor.initial}
            </span>
            <span className="text-[10px] font-sans text-ink-secondary">{story.competitor.name}</span>
          </>
        )}
        <span className="text-ink-tertiary text-[9px] ml-auto">{formatRelative(story.detectedAt)}</span>
      </div>

      {/* Sources */}
      <SourceChips sources={story.sources} size="sm" />
    </motion.article>
  );
}
