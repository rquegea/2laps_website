import Link from 'next/link';
import { TopNav } from '@/components/nav/TopNav';
import { Footer } from '@/components/nav/Footer';
import { CorrelationDiagram } from '@/components/about/CorrelationDiagram';

export const metadata = {
  title: 'Quiénes somos — 2laps.ai',
  description: 'El marketing digital se fragmentó en doce pestañas. Lo estamos volviendo a juntar.',
};

const HOW_SECTIONS = [
  {
    num: '01',
    title: 'Detectar.',
    body: 'Los agentes leen tus canales conectados todo el día. No buscan métricas; buscan contradicciones. Un pico en TikTok que no coincide con lo que está pasando en orgánico. Una caída en branded search sin ninguna explicación visible. Señales que las herramientas individuales no pueden ver porque solo miran su propio canal.',
  },
  {
    num: '02',
    title: 'Correlacionar.',
    body: 'Cuando una señal en TikTok aparece tres horas antes de una caída en orgánico, eso no es ruido. Es una historia. El agente cruza canales, detecta la causa probable y evalúa si el patrón es lo suficientemente fuerte como para merecer tu atención.',
  },
  {
    num: '03',
    title: 'Escribir.',
    body: 'El agente no te manda una alerta. Te escribe un titular. Si el titular merece tu atención, lo lees. Si no, pasas. Sin dashboards que revisar. Sin notificaciones que ignorar. El periódico es el filtro.',
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10">

        {/* Hero editorial */}
        <div className="pt-14 pb-12 border-b border-rule/60">
          <h1
            className="font-['Times_New_Roman'] font-normal leading-[1.1] tracking-[-0.01em] text-ink max-w-[800px]"
            style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}
          >
            El marketing digital se rompió en doce pestañas. Lo estamos volviendo a juntar.
          </h1>
          <p className="mt-6 font-sans text-[15px] sm:text-[17px] leading-[1.65] text-ink-secondary max-w-[680px]">
            SEMrush en una. Search Console en otra. Brandwatch en otra. Meta Ads en otra. Google Trends
            en otra. TikTok en otra. Y mientras tu equipo cambia de pestaña, las señales que importan
            ocurren entre ellas.
          </p>
        </div>

        {/* Sección "El problema" */}
        <div className="py-14 border-b border-rule/60">
          <div className="max-w-[680px] space-y-6">
            <h2 className="font-['Switzer'] font-semibold text-[24px] leading-[1.2] text-ink">
              El problema que nadie resuelve
            </h2>
            <p className="font-sans text-[15px] leading-[1.75] text-ink-secondary">
              Cada herramienta de marketing digital vigila un canal. SEMrush vigila tu SEO. Brandwatch
              vigila las menciones. Google Ads vigila el paid. Pero ninguna de ellas vigila lo que
              ocurre <em>entre</em> los canales. Y las historias importantes — la causa real de un
              movimiento, la oportunidad antes de que nadie la vea — viven precisamente ahí.
            </p>
            <p className="font-sans text-[15px] leading-[1.75] text-ink-secondary">
              El resultado es que los equipos de marketing pasan horas cada semana cambiando de pestaña,
              intentando correlacionar manualmente lo que ninguna herramienta correlaciona por ellos.
              Y la mayoría de las veces, la historia se va sin que nadie la haya leído.
            </p>

            {/* Pull quote */}
            <blockquote className="my-10 py-6 border-t border-b border-ink/20">
              <p className="font-serif italic text-[22px] sm:text-[26px] leading-[1.35] text-ink">
                "Cuando Lidl pierde 47 featured snippets, la causa no está en SEO. Está en que su
                schema markup no se desplegó. Eso solo lo ves si miras los dos canales a la vez."
              </p>
            </blockquote>
          </div>
        </div>

        {/* Diagrama de correlación */}
        <div className="py-14 border-b border-rule/60">
          <h2 className="font-['Switzer'] font-semibold text-[22px] leading-[1.2] text-ink mb-2">
            De señales a titulares
          </h2>
          <p className="font-sans text-[14px] text-ink-secondary mb-10 max-w-[480px]">
            El agente correlaciona todos los canales en tiempo real y escribe la historia que ningún
            dashboard te contaría.
          </p>
          <CorrelationDiagram />
        </div>

        {/* Cómo funciona */}
        <div className="py-14 border-b border-rule/60">
          <h2 className="font-['Switzer'] font-semibold text-[22px] leading-[1.2] text-ink mb-10">
            Cómo funciona en una página
          </h2>
          <div className="space-y-0">
            {HOW_SECTIONS.map((s, i) => (
              <div
                key={s.num}
                className={`flex gap-8 py-8 ${i > 0 ? 'border-t border-rule/60' : ''}`}
              >
                <div className="shrink-0 w-12">
                  <span className="font-serif text-[40px] leading-none font-bold text-ink-tertiary select-none">
                    {s.num}
                  </span>
                </div>
                <div className="max-w-[600px]">
                  <h3 className="font-['Switzer'] font-semibold text-[18px] leading-[1.3] text-ink mb-3">
                    {s.title}
                  </h3>
                  <p className="font-sans text-[14px] leading-[1.75] text-ink-secondary">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quién está detrás */}
        <div className="py-14 border-b border-rule/60">
          <div className="max-w-[680px]">
            <h2 className="font-['Switzer'] font-semibold text-[22px] leading-[1.2] text-ink mb-6">
              Quién está detrás
            </h2>
            <p className="font-serif italic text-[17px] leading-[1.75] text-ink-secondary">
              2laps lo construye un equipo pequeño que ha pasado los últimos diez años en agencias y
              en producto, viendo cómo los CMOs abrían doce pestañas para responder una sola pregunta.
              Sabíamos que el problema no era la falta de datos — era la falta de correlación entre
              ellos. Estamos en Madrid.
            </p>
          </div>
        </div>

        {/* CTA final */}
        <div className="py-14">
          <h2
            className="font-['Switzer'] font-semibold leading-[1.1] tracking-[-0.02em] text-ink mb-8 max-w-[480px]"
            style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}
          >
            ¿Quieres ver tu marca dentro?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/2day"
              className="inline-flex items-center justify-center px-6 py-3 bg-ink text-paper text-[14px] font-semibold hover:opacity-80 transition-opacity duration-150"
            >
              Leer 2day →
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3 border border-ink text-ink text-[14px] font-medium hover:bg-ink hover:text-paper transition-colors duration-150"
            >
              Hablar con ventas →
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
