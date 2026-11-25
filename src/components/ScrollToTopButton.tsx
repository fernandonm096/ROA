import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  /** Oculta el botón mientras un modal esté abierto para evitar superposiciones */
  hiddenByModal?: boolean;
}

/**
 * Botón flotante discreto para volver al inicio de la página.
 * Solo se muestra cuando el usuario desplazó más de 300px hacia abajo.
 */
export function ScrollToTopButton({
  hiddenByModal = false,
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const showButton = isVisible && !hiddenByModal;

  return (
    <button
      type="button"
      onClick={handleScrollTop}
      aria-label="Subir arriba"
      aria-hidden={!showButton}
      tabIndex={showButton ? 0 : -1}
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 min-h-[46px] min-w-[46px] w-12 h-12 inline-flex items-center justify-center rounded-xl bg-[#0F2942] dark:bg-slate-800 text-white border border-slate-700/20 dark:border-slate-600 shadow-lg hover:bg-[#193C5E] dark:hover:bg-slate-700 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2942] dark:focus-visible:outline-sky-400 ${
        showButton
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
