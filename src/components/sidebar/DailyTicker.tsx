import { cn } from '@/lib/utils';

type TickerItem = {
  id: string;
  brandName: string;
  brandColor: string;
  brandInitial: string;
  value: string;
  label: string;
  direction: 'up' | 'down' | 'neutral';
};

const items: TickerItem[] = [
  { id: 'gullon', brandName: 'Gullón', brandColor: '#d4572a', brandInitial: 'G', value: '+34%', label: 'Branded search', direction: 'up' },
  { id: 'zara', brandName: 'Zara', brandColor: '#111111', brandInitial: 'Z', value: '+40%', label: 'Búsquedas org.', direction: 'up' },
  { id: 'mediamarkt', brandName: 'MediaMarkt', brandColor: '#e30613', brandInitial: 'M', value: '+3 días', label: 'Trending TikTok', direction: 'up' },
  { id: 'lidl', brandName: 'Lidl', brandColor: '#0050aa', brandInitial: 'L', value: '−47', label: 'Featured snippets', direction: 'down' },
  { id: 'vueling', brandName: 'Vueling', brandColor: '#fdcc06', brandInitial: 'V', value: '4.2K', label: 'Menciones neg.', direction: 'down' },
  { id: 'mercadona', brandName: 'Mercadona', brandColor: '#00a651', brandInitial: 'M', value: '+31', label: 'Snippets ganados', direction: 'up' },
];

export function DailyTicker() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-sans font-bold uppercase tracking-[0.1em] text-ink">
          Movimientos del día
        </h3>
        <span className="text-[10px] font-sans text-ink-tertiary cursor-pointer hover:text-ink transition-colors">
          Ver todos →
        </span>
      </div>

      <div className="flex flex-col divide-y divide-rule/60">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2.5 gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="flex items-center justify-center w-5 h-5 text-white text-[8px] font-bold rounded-[3px] shrink-0"
                style={{ backgroundColor: item.brandColor }}
                aria-hidden="true"
              >
                {item.brandInitial}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-sans font-semibold text-ink truncate">{item.brandName}</p>
                <p className="text-[9px] font-mono text-ink-tertiary truncate">{item.label}</p>
              </div>
            </div>
            <span
              className={cn(
                'text-[12px] font-serif font-normal tabular-nums shrink-0',
                item.direction === 'up' && 'text-positive',
                item.direction === 'down' && 'text-negative',
                item.direction === 'neutral' && 'text-ink-secondary'
              )}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
