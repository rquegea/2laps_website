import Link from 'next/link';

const COLUMNS = [
  {
    title: 'Producto',
    links: [
      { label: '2day — el feed', href: '/2day', external: false },
      { label: 'Para ti', href: '/2day', external: false },
      { label: 'Mercados', href: '#mercados', external: false },
      { label: 'Plataforma privada', href: 'https://platform.2laps.ai', external: true },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { label: 'Quiénes somos', href: '/nosotros', external: false },
      { label: 'Contacto', href: '/contacto', external: false },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidad', href: '/privacidad', external: false },
      { label: 'Términos', href: '/terminos', external: false },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-rule/80 bg-paper mt-auto">
      <div className="w-full px-6 sm:px-10 pt-12 pb-8">

        {/* Top: logo + columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="font-['Switzer'] font-semibold text-[18px] tracking-[-0.04em] text-ink"
            >
              2laps
            </Link>
            <p className="mt-3 text-[13px] font-sans text-ink-secondary leading-relaxed max-w-[200px]">
              Inteligencia del paisaje digital. Presentada como periódico, no como dashboard.
            </p>
          </div>

          {/* Columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-['Times_New_Roman'] font-normal text-ink-tertiary mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-[13px] font-['Switzer'] text-ink-secondary hover:text-ink transition-colors duration-100"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[13px] font-['Switzer'] text-ink-secondary hover:text-ink transition-colors duration-100"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-rule/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-ink-tertiary">
            © {new Date().getFullYear()} 2laps.ai
          </p>
          <a
            href="https://platform.2laps.ai"
            className="text-[12px] font-sans font-semibold text-ink border border-ink/70 px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors duration-150"
          >
            Entrar a mi panel →
          </a>
        </div>

        {/* Imprint */}
        <div className="mt-8 pt-4 border-t border-rule/40">
          <p className="font-mono text-[10px] tracking-[0.08em] text-ink-tertiary text-center">
            T&amp;T
          </p>
        </div>

      </div>
    </footer>
  );
}
