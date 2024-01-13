import React, { createContext, useContext, useEffect, useState } from 'react';

import { ColorScheme, Theme } from '@/types';
import { COLOR_SCHEMS, THEMES } from '@/lib/constants';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/localStorage';

// Props for ThemeProvider component
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColorScheme?: ColorScheme;
};

// State interface for ThemeProvider
type ThemeProviderState = {
  selectedTheme: Theme;
  selectedColorScheme: ColorScheme;
  setTheme: (theme: Theme) => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
};

// Initial state for ThemeProvider
const initialState: ThemeProviderState = {
  selectedTheme: 'system',
  selectedColorScheme: 'zinc',
  setTheme: () => null,
  setColorScheme: () => null,
};

// Create context for ThemeProvider
const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultColorScheme = 'zinc',
  ...props
}: ThemeProviderProps) {
  const themeStorageKey = 'youtube-chat-theme';
  const colorSchemeStorageKey = 'youtube-chat-color-scheme';

  // State for theme and colorScheme with localStorage fallbacks
  const [theme, setTheme] = useState<Theme>(
    () => (getLocalStorageItem(themeStorageKey) as Theme) || defaultTheme,
  );

  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    () =>
      (getLocalStorageItem(colorSchemeStorageKey) as ColorScheme) ||
      defaultColorScheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(...THEMES);
    root.classList.remove(...COLOR_SCHEMS);

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      root.classList.add(colorScheme);
      return;
    }

    root.classList.add(colorScheme);
    root.classList.add(theme);
  }, [theme, colorScheme]);

  // Value for ThemeProviderContext
  const value: ThemeProviderState = {
    selectedTheme: theme,
    selectedColorScheme: colorScheme,

    setTheme: (newTheme: Theme) => {
      setLocalStorageItem(themeStorageKey, newTheme);
      setTheme(newTheme);
    },

    setColorScheme: (newColorScheme: ColorScheme) => {
      setLocalStorageItem(colorSchemeStorageKey, newColorScheme);
      setColorScheme(newColorScheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Custom hook for consuming ThemeProviderContext
export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
