export type NewsSource = {
  url: string;
  name?: string;
};

export type NewsItem = {
  id: number;
  entity: string;
  headline: string;
  summary: string;
  date: string;
  image?: string;
  sources: NewsSource[];
  trend: 'up' | 'down' | 'neutral';
  score: number;
  delta: string;
  is_saved?: boolean;
};

export type TickerSegment = {
  segment: 'mover' | 'trending' | 'flash';
  label: string;
  delta: string;
  trend?: 'up' | 'down' | 'neutral';
};

export type EntityTrend = {
  entity: string;
  currentScore: number;
  delta: string;
  trend: 'up' | 'down' | 'neutral';
  historical: Array<{ value: number }>;
};

export type SentimentItem = {
  marca: string;
  sentiment_score: number;
  total_menciones: number;
};
