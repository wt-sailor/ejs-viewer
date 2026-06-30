import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";

interface PreviewProps {
  rendered: string;
  error: string;
  activeTab: "preview" | "html";
  setActiveTab: (tab: "preview" | "html") => void;
}

export default function Preview({
  rendered,
  error,
  activeTab,
  setActiveTab,
}: PreviewProps) {
  const { resolvedCodeTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rendered);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedHtml = Prism.highlight(
    rendered || "",
    Prism.languages.markup,
    "markup"
  );
  const lines = highlightedHtml.split("\n");

  const injectTargetBlank = (html: string) => {
    if (!html) return "";
    
    let processedHtml = html;
    if (html.includes("<head>")) {
      processedHtml = html.replace("<head>", "<head><base target=\"_blank\">");
    } else if (html.includes("<html>")) {
      processedHtml = html.replace("<html>", "<html><head><base target=\"_blank\"></head>");
    } else {
      processedHtml = `<base target="_blank">${html}`;
    }

    const script = `
      <script>
        document.addEventListener('click', function(e) {
          var anchor = e.target.closest('a');
          if (anchor) {
            var href = anchor.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
              e.preventDefault();
              window.open(anchor.href, '_blank');
            }
          }
        }, true);
      </script>
    `;
    
    if (processedHtml.includes("</body>")) {
      return processedHtml.replace("</body>", `${script}</body>`);
    } else {
      return `${processedHtml}${script}`;
    }
  };

  return (
    <div className="4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden sticky top-[5rem] z-5">
        <div className="bg-slate-800 dark:bg-slate-600  px-4 py-3 flex items-center justify-between">
          <h2 className="text-white font-semibold">Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                activeTab === "preview"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("html")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                activeTab === "html"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              HTML
            </button>
            {activeTab === "html" && rendered && (
              <button
                onClick={handleCopy}
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded text-sm font-medium flex items-center gap-1.5 transition-colors"
                title="Copy HTML to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        <div className="h-[calc(100vh-165px)] overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
          {error ? (
            <div className="p-4">
              <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
                <h3 className="text-red-800 dark:text-red-200 font-semibold mb-2">
                  Error
                </h3>
                <p className="text-red-600 dark:text-red-300 text-sm font-mono">
                  {error}
                </p>
              </div>
            </div>
          ) : rendered ? (
            activeTab === "preview" ? (
              <iframe
                srcDoc={injectTargetBlank(rendered)}
                className="w-full h-full border-0"
                title="Email Preview"
                sandbox="allow-same-origin allow-scripts"
              />
            ) : (
              <div
                className={`flex min-h-full text-xs font-mono code-theme-${resolvedCodeTheme} ${
                  resolvedCodeTheme === "dark"
                    ? "bg-gray-900 text-gray-300"
                    : "bg-gray-50 text-slate-700"
                }`}
              >
                {/* Line numbers column */}
                <div className="select-none py-4 pl-4 pr-3 text-right text-slate-400 dark:text-slate-500 border-r border-slate-200 dark:border-slate-800 min-w-[3.5rem] bg-gray-100/50 dark:bg-gray-950/20 leading-6">
                  {lines.map((_, index) => (
                    <div key={index}>{index + 1}</div>
                  ))}
                </div>
                {/* Code lines column */}
                <div className="flex-1 overflow-x-auto py-4 px-4 leading-6 whitespace-pre">
                  {lines.map((line, index) => (
                    <div
                      key={index}
                      dangerouslySetInnerHTML={{ __html: line || " " }}
                    />
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 dark:text-gray-500">
              <div className="text-center">
                <Mail className="w-16 h-16 mx-auto mb-3 opacity-50" />
                <p>Enter template and data to see the live preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
