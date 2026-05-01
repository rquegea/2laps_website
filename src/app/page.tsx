import { TopNav } from '@/components/nav/TopNav';
import { Footer } from '@/components/nav/Footer';
import { TodayHero } from '@/components/home/TodayHero';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <TodayHero />
      <Footer />
    </div>
  );
}
