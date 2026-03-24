import { useState } from "react";
import { ChevronDown, ChevronRight, User, Film, BookOpen, Video, Share2, Briefcase, Mail, Camera, Monitor, Clapperboard } from "lucide-react";

const mainSections = [
  { id: "hero", label: "Overview", icon: User },
  { id: "about", label: "About", icon: User },
  { id: "book", label: "Book", icon: BookOpen },
  { id: "software", label: "Software", icon: Monitor },
  { id: "films", label: "Films", icon: Film },
  { id: "commercial", label: "Commercial", icon: Clapperboard },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "press", label: "Press Coverage", icon: BookOpen },
  { id: "interviews", label: "Interviews", icon: Video },
];

const otherSections = [
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "social", label: "Social & Contact", icon: Share2 },
];

export default function Sidebar() {
  const [otherOpen, setOtherOpen] = useState(false);
  const [active, setActive] = useState("hero");

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
              {s.label}
            </button>
          );
        })}

        <div className="mt-2">
          <button
            onClick={() => setOtherOpen(!otherOpen)}
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-sm w-full text-left"
          >
            {otherOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            Other
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
                    {s.label}
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
          Contact
        </button>
      </div>
    </aside>
  );
}
