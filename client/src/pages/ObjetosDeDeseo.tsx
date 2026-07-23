import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ASSETS, films } from "@/data/content";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Clock, Globe, Film, MapPin, Clapperboard, X, Image as ImageIcon, ExternalLink, Newspaper, Quote } from "lucide-react";

const film = films.find(f => f.link === "/objetos-de-deseo") || films[0];

const POSTER_URL = "https://img.youtube.com/vi/6L3JgBtaBSA/maxresdefault.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const pressCoverage = [
  {
    outlet: "Diario Las Américas",
    title: 'Alejandro Rentería: “Estas historias se nutren de la humedad de lo sórdido”',
    description: "An in-depth interview about the film’s origins, visual language, Miami setting, performances, and independent production.",
    descriptionES: "Una entrevista en profundidad sobre el origen, lenguaje visual, escenario de Miami, actuaciones y producción independiente de la película.",
    url: "https://www.diariolasamericas.com/cultura/alejandro-renteria-estas-historias-se-nutren-la-humedad-lo-sordido-n5354045",
  },
  {
    outlet: "Artburst Miami",
    title: "Cineastas de la isla y del exilio evocan una Cuba secreta en el Festival de Cine de Miami",
    description: "Coverage of the Miami Film Festival’s Spotlight on Cuba program and its participating filmmakers.",
    descriptionES: "Cobertura del programa Spotlight on Cuba del Festival de Cine de Miami y de sus cineastas participantes.",
    url: "https://www.artburstmiami.com/articulos-en-espanol/cineastas-de-la-isla-y-del-exilio-evocan-una-cuba-secreta-en-el-festival-de-cine-de-miami",
  },
  {
    outlet: "Miami Film Festival",
    title: "2024 Miami Film Festival Jury & Audience Award Winners Announced",
    description: "The festival’s official announcement naming Objetos de Deseo the Audience Award winner for Best Short Film.",
    descriptionES: "El anuncio oficial del festival que nombra a Objetos de Deseo ganador del Premio del Público al Mejor Cortometraje.",
    url: "https://miamifilmfestival.com/news/2024-miami-film-festival-jury-audience-award-winners-announced/",
  },
  {
    outlet: "CubaNet",
    title: "Programa Spotlight on Cuba del Festival de Cine de Miami cautiva a los espectadores",
    description: "Festival coverage of the Cuban film showcase in which Objetos de Deseo was presented.",
    descriptionES: "Cobertura de la muestra de cine cubano donde se presentó Objetos de Deseo.",
    url: "https://www.cubanet.org/programa-spotlight-on-cuba-del-festival-de-cine-de-miami-cautiva-a-los-espectadores/",
  },
  {
    outlet: "CubitaNOW",
    title: "Cortometraje rodado en Miami gana Mención Honorífica en festival de cine en Barcelona",
    description: "International recognition for the film at the Around International Film Festival in Barcelona.",
    descriptionES: "Reconocimiento internacional para la película en el Around International Film Festival de Barcelona.",
    url: "https://noticias.cubitanow.com/cortometraje-rodado-en-miami-gana-mencin-honorfica-en-festival-de-cine-en-barcelona",
  },
  {
    outlet: "One Film Fan",
    title: "Short Film Review: Objetos de Deseo",
    description: "An independent review of the film’s noir-inflected tension, dark humor, performances, and moral ambiguity.",
    descriptionES: "Una crítica independiente sobre la tensión noir, el humor negro, las actuaciones y la ambigüedad moral de la película.",
    url: "https://onefilmfan.com/short-film-review-objetos-de-deseo/",
  },
  {
    outlet: "Telemundo 51",
    title: "Arranca el Festival de Cine de Miami: 181 películas de más de 30 países",
    description: "Local coverage of the 41st Miami Film Festival and its international program.",
    descriptionES: "Cobertura local de la edición 41 del Festival de Cine de Miami y su programación internacional.",
    url: "https://www.telemundo51.com/noticias/local/arranca-el-festival-de-cine-de-miami-181-peliculas-de-mas-de-30-paises/2527041/",
  },
  {
    outlet: "Cuba Noticias 360",
    title: "Estas son las películas cubanas que podrán verse en el Miami Film Festival",
    description: "A preview of the Cuban films selected for the 2024 Miami Film Festival.",
    descriptionES: "Un avance de las películas cubanas seleccionadas para el Festival de Cine de Miami 2024.",
    url: "https://www.cubanoticias360.com/estas-son-las-peliculas-cubanas-que-podran-verse-en-el-miami-film-festival/",
  },
  {
    outlet: "Alejandro Rentería on Substack",
    title: "Objetos de Deseo: Una Mirada Profunda al Lado Oscuro de la Naturaleza Humana",
    description: "The complete bilingual story of the film, its themes, production, performances, and festival journey.",
    descriptionES: "La historia bilingüe completa de la película, sus temas, producción, actuaciones y recorrido por festivales.",
    url: "https://alejandrorenteria.substack.com/p/objetos-de-deseo-una-mirada-profunda",
  },
];

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
              src={POSTER_URL}
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

        {/* ===== AUDIENCE AWARD ===== */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="border border-primary/30 bg-primary/5 p-6 md:p-8 rounded-sm flex flex-col md:flex-row md:items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <Award size={24} />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-2">
                {language === "es" ? "Premio del Público · 2024" : "Audience Award · 2024"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                {language === "es"
                  ? "Mejor Cortometraje — Festival de Cine de Miami"
                  : "Best Short Film — Miami Film Festival"}
              </h2>
            </div>
          </div>
        </motion.section>

        {/* ===== BEHIND THE FILM ===== */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">
            {language === "es" ? "Detrás de la película" : "Behind the Film"}
          </motion.h2>
          <div className="grid lg:grid-cols-[1.5fr_0.75fr] gap-10 items-start">
            <motion.div variants={fadeUp} className="space-y-5 text-base leading-relaxed text-foreground/85">
              {language === "es" ? (
                <>
                  <p>
                    <em>Objetos de Deseo</em> nació del miedo y de una apuesta creativa: encontrar una historia contundente que pudiera realizarse con un presupuesto limitado sin sacrificar ambición cinematográfica. Inspirada en el relato <em>Una oferta razonable</em>, de JLS Noya, la película convierte un dilema moral íntimo en una tragedia contemporánea sobre deseo, dinero, vulnerabilidad y supervivencia.
                  </p>
                  <p>
                    Rodada en Miami durante tres noches con un equipo pequeño, la película evita deliberadamente la postal luminosa de la ciudad. Su fotografía busca otra Miami: fría, húmeda, silenciosa y cubierta de sombras; un paisaje noir donde los intereses materiales pesan más que las relaciones humanas.
                  </p>
                  <p>
                    La dirección de actores se construyó alrededor de la tensa intimidad entre Mauricio Rentería y Alex Cowley. Sus interpretaciones recibieron reconocimiento internacional, mientras que la película obtuvo premios y selecciones por su cinematografía, actuaciones y lenguaje visual.
                  </p>
                  <p>
                    Dedicada a la memoria de Pedro Rentería, la obra también conecta con una familia de artistas y con la convicción de que hacer cine implica honrar de dónde venimos mientras buscamos una voz propia.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <em>Objetos de Deseo</em> began with fear and a creative wager: to find a forceful story that could be made with limited resources without sacrificing cinematic ambition. Inspired by JLS Noya’s short story <em>Una oferta razonable</em>, the film turns an intimate moral dilemma into a contemporary tragedy about desire, money, vulnerability, and survival.
                  </p>
                  <p>
                    Shot in Miami over three nights with a small crew, the film deliberately avoids the city’s familiar sunlit postcard. Its cinematography searches for another Miami—cold, humid, quiet, and covered in shadow; a noir landscape where material interests outweigh human connection.
                  </p>
                  <p>
                    The performance direction centers on the tense intimacy between Mauricio Rentería and Alex Cowley. Their work earned international recognition, while the film received awards and selections for its cinematography, performances, and visual language.
                  </p>
                  <p>
                    Dedicated to the memory of Pedro Rentería, the film also reflects a family of artists and a conviction that making cinema means honoring where we come from while searching for a voice of our own.
                  </p>
                </>
              )}
            </motion.div>
            <motion.blockquote variants={fadeUp} className="border-l-2 border-primary pl-6 py-2">
              <Quote size={22} className="text-primary mb-4" />
              <p className="text-xl md:text-2xl leading-snug italic" style={{ fontFamily: "var(--font-display)" }}>
                {language === "es"
                  ? "Miami es grande; hay mucho espacio donde el sol no da, y estas historias se nutren de la humedad de lo sórdido."
                  : "Miami is vast; there is plenty of space where the sun does not reach, and these stories draw nourishment from the humidity of the sordid."}
              </p>
              <footer className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-5">
                Alejandro Rentería · Diario Las Américas
              </footer>
            </motion.blockquote>
          </div>
        </motion.section>

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

        {/* ===== PRESS & COVERAGE ===== */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <Newspaper size={16} className="text-primary" />
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
              {language === "es" ? "Prensa y cobertura" : "Press & Coverage"}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pressCoverage.map((article) => (
              <motion.a
                key={article.url}
                variants={fadeUp}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border border-border p-5 rounded-sm hover:border-primary/50 hover:-translate-y-0.5 transition-all flex flex-col min-h-52"
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary mb-3">
                  {article.outlet}
                </div>
                <h3 className="font-semibold leading-snug mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground mb-5">
                  {language === "es" ? article.descriptionES : article.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-xs font-mono text-foreground">
                  {language === "es" ? "Leer cobertura" : "Read coverage"} <ExternalLink size={12} />
                </span>
              </motion.a>
            ))}
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
            src={POSTER_URL}
            alt="Objetos de Deseo - Official Poster"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
