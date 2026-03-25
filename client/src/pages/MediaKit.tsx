import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { contact, socialLinks } from "@/data/content";
import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Copy, Check, X, Mail, Phone, Globe, ExternalLink } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const galleryPhotos = [
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-01_c05234d8.jpg", label: "Portrait — Dark Background" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-02_5ff44799.jpg", label: "Portrait — Color Background" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-03_479a04b9.jpg", label: "Portrait — White Shirt" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-04_201732d3.webp", label: "Behind the Scenes" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-05_dbb3b2b6.webp", label: "Miami Film Festival" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-06_b1d8601f.webp", label: "Film Festival Event" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-07_5141e0ed.webp", label: "On Set — Director" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-08_56bd9098.webp", label: "Production Still" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-09_890ece4d.webp", label: "On Location" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-10_59e7b3b0.webp", label: "Creative Direction" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-11_b0e0740f.webp", label: "Event Photography" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-12_1c447a25.webp", label: "Film Premiere" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-13_062deecd.webp", label: "Production Work" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-14_b946e4cb.webp", label: "Cinematography" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-15_bee8a357.webp", label: "Behind the Camera" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-16_97396776.webp", label: "Film Screening" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-17_dc00bf0d.webp", label: "Studio Portrait" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-18_7109e5be.webp", label: "Working on Set" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-19_ce3fee3b.webp", label: "Post-Production" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028448018/D9SNns3EDqWWFf4F2eTt6N/gallery-20_1bbb6f1c.webp", label: "On Location — Miami" },
];

const factKeys = [
  "fullName", "title", "company", "location", "languages", "experience", "projects", "notableClients"
];

export default function MediaKit() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [copiedBio, setCopiedBio] = useState<string | null>(null);
  const { t } = useLanguage();

  const bioEntries = [
    { key: "short50", labelKey: "bioModal.oneLiner" },
    { key: "short100", labelKey: "bioModal.shortBio" },
    { key: "medium250", labelKey: "bioModal.mediumBio" },
    { key: "medium500", labelKey: "bioModal.longBio" },
    { key: "long1000", labelKey: "bioModal.fullBio" },
  ];

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedBio(key);
    setTimeout(() => setCopiedBio(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-14">
        {/* Hero */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="container py-16 md:py-24"
        >
          <div className="mb-2">
            <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">{t("mediaKit.title")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            {t("mediaKit.subtitle")}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed">
            {t("mediaKit.heroDescription")}
          </p>
        </motion.section>

        {/* Photo Gallery */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="container pb-16 md:pb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-muted-foreground tracking-widest">01</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>
            {t("mediaKit.photoGallery")}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryPhotos.map((photo, i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-border cursor-pointer"
                onClick={() => setLightbox(i)}
              >
                <img
                  src={photo.url}
                  alt={photo.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-xs font-medium">{photo.label}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-4 font-mono">
            {t("mediaKit.clickToView")}
          </p>
        </motion.section>

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            >
              <X size={28} />
            </button>
            <img
              src={galleryPhotos[lightbox].url}
              alt={galleryPhotos[lightbox].label}
              className="max-w-full max-h-[85vh] object-contain rounded-sm"
              onClick={e => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-white text-sm font-medium">{galleryPhotos[lightbox].label}</p>
              <div className="flex items-center justify-center gap-3 mt-2">
                {lightbox > 0 && (
                  <button
                    onClick={e => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                    className="px-3 py-1.5 text-xs bg-white/10 text-white rounded-sm hover:bg-white/20 transition-colors"
                  >
                    {t("mediaKit.previous")}
                  </button>
                )}
                <a
                  href={galleryPhotos[lightbox].url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 text-xs bg-white/10 text-white rounded-sm hover:bg-white/20 transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  <Download size={14} /> {t("mediaKit.download")}
                </a>
                {lightbox < galleryPhotos.length - 1 && (
                  <button
                    onClick={e => { e.stopPropagation(); setLightbox(lightbox + 1); }}
                    className="px-3 py-1.5 text-xs bg-white/10 text-white rounded-sm hover:bg-white/20 transition-colors"
                  >
                    {t("mediaKit.next")}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bios */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="container pb-16 md:pb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-muted-foreground tracking-widest">02</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>
            {t("mediaKit.copyReadyBios")}
          </h2>

          <div className="space-y-4">
            {bioEntries.map(bio => {
              const bioText = t(`bio.${bio.key}`);
              return (
                <div key={bio.key} className="border border-border rounded-sm p-4 bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      {t(bio.labelKey)} ({bioText.length} {t("bioModal.chars")})
                    </span>
                    <button
                      onClick={() => handleCopy(bioText, bio.key)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {copiedBio === bio.key ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      {copiedBio === bio.key ? t("bioModal.copied") : t("bioModal.copyToClipboard")}
                    </button>
                  </div>
                  <p className="text-sm leading-relaxed">{bioText}</p>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Quick Facts & Contact */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="container pb-16 md:pb-24"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-muted-foreground tracking-widest">03</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                {t("mediaKit.quickFacts")}
              </h2>
              <div className="space-y-3">
                {factKeys.map((key, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-muted-foreground font-mono text-xs min-w-[120px]">{t(`facts.${key}`)}</span>
                    <span className="font-medium">{t(`facts.${key}.value`)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-muted-foreground tracking-widest">04</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                {t("connect.contact")}
              </h2>
              <div className="space-y-3">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <Mail size={16} className="text-muted-foreground" />
                  {contact.email}
                </a>
                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <Phone size={16} className="text-muted-foreground" />
                  {contact.phone}
                </a>
                <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <Globe size={16} className="text-muted-foreground" />
                  {contact.website}
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs font-mono text-muted-foreground mb-3">{t("connect.socialProfiles")}</p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {link.platform} <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-xs text-muted-foreground font-mono">
          &copy; {new Date().getFullYear()} Alejandro Renteria. {t("footer.allRights")}
        </div>
      </footer>
    </div>
  );
}
