/**
 * Definiciones de tipos para el proyecto ROA (Red de Orientación Administrativa).
 * Separa estrictamente la estructura de datos de los componentes de interfaz.
 */

export type ManagementType = 'Pública' | 'Privada';
export type EducationLevel = 'Universitario' | 'Terciario';
export type ModalityType = 'Presencial' | 'Semipresencial' | 'A distancia';
export type BuildingCondition = 'Bueno' | 'Regular' | 'Deficiente';
export type ValidationSource =
  | 'Oficial'
  | 'Relevamiento propio'
  | 'Estudiante avanzado >=60%';

export interface CurriculumPeriod {
  periodLabel: string;
  subjects: string[];
}

export interface CareerPlan {
  id: string;
  name: string;
  facultyOrDepartment: string;
  duration: string;
  modality: ModalityType;
  planYear: string;
  curriculumByPeriod: CurriculumPeriod[];
}

export interface PhotoGallerySlot {
  id: string;
  label: string;
  captureDate: string;
  statusNote: string;
}

export interface BuildingInspection {
  status: BuildingCondition;
  isExampleStructure: boolean;
  exampleNotice: string;
  surveyDate: string; // Formato obligatorio AAAA-MM-DD
  classrooms: string;
  climateVentilation: string;
  restrooms: string;
  accessibility: string;
  connectivityWifi: string;
  photoGallerySlots: PhotoGallerySlot[];
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface Institution {
  id: string;
  officialName: string;
  acronym: string;
  management: ManagementType;
  level: EducationLevel;
  summary: string;
  address: string;
  neighborhood: string;
  phones: string[];
  email: string;
  website: string;
  socialLinks: SocialLink[];
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  validationSource: ValidationSource;
  lastUpdated: string; // Formato AAAA-MM-DD
  isExampleData: boolean;
  /** Coordenadas de referencia para el mapa de instituciones en Santa Fe Capital */
  coordinates: {
    lat: number;
    lng: number;
    precisionNote: string;
  };
  careers: CareerPlan[];
  buildingInspection: BuildingInspection;
}

export type VentureCategory =
  | 'Servicios'
  | 'Educación/Apuntes'
  | 'Tecnología'
  | 'Gastronomía'
  | 'Diseño/Comunicación'
  | 'Otros';

export interface StudentVenture {
  id: string;
  name: string;
  category: VentureCategory;
  academicLink: string;
  description: string;
  coverageZone: string;
  contactChannel: 'WhatsApp' | 'Instagram' | 'Web';
  contactLabel: string;
  contactUrl: string;
  isExampleData: boolean;
  lastUpdated: string;
}

export type StudyAidType = 'Prompt IA' | 'Video educativo' | 'Guía de estudio';

export interface StudyAid {
  id: string;
  title: string;
  type: StudyAidType;
  career: string;
  subject: string;
  purpose: string;
  promptText?: string;
  externalUrl?: string;
  sourceName?: string;
  durationLabel?: string;
  isExampleData: boolean;
  lastUpdated: string;
}

export type NewsScope =
  | 'Santa Fe Capital'
  | 'Provincia de Santa Fe'
  | 'Educación Superior';

export type NewsOriginTag =
  | 'Fuente oficial curada'
  | 'Redacción propia'
  | 'Colaborador asignado';

export interface NewsItem {
  id: string;
  headline: string;
  publishedDate: string; // AAAA-MM-DD
  scope: NewsScope;
  originTag: NewsOriginTag;
  summary: string;
  fullBody: string[];
  officialSourceName: string;
  officialSourceUrl: string;
  editorialNeutralityNote: string;
  isExampleData: boolean;
}

export type CorrectionRequestType =
  | 'Reportar error en datos'
  | 'Solicitar derecho a réplica institucional'
  | 'Enviar evidencia de relevamiento'
  | 'Sugerir institución, emprendimiento o recurso';

export interface CorrectionReport {
  id: string;
  createdAt: string;
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
  status: 'Registrado en sesión local (pendiente de moderación)';
}
