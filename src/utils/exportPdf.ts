import { jsPDF } from 'jspdf';
import { ROA_SITE_META } from '../data/roaData';
import type { EducationLevel, Institution, ManagementType } from '../types/roa';

export interface PdfInstitutionRow {
  acronym: string;
  officialName: string;
  metaLine: string;
  address: string;
  contactLine: string;
  traceabilityLine: string;
  buildingLine: string;
  careersLine: string;
}

export interface InstitutionsPdfSpec {
  title: string;
  subtitle: string;
  generatedDate: string;
  filtersSummary: string;
  totalCount: number;
  feesNotice: string;
  neutralityNotice: string;
  rows: PdfInstitutionRow[];
}

/**
 * Construye una descripción legible de los filtros aplicados al directorio.
 */
export function formatFiltersSummary(params: {
  searchQuery: string;
  management: 'Todas' | ManagementType;
  level: 'Todos' | EducationLevel;
}): string {
  const parts: string[] = [];
  parts.push(`Gestión: ${params.management}`);
  parts.push(`Nivel: ${params.level}`);
  if (params.searchQuery.trim()) {
    parts.push(`Búsqueda: "${params.searchQuery.trim()}"`);
  }
  return parts.join(' | ');
}

/**
 * Construye la especificación estructurada del PDF respetando trazabilidad,
 * neutralidad editorial y prohibición de precios/aranceles.
 */
export function buildInstitutionsPdfSpec(
  institutions: Institution[],
  filtersSummary: string,
  generatedDate: string = new Date().toISOString().slice(0, 10)
): InstitutionsPdfSpec {
  const rows: PdfInstitutionRow[] = institutions.map((inst) => ({
    acronym: inst.acronym,
    officialName: inst.officialName,
    metaLine: `Gestión ${inst.management} · Nivel ${inst.level}`,
    address: `${inst.address} (${inst.neighborhood})`,
    contactLine: `Web: ${inst.website} · Correo: ${inst.email}`,
    traceabilityLine: `Validación: ${inst.validationSource} · Actualizado: ${inst.lastUpdated}`,
    buildingLine: `Edilicio [Ejemplo de estructura]: ${inst.buildingInspection.status} (Relevamiento: ${inst.buildingInspection.surveyDate})`,
    careersLine: `Carreras de muestra (${inst.careers.length}): ${inst.careers
      .map((c) => `${c.name} [${c.modality}]`)
      .join('; ')}`,
  }));

  return {
    title: ROA_SITE_META.brandFullName,
    subtitle: `Listado de Instituciones Educativas — ${ROA_SITE_META.city}`,
    generatedDate,
    filtersSummary,
    totalCount: institutions.length,
    feesNotice: ROA_SITE_META.feesModuleNotice,
    neutralityNotice: ROA_SITE_META.neutralityPolicy,
    rows,
  };
}

/**
 * Genera y descarga un archivo PDF A4 con el listado filtrado de instituciones.
 */
export function exportInstitutionsToPdf(
  institutions: Institution[],
  filtersSummary: string
): string {
  const spec = buildInstitutionsPdfSpec(institutions, filtersSummary);
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const maxWidth = pageWidth - margin * 2;
  let y = 18;

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > 276) {
      doc.addPage();
      y = 18;
    }
  };

  // Encabezado institucional sobrio
  doc.setFillColor(15, 41, 66);
  doc.rect(0, 0, pageWidth, 26, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(spec.title, margin, 11);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(spec.subtitle, margin, 18);

  y = 34;
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(9);
  doc.text(
    `Fecha de exportación: ${spec.generatedDate}   |   Total en listado: ${spec.totalCount}`,
    margin,
    y
  );
  y += 5;
  doc.text(`Filtros aplicados: ${spec.filtersSummary}`, margin, y);
  y += 6;

  // Aviso obligatorio de aranceles
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  const feesLines = doc.splitTextToSize(
    `Política de aranceles: ${spec.feesNotice}`,
    maxWidth - 6
  );
  const feesBoxHeight = feesLines.length * 4.5 + 5;
  doc.rect(margin, y, maxWidth, feesBoxHeight, 'FD');
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(8.5);
  doc.text(feesLines, margin + 3, y + 5.5);
  y += feesBoxHeight + 7;

  // Filas de instituciones
  spec.rows.forEach((row, index) => {
    ensureSpace(44);

    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    doc.setTextColor(3, 105, 161);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(`${index + 1}. ${row.acronym} — ${row.metaLine}`, margin, y);
    y += 5;

    doc.setTextColor(15, 41, 66);
    doc.setFontSize(11);
    const titleLines = doc.splitTextToSize(row.officialName, maxWidth);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    doc.setTextColor(51, 65, 85);

    const detailLines = [
      `Dirección: ${row.address}`,
      row.contactLine,
      row.traceabilityLine,
      row.buildingLine,
      row.careersLine,
    ];

    detailLines.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, maxWidth);
      ensureSpace(wrapped.length * 4.3 + 2);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 4.3;
    });

    y += 4;
  });

  // Pie de neutralidad editorial
  ensureSpace(20);
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  const neutralityLines = doc.splitTextToSize(spec.neutralityNotice, maxWidth);
  doc.text(neutralityLines, margin, y);

  const filename = 'roa-directorio-instituciones.pdf';
  doc.save(filename);
  return filename;
}
