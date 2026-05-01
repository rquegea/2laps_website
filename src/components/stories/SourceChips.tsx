import type { Source } from '@/types/story';

export const SOURCE_LABELS: Record<Source, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  x: 'X',
  reddit: 'Reddit',
  youtube: 'YouTube',
  'search-console': 'Search Console',
  semrush: 'SEMrush',
  ahrefs: 'Ahrefs',
  'google-trends': 'Google Trends',
  'meta-ads': 'Meta Ads',
  'google-ads': 'Google Ads',
  ga4: 'GA4',
  schema: 'Schema',
};

const SOURCE_COLORS: Record<Source, string> = {
  tiktok: '#010101',
  instagram: '#C13584',
  x: '#14171A',
  reddit: '#FF4500',
  youtube: '#FF0000',
  'search-console': '#4285F4',
  semrush: '#FF6422',
  ahrefs: '#1e73be',
  'google-trends': '#34A853',
  'meta-ads': '#1877F2',
  'google-ads': '#FBBC04',
  ga4: '#E37400',
  schema: '#6B7280',
};

const SOURCE_INITIALS: Record<Source, string> = {
  tiktok: 'Tk',
  instagram: 'Ig',
  x: 'X',
  reddit: 'Rd',
  youtube: 'Yt',
  'search-console': 'SC',
  semrush: 'Se',
  ahrefs: 'Ah',
  'google-trends': 'GT',
  'meta-ads': 'Ma',
  'google-ads': 'GA',
  ga4: 'G4',
  schema: 'Sc',
};

type Props = {
  sources: Source[];
  size?: 'default' | 'sm';
};

export function SourceChips({ sources, size = 'default' }: Props) {
  const iconSize = size === 'sm' ? 18 : 22;
  const overlap = size === 'sm' ? -5 : -6;
  const fontSize = size === 'sm' ? 7 : 8;
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-[11px]';

  return (
    <div className="flex items-center gap-2">
      {/* Stacked circular icons */}
      <div className="flex items-center">
        {sources.map((source, i) => (
          <span
            key={source}
            title={SOURCE_LABELS[source]}
            className="rounded-full border-2 border-paper flex items-center justify-center text-white font-bold relative shrink-0"
            style={{
              backgroundColor: SOURCE_COLORS[source],
              width: iconSize,
              height: iconSize,
              fontSize,
              marginLeft: i > 0 ? overlap : 0,
              zIndex: sources.length - i,
            }}
          >
            {SOURCE_INITIALS[source]}
          </span>
        ))}
      </div>

      {/* Count label */}
      <span className={`${textSize} font-sans text-ink-tertiary`}>
        {sources.length} {sources.length === 1 ? 'fuente' : 'fuentes'}
      </span>
    </div>
  );
}
