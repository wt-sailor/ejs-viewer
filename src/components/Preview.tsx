import { Mail } from "lucide-react";

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
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-[6.5rem] z-5">
        <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
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
          </div>
        </div>
        <div className="h-[calc(100vh-190px)] overflow-auto">
          {error ? (
            <div className="p-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-red-800 font-semibold mb-2">Error</h3>
                <p className="text-red-600 text-sm font-mono">{error}</p>
              </div>
            </div>
          ) : rendered ? (
            activeTab === "preview" ? (
              <iframe
                srcDoc={rendered}
                className="w-full h-full border-0"
                title="Email Preview"
                sandbox="allow-same-origin"
              />
            ) : (
              <pre className="p-4 text-sm overflow-auto h-full">
                <code className="text-slate-700">{rendered}</code>
              </pre>
            )
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400">
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
