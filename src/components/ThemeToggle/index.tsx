"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle({
  className,
  description,
}: {
  className?: string;
  description?: boolean;
}) {
  const { theme, setTheme, systemTheme } = useTheme();

  const lightTheme =
    (systemTheme === "light" && theme === "system") || theme === "light";

  return (
    <button
      onClick={() => {
        setTheme(lightTheme ? "dark" : "light");
      }}
      className={cn(
        "group relative flex items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:focus-visible:outline-primary",
        className
      )}
    >
      {lightTheme ? (
        <Moon className="h-5 w-5 group-hover:text-yellow-700 md:h-auto md:w-auto" />
      ) : (
        <Sun className="h-5 w-5 group-hover:text-yellow-400 md:h-auto md:w-auto" />
      )}
      <span className="sr-only">Toggle theme</span>
      {description && (
        <span
          className={
            "font-medium group-hover:text-yellow-700 dark:group-hover:text-yellow-400"
          }
        >
          {lightTheme ? "Modo Noturno" : "Modo Claro"}
        </span>
      )}
      <div className="absolute -inset-x-1 inset-y-1 rounded-full blur transition-colors group-hover:bg-yellow-300/50 dark:group-hover:bg-yellow-400/50"></div>
    </button>
  );
}
