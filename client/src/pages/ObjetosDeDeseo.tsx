import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ASSETS, films } from "@/data/content";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Clock, Globe, Film, MapPin, Clapperboard, X, Image as ImageIcon } from "lucide-react";

const film = films[0]; // Objetos de Deseo is the first film

const MEDIA_BASE = "https://alejandrorenteria.com/objetos-media";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ObjetosDeDeseo() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const specsEN = [
    { label: "Project Type", value: "Short \u2013 Develop Feature Film" },
    { label: "Genres", value: "Drama, Tragedy, Dark Comedy" },
    { label: "Runtime", value: "18 minutes 28 seconds" },
    { label: "Country of Origin", value: "United States" },
    { label: "Country of Filming", value: "United States" },
    { label: "Language", value: "Spanish" },
    { label: "Shooting Format", value: "Digital S35mm" },
    { label: "Aspect Ratio / Color", value: "16:9 \u2022 Color" },
  ];

  const specsES = [
    { label: "Tipo de Proyecto", value: "Cortometraje \u2013 Desarrollo de Largometraje" },
    { label: "G\u00e9neros", value: "Drama, Tragedia, Comedia Negra" },
    { label: "Duraci\u00f3n", value: "18 minutos 28 segundos" },
    { label: "Pa\u00eds de Origen", value: "Estados Unidos" },
    { label: "Pa\u00eds de Rodaje", value: "Estados Unidos" },
    { label: "Idioma", value: "Espa\u00f1ol" },
    { label: "Formato de Rodaje", value: "Digital S35mm" },
    { label: "Relaci\u00f3n de Aspecto / Color", value: "16:9 \u2022 Color" },
  ];

  const specs = language === "es" ? specsES : specsEN;

  const crewLabelsEN: Record<string, string> = { director: "Director", writer: "Writer", producer: "Producer" };
  const crewLabelsES: Record<string, string> = { director: "Director", writer: "Guionista", producer: "Productor" };
  const crewLabels = language === "es" ? crewLabelsES : crewLabelsEN;

  return (
    <div className={`min-h-screen bg-background text-foreground theme-${theme.className}`}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            {t("objetos.backToKit")}
          </a>
          <img src={ASSETS.logo} alt="AR" className="h-6 opacity-60" />
        </div>
      </nav>

      {/* Hero with Poster */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="pt-20 pb-12 container"
      >
        <div className="grid md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr] gap-10 items-start">
          {/* Main Poster */}
          <motion.div variants={fadeUp} className="relative group cursor-pointer" onClick={() => setLightboxOpen(true)}>
            <img
              src={`${MEDIA_BASE}/poster.jpg`}
              alt="Objetos de Deseo - Official Poster"
              className="w-full rounded-sm shadow-2xl border border-border/30"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-sm flex items-center justify-center">
              <ImageIcon size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>

          {/* Title & Info */}
          <motion.div variants={fadeUp} className="pt-2">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4 block">
              {language === "es" ? "Cortometraje" : "Short Film"}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
              Objetos de Deseo
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mt-3 font-light" style={{ fontFamily: "var(--font-display)" }}>
              La Navaja
            </p>

            {/* Specs */}
            <div className="flex flex-wrap gap-5 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-primary" />
                <span>{film.runtime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-primary" />
                <span>{film.language}</span>
              </div>
              <div className="flex items-center gap-2">
                <Film size={14} className="text-primary" />
                <span>{film.format}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-primary" />
                <span>{language === "es" ? "Estados Unidos" : "United States"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clapperboard size={14} className="text-primary" />
                <span>16:9 &middot; Color</span>
              </div>
            </div>

            {/* Synopsis */}
            <div className="mt-8">
              <p className="text-base leading-relaxed text-foreground/90">
                {t("objetos.synopsisText")}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <div className="container pb-24 space-y-20">

        {/* ===== TRAILER (YouTube) ===== */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">
            {t("objetos.trailer")}
          </motion.h2>
          <motion.div variants={fadeUp} className="aspect-video w-full max-w-4xl rounded-sm overflow-hidden border border-border">
            <iframe
              src="https://www.youtube.com/embed/-IkjPxa6YXQ"
              title="Objetos de Deseo - Official Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </motion.section>

        {/* ===== FULL FILM (YouTube) ===== */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">
            {t("objetos.fullFilm")}
          </motion.h2>
          <motion.div variants={fadeUp} className="aspect-video w-full max-w-4xl rounded-sm overflow-hidden border border-border">
            <iframe
              src="https://www.youtube.com/embed/rNcGMiXXXoM"
              title="Objetos de Deseo - La Navaja (Full Film)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </motion.section>

        {/* ===== CREDITS ===== */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">{t("objetos.credits")}</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">{t("films.cast")}</h3>
              <div className="space-y-3">
                {film.cast?.map((c) => (
                  <div key={c.name} className="flex justify-between items-baseline border-b border-border/50 pb-3">
                    <span className="font-medium text-lg">{c.name}</span>
                    <span className="text-sm text-muted-foreground">{c.role}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                {language === "es" ? "Equipo" : "Crew"}
              </h3>
              <div className="space-y-3">
                {film.crew && (
                  <>
                    <div className="flex justify-between items-baseline border-b border-border/50 pb-3">
                      <span className="font-medium text-lg">{film.crew.director}</span>
                      <span className="text-sm text-muted-foreground">{crewLabels.director}</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-border/50 pb-3">
                      <span className="font-medium text-lg">{film.crew.writer}</span>
                      <span className="text-sm text-muted-foreground">{crewLabels.writer}</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-border/50 pb-3">
                      <span className="font-medium text-lg">{film.crew.producer}</span>
                      <span className="text-sm text-muted-foreground">{crewLabels.producer}</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ===== SPECIFICATIONS ===== */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">{t("objetos.specifications")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specs.map((spec) => (
              <div key={spec.label} className="bg-card border border-border p-4 rounded-sm">
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">{spec.label}</div>
                <div className="text-sm font-medium">{spec.value}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ===== AWARDS ===== */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8 flex items-center gap-2">
            <Award size={14} className="text-primary" /> {t("films.awardsSelections")}
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {film.awards?.map((a, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-card border border-border p-5 rounded-sm hover:border-primary/30 transition-colors">
                <div className="text-sm font-medium mb-1">{a.award}</div>
                <div className="text-xs text-muted-foreground font-mono">{a.festival}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ===== DIRECTOR STATEMENT ===== */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">{t("objetos.directorStatement")}</h2>
          <div className="max-w-3xl space-y-6">
            <p className="text-sm text-muted-foreground italic mb-4">{t("objetos.statementPreamble")}</p>
            <div className="space-y-5 text-sm leading-relaxed text-foreground/85">
              <p className="indent-8">{t("objetos.statement.p1")}</p>
              <p className="indent-8">{t("objetos.statement.p2")}</p>
              <p className="indent-8">{t("objetos.statement.p3")}</p>
              <p className="indent-8">{t("objetos.statement.p4")}</p>
              <p className="indent-8">{t("objetos.statement.p5")}</p>
            </div>
          </div>
        </motion.section>

        {/* ===== DIRECTOR BIOGRAPHY ===== */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">{t("objetos.directorBio")}</h2>
          <div className="max-w-3xl space-y-5 text-sm leading-relaxed text-foreground/85">
            <p>{t("objetos.bio.p1")}</p>
            <p>{t("objetos.bio.p2")}</p>
            <p>{t("objetos.bio.p3")}</p>
          </div>
        </motion.section>

        {/* Footer CTA */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center pt-10 border-t border-border">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft size={14} /> {t("objetos.backToKit")}
          </a>
        </motion.div>
      </div>

      {/* ===== POSTER LIGHTBOX ===== */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white z-10">
            <X size={28} />
          </button>
          <img
            src={`${MEDIA_BASE}/poster.jpg`}
            alt="Objetos de Deseo - Official Poster"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
