import { Flag } from 'lucide-react';
import { ROA_SITE_META } from '../data/roaData';

interface FooterProps {
  onOpenCorrectionModal: () => void;
  reportsCount: number;
}

export function Footer({ onOpenCorrectionModal, reportsCount }: FooterProps) {
  return (
    <footer
      id="canal-correccion"
      className="bg-[#0F2942] dark:bg-[#070B14] border-t border-slate-800 text-slate-200 py-12 lg:py-14 transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Bloque editorial de neutralidad */}
          <div className="lg:col-span-7 space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">
              {ROA_SITE_META.brandFullName}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {ROA_SITE_META.neutralityPolicy}
            </p>
            <p className="text-xs text-slate-400 tabular-nums">
              Ciudad de cobertura: {ROA_SITE_META.city} · Última actualización del
              relevamiento: {ROA_SITE_META.lastDatasetReview}
            </p>
          </div>

          {/* Canal de moderación y derecho a réplica */}
          <div className="lg:col-span-5 bg-white/5 border border-white/15 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white">
              Canal abierto de corrección y derecho a réplica
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              ¿Sos autoridad institucional, docente o estudiante con información
              verificable? Podés sugerir datos, adjuntar evidencia fechada o
              solicitar rectificación.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={onOpenCorrectionModal}
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#0F2942] bg-white rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Flag className="w-4 h-4" aria-hidden="true" />
                <span>Abrir formulario de corrección</span>
              </button>
              {reportsCount > 0 && (
                <span className="text-xs text-slate-300 tabular-nums">
                  {reportsCount}{' '}
                  {reportsCount === 1
                    ? 'envío en esta sesión'
                    : 'envíos en esta sesión'}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            ROA — Red de Orientación Administrativa · Proyecto comunitario de
            presupuesto cero ($0) para Santa Fe Capital.
          </p>
          <div className="flex flex-wrap gap-5">
            <a href="#instituciones" className="hover:text-white transition-colors">
              Instituciones
            </a>
            <a href="#emprendimientos" className="hover:text-white transition-colors">
              Emprendimientos
            </a>
            <a href="#ayudas" className="hover:text-white transition-colors">
              Ayudas de estudio
            </a>
            <a href="#noticias" className="hover:text-white transition-colors">
              Noticias
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
