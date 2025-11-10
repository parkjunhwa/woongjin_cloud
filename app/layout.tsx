import type { Metadata } from "next";
import "./globals.scss";
import { ThemeProvider } from "./components/common/ThemeProvider";
import { SidebarProvider } from "./components/common/SidebarProvider";
import { FullscreenProvider } from "./components/common/FullscreenProvider";
import { TabProvider } from "./components/common/TabProvider";

export const metadata: Metadata = {
  title: "Radix UI 컴포넌트 정의",
  description: "Reacr, Next.js dashboard with all Radix UI components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased transition-colors">
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme;
                  var colorTheme;
                  try {
                    theme = localStorage.getItem("theme");
                    colorTheme = localStorage.getItem("colorTheme") || "blue";
                  } catch (e) {
                    theme = null;
                    colorTheme = "blue";
                  }
                  
                  // 컬러 테마 설정
                  document.documentElement.setAttribute("data-color-theme", colorTheme);
                  
                  // 테마 설정
                  if (theme === "dark") {
                    document.documentElement.classList.add("dark");
                    document.documentElement.style.colorScheme = "dark";
                  } else if (theme === "light") {
                    document.documentElement.classList.remove("dark");
                    document.documentElement.style.colorScheme = "light";
                  } else if (theme === "system") {
                    var m = window.matchMedia("(prefers-color-scheme: dark)");
                    if (m.matches) {
                      document.documentElement.classList.add("dark");
                      document.documentElement.style.colorScheme = "dark";
                    } else {
                      document.documentElement.classList.remove("dark");
                      document.documentElement.style.colorScheme = "light";
                    }
                  } else {
                    document.documentElement.classList.remove("dark");
                    document.documentElement.style.colorScheme = "light";
                  }
                } catch (e) {
                  document.documentElement.classList.remove("dark");
                  document.documentElement.style.colorScheme = "light";
                  document.documentElement.setAttribute("data-color-theme", "blue");
                }
              })();
            `,
          }}
        />
        <ThemeProvider>
          <SidebarProvider>
            <FullscreenProvider>
              <TabProvider>
                <a href="#main-content" className="skip-to-content">
                  본문으로 건너뛰기
                </a>
                {children}
              </TabProvider>
            </FullscreenProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
