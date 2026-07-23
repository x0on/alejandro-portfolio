import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BioModal from "@/components/BioModal";
import TypingAnimation from "@/components/TypingAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ASSETS, hero, films, book, pressArticles, interviews, socialLinks,
  contact, experience, clients, filmography, commercialWork, selectedCommercialProjects, photographyCategories,
  software, about,
} from "@/data/content";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink, Download, ChevronDown, ChevronUp, Play,
  Award, Calendar, Clock, Globe, Film, BookOpen, Mail,
  MapPin, Quote, Star, Clapperboard, Copy, Check, Camera, Monitor, Zap
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className={`scroll-mt-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-mono text-muted-foreground tracking-widest">{number}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
    </div>
  );
}

function Newspaper({ size, className }: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
    </svg>
  );
}

// Map film titles to translation keys for descriptions
const filmDescKeys: Record<string, string> = {
  "Objetos de Deseo \u2013 La Navaja": "film.objetosDeDeseo.description",
  "Entre Amores": "film.entreAmores.description",
  "Mismatch Made in Heaven": "film.mismatchMadeInHeaven.description",
  "Reaching the Sea": "film.reachingTheSea.description",
};

const filmStatementKeys: Record<string, string> = {
  "Objetos de Deseo \u2013 La Navaja": "film.objetosDeDeseo.directorStatement",
};

// Map stat labels to translation keys
const statKeys: Record<string, string> = {
  "Years Experience": "hero.stat.yearsExperience",
  "Projects Produced": "hero.stat.projectsProduced",
  "National Campaigns": "hero.stat.nationalCampaigns",
  "Film Festival Awards": "hero.stat.filmFestivalAwards",
};

export default function Home() {
  const [bioOpen, setBioOpen] = useState(false);
  const [expandedPress, setExpandedPress] = useState<string | null>(null);
  const [showAllFilmography, setShowAllFilmography] = useState(false);
  const [expandedFilm, setExpandedFilm] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [commercialOpen, setCommercialOpen] = useState(false);
  const [activePhotoCategory, setActivePhotoCategory] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const { t, language } = useLanguage();

  // Build a map of detailed films by title for quick lookup
  const filmDetailMap = new Map(films.map(f => [f.title, f]));
  const featuredFilm = films.find(f => f.link === "/objetos-de-deseo") || films[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Sidebar />
      <BioModal open={bioOpen} onClose={() => setBioOpen(false)} />

      <main className="lg:ml-56 pt-14">
        {/* ===== HERO ===== */}
        <Section id="hero" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background" />
          <div className="relative container py-20 md:py-32">
            <div className="max-w-3xl">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-xs font-mono tracking-[0.3em] text-primary mb-4 uppercase">{t("hero.tagLabel")}</p>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
                    {hero.name}
                  </h1>
                  <div className="text-base md:text-lg text-muted-foreground mt-4 tracking-wide h-8">
                    <TypingAnimation />
                  </div>
                  <p className="text-sm text-muted-foreground/80 mt-3 max-w-xl leading-relaxed">
                    {t("hero.tagline")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-wrap gap-3 mt-8"
                >
                  {hero.stats.map(s => (
                    <div key={s.label} className="bg-card border border-border px-4 py-2.5 rounded-sm">
                      <div className="text-xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
                      <div className="text-xs text-muted-foreground font-mono">{t(statKeys[s.label] || s.label)}</div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-3 mt-6"
                >
                  <button
                    onClick={() => setBioOpen(true)}
                    className="px-5 py-2.5 text-sm bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity font-medium"
                  >
                    {t("hero.copyBio")}
                  </button>
                  <a href="#press" className="px-5 py-2.5 text-sm border border-border text-foreground rounded-sm hover:bg-secondary transition-colors font-medium">
                    {t("hero.viewPress")}
                  </a>
                  <a href="/media-kit" className="px-5 py-2.5 text-sm border border-border text-foreground rounded-sm hover:bg-secondary transition-colors font-medium">
                    {t("hero.mediaKit")}
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== ABOUT ===== */}
        <Section id="about" className="container py-16 md:py-24">
          <SectionTitle number="01" title={t("section.about")} subtitle={t("section.about.subtitle")} />
          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-3 space-y-5">
              <p className="text-base leading-relaxed">{t("about.fullBio")}</p>
              <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground text-sm leading-relaxed">
                &ldquo;{t("about.identity")}&rdquo;
              </blockquote>

              <div className="mt-6 bg-card border border-border p-5 rounded-sm">
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">{t("about.currentExploration")}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("about.aiExploration")}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">{t("about.education")}</h3>
                <div className="space-y-2">
                  {about.education.map(e => (
                    <div key={e.degree} className="flex items-start gap-2 text-sm">
                      <Star size={14} className="text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">{e.degree}</span>
                        <span className="text-muted-foreground"> — {e.school}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">{t("about.coreSkills")}</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "skill.proposalPresentation", "skill.strategicWriting", "skill.awardSubmissions",
                    "skill.publicRelations", "skill.brandVisual", "skill.stakeholder",
                    "skill.videoProduction", "skill.adobeSuite", "skill.aiPipelines", "skill.webDev"
                  ].map(key => (
                    <span key={key} className="text-xs px-2.5 py-1 bg-secondary text-secondary-foreground rounded-sm">
                      {t(key)}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">{t("about.testimonials")}</h3>
                <div className="space-y-4">
                  {about.testimonials.map((testimonial, i) => (
                    <div key={i} className="bg-card border border-border p-4 rounded-sm">
                      <Quote size={16} className="text-primary mb-2" />
                      <p className="text-sm italic leading-relaxed">&ldquo;{t(`testimonial.${i}.quote`)}&rdquo;</p>
                      <p className="text-xs text-muted-foreground mt-2 font-mono">— {t(`testimonial.${i}.source`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== BOOK ===== */}
        <Section id="book" className="container py-16 md:py-24">
          <SectionTitle number="02" title={t("section.book")} subtitle={t("section.book.subtitle")} />
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2">
              <img
                src={ASSETS.manuscript}
                alt="Conversations with the Machine"
                className="w-full rounded-sm border border-border shadow-lg"
              />
            </div>
            <div className="md:col-span-3 space-y-4">
              <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                {book.title}
              </h3>
              <p className="text-sm leading-relaxed">{t("book.description")}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={book.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity font-medium"
                >
                  <Download size={16} /> {t("book.downloadPdf")}
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== SOFTWARE ===== */}
        <Section id="software" className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="relative container py-16 md:py-24">
            <SectionTitle number="03" title={t("section.software")} subtitle={t("section.software.subtitle")} />
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <a href="https://storytown.us" target="_blank" rel="noopener noreferrer" className="group block">
                <img
                  src={software.screenshot}
                  alt="Story Town"
                  className="w-full rounded-sm border border-border shadow-xl group-hover:border-primary/50 transition-colors"
                />
              </a>
              <div className="space-y-5">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {software.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mt-1 italic">{software.tagline}</p>
                  <a
                    href="https://storytown.us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-primary hover:underline"
                  >
                    {t("software.visitApp")} <ExternalLink size={14} />
                  </a>
                </div>
                <blockquote className="border-l-2 border-primary pl-4 text-sm leading-relaxed">
                  {t("software.elevator")}
                </blockquote>
                <div className="space-y-3">
                  {t("software.description").split('\n\n').map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed text-muted-foreground">{para}</p>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Zap size={14} /> {t("software.keyTechnology")}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t("software.keyTechnologyIntro")}</p>
                  {software.features.map((f, i) => (
                    <div key={i} className="bg-card border border-border p-3 rounded-sm">
                      <div className="text-sm font-medium">{t(`software.feature.${["narrativeToVisual", "modelAgnostic", "cinematicMotion", "continuityIntelligence"][i]}`)}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t(`software.feature.${["narrativeToVisual", "modelAgnostic", "cinematicMotion", "continuityIntelligence"][i]}.desc`)}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-card border border-border p-4 rounded-sm">
                  <div className="text-xs font-mono text-muted-foreground mb-1">{t("software.techStack").toUpperCase()}</div>
                  <div className="space-y-2">
                    {t("software.techStackDesc").split("\n\n").map((paragraph, i) => (
                      <p key={i} className="text-xs leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== FILMS ===== */}
        <Section id="films" className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-background" />
          <div className="relative container py-16 md:py-24">
            <SectionTitle number="04" title={t("section.films")} subtitle={t("section.films.subtitle")} />

            {/* Unified Filmography List */}
            <div className="border border-border rounded-sm overflow-hidden">
              {(showAllFilmography ? filmography : filmography.slice(0, 6)).map((entry, i) => {
                const detail = filmDetailMap.get(entry.title);
                const isExpanded = expandedFilm === entry.title;
                const isFeatured = detail?.featured;

                return (
                  <div key={i} className={`${i > 0 ? 'border-t border-border' : ''}`}>
                    {/* Row */}
                    <div
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                        detail ? 'cursor-pointer hover:bg-secondary/30' : 'hover:bg-secondary/10'
                      } ${isExpanded ? 'bg-secondary/20' : ''}`}
                      onClick={() => detail && setExpandedFilm(isExpanded ? null : entry.title)}
                      role={detail ? 'button' : undefined}
                    >
                      <span className="text-xs font-mono text-muted-foreground w-10 shrink-0">{entry.year}</span>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {detail && <Film size={14} className="text-primary shrink-0" />}
                        <span className={`text-sm truncate ${detail ? 'font-medium' : ''}`}>{entry.title}</span>
                        {isFeatured && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-sm font-mono uppercase shrink-0">{t("films.awardWinner")}</span>
                        )}
                        {(entry as any).pdf && (
                          <a href={(entry as any).pdf} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="inline-flex items-center gap-1 text-xs text-primary hover:underline shrink-0">
                            <Download size={11} /> PDF
                          </a>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground hidden sm:block w-48 truncate text-right">{entry.role}</span>
                      <span className="text-xs text-muted-foreground hidden md:block w-20 text-right">{entry.type}</span>
                      {detail ? (
                        <span className="w-5 shrink-0 text-muted-foreground">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      ) : (
                        <span className="w-5 shrink-0" />
                      )}
                    </div>

                    {/* Expanded Detail */}
                    {detail && isExpanded && (
                      <div className="border-t border-border bg-card/50 px-5 py-5">
                        {isFeatured ? (
                          <div className="grid md:grid-cols-5 gap-8">
                            <div className="md:col-span-3 space-y-4">
                              <p className="text-sm leading-relaxed">{filmDescKeys[detail.title] ? t(filmDescKeys[detail.title]) : detail.description}</p>
                              {detail.directorStatement && (
                                <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground text-sm leading-relaxed">
                                  &ldquo;{filmStatementKeys[detail.title] ? t(filmStatementKeys[detail.title]) : detail.directorStatement}&rdquo;
                                  <span className="block mt-1 not-italic font-mono text-xs">— {t("about.directorsStatement")}</span>
                                </blockquote>
                              )}
                              {detail.runtime && (
                                <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
                                  <span className="flex items-center gap-1"><Clock size={12} /> {detail.runtime}</span>
                                  {detail.language && <span className="flex items-center gap-1"><Globe size={12} /> {detail.language}</span>}
                                  {detail.format && <span className="flex items-center gap-1"><Film size={12} /> {detail.format}</span>}
                                </div>
                              )}
                              {detail.genres && (
                                <div className="flex flex-wrap gap-2">
                                  {detail.genres.map(g => (
                                    <span key={g} className="text-xs px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-sm">{g}</span>
                                  ))}
                                </div>
                              )}
                              {detail.link && detail.link.startsWith('/') && (
                                <a href={detail.link} className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                                  <Film size={14} /> {t("films.viewFullFilmPage")}
                                </a>
                              )}
                            </div>
                            <div className="md:col-span-2 space-y-4">
                              {detail.awards && (
                                <div>
                                  <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                    <Award size={14} /> {t("films.awardsSelections")}
                                  </h4>
                                  <div className="space-y-2">
                                    {detail.awards.map((a, ai) => (
                                      <div key={ai} className="bg-background/50 border border-border p-3 rounded-sm">
                                        <div className="text-sm font-medium">{a.award}</div>
                                        <div className="text-xs text-muted-foreground font-mono">{a.festival}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {detail.cast && (
                                <div>
                                  <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">{t("films.cast")}</h4>
                                  <div className="space-y-1">
                                    {detail.cast.map(c => (
                                      <div key={c.name} className="flex justify-between text-sm">
                                        <span className="font-medium">{c.name}</span>
                                        <span className="text-muted-foreground">{c.role}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="grid md:grid-cols-5 gap-6">
                            <div className="md:col-span-3 space-y-3">
                              {detail.description && <p className="text-sm leading-relaxed">{filmDescKeys[detail.title] ? t(filmDescKeys[detail.title]) : detail.description}</p>}
                              {(detail as any).runtime && (
                                <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
                                  <span className="flex items-center gap-1"><Clock size={12} /> {(detail as any).runtime}</span>
                                  {(detail as any).language && <span className="flex items-center gap-1"><Globe size={12} /> {(detail as any).language}</span>}
                                </div>
                              )}
                              {(detail as any).genres && (
                                <div className="flex flex-wrap gap-2">
                                  {(detail as any).genres.map((g: string) => (
                                    <span key={g} className="text-xs px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-sm">{g}</span>
                                  ))}
                                </div>
                              )}
                              {(detail as any).imdb && (
                                <a href={(detail as any).imdb} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                                  <ExternalLink size={14} /> {t("films.viewOnImdb")}
                                </a>
                              )}
                            </div>
                            {(detail as any).cast && (
                              <div className="md:col-span-2">
                                <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">{t("films.castCrew")}</h4>
                                <div className="space-y-1">
                                  {(detail as any).cast.map((c: any) => (
                                    <div key={c.name} className="flex justify-between text-sm">
                                      <span className="font-medium">{c.name}</span>
                                      <span className="text-muted-foreground">{c.role}</span>
                                    </div>
                                  ))}
                                </div>
                                {(detail as any).crew && (
                                  <div className="mt-3 pt-3 border-t border-border space-y-1">
                                    {Object.entries((detail as any).crew).map(([role, name]: [string, any]) => (
                                      <div key={role} className="flex justify-between text-sm">
                                        <span className="text-muted-foreground capitalize">{role}</span>
                                        <span className="font-medium">{name}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {filmography.length > 6 && (
                <button
                  onClick={() => setShowAllFilmography(!showAllFilmography)}
                  className="w-full px-4 py-2.5 text-xs text-muted-foreground hover:text-primary transition-colors border-t border-border font-mono"
                >
                  {showAllFilmography ? t("films.showLess") : `${t("films.showAll")} (${filmography.length})`}
                </button>
              )}
            </div>
          </div>
        </Section>

        {/* ===== COMMERCIAL WORK ===== */}
        <Section id="commercial" className="container py-16 md:py-24">
          {/* Mobile: collapsible header */}
          <div className="md:hidden">
            <button
              onClick={() => setCommercialOpen(!commercialOpen)}
              className="w-full flex items-center justify-between mb-6"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-muted-foreground tracking-widest">05</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-left" style={{ fontFamily: "var(--font-display)" }}>
                  {t("section.commercial")}
                </h2>
                <p className="text-muted-foreground mt-1 text-sm text-left">{t("section.commercial.subtitle")}</p>
              </div>
              <div className="shrink-0 ml-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                {commercialOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>
          </div>
          {/* Desktop: always visible header */}
          <div className="hidden md:block">
            <SectionTitle number="05" title={t("section.commercial")} subtitle={t("section.commercial.subtitle")} />
          </div>

          <div className={`${commercialOpen ? 'block' : 'hidden'} md:block`}>
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
              <div>
                <p className="text-base md:text-lg leading-relaxed text-foreground/85 max-w-3xl">
                  {language === "es"
                    ? "Como fundador de Thinking Monkeys Films, Alejandro ha dirigido, producido, filmado y editado campañas nacionales, contenido de marca, música, televisión y comunicaciones institucionales. Su trabajo combina criterio cinematográfico con ejecución práctica, desde el concepto y la dirección de talento hasta la postproducción y la entrega final."
                    : "As founder of Thinking Monkeys Films, Alejandro has directed, produced, shot, and edited national campaigns, branded content, music, television, and institutional communications. His work combines cinematic judgment with practical execution—from concept and talent direction through post-production and final delivery."}
                </p>
                <div className="grid sm:grid-cols-3 gap-3 mt-7">
                  {[
                    ["900+", language === "es" ? "proyectos realizados" : "projects delivered"],
                    ["30+", language === "es" ? "campañas nacionales" : "national campaigns"],
                    ["15+", language === "es" ? "años de experiencia" : "years of experience"],
                  ].map(([value, label]) => (
                    <div key={value} className="bg-card border border-border p-4 rounded-sm">
                      <div className="text-2xl font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-7">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                    {language === "es" ? "Dirección y ejecución" : "Direction & Execution"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(language === "es"
                      ? ["Dirección creativa", "Dirección de talento", "Cinematografía", "Edición", "Producción ejecutiva", "Postproducción", "Contenido bilingüe"]
                      : ["Creative direction", "Talent direction", "Cinematography", "Editing", "Executive production", "Post-production", "Bilingual content"]
                    ).map((skill) => (
                      <span key={skill} className="text-xs px-3 py-1.5 bg-secondary text-secondary-foreground border border-border rounded-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border p-5 md:p-6 rounded-sm">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  {language === "es" ? "Clientes seleccionados" : "Selected Clients"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {clients.map((client) => (
                    <span key={client} className="text-sm px-3 py-2 bg-background border border-border rounded-sm">
                      {client}
                    </span>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {language === "es"
                      ? "El archivo comercial se está restaurando progresivamente. Hay selecciones adicionales y reels privados disponibles para conversaciones profesionales."
                      : "The commercial archive is being progressively restored. Additional selections and private reels are available for professional conversations."}
                  </p>
                  <a href="mailto:ale@thinkingmonkeys.us?subject=Private%20Commercial%20Reel%20Request" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    {language === "es" ? "Solicitar reel privado" : "Request private reel"} <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="flex items-center gap-3 mb-5">
                <h3 className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
                  {language === "es" ? "Archivo de proyectos seleccionados" : "Selected Project Archive"}
                </h3>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="border border-border rounded-sm overflow-hidden bg-card">
                {selectedCommercialProjects.map((project, index) => (
                  <div
                    key={`${project.year}-${project.project}`}
                    className={`grid grid-cols-[52px_1fr] md:grid-cols-[64px_1.25fr_0.9fr_1fr] gap-x-4 gap-y-1 px-4 py-4 ${
                      index !== selectedCommercialProjects.length - 1 ? "border-b border-border" : ""
                    } hover:bg-secondary/20 transition-colors`}
                  >
                    <div className="text-xs font-mono text-primary pt-0.5">{project.year}</div>
                    <div className="text-sm font-medium">{project.project}</div>
                    <div className="text-xs md:text-sm text-muted-foreground col-start-2 md:col-start-auto">{project.client}</div>
                    <div className="text-xs md:text-sm text-muted-foreground col-start-2 md:col-start-auto">
                      {language === "es" ? project.roleES : project.role}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                {language === "es"
                  ? "Selección del archivo de Thinking Monkeys Films. Se incorporarán enlaces de reproducción a medida que se restauren los masters."
                  : "A selection from the Thinking Monkeys Films archive. Playable links will be added as masters are restored."}
              </p>
            </div>

            {commercialWork.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {commercialWork.map((item, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-sm border border-border bg-card">
                    <div className="aspect-video relative bg-black">
                      {playingVideo === i ? (
                        <video src={item.url} controls autoPlay className="w-full h-full object-contain" />
                      ) : (
                        <button onClick={() => setPlayingVideo(i)} className="w-full h-full relative group/play">
                          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/30 group-hover/play:bg-black/50 transition-all flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover/play:scale-110 transition-transform">
                              <Play size={24} className="text-black ml-1" />
                            </div>
                          </div>
                        </button>
                      )}
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div className="text-sm font-medium">{item.title}</div>
                      <span className="text-[10px] px-2 py-0.5 bg-secondary text-secondary-foreground rounded-sm font-mono">{item.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* ===== PHOTOGRAPHY ===== */}
        <Section id="photography" className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
          <div className="relative container py-16 md:py-24">
            <SectionTitle number="06" title={t("section.photography")} subtitle={t("section.photography.subtitle")} />

            {/* Categories remain visible; photographs appear only after a visitor makes a choice. */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActivePhotoCategory("all")}
                className={`px-3 py-1.5 text-xs font-mono rounded-sm border transition-all ${
                  activePhotoCategory === "all"
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground border-border hover:border-primary/50'
                }`}
              >
                {t("photography.all")}
              </button>
              {photographyCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActivePhotoCategory(cat.name)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-sm border transition-all ${
                    activePhotoCategory === cat.name
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-muted-foreground border-border hover:border-primary/50'
                  }`}
                >
                  {t(`photo.${cat.name}`)}
                </button>
              ))}
            </div>

            {activePhotoCategory && (
              <>
              {/* Photo grid */}
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                {(activePhotoCategory !== "all"
                  ? photographyCategories.filter(c => c.name === activePhotoCategory)
                  : photographyCategories
                ).flatMap(cat =>
                  cat.images.slice(0, activePhotoCategory === "all" ? 4 : undefined).map((img, i) => (
                    <div
                      key={`${cat.name}-${i}`}
                      className="break-inside-avoid group relative overflow-hidden rounded-sm border border-border cursor-pointer"
                      onClick={() => setLightboxImage(img)}
                    >
                      <img
                        src={img}
                        alt={`${cat.name} photography by Alejandro Renteria`}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                        <span className="text-white text-[10px] font-mono px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {t(`photo.${cat.name}`)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Lightbox */}
              {lightboxImage && (
                <div
                  className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
                  onClick={() => setLightboxImage(null)}
                >
                  <img
                    src={lightboxImage}
                    alt="Photography by Alejandro Renteria"
                    className="max-w-full max-h-[90vh] object-contain rounded"
                  />
                  <button
                    className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-mono"
                    onClick={() => setLightboxImage(null)}
                  >
                    ×
                  </button>
                </div>
              )}
              </>
            )}
          </div>
        </Section>

        {/* ===== PRESS COVERAGE ===== */}
        <Section id="press" className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
          <div className="relative container py-16 md:py-24">
            <SectionTitle number="07" title={t("section.press")} subtitle={t("section.press.subtitle")} />
            <div className="space-y-4">
              {pressArticles.map(cat => (
                <div key={cat.category} className="border border-border rounded-sm overflow-hidden">
                  <button
                    onClick={() => setExpandedPress(expandedPress === cat.category ? null : cat.category)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-card hover:bg-secondary/30 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Newspaper size={18} className="text-primary" />
                      <span className="font-medium">{t(`pressCategory.${cat.category}`)}</span>
                      <span className="text-xs text-muted-foreground font-mono">({cat.articles.length})</span>
                    </div>
                    {expandedPress === cat.category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedPress === cat.category && (
                    <div className="border-t border-border divide-y divide-border">
                      {cat.articles.map((a, i) => (
                        <a
                          key={i}
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-4 px-5 py-4 hover:bg-secondary/20 transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium group-hover:text-primary transition-colors">{a.title}</div>
                            <div className="text-xs text-muted-foreground font-mono mt-0.5">{a.source}</div>
                            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{a.excerpt}</p>
                          </div>
                          <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary mt-1 shrink-0" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ===== INTERVIEWS ===== */}
        <Section id="interviews" className="container py-16 md:py-24">
          <SectionTitle number="08" title={t("section.interviews")} subtitle={t("section.interviews.subtitle")} />
          <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-6 mb-10">
            <div className="border-l-2 border-primary pl-6 py-2">
              <h3 className="text-2xl md:text-3xl font-bold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                {language === "es" ? "Detrás de la cámara. Frente a la audiencia." : "Behind the camera. In front of the audience."}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {language === "es"
                ? "Alejandro aporta más que dirección y producción: es un comunicador bilingüe con presencia pública, experiencia en entrevistas y la capacidad de representar una película, una campaña o una compañía ante audiencias, medios y colaboradores."
                : "Alejandro brings more than direction and production: he is a bilingual communicator with an assured public presence, interview experience, and the ability to represent a film, campaign, or company before audiences, media, and creative partners."}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-sm border border-border"
              >
                <div className="aspect-video relative">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={40} className="text-white" />
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground font-mono capitalize">{item.type}</div>
                </div>
              </a>
            ))}
          </div>

        </Section>

        {/* ===== EXPERIENCE ===== */}
        <Section id="experience" className="container py-16 md:py-24">
          <SectionTitle number="09" title={t("section.experience")} subtitle={t("section.experience.subtitle")} />
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i} className="bg-card border border-border p-5 rounded-sm">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>{t(`exp.${i}.role`)}</h3>
                    <p className="text-sm text-primary font-medium">{t(`exp.${i}.company`)}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <Calendar size={12} /> {t(`exp.${i}.period`)}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {exp.highlights.map((_h, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1.5 shrink-0 w-1 h-1 rounded-full bg-primary" />
                      {t(`exp.${i}.h${j}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Selected Clients */}
          <div className="mt-10">
            <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">{t("experience.selectedClients")}</h3>
            <div className="flex flex-wrap gap-2">
              {clients.map(c => (
                <span key={c} className="text-xs px-3 py-1.5 bg-secondary text-secondary-foreground rounded-sm border border-border">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* ===== SOCIAL & CONTACT ===== */}
        <Section id="social" className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-background to-background" />
          <div className="relative container py-16 md:py-24">
            <SectionTitle number="10" title={t("section.connect")} subtitle={t("section.connect.subtitle")} />
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">{t("connect.socialProfiles")}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map(s => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-card border border-border p-3 rounded-sm hover:border-primary/50 hover:bg-secondary/30 transition-colors group"
                    >
                      <Globe size={18} className="text-muted-foreground group-hover:text-primary" />
                      <span className="text-sm font-medium">{s.platform}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">{t("connect.contact")}</h3>
                <div className="bg-card border border-border p-5 rounded-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-primary" />
                    <a href={`mailto:${contact.email}`} className="text-sm hover:text-primary transition-colors">{contact.email}</a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-primary" />
                    <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">{contact.website}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-primary" />
                    <span className="text-sm">{t("connect.bilingual")}: {contact.languages.join(" & ")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== FOOTER ===== */}
        <footer className="border-t border-border py-8">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <img src={ASSETS.logomark} alt="AR" className="h-5 w-5 object-contain opacity-60" />
              <span>&copy; {new Date().getFullYear()} Alejandro Renteria. {t("footer.allRights")}</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.imdb.com/name/nm2828446/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IMDb</a>
              <a href="https://www.linkedin.com/in/alejandro-renteria-490a2a15/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">Email</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
