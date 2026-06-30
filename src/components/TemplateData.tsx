import { Code, Save } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";

interface TemplateDataProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TemplateData({ value, onChange }: TemplateDataProps) {
  const { resolvedCodeTheme } = useTheme();

  const handleSave = () => {
    localStorage.setItem("ejs-viewer-data", value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="bg-slate-800 dark:bg-slate-600  px-4 py-3 flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-slate-300" />
          <h2 className="text-white font-semibold">Template Data (JSON)</h2>
        </div>
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-1.5 px-1.5 rounded flex items-center justify-center"
          title="Save Template Data to Local Storage"
        >
          <Save className="w-4 h-4" />
        </button>
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
              ? "bg-neutral-700/50 border-gray-700 text-gray-400"
              : "bg-gray-200 border-gray-300 text-gray-600"
          }
        `}
        >
          JSON
        </div>
        <div
          className={`
            w-full h-44 overflow-auto font-mono text-sm focus-within:outline-none code-theme-${resolvedCodeTheme}
            ${
              resolvedCodeTheme === "dark"
                ? "text-gray-100 bg-gray-900"
                : "text-gray-900 bg-gray-50"
            }
          `}
        >
          <Editor
            value={value}
            onValueChange={onChange}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.json, "json")
            }
            padding={16}
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: 14,
              minHeight: "100%",
            }}
            textareaClassName="focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
