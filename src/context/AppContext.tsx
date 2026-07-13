// src/components/olha/AppContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Theme = 'lemonade' | 'luxury';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSavedTheme = (): Theme => {
  const savedTheme = localStorage.getItem('cafe-theme');

  if (savedTheme === 'luxury' || savedTheme === 'dark') {
    return 'luxury';
  }

  return 'lemonade';
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getSavedTheme);

  useEffect(() => {
    const isLuxury = theme === 'luxury';

    localStorage.setItem('cafe-theme', theme);

    const root = window.document.documentElement;
    root.classList.toggle('dark', isLuxury);
    root.dataset.theme = theme;
    root.style.colorScheme = isLuxury ? 'dark' : 'light';
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'lemonade' ? 'luxury' : 'lemonade');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
