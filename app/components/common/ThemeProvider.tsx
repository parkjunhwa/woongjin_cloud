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
  const [mounted, setMounted] = React.useState(false);
  const [theme, setThemeState] = React.useState<"light" | "dark" | "system">("light");
  const [colorTheme, setColorThemeState] = React.useState<ColorTheme>("blue");

  // 초기 테마 로드
  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
        if (storedTheme) {
          setThemeState(storedTheme);
        }
        const storedColorTheme = localStorage.getItem("colorTheme") as ColorTheme | null;
        if (storedColorTheme) {
          setColorThemeState(storedColorTheme);
        }
      } catch (error) {
        console.error("Error loading theme from localStorage:", error);
      }
    }
  }, []);

  const setTheme = React.useCallback((newTheme: "light" | "dark" | "system") => {
    setThemeState(newTheme);
    if (typeof window === "undefined" || typeof document === "undefined") return;
    
    const root = document.documentElement;
    
    if (newTheme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
      try {
        localStorage.setItem("theme", "dark");
      } catch (error) {
        console.error("Error saving theme to localStorage:", error);
      }
    } else if (newTheme === "light") {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      try {
        localStorage.setItem("theme", "light");
      } catch (error) {
        console.error("Error saving theme to localStorage:", error);
      }
    } else {
      if (window.matchMedia) {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        if (systemTheme === "dark") {
          root.classList.add("dark");
          root.style.colorScheme = "dark";
        } else {
          root.classList.remove("dark");
          root.style.colorScheme = "light";
        }
      }
      try {
        localStorage.setItem("theme", "system");
      } catch (error) {
        console.error("Error saving theme to localStorage:", error);
      }
    }
  }, []);

  // 시스템 테마 변경 감지
  React.useEffect(() => {
    if (!mounted || theme !== "system") return;
    if (typeof window === "undefined" || !window.matchMedia) return;
    
    try {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        if (typeof document === "undefined") return;
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
      return () => {
        try {
          mediaQuery.removeEventListener("change", handleChange);
        } catch (error) {
          console.error("Error removing media query listener:", error);
        }
      };
    } catch (error) {
      console.error("Error setting up media query listener:", error);
    }
  }, [theme, mounted]);

  const setColorTheme = React.useCallback((color: ColorTheme) => {
    setColorThemeState(color);
    if (typeof document === "undefined") return;
    
    const root = document.documentElement;
    // CSS 변수로 컬러 테마 설정
    root.setAttribute("data-color-theme", color);
    
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("colorTheme", color);
      } catch (error) {
        console.error("Error saving colorTheme to localStorage:", error);
      }
    }
  }, []);

  // 초기 테마 적용
  React.useEffect(() => {
    if (!mounted || typeof document === "undefined") return;
    
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else if (theme === "light") {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    } else {
      if (typeof window !== "undefined" && window.matchMedia) {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        if (systemTheme === "dark") {
          root.classList.add("dark");
          root.style.colorScheme = "dark";
        } else {
          root.classList.remove("dark");
          root.style.colorScheme = "light";
        }
      }
    }
  }, [theme, mounted]);

  // 초기 컬러 테마 적용
  React.useEffect(() => {
    if (!mounted || typeof document === "undefined") return;
    
    const root = document.documentElement;
    root.setAttribute("data-color-theme", colorTheme);
  }, [colorTheme, mounted]);

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

