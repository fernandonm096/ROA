import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import type { ThemeMode } from '../utils/theme';

interface NavbarProps {
  onOpenCorrectionModal: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { href: '#instituciones', label: 'Instituciones' },
  { href: '#emprendimientos', label: 'Emprendimientos' },
  { href: '#ayudas', label: 'Ayudas de estudio' },
  { href: '#noticias', label: 'Noticias' },
];

export function Navbar({
  onOpenCorrectionModal,
  theme,
  onToggleTheme,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zona 1: Marca en una sola línea */}
        <a
          href="#inicio"
          className="font-display text-base sm:text-lg font-semibold tracking-tight text-[#0F2942] dark:text-slate-100 whitespace-nowrap truncate max-w-[205px] sm:max-w-none shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2942] dark:focus-visible:outline-sky-400"
        >
          ROA — Red de Orientación Administrativa
        </a>

        {/* Zona 2: Enlaces directos en escritorio */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:text-[#0F2942] dark:hover:text-white hover:border-[#0F2942] dark:hover:border-sky-400 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2942] dark:focus-visible:outline-sky-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zona 3: Toggle de Modo Oscuro + Acción principal */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
            }
            aria-pressed={theme === 'dark'}
            className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2942] dark:focus-visible:outline-sky-400"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCorrectionModal}
            className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#0F2942] dark:bg-sky-600 rounded-lg hover:bg-[#193C5E] dark:hover:bg-sky-500 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2942] dark:focus-visible:outline-sky-400"
          >
            Canal de corrección
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={
              mobileMenuOpen
                ? 'Cerrar menú de navegación'
                : 'Abrir menú de navegación'
            }
            className="lg:hidden inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-3 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2942] dark:focus-visible:outline-sky-400"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
            <span>{mobileMenuOpen ? 'Cerrar' : 'Menú'}</span>
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 shadow-lg px-4 py-4 space-y-2"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center min-h-[44px] px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#0F2942] dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className="w-full min-h-[44px] inline-flex items-center justify-between px-3.5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer"
            >
              <span>
                {theme === 'dark' ? 'Modo Oscuro activo' : 'Modo Claro activo'}
              </span>
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCorrectionModal();
              }}
              className="w-full min-h-[44px] px-4 py-2.5 text-sm font-semibold text-white bg-[#0F2942] dark:bg-sky-600 rounded-lg hover:bg-[#193C5E] dark:hover:bg-sky-500 transition-colors cursor-pointer"
            >
              Canal de corrección / Derecho a réplica
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
