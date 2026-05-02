'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const MARGIN = 16;
const MIN_W = 380;
const MIN_H = 280;
const TITLE_H = 44;
const DEFAULT_W = 960;
const DEFAULT_H = 680;
// Virtual width of /2day at full desktop size — iframe is scaled to fit the window
const IFRAME_VIRTUAL_W = 1280;

type WindowState = 'open' | 'minimized' | 'closed';
type Handle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export function MacWindow() {
  const [windowState, setWindowState] = useState<WindowState>('open');
  const [hoveredBtn, setHoveredBtn] = useState<'red' | 'yellow' | 'green' | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ w: DEFAULT_W, h: DEFAULT_H });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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

  // Sync parent theme to iframe via postMessage
  useEffect(() => {
    const send = () => {
      const theme = document.documentElement.getAttribute('data-theme') ?? 'light';
      iframeRef.current?.contentWindow?.postMessage({ type: '2laps-theme', theme }, window.location.origin);
    };
    const observer = new MutationObserver(send);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
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
      handle, mx: e.clientX, my: e.clientY,
      left: pos.x, top: pos.y,
      right: pos.x + size.w, bottom: pos.y + size.h,
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

  // Scale /2day to fit the current window width
  const contentH = size.h - TITLE_H;
  const scale = size.w / IFRAME_VIRTUAL_W;
  const iframeH = contentH / scale;

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
            left: pos.x, top: pos.y,
            width: size.w,
            height: windowState === 'open' ? size.h : TITLE_H,
          }}
          className="rounded-2xl overflow-hidden shadow-[0_32px_80px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)] transition-[height] duration-300"
        >
          {/* Title bar — Mac chrome */}
          <div
            onPointerDown={onTitleDown}
            onPointerMove={onTitleMove}
            onPointerUp={onTitleUp}
            onPointerCancel={onTitleUp}
            className={`flex items-center gap-2 px-4 bg-[#ececec] border-b border-black/[0.08] select-none touch-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
            <div className="flex-1 flex flex-col items-center justify-center -ml-14 select-none pointer-events-none gap-0.5">
              <span
                className="text-[14px] font-semibold text-black/70 leading-none tracking-tight"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                2day
              </span>
              <span
                className="text-[10px] text-black/35 leading-none"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                2laps.ai
              </span>
            </div>
          </div>

          {/* Live /2day portal — scaled to fit */}
          <div
            className="overflow-hidden bg-background relative"
            style={{ height: windowState === 'open' ? contentH : 0 }}
          >
            {windowState === 'open' && (
              <>
                <iframe
                  ref={iframeRef}
                  src="/2day?embed=1"
                  title="2laps — Feed del día"
                  onLoad={() => {
                    const theme = document.documentElement.getAttribute('data-theme') ?? 'light';
                    iframeRef.current?.contentWindow?.postMessage({ type: '2laps-theme', theme }, window.location.origin);
                  }}
                  style={{
                    width: IFRAME_VIRTUAL_W,
                    height: iframeH,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    border: 'none',
                    display: 'block',
                    pointerEvents: 'none',
                  }}
                />
                {/* Transparent overlay — click navigates to /2day */}
                <a
                  href="/2day"
                  aria-label="Abrir 2day"
                  className="absolute inset-0 z-10 cursor-pointer"
                  style={{ pointerEvents: dragging || resizing ? 'none' : 'auto' }}
                />
              </>
            )}
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
