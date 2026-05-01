'use client';

import { useEffect, useRef, useState } from 'react';

const SOURCES = [
  { label: 'SEMrush',        color: '#FF6422', initials: 'Se' },
  { label: 'Search Console', color: '#4285F4', initials: 'SC' },
  { label: 'TikTok',         color: '#010101', initials: 'Tk' },
  { label: 'Reddit',         color: '#FF4500', initials: 'Rd' },
  { label: 'X',              color: '#14171A', initials: 'X'  },
  { label: 'Meta Ads',       color: '#1877F2', initials: 'Ma' },
  { label: 'Google Trends',  color: '#34A853', initials: 'GT' },
  { label: 'GA4',            color: '#E37400', initials: 'G4' },
  { label: 'Schema',         color: '#6B7280', initials: 'Sc' },
];

const STORIES = [
  { entity: 'Gullón', headline: 'Gullón se estampa en su SEO pero se dispara en Google' },
  { entity: 'Lidl',   headline: 'Lidl pierde 47 featured snippets. Mercadona entra por la puerta de atrás' },
  { entity: 'Vueling', headline: 'Vueling acumula 4.200 menciones negativas en X' },
];

// SVG layout constants
const VB_W = 960;
const VB_H = 440;
const SRC_X = 15;       // source chip left edge
const SRC_CX = 46;      // source chip circle center x
const AGENT_X1 = 360;
const AGENT_X2 = 600;
const AGENT_CY = VB_H / 2;  // 220
const CARD_X = 660;
const CARD_W = 285;
const CARD_H = 108;

function srcY(i: number) { return 28 + i * (VB_H - 28) / (SOURCES.length - 1); }

const CARD_CYS = [AGENT_CY - 120, AGENT_CY, AGENT_CY + 120];

function agentToCardPath(cy: number) {
  return `M ${AGENT_X2} ${AGENT_CY} C ${AGENT_X2 + 30} ${AGENT_CY} ${CARD_X - 20} ${cy} ${CARD_X} ${cy}`;
}
function srcToAgentPath(i: number) {
  const y = srcY(i);
  return `M ${SRC_CX + 16} ${y} C ${200} ${y} ${AGENT_X1 - 20} ${AGENT_CY} ${AGENT_X1} ${AGENT_CY}`;
}

export function CorrelationDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  // prefers-reduced-motion
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const pathStyle = (delay: number): React.CSSProperties =>
    animate && !reduced
      ? {
          strokeDasharray: 500,
          strokeDashoffset: 0,
          transition: `stroke-dashoffset 1.2s ease-out ${delay}s`,
        }
      : reduced
      ? { strokeDasharray: 'none' }
      : { strokeDasharray: 500, strokeDashoffset: 500 };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={ref}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full max-w-[960px] mx-auto"
        aria-label="Diagrama de correlación de señales digitales"
        role="img"
      >
        {/* ── Lines: sources → agent ── */}
        {SOURCES.map((_, i) => (
          <path
            key={`src-line-${i}`}
            d={srcToAgentPath(i)}
            fill="none"
            stroke="var(--ink-tertiary)"
            strokeWidth="0.5"
            style={pathStyle(0.1 + i * 0.06)}
          />
        ))}

        {/* ── Lines: agent → story cards ── */}
        {CARD_CYS.map((cy, i) => (
          <path
            key={`card-line-${i}`}
            d={agentToCardPath(cy)}
            fill="none"
            stroke="var(--ink-tertiary)"
            strokeWidth="0.5"
            style={pathStyle(0.8 + i * 0.1)}
          />
        ))}

        {/* ── Source chips (left) ── */}
        {SOURCES.map((s, i) => {
          const y = srcY(i);
          return (
            <g key={s.label} transform={`translate(${SRC_X}, ${y - 14})`}>
              {/* Circle icon */}
              <circle cx="16" cy="14" r="14" fill={s.color} />
              <text
                x="16" y="18"
                textAnchor="middle"
                fontSize="8"
                fontWeight="700"
                fill="white"
                style={{ fontFamily: 'Geist, ui-sans-serif, system-ui' }}
              >
                {s.initials}
              </text>
              {/* Label */}
              <text
                x="36" y="18"
                fontSize="11"
                fill="var(--ink-secondary)"
                style={{ fontFamily: 'Geist, ui-sans-serif, system-ui' }}
              >
                {s.label}
              </text>
            </g>
          );
        })}

        {/* ── Agent box (center) ── */}
        <rect
          x={AGENT_X1}
          y={AGENT_CY - 52}
          width={AGENT_X2 - AGENT_X1}
          height={104}
          fill="var(--paper-elevated)"
          stroke="var(--ink)"
          strokeWidth="1"
          rx="2"
        />
        <text
          x={(AGENT_X1 + AGENT_X2) / 2}
          y={AGENT_CY - 10}
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="var(--ink)"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Correlación
        </text>
        <text
          x={(AGENT_X1 + AGENT_X2) / 2}
          y={AGENT_CY + 10}
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="var(--ink)"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          editorial
        </text>
        <text
          x={(AGENT_X1 + AGENT_X2) / 2}
          y={AGENT_CY + 32}
          textAnchor="middle"
          fontSize="9"
          fill="var(--ink-tertiary)"
          letterSpacing="2"
          style={{ fontFamily: 'Geist Mono, monospace', textTransform: 'uppercase' }}
        >
          24/7
        </text>

        {/* ── Story cards (right) ── */}
        {STORIES.map((s, i) => {
          const cy = CARD_CYS[i];
          const cardY = cy - CARD_H / 2;
          // truncate headline for display
          const title = s.headline.length > 52 ? s.headline.slice(0, 52) + '…' : s.headline;
          return (
            <g key={s.entity}>
              <rect
                x={CARD_X}
                y={cardY}
                width={CARD_W}
                height={CARD_H}
                fill="var(--paper-elevated)"
                stroke="var(--rule)"
                strokeWidth="0.75"
                rx="2"
              />
              <text
                x={CARD_X + 14}
                y={cardY + 22}
                fontSize="8"
                fontWeight="700"
                fill="var(--ink-tertiary)"
                letterSpacing="1.5"
                style={{ fontFamily: 'Geist Mono, monospace', textTransform: 'uppercase' }}
              >
                {s.entity.toUpperCase()}
              </text>
              {/* Word-wrap headline into two lines */}
              <text
                x={CARD_X + 14}
                y={cardY + 44}
                fontSize="12"
                fontWeight="700"
                fill="var(--ink)"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                <tspan x={CARD_X + 14} dy="0">{title.slice(0, 38)}</tspan>
                <tspan x={CARD_X + 14} dy="16">{title.slice(38)}</tspan>
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
