import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { InstitutionModal } from './components/InstitutionModal';
import { InstitutionsDirectory } from './components/InstitutionsDirectory';
import { ModerationModal } from './components/ModerationModal';
import { Navbar } from './components/Navbar';
import { NewsSection } from './components/NewsSection';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { StudyAidsSection } from './components/StudyAidsSection';
import { TopProgressBar } from './components/TopProgressBar';
import { VenturesSection } from './components/VenturesSection';
import {
  INSTITUTIONS_DATA,
  NEWS_DATA,
  STUDY_AIDS_DATA,
  VENTURES_DATA,
} from './data/roaData';
import type {
  CorrectionReport,
  EducationLevel,
  Institution,
  ManagementType,
  NewsScope,
  StudyAidType,
  VentureCategory,
} from './types/roa';
import { exportInstitutionsToPdf, formatFiltersSummary } from './utils/exportPdf';
import {
  extractUniqueStudyContexts,
  filterInstitutions,
  filterNews,
  filterStudyAids,
  filterVentures,
} from './utils/filters';
import {
  resolveInitialTheme,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from './utils/theme';

export default function App() {
  // 1. Estado de Modo Oscuro con persistencia en localStorage y fallback del sistema
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'light';
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      saved = null;
    }
    const prefersDark =
      window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    return resolveInitialTheme(saved, prefersDark);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Ignorar errores de almacenamiento restringido
      }
      return next;
    });
  }, []);

  // Estado de filtros del Módulo 1: Instituciones
  const [searchQuery, setSearchQuery] = useState('');
  const [managementFilter, setManagementFilter] = useState<
    'Todas' | ManagementType
  >('Todas');
  const [levelFilter, setLevelFilter] = useState<'Todos' | EducationLevel>(
    'Todos'
  );
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);

  // Estado de filtros del Módulo 2: Emprendimientos
  const [ventureCategory, setVentureCategory] = useState<
    'Todos' | VentureCategory
  >('Todos');

  // Estado de filtros del Módulo 3: Ayudas de Estudio
  const [studyAidType, setStudyAidType] = useState<'Todos' | StudyAidType>(
    'Todos'
  );
  const [studyAidCareer, setStudyAidCareer] = useState('Todas');

  // Estado de filtros del Módulo 4: Noticias
  const [newsScope, setNewsScope] = useState<'Todas' | NewsScope>('Todas');
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  // Estado del Canal de Moderación / Derecho a Réplica
  const [isModerationOpen, setIsModerationOpen] = useState(false);
  const [moderationInstitution, setModerationInstitution] =
    useState<Institution | null>(null);
  const [submittedReports, setSubmittedReports] = useState<CorrectionReport[]>(
    []
  );

  // Indicador de carga liviano (filtros, mapa embebido, envío de formulario, exportación PDF)
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfExportNotice, setPdfExportNotice] = useState<string | null>(null);
  const filterTimerRef = useRef<number | null>(null);

  const triggerQuickFilterIndicator = useCallback(() => {
    if (filterTimerRef.current !== null) {
      window.clearTimeout(filterTimerRef.current);
    }
    setIsFilterLoading(true);
    filterTimerRef.current = window.setTimeout(() => {
      setIsFilterLoading(false);
      filterTimerRef.current = null;
    }, 180);
  }, []);

  useEffect(() => {
    return () => {
      if (filterTimerRef.current !== null) {
        window.clearTimeout(filterTimerRef.current);
      }
    };
  }, []);

  const filteredInstitutions = useMemo(
    () =>
      filterInstitutions(INSTITUTIONS_DATA, {
        searchQuery,
        management: managementFilter,
        level: levelFilter,
      }),
    [searchQuery, managementFilter, levelFilter]
  );

  const filteredVentures = useMemo(
    () => filterVentures(VENTURES_DATA, ventureCategory),
    [ventureCategory]
  );

  const availableStudyCareers = useMemo(
    () => extractUniqueStudyContexts(STUDY_AIDS_DATA),
    []
  );

  const filteredStudyAids = useMemo(
    () =>
      filterStudyAids(STUDY_AIDS_DATA, {
        type: studyAidType,
        careerOrSubject: studyAidCareer,
      }),
    [studyAidType, studyAidCareer]
  );

  const filteredNews = useMemo(
    () => filterNews(NEWS_DATA, newsScope),
    [newsScope]
  );

  const handleExportPdf = useCallback(() => {
    if (filteredInstitutions.length === 0 || isExportingPdf) return;
    setIsExportingPdf(true);
    setPdfExportNotice(null);

    try {
      const summary = formatFiltersSummary({
        searchQuery,
        management: managementFilter,
        level: levelFilter,
      });
      const filename = exportInstitutionsToPdf(filteredInstitutions, summary);
      setPdfExportNotice(
        `Listado exportado (${filteredInstitutions.length} ${
          filteredInstitutions.length === 1 ? 'institución' : 'instituciones'
        }) en ${filename}.`
      );
      window.setTimeout(() => setPdfExportNotice(null), 4000);
    } finally {
      setIsExportingPdf(false);
    }
  }, [
    filteredInstitutions,
    isExportingPdf,
    searchQuery,
    managementFilter,
    levelFilter,
  ]);

  const handleJumpToDirectory = () => {
    const el = document.getElementById('instituciones');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenModeration = (institution: Institution | null = null) => {
    setSelectedInstitution(null);
    setModerationInstitution(institution);
    setIsModerationOpen(true);
  };

  const handleAddReport = (report: CorrectionReport) => {
    setSubmittedReports((prev) => [report, ...prev]);
  };

  const isGlobalLoading =
    isFilterLoading || isMapLoading || isFormSubmitting || isExportingPdf;
  const isAnyModalOpen =
    Boolean(selectedInstitution) || isModerationOpen || isNewsModalOpen;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <TopProgressBar isLoading={isGlobalLoading} />

      <Navbar
        onOpenCorrectionModal={() => handleOpenModeration(null)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1">
        <Hero
          quickSearch={searchQuery}
          onQuickSearchChange={(value) => {
            setSearchQuery(value);
            triggerQuickFilterIndicator();
          }}
          onJumpToDirectory={handleJumpToDirectory}
          stats={{
            institutionsCount: INSTITUTIONS_DATA.length,
            venturesCount: VENTURES_DATA.length,
            studyAidsCount: STUDY_AIDS_DATA.length,
            newsCount: NEWS_DATA.length,
          }}
        />

        <InstitutionsDirectory
          institutions={filteredInstitutions}
          searchQuery={searchQuery}
          onSearchQueryChange={(value) => {
            setSearchQuery(value);
            triggerQuickFilterIndicator();
          }}
          managementFilter={managementFilter}
          onManagementFilterChange={(value) => {
            setManagementFilter(value);
            triggerQuickFilterIndicator();
          }}
          levelFilter={levelFilter}
          onLevelFilterChange={(value) => {
            setLevelFilter(value);
            triggerQuickFilterIndicator();
          }}
          onResetFilters={() => {
            setSearchQuery('');
            setManagementFilter('Todas');
            setLevelFilter('Todos');
            triggerQuickFilterIndicator();
          }}
          onSelectInstitution={setSelectedInstitution}
          onExportPdf={handleExportPdf}
          isExportingPdf={isExportingPdf}
          pdfExportNotice={pdfExportNotice}
        />

        <VenturesSection
          ventures={filteredVentures}
          selectedCategory={ventureCategory}
          onSelectCategory={(cat) => {
            setVentureCategory(cat);
            triggerQuickFilterIndicator();
          }}
          onResetFilter={() => {
            setVentureCategory('Todos');
            triggerQuickFilterIndicator();
          }}
        />

        <StudyAidsSection
          studyAids={filteredStudyAids}
          selectedType={studyAidType}
          onSelectType={(type) => {
            setStudyAidType(type);
            triggerQuickFilterIndicator();
          }}
          selectedCareer={studyAidCareer}
          onSelectCareer={(career) => {
            setStudyAidCareer(career);
            triggerQuickFilterIndicator();
          }}
          availableCareers={availableStudyCareers}
          onResetFilters={() => {
            setStudyAidType('Todos');
            setStudyAidCareer('Todas');
            triggerQuickFilterIndicator();
          }}
        />

        <NewsSection
          newsItems={filteredNews}
          selectedScope={newsScope}
          onSelectScope={(scope) => {
            setNewsScope(scope);
            triggerQuickFilterIndicator();
          }}
          onOpenCorrectionChannel={() => handleOpenModeration(null)}
          onModalToggle={setIsNewsModalOpen}
        />
      </main>

      <Footer
        onOpenCorrectionModal={() => handleOpenModeration(null)}
        reportsCount={submittedReports.length}
      />

      <ScrollToTopButton hiddenByModal={isAnyModalOpen} />

      <InstitutionModal
        institution={selectedInstitution}
        onClose={() => setSelectedInstitution(null)}
        onRequestCorrection={(inst) => handleOpenModeration(inst)}
        onMapLoadingChange={setIsMapLoading}
      />

      <ModerationModal
        isOpen={isModerationOpen}
        initialInstitution={moderationInstitution}
        submittedReports={submittedReports}
        onClose={() => setIsModerationOpen(false)}
        onSubmitReport={handleAddReport}
        onSubmittingChange={setIsFormSubmitting}
      />
    </div>
  );
}
