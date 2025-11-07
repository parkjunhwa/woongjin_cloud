"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import { useTabs } from "./TabProvider";

export function Tabs() {
  const { tabs, activeTabId, removeTab, setActiveTab, removeAllTabs, removeOtherTabs } = useTabs();
  const pathname = usePathname();
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [tabActionsOpen, setTabActionsOpen] = useState(false);
  const tabActionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [tabs]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleTabClick = (tabId: string, href: string) => {
    setActiveTab(tabId);
    router.push(href);
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    e.preventDefault();
    removeTab(tabId);
  };

  const handleRefresh = () => {
    // 현재 활성 탭의 페이지만 새로고침 (탭 상태는 유지)
    if (activeTabId) {
      const currentTab = tabs.find((t) => t.id === activeTabId);
      if (currentTab) {
        // Next.js router.refresh()를 사용하여 현재 페이지만 리프레시
        router.refresh();
        // 현재 경로로 다시 이동하여 페이지 리프레시
        router.push(currentTab.href);
      }
    }
  };

  const handleCloseCurrent = () => {
    // home 탭은 닫을 수 없음
    if (activeTabId && activeTabId !== "home") {
      removeTab(activeTabId);
    }
    setTabActionsOpen(false);
  };

  const handleCloseAll = () => {
    removeAllTabs();
    router.push("/");
    setTabActionsOpen(false);
  };

  const handleCloseOthers = () => {
    if (activeTabId) {
      removeOtherTabs(activeTabId);
    }
    setTabActionsOpen(false);
  };

  return (
    <div 
      className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center"
      role="tablist"
      aria-label="탭 네비게이션"
    >
      {/* 좌측 스크롤 버튼 */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="flex-shrink-0 px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
          aria-label="왼쪽으로 스크롤"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* 탭 스크롤 영역 */}
      <div className="flex-1 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-0 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTabId === tab.id || pathname === tab.href;
            return (
              <React.Fragment key={tab.id}>
                {index > 0 && (
                  <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                )}
                <Link
                  href={tab.href}
                  onClick={() => handleTabClick(tab.id, tab.href)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  className={`
                    flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors
                    border-b-2 min-w-fit flex-shrink-0
                    ${
                      isActive
                        ? "border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <span>{tab.label}</span>
                  {tab.id !== "home" && (
                    <button
                      onClick={(e) => handleCloseTab(e, tab.id)}
                      className="ml-1 p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label={`${tab.label} 탭 닫기`}
                      type="button"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 우측 스크롤 버튼 */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="flex-shrink-0 px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
          aria-label="오른쪽으로 스크롤"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* 탭 작업 버튼 (우측 고정) */}
      <div className="flex-shrink-0 w-[80px] border-l border-gray-200 dark:border-gray-800">
        <Popover.Root open={tabActionsOpen} onOpenChange={setTabActionsOpen}>
          <Popover.Trigger asChild>
            <button
              onMouseEnter={() => {
                if (tabActionsTimeoutRef.current) {
                  clearTimeout(tabActionsTimeoutRef.current);
                  tabActionsTimeoutRef.current = null;
                }
                setTabActionsOpen(true);
              }}
              onMouseLeave={() => {
                tabActionsTimeoutRef.current = setTimeout(() => {
                  setTabActionsOpen(false);
                }, 150);
              }}
              className="w-full px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="탭 작업"
            >
              탭 작업
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              side="bottom"
              align="end"
              sideOffset={2}
              onMouseEnter={() => {
                if (tabActionsTimeoutRef.current) {
                  clearTimeout(tabActionsTimeoutRef.current);
                  tabActionsTimeoutRef.current = null;
                }
              }}
              onMouseLeave={() => {
                tabActionsTimeoutRef.current = setTimeout(() => {
                  setTabActionsOpen(false);
                }, 150);
              }}
              className="min-w-[200px] rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl z-50 p-1"
            >
              <button
                onClick={handleRefresh}
                className="w-full rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2 text-left"
                type="button"
                aria-label="현재 탭 새로고침"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                현재창 새로고침
              </button>
              <button
                onClick={handleCloseCurrent}
                className="w-full rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2 text-left"
                type="button"
                aria-label="현재 탭 닫기"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                현재창 닫기
              </button>
              <button
                onClick={handleCloseOthers}
                className="w-full rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2 text-left"
                type="button"
                aria-label="현재 탭을 제외한 모든 탭 닫기"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                이창을 제외한 모든 창 닫기
              </button>
              <button
                onClick={handleCloseAll}
                className="w-full rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2 text-left"
                type="button"
                aria-label="모든 탭 닫기"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                모두 닫기
              </button>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
}

