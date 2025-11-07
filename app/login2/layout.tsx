import type { Metadata } from "next";
import { ThemeProvider } from "@/app/components/common/ThemeProvider";

export const metadata: Metadata = {
  title: "로그인",
  description: "웅진클라우드 로그인",
};

export default function Login2Layout({
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
                  var theme = localStorage.getItem("theme") || "system";
                  var colorTheme = localStorage.getItem("colorTheme") || "blue";
                  
                  // 컬러 테마 설정
                  document.documentElement.setAttribute("data-color-theme", colorTheme);
                  
                  // 테마 설정
                  if (theme === "dark") {
                    document.documentElement.classList.add("dark");
                    document.documentElement.style.colorScheme = "dark";
                  } else if (theme === "light") {
                    document.documentElement.classList.remove("dark");
                    document.documentElement.style.colorScheme = "light";
                  } else {
                    var m = window.matchMedia("(prefers-color-scheme: dark)");
                    if (m.matches) {
                      document.documentElement.classList.add("dark");
                      document.documentElement.style.colorScheme = "dark";
                    } else {
                      document.documentElement.classList.remove("dark");
                      document.documentElement.style.colorScheme = "light";
                    }
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

