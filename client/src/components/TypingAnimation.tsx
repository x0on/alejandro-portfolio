import { useState, useEffect, useCallback } from "react";

const roles = [
  "Actor",
  "Writer", 
  "Director",
  "Editor",
  "Photographer",
  "Cinematographer",
  "Producer",
  "Software Developer",
];

export default function TypingAnimation() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentRole = roles[roleIndex];

  const tick = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      // Typing forward
      if (charIndex < currentRole.length) {
        setCharIndex(prev => prev + 1);
      } else {
        // Finished typing — pause then start deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        setCharIndex(prev => prev - 1);
      } else {
        // Finished deleting — move to next role
        setIsDeleting(false);
        setRoleIndex(prev => (prev + 1) % roles.length);
      }
    }
  }, [charIndex, isDeleting, isPaused, currentRole, roleIndex]);

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
