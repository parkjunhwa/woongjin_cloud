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
                  try {
                    theme = localStorage.getItem("theme");
                  } catch (e) {
                    theme = null;
                  }
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
                }
              })();
            `,
          }}
        />
        <ThemeProvider>
          <SidebarProvider>
            <FullscreenProvider>
              <TabProvider>
        {children}
              </TabProvider>
            </FullscreenProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
