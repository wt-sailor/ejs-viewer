import { useState, useRef, useEffect } from "react";
import { X, Save, Plus, Trash2, Settings } from "lucide-react";
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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-3.5 mb-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section: Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="EJS Email Template Viewer Logo"
            className="w-10 h-10 object-contain rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-md bg-white dark:bg-slate-800"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              EJS Viewer
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase hidden sm:block">
              Email Template Playground
            </p>
          </div>
        </div>

        {/* Right Section: Actions & Settings Dropdown */}
        <div className="flex items-center gap-3">
          {/* Quick Actions (hidden on small screens) */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onAddHeader}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
            >
              <Plus className="w-3.5 h-3.5 text-blue-500" />
              Add Header
            </button>
            <button
              onClick={onAddFooter}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
            >
              <Plus className="w-3.5 h-3.5 text-blue-500" />
              Add Footer
            </button>
            <button
              onClick={onSaveTemplates}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white shadow-sm transition"
            >
              <Save className="w-3.5 h-3.5" />
              Save Templates
            </button>
          </div>

          {/* Theme Switchers inline for desktop, compact */}
          <div className="hidden sm:flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-3">
            <ThemeSwitcher />
          </div>

          {/* Settings Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
              title="More Options"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Settings className="w-5 h-5" />
              )}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2.5 w-72 origin-top-right rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none p-4 z-50">
                <div className="space-y-4">
                  {/* Preferences / Themes */}
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                      Preferences
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-slate-100 dark:border-slate-800/80 p-2 text-center bg-slate-50/50 dark:bg-slate-900/50">
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                          Site Theme
                        </span>
                        <div className="flex justify-center">
                          <ThemeSwitcher />
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-100 dark:border-slate-800/80 p-2 text-center bg-slate-50/50 dark:bg-slate-900/50">
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                          Code Theme
                        </span>
                        <div className="flex justify-center">
                          <CodeThemeSwitcher />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions List (visible in dropdown for mobile and all-devices extra actions) */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                    <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                      Actions
                    </h3>
                    <div className="grid grid-cols-1 gap-2 md:hidden">
                      <button
                        onClick={() => {
                          onAddHeader();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-start gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        <Plus className="w-4 h-4 text-blue-500" />
                        Add Header Partial
                      </button>
                      <button
                        onClick={() => {
                          onAddFooter();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-start gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        <Plus className="w-4 h-4 text-blue-500" />
                        Add Footer Partial
                      </button>
                      <button
                        onClick={() => {
                          onSaveTemplates();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-start gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white shadow-sm"
                      >
                        <Save className="w-4 h-4" />
                        Save Workspace
                      </button>
                    </div>

                    {/* Standard Action items for desktop too */}
                    <button
                      onClick={() => {
                        onClearAll();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-start gap-2 px-3 py-2 rounded-lg border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 text-sm font-medium text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                      Reset Workspace
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
