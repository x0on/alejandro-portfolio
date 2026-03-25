import { ASSETS } from "@/data/content";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src={ASSETS.logomark} alt="AR" className="h-8 w-8 object-contain" />
          <span className="text-sm font-semibold tracking-wide hidden sm:inline" style={{ fontFamily: "var(--font-display)" }}>
            ALEJANDRO RENTERIA
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/" className={`hover:text-primary transition-colors ${location === "/" ? "text-primary" : "text-muted-foreground"}`}>
            {t("nav.pressKit")}
          </Link>
          <Link href="/media-kit" className={`hover:text-primary transition-colors ${location === "/media-kit" ? "text-primary" : "text-muted-foreground"}`}>
            {t("nav.mediaKit")}
          </Link>
          <LanguageToggle />
          <ThemeSwitcher />
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <ThemeSwitcher />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1.5 text-foreground">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="container py-3 flex flex-col gap-2">
            <Link href="/" onClick={() => setMobileOpen(false)} className="py-2 text-sm hover:text-primary">{t("nav.pressKit")}</Link>
            <Link href="/media-kit" onClick={() => setMobileOpen(false)} className="py-2 text-sm hover:text-primary">{t("nav.mediaKit")}</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
