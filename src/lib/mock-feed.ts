import type { NewsItem, TickerSegment, EntityTrend, SentimentItem } from '@/types/feed';

export const mockFeedItems: NewsItem[] = [
  {
    id: 1,
    entity: 'Gullón',
    headline: 'Gullón se estampa en su SEO pero se dispara en Google — y sus competidores no tienen ni idea de por qué',
    summary: 'Sus rankings orgánicos cayeron un 18% en 14 días, pero el volumen de búsqueda de marca creció un 34%. Una campaña de influencers descoordinada en TikTok generó demanda real sin captura. El tráfico se lo está llevando otro.',
    date: '30 abr 2026',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
    sources: [
      { url: 'semrush.com', name: 'SEMrush' },
      { url: 'search.google.com', name: 'Search Console' },
      { url: 'tiktok.com', name: 'TikTok' },
      { url: 'trends.google.com', name: 'Google Trends' },
    ],
    trend: 'up',
    score: 72.4,
    delta: '+34%',
  },
  {
    id: 2,
    entity: 'MediaMarkt',
    headline: 'El Black Friday de MediaMarkt duró 3 días más en TikTok que en su propia web',
    summary: 'Tres microinfluencers mantuvieron vivo el hashtag sin contrato. Tráfico capturado por MediaMarkt: cero.',
    date: '29 abr 2026',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop',
    sources: [
      { url: 'tiktok.com', name: 'TikTok' },
      { url: 'analytics.google.com', name: 'GA4' },
      { url: 'search.google.com', name: 'Search Console' },
    ],
    trend: 'up',
    score: 58.1,
    delta: '+3 días',
  },
  {
    id: 3,
    entity: 'Lidl',
    headline: 'Lidl pierde 47 featured snippets de recetas. Mercadona entra por la puerta de atrás',
    summary: 'No fue Google. Fue schema markup que Lidl no desplegó a tiempo. Mercadona sí lo tenía listo.',
    date: '30 abr 2026',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop',
    sources: [
      { url: 'semrush.com', name: 'SEMrush' },
      { url: 'search.google.com', name: 'Search Console' },
      { url: 'schema.org', name: 'Schema' },
    ],
    trend: 'down',
    score: 41.3,
    delta: '−47',
  },
  {
    id: 4,
    entity: 'Vueling',
    headline: 'Vueling acumula 4.200 menciones negativas en X. El 60% viene de un solo hilo de Reddit',
    summary: 'Un hilo sobre retrasos en vuelos se replicó masivamente en X durante el fin de semana. El origen es rastreable y gestionable antes de que escale.',
    date: '30 abr 2026',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop',
    sources: [
      { url: 'x.com', name: 'X' },
      { url: 'reddit.com', name: 'Reddit' },
    ],
    trend: 'down',
    score: 28.7,
    delta: '4.2K',
  },
  {
    id: 5,
    entity: 'Zara',
    headline: 'Zara suma 2.3M de búsquedas branded en dos semanas sin campaña visible. Algo está pasando',
    summary: 'El volumen supera en un 40% las semanas anteriores sin ninguna acción de paid visible en el mercado español. La señal es débil pero la curva es clara.',
    date: '30 abr 2026',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop',
    sources: [
      { url: 'trends.google.com', name: 'Google Trends' },
      { url: 'search.google.com', name: 'Search Console' },
      { url: 'semrush.com', name: 'SEMrush' },
    ],
    trend: 'up',
    score: 88.2,
    delta: '+40%',
  },
];

export const mockTickerSegments: TickerSegment[] = [
  { segment: 'mover', label: 'Gullón', delta: '+34%', trend: 'up' },
  { segment: 'trending', label: 'Zara', delta: '+2.3M búsquedas' },
  { segment: 'mover', label: 'Lidl', delta: '−47 snippets', trend: 'down' },
  { segment: 'flash', label: 'Vueling', delta: '' },
  { segment: 'mover', label: 'MediaMarkt', delta: '+3 días trending', trend: 'up' },
  { segment: 'mover', label: 'Mercadona', delta: '+31 snippets', trend: 'up' },
  { segment: 'trending', label: 'Inditex', delta: '+18% visibilidad' },
  { segment: 'mover', label: 'El Corte Inglés', delta: '−9%', trend: 'down' },
];

export const mockVisibilityTrends: EntityTrend[] = [
  {
    entity: 'Zara',
    currentScore: 88.2,
    delta: '+40%',
    trend: 'up',
    historical: [
      { value: 62 }, { value: 64 }, { value: 67 }, { value: 71 },
      { value: 75 }, { value: 82 }, { value: 88 },
    ],
  },
  {
    entity: 'Gullón',
    currentScore: 72.4,
    delta: '+34%',
    trend: 'up',
    historical: [
      { value: 54 }, { value: 55 }, { value: 58 }, { value: 61 },
      { value: 65 }, { value: 69 }, { value: 72 },
    ],
  },
  {
    entity: 'Lidl',
    currentScore: 41.3,
    delta: '−18%',
    trend: 'down',
    historical: [
      { value: 60 }, { value: 58 }, { value: 55 }, { value: 52 },
      { value: 48 }, { value: 44 }, { value: 41 },
    ],
  },
  {
    entity: 'Vueling',
    currentScore: 28.7,
    delta: '−15%',
    trend: 'down',
    historical: [
      { value: 42 }, { value: 40 }, { value: 38 }, { value: 35 },
      { value: 33 }, { value: 31 }, { value: 29 },
    ],
  },
];

export const mockSentiment: SentimentItem[] = [
  { marca: 'Zara', sentiment_score: 45.2, total_menciones: 3200 },
  { marca: 'Gullón', sentiment_score: 32.1, total_menciones: 1800 },
  { marca: 'Lidl', sentiment_score: -18.5, total_menciones: 2400 },
  { marca: 'Vueling', sentiment_score: -62.3, total_menciones: 4200 },
];
