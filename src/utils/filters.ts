import type {
  CorrectionRequestType,
  EducationLevel,
  Institution,
  ManagementType,
  NewsItem,
  NewsScope,
  StudentVenture,
  StudyAid,
  StudyAidType,
  VentureCategory,
} from '../types/roa';

/**
 * Normaliza cadenas de texto removiendo tildes/diacríticos y pasando a minúsculas
 * para búsquedas precisas en español (ej. "administracion" coincide con "Administración").
 */
export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export interface InstitutionFilterParams {
  searchQuery: string;
  management: 'Todas' | ManagementType;
  level: 'Todos' | EducationLevel;
}

/**
 * Filtra instituciones educativas por tipo de gestión, nivel y texto libre
 * (coincide con nombre oficial, sigla, barrio o nombre de cualquiera de sus carreras).
 */
export function filterInstitutions(
  institutions: Institution[],
  params: InstitutionFilterParams
): Institution[] {
  const normalizedQuery = normalizeText(params.searchQuery);

  return institutions.filter((inst) => {
    if (params.management !== 'Todas' && inst.management !== params.management) {
      return false;
    }
    if (params.level !== 'Todos' && inst.level !== params.level) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }

    const haystackParts = [
      inst.officialName,
      inst.acronym,
      inst.neighborhood,
      inst.address,
      ...inst.careers.map((c) => `${c.name} ${c.facultyOrDepartment}`),
    ];

    return haystackParts.some((part) =>
      normalizeText(part).includes(normalizedQuery)
    );
  });
}

/**
 * Filtra emprendimientos estudiantiles y locales por rubro.
 */
export function filterVentures(
  ventures: StudentVenture[],
  category: 'Todos' | VentureCategory
): StudentVenture[] {
  if (category === 'Todos') {
    return ventures;
  }
  return ventures.filter((venture) => venture.category === category);
}

export interface StudyAidFilterParams {
  type: 'Todos' | StudyAidType;
  careerOrSubject: string;
}

/**
 * Obtiene la lista ordenada y sin duplicados de carreras/materias disponibles en Ayudas de Estudio.
 */
export function extractUniqueStudyContexts(aids: StudyAid[]): string[] {
  const set = new Set<string>();
  for (const aid of aids) {
    set.add(aid.career);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'es'));
}

/**
 * Filtra ayudas de estudio por tipo de recurso y carrera/materia.
 */
export function filterStudyAids(
  aids: StudyAid[],
  params: StudyAidFilterParams
): StudyAid[] {
  const normalizedContext = normalizeText(params.careerOrSubject);

  return aids.filter((aid) => {
    if (params.type !== 'Todos' && aid.type !== params.type) {
      return false;
    }
    if (!normalizedContext || normalizedContext === 'todas') {
      return true;
    }
    return (
      normalizeText(aid.career).includes(normalizedContext) ||
      normalizeText(aid.subject).includes(normalizedContext)
    );
  });
}

/**
 * Filtra noticias educativas por alcance geográfico/académico.
 */
export function filterNews(
  news: NewsItem[],
  scope: 'Todas' | NewsScope
): NewsItem[] {
  if (scope === 'Todas') {
    return news;
  }
  return news.filter((item) => item.scope === scope);
}

export interface CorrectionFormInput {
  requestType: CorrectionRequestType;
  targetSection:
    | 'Instituciones'
    | 'Emprendimientos'
    | 'Ayudas de Estudio'
    | 'Noticias'
    | 'General';
  institutionName?: string;
  details: string;
  evidenceUrl?: string;
  contactEmail?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<'details' | 'evidenceUrl' | 'contactEmail', string>>;
}

/**
 * Valida el formulario del canal de corrección / derecho a réplica.
 */
export function validateCorrectionForm(
  input: CorrectionFormInput
): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (!input.details || input.details.trim().length < 15) {
    errors.details =
      'Describí el error, dato sugerido o descargo con al menos 15 caracteres para poder verificarlo.';
  }

  if (input.evidenceUrl && input.evidenceUrl.trim().length > 0) {
    try {
      const parsed = new URL(input.evidenceUrl.trim());
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        errors.evidenceUrl = 'El enlace debe comenzar con http:// o https://.';
      }
    } catch {
      errors.evidenceUrl =
        'Ingresá una URL válida (por ejemplo: https://www.institucion.edu.ar/resolucion).';
    }
  }

  if (input.contactEmail && input.contactEmail.trim().length > 0) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.contactEmail.trim())) {
      errors.contactEmail = 'Ingresá un correo electrónico válido.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
