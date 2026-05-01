'use client';

import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp, Flame, Zap } from 'lucide-react';
import type { NewsItem, TickerSegment } from '@/types/feed';

function SegmentItem({ seg }: { seg: TickerSegment }) {
  if (seg.segment === 'mover') {
    const isUp = seg.trend === 'up';
    const isDown = seg.trend === 'down';
    return (
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 border-r border-border last:border-r-0">
        {isUp && <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5] text-green-600" />}
        {isDown && <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5] text-red-600" />}
        <span className="text-foreground font-bold text-[12px] sm:text-[13px] tracking-tight">
          {seg.label}
        </span>
        <span className={cn(
          'font-semibold text-[10px] sm:text-[12px] tabular-nums',
          isUp && 'text-green-600',
          isDown && 'text-red-600',
          !isUp && !isDown && 'text-muted-foreground'
        )}>
          {seg.delta}
        </span>
      </div>
    );
  }

  if (seg.segment === 'trending') {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 border-r border-border last:border-r-0">
        <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5] text-amber-500" />
        <span className="text-foreground font-bold text-[12px] sm:text-[13px] tracking-tight">
          {seg.label}
        </span>
        <span className="font-semibold text-[10px] sm:text-[12px] tabular-nums text-amber-600">
          {seg.delta}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 border-r border-border last:border-r-0">
      <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5] text-violet-500" />
      <span className="text-foreground font-bold text-[12px] sm:text-[13px] tracking-tight">
        {seg.label}
      </span>
      <span className="font-semibold text-[10px] sm:text-[12px] tabular-nums text-violet-600">
        Anomalía
      </span>
    </div>
  );
}

function LegacyItem({ item }: { item: NewsItem }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 border-r border-border last:border-r-0">
      <span className="text-foreground font-bold text-[12px] sm:text-[13px] tracking-tight">
        {item.entity}
      </span>
      <span className="text-foreground/80 font-semibold text-[12px] sm:text-[13px] tabular-nums">
        {item.score.toFixed(1)}
      </span>
      <div className={cn(
        'flex items-center gap-0.5 font-semibold text-[10px] sm:text-[12px] tabular-nums',
        item.trend === 'up' && 'text-green-600',
        item.trend === 'down' && 'text-red-600',
        item.trend === 'neutral' && 'text-muted-foreground'
      )}>
        {item.trend === 'up' && <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />}
        {item.trend === 'down' && <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />}
        <span>{item.delta}</span>
      </div>
    </div>
  );
}

interface TickerBarProps {
  segments?: TickerSegment[];
  items?: NewsItem[];
}

export function TickerBar({ segments, items = [] }: TickerBarProps) {
  const useSegments = segments && segments.length > 0;
  const useItems = !useSegments && items && items.length > 0;

  if (!useSegments && !useItems) return null;

  const tripled = useSegments
    ? [...segments!, ...segments!, ...segments!]
    : [...items, ...items, ...items];

  return (
    <div className="w-full bg-muted/60 border-y border-border py-2 sm:py-2.5 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-muted/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-muted/60 to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {useSegments
          ? (tripled as TickerSegment[]).map((seg, i) => (
              <SegmentItem key={`${seg.label}-${i}`} seg={seg} />
            ))
          : (tripled as NewsItem[]).map((item, i) => (
              <LegacyItem key={`${item.id}-${i}`} item={item} />
            ))}
      </div>
    </div>
  );
}
