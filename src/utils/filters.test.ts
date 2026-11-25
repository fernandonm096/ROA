import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INSTITUTIONS_DATA,
  NEWS_DATA,
  STUDY_AIDS_DATA,
  VENTURES_DATA,
} from '../data/roaData';
import {
  extractUniqueStudyContexts,
  filterInstitutions,
  filterNews,
  filterStudyAids,
  filterVentures,
  normalizeText,
  validateCorrectionForm,
} from './filters';
import { resolveInitialTheme } from './theme';
import { buildInstitutionsPdfSpec, formatFiltersSummary } from './exportPdf';

test('normalizeText removes Spanish diacritics and trims whitespace', () => {
  assert.equal(normalizeText('  Administración Pública  '), 'administracion publica');
  assert.equal(normalizeText('Ingeniería en Informática'), 'ingenieria en informatica');
});

test('filterInstitutions filters by management, level, and career/acronym search', () => {
  const all = filterInstitutions(INSTITUTIONS_DATA, {
    searchQuery: '',
    management: 'Todas',
    level: 'Todos',
  });
  assert.equal(all.length, 3);

  const privateTertiary = filterInstitutions(INSTITUTIONS_DATA, {
    searchQuery: '',
    management: 'Privada',
    level: 'Terciario',
  });
  assert.equal(privateTertiary.length, 1);
  assert.equal(privateTertiary[0].acronym, 'Instituto ADE');

  const byCareerWithoutAccents = filterInstitutions(INSTITUTIONS_DATA, {
    searchQuery: 'administracion',
    management: 'Todas',
    level: 'Todos',
  });
  assert.equal(byCareerWithoutAccents.length, 2); // UNL y ADE tienen carreras de Administración

  const byAcronym = filterInstitutions(INSTITUTIONS_DATA, {
    searchQuery: 'UTN',
    management: 'Pública',
    level: 'Universitario',
  });
  assert.equal(byAcronym.length, 1);
  assert.equal(byAcronym[0].id, 'utn-frsf');
});

test('no institution dataset includes tuition or fee amounts', () => {
  for (const inst of INSTITUTIONS_DATA) {
    const serialized = JSON.stringify(inst).toLowerCase();
    assert.equal(serialized.includes('cuota mensual'), false);
    assert.equal(serialized.includes('$'), false);
  }
});

test('filterVentures filters accurately by category', () => {
  const all = filterVentures(VENTURES_DATA, 'Todos');
  assert.equal(all.length, VENTURES_DATA.length);

  const tech = filterVentures(VENTURES_DATA, 'Tecnología');
  assert.equal(tech.length, 1);
  assert.equal(tech[0].category, 'Tecnología');
});

test('filterStudyAids filters by type and career context', () => {
  const prompts = filterStudyAids(STUDY_AIDS_DATA, {
    type: 'Prompt IA',
    careerOrSubject: 'Todas',
  });
  assert.equal(prompts.length, 3);
  assert.ok(prompts.every((item) => Boolean(item.promptText)));

  const uniqueContexts = extractUniqueStudyContexts(STUDY_AIDS_DATA);
  assert.ok(uniqueContexts.length >= 2);
});

test('filterNews filters by scope cleanly', () => {
  const capitalNews = filterNews(NEWS_DATA, 'Santa Fe Capital');
  assert.equal(capitalNews.length, 2);
  assert.ok(capitalNews.every((n) => n.scope === 'Santa Fe Capital'));
});

test('validateCorrectionForm enforces detail length and optional URL/email syntax', () => {
  const invalidEmpty = validateCorrectionForm({
    requestType: 'Reportar error en datos',
    targetSection: 'Instituciones',
    details: 'corto',
  });
  assert.equal(invalidEmpty.isValid, false);
  assert.ok(invalidEmpty.errors.details);

  const invalidUrl = validateCorrectionForm({
    requestType: 'Enviar evidencia de relevamiento',
    targetSection: 'Instituciones',
    details: 'Actualización de horarios de biblioteca en sede central.',
    evidenceUrl: 'no-es-una-url',
    contactEmail: 'correo-invalido',
  });
  assert.equal(invalidUrl.isValid, false);
  assert.ok(invalidUrl.errors.evidenceUrl);
  assert.ok(invalidUrl.errors.contactEmail);

  const valid = validateCorrectionForm({
    requestType: 'Solicitar derecho a réplica institucional',
    targetSection: 'Instituciones',
    institutionName: 'Instituto ADE',
    details: 'Informamos que se completó la instalación de climatización en aulas de planta alta.',
    evidenceUrl: 'https://www.ade.org.ar/novedades',
    contactEmail: 'academica@ade.org.ar',
  });
  assert.equal(valid.isValid, true);
});

test('resolveInitialTheme respects localStorage first and system preference as fallback', () => {
  assert.equal(resolveInitialTheme('dark', false), 'dark');
  assert.equal(resolveInitialTheme('light', true), 'light');
  assert.equal(resolveInitialTheme(null, true), 'dark');
  assert.equal(resolveInitialTheme(null, false), 'light');
  assert.equal(resolveInitialTheme('invalid', true), 'dark');
});

test('all institutions define valid Santa Fe Capital coordinates for the map', () => {
  for (const inst of INSTITUTIONS_DATA) {
    assert.ok(inst.coordinates.lat < -30 && inst.coordinates.lat > -33);
    assert.ok(inst.coordinates.lng < -59 && inst.coordinates.lng > -62);
    assert.ok(inst.coordinates.precisionNote.length > 5);
  }
});

test('buildInstitutionsPdfSpec formats traceability and excludes tuition fees', () => {
  const summary = formatFiltersSummary({
    searchQuery: 'UTN',
    management: 'Pública',
    level: 'Universitario',
  });
  assert.equal(
    summary,
    'Gestión: Pública | Nivel: Universitario | Búsqueda: "UTN"'
  );

  const spec = buildInstitutionsPdfSpec(
    [INSTITUTIONS_DATA[1]],
    summary,
    '2026-11-25'
  );
  assert.equal(spec.totalCount, 1);
  assert.equal(spec.generatedDate, '2026-11-25');
  assert.match(spec.feesNotice, /Módulo de aranceles y costos en desarrollo/i);
  assert.equal(spec.rows[0].acronym, 'UTN Santa Fe');
  assert.equal(JSON.stringify(spec).includes('$'), false);
});
