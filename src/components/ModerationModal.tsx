import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, ShieldCheck, X } from 'lucide-react';
import type {
  CorrectionReport,
  CorrectionRequestType,
  Institution,
} from '../types/roa';
import { validateCorrectionForm } from '../utils/filters';

interface ModerationModalProps {
  isOpen: boolean;
  initialInstitution: Institution | null;
  submittedReports: CorrectionReport[];
  onClose: () => void;
  onSubmitReport: (report: CorrectionReport) => void;
  onSubmittingChange?: (isSubmitting: boolean) => void;
}

const REQUEST_TYPES: CorrectionRequestType[] = [
  'Reportar error en datos',
  'Solicitar derecho a réplica institucional',
  'Enviar evidencia de relevamiento',
  'Sugerir institución, emprendimiento o recurso',
];

export function ModerationModal({
  isOpen,
  initialInstitution,
  submittedReports,
  onClose,
  onSubmitReport,
  onSubmittingChange,
}: ModerationModalProps) {
  const [requestType, setRequestType] = useState<CorrectionRequestType>(
    'Reportar error en datos'
  );
  const [targetSection, setTargetSection] = useState<
    'Instituciones' | 'Emprendimientos' | 'Ayudas de Estudio' | 'Noticias' | 'General'
  >('Instituciones');
  const [institutionName, setInstitutionName] = useState('');
  const [details, setDetails] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [errors, setErrors] = useState<
    Partial<Record<'details' | 'evidenceUrl' | 'contactEmail', string>>
  >({});
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setErrors({});
    setLastCreatedId(null);
    setIsSubmitting(false);
    onSubmittingChange?.(false);
    if (initialInstitution) {
      setTargetSection('Instituciones');
      setInstitutionName(
        `${initialInstitution.acronym} — ${initialInstitution.officialName}`
      );
    } else {
      setInstitutionName('');
    }
  }, [isOpen, initialInstitution, onSubmittingChange]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validation = validateCorrectionForm({
      requestType,
      targetSection,
      institutionName,
      details,
      evidenceUrl,
      contactEmail,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    onSubmittingChange?.(true);

    // Breve indicador visual inmediato de envío antes de confirmar localmente
    window.setTimeout(() => {
      const reportId = `ROA-${new Date().getFullYear()}-${String(
        submittedReports.length + 1
      ).padStart(3, '0')}`;

      const newReport: CorrectionReport = {
        id: reportId,
        createdAt: new Date().toISOString().slice(0, 10),
        requestType,
        targetSection,
        institutionName: institutionName.trim() || undefined,
        details: details.trim(),
        evidenceUrl: evidenceUrl.trim() || undefined,
        contactEmail: contactEmail.trim() || undefined,
        status: 'Registrado en sesión local (pendiente de moderación)',
      };

      onSubmitReport(newReport);
      setLastCreatedId(reportId);
      setDetails('');
      setEvidenceUrl('');
      setContactEmail('');
      setErrors({});
      setIsSubmitting(false);
      onSubmittingChange?.(false);
    }, 220);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="moderation-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-xl overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Moderación y Transparencia · Santa Fe Capital
            </p>
            <h2
              id="moderation-modal-title"
              className="font-display text-xl sm:text-2xl font-semibold text-[#0F2942] dark:text-slate-100"
            >
              Canal de corrección y derecho a réplica
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar canal de corrección"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          <div className="bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
            <ShieldCheck
              className="w-4 h-4 text-[#047857] dark:text-emerald-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="leading-relaxed">
              En este MVP sin backend pago ($0), el formulario valida tu reporte y
              genera un comprobante local de sesión. Las correcciones oficiales se
              incorporan directamente al archivo de datos tras verificar la fuente.
            </p>
          </div>

          {lastCreatedId && (
            <div
              role="status"
              className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 flex items-start gap-3 text-sm text-emerald-950 dark:text-emerald-200"
            >
              <CheckCircle2
                className="w-5 h-5 text-[#047857] dark:text-emerald-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold">
                  Solicitud registrada correctamente (Referencia{' '}
                  <span className="font-mono">{lastCreatedId}</span>)
                </p>
                <p className="text-xs text-emerald-900 dark:text-emerald-300 mt-1">
                  Podés revisar el registro debajo o enviar una nueva observación.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="mod-request-type"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
                >
                  Tipo de solicitud
                </label>
                <select
                  id="mod-request-type"
                  value={requestType}
                  onChange={(e) =>
                    setRequestType(e.target.value as CorrectionRequestType)
                  }
                  className="w-full min-h-[44px] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-[#0F2942] dark:focus:border-sky-400"
                >
                  {REQUEST_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="mod-target-section"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
                >
                  Módulo involucrado
                </label>
                <select
                  id="mod-target-section"
                  value={targetSection}
                  onChange={(e) =>
                    setTargetSection(
                      e.target.value as
                        | 'Instituciones'
                        | 'Emprendimientos'
                        | 'Ayudas de Estudio'
                        | 'Noticias'
                        | 'General'
                    )
                  }
                  className="w-full min-h-[44px] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-[#0F2942] dark:focus:border-sky-400"
                >
                  <option value="Instituciones">Instituciones</option>
                  <option value="Emprendimientos">Emprendimientos</option>
                  <option value="Ayudas de Estudio">Ayudas de Estudio</option>
                  <option value="Noticias">Noticias</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="mod-institution-name"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
              >
                Institución o elemento referenciado (opcional)
              </label>
              <input
                id="mod-institution-name"
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="Ej: UTN Santa Fe, Instituto ADE, UNL..."
                className="w-full min-h-[44px] px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-[#0F2942] dark:focus:border-sky-400"
              />
            </div>

            <div>
              <label
                htmlFor="mod-details"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
              >
                Detalle de la corrección, evidencia o descargo institucional *
              </label>
              <textarea
                id="mod-details"
                rows={4}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Indicá qué dato debe actualizarse, la fecha de constatación y el respaldo documental."
                className={`w-full px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border rounded-lg focus:outline-none ${
                  errors.details
                    ? 'border-rose-500 focus:border-rose-600'
                    : 'border-slate-300 dark:border-slate-600 focus:border-[#0F2942] dark:focus:border-sky-400'
                }`}
              />
              {errors.details && (
                <p className="mt-1 text-xs text-rose-700 dark:text-rose-400">
                  {errors.details}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="mod-evidence-url"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
                >
                  Enlace de respaldo / resolución (opcional)
                </label>
                <input
                  id="mod-evidence-url"
                  type="url"
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                  placeholder="https://..."
                  className={`w-full min-h-[44px] px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border rounded-lg focus:outline-none ${
                    errors.evidenceUrl
                      ? 'border-rose-500 focus:border-rose-600'
                      : 'border-slate-300 dark:border-slate-600 focus:border-[#0F2942] dark:focus:border-sky-400'
                  }`}
                />
                {errors.evidenceUrl && (
                  <p className="mt-1 text-xs text-rose-700 dark:text-rose-400">
                    {errors.evidenceUrl}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="mod-contact-email"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
                >
                  Correo de contacto para devolución (opcional)
                </label>
                <input
                  id="mod-contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="contacto@ejemplo.edu.ar"
                  className={`w-full min-h-[44px] px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border rounded-lg focus:outline-none ${
                    errors.contactEmail
                      ? 'border-rose-500 focus:border-rose-600'
                      : 'border-slate-300 dark:border-slate-600 focus:border-[#0F2942] dark:focus:border-sky-400'
                  }`}
                />
                {errors.contactEmail && (
                  <p className="mt-1 text-xs text-rose-700 dark:text-rose-400">
                    {errors.contactEmail}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-[#0F2942] dark:bg-sky-600 rounded-lg hover:bg-[#193C5E] dark:hover:bg-sky-500 disabled:opacity-70 transition-colors cursor-pointer"
              >
                {isSubmitting && (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                )}
                <span>
                  {isSubmitting ? 'Registrando...' : 'Enviar reporte / réplica'}
                </span>
              </button>
            </div>
          </form>

          {/* Registro de envíos en la sesión actual */}
          {submittedReports.length > 0 && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Solicitudes registradas en esta sesión ({submittedReports.length})
              </h3>
              <ul className="space-y-2">
                {submittedReports.map((report) => (
                  <li
                    key={report.id}
                    className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-[#F8FAFC] dark:bg-slate-900 text-xs space-y-1"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono font-semibold text-[#0F2942] dark:text-slate-100">
                        {report.id} · {report.requestType}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 tabular-nums">
                        {report.createdAt}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">
                      {report.details}
                    </p>
                    <p className="text-[#047857] dark:text-emerald-400 font-medium">
                      {report.status}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
