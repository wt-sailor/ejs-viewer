import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function CodeThemeSwitcher() {
  const { codeTheme, setCodeTheme } = useTheme();

  const themes = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
    { value: "system" as const, icon: Monitor, label: "Site theme" },
  ];

  return (
    <div className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setCodeTheme(value)}
          className={`
            flex items-center justify-center w-8 h-8 rounded-md transition-all
            ${
              codeTheme === value
                ? "bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }
          `}
          title={`${label} mode for code blocks`}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
}
