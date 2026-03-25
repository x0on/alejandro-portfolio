import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, ChevronRight, User, Film, BookOpen, Video, Share2, Briefcase, Mail, Camera, Monitor, Clapperboard } from "lucide-react";

const mainSections = [
  { id: "hero", labelKey: "nav.pressKit", icon: User },
  { id: "about", labelKey: "section.about", icon: User },
  { id: "book", labelKey: "section.book", icon: BookOpen },
  { id: "software", labelKey: "section.software", icon: Monitor },
  { id: "films", labelKey: "section.films", icon: Film },
  { id: "commercial", labelKey: "section.commercial", icon: Clapperboard },
  { id: "photography", labelKey: "section.photography", icon: Camera },
  { id: "press", labelKey: "section.press", icon: BookOpen },
  { id: "interviews", labelKey: "section.interviews", icon: Video },
];

const otherSections = [
  { id: "experience", labelKey: "section.experience", icon: Briefcase },
  { id: "social", labelKey: "section.connect", icon: Share2 },
];

export default function Sidebar() {
  const [otherOpen, setOtherOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const { t, language } = useLanguage();

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-14 bottom-0 w-56 bg-sidebar border-r border-sidebar-border z-40 overflow-y-auto">
      <nav className="flex flex-col py-6 px-3 gap-0.5">
        {mainSections.map(s => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-sm transition-colors text-left ${
                active === s.id
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              {t(s.labelKey)}
            </button>
          );
        })}

        <div className="mt-2">
          <button
            onClick={() => setOtherOpen(!otherOpen)}
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-sm w-full text-left"
          >
            {otherOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            {language === "es" ? "Otros" : "Other"}
          </button>
          {otherOpen && (
            <div className="ml-2 flex flex-col gap-0.5">
              {otherSections.map(s => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-sm transition-colors text-left ${
                      active === s.id
                        ? "bg-sidebar-accent text-sidebar-primary font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <Icon size={16} className="shrink-0" />
                    {t(s.labelKey)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      <div className="mt-auto px-3 py-4 border-t border-sidebar-border">
        <button
          onClick={() => scrollTo("social")}
          className="flex items-center gap-2 px-3 py-2 text-xs text-sidebar-foreground hover:text-sidebar-primary transition-colors"
        >
          <Mail size={14} />
          {t("connect.contact")}
        </button>
      </div>
    </aside>
  );
}
