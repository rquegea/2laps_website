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
            className="font-['Switzer'] font-normal leading-[1.1] tracking-[-0.01em] text-ink max-w-[800px]"
            style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}
          >
            El marketing digital se rompió en doce pestañas.<br />Lo estamos volviendo a juntar.
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
            <h2
              className="font-['Switzer'] font-normal leading-[1.2] text-ink"
              style={{ fontSize: 'clamp(26px, 2.5vw, 34px)' }}
            >
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
          </div>

          {/* Pull quote */}
          <div
            className="mt-12 px-8 sm:px-16 py-12 sm:py-16 rounded-2xl border border-ink/15 transition-transform duration-300 ease-out hover:scale-[1.02] cursor-default"
            style={{ backgroundColor: '#f5f0e8' }}
          >
            <blockquote>
              <p
                className="font-['Newsreader'] italic leading-[1.4] text-ink max-w-[760px]"
                style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }}
              >
                "Cuando Lidl pierde 47 featured snippets, la causa no está en SEO. Está en que su
                schema markup no se desplegó. Eso solo lo ves si miras los dos canales a la vez."
              </p>
            </blockquote>
          </div>
        </div>

        {/* Diagrama de correlación */}
        <div className="py-14 border-b border-rule/60">
          <h2
            className="font-['Switzer'] font-normal leading-[1.2] text-ink mb-2"
            style={{ fontSize: 'clamp(26px, 2.5vw, 34px)' }}
          >
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
          <h2
            className="font-['Switzer'] font-normal leading-[1.2] text-ink mb-10"
            style={{ fontSize: 'clamp(26px, 2.5vw, 34px)' }}
          >
            Cómo funciona en una página
          </h2>
          <div className="space-y-0">
            {HOW_SECTIONS.map((s, i) => (
              <div
                key={s.num}
                className={`relative flex gap-8 py-10 ${i > 0 ? 'border-t border-rule/60' : ''}`}
              >
                {/* Decorative number — typographic background element */}
                <div className="shrink-0 w-20 flex items-start">
                  <span
                    className="font-['Newsreader'] font-normal leading-none select-none"
                    style={{ fontSize: 'clamp(64px, 6vw, 80px)', color: '#e5e5e0' }}
                    aria-hidden="true"
                  >
                    {s.num}
                  </span>
                </div>
                <div className="max-w-[600px] pt-2">
                  <h3 className="font-['Switzer'] font-semibold text-[18px] leading-[1.3] text-ink mb-3">
                    {s.title}
                  </h3>
                  <p className="font-sans text-[17px] leading-[1.75] text-ink-secondary">
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
            <h2
              className="font-['Switzer'] font-normal leading-[1.2] text-ink mb-6"
              style={{ fontSize: 'clamp(26px, 2.5vw, 34px)' }}
            >
              Quién está detrás
            </h2>
            <p className="text-[17px] leading-[1.75] text-ink-secondary" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
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
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-[14px] font-semibold rounded-full hover:bg-background hover:text-foreground border border-foreground transition-colors duration-150"
            >
              Leer 2day →
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3 border border-foreground text-foreground text-[14px] font-medium rounded-full hover:bg-foreground hover:text-background transition-colors duration-150"
            >
              Hablar con el equipo →
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
