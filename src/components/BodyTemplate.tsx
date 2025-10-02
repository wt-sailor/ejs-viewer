import { Code } from "lucide-react";

interface BodyTemplateProps {
  value: string;
  onChange: (value: string) => void;
  onAddHeader: () => void;
  onAddFooter: () => void;
}

export default function BodyTemplate({ value, onChange, onAddHeader, onAddFooter }: BodyTemplateProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 justify-between">
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
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Enter body template with includes..."
      />
    </div>
  );
}
