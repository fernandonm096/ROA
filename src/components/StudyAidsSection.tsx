import { useState } from 'react';
import { BookOpen, Check, Copy, ExternalLink, PlayCircle } from 'lucide-react';
import type { StudyAid, StudyAidType } from '../types/roa';

interface StudyAidsSectionProps {
  studyAids: StudyAid[];
  selectedType: 'Todos' | StudyAidType;
  onSelectType: (type: 'Todos' | StudyAidType) => void;
  selectedCareer: string;
  onSelectCareer: (career: string) => void;
  availableCareers: string[];
  onResetFilters: () => void;
}

const RESOURCE_TYPES: Array<'Todos' | StudyAidType> = [
  'Todos',
  'Prompt IA',
  'Video educativo',
  'Guía de estudio',
];

export function StudyAidsSection({
  studyAids,
  selectedType,
  onSelectType,
  selectedCareer,
  onSelectCareer,
  availableCareers,
  onResetFilters,
}: StudyAidsSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPrompt = async (aid: StudyAid) => {
    if (!aid.promptText) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(aid.promptText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = aid.promptText;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedId(aid.id);
      window.setTimeout(() => {
        setCopiedId((current) => (current === aid.id ? null : current));
      }, 2400);
    } catch {
      setCopiedId(aid.id);
      window.setTimeout(() => {
        setCopiedId((current) => (current === aid.id ? null : current));
      }, 2400);
    }
  };

  return (
    <section
      id="ayudas"
      className="py-12 lg:py-16 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Módulo 3 · Acompañamiento Académico Abierto
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#0F2942] dark:text-slate-100 tracking-tight">
              Ayudas de estudio por carrera y cátedra
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Prompts de inteligencia artificial listos para completar con tus datos
              entre corchetes, videos explicativos y guías metodológicas de acceso
              gratuito.
            </p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums whitespace-nowrap shrink-0">
            {studyAids.length}{' '}
            {studyAids.length === 1 ? 'recurso disponible' : 'recursos disponibles'}
          </p>
        </div>

        {/* Barra de filtros */}
        <div className="mt-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          <div className="lg:col-span-7">
            <span className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
              Tipo de recurso
            </span>
            <div
              role="group"
              aria-label="Filtrar ayudas de estudio por tipo"
              className="flex flex-wrap gap-1.5"
            >
              {RESOURCE_TYPES.map((type) => {
                const isActive = selectedType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onSelectType(type)}
                    aria-pressed={isActive}
                    className={`min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#0F2942] dark:bg-sky-600 text-white border-[#0F2942] dark:border-sky-600 font-semibold'
                        : 'bg-[#F8FAFC] dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <label
              htmlFor="study-aid-career-select"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
            >
              Filtrar por carrera o área temática
            </label>
            <select
              id="study-aid-career-select"
              value={selectedCareer}
              onChange={(e) => onSelectCareer(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 bg-[#F8FAFC] dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#0F2942] dark:focus:border-sky-400 focus:ring-2 focus:ring-[#0F2942]/15 dark:focus:ring-sky-400/20"
            >
              <option value="Todas">Todas las carreras y materias</option>
              {availableCareers.map((career) => (
                <option key={career} value={career}>
                  {career}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Listado de recursos */}
        {studyAids.length > 0 ? (
          <div
            data-testid="study-aids-grid"
            className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {studyAids.map((aid) => {
              const isCopied = copiedId === aid.id;
              return (
                <article
                  key={aid.id}
                  className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Metadatos unboxed */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-[#0369A1] dark:text-sky-400">
                        {aid.type}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{aid.career}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">Act. {aid.lastUpdated}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#0F2942] dark:text-slate-100 leading-snug">
                        {aid.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                        Cátedra / Tema sugerido: {aid.subject}
                      </p>
                    </div>

                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {aid.purpose}
                    </p>

                    {/* Bloque específico para Prompt IA */}
                    {aid.type === 'Prompt IA' && aid.promptText && (
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Estructura del prompt (completá los corchetes [ ])
                          </span>
                        </div>
                        <pre className="bg-[#F8FAFC] dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-56 overflow-y-auto">
                          {aid.promptText}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Acción al pie de la tarjeta */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    {aid.type === 'Prompt IA' && aid.promptText ? (
                      <>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Compatible con cualquier asistente de texto
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyPrompt(aid)}
                          aria-label={
                            isCopied
                              ? `Prompt copiado: ${aid.title}`
                              : `Copiar prompt: ${aid.title}`
                          }
                          className={`min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer ${
                            isCopied
                              ? 'bg-[#047857] text-white'
                              : 'bg-[#0F2942] dark:bg-sky-600 text-white hover:bg-[#193C5E] dark:hover:bg-sky-500'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-4 h-4" aria-hidden="true" />
                              <span>Prompt copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" aria-hidden="true" />
                              <span>Copiar Prompt</span>
                            </>
                          )}
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          <p className="font-medium text-slate-700 dark:text-slate-200">
                            {aid.sourceName}
                          </p>
                          {aid.durationLabel && <p>{aid.durationLabel}</p>}
                        </div>
                        {aid.externalUrl && (
                          <a
                            href={aid.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#0F2942] dark:text-slate-100 bg-[#F8FAFC] dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-[#0F2942] dark:hover:bg-sky-600 hover:text-white hover:border-[#0F2942] dark:hover:border-sky-600 transition-colors duration-150"
                          >
                            {aid.type === 'Video educativo' ? (
                              <PlayCircle className="w-4 h-4" aria-hidden="true" />
                            ) : (
                              <BookOpen className="w-4 h-4" aria-hidden="true" />
                            )}
                            <span>
                              {aid.type === 'Video educativo'
                                ? 'Abrir video externo'
                                : 'Abrir guía externa'}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-3">
            <p className="text-base font-semibold text-[#0F2942] dark:text-slate-100">
              No hay recursos para la combinación seleccionada
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="min-h-[44px] px-4 py-2 text-sm font-semibold text-white bg-[#0F2942] dark:bg-sky-600 rounded-lg hover:bg-[#193C5E] dark:hover:bg-sky-500 transition-colors cursor-pointer"
            >
              Mostrar todos los recursos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
