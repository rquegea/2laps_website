'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { SourceChips } from '@/components/stories/SourceChips';
import type { Source } from '@/types/story';

export interface PreviewCard {
  label: string;
  title: string;
}

interface MacWindowProps {
  headline: string;
  deck: string;
  sources: Source[];
  timeAgo: string;
  formattedDate: string;
  previewStories?: PreviewCard[];
}

const MARGIN = 16;
const MIN_W = 380;
const MIN_H = 280;
const TITLE_H = 44;
const DEFAULT_W = 820;
const DEFAULT_H = 504;

type WindowState = 'open' | 'minimized' | 'closed';
type Handle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export function MacWindow({ headline, deck, sources, timeAgo, formattedDate, previewStories }: MacWindowProps) {
  const [windowState, setWindowState] = useState<WindowState>('open');
  const [hoveredBtn, setHoveredBtn] = useState<'red' | 'yellow' | 'green' | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ w: DEFAULT_W, h: DEFAULT_H });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ mx: number; my: number; px: number; py: number } | null>(null);
  const resizeStart = useRef<
    { handle: Handle; mx: number; my: number; left: number; top: number; right: number; bottom: number } | null
  >(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let initialized = false;
    const positionWindow = () => {
      const cw = wrapper.offsetWidth;
      const ch = wrapper.offsetHeight;

      if (!initialized) {
        setPos({
          x: Math.max(MARGIN, (cw - DEFAULT_W) / 2),
          y: Math.max(MARGIN, (ch - DEFAULT_H) / 2),
        });
        initialized = true;
        return;
      }

      setPos((p) => ({
        x: Math.min(Math.max(MARGIN, p.x), Math.max(MARGIN, cw - MARGIN - DEFAULT_W)),
        y: Math.min(Math.max(MARGIN, p.y), Math.max(MARGIN, ch - MARGIN - DEFAULT_H)),
      }));
    };

    positionWindow();
    const ro = new ResizeObserver(positionWindow);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  const onTitleDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
  }, [pos]);

  const onTitleMove = useCallback((e: React.PointerEvent) => {
    if (!dragging || !dragStart.current || !wrapperRef.current) return;
    const cw = wrapperRef.current.offsetWidth;
    const ch = wrapperRef.current.offsetHeight;
    const { mx, my, px, py } = dragStart.current;
    setPos({
      x: Math.min(Math.max(MARGIN, px + (e.clientX - mx)), cw - size.w - MARGIN),
      y: Math.min(Math.max(MARGIN, py + (e.clientY - my)), ch - size.h - MARGIN),
    });
  }, [dragging, size]);

  const onTitleUp = useCallback((e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    setDragging(false);
    dragStart.current = null;
  }, []);

  const onResizeDown = useCallback((handle: Handle) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setResizing(true);
    resizeStart.current = {
      handle,
      mx: e.clientX,
      my: e.clientY,
      left: pos.x,
      top: pos.y,
      right: pos.x + size.w,
      bottom: pos.y + size.h,
    };
  }, [pos, size]);

  const onResizeMove = useCallback((e: React.PointerEvent) => {
    if (!resizing || !resizeStart.current || !wrapperRef.current) return;
    const cw = wrapperRef.current.offsetWidth;
    const ch = wrapperRef.current.offsetHeight;
    const { handle, mx, my, left, top, right, bottom } = resizeStart.current;
    const dx = e.clientX - mx;
    const dy = e.clientY - my;

    let l = left, t = top, r = right, b = bottom;
    if (handle.includes('w')) l = Math.min(Math.max(MARGIN, left + dx), right - MIN_W);
    if (handle.includes('e')) r = Math.max(Math.min(cw - MARGIN, right + dx), left + MIN_W);
    if (handle.includes('n')) t = Math.min(Math.max(MARGIN, top + dy), bottom - MIN_H);
    if (handle.includes('s')) b = Math.max(Math.min(ch - MARGIN, bottom + dy), top + MIN_H);

    setPos({ x: l, y: t });
    setSize({ w: r - l, h: b - t });
  }, [resizing]);

  const onResizeUp = useCallback((e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    setResizing(false);
    resizeStart.current = null;
  }, []);

  const resetToDefault = useCallback(() => {
    if (!wrapperRef.current) return;
    const cw = wrapperRef.current.offsetWidth;
    const ch = wrapperRef.current.offsetHeight;
    setSize({ w: DEFAULT_W, h: DEFAULT_H });
    setPos({
      x: Math.max(MARGIN, (cw - DEFAULT_W) / 2),
      y: Math.max(MARGIN, (ch - DEFAULT_H) / 2),
    });
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full h-full">
      {windowState === 'closed' ? (
        <div className="flex items-center justify-center h-full">
          <button
            onClick={() => { setWindowState('open'); resetToDefault(); }}
            className="text-[12px] font-mono text-white/30 hover:text-white/60 transition-colors border border-white/10 px-4 py-2 rounded-lg"
          >
            Abrir ventana ↩
          </button>
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            width: size.w,
            height: windowState === 'open' ? size.h : TITLE_H,
          }}
          className="rounded-2xl overflow-hidden shadow-[0_32px_80px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)] transition-[height] duration-300"
        >
          {/* Title bar — Mac chrome, never changes with theme */}
          <div
            onPointerDown={onTitleDown}
            onPointerMove={onTitleMove}
            onPointerUp={onTitleUp}
            onPointerCancel={onTitleUp}
            className={`flex items-center gap-2 px-4 bg-[#1c1c1e] border-b border-white/[0.07] select-none touch-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ height: TITLE_H }}
          >
            <div className="flex items-center gap-1.5" onMouseLeave={() => setHoveredBtn(null)}>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onMouseEnter={() => setHoveredBtn('red')}
                onClick={() => setWindowState('closed')}
                className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center"
              >
                {hoveredBtn === 'red' && <span className="text-[7px] text-[#7a1200] font-bold leading-none">✕</span>}
              </button>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onMouseEnter={() => setHoveredBtn('yellow')}
                onClick={() => setWindowState(windowState === 'minimized' ? 'open' : 'minimized')}
                className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center"
              >
                {hoveredBtn === 'yellow' && <span className="text-[8px] text-[#7a5200] font-bold leading-none">−</span>}
              </button>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onMouseEnter={() => setHoveredBtn('green')}
                onClick={resetToDefault}
                className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center"
              >
                {hoveredBtn === 'green' && <span className="text-[7px] text-[#003d00] font-bold leading-none">↺</span>}
              </button>
            </div>
            <span className="flex-1 text-center text-[12px] font-medium text-white/40 -ml-14 select-none pointer-events-none">
              2laps — Feed del día
            </span>
          </div>

          {/* Content — uses semantic tokens, responds to dark mode */}
          <div
            className="bg-paper overflow-y-auto"
            style={{ height: windowState === 'open' ? size.h - TITLE_H : 0 }}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-baseline justify-between border-b border-rule pb-3 mb-6">
                <span className="font-['Switzer'] font-semibold text-[15px] tracking-[-0.03em] text-ink">2laps</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-tertiary">{formattedDate}</span>
              </div>
              <div className="mb-6 pb-6 border-b border-rule">
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-tertiary mb-2">BREAKING · RETAIL</p>
                <a href="/2day" className="block group">
                  <h2 className="font-serif font-bold text-[20px] sm:text-[22px] leading-[1.15] text-ink group-hover:opacity-70 transition-opacity">
                    {headline}
                  </h2>
                </a>
                <p className="mt-2 text-[13px] leading-[1.55] text-ink-secondary line-clamp-2">{deck}</p>
                <div className="mt-3 flex items-center gap-3">
                  <SourceChips sources={sources} size="sm" />
                  <span className="text-[11px] text-ink-tertiary">·</span>
                  <span className="text-[11px] font-mono text-ink-tertiary">{timeAgo}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(previewStories ?? []).slice(0, 3).map((s) => (
                  <div key={s.title} className="border-t border-rule pt-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-tertiary mb-1.5">{s.label}</p>
                    <p className="font-serif text-[13px] leading-[1.3] text-ink line-clamp-3">{s.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resize handles */}
          {windowState === 'open' && (
            <>
              <div onPointerDown={onResizeDown('n')} onPointerMove={onResizeMove} onPointerUp={onResizeUp} onPointerCancel={onResizeUp} className="absolute top-0 left-3 right-3 h-1.5 cursor-ns-resize touch-none z-10" />
              <div onPointerDown={onResizeDown('s')} onPointerMove={onResizeMove} onPointerUp={onResizeUp} onPointerCancel={onResizeUp} className="absolute bottom-0 left-3 right-3 h-1.5 cursor-ns-resize touch-none z-10" />
              <div onPointerDown={onResizeDown('w')} onPointerMove={onResizeMove} onPointerUp={onResizeUp} onPointerCancel={onResizeUp} className="absolute left-0 top-3 bottom-3 w-1.5 cursor-ew-resize touch-none z-10" />
              <div onPointerDown={onResizeDown('e')} onPointerMove={onResizeMove} onPointerUp={onResizeUp} onPointerCancel={onResizeUp} className="absolute right-0 top-3 bottom-3 w-1.5 cursor-ew-resize touch-none z-10" />
              <div onPointerDown={onResizeDown('nw')} onPointerMove={onResizeMove} onPointerUp={onResizeUp} onPointerCancel={onResizeUp} className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize touch-none z-20" />
              <div onPointerDown={onResizeDown('ne')} onPointerMove={onResizeMove} onPointerUp={onResizeUp} onPointerCancel={onResizeUp} className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize touch-none z-20" />
              <div onPointerDown={onResizeDown('sw')} onPointerMove={onResizeMove} onPointerUp={onResizeUp} onPointerCancel={onResizeUp} className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize touch-none z-20" />
              <div
                onPointerDown={onResizeDown('se')}
                onPointerMove={onResizeMove}
                onPointerUp={onResizeUp}
                onPointerCancel={onResizeUp}
                className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize touch-none z-20"
                style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.15) 50%)' }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
