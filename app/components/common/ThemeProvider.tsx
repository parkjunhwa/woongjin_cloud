"use client";

import * as React from "react";

type ColorTheme = "blue" | "red" | "green" | "yellow" | "purple" | "pink" | "indigo" | "teal" | "orange" | "gray" | "cyan" | "emerald" | "violet" | "fuchsia" | "rose" | "amber" | "lime" | "sky";

interface ThemeContextType {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  colorTheme: ColorTheme;
  setColorTheme: (color: ColorTheme) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<"light" | "dark" | "system">("light");
  const [colorTheme, setColorThemeState] = React.useState<ColorTheme>("blue");

  // 초기 테마 로드
  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    }
    const storedColorTheme = localStorage.getItem("colorTheme") as ColorTheme | null;
    if (storedColorTheme) {
      setColorThemeState(storedColorTheme);
    }
  }, []);

  const setTheme = React.useCallback((newTheme: "light" | "dark" | "system") => {
    setThemeState(newTheme);
    const root = document.documentElement;
    
    if (newTheme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    } else if (newTheme === "light") {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      if (systemTheme === "dark") {
        root.classList.add("dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.style.colorScheme = "light";
      }
      localStorage.setItem("theme", "system");
    }
  }, []);

  // 시스템 테마 변경 감지
  React.useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        const root = document.documentElement;
        if (e.matches) {
          root.classList.add("dark");
          root.style.colorScheme = "dark";
        } else {
          root.classList.remove("dark");
          root.style.colorScheme = "light";
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const setColorTheme = React.useCallback((color: ColorTheme) => {
    setColorThemeState(color);
    const root = document.documentElement;
    // CSS 변수로 컬러 테마 설정
    root.setAttribute("data-color-theme", color);
    localStorage.setItem("colorTheme", color);
  }, []);

  // 초기 테마 적용
  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else if (theme === "light") {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      if (systemTheme === "dark") {
        root.classList.add("dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.style.colorScheme = "light";
      }
    }
  }, [theme]);

  // 초기 컬러 테마 적용
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-color-theme", colorTheme);
  }, [colorTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

