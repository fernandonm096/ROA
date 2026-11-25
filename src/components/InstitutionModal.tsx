import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Building2,
  Camera,
  CheckCircle2,
  ExternalLink,
  Flag,
  Globe,
  Info,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react';
import { ROA_SITE_META } from '../data/roaData';
import type { BuildingCondition, Institution } from '../types/roa';

interface InstitutionModalProps {
  institution: Institution | null;
  onClose: () => void;
  onRequestCorrection: (institution: Institution) => void;
  onMapLoadingChange?: (isLoading: boolean) => void;
}

type DetailTab = 'identificacion' | 'planes' | 'edilicio' | 'trazabilidad';

function getConditionDisplay(status: BuildingCondition) {
  if (status === 'Bueno') {
    return {
      label: 'Bueno (estructura de ejemplo)',
      classes:
        'bg-emerald-50 dark:bg-emerald-950/60 text-[#047857] dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      Icon: CheckCircle2,
    };
  }
  if (status === 'Regular') {
    return {
      label: 'Regular (estructura de ejemplo)',
      classes:
        'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      Icon: AlertTriangle,
    };
  }
  return {
    label: 'Deficiente (estructura de ejemplo)',
    classes:
      'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    Icon: AlertTriangle,
  };
}

export function InstitutionModal({
  institution,
  onClose,
  onRequestCorrection,
  onMapLoadingChange,
}: InstitutionModalProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>('identificacion');
  const [selectedCareerId, setSelectedCareerId] = useState<string>('');
  const [showMapEmbed, setShowMapEmbed] = useState(false);
  const [isMapFrameLoading, setIsMapFrameLoading] = useState(false);

  useEffect(() => {
    if (institution) {
      setActiveTab('identificacion');
      setSelectedCareerId(institution.careers[0]?.id ?? '');
      setShowMapEmbed(false);
      setIsMapFrameLoading(false);
      onMapLoadingChange?.(false);
    }
  }, [institution, onMapLoadingChange]);

  useEffect(() => {
    if (!institution) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [institution, onClose]);

  if (!institution) return null;

  const selectedCareer =
    institution.careers.find((c) => c.id === selectedCareerId) ??
    institution.careers[0];

  const conditionDisplay = getConditionDisplay(
    institution.buildingInspection.status
  );
  const ConditionIcon = conditionDisplay.Icon;

  const handleLoadMap = () => {
    setShowMapEmbed(true);
    setIsMapFrameLoading(true);
    onMapLoadingChange?.(true);
  };

  const handleMapLoaded = () => {
    setIsMapFrameLoading(false);
    onMapLoadingChange?.(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="institution-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-xl overflow-hidden">
        {/* Cabecera fija del modal */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-[#F8FAFC] dark:bg-slate-900">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono font-semibold text-[#0369A1] dark:text-sky-400">
                {institution.acronym}
              </span>
              <span aria-hidden="true">·</span>
              <span>Gestión {institution.management}</span>
              <span aria-hidden="true">·</span>
              <span>Nivel {institution.level}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                Actualizado: {institution.lastUpdated}
              </span>
            </div>
            <h2
              id="institution-modal-title"
              className="font-display text-xl sm:text-2xl font-semibold text-[#0F2942] dark:text-slate-100 leading-snug"
            >
              {institution.officialName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={`Cerrar ficha de ${institution.acronym}`}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Pestañas de navegación interna */}
        <div
          role="tablist"
          aria-label="Secciones de la ficha institucional"
          className="px-5 sm:px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] flex items-center gap-1.5 overflow-x-auto"
        >
          {(
            [
              { id: 'identificacion', label: 'Identificación y Mapa' },
              { id: 'planes', label: 'Planes de Estudio' },
              { id: 'edilicio', label: 'Estado Edilicio' },
              { id: 'trazabilidad', label: 'Trazabilidad y Costos' },
            ] as const
          ).map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F2942] dark:bg-sky-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#0F2942] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Cuerpo desplazable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* PESTAÑA 1: IDENTIFICACIÓN Y CONTACTO */}
          {activeTab === 'identificacion' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-[#0F2942] dark:text-slate-100">
                    Datos de contacto oficiales
                  </h3>
                  <dl className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <MapPin
                        className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <div>
                        <dt className="text-xs text-slate-500 dark:text-slate-400">
                          Dirección en Santa Fe Capital
                        </dt>
                        <dd className="font-medium text-slate-900 dark:text-slate-100">
                          {institution.address}
                        </dd>
                        <dd className="text-xs text-slate-500 dark:text-slate-400">
                          Zona: {institution.neighborhood}
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Phone
                        className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <div>
                        <dt className="text-xs text-slate-500 dark:text-slate-400">
                          Teléfonos
                        </dt>
                        {institution.phones.map((phone) => (
                          <dd key={phone} className="font-mono text-xs sm:text-sm">
                            {phone}
                          </dd>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Mail
                        className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <div>
                        <dt className="text-xs text-slate-500 dark:text-slate-400">
                          Correo electrónico
                        </dt>
                        <dd>
                          <a
                            href={`mailto:${institution.email}`}
                            className="text-[#0369A1] dark:text-sky-400 hover:underline"
                          >
                            {institution.email}
                          </a>
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Globe
                        className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <div>
                        <dt className="text-xs text-slate-500 dark:text-slate-400">
                          Sitio web y canales oficiales
                        </dt>
                        <dd className="space-y-1 mt-0.5">
                          <div>
                            <a
                              href={institution.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#0369A1] dark:text-sky-400 font-medium hover:underline"
                            >
                              <span>{institution.website}</span>
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {institution.socialLinks.map((social) => (
                              <a
                                key={social.url}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 hover:text-[#0F2942] dark:hover:text-white underline"
                              >
                                <span>{social.label}</span>
                                <ExternalLink className="w-3 h-3" aria-hidden="true" />
                              </a>
                            ))}
                          </div>
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>

                {/* Bloque de Ubicación y Google Maps */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-[#0F2942] dark:text-slate-100">
                      Ubicación en Google Maps
                    </h3>
                    <a
                      href={institution.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0369A1] dark:text-sky-400 hover:underline"
                    >
                      <span>Abrir en Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>

                  {showMapEmbed ? (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 h-60">
                      {isMapFrameLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 animate-pulse">
                          <span>Cargando mapa interactivo...</span>
                        </div>
                      )}
                      <iframe
                        title={`Mapa de ubicación de ${institution.officialName}`}
                        src={institution.googleMapsEmbedUrl}
                        onLoad={handleMapLoaded}
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-900 p-5 h-60 flex flex-col items-center justify-center text-center space-y-3">
                      <MapPin
                        className="w-7 h-7 text-[#0F2942] dark:text-sky-400"
                        aria-hidden="true"
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                          {institution.address}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Cargá el mapa interactivo bajo demanda para ahorrar datos móviles.
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          type="button"
                          onClick={handleLoadMap}
                          className="min-h-[40px] px-3.5 py-2 text-xs font-semibold text-white bg-[#0F2942] dark:bg-sky-600 rounded-lg hover:bg-[#193C5E] dark:hover:bg-sky-500 transition-colors cursor-pointer"
                        >
                          Cargar mapa embebido
                        </button>
                        <a
                          href={institution.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                          <span>Ir a Google Maps</span>
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PESTAÑA 2: PLANES DE ESTUDIO */}
          {activeTab === 'planes' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2942] dark:text-slate-100">
                    Carreras y estructura curricular (muestra orientativa)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Seleccioná una carrera para consultar duración, modalidad y
                    materias por período.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {institution.careers.map((career) => {
                    const isSelected = selectedCareer?.id === career.id;
                    return (
                      <button
                        key={career.id}
                        type="button"
                        onClick={() => setSelectedCareerId(career.id)}
                        className={`min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#0F2942] dark:bg-sky-600 text-white border-[#0F2942] dark:border-sky-600'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {career.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedCareer && (
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-[#F8FAFC] dark:bg-slate-900 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <BookOpen
                          className="w-4 h-4 text-[#0369A1] dark:text-sky-400"
                          aria-hidden="true"
                        />
                        <span>{selectedCareer.facultyOrDepartment}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-semibold text-[#0F2942] dark:text-slate-100">
                        {selectedCareer.name}
                      </h4>
                    </div>
                  </div>

                  <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                      <dt className="text-slate-500 dark:text-slate-400">
                        Duración estimada
                      </dt>
                      <dd className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                        {selectedCareer.duration}
                      </dd>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                      <dt className="text-slate-500 dark:text-slate-400">Modalidad</dt>
                      <dd className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                        {selectedCareer.modality}
                      </dd>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                      <dt className="text-slate-500 dark:text-slate-400">Plan vigente</dt>
                      <dd className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                        {selectedCareer.planYear}
                      </dd>
                    </div>
                  </dl>

                  <div className="space-y-3">
                    <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Despliegue de materias por año / cuatrimestre
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCareer.curriculumByPeriod.map((period) => (
                        <div
                          key={period.periodLabel}
                          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-2"
                        >
                          <p className="text-xs font-semibold text-[#0F2942] dark:text-sky-300 pb-2 border-b border-slate-100 dark:border-slate-700">
                            {period.periodLabel}
                          </p>
                          <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-200">
                            {period.subjects.map((subject) => (
                              <li key={subject} className="leading-snug">
                                • {subject}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PESTAÑA 3: ESTADO EDILICIO ACTUAL */}
          {activeTab === 'edilicio' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border rounded-lg ${conditionDisplay.classes}`}
                  >
                    <ConditionIcon className="w-4 h-4" aria-hidden="true" />
                    <span>Estado: {conditionDisplay.label}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono tabular-nums">
                  Fecha de relevamiento: {institution.buildingInspection.surveyDate}
                </p>
              </div>

              {/* Advertencia explícita sobre datos de ejemplo */}
              <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-950 dark:text-amber-200">
                <Building2
                  className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="leading-relaxed">
                  {institution.buildingInspection.exampleNotice}
                </p>
              </div>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-white dark:bg-slate-900">
                  <dt className="text-xs font-semibold text-[#0F2942] dark:text-slate-100 mb-1">
                    Aulas y mobiliario
                  </dt>
                  <dd className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {institution.buildingInspection.classrooms}
                  </dd>
                </div>
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-white dark:bg-slate-900">
                  <dt className="text-xs font-semibold text-[#0F2942] dark:text-slate-100 mb-1">
                    Climatización y ventilación
                  </dt>
                  <dd className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {institution.buildingInspection.climateVentilation}
                  </dd>
                </div>
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-white dark:bg-slate-900">
                  <dt className="text-xs font-semibold text-[#0F2942] dark:text-slate-100 mb-1">
                    Sanitarios
                  </dt>
                  <dd className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {institution.buildingInspection.restrooms}
                  </dd>
                </div>
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-white dark:bg-slate-900">
                  <dt className="text-xs font-semibold text-[#0F2942] dark:text-slate-100 mb-1">
                    Accesibilidad
                  </dt>
                  <dd className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {institution.buildingInspection.accessibility}
                  </dd>
                </div>
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-white dark:bg-slate-900 md:col-span-2">
                  <dt className="text-xs font-semibold text-[#0F2942] dark:text-slate-100 mb-1">
                    Conectividad y Wi-Fi
                  </dt>
                  <dd className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {institution.buildingInspection.connectivityWifi}
                  </dd>
                </div>
              </dl>

              {/* Galería de fotos reales sin retoques */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-sm font-semibold text-[#0F2942] dark:text-slate-100">
                    Galería de registro fotográfico sin retoques
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Formato requerido: fotografía original con fecha AAAA-MM-DD
                  </span>
                </div>
                <div
                  className={`grid grid-cols-1 gap-4 ${
                    institution.buildingInspection.photoGallerySlots.length === 2
                      ? 'sm:grid-cols-2'
                      : 'sm:grid-cols-3'
                  }`}
                >
                  {institution.buildingInspection.photoGallerySlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="border border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-4 bg-[#F8FAFC] dark:bg-slate-900 flex flex-col justify-between min-h-[130px]"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                        <Camera
                          className="w-4 h-4 text-slate-400 dark:text-slate-500"
                          aria-hidden="true"
                        />
                        <span>{slot.label}</span>
                      </div>
                      <div className="mt-3 space-y-1">
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {slot.captureDate}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                          {slot.statusNote}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PESTAÑA 4: TRAZABILIDAD, TRANSPARENCIA Y COSTOS */}
          {activeTab === 'trazabilidad' && (
            <div className="space-y-5">
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-[#F8FAFC] dark:bg-slate-900 space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    className="w-5 h-5 text-[#047857] dark:text-emerald-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-[#0F2942] dark:text-slate-100">
                      Trazabilidad y origen de la información
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Fuente de validación declarada:{' '}
                      <strong className="font-semibold text-slate-900 dark:text-white">
                        {institution.validationSource}
                      </strong>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                      Última actualización de ficha: {institution.lastUpdated} ·
                      Estado del registro: Datos de estructura de ejemplo para
                      completar con relevamiento fechado.
                    </p>
                  </div>
                </div>
              </div>

              {/* Apartado obligatorio de Costos / Aranceles */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-white dark:bg-slate-900 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0F2942] dark:text-slate-100">
                  <Info
                    className="w-4 h-4 text-[#0369A1] dark:text-sky-400"
                    aria-hidden="true"
                  />
                  <h3>Apartado de costos y aranceles</h3>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {ROA_SITE_META.feesModuleNotice}
                </p>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[#0F2942] dark:text-slate-100">
                    ¿Encontraste un dato desactualizado o querés ejercer derecho a
                    réplica?
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Las instituciones y estudiantes pueden enviar correcciones o
                    respaldos documentales para actualizar esta ficha.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRequestCorrection(institution)}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0F2942] dark:bg-sky-600 rounded-lg hover:bg-[#193C5E] dark:hover:bg-sky-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Flag className="w-4 h-4" aria-hidden="true" />
                  <span>Reportar error / Derecho a réplica</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
