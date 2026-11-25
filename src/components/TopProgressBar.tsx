interface TopProgressBarProps {
  isLoading: boolean;
  label?: string;
}

/**
 * Indicador de carga liviano en el borde superior del viewport.
 * Se oculta inmediatamente cuando finaliza la acción activa.
 */
export function TopProgressBar({
  isLoading,
  label = 'Cargando contenido',
}: TopProgressBarProps) {
  if (!isLoading) return null;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-busy="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-slate-200/70 dark:bg-slate-800/80 overflow-hidden pointer-events-none"
    >
      <div className="h-full w-2/5 bg-[#0369A1] dark:bg-sky-400 animate-[roa-progress_650ms_ease-in-out_infinite] will-change-transform" />
      <style>{`
        @keyframes roa-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}
