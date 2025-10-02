import { Code } from "lucide-react";

interface HeaderTemplateProps {
  value: string;
  onChange: (value: string) => void;
}

export default function HeaderTemplate({ value, onChange }: HeaderTemplateProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
        <Code className="w-5 h-5 text-slate-300" />
        <h2 className="text-white font-semibold">Header Template</h2>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-48 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Enter header template..."
      />
    </div>
  );
}
