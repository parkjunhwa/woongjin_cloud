"use client";

import * as React from "react";

interface FullscreenContextType {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const FullscreenContext = React.createContext<FullscreenContextType | undefined>(undefined);

export function FullscreenProvider({ children }: { children: React.ReactNode }) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // 전체화면 상태 감지
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // 전체화면 변경 이벤트 리스너 등록
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    // 초기 상태 확인
    setIsFullscreen(!!document.fullscreenElement);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = React.useCallback(() => {
    if (!document.fullscreenElement) {
      // 전체화면 진입
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        // Safari
        (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        // Firefox
        (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        // IE/Edge
        (element as any).msRequestFullscreen();
      }
    } else {
      // 전체화면 종료
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        // Safari
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        // Firefox
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        // IE/Edge
        (document as any).msExitFullscreen();
      }
    }
  }, []);

  return (
    <FullscreenContext.Provider value={{ isFullscreen, toggleFullscreen }}>
      {children}
    </FullscreenContext.Provider>
  );
}

export function useFullscreen() {
  const context = React.useContext(FullscreenContext);
  if (context === undefined) {
    throw new Error("useFullscreen must be used within a FullscreenProvider");
  }
  return context;
}

