"use client";

import * as React from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const [isCollapsed, setIsCollapsedState] = React.useState(false);
  const [isMobileOpen, setIsMobileOpenState] = React.useState(false);

  // 초기 사이드바 상태 로드
  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const storedCollapsed = localStorage.getItem("sidebarCollapsed");
        if (storedCollapsed !== null) {
          setIsCollapsedState(storedCollapsed === "true");
        }
        // 모바일 상태는 세션별로 관리하므로 localStorage에 저장하지 않음
      } catch (error) {
        console.error("Error loading sidebar state from localStorage:", error);
      }
    }
  }, []);

  const setIsCollapsed = React.useCallback((collapsed: boolean) => {
    setIsCollapsedState(collapsed);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("sidebarCollapsed", String(collapsed));
      } catch (error) {
        console.error("Error saving sidebar state to localStorage:", error);
      }
    }
  }, []);

  const setIsMobileOpen = React.useCallback((open: boolean) => {
    setIsMobileOpenState(open);
    // 모바일 상태는 세션별로 관리하므로 localStorage에 저장하지 않음
  }, []);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

