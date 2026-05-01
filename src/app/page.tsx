import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { TopNav } from '@/components/nav/TopNav';
import { Footer } from '@/components/nav/Footer';
import { TodayHero } from '@/components/home/TodayHero';
import { mockFeedItems } from '@/lib/mock-feed';
import type { Source } from '@/types/story';
import type { NewsSource } from '@/types/feed';

/** Map a NewsSource (url+name) to the typed Source key used by SourceChips */
function toSource(ns: NewsSource): Source | null {
  const byName: Record<string, Source> = {
    'SEMrush': 'semrush',
    'Search Console': 'search-console',
    'TikTok': 'tiktok',
    'Google Trends': 'google-trends',
    'GA4': 'ga4',
    'X': 'x',
    'Reddit': 'reddit',
    'Schema': 'schema',
    'Instagram': 'instagram',
    'YouTube': 'youtube',
    'Meta Ads': 'meta-ads',
    'Google Ads': 'google-ads',
    'Ahrefs': 'ahrefs',
  };
  return (ns.name ? byName[ns.name] : null) ?? null;
}

export default function HomePage() {
  const formattedDate = format(new Date(), 'd MMM yyyy', { locale: es }).toUpperCase();
  const hero = mockFeedItems[0];

  const hoursAgo = Math.round((Date.now() - new Date(hero.date).getTime()) / (1000 * 60 * 60));
  const timeAgo = `Hace ${hoursAgo} ${hoursAgo === 1 ? 'hora' : 'horas'}`;

  const sources = hero.sources.flatMap((ns) => {
    const s = toSource(ns);
    return s ? [s] : [];
  });

  const previewStories = mockFeedItems.slice(1, 4).map((item) => ({
    label: item.entity,
    title: item.headline,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <TodayHero
        headline={hero.headline}
        deck={hero.summary}
        sources={sources}
        timeAgo={timeAgo}
        formattedDate={formattedDate}
        previewStories={previewStories}
      />
      <Footer />
    </div>
  );
}
