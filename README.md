# 웅진 클라우드 대시보드

웅진 클라우드를 위한 현대적이고 접근성 높은 관리자 대시보드 시스템입니다. Radix UI 기반의 고품질 컴포넌트와 완전한 웹 접근성 지원을 제공합니다.

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [주요 기능](#주요-기능)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [주요 컴포넌트](#주요-컴포넌트)
- [웹 접근성](#웹-접근성)
- [개발 가이드](#개발-가이드)

## 🎯 프로젝트 개요

웅진 클라우드 대시보드는 Next.js 14와 React 18을 기반으로 구축된 엔터프라이즈급 관리자 대시보드입니다. Radix UI의 접근성 높은 컴포넌트를 활용하여 사용자 친화적이고 접근성이 뛰어난 인터페이스를 제공합니다.

### 핵심 특징

- ✅ **완전한 웹 접근성**: WCAG 2.1 AA 수준 준수
- 🎨 **다크 모드 지원**: 라이트/다크/시스템 테마 자동 전환
- 🎨 **동적 테마 컬러**: 18가지 컬러 테마 지원
- 📱 **반응형 디자인**: 모바일부터 데스크톱까지 완벽 지원
- 🗂️ **탭 네비게이션**: 멀티 탭 작업 환경
- 🔍 **통합 검색**: 빠른 콘텐츠 검색 기능
- ⚡ **고성능**: Next.js 14 App Router 기반 최적화

## 🛠️ 기술 스택

### 프론트엔드 프레임워크
- **Next.js 14.2.0** - React 프레임워크 (App Router)
- **React 18.3.0** - UI 라이브러리
- **TypeScript 5.4.0** - 타입 안정성

### UI 컴포넌트
- **Radix UI** - 접근성 높은 헤드리스 UI 컴포넌트 라이브러리
  - Accordion, AlertDialog, Avatar, Checkbox, Dialog, DropdownMenu
  - Popover, RadioGroup, Select, Switch, Tabs, Toast, Tooltip 등
- **react-day-picker 9.1.0** - 날짜 선택 컴포넌트
- **date-fns 3.6.0** - 날짜 유틸리티

### 스타일링
- **Tailwind CSS 3.4.0** - 유틸리티 퍼스트 CSS 프레임워크
- **SCSS/Sass 1.93.3** - CSS 전처리기
- **PostCSS 8.4.0** - CSS 후처리기
- **Autoprefixer** - 브라우저 호환성

### 개발 도구
- **ESLint** - 코드 품질 관리
- **TypeScript** - 정적 타입 검사

## ✨ 주요 기능

### 1. 테마 시스템
- **라이트/다크 모드**: 사용자 선택 또는 시스템 설정 자동 감지
- **동적 컬러 테마**: 18가지 컬러 팔레트 (Blue, Red, Green, Yellow, Purple, Pink, Indigo, Teal, Orange, Gray, Cyan, Emerald, Violet, Fuchsia, Rose, Amber, Lime, Sky)
- **시스템 테마 연동**: OS 설정에 따른 자동 테마 전환
- **로컬 스토리지 저장**: 사용자 설정 영구 저장

### 2. 사이드바 네비게이션
- **접기/펼치기**: 공간 효율적인 사이드바 관리
- **4단계 깊이 메뉴**: 복잡한 메뉴 구조 지원
- **호버 팝오버**: 접힌 상태에서 서브메뉴 미리보기
- **모바일 반응형**: 모바일에서 오버레이 사이드바
- **활성 상태 표시**: 현재 페이지 하이라이트
- **로고 자동 전환**: 라이트/다크 모드에 따른 로고 변경

### 3. 탭 네비게이션 시스템
- **멀티 탭 작업**: 여러 페이지를 동시에 열어 작업 가능
- **탭 관리 기능**:
  - 현재 탭 새로고침
  - 현재 탭 닫기
  - 모든 탭 닫기
  - 다른 탭 닫기
- **홈 탭 보호**: 기본 홈 탭은 항상 유지
- **가로 스크롤**: 많은 탭 지원을 위한 스크롤 기능
- **탭 기능 토글**: 탭 기능 켜기/끄기

### 4. 헤더 기능
- **사용자 메뉴**: 정보 수정, 프로필 보기 (호버 팝오버)
- **검색 기능**: 통합 검색 팝오버
- **테마 변경**: 라이트/다크/시스템 모드 전환
- **컬러 팔레트**: 동적 테마 컬러 선택
- **전체화면 토글**: 브라우저 전체화면 모드 지원
- **모바일 햄버거 메뉴**: 모바일에서 사이드바 토글

### 5. UI 컴포넌트 라이브러리
다양한 Radix UI 기반 컴포넌트 제공:
- **Form 컴포넌트**: Input, Textarea, Select, Checkbox, Radio, Switch
- **레이아웃 컴포넌트**: Card, Accordion, Tabs, Separator
- **피드백 컴포넌트**: AlertDialog, Dialog, Toast, Tooltip, Progress
- **네비게이션**: NavigationMenu, Menubar, Breadcrumb
- **데이터 표시**: Avatar, Badge, DatePicker
- **기타**: Slider, Toggle, ToggleGroup, ScrollArea

### 6. 로그인 페이지
- **두 가지 레이아웃**:
  - 중앙 카드형 (`/login`)
  - 좌우 분할형 (`/login2`) - 고정 600px 입력 영역
- **배경 이미지**: IT 솔루션 회사에 적합한 배경 이미지
- **테마 연동**: 라이트/다크 모드 및 컬러 테마 자동 적용
- **전체화면 레이아웃**: 사이드바/헤더 없는 독립 레이아웃

### 7. 웹 접근성
- **WCAG 2.1 AA 준수**: 웹 접근성 인증마크 획득 가능
- **키보드 네비게이션**: 모든 기능 키보드로 접근 가능
- **스크린 리더 지원**: ARIA 속성 완벽 구현
- **포커스 관리**: 명확한 포커스 표시
- **스킵 링크**: 본문으로 바로 이동
- **동적 콘텐츠 알림**: aria-live 영역으로 변경사항 알림
- **오류 메시지 연결**: aria-describedby로 입력 필드와 연결

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn 패키지 매니저

### 설치

```bash
# 저장소 클론
git clone https://github.com/parkjunhwa/woongjin_cloud.git

# 프로젝트 디렉토리로 이동
cd woongjin_cloud

# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📁 프로젝트 구조

```
woongjin_cloud/
├── app/                          # Next.js App Router 디렉토리
│   ├── components/               # React 컴포넌트
│   │   ├── common/              # 공통 컴포넌트
│   │   │   ├── Card.tsx         # 카드 컴포넌트
│   │   │   ├── Header.tsx       # 헤더 컴포넌트
│   │   │   ├── Sidebar.tsx      # 사이드바 컴포넌트
│   │   │   ├── Tabs.tsx         # 탭 컴포넌트
│   │   │   ├── ThemeProvider.tsx # 테마 관리
│   │   │   ├── SidebarProvider.tsx # 사이드바 상태 관리
│   │   │   ├── TabProvider.tsx  # 탭 상태 관리
│   │   │   └── FullscreenProvider.tsx # 전체화면 관리
│   │   └── ui-sections/         # UI 섹션 컴포넌트
│   │       ├── AccordionSection.tsx
│   │       ├── AlertDialogSection.tsx
│   │       └── DatePickerSection.tsx
│   ├── styles/                   # SCSS 스타일 파일
│   │   ├── base/                # 기본 스타일
│   │   │   ├── _reset.scss     # 리셋 및 접근성 스타일
│   │   │   ├── _typography.scss # 타이포그래피
│   │   │   └── _variables.scss  # CSS 변수
│   │   ├── components/          # 컴포넌트별 스타일
│   │   │   ├── _sidebar.scss
│   │   │   ├── _header.scss
│   │   │   ├── _card.scss
│   │   │   └── _datepicker.scss
│   │   ├── layouts/            # 레이아웃 스타일
│   │   │   └── _masonry.scss
│   │   ├── themes/             # 테마 스타일
│   │   │   ├── _color-theme.scss # 동적 컬러 테마
│   │   │   └── _dark-mode.scss   # 다크 모드
│   │   ├── utilities/           # 유틸리티 스타일
│   │   │   ├── _buttons.scss
│   │   │   ├── _scrollbar.scss
│   │   │   └── _sr-only.scss
│   │   └── animations/         # 애니메이션
│   │       ├── _keyframes.scss
│   │       └── _classes.scss
│   ├── login/                   # 로그인 페이지 (중앙 카드형)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── login2/                  # 로그인 페이지 (좌우 분할형)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── published/               # 퍼블리싱 샘플 페이지
│   │   └── page.tsx
│   ├── page.tsx                 # 메인 대시보드 페이지
│   ├── layout.tsx               # 루트 레이아웃
│   └── globals.scss            # 전역 스타일
├── public/                      # 정적 파일
│   ├── images/                 # 이미지 파일
│   │   ├── logo_b.svg         # 다크 모드 로고
│   │   ├── logo_w.svg         # 라이트 모드 로고
│   │   └── ...
│   └── fonts/                  # 폰트 파일
├── package.json                # 프로젝트 설정 및 의존성
├── tsconfig.json               # TypeScript 설정
├── tailwind.config.ts          # Tailwind CSS 설정
├── next.config.mjs             # Next.js 설정
└── postcss.config.mjs          # PostCSS 설정
```

## 🧩 주요 컴포넌트

### ThemeProvider
전역 테마 상태 관리 (라이트/다크/시스템 모드, 컬러 테마)

```typescript
const { theme, setTheme, colorTheme, setColorTheme } = useTheme();
```

### SidebarProvider
사이드바 상태 관리 (접기/펼치기, 모바일 열림/닫힘)

```typescript
const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar();
```

### TabProvider
탭 네비게이션 상태 관리

```typescript
const { tabs, activeTabId, addTab, removeTab, setActiveTab, isTabsEnabled, toggleTabs } = useTabs();
```

### FullscreenProvider
브라우저 전체화면 API 관리

```typescript
const { isFullscreen, toggleFullscreen } = useFullscreen();
```

## ♿ 웹 접근성

이 프로젝트는 웹 접근성 인증마크(KWCAG 2.1) 획득을 목표로 설계되었습니다.

### 구현된 접근성 기능

1. **키보드 네비게이션**
   - 모든 인터랙티브 요소 키보드 접근 가능
   - Tab, Shift+Tab, Enter, Space, Esc 키 지원
   - 명확한 포커스 표시

2. **스크린 리더 지원**
   - 모든 요소에 적절한 ARIA 속성
   - `aria-label`, `aria-describedby`, `aria-expanded` 등
   - 시맨틱 HTML 구조

3. **제목 구조**
   - 논리적인 h1-h6 계층 구조
   - 각 페이지에 고유한 h1

4. **폼 접근성**
   - 모든 입력 필드에 레이블 연결
   - 필수 항목 `aria-required` 표시
   - 오류 메시지 `aria-describedby` 연결
   - `aria-invalid` 상태 표시

5. **색상 대비**
   - WCAG AA 기준 충족 (4.5:1 이상)
   - 라이트/다크 모드 모두 지원

6. **동적 콘텐츠**
   - `aria-live` 영역으로 변경사항 알림
   - 스크린 리더 사용자에게 실시간 피드백

7. **스킵 링크**
   - 본문으로 바로 이동하는 링크 제공

### 접근성 테스트

다음 도구로 접근성을 테스트할 수 있습니다:
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## 📖 개발 가이드

### 스타일 가이드

- **CSS 방법론**: SCSS 모듈화 (BEM 스타일)
- **유틸리티 클래스**: Tailwind CSS 우선 사용
- **컴포넌트 스타일**: 각 컴포넌트별 SCSS 파일 분리
- **테마 변수**: CSS 변수로 동적 테마 관리

### 상태 관리

- **전역 상태**: React Context API 사용
  - ThemeProvider: 테마 상태
  - SidebarProvider: 사이드바 상태
  - TabProvider: 탭 상태
  - FullscreenProvider: 전체화면 상태
- **로컬 상태**: React useState/useReducer 사용

### 컴포넌트 작성 규칙

1. **TypeScript 타입 정의**: 모든 props에 타입 지정
2. **재사용성**: 공통 컴포넌트는 `components/common`에 배치
3. **접근성**: ARIA 속성 필수 포함
4. **반응형**: 모바일부터 데스크톱까지 지원

### 코드 스타일

- **ESLint**: Next.js 기본 설정 사용
- **포맷팅**: Prettier (권장)
- **네이밍**: 
  - 컴포넌트: PascalCase
  - 함수/변수: camelCase
  - 상수: UPPER_SNAKE_CASE

## 🎨 테마 커스터마이징

### 컬러 테마 변경

1. 헤더의 컬러 팔레트 아이콘 클릭
2. 원하는 컬러 선택
3. 자동으로 전체 UI에 적용

### 지원 컬러

Blue, Red, Green, Yellow, Purple, Pink, Indigo, Teal, Orange, Gray, Cyan, Emerald, Violet, Fuchsia, Rose, Amber, Lime, Sky

### 다크 모드

- 헤더의 테마 변경 버튼 클릭
- 라이트/다크/시스템 모드 선택 가능
- 시스템 모드는 OS 설정 자동 감지

## 📝 주요 페이지

- **`/`** - 메인 대시보드 (컴포넌트 데모)
- **`/login`** - 로그인 페이지 (중앙 카드형)
- **`/login2`** - 로그인 페이지 (좌우 분할형)
- **`/published`** - 퍼블리싱 샘플 페이지

## 🔧 환경 변수

현재 환경 변수 설정이 필요하지 않습니다. 향후 API 연동 시 `.env.local` 파일에 추가할 수 있습니다.

## 📦 빌드 및 배포

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

### 정적 파일 최적화

Next.js의 자동 최적화 기능:
- 이미지 최적화 (`next/image`)
- 코드 스플리팅
- CSS 최적화
- 자동 폰트 최적화

## 🤝 기여 가이드

1. 이슈 생성 또는 기능 제안
2. 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📄 라이선스

이 프로젝트는 웅진IT의 내부 프로젝트입니다.

## 👥 팀

- 웅진IT 디자이너/퍼블리셔 박준화 수석 (2025.11.07)

---

**웅진 클라우드 대시보드** - 현대적이고 접근성 높은 관리자 대시보드 솔루션

