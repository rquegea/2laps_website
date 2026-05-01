export type Brand = {
  id: string;
  name: string;
  color: string;
  initial: string;
};

export type Source =
  | 'tiktok'
  | 'instagram'
  | 'x'
  | 'youtube'
  | 'reddit'
  | 'search-console'
  | 'semrush'
  | 'ahrefs'
  | 'google-trends'
  | 'meta-ads'
  | 'google-ads'
  | 'ga4'
  | 'schema';

export type StoryCategory =
  | 'seo'
  | 'social-to-search'
  | 'reputation'
  | 'paid'
  | 'weak-signal'
  | 'breaking';

export type SignalValue = {
  value: string;
  label: string;
  direction: 'up' | 'down' | 'neutral';
};

export type Signal = {
  primary: SignalValue;
  secondary?: SignalValue;
};

export type Story = {
  id: string;
  brand: Brand;
  competitor?: Brand;
  category: StoryCategory;
  headline: string;
  deck?: string;
  sources: Source[];
  signal: Signal;
  sector: 'retail' | 'banca' | 'turismo' | 'tech' | 'auto' | 'farma';
  detectedAt: Date;
  isBreaking?: boolean;
};
