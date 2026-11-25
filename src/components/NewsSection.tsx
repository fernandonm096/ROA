import { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, ShieldCheck, X } from 'lucide-react';
import type { NewsItem, NewsScope } from '../types/roa';

interface NewsSectionProps {
  newsItems: NewsItem[];
  selectedScope: 'Todas' | NewsScope;
  onSelectScope: (scope: 'Todas' | NewsScope) => void;
  onOpenCorrectionChannel: () => void;
  onModalToggle?: (isOpen: boolean) => void;
}

const NEWS_SCOPES: Array<'Todas' | NewsScope> = [
  'Todas',
  'Santa Fe Capital',
  'Provincia de Santa Fe',
  'Educación Superior',
];

export function NewsSection({
  newsItems,
  selectedScope,
  onSelectScope,
  onOpenCorrectionChannel,
  onModalToggle,
}: NewsSectionProps) {
  const [activeNews, setActiveNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    onModalToggle?.(Boolean(activeNews));
  }, [activeNews, onModalToggle]);

  useEffect(() => {
    if (!activeNews) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveNews(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeNews]);

  return (
    <section
      id="noticias"
      className="py-12 lg:py-16 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Módulo 4 · Información Curada y Neutral
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#0F2942] dark:text-slate-100 tracking-tight">
              Noticias educativas
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Notas operativas y administrativas sobre inscripciones, normativa y
              relevamientos en Santa Fe, redactadas sin consignas ni sesgo partidario.
            </p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums whitespace-nowrap shrink-0">
            {newsItems.length}{' '}
            {newsItems.length === 1 ? 'publicación' : 'publicaciones'}
          </p>
        </div>

        {/* Filtros por alcance */}
        <div
          role="group"
          aria-label="Filtrar noticias educativas por alcance"
          className="mt-6 flex flex-wrap gap-2"
        >
          {NEWS_SCOPES.map((scope) => {
            const isActive = selectedScope === scope;
            return (
              <button
                key={scope}
                type="button"
                onClick={() => onSelectScope(scope)}
                aria-pressed={isActive}
                className={`min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#0F2942] dark:bg-sky-600 text-white border-[#0F2942] dark:border-sky-600 font-semibold'
                    : 'bg-[#F8FAFC] dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {scope}
              </button>
            );
          })}
        </div>

        {/* Grilla de noticias */}
        <div
          data-testid="news-grid"
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="bg-[#F8FAFC] dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Metadatos unboxed */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-[#0369A1] dark:text-sky-400">
                    {item.scope}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{item.publishedDate}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-700 dark:text-slate-200 font-medium">
                    Origen: {item.originTag}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-[#0F2942] dark:text-slate-100 leading-snug">
                  {item.headline}
                </h3>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <ShieldCheck
                    className="w-4 h-4 text-[#047857] dark:text-emerald-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Sello de neutralidad editorial · {item.officialSourceName}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveNews(item)}
                    className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#0F2942] dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-[#0F2942] dark:hover:bg-sky-600 hover:text-white hover:border-[#0F2942] dark:hover:border-sky-600 transition-colors duration-150 cursor-pointer"
                  >
                    <span>Leer nota completa</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  {item.officialSourceUrl === '#canal-correccion' ? (
                    <button
                      type="button"
                      onClick={onOpenCorrectionChannel}
                      className="min-h-[40px] text-xs font-semibold text-[#0369A1] dark:text-sky-400 hover:underline cursor-pointer"
                    >
                      Ir al canal de corrección
                    </button>
                  ) : (
                    <a
                      href={item.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] inline-flex items-center gap-1 text-xs font-semibold text-[#0369A1] dark:text-sky-400 hover:underline"
                    >
                      <span>Fuente de respaldo</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal de lectura completa de noticia */}
      {activeNews && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveNews(null);
          }}
        >
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
            <div className="px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-[#0369A1] dark:text-sky-400">
                    {activeNews.scope}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {activeNews.publishedDate}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeNews.originTag}</span>
                </div>
                <h3
                  id="news-modal-title"
                  className="font-display text-xl sm:text-2xl font-semibold text-[#0F2942] dark:text-slate-100 leading-snug"
                >
                  {activeNews.headline}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveNews(null)}
                aria-label="Cerrar nota completa"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-prose">
                {activeNews.fullBody.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-[#F8FAFC] dark:bg-slate-900 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#047857] dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Sello de neutralidad editorial</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeNews.editorialNeutralityNote}
                </p>
                <div className="pt-1">
                  {activeNews.officialSourceUrl === '#canal-correccion' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveNews(null);
                        onOpenCorrectionChannel();
                      }}
                      className="text-xs font-semibold text-[#0369A1] dark:text-sky-400 hover:underline cursor-pointer"
                    >
                      Abrir {activeNews.officialSourceName}
                    </button>
                  ) : (
                    <a
                      href={activeNews.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0369A1] dark:text-sky-400 hover:underline"
                    >
                      <span>
                        Consultar fuente oficial: {activeNews.officialSourceName}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
