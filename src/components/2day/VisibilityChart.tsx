'use client';

import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { EntityTrend } from '@/types/feed';

export function VisibilityChart({ data }: { data: EntityTrend }) {
  const { entity, currentScore, delta, trend, historical } = data;

  const isUp = trend === 'up';
  const isDown = trend === 'down';
  const strokeColor = isUp ? '#16a34a' : isDown ? '#dc2626' : '#6b7280';
  const gradientId = `gradient-${entity.replace(/\s+/g, '-')}`;
  const TrendIcon = isUp ? TrendingUp : isDown ? TrendingDown : null;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <span className="font-semibold text-xs text-foreground truncate flex-1">{entity}</span>
        <div className="flex flex-col items-end gap-0.5 ml-2">
          <span className="text-xs font-medium tabular-nums text-foreground">
            {currentScore.toFixed(1)}
          </span>
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium tabular-nums',
            isUp && 'text-green-600',
            isDown && 'text-red-600',
            !isUp && !isDown && 'text-muted-foreground'
          )}>
            <span>{delta}</span>
            {TrendIcon && <TrendIcon className="h-3 w-3" />}
          </div>
        </div>
      </div>

      <div className="h-[50px] sm:h-[60px] md:h-[70px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historical} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-900/80 text-white px-2 py-1 rounded text-xs font-medium tabular-nums border border-gray-700/50">
                      {(payload[0].value as number)?.toFixed(1)}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={strokeColor}
              fill={`url(#${gradientId})`}
              strokeWidth={1.5}
              dot={false}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function VisibilityChartSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="h-3 bg-muted rounded w-24" />
        <div className="flex flex-col items-end gap-0.5 ml-2">
          <div className="h-3 bg-muted rounded w-8" />
          <div className="h-3 bg-muted rounded w-10" />
        </div>
      </div>
      <div className="h-[50px] sm:h-[60px] md:h-[70px] bg-muted rounded" />
    </div>
  );
}
