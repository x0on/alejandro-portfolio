import { ASSETS } from "@/data/content";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <img src={ASSETS.logomark} alt="AR" className="h-12 w-12 mx-auto mb-6 opacity-40" />
        <h1 className="text-6xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>404</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => setLocation("/")}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity font-medium"
        >
          <ArrowLeft size={16} /> Back to Press Kit
        </button>
      </div>
    </div>
  );
}
