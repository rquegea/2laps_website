import { cn } from '@/lib/utils';

type TrendingItem = {
  id: string;
  name: string;
  color: string;
  initial: string;
  sector: string;
  change: string;
  direction: 'up' | 'down';
};

const items: TrendingItem[] = [
  { id: 'zara', name: 'Zara', color: '#111111', initial: 'Z', sector: 'Retail', change: '+40%', direction: 'up' },
  { id: 'gullon', name: 'Gullón', color: '#d4572a', initial: 'G', sector: 'Retail', change: '+34%', direction: 'up' },
  { id: 'mercadona', name: 'Mercadona', color: '#00a651', initial: 'M', sector: 'Retail', change: '+18%', direction: 'up' },
  { id: 'lidl', name: 'Lidl', color: '#0050aa', initial: 'L', sector: 'Retail', change: '−12%', direction: 'down' },
  { id: 'vueling', name: 'Vueling', color: '#fdcc06', initial: 'V', sector: 'Turismo', change: '−15%', direction: 'down' },
];

export function TrendingBrands() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-sans font-bold uppercase tracking-[0.1em] text-ink">
          Marcas en tendencia
        </h3>
        <span className="text-[10px] font-sans text-ink-tertiary cursor-pointer hover:text-ink transition-colors">
          Ver todas →
        </span>
      </div>

      <div className="flex flex-col gap-0">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="flex items-center gap-3 py-2.5 border-b border-rule/50 last:border-b-0 cursor-pointer group"
          >
            {/* Rank */}
            <span className="text-[11px] font-mono text-ink-tertiary w-4 shrink-0 text-center">
              {i + 1}
            </span>

            {/* Brand icon */}
            <span
              className="flex items-center justify-center w-7 h-7 text-white text-[10px] font-bold rounded-[4px] shrink-0"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            >
              {item.initial}
            </span>

            {/* Name + sector */}
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-sans font-semibold text-ink group-hover:opacity-75 transition-opacity truncate">
                {item.name}
              </p>
              <p className="text-[9px] font-mono text-ink-tertiary uppercase tracking-[0.08em]">
                {item.sector}
              </p>
            </div>

            {/* Change */}
            <span
              className={cn(
                'text-[12px] font-serif font-normal tabular-nums shrink-0',
                item.direction === 'up' ? 'text-positive' : 'text-negative'
              )}
            >
              {item.change}
            </span>
          </div>
        ))}
      </div>

      {/* CTA pequeño */}
      <div className="mt-4 p-3 bg-ink text-paper">
        <p className="text-[11px] font-sans font-semibold">Hazlo tuyo</p>
        <p className="text-[10px] font-switzer text-paper/70 mt-0.5">
          Solo las marcas que te importan.
        </p>
        <button className="mt-2 text-[10px] font-sans font-bold uppercase tracking-[0.08em] text-paper border border-paper/30 px-3 py-1.5 hover:bg-paper hover:text-ink transition-colors">
          Personalizar →
        </button>
      </div>
    </section>
  );
}
