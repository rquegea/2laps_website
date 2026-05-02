'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const TEAM_SIZES = ['1–10', '11–50', '51–200', '200+'] as const;

const SECTORS = [
  'Retail', 'Banca y Finanzas', 'Seguros', 'Turismo',
  'Tech', 'Telecomunicaciones', 'Automoción', 'Alimentación y Gran Consumo',
  'Moda', 'Farma y Salud', 'Energía', 'Inmobiliario', 'Medios y Entretenimiento',
] as const;

const inputClass =
  'w-full bg-transparent border border-rule rounded-lg px-4 py-3 text-[14px] font-sans text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-ink transition-colors duration-150';

export function ContactForm() {
  const [selectedSectors, setSelectedSectors] = useState<Set<string>>(new Set());
  const [otroSelected, setOtroSelected] = useState(false);
  const [otroValue, setOtroValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function toggleSector(s: string) {
    setSelectedSectors((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }

  function toggleOtro() {
    setOtroSelected((v) => {
      if (v) setOtroValue('');
      return !v;
    });
  }

  function getAllSectors() {
    const all = [...selectedSectors];
    if (otroSelected && otroValue.trim()) all.push(`Otro: ${otroValue.trim()}`);
    return all;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log('Contact form submission:', { ...data, sectors: getAllSectors() });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start justify-center py-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary mb-3">
          ENVIADO
        </p>
        <h3 className="font-serif font-bold text-[28px] leading-[1.15] text-ink mb-3">
          Recibido. Hablamos pronto.
        </h3>
        <p className="text-[14px] font-sans text-ink-secondary leading-relaxed">
          Te respondemos en menos de 24h laborables.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-tertiary mb-2">
            Nombre
          </label>
          <input
            name="nombre"
            type="text"
            required
            placeholder="Tu nombre"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-tertiary mb-2">
            Empresa
          </label>
          <input
            name="empresa"
            type="text"
            required
            placeholder="Nombre de la empresa"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-tertiary mb-2">
          Email corporativo
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="tu@empresa.com"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-tertiary mb-2">
            Cargo
          </label>
          <input
            name="cargo"
            type="text"
            placeholder="CMO, Head of Marketing..."
            className={inputClass}
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-tertiary mb-2">
            Tamaño del equipo
          </label>
          <select name="team_size" className={inputClass}>
            <option value="">Seleccionar</option>
            {TEAM_SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-tertiary mb-2">
          Sectores que te interesan
        </label>
        <div className="flex flex-wrap gap-2">
          {SECTORS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSector(s)}
              className={cn(
                'px-3 py-1.5 text-[11px] font-sans border rounded-full transition-colors duration-100',
                selectedSectors.has(s)
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-transparent text-ink-secondary border-rule hover:border-ink hover:text-ink'
              )}
            >
              {s}
            </button>
          ))}
          <button
            type="button"
            onClick={toggleOtro}
            className={cn(
              'px-3 py-1.5 text-[11px] font-sans border rounded-full transition-colors duration-100',
              otroSelected
                ? 'bg-ink text-paper border-ink'
                : 'bg-transparent text-ink-secondary border-rule hover:border-ink hover:text-ink'
            )}
          >
            Otro
          </button>
        </div>
        {otroSelected && (
          <input
            type="text"
            value={otroValue}
            onChange={(e) => setOtroValue(e.target.value)}
            placeholder="Indica tu sector"
            className={cn(inputClass, 'mt-2')}
            autoFocus
          />
        )}
        <input type="hidden" name="sectors" value={getAllSectors().join(',')} />
      </div>

      <div>
        <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-tertiary mb-2">
          Mensaje <span className="normal-case text-[10px]">(opcional)</span>
        </label>
        <textarea
          name="mensaje"
          rows={4}
          placeholder="¿Hay algo concreto que estés intentando entender de tu marca?"
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 bg-ink text-paper text-[13px] font-sans font-semibold rounded-full hover:opacity-80 transition-opacity duration-150"
        >
          Enviar →
        </button>
        <p className="mt-3 font-mono text-[10px] tracking-[0.06em] text-ink-tertiary">
          Te respondemos en menos de 24h laborables.
        </p>
      </div>
    </form>
  );
}
