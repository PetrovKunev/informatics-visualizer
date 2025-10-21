"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  prefersReducedMotion: boolean;
}

const STORAGE_KEY = 'cs-visual-lab-theme';
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const userPreferenceRef = useRef<Theme | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    const resolvedTheme = isTheme(storedTheme) ? storedTheme : mediaQuery.matches ? 'dark' : 'light';

    setTheme(resolvedTheme);
    userPreferenceRef.current = isTheme(storedTheme) ? storedTheme : null;
    setIsReady(true);

    const handleChange = (event: MediaQueryListEvent) => {
      if (userPreferenceRef.current) {
        return;
      }
      setTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);
    const listener = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    if (userPreferenceRef.current) {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [theme, isReady]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          if (typeof window !== 'undefined') {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const systemTheme: Theme = systemPrefersDark ? 'dark' : 'light';
            userPreferenceRef.current = next === systemTheme ? null : next;
          } else {
            userPreferenceRef.current = next;
          }
          return next;
        }),
      prefersReducedMotion
    }),
    [theme, prefersReducedMotion]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme трябва да се използва в рамките на ThemeProvider');
  }
  return context;
}
