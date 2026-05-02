'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Hero2Day } from '@/components/2day/Hero2Day';
import { NewsGrid } from '@/components/2day/NewsGrid';
import { TopNav } from '@/components/nav/TopNav';
import { Footer } from '@/components/nav/Footer';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { mockFeedItems } from '@/lib/mock-feed';
import type { NewsItem } from '@/types/feed';

export default function Page() {
  const [embed, setEmbed] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<'daily' | 'favorites'>('daily');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isEmbed = new URLSearchParams(window.location.search).get('embed') === '1';
    setEmbed(isEmbed);
    if (!isEmbed) return;
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === '2laps-theme') {
        if (e.data.theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    }
    if (calendarOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [calendarOpen]);

  const feedItems: NewsItem[] = mockFeedItems.map((item) => ({
    ...item,
    is_saved: savedIds.has(item.id),
  }));

  const handleToggleSave = useCallback((storyId: number) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(storyId)) next.delete(storyId);
      else next.add(storyId);
      return next;
    });
  }, []);

  const savedStories = feedItems.filter((item) => savedIds.has(item.id));

  return (
    <div className="min-h-screen bg-background">
      {!embed && <TopNav />}

      {/* Embed-mode compact header */}
      {embed && (
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-5 pb-3">
          <h1
            className="text-3xl font-semibold text-foreground leading-none tracking-tight"
            style={{ fontFamily: 'Switzer, Helvetica Neue, Arial, sans-serif' }}
          >
            2day
          </h1>
        </div>
      )}

      {/* Title + Tabs */}
      {!embed && <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-5 sm:pt-8 pb-3 sm:pb-4">
        <h1 className="font-['Switzer'] font-medium text-foreground leading-[1] tracking-[-0.04em]" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}>
          2day
        </h1>
        <div className="mt-3 sm:mt-4 flex items-end justify-between border-b border-border">
          <div className="flex gap-0">
            <button
              onClick={() => setActiveTab('daily')}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
                activeTab === 'daily'
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              Diario
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
                activeTab === 'favorites'
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              Guardados
            </button>
          </div>

          <div className="relative mb-1" ref={calendarRef}>
            <button
              onClick={() => setCalendarOpen((v) => !v)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium rounded-md border border-border',
                'bg-background text-foreground hover:bg-muted transition-colors duration-150',
                !selectedDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="h-3.5 w-3.5 opacity-60" />
              {selectedDate
                ? format(selectedDate, "d MMM yyyy", { locale: es })
                : 'Seleccionar fecha'}
            </button>
            {calendarOpen && (
              <div className="absolute top-full right-0 mt-1 z-[200] bg-card border border-border shadow-lg rounded-md">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => { setSelectedDate(d); setCalendarOpen(false); }}
                  initialFocus
                />
              </div>
            )}
          </div>
        </div>
      </div>}

      {activeTab === 'daily' ? (
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pb-8 sm:pb-12 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

            {/* Main — 9 cols */}
            <main className="lg:col-span-9 min-w-0 space-y-6 sm:space-y-8">
              {(() => {
                const sections: React.ReactNode[] = [];
                let index = 0;
                let heroCount = 0;

                while (index < feedItems.length) {
                  const imageOnLeft = heroCount % 2 !== 0;
                  sections.push(
                    <section key={`hero-${index}`} className="mb-6 sm:mb-10">
                      <Hero2Day
                        story={feedItems[index]}
                        imageOnLeft={imageOnLeft}
                        onToggleSave={handleToggleSave}
                      />
                    </section>
                  );
                  index++;
                  heroCount++;

                  if (index < feedItems.length) {
                    const gridItems = feedItems.slice(index, index + 3);
                    sections.push(
                      <section key={`grid-${index}`} className="border-t border-border pt-6 sm:pt-8 mb-6 sm:mb-10">
                        <NewsGrid news={gridItems} onToggleSave={handleToggleSave} />
                      </section>
                    );
                    index += gridItems.length;
                  }
                }
                return sections;
              })()}
            </main>

            {/* Sidebar — 3 cols */}
            <aside className="lg:col-span-3 min-w-0 space-y-6">
              <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">
                  Visibility Movers
                </h3>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">
                  Sentimiento de mercado
                </h3>
              </div>
            </aside>

          </div>
        </div>
      ) : (
        /* Favoritos */
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pb-8 sm:pb-12 pt-4">
          {savedStories.length === 0 ? (
            <div className="border border-border h-48 flex flex-col items-center justify-center gap-3 bg-muted/20">
              <span className="text-foreground font-medium text-sm">
                Inicia sesión para guardar tu contenido
              </span>
              <a
                href="https://platform.2laps.ai"
                className="text-[12px] font-sans font-600 text-foreground border border-border px-4 py-1.5 hover:bg-muted transition-colors"
              >
                Entrar →
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <NewsGrid news={savedStories} onToggleSave={handleToggleSave} />
            </div>
          )}
        </div>
      )}
      {!embed && <Footer />}
    </div>
  );
}
