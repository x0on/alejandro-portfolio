import Header from "@/components/Header";
import { ASSETS, hero, bios, contact, socialLinks } from "@/data/content";
import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Copy, Check, X, Mail, Phone, Globe, ExternalLink } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const photos = [
  { url: ASSETS.heroImage, label: "Cinematic Portrait" },
  { url: ASSETS.filmStill, label: "Film Still - Noir" },
  { url: ASSETS.miamiCinematic, label: "Miami Cinematic" },
  { url: ASSETS.manuscript, label: "Manuscript Artistic" },
  { url: ASSETS.logomark, label: "Logo Mark" },
  { url: ASSETS.logo, label: "Logo with Text" },
];

const facts = [
  { label: "Full Name", value: "Alejandro Renteria" },
  { label: "Title", value: "Director / Executive Producer / Cinematographer / Editor" },
  { label: "Company", value: "Thinking Monkeys Films" },
  { label: "Location", value: "Miami, FL" },
  { label: "Languages", value: "English, Spanish" },
  { label: "Experience", value: "15+ years" },
  { label: "Projects", value: "900+" },
  { label: "Notable Clients", value: "HBO, Telemundo, NBCUniversal, Carnival Corp." },
];

export default function MediaKit() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [copiedBio, setCopiedBio] = useState<string | null>(null);

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
            <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">Media Kit</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Press Assets &<br />Media Resources
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed">
            Download high-resolution photos, logos, and copy-ready bios for press and media use.
            All assets are available for editorial and promotional purposes.
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
            Photo Gallery
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-border cursor-pointer"
                onClick={() => setLightbox(i)}
              >
                <img
                  src={photo.url}
                  alt={photo.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-sm font-medium">{photo.label}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-4 font-mono">
            Click any image to view full size. Right-click to download.
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
              src={photos[lightbox].url}
              alt={photos[lightbox].label}
              className="max-w-full max-h-[85vh] object-contain rounded-sm"
              onClick={e => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-white text-sm font-medium">{photos[lightbox].label}</p>
              <a
                href={photos[lightbox].url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-4 py-2 text-xs bg-white/10 text-white rounded-sm hover:bg-white/20 transition-colors"
                onClick={e => e.stopPropagation()}
              >
                <Download size={14} /> Download Full Resolution
              </a>
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
            Copy-Ready Bios
          </h2>

          <div className="space-y-4">
            {[
              { key: "short100", label: "Short Bio (100 chars)", text: bios.short100 },
              { key: "medium250", label: "Medium Bio (250 chars)", text: bios.medium250 },
              { key: "long1000", label: "Full Bio (1000 chars)", text: bios.long1000 },
            ].map(bio => (
              <div key={bio.key} className="bg-card border border-border rounded-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">{bio.label}</h3>
                  <button
                    onClick={() => handleCopy(bio.text, bio.key)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {copiedBio === bio.key ? <Check size={14} /> : <Copy size={14} />}
                    {copiedBio === bio.key ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{bio.text}</p>
                <span className="text-xs text-muted-foreground font-mono mt-2 block">{bio.text.length} characters</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Facts & Contact */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="container pb-16 md:pb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-muted-foreground tracking-widest">03</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>
            Quick Facts & Contact
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-border rounded-sm overflow-hidden">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border">
                  {facts.map(f => (
                    <tr key={f.label} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground w-1/3">{f.label}</td>
                      <td className="px-4 py-3 font-medium">{f.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border p-5 rounded-sm space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-primary" />
                    <a href={`mailto:${contact.email}`} className="text-sm hover:text-primary transition-colors">{contact.email}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-primary" />
                    <a href={`tel:${contact.phone}`} className="text-sm hover:text-primary transition-colors">{contact.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe size={16} className="text-primary" />
                    <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">{contact.website}</a>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border p-5 rounded-sm">
                <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">Social Profiles</h3>
                <div className="space-y-2">
                  {socialLinks.map(s => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm hover:text-primary transition-colors py-1"
                    >
                      <span>{s.platform}</span>
                      <ExternalLink size={14} className="text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <img src={ASSETS.logomark} alt="AR" className="h-5 w-5 object-contain opacity-60" />
              <span>&copy; {new Date().getFullYear()} Alejandro Renteria. All rights reserved.</span>
            </div>
            <a href="/" className="hover:text-primary transition-colors">Back to Press Kit</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
