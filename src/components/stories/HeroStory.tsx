'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SignalVisual } from './SignalVisual';
import { SourceChips } from './SourceChips';
import { formatRelative } from '@/lib/time';
import { cn } from '@/lib/utils';
import type { Story } from '@/types/story';

const CATEGORY_LABELS: Record<string, string> = {
  seo: 'SEO',
  'social-to-search': 'Social → Búsqueda',
  reputation: 'Reputación',
  paid: 'Paid',
  'weak-signal': 'Señal débil',
  breaking: 'Breaking',
};

const DIRECTION_COLORS = {
  up: 'text-positive',
  down: 'text-negative',
  neutral: 'text-ink',
} as const;

type Props = { story: Story };

export function HeroStory({ story }: Props) {
  const prefersReduced = useReducedMotion();

  const variants = {
    hidden: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <motion.article
      initial="hidden"
      animate="visible"
      variants={variants}
      className="grid grid-cols-[1fr_auto] gap-6 py-6 cursor-pointer border-b border-rule/60"
      onClick={() => console.log(story.id)}
    >
      {/* Left — text */}
      <div className="flex flex-col gap-3 min-w-0">
        {story.isBreaking && (
          <span className="inline-block self-start bg-accent text-white text-[9px] font-sans font-bold tracking-[0.12em] uppercase px-[7px] py-[3px]">
            En portada
          </span>
        )}

        {/* Byline row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="flex items-center justify-center w-4 h-4 text-white text-[8px] font-bold rounded-[3px] shrink-0"
            style={{ backgroundColor: story.brand.color }}
            aria-hidden="true"
          >
            {story.brand.initial}
          </span>
          <span className="text-[11px] font-sans font-semibold text-ink">{story.brand.name}</span>
          <span className="text-ink-tertiary text-[10px]">·</span>
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.1em] text-ink-tertiary">
            {CATEGORY_LABELS[story.category] ?? story.category}
          </span>
          <span className="text-ink-tertiary text-[10px]">·</span>
          <span className="text-[10px] font-mono text-ink-tertiary">
            {formatRelative(story.detectedAt)}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif font-normal text-[22px] lg:text-[26px] leading-[1.25] text-ink hover:opacity-75 transition-opacity">
          {story.headline}
        </h1>

        {/* Deck */}
        {story.deck && (
          <p className="font-switzer text-[13px] text-ink-secondary leading-[1.6] line-clamp-3">
            {story.deck}
          </p>
        )}

        {/* Signal inline — compact */}
        <div className="flex items-baseline gap-5 mt-1">
          <div className={cn('flex flex-col', DIRECTION_COLORS[story.signal.primary.direction])}>
            <span className="font-serif font-normal text-[30px] leading-none tabular-nums">
              {story.signal.primary.value}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-widest mt-0.5 text-ink-tertiary">
              {story.signal.primary.label}
            </span>
          </div>
          {story.signal.secondary && (
            <div className={cn('flex flex-col', DIRECTION_COLORS[story.signal.secondary.direction])}>
              <span className="font-serif font-normal text-[30px] leading-none tabular-nums">
                {story.signal.secondary.value}
              </span>
              <span className="font-mono text-[8px] uppercase tracking-widest mt-0.5 text-ink-tertiary">
                {story.signal.secondary.label}
              </span>
            </div>
          )}
        </div>

        {/* Sources + CTA */}
        <div className="flex items-center gap-4 mt-auto pt-1">
          <SourceChips sources={story.sources} size="sm" />
          <button className="text-[11px] font-sans font-semibold text-ink border border-ink/70 px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors duration-150 shrink-0">
            Leer análisis ↗
          </button>
        </div>
      </div>

      {/* Right — signal visual */}
      <div className="w-[160px] lg:w-[200px] shrink-0 self-start">
        <SignalVisual signal={story.signal} brand={story.brand} size="hero" />
      </div>
    </motion.article>
  );
}
