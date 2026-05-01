import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { TopNav } from '@/components/nav/TopNav';
import { Footer } from '@/components/nav/Footer';
import { TodayHero } from '@/components/home/TodayHero';
import { heroStory } from '@/lib/stories';

export default function HomePage() {
  const formattedDate = format(new Date(), 'd MMM yyyy', { locale: es }).toUpperCase();

  const hoursAgo = Math.round(
    (Date.now() - heroStory.detectedAt.getTime()) / (1000 * 60 * 60)
  );
  const timeAgo = `Hace ${hoursAgo} ${hoursAgo === 1 ? 'hora' : 'horas'}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <TodayHero
        headline={heroStory.headline}
        deck={heroStory.deck ?? ''}
        sources={heroStory.sources}
        timeAgo={timeAgo}
        formattedDate={formattedDate}
      />
      <Footer />
    </div>
  );
}
