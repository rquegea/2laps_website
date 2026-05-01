'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary mb-4">
        ERROR
      </p>
      <h1 className="font-serif font-bold text-[36px] sm:text-[48px] leading-[1.1] text-ink text-center max-w-[520px]">
        Algo se rompió.
      </h1>
      <p className="mt-4 text-[14px] font-sans text-ink-secondary text-center max-w-[360px]">
        El agente que cargaba esta página encontró algo inesperado. Ya lo sabemos.
      </p>
      <div className="mt-10 flex gap-4">
        <button
          onClick={reset}
          className="text-[13px] font-sans font-semibold text-ink border border-ink/70 px-5 py-2.5 hover:bg-ink hover:text-paper transition-colors duration-150"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="text-[13px] font-sans font-semibold text-ink-secondary border border-rule px-5 py-2.5 hover:text-ink hover:border-ink transition-colors duration-150"
        >
          Volver al periódico →
        </Link>
      </div>
    </div>
  );
}
