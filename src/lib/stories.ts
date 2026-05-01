import type { Story } from '@/types/story';

export const heroStory: Story = {
  id: 'gullon-seo-google',
  brand: { id: 'gullon', name: 'Gullón', color: '#d4572a', initial: 'G' },
  category: 'breaking',
  headline:
    'Gullón se estampa en su SEO pero se dispara en Google — y sus competidores no tienen ni idea de por qué',
  deck: 'Sus rankings orgánicos cayeron un 18% en 14 días, pero el volumen de búsqueda de marca creció un 34%. El agente detectó una campaña de influencers descoordinada en TikTok que generó demanda real sin captura. El tráfico se lo está llevando otro.',
  sources: ['tiktok', 'search-console', 'semrush', 'google-trends'],
  signal: {
    primary: { value: '+34%', label: 'Branded search', direction: 'up' },
    secondary: { value: '−18%', label: 'Orgánico SEO', direction: 'down' },
  },
  sector: 'retail',
  detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  isBreaking: true,
};

export const gridStories: Story[] = [
  {
    id: 'mediamarkt-tiktok-bf',
    brand: { id: 'mediamarkt', name: 'MediaMarkt', color: '#e30613', initial: 'M' },
    category: 'social-to-search',
    headline: 'El Black Friday de MediaMarkt duró 3 días más en TikTok que en su propia web',
    deck: 'Tres microinfluencers mantuvieron vivo el hashtag sin contrato. Tráfico capturado por MediaMarkt: cero.',
    sources: ['tiktok', 'ga4', 'search-console'],
    signal: {
      primary: { value: '+3 días', label: 'Tendencia TikTok', direction: 'up' },
    },
    sector: 'retail',
    detectedAt: new Date(Date.now() - 26 * 60 * 60 * 1000),
  },
  {
    id: 'lidl-mercadona-snippets',
    brand: { id: 'lidl', name: 'Lidl', color: '#0050aa', initial: 'L' },
    competitor: { id: 'mercadona', name: 'Mercadona', color: '#00a651', initial: 'M' },
    category: 'seo',
    headline: 'Lidl pierde 47 featured snippets de recetas. Mercadona entra por la puerta de atrás',
    deck: 'No fue Google. Fue schema markup que Lidl no desplegó a tiempo. Mercadona sí lo tenía listo.',
    sources: ['semrush', 'search-console', 'schema'],
    signal: {
      primary: { value: '−47', label: 'Snippets Lidl', direction: 'down' },
      secondary: { value: '+31', label: 'Snippets Mercadona', direction: 'up' },
    },
    sector: 'retail',
    detectedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: 'vueling-reddit-crisis',
    brand: { id: 'vueling', name: 'Vueling', color: '#fdcc06', initial: 'V' },
    category: 'reputation',
    headline: 'Vueling acumula 4.200 menciones negativas en X. El 60% viene de un solo hilo de Reddit',
    deck: 'Un hilo sobre retrasos se replicó masivamente. El origen es rastreable y gestionable.',
    sources: ['x', 'reddit'],
    signal: {
      primary: { value: '4.2K', label: 'Menciones negativas', direction: 'down' },
    },
    sector: 'turismo',
    detectedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: 'zara-branded-search',
    brand: { id: 'zara', name: 'Zara', color: '#111111', initial: 'Z' },
    category: 'weak-signal',
    headline: 'Zara suma 2.3M de búsquedas branded en dos semanas sin campaña visible. Algo está pasando',
    deck: 'El volumen supera en un 40% las semanas anteriores sin ninguna acción de paid visible en el mercado español.',
    sources: ['google-trends', 'search-console', 'semrush'],
    signal: {
      primary: { value: '2.3M', label: 'Búsquedas branded', direction: 'up' },
    },
    sector: 'retail',
    detectedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
];
