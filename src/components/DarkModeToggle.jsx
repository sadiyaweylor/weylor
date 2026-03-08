"use client";

import { useContext } from "react";
import { ThemeContext } from "@/components/theme/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const context = useContext(ThemeContext);
  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        top-6 right-6 z-[50]
        w-11 h-11
        flex items-center justify-center
        rounded-full
        bg-white dark:bg-black
        border border-black/10 dark:border-white/20
        shadow-md
        transition-all duration-300
      "
    >
      {theme === "dark" ? (
        <Sun className="text-black dark:text-white" size={20} strokeWidth={1.5} />
      ) : (
        <Moon className="text-black dark:text-white" size={20} strokeWidth={1.5} />
      )}
    </button>
  );
}