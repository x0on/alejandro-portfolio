import { bios } from "@/data/content";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

const bioTabs = [
  { label: "50 chars", key: "short50" as const },
  { label: "100 chars", key: "short100" as const },
  { label: "250 chars", key: "medium250" as const },
  { label: "500 chars", key: "medium500" as const },
  { label: "1000 chars", key: "long1000" as const },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BioModal({ open, onClose }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const currentBio = bios[bioTabs[activeTab].key];

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
          <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Copy-Ready Bios
          </h3>
          <button onClick={onClose} className="p-1 hover:text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex border-b border-border overflow-x-auto">
          {bioTabs.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2.5 text-sm whitespace-nowrap transition-colors ${
                activeTab === i
                  ? "border-b-2 border-primary text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          <div className="bg-muted/30 rounded-sm p-4 text-sm leading-relaxed whitespace-pre-wrap min-h-[120px]">
            {currentBio}
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-muted-foreground font-mono">
              {currentBio.length} characters
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
