import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'colorScheme';
const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';
const THEME_COLOR = { light: '#1c5ba1', dark: '#0a1320' };

/**
 * Hook para manejar el tema claro/oscuro de la aplicación
 * Si el usuario no eligió un tema explícitamente, sigue la preferencia del sistema
 * @returns {Object} - Tema activo y función para alternarlo
 */
export const useColorScheme = () => {
  // Valor guardado: 'light' | 'dark' | null (null = seguir al sistema)
  const { storedValue: storedTheme, setStorage: setStoredTheme } = useLocalStorage(STORAGE_KEY, null);

  const getSystemTheme = useCallback(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return 'light';
    return window.matchMedia(DARK_MEDIA_QUERY).matches ? 'dark' : 'light';
  }, []);

  const theme = storedTheme ?? getSystemTheme();
  const isDark = theme === 'dark';

  // Aplicar el tema al documento y actualizar el theme-color de la barra del navegador
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) themeColorMeta.setAttribute('content', THEME_COLOR[theme]);
  }, [theme]);

  // Mientras no haya preferencia guardada, seguir los cambios del sistema en vivo
  useEffect(() => {
    if (storedTheme !== null || typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia(DARK_MEDIA_QUERY);
    const handleChange = () => {
      document.documentElement.dataset.theme = mediaQuery.matches ? 'dark' : 'light';
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [storedTheme]);

  const toggleTheme = useCallback(() => {
    setStoredTheme(isDark ? 'light' : 'dark');
  }, [isDark, setStoredTheme]);

  return { theme, isDark, toggleTheme };
};
