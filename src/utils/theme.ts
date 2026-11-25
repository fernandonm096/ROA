/**
 * Utilidades puras para gestión de Modo Oscuro con persistencia en localStorage
 * y respaldo según la preferencia del sistema operativo.
 */

export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'roa-theme';

/**
 * Resuelve el tema inicial respetando la preferencia guardada en localStorage
 * o, en su ausencia, la preferencia del sistema operativo.
 */
export function resolveInitialTheme(
  storedTheme: string | null,
  systemPrefersDark: boolean
): ThemeMode {
  if (storedTheme === 'dark') return 'dark';
  if (storedTheme === 'light') return 'light';
  return systemPrefersDark ? 'dark' : 'light';
}
