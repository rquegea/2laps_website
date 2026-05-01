'use client';

import { cn } from '@/lib/utils';
import { SaveButton, ShareButton } from './StoryCardMenu';
import type { NewsItem } from '@/types/feed';

interface NewsGridProps {
  news: NewsItem[] | undefined;
  onToggleSave?: (storyId: number) => void;
}

export function NewsGrid({ news, onToggleSave }: NewsGridProps) {
  if (!news || news.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {news.map((item) => (
        <NewsCard key={item.id} item={item} onToggleSave={onToggleSave} />
      ))}
    </div>
  );
}

function NewsCard({ item, onToggleSave }: { item: NewsItem; onToggleSave?: (id: number) => void }) {
  return (
    <div className="relative group h-full">
      <article className="bg-card rounded-xl border border-border overflow-hidden cursor-pointer hover:shadow-lg hover:border-border/80 transition-all duration-300 flex flex-col h-full">
        {item.image && (
          <div className="w-full aspect-[16/10] overflow-hidden">
            <img
              src={item.image}
              alt={item.headline}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <h3 className="text-sm sm:text-base font-['Switzer'] font-medium text-foreground leading-tight tracking-tight group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
            {item.headline}
          </h3>

          <div className="flex items-center justify-between mt-2 sm:mt-3">
            {item.sources && item.sources.length > 0 ? (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center -space-x-0.5">
                  {item.sources.slice(0, 2).map((source, idx) => (
                    <a
                      key={idx}
                      href={`https://${source.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-4 h-4 rounded-full border border-background bg-background shadow-sm overflow-hidden hover:scale-110 transition-transform"
                      title={source.name}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${source.url}&sz=32`}
                        alt={source.name ?? source.url}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.style.display = 'none';
                          if (t.parentElement) t.parentElement.innerHTML = '<span class="text-[5px]">📰</span>';
                        }}
                      />
                    </a>
                  ))}
                  {item.sources.length > 2 && (
                    <div className="w-4 h-4 rounded-full border border-background bg-muted shadow-sm flex items-center justify-center">
                      <span className="text-[7px] font-semibold text-muted-foreground">
                        +{item.sources.length - 2}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {item.sources.length} {item.sources.length === 1 ? 'fuente' : 'fuentes'}
                </span>
              </div>
            ) : <div />}

            <div className="flex items-center gap-0.5" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
              <ShareButton storyId={item.id} />
              {onToggleSave && (
                <SaveButton storyId={item.id} isSaved={!!item.is_saved} onToggleSave={onToggleSave} />
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
