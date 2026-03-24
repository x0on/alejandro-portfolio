import { useTheme, THEMES, type ArtisticTheme } from "@/contexts/ThemeContext";
import { Palette, Shuffle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme, randomizeTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center gap-1">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-sm bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Switch theme"
        >
          <Palette size={16} />
          <span className="hidden sm:inline">{THEMES.find(t => t.id === theme)?.name}</span>
        </button>
        <button
          onClick={randomizeTheme}
          className="p-1.5 rounded-sm bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Random theme"
        >
          <Shuffle size={16} />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-sm shadow-xl z-50 overflow-hidden py-1">
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id as ArtisticTheme); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                theme === t.id ? "bg-primary text-primary-foreground" : "text-card-foreground"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
