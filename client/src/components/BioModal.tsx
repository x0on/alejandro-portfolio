import { useLanguage } from "@/contexts/LanguageContext";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

const bioKeys = ["short50", "short100", "medium250", "medium500", "long1000"] as const;

const bioTabLabels: Record<string, string> = {
  short50: "50",
  short100: "100",
  medium250: "250",
  medium500: "500",
  long1000: "1000",
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BioModal({ open, onClose }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  if (!open) return null;

  const currentBioKey = bioKeys[activeTab];
  const currentBio = t(`bio.${currentBioKey}`);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentBio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-card border border-border rounded-sm max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              {t("bioModal.title")}
            </h3>
            <p className="text-xs text-muted-foreground">{t("bioModal.subtitle")}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex border-b border-border overflow-x-auto">
          {bioKeys.map((key, i) => (
            <button
              key={key}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2.5 text-sm whitespace-nowrap transition-colors ${
                activeTab === i
                  ? "border-b-2 border-primary text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {bioTabLabels[key]} {t("bioModal.chars")}
            </button>
          ))}
        </div>

        <div className="p-5">
          <div className="bg-muted/30 rounded-sm p-4 text-sm leading-relaxed whitespace-pre-wrap min-h-[120px]">
            {currentBio}
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-muted-foreground font-mono">
              {currentBio.length} {t("bioModal.chars")}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? t("bioModal.copied") : t("bioModal.copyToClipboard")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
