import { Code } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface BodyTemplateProps {
  value: string;
  onChange: (value: string) => void;
  onAddHeader: () => void;
  onAddFooter: () => void;
}

export default function BodyTemplate({
  value,
  onChange,
  onAddHeader,
  onAddFooter,
}: BodyTemplateProps) {
  const { resolvedCodeTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="bg-slate-800 dark:bg-slate-600  px-4 py-3 flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-slate-300" />
          <h2 className="text-white font-semibold">Body Template</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onAddHeader}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1 px-2 rounded"
          >
            Auto Add Header
          </button>
          <button
            onClick={onAddFooter}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1 px-2 rounded"
          >
            Auto Add Footer
          </button>
        </div>
      </div>
      <div
        className={`overflow-hidden border
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
              ? " bg-neutral-700/50 border-gray-700 text-gray-400"
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
            w-full h-[calc(100vh-610px)] p-4 font-mono text-sm resize-none focus:outline-none
            ${
              resolvedCodeTheme === "dark"
                ? "text-gray-100 bg-gray-900"
                : "text-gray-900 bg-gray-50"
            }
          `}
          placeholder="Enter body template with includes..."
        />
      </div>
    </div>
  );
}
