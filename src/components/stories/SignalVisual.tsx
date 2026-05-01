import { cn } from '@/lib/utils';
import type { Brand, Signal } from '@/types/story';

const DIRECTION_COLORS = {
  up: 'text-positive',
  down: 'text-negative',
  neutral: 'text-ink',
} as const;

type Props = {
  signal: Signal;
  brand: Brand;
  size?: 'hero' | 'card';
};

export function SignalVisual({ signal, brand, size = 'hero' }: Props) {
  const isHero = size === 'hero';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg flex flex-col items-center justify-center',
        isHero ? 'aspect-square w-full' : 'h-[150px] w-full'
      )}
      style={{ backgroundColor: `${brand.color}14` }}
      aria-label={`Señal: ${signal.primary.value} ${signal.primary.label}${signal.secondary ? `, ${signal.secondary.value} ${signal.secondary.label}` : ''}`}
    >
      {/* Decorative initial — purely visual */}
      <span
        className="absolute font-serif font-bold leading-none select-none pointer-events-none"
        style={{
          fontSize: isHero ? '220px' : '110px',
          color: `${brand.color}1a`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      >
        {brand.initial}
      </span>

      {/* Signal numbers */}
      <div className="relative z-10 text-center px-4">
        <div className={DIRECTION_COLORS[signal.primary.direction]}>
          <p
            className={cn(
              'font-serif font-bold leading-none tabular-nums',
              isHero ? 'text-[60px] lg:text-[72px]' : 'text-[38px]'
            )}
          >
            {signal.primary.value}
          </p>
          <p
            className={cn(
              'font-mono uppercase tracking-widest mt-1',
              isHero ? 'text-[11px]' : 'text-[9px]'
            )}
          >
            {signal.primary.label}
          </p>
        </div>

        {signal.secondary && (
          <div className={cn('mt-4', DIRECTION_COLORS[signal.secondary.direction])}>
            <p
              className={cn(
                'font-serif font-bold leading-none tabular-nums',
                isHero ? 'text-[44px] lg:text-[52px]' : 'text-[28px]'
              )}
            >
              {signal.secondary.value}
            </p>
            <p
              className={cn(
                'font-mono uppercase tracking-widest mt-1',
                isHero ? 'text-[11px]' : 'text-[9px]'
              )}
            >
              {signal.secondary.label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
