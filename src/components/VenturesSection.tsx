import { ExternalLink, MapPin, MessageCircle } from 'lucide-react';
import type { StudentVenture, VentureCategory } from '../types/roa';

interface VenturesSectionProps {
  ventures: StudentVenture[];
  selectedCategory: 'Todos' | VentureCategory;
  onSelectCategory: (category: 'Todos' | VentureCategory) => void;
  onResetFilter: () => void;
}

const VENTURE_CATEGORIES: Array<'Todos' | VentureCategory> = [
  'Todos',
  'Servicios',
  'Educación/Apuntes',
  'Tecnología',
  'Gastronomía',
  'Diseño/Comunicación',
  'Otros',
];

export function VenturesSection({
  ventures,
  selectedCategory,
  onSelectCategory,
  onResetFilter,
}: VenturesSectionProps) {
  return (
    <section
      id="emprendimientos"
      className="py-12 lg:py-16 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Módulo 2 · Red Estudiantil y Local
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#0F2942] dark:text-slate-100 tracking-tight">
              Emprendimientos estudiantiles y locales
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Vitrina comunitaria de servicios y proyectos impulsados por estudiantes y
              egresados en Santa Fe Capital. Las tarjetas iniciales son ejemplos de
              estructura abiertos a postulación.
            </p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums whitespace-nowrap shrink-0">
            {ventures.length}{' '}
            {ventures.length === 1 ? 'proyecto visible' : 'proyectos visibles'}
          </p>
        </div>

        {/* Filtros por rubro */}
        <div
          role="group"
          aria-label="Filtrar emprendimientos por rubro"
          className="mt-6 flex flex-wrap gap-2"
        >
          {VENTURE_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                aria-pressed={isActive}
                className={`min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#0F2942] dark:bg-sky-600 text-white border-[#0F2942] dark:border-sky-600 font-semibold'
                    : 'bg-[#F8FAFC] dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Grilla de tarjetas */}
        {ventures.length > 0 ? (
          <div
            data-testid="ventures-grid"
            className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {ventures.map((venture) => (
              <article
                key={venture.id}
                className="bg-[#F8FAFC] dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Metadatos sin píldoras */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-[#0369A1] dark:text-sky-400">
                      {venture.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">Act. {venture.lastUpdated}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#0F2942] dark:text-slate-100 leading-snug">
                      {venture.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {venture.academicLink}
                    </p>
                  </div>

                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {venture.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <MapPin
                      className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>Cobertura: {venture.coverageZone}</span>
                  </div>

                  <a
                    href={venture.contactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#0F2942] dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-[#0F2942] dark:hover:bg-sky-600 hover:text-white hover:border-[#0F2942] dark:hover:border-sky-600 transition-colors duration-150"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {venture.contactChannel}: {venture.contactLabel}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 bg-[#F8FAFC] dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-3">
            <p className="text-base font-semibold text-[#0F2942] dark:text-slate-100">
              Sin emprendimientos registrados en este rubro
            </p>
            <button
              type="button"
              onClick={onResetFilter}
              className="min-h-[44px] px-4 py-2 text-sm font-semibold text-white bg-[#0F2942] dark:bg-sky-600 rounded-lg hover:bg-[#193C5E] dark:hover:bg-sky-500 transition-colors cursor-pointer"
            >
              Ver todos los rubros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
