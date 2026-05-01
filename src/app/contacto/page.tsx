import { TopNav } from '@/components/nav/TopNav';
import { Footer } from '@/components/nav/Footer';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contacto — 2laps.ai',
  description: 'Habla con el equipo de 2laps. Demo personalizada, auditoría inicial, precio transparente.',
};

const SECONDARY = [
  {
    label: 'PRENSA',
    desc: 'Para periodistas y analistas del sector.',
    cta: 'prensa@2laps.ai',
    href: 'mailto:prensa@2laps.ai',
  },
  {
    label: 'PARTNERSHIPS',
    desc: 'Integraciones, distribución y co-marketing.',
    cta: 'partners@2laps.ai',
    href: 'mailto:partners@2laps.ai',
  },
  {
    label: 'OFICINA',
    desc: 'Estamos en Madrid.',
    cta: null,
    href: null,
  },
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10">

        {/* ── Hero: título izquierda + cards derecha ── */}
        <div className="pt-14 pb-0 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Izquierda — título */}
          <div className="lg:col-span-2 lg:pt-2">
            <h1
              className="font-['Times_New_Roman'] font-normal leading-[1.08] tracking-[-0.01em] text-ink"
              style={{ fontSize: 'clamp(32px, 3.5vw, 52px)' }}
            >
              Hablemos de tu paisaje digital.
            </h1>
            <p className="mt-6 font-sans text-[15px] leading-[1.65] text-ink-secondary max-w-[380px]">
              Si gestionas la marca de una compañía con presencia digital seria, probablemente ya
              tienes preguntas que nadie en tu equipo resuelve. Cuéntanoslo.
            </p>
            <a
              href="mailto:ventas@2laps.ai"
              className="mt-8 inline-flex items-center font-mono text-[12px] tracking-[0.06em] text-ink hover:text-ink-secondary transition-colors duration-150"
            >
              ventas@2laps.ai →
            </a>
          </div>

          {/* Derecha — dos cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-0">

            {/* Card Ventas */}
            <div className="border border-rule flex flex-col" style={{ minHeight: 300 }}>
              <div className="p-6 pb-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary">
                  Ventas
                </p>
              </div>
              {/* Visual area — espacio generoso con detalle editorial */}
              <div className="flex-1 flex items-center justify-center px-6 py-10">
                <div className="text-center">
                  <p className="font-['Times_New_Roman'] text-[48px] leading-none text-rule select-none">
                    →
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-rule mt-4">
                <p className="font-sans text-[13px] leading-[1.65] text-ink-secondary mt-4">
                  Para equipos de marketing que quieren una demo con su marca y sus
                  competidores antes de la primera llamada.
                </p>
                <a
                  href="#formulario"
                  className="mt-4 inline-flex items-center font-mono text-[11px] tracking-[0.06em] text-ink hover:text-ink-secondary transition-colors"
                >
                  Contactar →
                </a>
              </div>
            </div>

            {/* Card Agencias */}
            <div className="border border-rule flex flex-col" style={{ minHeight: 300 }}>
              <div className="p-6 pb-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary">
                  Agencias
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center px-6 py-10">
                <div className="text-center">
                  <p className="font-['Times_New_Roman'] text-[48px] leading-none text-rule select-none">
                    ×
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-rule mt-4">
                <p className="font-sans text-[13px] leading-[1.65] text-ink-secondary mt-4">
                  Gestiona múltiples marcas desde un solo panel. Cada cliente tiene su
                  propia edición privada con sus competidores.
                </p>
                <a
                  href="#formulario"
                  className="mt-4 inline-flex items-center font-mono text-[11px] tracking-[0.06em] text-ink hover:text-ink-secondary transition-colors"
                >
                  Contactar →
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ── Items secundarios ── */}
        <div className="mt-12 pt-8 border-t border-rule/60 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {SECONDARY.map((s) => (
            <div key={s.label}>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary mb-2">
                {s.label}
              </p>
              <p className="font-sans text-[13px] text-ink-secondary leading-[1.6] mb-2">
                {s.desc}
              </p>
              {s.cta && s.href && (
                <a
                  href={s.href}
                  className="font-mono text-[11px] tracking-[0.04em] text-ink hover:text-ink-secondary transition-colors"
                >
                  {s.cta} →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* ── Formulario ── */}
        <div id="formulario" className="mt-12 pt-8 border-t border-rule/60 pb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary mb-8">
            Formulario de contacto
          </p>
          <div className="max-w-2xl">
            <ContactForm />
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
