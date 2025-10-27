import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type CodeTheme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  codeTheme: CodeTheme;
  setTheme: (theme: Theme) => void;
  setCodeTheme: (theme: CodeTheme) => void;
  resolvedTheme: 'light' | 'dark';
  resolvedCodeTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    return (stored as Theme) || 'system';
  });

  const [codeTheme, setCodeThemeState] = useState<CodeTheme>(() => {
    const stored = localStorage.getItem('codeTheme');
    return (stored as CodeTheme) || 'system';
  });

  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
  const resolvedCodeTheme = codeTheme === 'system' ? resolvedTheme : codeTheme;

  useEffect(() => {
    const root = document.documentElement;

    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const root = document.documentElement;
        const newTheme = getSystemTheme();
        if (newTheme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setCodeTheme = (newTheme: CodeTheme) => {
    setCodeThemeState(newTheme);
    localStorage.setItem('codeTheme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, codeTheme, setTheme, setCodeTheme, resolvedTheme, resolvedCodeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
