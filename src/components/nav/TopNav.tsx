'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const MERCADOS_COL1 = [
  { label: 'Retail', description: 'Gran consumo y distribución' },
  { label: 'Banca y Finanzas', description: 'Bancos, seguros e inversión' },
  { label: 'Turismo', description: 'Aerolíneas, hoteles y ocio' },
  { label: 'Tech', description: 'Software, hardware y plataformas' },
  { label: 'Automoción', description: 'Fabricantes y concesionarios' },
];

const MERCADOS_COL2 = [
  { label: 'Alimentación', description: 'Marcas de gran consumo' },
  { label: 'Moda', description: 'Lujo, fast fashion y deportiva' },
  { label: 'Farma y Salud', description: 'Laboratorios y clínicas' },
  { label: 'Energía', description: 'Eléctricas y combustibles' },
  { label: 'Telecomunicaciones', description: 'Operadores y equipos' },
];

const MERCADOS_ALL = [...MERCADOS_COL1, ...MERCADOS_COL2];

export function TopNav() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mercadosOpen, setMercadosOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openMercados() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMercadosOpen(true);
  }

  function closeMercados() {
    closeTimer.current = setTimeout(() => setMercadosOpen(false), 120);
  }

  const navLinkClass = (active: boolean) =>
    cn(
      'px-4 h-14 text-[12px] font-sans font-500 transition-colors duration-100 inline-flex items-center',
      active
        ? 'text-ink font-600 border-b-[1.5px] border-ink'
        : 'text-ink-tertiary hover:text-ink-secondary'
    );

  return (
    <>
      <header className="md:sticky md:top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-rule/80">
        <div className="w-full px-6 sm:px-10">
          <div className="flex items-center h-14 gap-4">
            {/* Logo */}
            <div className="flex-1 basis-0 flex justify-start">
              <Link
                href="/"
                className="font-['Switzer'] font-semibold text-[18px] tracking-[-0.04em] text-ink shrink-0"
              >
                2laps
              </Link>
            </div>

            {/* Nav tabs — desktop */}
            <nav className="hidden md:flex items-center gap-0" aria-label="Navegación principal">
              <Link href="/2day" className={navLinkClass(pathname === '/2day')}>
                Para ti
              </Link>

              <div onMouseEnter={openMercados} onMouseLeave={closeMercados}>
                <button
                  onClick={() => setMercadosOpen((v) => !v)}
                  className={cn(
                    'flex items-center gap-1 px-4 h-14 text-[12px] font-sans font-500 transition-colors duration-100',
                    mercadosOpen
                      ? 'text-ink font-600 border-b-[1.5px] border-ink'
                      : 'text-ink-tertiary hover:text-ink-secondary'
                  )}
                  aria-haspopup="true"
                  aria-expanded={mercadosOpen}
                >
                  Mercados
                  <ChevronDown
                    size={11}
                    strokeWidth={2}
                    className={cn(
                      'transition-transform duration-200 mt-px',
                      mercadosOpen ? 'rotate-180' : 'rotate-0'
                    )}
                  />
                </button>
              </div>

              <Link href="/contacto" className={navLinkClass(pathname === '/contacto')}>
                Contacto
              </Link>

              <Link href="/nosotros" className={navLinkClass(pathname === '/nosotros')}>
                Nosotros
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex-1 basis-0 flex justify-end items-center gap-3">
              <ThemeToggle />
              <a
                href="https://platform.2laps.ai"
                className="hidden sm:inline-flex items-center text-[12px] font-sans font-600 text-foreground border border-foreground/70 px-4 py-1.5 rounded-full hover:bg-foreground hover:text-background transition-colors duration-150"
              >
                Entrar →
              </a>

              {/* Hamburger — mobile */}
              <button
                className="md:hidden p-1 text-ink"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <nav className="md:hidden border-t border-rule/60 py-3" aria-label="Navegación móvil">
              <Link
                href="/2day"
                className="block px-0 py-2.5 text-[13px] font-sans text-ink-secondary hover:text-ink transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Para ti →
              </Link>
              <div>
                <button
                  onClick={() => setMercadosOpen((v) => !v)}
                  className={cn(
                    'flex items-center gap-1 w-full text-left px-0 py-2.5 text-[13px] font-sans transition-colors',
                    mercadosOpen ? 'text-ink font-600' : 'text-ink-secondary hover:text-ink'
                  )}
                >
                  Mercados
                  <ChevronDown
                    size={12}
                    strokeWidth={2}
                    className={cn('transition-transform duration-200 mt-px', mercadosOpen ? 'rotate-180' : 'rotate-0')}
                  />
                </button>
                {mercadosOpen && (
                  <div className="pl-3 pb-1 border-l border-rule/60 ml-1">
                    {MERCADOS_ALL.map((m) => (
                      <button
                        key={m.label}
                        className="block w-full text-left py-2 text-[12px] font-sans text-ink-secondary hover:text-ink transition-colors"
                        onClick={() => { setMobileOpen(false); setMercadosOpen(false); }}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href="/contacto"
                className="block px-0 py-2.5 text-[13px] font-sans text-ink-secondary hover:text-ink transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Contacto
              </Link>
              <Link
                href="/nosotros"
                className="block px-0 py-2.5 text-[13px] font-sans text-ink-secondary hover:text-ink transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Nosotros
              </Link>
              <a
                href="https://platform.2laps.ai"
                className="block mt-3 text-[12px] font-sans font-600 text-ink border border-ink/70 px-3 py-2 text-center hover:bg-ink hover:text-paper transition-colors"
              >
                Entrar →
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Mega-menu — fixed below header, full-width */}
      <div
        className={cn(
          'fixed top-14 left-0 right-0 z-40 hidden md:block',
          'transition-all duration-200 origin-top',
          mercadosOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        )}
        onMouseEnter={openMercados}
        onMouseLeave={closeMercados}
        role="menu"
        aria-label="Mercados"
      >
        <div className="w-full bg-card border-b-2 border-border shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15),0_4px_12px_-4px_rgba(0,0,0,0.08)]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-6">
            <div className="grid grid-cols-3 gap-8">

              {/* Col 1 */}
              <div>
                <p className="text-[10px] font-sans font-700 uppercase tracking-[0.12em] text-muted-foreground mb-3">
                  Sectores
                </p>
                <div className="space-y-0.5">
                  {MERCADOS_COL1.map((m) => (
                    <button
                      key={m.label}
                      role="menuitem"
                      className="w-full text-left px-3 py-2.5 rounded hover:bg-muted/60 transition-colors duration-100 group"
                      onClick={() => setMercadosOpen(false)}
                    >
                      <span className="block text-[13px] font-['Times_New_Roman'] text-foreground">
                        {m.label}
                      </span>
                      <span className="block text-[11px] font-['Times_New_Roman'] text-muted-foreground mt-0.5">
                        {m.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Col 2 */}
              <div>
                <p className="text-[10px] font-sans font-700 uppercase tracking-[0.12em] text-muted-foreground mb-3">
                  &nbsp;
                </p>
                <div className="space-y-0.5">
                  {MERCADOS_COL2.map((m) => (
                    <button
                      key={m.label}
                      role="menuitem"
                      className="w-full text-left px-3 py-2.5 rounded hover:bg-muted/60 transition-colors duration-100 group"
                      onClick={() => setMercadosOpen(false)}
                    >
                      <span className="block text-[13px] font-['Times_New_Roman'] text-foreground">
                        {m.label}
                      </span>
                      <span className="block text-[11px] font-['Times_New_Roman'] text-muted-foreground mt-0.5">
                        {m.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Col 3 — CTA */}
              <div className="border-l border-border pl-8 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-sans font-700 uppercase tracking-[0.12em] text-muted-foreground mb-3">
                    Tu mercado
                  </p>
                  <p className="text-[13px] font-sans text-foreground leading-relaxed">
                    Configura 2laps para seguir solo las marcas y sectores que te importan.
                  </p>
                  <p className="text-[12px] font-sans text-muted-foreground mt-2 leading-relaxed">
                    Las señales de tu competencia, en tiempo real.
                  </p>
                </div>
                <a
                  href="https://platform.2laps.ai"
                  className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-sans font-600 text-foreground border border-border px-4 py-2 hover:bg-muted transition-colors duration-150 self-start"
                >
                  Personalizar <ArrowRight size={12} />
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
