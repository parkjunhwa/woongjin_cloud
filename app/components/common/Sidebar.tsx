"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Popover from "@radix-ui/react-popover";
import { useSidebar } from "./SidebarProvider";
import { useTheme } from "./ThemeProvider";
import { useTabs } from "./TabProvider";

interface SidebarProps { }

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: "대시보드",
    href: "/",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "퍼블리싱",
    href: "/published",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "컴포넌트",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    children: [
      {
        label: "버튼",
        href: "#",
        icon: null,
        children: [
          {
            label: "기본 버튼",
            href: "#",
            icon: null,
            children: [
              {
                label: "Primary",
                href: "#",
                icon: null,
              },
              {
                label: "Secondary",
                href: "#",
                icon: null,
              },
            ],
          },
          {
            label: "아이콘 버튼",
            href: "#",
            icon: null,
          },
        ],
      },
      {
        label: "입력",
        href: "#",
        icon: null,
        children: [
          {
            label: "텍스트 입력",
            href: "#",
            icon: null,
          },
          {
            label: "숫자 입력",
            href: "#",
            icon: null,
          },
        ],
      },
      {
        label: "카드",
        href: "#",
        icon: null,
      },
    ],
  },
  {
    label: "설정",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    children: [
      {
        label: "일반 설정",
        href: "#",
        icon: null,
        children: [
          {
            label: "프로필",
            href: "#",
            icon: null,
            children: [
              {
                label: "개인정보",
                href: "#",
                icon: null,
              },
              {
                label: "비밀번호",
                href: "#",
                icon: null,
              },
            ],
          },
          {
            label: "언어",
            href: "#",
            icon: null,
          },
        ],
      },
      {
        label: "보안",
        href: "#",
        icon: null,
        children: [
          {
            label: "2단계 인증",
            href: "#",
            icon: null,
          },
          {
            label: "로그인 기록",
            href: "#",
            icon: null,
          },
        ],
      },
      {
        label: "알림",
        href: "#",
        icon: null,
      },
    ],
  },
];

export const Sidebar = React.memo(function Sidebar({ }: SidebarProps) {
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar();
  const { theme } = useTheme();
  const { addTab, setActiveTab, isTabsEnabled } = useTabs();
  const router = useRouter();

  // 현재 적용된 테마 확인 (system일 경우 실제 다크 모드 여부 확인)
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const checkDarkMode = () => {
      if (theme === "dark") {
        setIsDark(true);
      } else if (theme === "light") {
        setIsDark(false);
      } else {
        // system 모드일 경우 실제 다크 모드 여부 확인
        setIsDark(document.documentElement.classList.contains("dark"));
      }
    };

    checkDarkMode();

    // 시스템 테마 변경 감지
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => checkDarkMode();
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const onToggle = React.useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed, setIsCollapsed]);

  const onMobileClose = React.useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({});
  const [hoveredMenu, setHoveredMenu] = React.useState<string | null>(null);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = React.useCallback((label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  }, []);

  const handleMouseEnter = React.useCallback((menuKey: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredMenu(menuKey);
  }, []);

  const handleMouseLeave = React.useCallback((menuKey: string) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 150);
  }, []);

  // 팝오버 내부 서브메뉴 렌더링 (접힘 상태에서 사용)
  const renderSubMenu = (item: NavItem, depth: number = 1): React.ReactNode => {
    const isActive = pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;
    const childMenuKey = `${item.label}-${depth}`;
    const isChildMenuOpen = openMenus[childMenuKey] || false;

    if (depth >= 4) {
      return null;
    }

    if (hasChildren) {
      return (
        <li key={childMenuKey}>
          <Collapsible.Root open={isChildMenuOpen} onOpenChange={() => toggleMenu(childMenuKey)}>
            <Collapsible.Trigger asChild>
              <button
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-sm transition-colors text-left ${isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-50"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                style={{ paddingLeft: `${8 + (depth - 1) * 16}px` }}
              >
                <span className="text-sm font-medium truncate min-w-0 flex-1">{item.label}</span>
                <svg
                  className={`w-4 h-4 transition-transform flex-shrink-0 ${isChildMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </Collapsible.Trigger>
            <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
              <ul className="pt-1 space-y-1">
                {item.children?.map((child) => renderSubMenu(child, depth + 1))}
              </ul>
            </Collapsible.Content>
          </Collapsible.Root>
        </li>
      );
    }

    return (
      <li key={childMenuKey}>
        <Link
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            // 탭 기능이 켜져 있을 때만 탭 기능 사용
            if (isTabsEnabled) {
              // 대시보드(/)는 home 탭과 동일하므로 home 탭 활성화
              if (item.href === "/") {
                setActiveTab("home");
                router.push("/");
              } else {
                addTab({
                  id: item.href,
                  label: item.label,
                  href: item.href,
                });
                router.push(item.href);
              }
            } else {
              // 탭 기능이 꺼져 있을 때는 바로 페이지 이동만
              router.push(item.href);
            }
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-sm transition-colors text-sm ${isActive
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-50"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          style={{ paddingLeft: `${8 + (depth - 1) * 16}px` }}
        >
          <span className="font-medium truncate min-w-0 flex-1">{item.label}</span>
        </Link>
      </li>
    );
  };

  const renderMenuItem = (item: NavItem, depth: number = 0): React.ReactNode => {
    const isActive = pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;
    const menuKey = `${item.label}-${depth}`;
    const isMenuOpen = openMenus[menuKey] || false;

    // 4depth까지만 지원
    if (depth >= 4) {
      return null;
    }

    // 접힘 상태에서는 아이콘만 표시하고, 자식이 있으면 팝오버 표시 (모바일에서는 항상 펼쳐진 상태)
    if (isCollapsed && depth === 0 && !(isMobileOpen !== undefined && isMobileOpen)) {
      const isHovered = hoveredMenu === menuKey;

      if (hasChildren) {
        return (
          <li key={menuKey}>
            <Popover.Root open={isHovered} onOpenChange={(open) => !open && setHoveredMenu(null)}>
              <Popover.Trigger asChild>
                <div
                  data-sidebar-trigger={menuKey}
                  onMouseEnter={() => handleMouseEnter(menuKey)}
                  onMouseLeave={() => handleMouseLeave(menuKey)}
                  className={`sidebar-item flex items-center justify-center px-3 py-2 rounded-sm transition-colors cursor-pointer relative ${isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-50"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                </div>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  data-popover-content={menuKey}
                  side="right"
                  sideOffset={0}
                  align="start"
                  onMouseEnter={() => handleMouseEnter(menuKey)}
                  onMouseLeave={() => handleMouseLeave(menuKey)}
                  className="min-w-[200px] rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl z-50 p-2 relative"
                >
                  {/* 팝오버 왼쪽 화살표 테두리 (바깥쪽) */}
                  <span className="absolute left-0 top-[12px] -translate-x-full w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[7px] border-r-gray-200 dark:border-r-gray-800"></span>
                  {/* 팝오버 왼쪽 화살표 배경 (안쪽) */}
                  <span className="absolute left-0 top-[12px] -translate-x-full w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-white dark:border-r-gray-900" style={{ marginLeft: '1px' }}></span>
                  <ul className="space-y-1">
                    {item.children?.map((child) => renderSubMenu(child, 1))}
                  </ul>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </li>
        );
      }

      return (
        <li key={menuKey}>
          <Link
            href={item.href}
            className={`sidebar-item flex items-center justify-center px-3 py-2 rounded-sm transition-colors ${isActive
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-50"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            title={item.label}
            onClick={() => {
              // 모바일에서 메뉴 클릭 시 사이드바 닫기
              if (isMobileOpen && onMobileClose) {
                onMobileClose();
              }
            }}
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          </Link>
        </li>
      );
    }

    // 자식이 있는 경우 Collapsible로 렌더링 (모바일에서는 항상 펼쳐진 상태)
    if (hasChildren && (!isCollapsed || (isMobileOpen !== undefined && isMobileOpen))) {
      return (
        <li key={menuKey}>
          <Collapsible.Root open={isMenuOpen} onOpenChange={() => toggleMenu(menuKey)}>
            <Collapsible.Trigger asChild>
              <button
                className={`sidebar-item w-full flex items-center gap-3 px-3 py-2 rounded-sm transition-colors ${depth === 0
                  ? isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-50 active"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  : isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-50"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                style={{ paddingLeft: `${12 + depth * 16}px` }}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {depth === 0 && item.icon && (
                    <span className="flex-shrink-0">{item.icon}</span>
                  )}
                  <span className={`font-medium truncate ${depth === 0 ? "text-sm" : "text-sm"}`}>
                    {item.label}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform flex-shrink-0 ${isMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </Collapsible.Trigger>
            <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
              <ul className="pt-1 space-y-1">
                {item.children?.map((child) => renderMenuItem(child, depth + 1))}
              </ul>
            </Collapsible.Content>
          </Collapsible.Root>
        </li>
      );
    }

    // 자식이 없는 경우 Link로 렌더링
    return (
      <li key={menuKey}>
        <Link
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            // 탭 기능이 켜져 있을 때만 탭 기능 사용
            if (isTabsEnabled) {
              // 대시보드(/)는 home 탭과 동일하므로 home 탭 활성화
              if (item.href === "/") {
                setActiveTab("home");
                router.push("/");
              } else {
                addTab({
                  id: item.href,
                  label: item.label,
                  href: item.href,
                });
                router.push(item.href);
              }
            } else {
              // 탭 기능이 꺼져 있을 때는 바로 페이지 이동만
              router.push(item.href);
            }
            // 모바일에서 메뉴 클릭 시 사이드바 닫기
            if (isMobileOpen && onMobileClose) {
              onMobileClose();
            }
          }}
          className={`sidebar-item flex items-center gap-3 px-3 py-2 rounded-sm transition-colors ${depth === 0
              ? isActive
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-50 active"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              : isActive
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-50"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          style={{ paddingLeft: depth > 0 ? `${12 + depth * 16}px` : undefined }}
          title={isCollapsed && depth === 0 ? item.label : undefined}
        >
          {depth === 0 && item.icon && (
            <span className={`flex-shrink-0 ${isCollapsed && !(isMobileOpen !== undefined && isMobileOpen) ? "mx-auto" : ""}`}>
              {item.icon}
            </span>
          )}
          {(!isCollapsed || (isMobileOpen !== undefined && isMobileOpen)) && (
            <span className={`font-medium truncate min-w-0 flex-1 ${depth === 0 ? "text-sm" : "text-sm"}`}>
              {item.label}
            </span>
          )}
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* 모바일 오버레이 */}
      {isMobileOpen && onMobileClose && (
        <div
          className="fixed inset-0 bg-black/50 z-[50] md:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar md:fixed ${isMobileOpen !== undefined && isMobileOpen ? "absolute md:fixed" : "fixed"} left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 flex flex-col ${isMobileOpen !== undefined && isMobileOpen
            ? "w-full max-w-full"
            : isCollapsed
              ? "w-16"
              : "w-64"
          } ${isMobileOpen !== undefined
            ? isMobileOpen
              ? "translate-x-0 z-[60] md:w-64"
              : "-translate-x-full md:translate-x-0 z-40"
            : "z-40"
          }`}
      >
        {/* 사이드바 헤더 */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-800 min-h-[64px]">
          {(!isCollapsed || (isMobileOpen !== undefined && isMobileOpen)) && (
            <div className="flex items-center gap-2">
              <Image
                src={isDark ? "/images/logo_w.svg" : "/images/logo_b.svg"}
                alt="woongjin cloud"
                height={28}
                width={120}
                className="h-6 w-auto mt-3"
                priority
              />
              <span className="font-bold">클라우드</span>
            </div>
          )}
          <button
            onClick={() => {
              if (onMobileClose && isMobileOpen) {
                onMobileClose();
              } else {
                onToggle();
              }
            }}
            className="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
            aria-label={isMobileOpen ? "사이드바 닫기" : isCollapsed ? "사이드바 펼치기" : "사이드바 접기"}
          >
            {/* 모바일에서 메뉴가 열렸을 때는 X 아이콘 */}
            {isMobileOpen !== undefined && isMobileOpen ? (
              <svg className="w-5 h-5 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : isCollapsed ? (
              // 접힘 상태에서는 햄버거 아이콘
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              // 펼침 상태에서는 데스크톱에서만 왼쪽 화살표
              <svg className="w-5 h-5 md:block hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            )}
          </button>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => renderMenuItem(item))}
          </ul>
        </nav>

        {/* 사이드바 푸터 (접힘 상태에서는 숨김, 모바일에서는 항상 표시) */}
        {(!isCollapsed || (isMobileOpen !== undefined && isMobileOpen)) && (
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              © 2024 웅진클라우드
            </div>
          </div>
        )}
      </aside>
    </>
  );
});

