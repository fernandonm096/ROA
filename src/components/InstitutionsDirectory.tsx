import {
  ArrowUpRight,
  CheckCircle2,
  FileDown,
  Info,
  MapPin,
  Search,
  ShieldCheck,
} from 'lucide-react';
import type { EducationLevel, Institution, ManagementType } from '../types/roa';
import { InstitutionsMap } from './InstitutionsMap';

interface InstitutionsDirectoryProps {
  institutions: Institution[];
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  managementFilter: 'Todas' | ManagementType;
  onManagementFilterChange: (value: 'Todas' | ManagementType) => void;
  levelFilter: 'Todos' | EducationLevel;
  onLevelFilterChange: (value: 'Todos' | EducationLevel) => void;
  onResetFilters: () => void;
  onSelectInstitution: (institution: Institution) => void;
  onExportPdf: () => void;
  isExportingPdf: boolean;
  pdfExportNotice: string | null;
}

const MANAGEMENT_OPTIONS: Array<'Todas' | ManagementType> = [
  'Todas',
  'Pública',
  'Privada',
];

const LEVEL_OPTIONS: Array<'Todos' | EducationLevel> = [
  'Todos',
  'Universitario',
  'Terciario',
];

export function InstitutionsDirectory({
  institutions,
  searchQuery,
  onSearchQueryChange,
  managementFilter,
  onManagementFilterChange,
  levelFilter,
  onLevelFilterChange,
  onResetFilters,
  onSelectInstitution,
  onExportPdf,
  isExportingPdf,
  pdfExportNotice,
}: InstitutionsDirectoryProps) {
  return (
    <section
      id="instituciones"
      className="py-12 lg:py-16 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de sección y acciones del listado */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Módulo 1 · Directorio de Educación Superior
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#0F2942] dark:text-slate-100 tracking-tight">
              Instituciones educativas en Santa Fe Capital
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Consultá ubicación exacta en el mapa, planes de estudio por período,
              registro edilicio fechado y trazabilidad de fuentes antes de inscribirte.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums whitespace-nowrap">
              Mostrando {institutions.length}{' '}
              {institutions.length === 1 ? 'institución' : 'instituciones'}
            </span>

            <a
              href="#mapa-instituciones"
              className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Ver mapa</span>
            </a>

            <button
              type="button"
              onClick={onExportPdf}
              disabled={institutions.length === 0 || isExportingPdf}
              className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0F2942] dark:bg-sky-600 rounded-lg hover:bg-[#193C5E] dark:hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
              <span>
                {isExportingPdf ? 'Generando PDF...' : 'Exportar listado a PDF'}
              </span>
            </button>
          </div>
        </div>

        {pdfExportNotice && (
          <div
            role="status"
            className="mt-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg px-4 py-2.5 text-xs text-emerald-950 dark:text-emerald-200"
          >
            {pdfExportNotice}
          </div>
        )}

        {/* Barra de filtros y búsqueda */}
        <div className="mt-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            {/* Búsqueda por nombre, sigla o carrera */}
            <div className="lg:col-span-5">
              <label
                htmlFor="directory-search-input"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
              >
                Buscar por nombre, sigla o carrera
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="directory-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  placeholder="Ej: UNL, ADE, Programación, Sistemas..."
                  className="w-full min-h-[44px] pl-10 pr-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 bg-[#F8FAFC] dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#0F2942] dark:focus:border-sky-400 focus:ring-2 focus:ring-[#0F2942]/15 dark:focus:ring-sky-400/20"
                />
              </div>
            </div>

            {/* Filtro por gestión */}
            <div className="lg:col-span-4">
              <span className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                Tipo de gestión
              </span>
              <div
                role="group"
                aria-label="Filtrar por tipo de gestión"
                className="inline-flex flex-wrap sm:flex-nowrap w-full p-1 bg-slate-100 dark:bg-slate-800 rounded-lg gap-1"
              >
                {MANAGEMENT_OPTIONS.map((option) => {
                  const isActive = managementFilter === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onManagementFilterChange(option)}
                      aria-pressed={isActive}
                      className={`flex-1 min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-white dark:bg-slate-700 text-[#0F2942] dark:text-white shadow-sm font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filtro por nivel */}
            <div className="lg:col-span-3">
              <span className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                Nivel académico
              </span>
              <div
                role="group"
                aria-label="Filtrar por nivel académico"
                className="inline-flex flex-wrap sm:flex-nowrap w-full p-1 bg-slate-100 dark:bg-slate-800 rounded-lg gap-1"
              >
                {LEVEL_OPTIONS.map((option) => {
                  const isActive = levelFilter === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onLevelFilterChange(option)}
                      aria-pressed={isActive}
                      className={`flex-1 min-h-[38px] px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-white dark:bg-slate-700 text-[#0F2942] dark:text-white shadow-sm font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Aviso explícito de módulo de costos */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
            <Info
              className="w-4 h-4 text-[#0369A1] dark:text-sky-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p>
              <strong className="font-semibold text-slate-800 dark:text-slate-100">
                Política de aranceles:
              </strong>{' '}
              Módulo de aranceles y costos en desarrollo — No se publican valores
              estimados ni de memoria para garantizar datos actualizados.
            </p>
          </div>
        </div>

        {/* Grilla responsiva de tarjetas (3 columnas en escritorio, 1 en móvil) */}
        {institutions.length > 0 ? (
          <div
            data-testid="institutions-grid"
            className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {institutions.map((inst) => (
              <article
                key={inst.id}
                className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-150"
              >
                <div className="space-y-4">
                  {/* Metadatos sin píldoras: texto plano con separadores */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      Gestión {inst.management}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{inst.level}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums whitespace-nowrap">
                      Act. {inst.lastUpdated}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-mono font-medium text-[#0369A1] dark:text-sky-400">
                      {inst.acronym}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-[#0F2942] dark:text-slate-100 leading-snug">
                      {inst.officialName}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {inst.summary}
                  </p>

                  {/* Datos clave en lista limpia */}
                  <dl className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-start gap-2">
                      <MapPin
                        className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <dt className="sr-only">Dirección</dt>
                        <dd>{inst.address}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck
                        className="w-4 h-4 text-[#047857] dark:text-emerald-400 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <dt className="sr-only">Fuente de validación</dt>
                        <dd>
                          Validación:{' '}
                          <span className="font-medium text-slate-800 dark:text-slate-100">
                            {inst.validationSource}
                          </span>
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <dt className="sr-only">Relevamiento edilicio y carreras</dt>
                        <dd className="tabular-nums">
                          {inst.careers.length} carreras de muestra · Edilicio:{' '}
                          <span className="font-medium text-slate-800 dark:text-slate-100">
                            {inst.buildingInspection.status}
                          </span>{' '}
                          (Ejemplo)
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => onSelectInstitution(inst)}
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0F2942] dark:text-slate-100 bg-[#F8FAFC] dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-[#0F2942] dark:hover:bg-sky-600 hover:text-white hover:border-[#0F2942] dark:hover:border-sky-600 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2942] dark:focus-visible:outline-sky-400"
                  >
                    <span>Ver ficha completa</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-3">
            <p className="text-base font-semibold text-[#0F2942] dark:text-slate-100">
              No se encontraron instituciones con los filtros actuales
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Probá limpiar la búsqueda o ampliar el nivel académico y tipo de gestión.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-sm font-semibold text-white bg-[#0F2942] dark:bg-sky-600 rounded-lg hover:bg-[#193C5E] dark:hover:bg-sky-500 transition-colors cursor-pointer"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Mapa de instituciones sincronizado con los filtros activos */}
        <InstitutionsMap
          institutions={institutions}
          onSelectInstitution={onSelectInstitution}
        />
      </div>
    </section>
  );
}
