import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BioModal from "@/components/BioModal";
import TypingAnimation from "@/components/TypingAnimation";
import {
  ASSETS, hero, about, films, book, pressArticles, interviews, socialLinks,
  contact, experience, clients, filmography, commercialWork, photographyCategories,
  software,
} from "@/data/content";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink, Download, ChevronDown, ChevronUp, Play,
  Award, Calendar, Clock, Globe, Film, BookOpen, Mail, Phone,
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

export default function Home() {
  const [bioOpen, setBioOpen] = useState(false);
  const [expandedPress, setExpandedPress] = useState<string | null>(null);
  const [showAllFilmography, setShowAllFilmography] = useState(false);
  const [expandedFilm, setExpandedFilm] = useState<number | null>(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [commercialOpen, setCommercialOpen] = useState(false);
  const [photographyOpen, setPhotographyOpen] = useState(false);
  const [activePhotoCategory, setActivePhotoCategory] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const featuredFilm = films[0];

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
                  <p className="text-xs font-mono tracking-[0.3em] text-primary mb-4 uppercase">Press Kit</p>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
                    {hero.name}
                  </h1>
                  <div className="text-base md:text-lg text-muted-foreground mt-4 tracking-wide h-8">
                    <TypingAnimation />
                  </div>
                  <p className="text-sm text-muted-foreground/80 mt-3 max-w-xl leading-relaxed">
                    {hero.tagline}
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
                      <div className="text-xs text-muted-foreground font-mono">{s.label}</div>
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
                    Copy Bio
                  </button>
                  <a href="#press" className="px-5 py-2.5 text-sm border border-border text-foreground rounded-sm hover:bg-secondary transition-colors font-medium">
                    View Press
                  </a>
                  <a href="/media-kit" className="px-5 py-2.5 text-sm border border-border text-foreground rounded-sm hover:bg-secondary transition-colors font-medium">
                    Media Kit
                  </a>
                </motion.div>
              </div>


            </div>
          </div>
        </Section>

        {/* ===== ABOUT ===== */}
        <Section id="about" className="container py-16 md:py-24">
          <SectionTitle number="01" title="About" subtitle="Background & Philosophy" />
          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-3 space-y-5">
              <p className="text-base leading-relaxed">{about.fullBio}</p>
              <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground text-sm leading-relaxed">
                "{about.identity}"
              </blockquote>

              <div className="mt-6 bg-card border border-border p-5 rounded-sm">
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">Current Exploration: AI & Cinema</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {about.aiExploration}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">Education</h3>
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
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {about.skills.map(s => (
                    <span key={s} className="text-xs px-2.5 py-1 bg-secondary text-secondary-foreground rounded-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">Testimonials</h3>
                <div className="space-y-4">
                  {about.testimonials.map((t, i) => (
                    <div key={i} className="bg-card border border-border p-4 rounded-sm">
                      <Quote size={16} className="text-primary mb-2" />
                      <p className="text-sm italic leading-relaxed">"{t.quote}"</p>
                      <p className="text-xs text-muted-foreground mt-2 font-mono">— {t.source}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== BOOK ===== */}
        <Section id="book" className="container py-16 md:py-24">
          <SectionTitle number="02" title="Book" subtitle="Published Work" />
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
              <p className="text-sm leading-relaxed">{book.description}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={book.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity font-medium"
                >
                  <Download size={16} /> Download PDF
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== SOFTWARE ===== */}
        <Section id="software" className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="relative container py-16 md:py-24">
            <SectionTitle number="03" title="Software" subtitle="AI-Driven Creative Tools" />
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <img
                  src={software.screenshot}
                  alt="Story Town"
                  className="w-full rounded-sm border border-border shadow-xl"
                />
              </div>
              <div className="space-y-5">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {software.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mt-1 italic">{software.tagline}</p>
                </div>
                <blockquote className="border-l-2 border-primary pl-4 text-sm leading-relaxed">
                  {software.elevator}
                </blockquote>
                <div className="space-y-3">
                  {software.description.split('\n\n').map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed text-muted-foreground">{para}</p>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Zap size={14} /> Key Technology
                  </h4>
                  {software.features.map((f, i) => (
                    <div key={i} className="bg-card border border-border p-3 rounded-sm">
                      <div className="text-sm font-medium">{f.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-card border border-border p-4 rounded-sm">
                  <div className="text-xs font-mono text-muted-foreground mb-1">TECH STACK</div>
                  <p className="text-xs leading-relaxed">{software.techStack}</p>
                </div>

                {software.market && (
                  <div className="text-xs font-mono text-muted-foreground">
                    Market: {software.market}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* ===== FILMS ===== */}
        <Section id="films" className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-background" />
          <div className="relative container py-16 md:py-24">
            <SectionTitle number="04" title="Films" subtitle="Short Films & Narrative Work" />

            {/* Film Cards */}
            <div className="space-y-4">
              {films.map((film, idx) => (
                <div key={idx} className="bg-card border border-border rounded-sm overflow-hidden">
                  <button
                    onClick={() => setExpandedFilm(expandedFilm === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/30 transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <Film size={18} className="text-primary shrink-0" />
                      <div>
                        <span className="font-medium">{film.title}</span>
                        <span className="text-xs text-muted-foreground font-mono ml-2">({film.year})</span>
                      </div>
                      {film.featured && (
                        <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-sm font-mono uppercase">Award Winner</span>
                      )}
                    </div>
                    {expandedFilm === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {expandedFilm === idx && (
                    <div className="border-t border-border px-5 py-5">
                      {film.featured && featuredFilm ? (
                        <div className="grid md:grid-cols-5 gap-8">
                          <div className="md:col-span-3 space-y-4">
                            <p className="text-sm leading-relaxed">{film.description}</p>
                            {film.directorStatement && (
                              <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground text-sm leading-relaxed">
                                "{film.directorStatement}"
                                <span className="block mt-1 not-italic font-mono text-xs">— Director's Statement</span>
                              </blockquote>
                            )}
                            {film.runtime && (
                              <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
                                <span className="flex items-center gap-1"><Clock size={12} /> {film.runtime}</span>
                                {film.language && <span className="flex items-center gap-1"><Globe size={12} /> {film.language}</span>}
                                {film.format && <span className="flex items-center gap-1"><Film size={12} /> {film.format}</span>}
                              </div>
                            )}
                            {film.genres && (
                              <div className="flex flex-wrap gap-2">
                                {film.genres.map(g => (
                                  <span key={g} className="text-xs px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-sm">{g}</span>
                                ))}
                              </div>
                            )}
                            {film.link && (
                              film.link.startsWith('/') ? (
                                <a href={film.link} className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                                  <Film size={14} /> View Full Film Page
                                </a>
                              ) : (
                                <a href={film.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                                  <ExternalLink size={14} /> View Film Page
                                </a>
                              )
                            )}
                          </div>
                          <div className="md:col-span-2 space-y-4">
                            {film.awards && (
                              <div>
                                <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                  <Award size={14} /> Awards & Selections
                                </h4>
                                <div className="space-y-2">
                                  {film.awards.map((a, i) => (
                                    <div key={i} className="bg-background/50 border border-border p-3 rounded-sm">
                                      <div className="text-sm font-medium">{a.award}</div>
                                      <div className="text-xs text-muted-foreground font-mono">{a.festival}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {film.cast && (
                              <div>
                                <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">Cast</h4>
                                <div className="space-y-1">
                                  {film.cast.map(c => (
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
                        <div className="space-y-3">
                          {film.description && <p className="text-sm leading-relaxed">{film.description}</p>}
                          {film.link && (
                            film.link.startsWith('/') ? (
                              <a href={film.link} className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                                <Film size={14} /> View Full Film Page
                              </a>
                            ) : (
                              <a href={film.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                                <ExternalLink size={14} /> View on Website
                              </a>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Filmography Table */}
            <div className="mt-12">
              <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <Clapperboard size={14} /> Complete Filmography (IMDb)
              </h3>
              <div className="border border-border rounded-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/30 text-left">
                      <th className="px-4 py-2.5 font-mono text-xs text-muted-foreground">Year</th>
                      <th className="px-4 py-2.5 font-mono text-xs text-muted-foreground">Title</th>
                      <th className="px-4 py-2.5 font-mono text-xs text-muted-foreground hidden sm:table-cell">Role</th>
                      <th className="px-4 py-2.5 font-mono text-xs text-muted-foreground hidden md:table-cell">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {(showAllFilmography ? filmography : filmography.slice(0, 5)).map((f, i) => (
                      <tr key={i} className="hover:bg-secondary/20 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-muted-foreground">{f.year}</td>
                        <td className="px-4 py-2.5 font-medium">{f.title}</td>
                        <td className="px-4 py-2.5 text-muted-foreground hidden sm:table-cell">{f.role}</td>
                        <td className="px-4 py-2.5 text-muted-foreground hidden md:table-cell">{f.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filmography.length > 5 && (
                  <button
                    onClick={() => setShowAllFilmography(!showAllFilmography)}
                    className="w-full px-4 py-2.5 text-xs text-muted-foreground hover:text-primary transition-colors border-t border-border font-mono"
                  >
                    {showAllFilmography ? "Show Less" : `Show All (${filmography.length})`}
                  </button>
                )}
              </div>
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
                  Commercial Work
                </h2>
                <p className="text-muted-foreground mt-1 text-sm text-left">Selected Campaigns & Reels</p>
              </div>
              <div className="shrink-0 ml-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                {commercialOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>
          </div>
          {/* Desktop: always visible header */}
          <div className="hidden md:block">
            <SectionTitle number="05" title="Commercial Work" subtitle="Selected Campaigns & Reels" />
          </div>

          <div className={`${commercialOpen ? 'block' : 'hidden'} md:block`}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {commercialWork.map((item, i) => (
                <div key={i} className="group relative overflow-hidden rounded-sm border border-border bg-card">
                  <div className="aspect-video relative bg-black">
                    {playingVideo === i ? (
                      <video
                        src={item.url}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <button
                        onClick={() => setPlayingVideo(i)}
                        className="w-full h-full relative group/play"
                      >
                        <img
                          src={(item as any).thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
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
          </div>
        </Section>

        {/* ===== PHOTOGRAPHY ===== */}
        <Section id="photography" className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
          <div className="relative container py-16 md:py-24">
            {/* Mobile: collapsible header */}
            <div className="md:hidden">
              <button
                onClick={() => setPhotographyOpen(!photographyOpen)}
                className="w-full flex items-center justify-between mb-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-muted-foreground tracking-widest">06</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-left" style={{ fontFamily: "var(--font-display)" }}>
                    Photography
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm text-left">Still Photography Categories</p>
                </div>
                <div className="shrink-0 ml-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  {photographyOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
            </div>
            {/* Desktop: always visible header */}
            <div className="hidden md:block">
              <SectionTitle number="06" title="Photography" subtitle="Still Photography Categories" />
            </div>

            <div className={`${photographyOpen ? 'block' : 'hidden'} md:block`}>
              {/* Category filter tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActivePhotoCategory(null)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-sm border transition-all ${
                    activePhotoCategory === null
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-muted-foreground border-border hover:border-primary/50'
                  }`}
                >
                  All
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
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Photo grid */}
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                {(activePhotoCategory
                  ? photographyCategories.filter(c => c.name === activePhotoCategory)
                  : photographyCategories
                ).flatMap(cat =>
                  cat.images.slice(0, activePhotoCategory ? undefined : 4).map((img, i) => (
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
                          {cat.name}
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
            </div>
          </div>
        </Section>

        {/* ===== PRESS COVERAGE ===== */}
        <Section id="press" className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
          <div className="relative container py-16 md:py-24">
            <SectionTitle number="07" title="Press Coverage" subtitle="Media Features & Reviews" />
            <div className="space-y-4">
              {pressArticles.map(cat => (
                <div key={cat.category} className="border border-border rounded-sm overflow-hidden">
                  <button
                    onClick={() => setExpandedPress(expandedPress === cat.category ? null : cat.category)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-card hover:bg-secondary/30 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Newspaper size={18} className="text-primary" />
                      <span className="font-medium">{cat.category}</span>
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
          <SectionTitle number="08" title="Interviews & Media" subtitle="Video Content & Appearances" />
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
          <SectionTitle number="09" title="Experience" subtitle="Professional Background" />
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i} className="bg-card border border-border p-5 rounded-sm">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>{exp.role}</h3>
                    <p className="text-sm text-primary font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <Calendar size={12} /> {exp.period}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1.5 shrink-0 w-1 h-1 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Selected Clients */}
          <div className="mt-10">
            <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">Selected Clients</h3>
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
            <SectionTitle number="10" title="Connect" subtitle="Social Media & Contact" />
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">Social Profiles</h3>
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
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">Contact</h3>
                <div className="bg-card border border-border p-5 rounded-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-primary" />
                    <a href={`mailto:${contact.email}`} className="text-sm hover:text-primary transition-colors">{contact.email}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-primary" />
                    <a href={`tel:${contact.phone}`} className="text-sm hover:text-primary transition-colors">{contact.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-primary" />
                    <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">{contact.website}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-primary" />
                    <span className="text-sm">Bilingual: {contact.languages.join(" & ")}</span>
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
              <span>&copy; {new Date().getFullYear()} Alejandro Renteria. All rights reserved.</span>
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
