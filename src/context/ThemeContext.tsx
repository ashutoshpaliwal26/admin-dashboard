import React, { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  theme: {
    primary: string;
    background: string;
    card: string;
  };
  updateTheme: (newTheme: { primary: string; background: string; card: string }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState({
    primary: 'rgb(147, 51, 234)',
    background: '#070B16',
    card: '#0F1631',
  });

  const updateTheme = (newTheme: { primary: string; background: string; card: string }) => {
    setTheme(newTheme);
    document.documentElement.style.setProperty('--primary-color', newTheme.primary);
    document.documentElement.style.setProperty('--background-color', newTheme.background);
    document.documentElement.style.setProperty('--card-color', newTheme.card);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};