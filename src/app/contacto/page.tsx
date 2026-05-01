import { TopNav } from '@/components/nav/TopNav';
import { Footer } from '@/components/nav/Footer';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contacto — 2laps.ai',
  description: 'Habla con el equipo de 2laps. Demo personalizada, auditoría inicial, precio transparente.',
};

const WHAT_INCLUDES = [
  {
    label: 'DEMO PERSONALIZADA',
    desc: 'Te montamos un 2day con tu marca y tres competidores antes de la llamada.',
  },
  {
    label: 'AUDITORÍA INICIAL',
    desc: 'Te decimos qué señales ya estás dejando sobre la mesa.',
  },
  {
    label: 'PRECIO',
    desc: 'Transparente desde la primera llamada. Sin tiers ocultos.',
  },
];

const CONTACT_BLOCKS = [
  { label: 'OFICINA', value: 'Madrid, España' },
  { label: 'PRENSA', value: 'prensa@2laps.ai' },
  { label: 'PARTNERSHIPS', value: 'partners@2laps.ai' },
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header editorial */}
        <div className="pt-14 pb-10 border-b border-rule/60">
          <h1
            className="font-['Times_New_Roman'] font-normal leading-[1.1] tracking-[-0.01em] text-ink max-w-[680px]"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            Hablemos de tu paisaje digital.
          </h1>
          <p className="mt-5 font-sans text-[15px] sm:text-[17px] leading-[1.55] text-ink-secondary max-w-[560px]">
            Si gestionas la marca de una compañía con presencia digital seria, probablemente ya tienes
            preguntas que nadie en tu equipo resuelve. Cuéntanoslo.
          </p>
        </div>

        {/* Grid: contexto + formulario */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 py-12">

          {/* Izquierda — contexto */}
          <div className="space-y-10">

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary mb-3">
                PARA EQUIPOS DE MARKETING
              </p>
              <p className="text-[14px] font-sans text-ink-secondary leading-[1.65]">
                Si tu marca aparece en SEMrush, en Google Trends, en TikTok y en Search Console — y
                nadie en tu equipo está correlacionando esas cuatro señales — eso es exactamente lo
                que 2laps hace por ti.
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary mb-3">
                PARA AGENCIAS
              </p>
              <p className="text-[14px] font-sans text-ink-secondary leading-[1.65]">
                Gestiona múltiples marcas desde un solo panel. Cada cliente tiene su propia edición
                privada con sus competidores. El reporting deja de ser un Excel y empieza a ser una
                redacción.
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary mb-3">
                QUÉ INCLUYE UNA CONVERSACIÓN CON VENTAS
              </p>
              <div className="space-y-0">
                {WHAT_INCLUDES.map((item, i) => (
                  <div
                    key={item.label}
                    className={`py-4 ${i > 0 ? 'border-t border-rule/60' : ''}`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink mb-1.5">
                      {item.label}
                    </p>
                    <p className="text-[13px] font-sans text-ink-secondary leading-[1.6]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-mono text-[11px] text-ink-secondary">
              ventas@2laps.ai
            </p>
          </div>

          {/* Derecha — formulario */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* Footer editorial del grid */}
        <div className="border-t border-rule/60 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {CONTACT_BLOCKS.map((b) => (
              <div key={b.label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary mb-2">
                  {b.label}
                </p>
                <p className="text-[13px] font-sans text-ink-secondary">
                  {b.value}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
