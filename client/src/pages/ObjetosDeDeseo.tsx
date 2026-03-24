import { useTheme } from "@/contexts/ThemeContext";
import { ASSETS, films } from "@/data/content";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Clock, Globe, Film, MapPin, Clapperboard, Quote } from "lucide-react";

const film = films[0]; // Objetos de Deseo is the first film

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ObjetosDeDeseo() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen bg-background text-foreground theme-${theme.className}`}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            Back to Press Kit
          </a>
          <img src={ASSETS.logo} alt="AR" className="h-6 opacity-60" />
        </div>
      </nav>

      {/* Hero Section */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="pt-24 pb-16 container"
      >
        <motion.div variants={fadeUp} className="max-w-4xl">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4 block">Short Film</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
            Objetos de Deseo
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-3 font-light" style={{ fontFamily: "var(--font-display)" }}>
            La Navaja
          </p>
        </motion.div>

        {/* Specs Bar */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-6 mt-10 text-sm text-muted-foreground">
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
            <span>United States</span>
          </div>
          <div className="flex items-center gap-2">
            <Clapperboard size={14} className="text-primary" />
            <span>16:9 &middot; Color</span>
          </div>
        </motion.div>
      </motion.header>

      <div className="container pb-24 space-y-20">
        {/* Synopsis */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">Overview</h2>
          <div className="max-w-3xl">
            <p className="text-lg md:text-xl leading-relaxed italic text-foreground/90">
              This captivating award winning tragedy and proof of concept with dark comedy tones; <strong>follows the eventful journey of Jessy, a morally ambiguous young man who finds himself entangled in a web of challenges when his mother is kidnapped. To settle his debt, Jessy reluctantly sets out to seduce Carlos, an older man in a vulnerable state of decline,</strong> who has a shady proposition that could solve his urgent problem.
            </p>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground max-w-3xl">
            Overall, the project is aiming to entertain and engage the audience while encouraging self-reflection and a deeper understanding of human nature. The combination of varied cultural settings, dark comedy, and a unifying symbolic element will make for a compelling and thought-provoking film.
          </p>
        </motion.section>

        {/* Credits */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">Credits</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Cast */}
            <motion.div variants={fadeUp} className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Cast</h3>
              <div className="space-y-3">
                {film.cast?.map((c) => (
                  <div key={c.name} className="flex justify-between items-baseline border-b border-border/50 pb-3">
                    <span className="font-medium text-lg">{c.name}</span>
                    <span className="text-sm text-muted-foreground">{c.role}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Crew */}
            <motion.div variants={fadeUp} className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Crew</h3>
              <div className="space-y-3">
                {film.crew && (
                  <>
                    <div className="flex justify-between items-baseline border-b border-border/50 pb-3">
                      <span className="font-medium text-lg">{film.crew.director}</span>
                      <span className="text-sm text-muted-foreground">Director</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-border/50 pb-3">
                      <span className="font-medium text-lg">{film.crew.writer}</span>
                      <span className="text-sm text-muted-foreground">Writer</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-border/50 pb-3">
                      <span className="font-medium text-lg">{film.crew.producer}</span>
                      <span className="text-sm text-muted-foreground">Producer</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Specifications */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">Specifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Project Type", value: "Short \u2013 Develop Feature Film" },
              { label: "Genres", value: "Drama, Tragedy, Dark Comedy" },
              { label: "Runtime", value: "18 minutes 28 seconds" },
              { label: "Country of Origin", value: "United States" },
              { label: "Country of Filming", value: "United States" },
              { label: "Language", value: "Spanish" },
              { label: "Shooting Format", value: "Digital S35mm" },
              { label: "Aspect Ratio / Color", value: "16:9 \u2022 Color" },
            ].map((spec) => (
              <div key={spec.label} className="bg-card border border-border p-4 rounded-sm">
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">{spec.label}</div>
                <div className="text-sm font-medium">{spec.value}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Awards */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8 flex items-center gap-2">
            <Award size={14} className="text-primary" /> Awards & Selections
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

        {/* Director Statement */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">Director Statement</h2>
          <div className="max-w-3xl space-y-6">
            <p className="text-sm text-muted-foreground italic mb-4">This first story is part of a feature film design to reflect this statement.</p>
            
            <div className="space-y-5 text-sm leading-relaxed text-foreground/85">
              <p className="indent-8">
                In the vibrant city of Miami, people from different corners of the globe&mdash;Argentina, Mexico, Spain, and Miami itself&mdash;come together. Each bringing their own unique cultural flavors and perspectives. However, underneath these surface differences, the silent motivators that drive human behavior remain consistent.
              </p>
              <p className="indent-8">
                In this meticulously-crafted dark comedy film, we delve into the depths of our humanity, exploring the profound forces that shape our actions. These four interconnected stories capture the essence of the human experience&mdash;the eternal pursuit of our desires and the relentless avoidance of suffering. But an unexpected twist adds an extra layer of intrigue and symbolism.
              </p>
              <p className="indent-8">
                Throughout the film, one character embodies the timeless and undefeatable figure of death. This haunting motif weaves a subtle thread that binds them all together. As tragedy and humor intertwine, these stories are underscored by subdued color schemes, low-key lighting, and high contrast cinematography&mdash;captivating attention and provoking deep introspection.
              </p>
              <p className="indent-8">
                Audiences will witness and undoubtedly feel the complexities of human desires and the many ways we navigate suffering. As the final story unfolds, the symbolism becomes more potent, compelling us to gain a deeper understanding of ourselves and the universal motivations that drive us, no matter where we come from&mdash;shining a light on the human truths that unite us all.
              </p>
              <p className="indent-8">
                Prepare to be entertained and enlightened by an extraordinary cinematic experience that will touch your heart, ignite your mind and leave you wanting more.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Director Biography */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">Director Biography</h2>
          <div className="max-w-3xl space-y-5 text-sm leading-relaxed text-foreground/85">
            <p>
              Born in Havana, Cuba, into a family of performing artists, Alejandro embarked on his creative journey at an early age. At ten, his family relocated to Caracas, Venezuela, where he immersed himself in the vibrant world of theatre and performing arts. Upon immigrating to the United States in 2002, Alejandro settled in Miami, continuing his education in cinematography while honing his skills as a Visual Storyteller.
            </p>
            <p>
              Soon after, he founded Thinking Monkeys Films, a production company that served as the conduit for his creative vision. Under its banner, Alejandro directed and produced over 30 commercial spots tailored for the USA Hispanic market, spearheaded more than 900 projects for governmental and corporate entities over the past decade, and contributed to numerous television and film endeavors.
            </p>
            <p>
              His directorial debut, &ldquo;Objetos de Deseo,&rdquo; has garnered widespread acclaim, earning accolades such as the Envision Award and Best Cinematography. Moreover, his adept direction has facilitated wins for his actors in both the USA and Spain, solidifying Alejandro&rsquo;s status as a promising film director.
            </p>
          </div>
        </motion.section>

        {/* Footer CTA */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center pt-10 border-t border-border">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft size={14} /> Back to Press Kit
          </a>
        </motion.div>
      </div>
    </div>
  );
}
