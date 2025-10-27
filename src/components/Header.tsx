import { useState } from "react";
import { Mail, Menu, Save, Plus, Trash2 } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { CodeThemeSwitcher } from "./CodeThemeSwitcher";

interface HeaderProps {
  onSaveTemplates: () => void;
  onAddHeader: () => void;
  onAddFooter: () => void;
  onClearAll: () => void;
}

export function Header({
  onSaveTemplates,
  onAddHeader,
  onAddFooter,
  onClearAll,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-center py-4">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl lg:text-4xl font-bold text-slate-800 dark:text-slate-200">
          EJS Email Template Viewer
        </h1>
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-slate-600 hover:bg-slate-700 text-white p-2 rounded-md"
            title="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20">
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Site Theme
                    </label>
                    <div className="flex items-center justify-center">
                      <ThemeSwitcher />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Code Theme
                    </label>
                    <div className="flex items-center justify-center">
                      <CodeThemeSwitcher />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button
                    onClick={() => {
                      onAddHeader();
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-3 rounded flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Header
                  </button>
                  <button
                    onClick={() => {
                      onAddFooter();
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-3 rounded flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Footer
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      onSaveTemplates();
                      setIsMenuOpen(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-3 rounded flex items-center justify-center gap-2"
                    title="Save Header, Footer, and Recipient Email to Local Storage"
                  >
                    <Save className="w-5 h-5" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      onClearAll();
                      setIsMenuOpen(false);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-3 rounded flex items-center justify-center gap-2"
                    title="Clear All Saved Data"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
