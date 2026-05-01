'use client';

import { cn } from '@/lib/utils';
import { SaveButton, ShareButton } from './StoryCardMenu';
import type { NewsItem } from '@/types/feed';

interface Hero2DayProps {
  story: NewsItem;
  imageOnLeft?: boolean;
  onToggleSave?: (storyId: number) => void;
}

export function Hero2Day({ story, imageOnLeft = true, onToggleSave }: Hero2DayProps) {
  if (!story) return null;

  return (
    <div
      className="relative group block w-full mb-6 sm:mb-8 md:mb-12"
      style={{ animation: 'fadeInUp 0.7s ease both' }}
    >
      <div className="flex flex-col md:flex-row gap-3 sm:gap-6 md:gap-8 md:items-center">
        {story.image && (
          <div className={cn(
            'w-full md:flex-[3] aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:h-[380px] bg-muted rounded-lg sm:rounded-xl shadow-md overflow-hidden',
            imageOnLeft ? 'md:order-first' : 'md:order-last'
          )}>
            <img
              src={story.image}
              alt={story.headline}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className={cn('flex flex-col justify-between w-full', story.image ? 'md:flex-[2]' : '')}>
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-foreground leading-[1.1] tracking-tight group-hover:text-red-600 transition-colors duration-300 cursor-pointer">
                {story.headline}
              </h1>
            </div>

            <div className="prose prose-sm sm:prose-lg text-muted-foreground leading-relaxed max-w-none border-l-4 border-foreground pl-4 sm:pl-6 py-1 sm:py-2">
              <p className="line-clamp-3 sm:line-clamp-none">{story.summary}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 sm:mt-6">
            {story.sources && story.sources.length > 0 ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center -space-x-1.5">
                  {story.sources.slice(0, 3).map((source, idx) => (
                    <a
                      key={idx}
                      href={`https://${source.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-6 h-6 rounded-full border border-background bg-background shadow-sm flex items-center justify-center overflow-hidden hover:scale-110 transition-transform"
                      title={source.name}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${source.url}&sz=16`}
                        alt={source.name ?? source.url}
                        className="w-4 h-4 object-contain"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.style.display = 'none';
                          if (t.parentElement) t.parentElement.innerHTML = '<span class="text-[8px]">📰</span>';
                        }}
                      />
                    </a>
                  ))}
                  {story.sources.length > 3 && (
                    <div className="w-6 h-6 rounded-full border border-background bg-muted shadow-sm flex items-center justify-center">
                      <span className="text-[10px] font-semibold text-muted-foreground">
                        +{story.sources.length - 3}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  +{story.sources.length} {story.sources.length === 1 ? 'fuente detectada' : 'fuentes detectadas'}
                </span>
              </div>
            ) : <div />}

            <div className="flex items-center gap-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
              <ShareButton storyId={story.id} />
              {onToggleSave && (
                <SaveButton storyId={story.id} isSaved={!!story.is_saved} onToggleSave={onToggleSave} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
