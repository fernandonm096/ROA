import { useState } from 'react';
import { ArrowRight, Building2, Search } from 'lucide-react';
import { ROA_SITE_META } from '../data/roaData';

interface HeroProps {
  quickSearch: string;
  onQuickSearchChange: (value: string) => void;
  onJumpToDirectory: () => void;
  stats: {
    institutionsCount: number;
    venturesCount: number;
    studyAidsCount: number;
    newsCount: number;
  };
}

export function Hero({
  quickSearch,
  onQuickSearchChange,
  onJumpToDirectory,
  stats,
}: HeroProps) {
  const [imageError, setImageError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onJumpToDirectory();
  };

  return (
    <section
      id="inicio"
      className="bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 pt-10 pb-12 lg:pt-14 lg:pb-16 transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Columna de texto editorial y buscador rápido */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide">
                Santa Fe Capital, Argentina · Datos con fuente y fecha de relevamiento
              </p>
              <h1
                className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#0F2942] dark:text-slate-100 leading-[1.15] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Transparencia académica para elegir dónde estudiar en Santa Fe
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                ROA reúne información verificable sobre instituciones terciarias y
                universitarias, planes de estudio vigentes, estado edilicio fechado y
                recursos de estudio sin sesgos partidarios ni folletería comercial.
              </p>
            </div>

            {/* Buscador rápido conectado al directorio */}
            <form
              onSubmit={handleSubmit}
              className="bg-[#F8FAFC] dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 space-y-3"
            >
              <label
                htmlFor="hero-quick-search"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Buscador rápido en el directorio de instituciones
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search
                    className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="hero-quick-search"
                    type="search"
                    value={quickSearch}
                    onChange={(e) => onQuickSearchChange(e.target.value)}
                    placeholder="Buscar institución, sigla o carrera (ej. UTN)..."
                    className="w-full min-h-[44px] pl-10 pr-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0F2942] dark:focus:border-sky-400 focus:ring-2 focus:ring-[#0F2942]/15 dark:focus:ring-sky-400/20"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold text-white bg-[#0F2942] dark:bg-sky-600 rounded-lg hover:bg-[#193C5E] dark:hover:bg-sky-500 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2942] dark:focus-visible:outline-sky-400"
                >
                  <span>Explorar directorio</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ROA_SITE_META.feesModuleNotice}
              </p>
            </form>
          </div>

          {/* Columna visual institucional */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[240px] lg:min-h-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
              {!imageError ? (
                <img
                  src="/src/assets/images/hero_academic_courtyard_1795618299690.jpg"
                  alt="Patio académico y sala de lectura universitaria en luz natural"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-600 dark:text-slate-300">
                  <Building2
                    className="w-10 h-10 mb-3 text-[#0F2942] dark:text-sky-400"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold text-[#0F2942] dark:text-slate-100">
                    Red de Orientación Administrativa
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Santa Fe Capital
                  </p>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-4">
                <p className="text-xs text-slate-100 leading-snug">
                  Proyecto comunitario independiente · Última revisión:{' '}
                  <span className="font-mono tabular-nums whitespace-nowrap">
                    {ROA_SITE_META.lastDatasetReview}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Franja de inventario verificable en 4 columnas */}
        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-2xl font-semibold text-[#0F2942] dark:text-sky-300 tabular-nums">
              {stats.institutionsCount}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Instituciones modelo en Santa Fe Capital
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-[#0F2942] dark:text-sky-300 tabular-nums">
              {stats.venturesCount}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Emprendimientos estudiantiles por rubro
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-[#0F2942] dark:text-sky-300 tabular-nums">
              {stats.studyAidsCount}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Prompts de IA, videos y guías de cátedra
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-[#0F2942] dark:text-sky-300 tabular-nums">
              {stats.newsCount}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Notas educativas con fuente y neutralidad
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
