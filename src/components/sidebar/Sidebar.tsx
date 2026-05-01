import { DailyTicker } from './DailyTicker';
import { TrendingBrands } from './TrendingBrands';

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-7 pt-6 pl-6 border-l border-rule/60 sticky top-[57px] max-h-[calc(100vh-57px)] overflow-y-auto">
      <DailyTicker />
      <div className="border-t border-rule/60" />
      <TrendingBrands />
    </aside>
  );
}
