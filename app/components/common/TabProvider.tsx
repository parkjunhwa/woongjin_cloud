"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface Tab {
  id: string;
  label: string;
  href: string;
}

interface TabContextType {
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (tab: Tab) => void;
  removeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  removeAllTabs: () => void;
  removeOtherTabs: (keepTabId: string) => void;
  isTabsEnabled: boolean;
  toggleTabs: () => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

// home 탭을 항상 첫 번째로 정렬하는 헬퍼 함수
function sortTabsWithHomeFirst(tabs: Tab[]): Tab[] {
  const homeTab = tabs.find((t) => t.id === "home");
  const otherTabs = tabs.filter((t) => t.id !== "home");
  return homeTab ? [homeTab, ...otherTabs] : otherTabs;
}

export function TabProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "home", label: "Home", href: "/" },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>("home");
  const [isTabsEnabled, setIsTabsEnabled] = useState<boolean>(true);

  // 마운트 후 localStorage에서 값 로드
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("tabsEnabled");
        if (saved !== null) {
          setIsTabsEnabled(saved === "true");
        }
      } catch (error) {
        console.error("Error loading tabsEnabled from localStorage:", error);
      }
    }
  }, []);

  const addTab = useCallback((tab: Tab) => {
    setTabs((prevTabs) => {
      // 이미 존재하는 탭인지 확인
      const existingTab = prevTabs.find((t) => t.id === tab.id);
      if (existingTab) {
        // 이미 존재하면 활성화만
        setActiveTabId(tab.id);
        // home 탭이 첫 번째인지 확인하고 정렬
        return sortTabsWithHomeFirst(prevTabs);
      }
      // 새 탭 추가
      setActiveTabId(tab.id);
      const newTabs = [...prevTabs, tab];
      // home 탭이 첫 번째가 되도록 정렬
      return sortTabsWithHomeFirst(newTabs);
    });
  }, []);

  const removeTab = useCallback((tabId: string) => {
    // home 탭은 삭제할 수 없음
    if (tabId === "home") {
      return;
    }
    
    setTabs((prevTabs) => {
      const newTabs = prevTabs.filter((t) => t.id !== tabId);
      
      // 삭제된 탭이 활성 탭이었던 경우, 항상 home 탭으로 이동
      if (activeTabId === tabId) {
        // home 탭이 없으면 추가
        const homeTab = prevTabs.find((t) => t.id === "home") || { id: "home", label: "Home", href: "/" };
        setActiveTabId("home");
        router.push("/");
        
        // home 탭이 없었던 경우 추가
        if (!prevTabs.find((t) => t.id === "home")) {
          return sortTabsWithHomeFirst([homeTab, ...newTabs]);
        }
      }
      
      // home 탭이 첫 번째가 되도록 정렬
      return sortTabsWithHomeFirst(newTabs);
    });
  }, [activeTabId, router]);

  const setActiveTab = useCallback((tabId: string) => {
    setActiveTabId(tabId);
  }, []);

  const removeAllTabs = useCallback(() => {
    // home 탭만 남기고 모두 삭제
    const homeTab = { id: "home", label: "Home", href: "/" };
    setTabs([homeTab]);
    setActiveTabId("home");
    // home 탭의 페이지로 이동
    router.push("/");
  }, [router]);

  const removeOtherTabs = useCallback((keepTabId: string) => {
    setTabs((prevTabs) => {
      const keepTab = prevTabs.find((t) => t.id === keepTabId);
      if (!keepTab) return prevTabs;
      
      // home 탭은 항상 유지
      const homeTab = prevTabs.find((t) => t.id === "home");
      const newTabs: Tab[] = [];
      
      // home 탭이 존재하면 항상 첫 번째로 추가
      if (homeTab) {
        newTabs.push(homeTab);
      }
      
      // keepTab이 home이 아니면 추가
      if (keepTabId !== "home") {
        newTabs.push(keepTab);
      }
      
      setActiveTabId(keepTabId);
      if (typeof window !== "undefined") {
        window.history.pushState({}, "", keepTab.href);
      }
      return newTabs;
    });
  }, []);

  const toggleTabs = useCallback(() => {
    setIsTabsEnabled((prev) => {
      const newValue = !prev;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("tabsEnabled", String(newValue));
        } catch (error) {
          console.error("Error saving tabsEnabled to localStorage:", error);
        }
      }
      return newValue;
    });
  }, []);

  return (
    <TabContext.Provider
      value={{
        tabs,
        activeTabId,
        addTab,
        removeTab,
        setActiveTab,
        removeAllTabs,
        removeOtherTabs,
        isTabsEnabled,
        toggleTabs,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error("useTabs must be used within a TabProvider");
  }
  return context;
}

