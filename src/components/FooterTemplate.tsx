import { useState } from "react";
import { Code, ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface FooterTemplateProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FooterTemplate({
  value,
  onChange,
}: FooterTemplateProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { resolvedCodeTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div
        className="bg-slate-800 dark:bg-slate-600  px-4 py-3 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-slate-300" />
          <h2 className="text-white font-semibold">Footer Template</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-slate-300" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-300" />
        )}
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`
          overflow-hidden border
          ${
            resolvedCodeTheme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-300"
          }
        `}
        >
          <div
            className={`
            px-4 py-2 text-xs font-semibold border-b
            ${
              resolvedCodeTheme === "dark"
                ? "bg-neutral-700/50 border-gray-700 text-gray-400"
                : "bg-gray-200 border-gray-300 text-gray-600"
            }
          `}
          >
            EJS
          </div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`
              w-full h-48 p-4 font-mono text-sm resize-none focus:outline-none
              ${
                resolvedCodeTheme === "dark"
                  ? "text-gray-100 bg-gray-900"
                  : "text-gray-900 bg-gray-50"
              }
            `}
            placeholder="Enter footer template..."
          />
        </div>
      </div>
    </div>
  );
}
