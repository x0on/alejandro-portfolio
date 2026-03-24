import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type ArtisticTheme =
  | "glassmorphism"
  | "neubrutalism"
  | "minimalist"
  | "swiss"
  | "bauhaus"
  | "memphis"
  | "retrofuturism"
  | "cyberpunk"
  | "artdeco";

export interface ThemeConfig {
  id: ArtisticTheme;
  name: string;
  category: string;
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
}

export const THEMES: ThemeConfig[] = [
  { id: "glassmorphism", name: "Glassmorphism", category: "Modern", fontDisplay: "'Space Grotesk'", fontBody: "'Source Sans 3'", fontMono: "'IBM Plex Mono'" },
  { id: "neubrutalism", name: "Neubrutalism", category: "Modern", fontDisplay: "'Space Grotesk'", fontBody: "'Source Sans 3'", fontMono: "'IBM Plex Mono'" },
  { id: "minimalist", name: "Minimalist", category: "Classic", fontDisplay: "'Cormorant Garamond'", fontBody: "'Source Sans 3'", fontMono: "'IBM Plex Mono'" },
  { id: "swiss", name: "Swiss Design", category: "Classic", fontDisplay: "'Space Grotesk'", fontBody: "'Source Sans 3'", fontMono: "'IBM Plex Mono'" },
  { id: "bauhaus", name: "Bauhaus", category: "Classic", fontDisplay: "'Oswald'", fontBody: "'Source Sans 3'", fontMono: "'IBM Plex Mono'" },
  { id: "memphis", name: "Memphis", category: "Playful", fontDisplay: "'Bebas Neue'", fontBody: "'Source Sans 3'", fontMono: "'IBM Plex Mono'" },
  { id: "retrofuturism", name: "Retro Futurism", category: "Futuristic", fontDisplay: "'Orbitron'", fontBody: "'Source Sans 3'", fontMono: "'IBM Plex Mono'" },
  { id: "cyberpunk", name: "Cyberpunk", category: "Futuristic", fontDisplay: "'Orbitron'", fontBody: "'Source Sans 3'", fontMono: "'IBM Plex Mono'" },
  { id: "artdeco", name: "Art Deco", category: "Classic", fontDisplay: "'Poiret One'", fontBody: "'Source Sans 3'", fontMono: "'IBM Plex Mono'" },
];

interface ThemeContextType {
  theme: ArtisticTheme;
  themeConfig: ThemeConfig;
  setTheme: (theme: ArtisticTheme) => void;
  randomizeTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getRandomTheme(): ArtisticTheme {
  const idx = Math.floor(Math.random() * THEMES.length);
  return THEMES[idx].id;
}

function applyThemeToDOM(themeId: ArtisticTheme) {
  const root = document.documentElement;
  // Remove all theme classes
  THEMES.forEach(t => root.classList.remove(`theme-${t.id}`));
  // Add the current theme class
  root.classList.add(`theme-${themeId}`);

  const config = THEMES.find(t => t.id === themeId)!;
  root.style.setProperty("--font-display", config.fontDisplay);
  root.style.setProperty("--font-body", config.fontBody);
  root.style.setProperty("--font-mono", config.fontMono);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ArtisticTheme>(() => {
    const stored = localStorage.getItem("ar-theme") as ArtisticTheme | null;
    if (stored && THEMES.find(t => t.id === stored)) return stored;
    return getRandomTheme();
  });

  const themeConfig = THEMES.find(t => t.id === theme)!;

  useEffect(() => {
    applyThemeToDOM(theme);
    localStorage.setItem("ar-theme", theme);
  }, [theme]);

  const setTheme = useCallback((t: ArtisticTheme) => {
    setThemeState(t);
  }, []);

  const randomizeTheme = useCallback(() => {
    let next = getRandomTheme();
    while (next === theme && THEMES.length > 1) {
      next = getRandomTheme();
    }
    setThemeState(next);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeConfig, setTheme, randomizeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
