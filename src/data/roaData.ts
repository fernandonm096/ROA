import type {
  Institution,
  NewsItem,
  StudentVenture,
  StudyAid,
} from '../types/roa';

/**
 * ============================================================================
 * ARCHIVO CENTRAL DE DATOS DE ROA (Red de Orientación Administrativa)
 * ============================================================================
 * Guía para edición y mantenimiento (presupuesto $0):
 * - Para agregar una nueva institución, emprendimiento, ayuda de estudio o
 *   noticia, simplemente añada un nuevo objeto al arreglo correspondiente.
 * - Mantenga siempre el formato de fecha AAAA-MM-DD para garantizar trazabilidad.
 * - PROHIBIDO agregar precios, cuotas o aranceles estimados.
 * - Todo dato de ejemplo o estructura pendiente de visita presencial debe
 *   permanecer claramente marcado con `isExampleData: true`.
 * ============================================================================
 */

export const ROA_SITE_META = {
  brandAcronym: 'ROA',
  brandFullName: 'ROA — Red de Orientación Administrativa',
  city: 'Santa Fe Capital, Provincia de Santa Fe, Argentina',
  lastDatasetReview: '2026-10-25',
  feesModuleNotice:
    'Módulo de aranceles y costos en desarrollo — No se publican valores estimados ni de memoria para garantizar datos actualizados.',
  neutralityPolicy:
    'ROA mantiene neutralidad editorial estricta: no recibe pauta partidaria ni emite juicios de valor no verificables. Cada ficha exhibe su fuente de validación, fecha de relevamiento y canal abierto de corrección o derecho a réplica.',
};

/**
 * MÓDULO 1: INSTITUCIONES EDUCATIVAS DE SANTA FE CAPITAL
 * Incluye 3 ejemplos representativos (UNL, UTN Santa Fe, Instituto ADE).
 */
export const INSTITUTIONS_DATA: Institution[] = [
  {
    id: 'unl-santa-fe',
    officialName: 'Universidad Nacional del Litoral',
    acronym: 'UNL',
    management: 'Pública',
    level: 'Universitario',
    summary:
      'Universidad pública nacional con sede central en Santa Fe Capital y facultades distribuidas entre Bv. Pellegrini y Ciudad Universitaria (El Pozo).',
    address: 'Bv. Pellegrini 2750, S3000 Santa Fe Capital',
    neighborhood: 'Centro / Ciudad Universitaria (El Pozo)',
    phones: ['+54 342 457-1110 (Rectorado - verificar interno)'],
    email: 'informes@unl.edu.ar',
    website: 'https://www.unl.edu.ar',
    socialLinks: [
      { label: 'Portal Ingresantes UNL', url: 'https://www.unl.edu.ar/ingresantes/' },
      { label: 'Instagram Oficial', url: 'https://www.instagram.com/unlitoral/' },
    ],
    googleMapsUrl:
      'https://maps.google.com/?q=Universidad+Nacional+del+Litoral+Bv+Pellegrini+2750+Santa+Fe',
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=Bv.+Pellegrini+2750,+Santa+Fe,+Argentina&output=embed',
    validationSource: 'Oficial',
    lastUpdated: '2026-10-18',
    isExampleData: true,
    coordinates: {
      lat: -31.6397,
      lng: -60.7089,
      precisionNote: 'Referencia aproximada Bv. Pellegrini 2750, Santa Fe Capital',
    },
    careers: [
      {
        id: 'unl-ing-informatica',
        name: 'Ingeniería en Informática',
        facultyOrDepartment: 'Facultad de Ingeniería y Ciencias Hídricas (FICH)',
        duration: '5 años (estructura de ejemplo)',
        modality: 'Presencial',
        planYear: 'Plan vigente de referencia (verificar resolución en sitio oficial)',
        curriculumByPeriod: [
          {
            periodLabel: '1.º Año — 1.º Cuatrimestre',
            subjects: [
              'Cálculo I',
              'Álgebra Lineal',
              'Fundamentos de Programación',
              'Introducción a la Ingeniería Informática',
            ],
          },
          {
            periodLabel: '1.º Año — 2.º Cuatrimestre',
            subjects: [
              'Cálculo II',
              'Física I',
              'Algoritmos y Estructuras de Datos',
              'Arquitectura de Computadoras',
            ],
          },
          {
            periodLabel: '2.º Año — Tramo Troncal (muestra)',
            subjects: [
              'Programación Orientada a Objetos',
              'Bases de Datos',
              'Sistemas Operativos',
              'Probabilidad y Estadística',
            ],
          },
        ],
      },
      {
        id: 'unl-lic-administracion',
        name: 'Licenciatura en Administración',
        facultyOrDepartment: 'Facultad de Ciencias Económicas (FCE)',
        duration: '5 años (estructura de ejemplo)',
        modality: 'Presencial',
        planYear: 'Plan vigente de referencia (verificar resolución en sitio oficial)',
        curriculumByPeriod: [
          {
            periodLabel: '1.º Año — 1.º Cuatrimestre',
            subjects: [
              'Administración General',
              'Contabilidad Básica',
              'Matemática I',
              'Introducción a la Economía',
            ],
          },
          {
            periodLabel: '1.º Año — 2.º Cuatrimestre',
            subjects: [
              'Derecho Constitucional y Administrativo',
              'Matemática II',
              'Sistemas de Información Contable',
              'Comportamiento Organizacional',
            ],
          },
        ],
      },
    ],
    buildingInspection: {
      status: 'Bueno',
      isExampleStructure: true,
      exampleNotice:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Los campos de estado edilicio muestran el formato estándar de auditoría presencial de ROA; deben completarse tras visita in situ con registro fotográfico sin retoques.',
      surveyDate: '2026-10-18',
      classrooms:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Capacidad nominal por aula, estado de bancos/pizarrones y visibilidad desde últimas filas a relevar por sede (Rectorado vs. Ciudad Universitaria).',
      climateVentilation:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Registrar presencia operativa de equipos frío/calor, ventiladores y ventilación cruzada en verano.',
      restrooms:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Verificar disponibilidad de insumos, estado de grifería y frecuencia de limpieza por turno.',
      accessibility:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Constatar rampas reglamentarias, ascensores operativos y baños adaptados en planta baja y pisos superiores.',
      connectivityWifi:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Medir cobertura efectiva de red estudiantil en aulas y biblioteca en horarios pico.',
      photoGallerySlots: [
        {
          id: 'unl-foto-1',
          label: 'Frente edilicio y acceso principal',
          captureDate: 'Pendiente de relevamiento',
          statusNote: 'Espacio reservado para fotografía sin retoques con fecha AAAA-MM-DD.',
        },
        {
          id: 'unl-foto-2',
          label: 'Aula tipo y equipamiento de cursado',
          captureDate: 'Pendiente de relevamiento',
          statusNote: 'Espacio reservado para fotografía sin retoques con fecha AAAA-MM-DD.',
        },
        {
          id: 'unl-foto-3',
          label: 'Sanitarios y circulación accesible',
          captureDate: 'Pendiente de relevamiento',
          statusNote: 'Espacio reservado para fotografía sin retoques con fecha AAAA-MM-DD.',
        },
      ],
    },
  },
  {
    id: 'utn-frsf',
    officialName: 'Universidad Tecnológica Nacional — Facultad Regional Santa Fe',
    acronym: 'UTN Santa Fe',
    management: 'Pública',
    level: 'Universitario',
    summary:
      'Facultad regional pública orientada a carreras de ingeniería y tecnicaturas tecnológicas en el norte de la ciudad de Santa Fe Capital.',
    address: 'Lavaisse 610, S3004EWB Santa Fe Capital',
    neighborhood: 'Guadalupe Oeste',
    phones: ['+54 342 460-1579 / 460-2390 (verificar internos en sitio oficial)'],
    email: 'ingreso@frsf.utn.edu.ar',
    website: 'https://www.frsf.utn.edu.ar',
    socialLinks: [
      { label: 'Sitio Web FRSF', url: 'https://www.frsf.utn.edu.ar' },
      { label: 'Secretaría Académica', url: 'https://www.frsf.utn.edu.ar/academica' },
    ],
    googleMapsUrl:
      'https://maps.google.com/?q=UTN+Facultad+Regional+Santa+Fe+Lavaisse+610',
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=Lavaisse+610,+Santa+Fe,+Argentina&output=embed',
    validationSource: 'Estudiante avanzado >=60%',
    lastUpdated: '2026-10-20',
    isExampleData: true,
    coordinates: {
      lat: -31.6174,
      lng: -60.6754,
      precisionNote: 'Referencia aproximada Lavaisse 610, Santa Fe Capital',
    },
    careers: [
      {
        id: 'utn-isi',
        name: 'Ingeniería en Sistemas de Información',
        facultyOrDepartment: 'Departamento de Sistemas de Información',
        duration: '5 años (estructura de ejemplo)',
        modality: 'Presencial',
        planYear: 'Diseño Curricular 2023 (verificar ordenanza vigente en FRSF)',
        curriculumByPeriod: [
          {
            periodLabel: '1.º Nivel — Materias Básicas',
            subjects: [
              'Análisis Matemático I',
              'Álgebra y Geometría Analítica',
              'Algoritmos y Estructuras de Datos',
              'Arquitectura de Computadoras',
              'Sistemas y Procesos de Negocio',
            ],
          },
          {
            periodLabel: '2.º Nivel — Muestra de Continuidad',
            subjects: [
              'Análisis Matemático II',
              'Sintaxis y Semántica de los Lenguajes',
              'Paradigmas de Programación',
              'Sistemas Operativos',
            ],
          },
        ],
      },
      {
        id: 'utn-tup',
        name: 'Tecnicatura Universitaria en Programación',
        facultyOrDepartment: 'Área de Tecnicaturas — UTN FRSF',
        duration: '2 años (estructura de ejemplo)',
        modality: 'Presencial',
        planYear: 'Plan vigente de referencia (verificar en Secretaría Académica)',
        curriculumByPeriod: [
          {
            periodLabel: '1.º Cuatrimestre',
            subjects: [
              'Programación I',
              'Arquitectura y Sistemas Operativos',
              'Matemática',
              'Organización Empresarial',
            ],
          },
          {
            periodLabel: '2.º Cuatrimestre',
            subjects: [
              'Programación II',
              'Probabilidad y Estadística',
              'Bases de Datos I',
              'Inglés Técnico',
            ],
          },
        ],
      },
    ],
    buildingInspection: {
      status: 'Regular',
      isExampleStructure: true,
      exampleNotice:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Indicador de muestra para visualizar el estado "Regular". No representa una calificación oficial vigente hasta completar la planilla presencial.',
      surveyDate: '2026-10-20',
      classrooms:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Registrar estado de pupitres, acústica y disponibilidad de tomacorrientes en aulas de cursado masivo.',
      climateVentilation:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Documentar diferencias térmicas entre bloques antiguos y laboratorios nuevos.',
      restrooms:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Consignar cantidad de módulos habilitados por cuerpo edilicio y turno noche.',
      accessibility:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Verificar acceso por rampa en ingreso principal sobre calle Lavaisse y circulación entre pabellones.',
      connectivityWifi:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Comprobar estabilidad de red en laboratorios de sistemas y biblioteca.',
      photoGallerySlots: [
        {
          id: 'utn-foto-1',
          label: 'Ingreso principal sobre calle Lavaisse',
          captureDate: 'Pendiente de relevamiento',
          statusNote: 'Espacio reservado para fotografía sin retoques con fecha AAAA-MM-DD.',
        },
        {
          id: 'utn-foto-2',
          label: 'Laboratorios y aulas de cursado',
          captureDate: 'Pendiente de relevamiento',
          statusNote: 'Espacio reservado para fotografía sin retoques con fecha AAAA-MM-DD.',
        },
      ],
    },
  },
  {
    id: 'instituto-ade',
    officialName: 'Instituto Superior ADE (Asociación Dirigentes de Empresa)',
    acronym: 'Instituto ADE',
    management: 'Privada',
    level: 'Terciario',
    summary:
      'Instituto de nivel superior no universitario de gestión privada en el macrocentro de Santa Fe Capital con tecnicaturas orientadas a administración, tecnología y comunicación.',
    address: 'Urquiza 3150, S3000FFH Santa Fe Capital',
    neighborhood: 'Centro / Macrocentro Norte',
    phones: ['+54 342 455-5182 / +54 342 456-0092 (verificar canales actuales)'],
    email: 'info@ade.org.ar',
    website: 'https://www.ade.org.ar',
    socialLinks: [
      { label: 'Sitio Institucional ADE', url: 'https://www.ade.org.ar' },
    ],
    googleMapsUrl:
      'https://maps.google.com/?q=Instituto+ADE+Urquiza+3150+Santa+Fe+Capital',
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=Urquiza+3150,+Santa+Fe,+Argentina&output=embed',
    validationSource: 'Relevamiento propio',
    lastUpdated: '2026-10-22',
    isExampleData: true,
    coordinates: {
      lat: -31.6383,
      lng: -60.7064,
      precisionNote: 'Referencia aproximada Urquiza 3150, Santa Fe Capital',
    },
    careers: [
      {
        id: 'ade-adm-empresas',
        name: 'Tecnicatura Superior en Administración de Empresas',
        facultyOrDepartment: 'Área de Gestión y Administración',
        duration: '3 años (estructura de ejemplo)',
        modality: 'Presencial',
        planYear: 'Plan jurisdiccional de ejemplo (verificar decreto provincial vigente)',
        curriculumByPeriod: [
          {
            periodLabel: '1.º Año (Muestra)',
            subjects: [
              'Administración de las Organizaciones',
              'Contabilidad I',
              'Economía General',
              'Matemática Financiera',
              'Derecho Comercial',
            ],
          },
          {
            periodLabel: '2.º Año (Muestra)',
            subjects: [
              'Gestión de Recursos Humanos',
              'Costos y Presupuestos',
              'Comercialización',
              'Estadística Aplicada',
            ],
          },
        ],
      },
      {
        id: 'ade-desarrollo-software',
        name: 'Tecnicatura Superior en Desarrollo de Software',
        facultyOrDepartment: 'Área de Tecnología e Informática',
        duration: '3 años (estructura de ejemplo)',
        modality: 'Semipresencial',
        planYear: 'Plan jurisdiccional de ejemplo (verificar resolución ministerial)',
        curriculumByPeriod: [
          {
            periodLabel: '1.º Año (Muestra)',
            subjects: [
              'Lógica y Estructura de Datos',
              'Ingeniería de Software I',
              'Sistemas Operativos',
              'Inglés Técnico I',
            ],
          },
          {
            periodLabel: '2.º Año (Muestra)',
            subjects: [
              'Programación Web',
              'Bases de Datos Relacionales',
              'Práctica Profesionalizante I',
            ],
          },
        ],
      },
    ],
    buildingInspection: {
      status: 'Bueno',
      isExampleStructure: true,
      exampleNotice:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Los campos descriptivos ilustran la estructura del informe edilicio y deben validarse mediante inspección fechada.',
      surveyDate: '2026-10-22',
      classrooms:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Relevamiento pendiente de dimensiones de aulas, proyectores y mobiliario en turno vespertino.',
      climateVentilation:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Verificar funcionamiento de climatización en aulas internas sin ventanas al exterior.',
      restrooms:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Consignar cantidad de sanitarios por piso y estado de mantenimiento.',
      accessibility:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Confirmar presencia de ascensor o rampa para acceso a plantas superiores.',
      connectivityWifi:
        '[Ejemplo de estructura - Completar con relevamiento fechado] Registrar velocidad de subida/bajada en aulas de informática.',
      photoGallerySlots: [
        {
          id: 'ade-foto-1',
          label: 'Fachada sobre calle Urquiza',
          captureDate: 'Pendiente de relevamiento',
          statusNote: 'Espacio reservado para fotografía sin retoques con fecha AAAA-MM-DD.',
        },
        {
          id: 'ade-foto-2',
          label: 'Espacio común / sala de informática',
          captureDate: 'Pendiente de relevamiento',
          statusNote: 'Espacio reservado para fotografía sin retoques con fecha AAAA-MM-DD.',
        },
      ],
    },
  },
];

/**
 * MÓDULO 2: EMPRENDIMIENTOS ESTUDIANTILES Y LOCALES
 * Estructura editable con los 6 rubros requeridos.
 */
export const VENTURES_DATA: StudentVenture[] = [
  {
    id: 'emp-apuntes-litoral',
    name: 'Archivo Colaborativo Centro (Ejemplo)',
    category: 'Educación/Apuntes',
    academicLink: 'Estudiantes de Ciencias Económicas — Santa Fe Capital',
    description:
      'Digitalización ordenada de guías prácticas, cuadernillos de cátedra e impresiones en blanco y negro por encargo para ingresantes.',
    coverageZone: 'Zona Rectorado / Bv. Pellegrini y Barrio Centro',
    contactChannel: 'WhatsApp',
    contactLabel: 'Consultar por WhatsApp (ejemplo)',
    contactUrl: 'https://wa.me/5493420000000',
    isExampleData: true,
    lastUpdated: '2026-10-15',
  },
  {
    id: 'emp-soporte-pc-guadalupe',
    name: 'Taller Técnico Guadalupe (Ejemplo)',
    category: 'Tecnología',
    academicLink: 'Estudiante avanzado de Ingeniería en Sistemas — UTN FRSF',
    description:
      'Mantenimiento preventivo de notebooks para cursado, cambio de pasta térmica, ampliación de SSD/RAM e instalación de software libre.',
    coverageZone: 'Guadalupe Oeste, Zona UTN y entregas en Centro',
    contactChannel: 'Instagram',
    contactLabel: 'Ver perfil en Instagram (ejemplo)',
    contactUrl: 'https://www.instagram.com/',
    isExampleData: true,
    lastUpdated: '2026-10-17',
  },
  {
    id: 'emp-viandas-el-pozo',
    name: 'Viandas Semanales del Campus (Ejemplo)',
    category: 'Gastronomía',
    academicLink: 'Emprendimiento de egresados y estudiantes — Ciudad Universitaria',
    description:
      'Menús semanales planificados sin ultraprocesados con opción vegetariana para jornadas completas de cursado y biblioteca.',
    coverageZone: 'Barrio El Pozo, Ciudad Universitaria y Costanera Este',
    contactChannel: 'WhatsApp',
    contactLabel: 'Consultar menú por WhatsApp (ejemplo)',
    contactUrl: 'https://wa.me/5493420000001',
    isExampleData: true,
    lastUpdated: '2026-10-19',
  },
  {
    id: 'emp-maquetacion-academica',
    name: 'Estudio Gráfico Norma APA (Ejemplo)',
    category: 'Diseño/Comunicación',
    academicLink: 'Estudiantes de Diseño y Comunicación Visual — Santa Fe Capital',
    description:
      'Diagramación de tesinas, pósters científicos para jornadas académicas y presentaciones sobrias para defensas finales.',
    coverageZone: 'Todo Santa Fe Capital (modalidad presencial y remota)',
    contactChannel: 'Web',
    contactLabel: 'Ver porfolio de muestra',
    contactUrl: 'https://example.org',
    isExampleData: true,
    lastUpdated: '2026-10-14',
  },
  {
    id: 'emp-fletes-estudiantiles',
    name: 'Traslados Estudiantiles Santa Fe (Ejemplo)',
    category: 'Servicios',
    academicLink: 'Red de estudiantes del interior radicados en Santa Fe Capital',
    description:
      'Fletes puntuales para mudanzas de habitaciones, escritorios y electrodomésticos chicos en recambio de contratos de alquiler.',
    coverageZone: 'Macrocentro, Candioti Sur, Candioti Norte y Guadalupe',
    contactChannel: 'WhatsApp',
    contactLabel: 'Coordinar traslado (ejemplo)',
    contactUrl: 'https://wa.me/5493420000002',
    isExampleData: true,
    lastUpdated: '2026-10-16',
  },
  {
    id: 'emp-tutorias-ingles',
    name: 'Taller de Lectocomprensión Técnica (Ejemplo)',
    category: 'Otros',
    academicLink: 'Egresado de Profesorado y Traductorado en Santa Fe Capital',
    description:
      'Grupos reducidos de preparación para exámenes de acreditación de inglés técnico en carreras universitarias y terciarias.',
    coverageZone: 'Barrio Sur / Modalidad híbrida en Santa Fe Capital',
    contactChannel: 'Web',
    contactLabel: 'Solicitar horarios de muestra',
    contactUrl: 'https://example.org',
    isExampleData: true,
    lastUpdated: '2026-10-21',
  },
];

/**
 * MÓDULO 3: AYUDAS DE ESTUDIO (Prompts IA, Videos y Guías por Carrera/Cátedra)
 */
export const STUDY_AIDS_DATA: StudyAid[] = [
  {
    id: 'aid-prompt-plan-estudio',
    title: 'Organizador de cronograma semanal por correlatividades',
    type: 'Prompt IA',
    career: 'Transversal (Todas las carreras)',
    subject: 'Organización Académica / Ingreso',
    purpose:
      'Convertir el programa oficial de una materia y tus horarios de cursado/trabajo en un plan de lectura realista antes de parciales.',
    promptText: `Actuá como tutor académico metodológico. Estoy cursando [Nombre de la carrera] en [Institución] y necesito preparar la materia [Nombre de la cátedra].

Datos de partida:
- Fecha del próximo parcial: [AAAA-MM-DD]
- Horas reales disponibles por semana: [Cantidad de horas]
- Unidades del programa que entran en el examen: [Listar unidades o temas]
- Bibliografía obligatoria indicada por la cátedra: [Autores o capítulos]

Tarea:
1. Dividí el temario en bloques semanales equilibrados dejando los últimos 4 días exclusivamente para repaso activo y simulacros.
2. Indicá qué preguntas de autoevaluación debería poder responder al cerrar cada unidad.
3. No inventes citas ni bibliografía externa a la que te proporcioné.`,
    isExampleData: true,
    lastUpdated: '2026-10-20',
  },
  {
    id: 'aid-prompt-contabilidad',
    title: 'Desglose paso a paso de asientos contables y estados básicos',
    type: 'Prompt IA',
    career: 'Administración / Ciencias Económicas',
    subject: 'Contabilidad Básica / Sistemas Contables',
    purpose:
      'Practicar registraciones contables verificando la lógica patrimonial (Activo, Pasivo, Patrimonio Neto) sin saltar pasos.',
    promptText: `Necesito practicar registración contable básica para [Nombre de la materia] siguiendo las normas contables argentinas vigentes enseñadas en clase.

Operación a analizar:
- Descripción del hecho económico: [Ej: compra de mercaderías 50% en cuenta corriente y 50% con pagaré]
- Documentación respaldatoria: [Ej: Factura A / Recibo / Pagaré]

Pedimos que:
1. Identifiques las cuentas intervinientes y su naturaleza patrimonial.
2. Expliques la variación patrimonial (permutativa o modificativa) antes de mostrar el asiento.
3. Muestres el asiento en formato Debe / Haber y plantees un ejercicio similar sin resolver para que yo practique.`,
    isExampleData: true,
    lastUpdated: '2026-10-18',
  },
  {
    id: 'aid-prompt-algoritmos',
    title: 'Depuración guiada de algoritmos sin entregar la solución directa',
    type: 'Prompt IA',
    career: 'Ingeniería en Informática / Sistemas / Software',
    subject: 'Algoritmos y Estructuras de Datos / Programación I',
    purpose:
      'Detectar errores lógicos en pseudocódigo o código propio recibiendo pistas progresivas en lugar de copiar respuestas.',
    promptText: `Sos docente auxiliar de [Nombre de la cátedra] en [Lenguaje: C++ / Python / Java]. No me des el código corregido de inmediato.

Consigna del práctico:
[Pegar consigna de la cátedra]

Mi intento actual:
[Pegar código o pseudocódigo]

Error o comportamiento observado:
[Describir qué falla o qué caso de prueba da mal]

Instrucción: Señalá únicamente en qué línea o condición lógica está la inconsistencia, explicá por qué ocurre con un caso de prueba concreto y dame una pista para que yo lo resuelva.`,
    isExampleData: true,
    lastUpdated: '2026-10-22',
  },
  {
    id: 'aid-video-calculo',
    title: 'Límites, continuidad y derivadas — Serie visual de análisis',
    type: 'Video educativo',
    career: 'Ingeniería en Informática / Sistemas / Software',
    subject: 'Cálculo I / Análisis Matemático I',
    purpose:
      'Repaso gráfico de la interpretación geométrica de límites y derivadas para complementar las clases teóricas del primer cuatrimestre.',
    externalUrl: 'https://www.youtube.com/@3blue1brown',
    sourceName: '3Blue1Brown (Esencia del Cálculo — subtítulos en español)',
    durationLabel: 'Serie de capítulos (~15 min c/u)',
    isExampleData: true,
    lastUpdated: '2026-10-12',
  },
  {
    id: 'aid-video-estructuras-datos',
    title: 'Punteros, memoria y estructuras dinámicas explicadas gráficamente',
    type: 'Video educativo',
    career: 'Ingeniería en Informática / Sistemas / Software',
    subject: 'Algoritmos y Estructuras de Datos',
    purpose:
      'Visualización paso a paso de listas enlazadas, pilas y colas en memoria para evitar errores frecuentes de asignación.',
    externalUrl: 'https://cs50.harvard.edu/x/',
    sourceName: 'CS50 OpenCourseWare (Material abierto de referencia)',
    durationLabel: 'Módulo temático de acceso libre',
    isExampleData: true,
    lastUpdated: '2026-10-14',
  },
  {
    id: 'aid-guia-lectura-administrativa',
    title: 'Lista de verificación para leer resoluciones y planes de estudio',
    type: 'Guía de estudio',
    career: 'Transversal (Todas las carreras)',
    subject: 'Orientación Administrativa Inicial',
    purpose:
      'Cómo distinguir alcance de título, régimen de correlatividades (regularidad vs. aprobación) y validez nacional en documentos oficiales.',
    externalUrl: 'https://www.argentina.gob.ar/educacion',
    sourceName: 'Referencia de normativa educativa nacional (recurso abierto)',
    durationLabel: 'Lectura técnica de 5 minutos',
    isExampleData: true,
    lastUpdated: '2026-10-19',
  },
];

/**
 * MÓDULO 4: NOTICIAS EDUCATIVAS (Neutralidad editorial estricta)
 */
export const NEWS_DATA: NewsItem[] = [
  {
    id: 'news-calendario-inscripciones-sf',
    headline:
      'Guía metodológica: cómo verificar fechas oficiales de inscripción al ciclo lectivo 2027 en Santa Fe Capital',
    publishedDate: '2026-10-21',
    scope: 'Santa Fe Capital',
    originTag: 'Redacción propia',
    summary:
      'Resumen operativo para ingresantes sobre los canales institucionales donde se publican cronogramas de preinscripción universitaria y terciaria sin intermediarios.',
    fullBody: [
      'Cada unidad académica en Santa Fe Capital publica sus períodos de preinscripción, requisitos documentales y fechas de cursos de articulación a través de resoluciones propias y portales institucionales verificados.',
      'Desde ROA recomendamos no guiarse por capturas reenviadas en redes sociales sin enlace directo al dominio oficial (.edu.ar o sitio oficial del Ministerio de Educación de la Provincia de Santa Fe).',
      'Al consultar una institución en nuestro directorio, verificá siempre la fecha de última actualización de la ficha y utilizá los enlaces directos de Secretaría Académica o Ingresantes.',
    ],
    officialSourceName: 'Portal Educativo — Gobierno de la Provincia de Santa Fe',
    officialSourceUrl: 'https://www.santafe.gov.ar/index.php/educacion',
    editorialNeutralityNote:
      'Nota de carácter estrictamente informativo y procedimental, sin adhesión ni valoración político-partidaria.',
    isExampleData: true,
  },
  {
    id: 'news-relevamiento-edilicio-abierto',
    headline:
      'Convocatoria abierta a estudiantes avanzados para auditoría edilicia fechada en institutos y facultades',
    publishedDate: '2026-10-19',
    scope: 'Santa Fe Capital',
    originTag: 'Redacción propia',
    summary:
      'ROA habilitó el protocolo de relevamiento presencial con planilla objetiva (aulas, climatización, sanitarios, accesibilidad y Wi-Fi) para completar fichas locales.',
    fullBody: [
      'Para evitar descripciones subjetivas o desactualizadas, toda ficha edilicia publicada en ROA requiere fecha exacta de constatación (AAAA-MM-DD), criterio objetivo (Bueno / Regular / Deficiente) y evidencia fotográfica sin retoques.',
      'Estudiantes avanzados (con 60% o más de materias aprobadas) y docentes o personal institucional pueden remitir observaciones mediante el Canal de Corrección.',
      'Las instituciones mencionadas disponen en todo momento de derecho a réplica para aportar documentación o informar obras ejecutadas con posterioridad al relevamiento.',
    ],
    officialSourceName: 'Canal de Moderación y Transparencia ROA',
    officialSourceUrl: '#canal-correccion',
    editorialNeutralityNote:
      'Protocolo técnico comunitario basado en evidencia verificable y derecho a réplica garantizado.',
    isExampleData: true,
  },
  {
    id: 'news-titulos-terciarios-provincia',
    headline:
      'Criterios de validez nacional y registro de títulos de nivel superior no universitario en la provincia',
    publishedDate: '2026-10-15',
    scope: 'Provincia de Santa Fe',
    originTag: 'Fuente oficial curada',
    summary:
      'Aspectos administrativos clave que todo aspirante a tecnicaturas superiores o profesorados debe consultar antes de inscribirse.',
    fullBody: [
      'Al evaluar carreras de nivel terciario (gestión pública o privada) en la Provincia de Santa Fe, resulta fundamental solicitar el número de resolución ministerial provincial que aprueba el diseño curricular y el estado del trámite de validez nacional.',
      'Este control administrativo previo permite conocer con precisión el alcance del título habilitante y la posibilidad futura de articulación con ciclos de complementación curricular universitarios.',
      'El presente artículo resume pautas administrativas públicas de consulta para orientar la lectura de folletería institucional.',
    ],
    officialSourceName: 'Ministerio de Educación — Provincia de Santa Fe',
    officialSourceUrl: 'https://www.santafe.gov.ar/index.php/educacion',
    editorialNeutralityNote:
      'Síntesis técnica de criterios administrativos públicos; no constituye asesoramiento legal vinculante.',
    isExampleData: true,
  },
  {
    id: 'news-becas-transporte-estudiantil',
    headline:
      'Documentación habitual requerida para trámites de boleto educativo y becas académicas de nivel superior',
    publishedDate: '2026-10-10',
    scope: 'Educación Superior',
    originTag: 'Colaborador asignado',
    summary:
      'Listado orientativo de constancias administrativas (alumno regular, historia académica y domicilio) necesarias al inicio del ciclo lectivo.',
    fullBody: [
      'Los programas provinciales y nacionales de apoyo al cursado suelen solicitar constancia de inscripción o alumno regular emitida por el sistema de gestión estudiantil (como SIU-Guaraní en universidades nacionales o constancia de instituto superior).',
      'Se recomienda verificar los plazos de vigencia de cada certificado antes de iniciar el trámite digital y confirmar los requisitos oficiales directamente en los portales vigentes para el año académico correspondiente.',
    ],
    officialSourceName: 'Portal Oficial de Educación Superior',
    officialSourceUrl: 'https://www.argentina.gob.ar/educacion',
    editorialNeutralityNote:
      'Contenido orientativo revisado bajo criterios de neutralidad y verificación documental.',
    isExampleData: true,
  },
];
