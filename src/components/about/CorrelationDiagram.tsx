'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// ── SVG layout constants ────────────────────────────────────────────────────
const VB_W = 1000;
const VB_H = 560;

const SRC_ICON_X  = 0;
const SRC_ICON_CX = 12;
const SRC_LABEL_X = 30;
const SRC_LINE_X  = 162;   // exit x of source row (after label)

const CENTER_X       = 500; // midpoint of diagram
const TEXT_LEFT_X    = 392; // where source lines arrive (left of "2laps")
const TEXT_RIGHT_X   = 608; // where card lines depart (right of "2laps")
const CENTER_Y       = 260;

const CARD_X  = 665;
const CARD_W  = 320;
const CARD_H  = 132;
const CARD_CYS = [108, 270, 432];

function srcY(i: number) { return 28 + i * 58; }

function srcPath(i: number) {
  const y = srcY(i);
  const mx = (SRC_LINE_X + TEXT_LEFT_X) / 2;
  return `M ${SRC_LINE_X} ${y} C ${mx} ${y} ${mx} ${CENTER_Y} ${TEXT_LEFT_X} ${CENTER_Y}`;
}
function cardPath(cy: number) {
  const mx = (TEXT_RIGHT_X + CARD_X) / 2;
  return `M ${TEXT_RIGHT_X} ${CENTER_Y} C ${mx} ${CENTER_Y} ${mx} ${cy} ${CARD_X} ${cy}`;
}

// ── Brand logos (28×28 SVG elements) ──────────────────────────────────────
function IconWrap({ bg, border = false, children }: { bg: string; border?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ width: 24, height: 24, borderRadius: 5, background: bg,
      border: border ? '1px solid #d1d5db' : undefined,
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {children}
    </div>
  );
}
const SEMrushLogo    = () => <IconWrap bg="#FF6422"><svg width="13" height="13" viewBox="0 0 13 13"><text x="6.5" y="10.5" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="Arial Black,sans-serif">S</text></svg></IconWrap>;
const SearchConsole  = () => <IconWrap bg="white" border><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="5.5" cy="5.5" r="3.5" stroke="#4285F4" strokeWidth="1.8"/><line x1="8" y1="8" x2="11" y2="11" stroke="#34A853" strokeWidth="1.8" strokeLinecap="round"/><line x1="3" y1="4" x2="7" y2="4" stroke="#EA4335" strokeWidth="1" strokeLinecap="round"/><line x1="3" y1="6" x2="7.5" y2="6" stroke="#FBBC05" strokeWidth="1" strokeLinecap="round"/></svg></IconWrap>;
const TikTokLogo     = () => <IconWrap bg="#010101"><svg width="13" height="14" viewBox="0 0 13 14" fill="none"><path d="M8.5 1C8.5 1 9.3 3 11.5 3.5V6C10.2 6 9 5.5 8.5 4.8V9.5C8.5 11.4 6.9 13 5 13C3.1 13 1.5 11.4 1.5 9.5C1.5 7.6 3.1 6 5 6V8.3C4.2 8.3 3.5 8.9 3.5 9.5C3.5 10.1 4.2 10.7 5 10.7C5.8 10.7 6.5 10.1 6.5 9.5V1H8.5Z" fill="white"/></svg></IconWrap>;
const RedditLogo     = () => <IconWrap bg="#FF4500"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7.5" r="3.5" fill="white"/><circle cx="5.5" cy="7" r="0.8" fill="#FF4500"/><circle cx="8.5" cy="7" r="0.8" fill="#FF4500"/><path d="M5.5 9.5 Q7 10.5 8.5 9.5" stroke="#FF4500" strokeWidth="0.9" strokeLinecap="round" fill="none"/><circle cx="11" cy="4" r="2" fill="white"/><path d="M9.3 5.7 L7.5 6.8" stroke="white" strokeWidth="0.9" strokeLinecap="round"/><rect x="6.5" y="1.5" width="0.9" height="2.2" rx="0.5" fill="white"/><circle cx="6.9" cy="1.2" r="0.9" fill="white"/></svg></IconWrap>;
const XLogo          = () => <IconWrap bg="#000"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M0.5 1h3l2.3 3.1L8.3 1h3L7.6 6.1 12 11H9L6.4 7.7 3.7 11H0.5L5.2 5.8z" fill="white"/></svg></IconWrap>;
const MetaLogo       = () => <IconWrap bg="#1877F2"><svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M7 5C7 2.8 5.8 1 4.5 1C3.2 1 2 2.5 2 5C2 6.5 2.5 7.8 3.2 8.5C3 8.8 2.7 9 2.4 9C1.8 9 1 8 1 5C1 2.2 2.5 0 4.5 0C5.8 0 7 1.3 7 2.5C7 1.3 8.2 0 9.5 0C11.5 0 13 2.2 13 5C13 8 12.2 9 11.6 9C11.3 9 11 8.8 10.8 8.5C11.5 7.8 12 6.5 12 5C12 2.5 10.8 1 9.5 1C8.2 1 7 2.8 7 5Z" fill="white"/></svg></IconWrap>;
const TrendsLogo     = () => <IconWrap bg="white" border><svg width="14" height="12" viewBox="0 0 14 12" fill="none"><polyline points="1,10 4,7 7,8 10,4 13,1" fill="none" stroke="#4285F4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="4" r="1.2" fill="#EA4335"/></svg></IconWrap>;
const GA4Logo        = () => <IconWrap bg="#E37400"><svg width="13" height="12" viewBox="0 0 13 12" fill="none"><rect x="1" y="7" width="3" height="4.5" rx="1" fill="white" opacity="0.6"/><rect x="5" y="4" width="3" height="7.5" rx="1" fill="white" opacity="0.8"/><rect x="9" y="1" width="3" height="10.5" rx="1" fill="white"/></svg></IconWrap>;
const SchemaLogo     = () => <IconWrap bg="#5B6E8C"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="3" width="5" height="3.5" rx="1" stroke="white" strokeWidth="1.2"/><rect x="7" y="3" width="5" height="3.5" rx="1" stroke="white" strokeWidth="1.2"/><rect x="3.5" y="7.5" width="5" height="3.5" rx="1" stroke="white" strokeWidth="1.2"/><line x1="3.5" y1="6.5" x2="6" y2="7.5" stroke="white" strokeWidth="0.9"/><line x1="9.5" y1="6.5" x2="6.5" y2="7.5" stroke="white" strokeWidth="0.9"/></svg></IconWrap>;

// ── Data ───────────────────────────────────────────────────────────────────
const SOURCES = [
  { label: 'SEMrush',        Logo: SEMrushLogo },
  { label: 'Search Console', Logo: SearchConsole },
  { label: 'TikTok',         Logo: TikTokLogo },
  { label: 'Reddit',         Logo: RedditLogo },
  { label: 'X',              Logo: XLogo },
  { label: 'Meta Ads',       Logo: MetaLogo },
  { label: 'Google Trends',  Logo: TrendsLogo },
  { label: 'GA4',            Logo: GA4Logo },
  { label: 'Schema.org',     Logo: SchemaLogo },
];

const STORIES = [
  { entity: 'GULLÓN',   cat: 'SEO · Social',    headline: 'Gullón se estampa en su SEO pero se dispara en Google — y sus competidores no lo ven venir' },
  { entity: 'LIDL',     cat: 'Schema · SEO',     headline: 'Lidl pierde 47 featured snippets. No fue Google: fue su propio schema markup' },
  { entity: 'VUELING',  cat: 'Reputación · X',   headline: 'Vueling acumula 4.200 menciones negativas en X. El 60% viene de un solo hilo de Reddit' },
];

// ── Component ─────────────────────────────────────────────────────────────
export function CorrelationDiagram() {
  const svgRef  = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const line = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0 },
          transition: { pathLength: { duration: 1.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }, opacity: { duration: 0.1, delay } },
        };

  // word-wrap a headline into lines of ~max chars
  function wrapText(text: string, maxChars: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let current = '';
    for (const w of words) {
      if ((current + ' ' + w).trim().length > maxChars && current) {
        lines.push(current.trim());
        current = w;
      } else {
        current = (current + ' ' + w).trim();
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  return (
    <div className="w-full hidden lg:block overflow-x-auto">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full max-w-[1000px] mx-auto"
        aria-label="Diagrama: de señales digitales a titulares editoriales"
        role="img"
      >
        {/* ── Lines: sources → center ── */}
        {SOURCES.map((_, i) => (
          <motion.path
            key={`sl${i}`}
            d={srcPath(i)}
            fill="none" stroke="#9ca3af" strokeWidth="1"
            {...line(i * 0.06)}
          />
        ))}

        {/* ── Lines: center → cards ── */}
        {CARD_CYS.map((cy, i) => (
          <motion.path
            key={`cl${i}`}
            d={cardPath(cy)}
            fill="none" stroke="#9ca3af" strokeWidth="1"
            {...line(0.65 + i * 0.1)}
          />
        ))}

        {/* ── Flow dots: sources → center (2 dots per line, continuous loop) ── */}
        {inView && !reduced && SOURCES.map((_, i) => {
          const d = srcPath(i);
          const dur = 2.2;
          const start = 1.5 + i * 0.06;
          return [0, dur / 2].map((offset, k) => (
            <circle key={`fd-s${i}-${k}`} r="2.5" fill="#6b7280">
              <animateMotion dur={`${dur}s`} begin={`${start + offset}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.1;0.8;1"
                dur={`${dur}s`} begin={`${start + offset}s`} repeatCount="indefinite" />
            </circle>
          ));
        })}

        {/* ── Flow dots: center → cards ── */}
        {inView && !reduced && CARD_CYS.map((cy, i) => {
          const d = cardPath(cy);
          const dur = 1.6;
          const start = 2.1 + i * 0.15;
          return [0, dur / 2].map((offset, k) => (
            <circle key={`fd-c${i}-${k}`} r="2.5" fill="#6b7280">
              <animateMotion dur={`${dur}s`} begin={`${start + offset}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.1;0.8;1"
                dur={`${dur}s`} begin={`${start + offset}s`} repeatCount="indefinite" />
            </circle>
          ));
        })}

        {/* ── Source logos (foreignObject) + labels ── */}
        {SOURCES.map((s, i) => {
          const y = srcY(i);
          return (
            <g key={s.label}>
              <foreignObject x={SRC_ICON_X} y={y - 12} width={24} height={24}>
                <s.Logo />
              </foreignObject>
              <text
                x={SRC_LABEL_X} y={y + 4}
                fontSize="12" fill="var(--ink-secondary)"
                style={{ fontFamily: 'Geist, ui-sans-serif, system-ui' }}
              >
                {s.label}
              </text>
            </g>
          );
        })}

        {/* ── Center: "2laps" in Newsreader italic ── */}
        <text
          x={CENTER_X} y={CENTER_Y + 26}
          textAnchor="middle"
          fontSize="72"
          fontWeight="600"
          fill="var(--ink)"
          style={{ fontFamily: "Switzer, Helvetica Neue, Arial, sans-serif", letterSpacing: '-0.04em' }}
        >
          2laps
        </text>

        {/* ── Story cards ── */}
        {STORIES.map((s, i) => {
          const cy   = CARD_CYS[i];
          const cardY = cy - CARD_H / 2;
          const lines = wrapText(s.headline, 30);
          return (
            <g key={s.entity}>
              {/* Left accent rule */}
              <line
                x1={CARD_X} y1={cardY + 8}
                x2={CARD_X} y2={cardY + CARD_H - 8}
                stroke="var(--ink)" strokeWidth="1.5" opacity="0.15"
              />
              {/* Entity label */}
              <text
                x={CARD_X + 14} y={cardY + 18}
                fontSize="9" fontWeight="700" letterSpacing="1.8"
                fill="var(--ink-tertiary)"
                style={{ fontFamily: 'Geist Mono, monospace', textTransform: 'uppercase' }}
              >
                {s.entity}
              </text>
              {/* Headline — Newsreader serif */}
              {lines.map((ln, li) => (
                <text
                  key={li}
                  x={CARD_X + 14} y={cardY + 44 + li * 20}
                  fontSize="16" fontWeight="400"
                  fill="var(--ink)"
                  style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                >
                  {ln}
                </text>
              ))}
              {/* Category tag */}
              <text
                x={CARD_X + 14} y={cardY + CARD_H - 10}
                fontSize="9" letterSpacing="1.2"
                fill="var(--ink-tertiary)"
                style={{ fontFamily: 'Geist Mono, monospace', textTransform: 'uppercase' }}
              >
                {s.cat}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
