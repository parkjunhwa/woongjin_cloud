"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/app/components/common/ThemeProvider";

export default function Login2Page() {
  const { colorTheme } = useTheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 추가
    console.log("로그인 시도:", { email, password, rememberMe });
  };

  // 테마 컬러에 따른 동적 클래스 생성
  const getThemeColorClasses = (baseColor: string) => {
    const colorMap: Record<string, { 
      focusRing: string; 
      checkbox: string; 
      link: string; 
      linkHover: string; 
      button: string; 
      buttonHover: string;
      buttonDark: string;
      buttonDarkHover: string;
    }> = {
      blue: { 
        focusRing: "focus:ring-blue-500", 
        checkbox: "text-blue-500", 
        link: "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300",
        linkHover: "hover:text-blue-600 dark:hover:text-blue-300",
        button: "bg-blue-500 hover:bg-blue-600",
        buttonHover: "hover:bg-blue-600",
        buttonDark: "dark:bg-blue-600",
        buttonDarkHover: "dark:hover:bg-blue-700"
      },
      red: { 
        focusRing: "focus:ring-red-500", 
        checkbox: "text-red-500", 
        link: "text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300",
        linkHover: "hover:text-red-600 dark:hover:text-red-300",
        button: "bg-red-500 hover:bg-red-600",
        buttonHover: "hover:bg-red-600",
        buttonDark: "dark:bg-red-600",
        buttonDarkHover: "dark:hover:bg-red-700"
      },
      green: { 
        focusRing: "focus:ring-green-500", 
        checkbox: "text-green-500", 
        link: "text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300",
        linkHover: "hover:text-green-600 dark:hover:text-green-300",
        button: "bg-green-500 hover:bg-green-600",
        buttonHover: "hover:bg-green-600",
        buttonDark: "dark:bg-green-600",
        buttonDarkHover: "dark:hover:bg-green-700"
      },
      yellow: { 
        focusRing: "focus:ring-yellow-500", 
        checkbox: "text-yellow-500", 
        link: "text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300",
        linkHover: "hover:text-yellow-600 dark:hover:text-yellow-300",
        button: "bg-yellow-500 hover:bg-yellow-600",
        buttonHover: "hover:bg-yellow-600",
        buttonDark: "dark:bg-yellow-600",
        buttonDarkHover: "dark:hover:bg-yellow-700"
      },
      purple: { 
        focusRing: "focus:ring-purple-500", 
        checkbox: "text-purple-500", 
        link: "text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300",
        linkHover: "hover:text-purple-600 dark:hover:text-purple-300",
        button: "bg-purple-500 hover:bg-purple-600",
        buttonHover: "hover:bg-purple-600",
        buttonDark: "dark:bg-purple-600",
        buttonDarkHover: "dark:hover:bg-purple-700"
      },
      pink: { 
        focusRing: "focus:ring-pink-500", 
        checkbox: "text-pink-500", 
        link: "text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300",
        linkHover: "hover:text-pink-600 dark:hover:text-pink-300",
        button: "bg-pink-500 hover:bg-pink-600",
        buttonHover: "hover:bg-pink-600",
        buttonDark: "dark:bg-pink-600",
        buttonDarkHover: "dark:hover:bg-pink-700"
      },
      indigo: { 
        focusRing: "focus:ring-indigo-500", 
        checkbox: "text-indigo-500", 
        link: "text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300",
        linkHover: "hover:text-indigo-600 dark:hover:text-indigo-300",
        button: "bg-indigo-500 hover:bg-indigo-600",
        buttonHover: "hover:bg-indigo-600",
        buttonDark: "dark:bg-indigo-600",
        buttonDarkHover: "dark:hover:bg-indigo-700"
      },
      teal: { 
        focusRing: "focus:ring-teal-500", 
        checkbox: "text-teal-500", 
        link: "text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300",
        linkHover: "hover:text-teal-600 dark:hover:text-teal-300",
        button: "bg-teal-500 hover:bg-teal-600",
        buttonHover: "hover:bg-teal-600",
        buttonDark: "dark:bg-teal-600",
        buttonDarkHover: "dark:hover:bg-teal-700"
      },
      orange: { 
        focusRing: "focus:ring-orange-500", 
        checkbox: "text-orange-500", 
        link: "text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300",
        linkHover: "hover:text-orange-600 dark:hover:text-orange-300",
        button: "bg-orange-500 hover:bg-orange-600",
        buttonHover: "hover:bg-orange-600",
        buttonDark: "dark:bg-orange-600",
        buttonDarkHover: "dark:hover:bg-orange-700"
      },
      gray: { 
        focusRing: "focus:ring-gray-500", 
        checkbox: "text-gray-500", 
        link: "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
        linkHover: "hover:text-gray-600 dark:hover:text-gray-300",
        button: "bg-gray-500 hover:bg-gray-600",
        buttonHover: "hover:bg-gray-600",
        buttonDark: "dark:bg-gray-600",
        buttonDarkHover: "dark:hover:bg-gray-700"
      },
      cyan: { 
        focusRing: "focus:ring-cyan-500", 
        checkbox: "text-cyan-500", 
        link: "text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300",
        linkHover: "hover:text-cyan-600 dark:hover:text-cyan-300",
        button: "bg-cyan-500 hover:bg-cyan-600",
        buttonHover: "hover:bg-cyan-600",
        buttonDark: "dark:bg-cyan-600",
        buttonDarkHover: "dark:hover:bg-cyan-700"
      },
      emerald: { 
        focusRing: "focus:ring-emerald-500", 
        checkbox: "text-emerald-500", 
        link: "text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300",
        linkHover: "hover:text-emerald-600 dark:hover:text-emerald-300",
        button: "bg-emerald-500 hover:bg-emerald-600",
        buttonHover: "hover:bg-emerald-600",
        buttonDark: "dark:bg-emerald-600",
        buttonDarkHover: "dark:hover:bg-emerald-700"
      },
      violet: { 
        focusRing: "focus:ring-violet-500", 
        checkbox: "text-violet-500", 
        link: "text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300",
        linkHover: "hover:text-violet-600 dark:hover:text-violet-300",
        button: "bg-violet-500 hover:bg-violet-600",
        buttonHover: "hover:bg-violet-600",
        buttonDark: "dark:bg-violet-600",
        buttonDarkHover: "dark:hover:bg-violet-700"
      },
      fuchsia: { 
        focusRing: "focus:ring-fuchsia-500", 
        checkbox: "text-fuchsia-500", 
        link: "text-fuchsia-500 hover:text-fuchsia-600 dark:text-fuchsia-400 dark:hover:text-fuchsia-300",
        linkHover: "hover:text-fuchsia-600 dark:hover:text-fuchsia-300",
        button: "bg-fuchsia-500 hover:bg-fuchsia-600",
        buttonHover: "hover:bg-fuchsia-600",
        buttonDark: "dark:bg-fuchsia-600",
        buttonDarkHover: "dark:hover:bg-fuchsia-700"
      },
      rose: { 
        focusRing: "focus:ring-rose-500", 
        checkbox: "text-rose-500", 
        link: "text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300",
        linkHover: "hover:text-rose-600 dark:hover:text-rose-300",
        button: "bg-rose-500 hover:bg-rose-600",
        buttonHover: "hover:bg-rose-600",
        buttonDark: "dark:bg-rose-600",
        buttonDarkHover: "dark:hover:bg-rose-700"
      },
      amber: { 
        focusRing: "focus:ring-amber-500", 
        checkbox: "text-amber-500", 
        link: "text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300",
        linkHover: "hover:text-amber-600 dark:hover:text-amber-300",
        button: "bg-amber-500 hover:bg-amber-600",
        buttonHover: "hover:bg-amber-600",
        buttonDark: "dark:bg-amber-600",
        buttonDarkHover: "dark:hover:bg-amber-700"
      },
      lime: { 
        focusRing: "focus:ring-lime-500", 
        checkbox: "text-lime-500", 
        link: "text-lime-500 hover:text-lime-600 dark:text-lime-400 dark:hover:text-lime-300",
        linkHover: "hover:text-lime-600 dark:hover:text-lime-300",
        button: "bg-lime-500 hover:bg-lime-600",
        buttonHover: "hover:bg-lime-600",
        buttonDark: "dark:bg-lime-600",
        buttonDarkHover: "dark:hover:bg-lime-700"
      },
      sky: { 
        focusRing: "focus:ring-sky-500", 
        checkbox: "text-sky-500", 
        link: "text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300",
        linkHover: "hover:text-sky-600 dark:hover:text-sky-300",
        button: "bg-sky-500 hover:bg-sky-600",
        buttonHover: "hover:bg-sky-600",
        buttonDark: "dark:bg-sky-600",
        buttonDarkHover: "dark:hover:bg-sky-700"
      }
    };
    return colorMap[baseColor] || colorMap.blue;
  };

  const themeColors = getThemeColorClasses(colorTheme);

  return (
    <div className="min-h-screen flex">
      {/* 왼쪽 배경 이미지 영역 */}
      <div 
        className="hidden lg:flex lg:w-[calc(100%-600px)] bg-cover bg-center bg-no-repeat relative"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'), linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center"
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex items-center justify-center w-full p-8">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">웅진클라우드</h2>
            <p className="text-lg opacity-90">차세대 IT 솔루션으로 비즈니스를 혁신하세요</p>
          </div>
        </div>
      </div>

      {/* 오른쪽 로그인 폼 영역 (600px 고정) */}
      <div className="w-full lg:w-[600px] flex items-center justify-center bg-white dark:bg-gray-950 p-8">
        <div className="w-full max-w-md">
          {/* 로고 */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/logo_b.svg"
              alt="woongjin cloud"
              width={150}
              height={40}
              className="h-10 w-auto dark:hidden"
              priority
            />
            <Image
              src="/images/logo_w.svg"
              alt="woongjin cloud"
              width={150}
              height={40}
              className="h-10 w-auto hidden dark:block"
              priority
            />
          </div>

          {/* 제목 */}
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
            로그인
          </h1>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-8">
            계정에 로그인하여 시작하세요
          </p>

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 이메일 입력 */}
            <div>
              <label htmlFor="email2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                이메일
              </label>
              <input
                id="email2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full h-[40px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 ${themeColors.focusRing} focus:border-transparent`}
                placeholder="이메일을 입력하세요"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                비밀번호
              </label>
              <input
                id="password2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full h-[40px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 ${themeColors.focusRing} focus:border-transparent`}
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            {/* 아이디 저장 및 비밀번호 찾기 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={`w-4 h-4 rounded border-gray-300 dark:border-gray-700 ${themeColors.checkbox} focus:ring-2 ${themeColors.focusRing}`}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">아이디 저장</span>
              </label>
              <Link href="#" className={`text-sm ${themeColors.link}`}>
                비밀번호 찾기
              </Link>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className={`w-full h-[40px] rounded-sm ${themeColors.button} ${themeColors.buttonDark} ${themeColors.buttonDarkHover} text-sm font-medium text-white transition-colors`}
            >
              로그인
            </button>
          </form>

          {/* 회원가입 링크 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              계정이 없으신가요?{" "}
              <Link href="#" className={`text-sm ${themeColors.link} font-medium`}>
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

