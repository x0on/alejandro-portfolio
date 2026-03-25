import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const rolesEN = [
  "Actor",
  "Writer", 
  "Director",
  "Editor",
  "Photographer",
  "Cinematographer",
  "Producer",
  "Software Developer",
];

const rolesES = [
  "Actor",
  "Escritor",
  "Director",
  "Editor",
  "Fotógrafo",
  "Cinematógrafo",
  "Productor",
  "Desarrollador de Software",
];

export default function TypingAnimation() {
  const { language } = useLanguage();
  const roles = language === "es" ? rolesES : rolesEN;
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const prevLang = useRef(language);

  // Reset animation when language changes
  useEffect(() => {
    if (prevLang.current !== language) {
      prevLang.current = language;
      setRoleIndex(0);
      setCharIndex(0);
      setIsDeleting(false);
      setIsPaused(false);
    }
  }, [language]);

  const currentRole = roles[roleIndex % roles.length];

  const tick = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      if (charIndex < currentRole.length) {
        setCharIndex(prev => prev + 1);
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (charIndex > 0) {
        setCharIndex(prev => prev - 1);
      } else {
        setIsDeleting(false);
        setRoleIndex(prev => (prev + 1) % roles.length);
      }
    }
  }, [charIndex, isDeleting, isPaused, currentRole, roleIndex, roles.length]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  const displayText = currentRole.slice(0, charIndex);

  return (
    <span className="inline-flex items-center">
      <span>{displayText}</span>
      <span className="inline-block w-[2px] h-[1.1em] bg-primary ml-0.5 animate-pulse" />
    </span>
  );
}
