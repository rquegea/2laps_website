'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MacWindow } from '@/components/home/MacWindow';

export function TodayHero() {
  const reduced = useReducedMotion();
  const t = (d: number) => ({ duration: reduced ? 0 : 0.5, ease: 'easeOut' as const, delay: reduced ? 0 : d });
  const fadeUp = { hidden: { opacity: 0, y: reduced ? 0 : 8 }, visible: { opacity: 1, y: 0 } };

  return (
    <main className="flex-1 flex flex-col">

      {/* ── Text block ── */}
      <div className="w-full">
        <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-10 pt-14 pb-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={t(0)}>
            <h1
              className="font-serif leading-[1.1] tracking-[-0.02em] text-foreground max-w-[680px]"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
            >
              Agentes que unifican todo tu Marketing Digital.
            </h1>

            <p className="mt-5 font-sans font-normal text-[15px] sm:text-[17px] leading-[1.55] text-ink-secondary max-w-[560px]">
              El paisaje digital de tu marca, monitorizado y traducido en inteligencia accionable.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="/2day"
                className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-[14px] font-semibold rounded-full hover:bg-background hover:text-foreground border border-foreground transition-colors duration-150"
              >
                Leer 2day →
              </a>
              <a
                href="/contacto"
                className="inline-flex items-center justify-center px-6 py-3 border border-foreground text-foreground text-[14px] font-medium rounded-full hover:bg-foreground hover:text-background transition-colors duration-150"
              >
                Contactar con ventas →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Mac portal — live /2day inside a draggable window ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={t(0.25)}
        className="w-full rounded-2xl mx-auto max-w-[1500px] mb-12 sm:mb-16 overflow-hidden relative"
        style={{
          height: '820px',
          backgroundImage: "url('/wallpaper2day1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full max-w-none mx-auto px-4 sm:px-8 py-10 sm:py-14">
          <MacWindow />
        </div>
      </motion.div>

    </main>
  );
}
