import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Popover from "@radix-ui/react-popover";
import * as Avatar from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useSidebar } from "./SidebarProvider";
import { useFullscreen } from "./FullscreenProvider";
import { useTabs } from "./TabProvider";
import { Tabs } from "./Tabs";

interface HeaderProps {}

export const Header = function Header({}: HeaderProps) {
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();
  const { isMobileOpen, setIsMobileOpen } = useSidebar();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { isTabsEnabled, toggleTabs } = useTabs();
  const router = useRouter();
  
  const onSidebarToggle = React.useCallback(() => {
    setIsMobileOpen(!isMobileOpen);
  }, [isMobileOpen, setIsMobileOpen]);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [colorPaletteOpen, setColorPaletteOpen] = React.useState(false);
  const [languageOpen, setLanguageOpen] = React.useState(false);
  const [language, setLanguage] = React.useState("ko");
  const userMenuTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // 단순화된 포커스 링 컬러 클래스 생성 (포커스 링 숨김)
  const getFocusRingClass = React.useCallback(() => {
    return "";
  }, []);

  // 언어 이름 매핑
  const getLanguageName = React.useCallback((lang: string) => {
    const langMap: Record<string, string> = {
      ko: "한국어",
      en: "English",
      zh: "中文",
      es: "Español",
    };
    return langMap[lang] || langMap.ko;
  }, []);

  const colorOptions: Array<{ name: string; value: string; label: string }> = [
    { name: "blue", value: "#3b82f6", label: "블루" },
    { name: "red", value: "#ef4444", label: "레드" },
    { name: "green", value: "#22c55e", label: "그린" },
    { name: "yellow", value: "#eab308", label: "옐로우" },
    { name: "purple", value: "#a855f7", label: "퍼플" },
    { name: "pink", value: "#ec4899", label: "핑크" },
    { name: "indigo", value: "#6366f1", label: "인디고" },
    { name: "teal", value: "#14b8a6", label: "틸" },
    { name: "orange", value: "#f97316", label: "오렌지" },
    { name: "gray", value: "#6b7280", label: "그레이" },
    { name: "cyan", value: "#06b6d4", label: "시안" },
    { name: "emerald", value: "#10b981", label: "에메랄드" },
    { name: "violet", value: "#8b5cf6", label: "바이올렛" },
    { name: "fuchsia", value: "#d946ef", label: "푸시아" },
    { name: "rose", value: "#f43f5e", label: "로즈" },
    { name: "amber", value: "#f59e0b", label: "앰버" },
    { name: "lime", value: "#84cc16", label: "라임" },
    { name: "sky", value: "#0ea5e9", label: "스카이" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 검색 로직 추가
      console.log("검색어:", searchQuery);
      // 검색 후 팝오버 닫기 (선택사항)
      // setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex flex-col">
      <div className="w-full px-4 h-[63px] flex items-center">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 모바일 햄버거 버튼 */}
            <button
              onClick={onSidebarToggle}
              className={`md:hidden rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 ${isMobileOpen ? "hidden" : ""}`}
              aria-label="메뉴 열기/닫기"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-3">
            {/* 사용자 정보 */}
            <Popover.Root open={userMenuOpen} onOpenChange={setUserMenuOpen}>
              <Popover.Trigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none rounded-sm px-1 py-1"
                  aria-label="사용자 메뉴"
                  aria-expanded={userMenuOpen}
                  onMouseEnter={() => {
                    if (userMenuTimeoutRef.current) {
                      clearTimeout(userMenuTimeoutRef.current);
                      userMenuTimeoutRef.current = null;
                    }
                    setUserMenuOpen(true);
                  }}
                  onMouseLeave={() => {
                    userMenuTimeoutRef.current = setTimeout(() => {
                      setUserMenuOpen(false);
                    }, 150);
                  }}
                >
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center" aria-hidden="true">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    홍길동/사업부서명
                  </span>
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  side="bottom"
                  align="end"
                  sideOffset={8}
                  className="min-w-[160px] rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-xl z-50"
                  onMouseEnter={() => {
                    if (userMenuTimeoutRef.current) {
                      clearTimeout(userMenuTimeoutRef.current);
                      userMenuTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={() => {
                    userMenuTimeoutRef.current = setTimeout(() => {
                      setUserMenuOpen(false);
                    }, 150);
                  }}
                >
                  <button
                    className="w-full rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2 text-left"
                    onClick={(e) => {
                      e.preventDefault();
                      // 정보수정 로직 추가
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    정보수정
                  </button>
                  <button
                    className="w-full rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2 text-left"
                    onClick={(e) => {
                      e.preventDefault();
                      // 프로필보기 로직 추가
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    프로필보기
                  </button>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <div className="flex items-center gap-1">
              {/* 탭 기능 토글 */}
              <div className="hidden md:block">
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
            <button
              onClick={toggleTabs}
              className={`rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                isTabsEnabled
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-700 dark:text-gray-300"
              }`}
              aria-label="탭 기능 토글"
              aria-pressed={isTabsEnabled}
            >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="bottom"
                        sideOffset={5}
                        className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50"
                      >
                        {isTabsEnabled ? "탭 기능 끄기" : "탭 기능 켜기"}
                        <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
              {/* 컬러 팔레트 아이콘 */}
              <div className="hidden md:block">
                <Popover.Root open={colorPaletteOpen} onOpenChange={setColorPaletteOpen}>
                  <Tooltip.Provider>
                    <Tooltip.Root open={!colorPaletteOpen ? undefined : false}>
                      <Tooltip.Trigger asChild>
                        <Popover.Trigger asChild>
                          <button
                            className="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                            aria-label="컬러 팔레트"
                            aria-expanded={colorPaletteOpen}
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                          </button>
                        </Popover.Trigger>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="bottom"
                          sideOffset={5}
                          className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50"
                        >
                          컬러 팔레트
                          <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                  <Popover.Portal>
                    <Popover.Content
                      side="bottom"
                      align="end"
                      sideOffset={8}
                      className="rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl z-50 p-4"
                    >
                      <div className="grid grid-cols-6 gap-4 w-[360px]">
                        {colorOptions.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => {
                              setColorTheme(color.name as any);
                              setColorPaletteOpen(false);
                            }}
                            className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                            aria-label={color.label}
                          >
                            <div
                              className={`w-10 h-10 rounded-full transition-all ${
                                colorTheme === color.name
                                  ? "border-2 border-gray-900 dark:border-gray-100 scale-110"
                                  : "border-0"
                              }`}
                              style={{
                                backgroundColor: color.value,
                              }}
                            />
                            <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                              {color.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              </div>
              {/* 테마 변경 */}
              <div className="hidden md:block">
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <DropdownMenu.Root>
                      <Tooltip.Trigger asChild>
                        <DropdownMenu.Trigger asChild>
                          <button
                            className="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                            aria-label="테마 선택"
                            aria-expanded={undefined}
                          >
                            {theme === "light" ? (
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            ) : theme === "dark" ? (
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                        </DropdownMenu.Trigger>
                      </Tooltip.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content className="min-w-[160px] rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-xl z-50">
                          <DropdownMenu.Item
                            className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2"
                            onSelect={(e) => {
                              e.preventDefault();
                              setTheme("light");
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            라이트 모드
                            {theme === "light" && (
                              <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2"
                            onSelect={(e) => {
                              e.preventDefault();
                              setTheme("dark");
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            다크 모드
                            {theme === "dark" && (
                              <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-800" />
                          <DropdownMenu.Item
                            className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2"
                            onSelect={(e) => {
                              e.preventDefault();
                              setTheme("system");
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            시스템 설정
                            {theme === "system" && (
                              <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="bottom"
                        sideOffset={5}
                        className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50"
                      >
                        테마 변경
                        <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
              {/* 전체화면 버튼 */}
              <div className="hidden md:block">
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <button
                          onClick={toggleFullscreen}
                          className="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                          aria-label={isFullscreen ? "전체화면 종료" : "전체화면"}
                          aria-pressed={isFullscreen}
                        >
                  {isFullscreen ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  )}
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="bottom"
                        sideOffset={5}
                        className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50"
                      >
                        {isFullscreen ? "전체화면 종료" : "전체화면"}
                        <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
              {/* 다국어 버튼 */}
              <div className="hidden md:block">
                <Popover.Root open={languageOpen} onOpenChange={setLanguageOpen}>
                  <Tooltip.Provider>
                    <Tooltip.Root open={!languageOpen ? undefined : false}>
                      <Tooltip.Trigger asChild>
                        <Popover.Trigger asChild>
                          <button
                            type="button"
                            className={`rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 flex items-center justify-center focus:outline-none ${getFocusRingClass()}`}
                            aria-label={`언어 선택, 현재 선택: ${getLanguageName(language)}`}
                            aria-expanded={languageOpen}
                            aria-haspopup="true"
                          >
                            <span className="text-xl" aria-hidden="true">
                              {language === "ko" ? "🇰🇷" : language === "en" ? "🇺🇸" : language === "zh" ? "🇨🇳" : "🇪🇸"}
                            </span>
                          </button>
                        </Popover.Trigger>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="bottom"
                          sideOffset={5}
                          className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50"
                        >
                          언어 선택
                          <Tooltip.Arrow className="fill-gray-900 dark:bg-gray-800" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                  <Popover.Portal>
                    <Popover.Content
                      side="bottom"
                      align="end"
                      sideOffset={8}
                      className="min-w-[180px] rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl z-50 p-1"
                      role="listbox"
                      aria-label="언어 선택 목록"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setLanguage("ko");
                          setLanguageOpen(false);
                        }}
                        className={`w-full rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2 text-left focus:outline-none ${getFocusRingClass()} ${
                          language === "ko" ? "bg-gray-50 dark:bg-gray-800" : ""
                        }`}
                        aria-label="한국어 선택"
                        aria-pressed={language === "ko"}
                        role="option"
                        aria-selected={language === "ko"}
                      >
                        <span className="text-lg" aria-hidden="true">🇰🇷</span>
                        <span>한국어</span>
                        {language === "ko" && (
                          <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLanguage("en");
                          setLanguageOpen(false);
                        }}
                        className={`w-full rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2 text-left focus:outline-none ${getFocusRingClass()} ${
                          language === "en" ? "bg-gray-50 dark:bg-gray-800" : ""
                        }`}
                        aria-label="English 선택"
                        aria-pressed={language === "en"}
                        role="option"
                        aria-selected={language === "en"}
                      >
                        <span className="text-lg" aria-hidden="true">🇺🇸</span>
                        <span>English</span>
                        {language === "en" && (
                          <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLanguage("zh");
                          setLanguageOpen(false);
                        }}
                        className={`w-full rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2 text-left focus:outline-none ${getFocusRingClass()} ${
                          language === "zh" ? "bg-gray-50 dark:bg-gray-800" : ""
                        }`}
                        aria-label="중국어 선택"
                        aria-pressed={language === "zh"}
                        role="option"
                        aria-selected={language === "zh"}
                      >
                        <span className="text-lg" aria-hidden="true">🇨🇳</span>
                        <span>中文</span>
                        {language === "zh" && (
                          <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLanguage("es");
                          setLanguageOpen(false);
                        }}
                        className={`w-full rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2 text-left focus:outline-none ${getFocusRingClass()} ${
                          language === "es" ? "bg-gray-50 dark:bg-gray-800" : ""
                        }`}
                        aria-label="스페인어 선택"
                        aria-pressed={language === "es"}
                        role="option"
                        aria-selected={language === "es"}
                      >
                        <span className="text-lg" aria-hidden="true">🇪🇸</span>
                        <span>Español</span>
                        {language === "es" && (
                          <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              </div>
              {/* 검색 */}
              <Popover.Root open={searchOpen} onOpenChange={setSearchOpen}>
                <Tooltip.Provider>
                  <Tooltip.Root open={!searchOpen ? undefined : false}>
                    <Tooltip.Trigger asChild>
                      <Popover.Trigger asChild>
                        <button
                          className="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                          aria-label="검색"
                          aria-expanded={searchOpen}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </button>
                      </Popover.Trigger>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="bottom"
                        sideOffset={5}
                        className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50"
                      >
                        검색
                        <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
                <Popover.Portal>
                  <Popover.Content
                    side="bottom"
                    align="end"
                    sideOffset={8}
                    className="min-w-[320px] rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl z-50 p-4"
                    onOpenAutoFocus={(e) => {
                      e.preventDefault();
                      const input = document.getElementById("header-search-input");
                      if (input) {
                        input.focus();
                      }
                    }}
                  >
                    <form onSubmit={handleSearch} className="flex flex-col gap-3">
                      <div className="relative">
                        <label htmlFor="header-search-input" className="sr-only">
                          검색어 입력
                        </label>
                        <input
                          id="header-search-input"
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="검색어를 입력하세요"
                          className="w-full h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm text-left text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          autoFocus
                          aria-label="검색어 입력"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
                            aria-label="삭제"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery("");
                            setSearchOpen(false);
                          }}
                          className="h-[32px] px-4 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          className="h-[32px] px-4 rounded-sm bg-blue-500 dark:bg-blue-600 text-sm text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          검색
                        </button>
                      </div>
                    </form>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
              {/* 로그아웃 */}
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      className="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                      aria-label="로그아웃"
                      onClick={() => {
                        router.push("/login");
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="bottom"
                      sideOffset={5}
                      className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50"
                    >
                      나가기
                      <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
        </div>
      </div>
      {isTabsEnabled && <div className="hidden md:block"><Tabs /></div>}
    </header>
  );
};
