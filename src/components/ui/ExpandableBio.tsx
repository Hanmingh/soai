import { useState } from "react";
import { ChevronDown } from "lucide-react";

type ExpandableBioProps = {
  text: string;
  /** CSS color used for the collapse fade gradient — should match the surrounding card background. */
  fadeFrom?: string;
};

export function ExpandableBio({ text, fadeFrom = "#ffffff" }: ExpandableBioProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 200;

  if (!isLong) {
    return <p className="text-gray-800 leading-relaxed text-sm md:text-base">{text}</p>;
  }

  return (
    <div>
      <div className="relative">
        <p
          className={`text-gray-800 leading-relaxed text-sm md:text-base ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {text}
        </p>
        {!expanded && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-8"
            style={{ background: `linear-gradient(to top, ${fadeFrom} 0%, transparent 100%)` }}
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-[#003d7b] transition-colors hover:text-[#002a57]"
        aria-expanded={expanded}
      >
        {expanded ? "Show less" : "Read more"}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}
