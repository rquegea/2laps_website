# 2laps.ai — Landing

> Inteligencia del paisaje digital. Presentada como periódico, no como dashboard.

---

## El producto en una frase

2laps son **agentes que correlacionan señales del landscape digital** (SEO, social, paid, branded search, sentiment, schema markup, ad spend) y cuando detectan una contradicción, una anomalía o una historia accionable, **escriben un titular**.

No es un dashboard. Es una redacción donde los periodistas son agentes.

---

## Dos productos, dos URLs

- **`2laps.ai`** → Producto de marketing. Periódico público de inteligencia digital. Bajo coste de entrada (email). Crea FOMO. Genera leads.
- **`platform.2laps.ai`** → Producto real. La edición privada del usuario: solo historias sobre su marca y su competencia, con acciones que el agente puede ejecutar.

**Este repo es solo `2laps.ai` (la landing).** La plataforma vive en otro repo.

---

## Filosofía de diseño

> "Lo que importa es el output, no el dato. La experiencia, no la dashboard."

### Principios

1. **Editorial, no SaaS.** Esto se parece más a The Information o Stripe Press que a una landing de Crayon o Brandwatch. Tipografía serif para titulares. Aire generoso. Cero bullets de features.

2. **El feed es el pitch.** Si alguien entra y ve "Gullón se estampa en su SEO pero se dispara en Google" — ya entiende el producto. No necesitamos una sección "Cómo funciona" ni "Features". El contenido vende.

3. **Una sola línea de contexto bajo el logo.** Subtítulo de periódico, no value prop:
   > *Lo que está pasando con tu marca y tu competencia, ahora mismo.*

4. **Cero gráficos de dashboard.** Nada de barras, líneas, donuts. Si necesitamos visualizar una señal, son números crudos contradictorios (ej: `+34%` arriba, `−18%` abajo). El visual *es* la historia.

5. **Las "fuentes" como Perplexity.** Cada historia muestra qué canales correlacionó el agente (TikTok, SEMrush, Search Console, etc.) como chips. Eso es la demostración de inteligencia.

6. **Email gate después de 3-4 historias.** Bloque difuminado debajo con más historias visibles pero ilegibles. FOMO natural, sin pop-up agresivo.

### Lo que NUNCA hacemos en esta landing

- Hero con titular tipo "Transform your marketing with AI agents"
- Bullets de features con iconos
- Logos de "Trusted by..." en gris
- Testimonials con foto en círculo
- Vídeo demo embebido
- Pricing tiers
- Pop-ups, exit intents, chatbots
- Gradientes morados, glassmorphism, AI fluff visual
- La palabra "agente" en copy de marketing (que el lector lo deduzca leyendo)
- Emojis en titulares

---

## Stack técnico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript estricto
- **Estilos:** Tailwind CSS + CSS variables para tokens semánticos
- **Tipografía:**
  - Display/serif: **GT Sectra** o **Tiempos Headline** (alternativa libre: **Newsreader** vía Google Fonts)
  - Body/sans: **Geist** o **Inter** (preferencia: **Geist** por personalidad)
  - Mono: **Geist Mono** (para timestamps, números, chips de fuentes)
- **Animaciones:** Framer Motion. Escalonado al cargar y hover sutil en cards.
- **Iconos:** Lucide React, usados con extrema moderación.
- **Imágenes:** `next/image` siempre. Optimización automática.
- **Forms:** Server actions de Next.js para el email gate.
- **Analítica:** Plausible o PostHog (no Google Analytics).
- **Despliegue:** Vercel.

---

## Tokens de diseño

### Colores

```css
/* Light mode (default) */
--ink: #0a0a0a;              /* Texto principal, casi negro puro */
--ink-secondary: #525252;    /* Texto secundario, decks */
--ink-tertiary: #a3a3a3;     /* Metadatos, timestamps */
--paper: #fafaf7;            /* Fondo, ligeramente cálido (no blanco puro) */
--paper-elevated: #ffffff;   /* Cards, surfaces */
--rule: #e5e5e0;             /* Borders, dividers */
--accent: #c4341c;           /* Rojo periódico, solo para "BREAKING" o alertas */
--positive: #1a7a3c;         /* Verde para señales positivas */
--negative: #b02a2a;         /* Rojo para señales negativas */
```

El fondo `--paper` es clave: ligeramente cálido (`#fafaf7`) — eso da la sensación de papel periódico sin ser literal.

### Tipografía

- **Hero headline:** 40-48px, serif, weight 700, line-height 1.15, letter-spacing -0.02em
- **Card headline (grande):** 22-26px, serif, weight 700
- **Card headline (pequeña):** 16-18px, serif, weight 700
- **Deck (subtítulo):** 14-15px, sans, weight 400, line-height 1.6, color secondary
- **Metadata (tiempo, fuentes):** 11-12px, sans/mono, weight 500, color tertiary
- **Categoría/tag:** 10px, sans, weight 700, letter-spacing 0.12em, UPPERCASE
- **Botones:** 12-13px, sans, weight 600

**Regla:** sentence case en titulares en español. Nunca Title Case americano.

### Espaciado

Sistema de 4px. Padding generoso entre secciones (mínimo 48px de separación entre hero y grid). Las cards respiran — no las metas en una caja apretada.

### Bordes y radios

- Cards: sin bordes visibles. Separadas por whitespace o por línea horizontal de 0.5px.
- Botones primary: sin radius (sharp), tipo periódico.
- Inputs: sin radius.
- Border-radius: `8px` máximo. Las thumbnails de cards pueden ser cuadrados con un radio sutil.

---

## Voz editorial — los titulares

Los titulares son el producto. Tienen que sonar como **periodismo de negocio bien escrito**, no como notificaciones de software.

### Patrones que funcionan

**Contradicción / paradoja:**
> "Gullón se estampa en su SEO pero se dispara en Google — y sus competidores no tienen ni idea de por qué"

**Causa oculta:**
> "Lidl pierde 47 featured snippets de recetas. No fue Google: fue su propio schema markup"

**Movimiento de mercado:**
> "Mercadona entra por la puerta de atrás en las recetas que Lidl dominaba"

**Crisis latente:**
> "Vueling acumula 4.200 menciones negativas en X. El 60% viene de un solo hilo de Reddit"

**Señal débil con consecuencia:**
> "Zara suma 2.3M de búsquedas branded en dos semanas sin campaña visible. Algo está pasando"

### Reglas de redacción

- Sujeto siempre concreto (marca, no "una empresa")
- Verbos de acción, no de estado ("se estampa", "pierde", "entra")
- Concretitud numérica cuando aporta ("47 snippets", "4.200 menciones")
- Tensión narrativa: el titular tiene que prometer una historia, no resumir un dato
- Nunca empezar con "Cómo", "Por qué", "5 razones por las que..."

### Lo que las historias NUNCA dicen

- "Powered by AI"
- "Nuestro algoritmo ha detectado..."
- "Insight generado automáticamente"

El agente está detrás. No se nombra. Se nota por la calidad del análisis.

---

## Estructura de archivos sugerida

```
src/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Landing (la portada)
│   ├── api/
│   │   └── subscribe/route.ts  # Email gate handler
│   └── globals.css             # CSS variables, base styles
├── components/
│   ├── nav/
│   │   ├── TopNav.tsx          # Logo + tabs sectoriales + Entrar
│   │   └── SectorTabs.tsx
│   ├── stories/
│   │   ├── HeroStory.tsx       # Grid de 3 columnas
│   │   ├── SignalVisual.tsx    # Visual de señal (los números contradictorios)
│   │   └── SourceChips.tsx     # Chips de fuentes correlacionadas
│   ├── gate/
│   │   ├── EmailGate.tsx       # Bloque de captura
│   │   └── BlurredPreview.tsx  # Preview difuminado
│   ├── sidebar/
│   │   ├── Sidebar.tsx
│   │   ├── DailyTicker.tsx     # Movimientos del día (vertical)
│   │   └── TrendingBrands.tsx
│   └── ui/                     # Primitivos (Button, Input, etc.)
├── lib/
│   ├── stories.ts              # Datos de historias (mock al inicio)
│   ├── brands.ts               # Catálogo de marcas con su color
│   └── fonts.ts                # Configuración de fuentes
└── types/
    └── story.ts
```

---

## Modelo de datos — Story

```ts
type Brand = {
  id: string;
  name: string;
  color: string;     // Color de marca (hex), usado en chips y fondos
};

type Source = 'tiktok' | 'instagram' | 'x' | 'youtube' | 'reddit' |
              'search-console' | 'semrush' | 'ahrefs' | 'google-trends' |
              'meta-ads' | 'google-ads' | 'ga4' | 'schema';

type StoryCategory = 'seo' | 'social-to-search' | 'reputation' |
                     'paid' | 'weak-signal' | 'breaking';

type Signal = {
  // El visual de la historia. Dos números contradictorios o un número grande.
  primary: { value: string; label: string; direction: 'up' | 'down' | 'neutral' };
  secondary?: { value: string; label: string; direction: 'up' | 'down' | 'neutral' };
};

type Story = {
  id: string;
  brand: Brand;
  competitor?: Brand;        // Si la historia involucra una segunda marca
  category: StoryCategory;
  headline: string;          // El titular. Lo más importante del producto.
  deck?: string;             // Subtítulo / resumen 2-3 líneas (solo en hero y cards grandes)
  sources: Source[];         // Canales que el agente correlacionó
  signal: Signal;            // Visualización de la historia
  sector: 'retail' | 'banca' | 'turismo' | 'tech' | 'auto' | 'farma';
  detectedAt: Date;
  isBreaking?: boolean;
};
```

---

## Layout de la landing — top to bottom

1. **Top nav** (no sticky en mobile, sticky en desktop)
   - Logo `2laps.ai` izquierda
   - Tabs sectoriales centro: `Para ti · Retail · Banca · Turismo · Tech · Auto`
   - Botón `Entrar →` derecha (link a `platform.2laps.ai`)

2. **Subtítulo de periódico** (debajo del nav, una línea)
   - Texto: *Lo que está pasando con tu marca y tu competencia, ahora mismo.*
   - Fecha pequeña a la derecha en mono

3. **Hero story** (full bleed dentro del container, 2 columnas)
   - Izquierda: brand badge + categoría + headline serif + deck + sources + tiempo + botón "Leer análisis"
   - Derecha: visual de la señal (los números contradictorios sobre fondo de color de marca al 8% opacity)

4. **Grid de 3 stories** (debajo del hero, separado por línea de 0.5px)
   - Cada card: thumbnail con visual de señal + categoría + headline + brand row + sources + tiempo

5. **Email gate** (fuente diferente)
   - Título: "Hay 14 historias más esta mañana"
   - Subtítulo: "Deja tu email y léelas todas. Sin tarjeta, sin compromiso."
   - Input email + botón "Leer gratis"
   - Microcopy social proof: "2.400 equipos de marketing en España ya leen 2laps"

6. **Preview difuminado** (3-4 cards más, blur 1.5px y opacity 0.35, no clickables)

7. **Sidebar** (desktop only, columna derecha sticky)
   - "Movimientos del día" — lista vertical estilo ticker pero diaria, no real-time
   - "Marcas en tendencia" — top 5 con flecha verde/roja
   - "Hazlo tuyo" — CTA pequeño para personalizar (lleva al gate de email)

8. **Footer minimalista**
   - Logo, año, link a `platform.2laps.ai`, "Quiénes somos", "Privacidad"

---

## Responsive

- **Desktop (≥1024px):** 3 columnas (contenido + sidebar)
- **Tablet (768-1023px):** Sin sidebar; ticker movido al final como sección horizontal
- **Mobile (<768px):** Una columna. Hero apila vertical (texto arriba, visual abajo). Grid se vuelve stack. Email gate ocupa ancho completo.

---

## Performance / SEO

- Static generation. La página renderiza en build con las historias del día (revalidación cada 1h vía ISR).
- LCP <1.5s. Sin JS bloqueante.
- Metadata dinámica: el `<title>` lleva el titular del día.
- Open Graph card auto-generada con la historia hero (image dinámica vía `next/og`).
- Sitemap + RSS feed (un periódico tiene RSS, este también).

---

## Accesibilidad

- Contraste mínimo AA en todos los textos (el `--paper` cálido pasa AA con `--ink`).
- Focus rings visibles en navegación con teclado.
- Alt text descriptivo en visuales (no decorativo).
- `prefers-reduced-motion` respetado en todas las animaciones.
- Las "fuentes" tienen tooltip explicando qué canal son.

---

## Convenciones de código

- Componentes en PascalCase, archivos coincidiendo
- Tipos exportados desde `types/`, no inline
- Sin `any`. Si hace falta, `unknown` y narrow.
- Tailwind con `cn()` helper (clsx + tailwind-merge)
- Server Components por defecto. `'use client'` solo cuando hace falta (forms, animaciones)
- No CSS-in-JS. Tailwind + CSS variables para tokens semánticos.
- Comentarios en español si explican producto, en inglés si explican código

---

## Lo más importante

Esta landing tiene que parecerle a un CMO algo que **leer**, no algo que **probar**. Si hicimos bien el trabajo, alguien debería poder mandar el link a un colega con "mira esto" y que el colega lo abra pensando que es un medio. Solo después se da cuenta de que es un producto.

Esa es la victoria.
