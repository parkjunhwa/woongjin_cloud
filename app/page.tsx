"use client";

import * as React from "react";
import { Card } from "./components/common/Card";
import { Header } from "./components/common/Header";
import { useSidebar } from "./components/common/SidebarProvider";
import { useTheme } from "./components/common/ThemeProvider";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import * as Avatar from "@radix-ui/react-avatar";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as ContextMenu from "@radix-ui/react-context-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as HoverCard from "@radix-ui/react-hover-card";
import * as Label from "@radix-ui/react-label";
import * as Menubar from "@radix-ui/react-menubar";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Popover from "@radix-ui/react-popover";
import * as Progress from "@radix-ui/react-progress";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Select from "@radix-ui/react-select";
import * as Separator from "@radix-ui/react-separator";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import * as Tabs from "@radix-ui/react-tabs";
import * as Toast from "@radix-ui/react-toast";
import * as Toggle from "@radix-ui/react-toggle";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Tooltip from "@radix-ui/react-tooltip";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import { AccordionSection } from "./components/ui-sections/AccordionSection";
import { AlertDialogSection } from "./components/ui-sections/AlertDialogSection";
import { DatePickerSection } from "./components/ui-sections/DatePickerSection";
import { Sidebar } from "./components/common/Sidebar";
import { SampleTable } from "./components/table";
import {
  getRadioColorClasses,
  getCheckboxColorClasses,
  getRadioCardColorClasses,
  getCheckboxCardColorClasses,
  getToggleGroupColorClasses,
  getTabsColorClasses,
  getSwitchColorClasses,
  getSelectFocusClasses,
  getAutocompleteFocusClasses,
} from "./utils/colorUtils";

// 검색용 샘플 데이터
const sampleItems = [
  "React",
  "Next.js",
  "TypeScript",
  "Radix UI",
  "Tailwind CSS",
  "JavaScript",
  "Node.js",
  "Vue.js",
  "Angular",
  "Svelte"
];


export default function Dashboard() {
  const { colorTheme } = useTheme();
  const [progress, setProgress] = React.useState(33);
  const [sliderValue, setSliderValue] = React.useState([50]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openLargeDialog, setOpenLargeDialog] = React.useState(false);
  const [openFullScreenDialog, setOpenFullScreenDialog] = React.useState(false);
  const [openScrollableDialog, setOpenScrollableDialog] = React.useState(false);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = React.useState(false);
  const [isIconLibraryOpen, setIsIconLibraryOpen] = React.useState(false);
  const [isTableOpen, setIsTableOpen] = React.useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [copyToastOpen, setCopyToastOpen] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("option1");
  const [toggleValue, setToggleValue] = React.useState("left");
  const [selectValue, setSelectValue] = React.useState<string>("");
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [multiCheckboxes, setMultiCheckboxes] = React.useState({
    option1: false,
    option2: false,
    option3: false,
  });
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [segmentedValue, setSegmentedValue] = React.useState("전체");
  const [searchText, setSearchText] = React.useState("");
  const [searchTextRight, setSearchTextRight] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date | undefined>(undefined);
  const [selectedDateRange, setSelectedDateRange] = React.useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [tempSelectedDate, setTempSelectedDate] = React.useState<Date | undefined>(undefined);
  const [tempSelectedDateTime, setTempSelectedDateTime] = React.useState<Date | undefined>(undefined);
  const [tempSelectedDateRange, setTempSelectedDateRange] = React.useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const [dateTimePickerOpen, setDateTimePickerOpen] = React.useState(false);
  const [dateRangePickerOpen, setDateRangePickerOpen] = React.useState(false);
  const [timeValue, setTimeValue] = React.useState({ hours: "00", minutes: "00" });
  const [autocompleteValue, setAutocompleteValue] = React.useState("");
  const [autocompleteOpen, setAutocompleteOpen] = React.useState(false);
  const [selectedAutocompleteItem, setSelectedAutocompleteItem] = React.useState<string | null>(null);
  const [multiAutocompleteValue, setMultiAutocompleteValue] = React.useState("");
  const [multiAutocompleteOpen, setMultiAutocompleteOpen] = React.useState(false);
  const [selectedMultiAutocompleteItems, setSelectedMultiAutocompleteItems] = React.useState<string[]>([]);

  // 검색 필터링
  const filteredItems = React.useMemo(() => {
    if (!searchText.trim()) return sampleItems;
    return sampleItems.filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const filteredItemsRight = React.useMemo(() => {
    if (!searchTextRight.trim()) return sampleItems;
    return sampleItems.filter(item =>
      item.toLowerCase().includes(searchTextRight.toLowerCase())
    );
  }, [searchTextRight]);

  // Autocomplete 필터링
  const autocompleteFilteredItems = React.useMemo(() => {
    if (!autocompleteValue.trim()) return sampleItems;
    const lowerValue = autocompleteValue.toLowerCase();
    const filtered = sampleItems.filter(item =>
      item.toLowerCase().includes(lowerValue)
    );

    // 정확히 일치하는 항목을 우선 표시
    const exactMatch = sampleItems.find(item =>
      item.toLowerCase() === lowerValue
    );

    if (exactMatch) {
      return [exactMatch, ...filtered.filter(item => item !== exactMatch)];
    }

    // 입력한 값이 목록에 없으면 입력한 값 자체를 추가
    const hasExactMatch = filtered.some(item =>
      item.toLowerCase() === lowerValue
    );

    if (!hasExactMatch && autocompleteValue.trim()) {
      return [autocompleteValue, ...filtered];
    }

    return filtered;
  }, [autocompleteValue]);

  // Multi Autocomplete 필터링
  const multiAutocompleteFilteredItems = React.useMemo(() => {
    if (!multiAutocompleteValue.trim()) {
      // 입력값이 없으면 선택되지 않은 항목만 표시
      return sampleItems.filter(item => !selectedMultiAutocompleteItems.includes(item));
    }
    const lowerValue = multiAutocompleteValue.toLowerCase();
    const filtered = sampleItems.filter(item =>
      item.toLowerCase().includes(lowerValue) && !selectedMultiAutocompleteItems.includes(item)
    );

    // 정확히 일치하는 항목을 우선 표시
    const exactMatch = sampleItems.find(item =>
      item.toLowerCase() === lowerValue && !selectedMultiAutocompleteItems.includes(item)
    );

    if (exactMatch) {
      return [exactMatch, ...filtered.filter(item => item !== exactMatch)];
    }

    // 입력한 값이 목록에 없으면 입력한 값 자체를 추가
    const hasExactMatch = filtered.some(item =>
      item.toLowerCase() === lowerValue
    );

    if (!hasExactMatch && multiAutocompleteValue.trim()) {
      return [multiAutocompleteValue, ...filtered];
    }

    return filtered;
  }, [multiAutocompleteValue, selectedMultiAutocompleteItems]);

  // 삭제 핸들러
  const handleClearSearch = () => {
    setSearchText("");
  };

  // 검색 버튼 핸들러
  const handleSearch = () => {
    // 검색 실행 (필요시 추가 로직 구현)
    console.log("검색어:", searchTextRight);
  };

  // 날짜 선택 핸들러 (임시 상태에만 저장)
  const handleDateSelect = (date: Date | undefined) => {
    setTempSelectedDate(date);
  };

  // 날짜 확인 핸들러
  const handleDateConfirm = () => {
    setSelectedDate(tempSelectedDate);
    setDatePickerOpen(false);
  };

  // 날짜 취소 핸들러
  const handleDateCancel = () => {
    setTempSelectedDate(selectedDate);
    setDatePickerOpen(false);
  };

  // 날짜+시간 선택 핸들러 (임시 상태에만 저장)
  const handleDateTimeSelect = (date: Date | undefined) => {
    setTempSelectedDateTime(date);
  };

  // 날짜 범위 선택 핸들러 (임시 상태에만 저장)
  const handleDateRangeSelect = (range: { from: Date | undefined; to?: Date | undefined } | undefined) => {
    if (range) {
      setTempSelectedDateRange({ from: range.from, to: range.to });
    } else {
      setTempSelectedDateRange({ from: undefined, to: undefined });
    }
  };

  // 날짜 범위 확인 핸들러
  const handleDateRangeConfirm = () => {
    setSelectedDateRange(tempSelectedDateRange);
    setDateRangePickerOpen(false);
  };

  // 날짜 범위 취소 핸들러
  const handleDateRangeCancel = () => {
    setTempSelectedDateRange(selectedDateRange);
    setDateRangePickerOpen(false);
  };


  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200 relative">
      <Toast.Provider swipeDirection="right">
        <Toast.Viewport className="fixed bottom-0 right-0 z-100 flex max-h-screen w-full flex-col gap-2 p-6 sm:max-w-[420px]" />

        <Sidebar />

        <div className={`transition-all duration-300 ${isCollapsed ? "md:ml-16" : "md:ml-64"}`}>
          <Header />

          <main id="main-content" className="w-full px-6 py-6" role="main" aria-label="메인 콘텐츠">
            {/* 스크린 리더용 동적 콘텐츠 알림 영역 */}
            <div id="aria-live-region" aria-live="polite" aria-atomic="true" className="sr-only"></div>
            <h1 className="sr-only">Radix UI 컴포넌트 대시보드</h1>
            <div className="w-full flex flex-col gap-3 mb-3">
              {/* Color Palette */}
              <Card title="">
                <Collapsible.Root open={isColorPaletteOpen} onOpenChange={setIsColorPaletteOpen}>
                  <Collapsible.Trigger asChild>
                    <button className="w-full flex items-center justify-between h-[32px] text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                      <span className="text-lg font-semibold">Color Palette (Tailwind CSS 기반)</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{isColorPaletteOpen ? "접기" : "펼치기"}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${isColorPaletteOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                  </Collapsible.Trigger>
                  <Collapsible.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                    <div className="pt-4 space-y-12 columns-2 md:columns-2 gap-8">
                      {/* Grayscale Colors */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">Grayscale Colors</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1">
                            <div className="text-xs text-center text-gray-600 dark:text-gray-400">50</div>
                            <div className="h-12 rounded-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div>
                            <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-50</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-center text-gray-600 dark:text-gray-400">100</div>
                            <div className="h-12 rounded-sm bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div>
                            <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-100</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-center text-gray-600 dark:text-gray-400">200</div>
                            <div className="h-12 rounded-sm bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div>
                            <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-200</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-center text-gray-600 dark:text-gray-400">300</div>
                            <div className="h-12 rounded-sm bg-gray-300 dark:bg-gray-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div>
                            <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-300</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-center text-gray-600 dark:text-gray-400">400</div>
                            <div className="h-12 rounded-sm bg-gray-400 dark:bg-gray-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div>
                            <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-400</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-center text-gray-600 dark:text-gray-400">500</div>
                            <div className="h-12 rounded-sm bg-gray-500 dark:bg-gray-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div>
                            <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-500</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-center text-gray-600 dark:text-gray-400">600</div>
                            <div className="h-12 rounded-sm bg-gray-600 dark:bg-gray-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div>
                            <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-600</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-center text-gray-600 dark:text-gray-400">700</div>
                            <div className="h-12 rounded-sm bg-gray-700 dark:bg-gray-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div>
                            <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-700</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-center text-gray-600 dark:text-gray-400">800</div>
                            <div className="h-12 rounded-sm bg-gray-800 dark:bg-gray-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div>
                            <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-800</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-center text-gray-600 dark:text-gray-400">900</div>
                            <div className="h-12 rounded-sm bg-gray-900 dark:bg-gray-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div>
                            <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-900</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-center text-gray-600 dark:text-gray-400">950</div>
                            <div className="h-12 rounded-sm bg-gray-950 dark:bg-gray-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div>
                            <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-950</div>
                          </div>
                        </div>
                      </div>

                      {/* Slate */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Slate</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">slate-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-slate-100 dark:bg-slate-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">slate-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-slate-200 dark:bg-slate-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">slate-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-slate-300 dark:bg-slate-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">slate-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-slate-400 dark:bg-slate-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">slate-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-slate-500 dark:bg-slate-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">slate-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-slate-600 dark:bg-slate-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">slate-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-slate-700 dark:bg-slate-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">slate-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-slate-800 dark:bg-slate-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">slate-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-slate-900 dark:bg-slate-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">slate-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-slate-950 dark:bg-slate-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">slate-950</div></div>
                        </div>
                      </div>

                      {/* Gray */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Gray</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-gray-300 dark:bg-gray-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-gray-400 dark:bg-gray-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-gray-500 dark:bg-gray-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-gray-600 dark:bg-gray-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-gray-700 dark:bg-gray-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-gray-800 dark:bg-gray-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-gray-900 dark:bg-gray-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-gray-950 dark:bg-gray-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">gray-950</div></div>
                        </div>
                      </div>

                      {/* Zinc */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Zinc</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-zinc-50 dark:bg-zinc-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">zinc-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">zinc-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-zinc-200 dark:bg-zinc-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">zinc-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-zinc-300 dark:bg-zinc-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">zinc-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-zinc-400 dark:bg-zinc-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">zinc-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-zinc-500 dark:bg-zinc-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">zinc-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-zinc-600 dark:bg-zinc-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">zinc-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-zinc-700 dark:bg-zinc-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">zinc-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-zinc-800 dark:bg-zinc-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">zinc-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-zinc-900 dark:bg-zinc-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">zinc-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-zinc-950 dark:bg-zinc-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">zinc-950</div></div>
                        </div>
                      </div>

                      {/* Neutral */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Neutral</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">neutral-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-neutral-100 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">neutral-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-neutral-200 dark:bg-neutral-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">neutral-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-neutral-300 dark:bg-neutral-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">neutral-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-neutral-400 dark:bg-neutral-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">neutral-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-neutral-500 dark:bg-neutral-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">neutral-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-neutral-600 dark:bg-neutral-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">neutral-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-neutral-700 dark:bg-neutral-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">neutral-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-neutral-800 dark:bg-neutral-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">neutral-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-neutral-900 dark:bg-neutral-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">neutral-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-neutral-950 dark:bg-neutral-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">neutral-950</div></div>
                        </div>
                      </div>

                      {/* Stone */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Stone</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-stone-50 dark:bg-stone-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">stone-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-stone-100 dark:bg-stone-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">stone-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-stone-200 dark:bg-stone-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">stone-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-stone-300 dark:bg-stone-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">stone-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-stone-400 dark:bg-stone-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">stone-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-stone-500 dark:bg-stone-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">stone-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-stone-600 dark:bg-stone-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">stone-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-stone-700 dark:bg-stone-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">stone-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-stone-800 dark:bg-stone-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">stone-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-stone-900 dark:bg-stone-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">stone-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-stone-950 dark:bg-stone-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">stone-950</div></div>
                        </div>
                      </div>

                      {/* Red */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Red</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-red-50 dark:bg-red-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">red-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-red-100 dark:bg-red-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">red-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-red-200 dark:bg-red-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">red-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-red-300 dark:bg-red-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">red-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-red-400 dark:bg-red-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">red-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-red-500 dark:bg-red-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">red-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-red-600 dark:bg-red-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">red-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-red-700 dark:bg-red-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">red-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-red-800 dark:bg-red-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">red-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-red-900 dark:bg-red-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">red-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-red-950 dark:bg-red-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">red-950</div></div>
                        </div>
                      </div>

                      {/* Orange */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Orange</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-orange-50 dark:bg-orange-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">orange-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-orange-100 dark:bg-orange-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">orange-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-orange-200 dark:bg-orange-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">orange-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-orange-300 dark:bg-orange-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">orange-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-orange-400 dark:bg-orange-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">orange-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-orange-500 dark:bg-orange-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">orange-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-orange-600 dark:bg-orange-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">orange-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-orange-700 dark:bg-orange-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">orange-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-orange-800 dark:bg-orange-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">orange-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-orange-900 dark:bg-orange-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">orange-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-orange-950 dark:bg-orange-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">orange-950</div></div>
                        </div>
                      </div>

                      {/* Amber */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Amber</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-amber-50 dark:bg-amber-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">amber-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-amber-100 dark:bg-amber-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">amber-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-amber-200 dark:bg-amber-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">amber-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-amber-300 dark:bg-amber-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">amber-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-amber-400 dark:bg-amber-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">amber-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-amber-500 dark:bg-amber-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">amber-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-amber-600 dark:bg-amber-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">amber-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-amber-700 dark:bg-amber-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">amber-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-amber-800 dark:bg-amber-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">amber-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-amber-900 dark:bg-amber-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">amber-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-amber-950 dark:bg-amber-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">amber-950</div></div>
                        </div>
                      </div>

                      {/* Yellow */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Yellow</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-yellow-50 dark:bg-yellow-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">yellow-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-yellow-100 dark:bg-yellow-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">yellow-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-yellow-200 dark:bg-yellow-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">yellow-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-yellow-300 dark:bg-yellow-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">yellow-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-yellow-400 dark:bg-yellow-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">yellow-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-yellow-500 dark:bg-yellow-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">yellow-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-yellow-600 dark:bg-yellow-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">yellow-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-yellow-700 dark:bg-yellow-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">yellow-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-yellow-800 dark:bg-yellow-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">yellow-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-yellow-900 dark:bg-yellow-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">yellow-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-yellow-950 dark:bg-yellow-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">yellow-950</div></div>
                        </div>
                      </div>

                      {/* Lime */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Lime</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-lime-50 dark:bg-lime-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">lime-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-lime-100 dark:bg-lime-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">lime-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-lime-200 dark:bg-lime-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">lime-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-lime-300 dark:bg-lime-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">lime-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-lime-400 dark:bg-lime-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">lime-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-lime-500 dark:bg-lime-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">lime-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-lime-600 dark:bg-lime-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">lime-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-lime-700 dark:bg-lime-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">lime-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-lime-800 dark:bg-lime-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">lime-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-lime-900 dark:bg-lime-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">lime-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-lime-950 dark:bg-lime-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">lime-950</div></div>
                        </div>
                      </div>

                      {/* Green */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Green</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-green-50 dark:bg-green-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">green-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-green-100 dark:bg-green-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">green-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-green-200 dark:bg-green-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">green-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-green-300 dark:bg-green-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">green-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-green-400 dark:bg-green-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">green-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-green-500 dark:bg-green-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">green-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-green-600 dark:bg-green-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">green-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-green-700 dark:bg-green-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">green-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-green-800 dark:bg-green-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">green-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-green-900 dark:bg-green-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">green-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-green-950 dark:bg-green-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">green-950</div></div>
                        </div>
                      </div>

                      {/* Emerald */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Emerald</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-emerald-50 dark:bg-emerald-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">emerald-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-emerald-100 dark:bg-emerald-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">emerald-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-emerald-200 dark:bg-emerald-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">emerald-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-emerald-300 dark:bg-emerald-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">emerald-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-emerald-400 dark:bg-emerald-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">emerald-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-emerald-500 dark:bg-emerald-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">emerald-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-emerald-600 dark:bg-emerald-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">emerald-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-emerald-700 dark:bg-emerald-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">emerald-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-emerald-800 dark:bg-emerald-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">emerald-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-emerald-900 dark:bg-emerald-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">emerald-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-emerald-950 dark:bg-emerald-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">emerald-950</div></div>
                        </div>
                      </div>

                      {/* Teal */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Teal</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-teal-50 dark:bg-teal-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">teal-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-teal-100 dark:bg-teal-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">teal-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-teal-200 dark:bg-teal-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">teal-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-teal-300 dark:bg-teal-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">teal-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-teal-400 dark:bg-teal-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">teal-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-teal-500 dark:bg-teal-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">teal-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-teal-600 dark:bg-teal-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">teal-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-teal-700 dark:bg-teal-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">teal-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-teal-800 dark:bg-teal-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">teal-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-teal-900 dark:bg-teal-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">teal-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-teal-950 dark:bg-teal-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">teal-950</div></div>
                        </div>
                      </div>

                      {/* Cyan */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Cyan</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-cyan-50 dark:bg-cyan-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">cyan-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-cyan-100 dark:bg-cyan-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">cyan-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-cyan-200 dark:bg-cyan-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">cyan-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-cyan-300 dark:bg-cyan-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">cyan-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-cyan-400 dark:bg-cyan-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">cyan-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-cyan-500 dark:bg-cyan-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">cyan-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-cyan-600 dark:bg-cyan-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">cyan-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-cyan-700 dark:bg-cyan-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">cyan-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-cyan-800 dark:bg-cyan-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">cyan-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-cyan-900 dark:bg-cyan-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">cyan-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-cyan-950 dark:bg-cyan-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">cyan-950</div></div>
                        </div>
                      </div>

                      {/* Sky */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Sky</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-sky-50 dark:bg-sky-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">sky-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-sky-100 dark:bg-sky-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">sky-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-sky-200 dark:bg-sky-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">sky-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-sky-300 dark:bg-sky-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">sky-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-sky-400 dark:bg-sky-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">sky-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-sky-500 dark:bg-sky-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">sky-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-sky-600 dark:bg-sky-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">sky-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-sky-700 dark:bg-sky-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">sky-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-sky-800 dark:bg-sky-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">sky-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-sky-900 dark:bg-sky-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">sky-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-sky-950 dark:bg-sky-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">sky-950</div></div>
                        </div>
                      </div>

                      {/* Blue */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Blue</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-blue-50 dark:bg-blue-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">blue-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-blue-100 dark:bg-blue-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">blue-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-blue-200 dark:bg-blue-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">blue-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-blue-300 dark:bg-blue-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">blue-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-blue-400 dark:bg-blue-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">blue-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-blue-500 dark:bg-blue-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">blue-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-blue-600 dark:bg-blue-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">blue-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-blue-700 dark:bg-blue-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">blue-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-blue-800 dark:bg-blue-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">blue-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-blue-900 dark:bg-blue-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">blue-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-blue-950 dark:bg-blue-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">blue-950</div></div>
                        </div>
                      </div>

                      {/* Indigo */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Indigo</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-indigo-50 dark:bg-indigo-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">indigo-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-indigo-100 dark:bg-indigo-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">indigo-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-indigo-200 dark:bg-indigo-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">indigo-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-indigo-300 dark:bg-indigo-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">indigo-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-indigo-400 dark:bg-indigo-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">indigo-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-indigo-500 dark:bg-indigo-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">indigo-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-indigo-600 dark:bg-indigo-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">indigo-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-indigo-700 dark:bg-indigo-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">indigo-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-indigo-800 dark:bg-indigo-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">indigo-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-indigo-900 dark:bg-indigo-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">indigo-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-indigo-950 dark:bg-indigo-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">indigo-950</div></div>
                        </div>
                      </div>

                      {/* Violet */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Violet</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-violet-50 dark:bg-violet-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">violet-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-violet-100 dark:bg-violet-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">violet-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-violet-200 dark:bg-violet-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">violet-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-violet-300 dark:bg-violet-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">violet-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-violet-400 dark:bg-violet-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">violet-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-violet-500 dark:bg-violet-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">violet-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-violet-600 dark:bg-violet-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">violet-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-violet-700 dark:bg-violet-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">violet-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-violet-800 dark:bg-violet-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">violet-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-violet-900 dark:bg-violet-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">violet-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-violet-950 dark:bg-violet-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">violet-950</div></div>
                        </div>
                      </div>

                      {/* Purple */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Purple</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-purple-50 dark:bg-purple-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">purple-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-purple-100 dark:bg-purple-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">purple-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-purple-200 dark:bg-purple-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">purple-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-purple-300 dark:bg-purple-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">purple-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-purple-400 dark:bg-purple-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">purple-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-purple-500 dark:bg-purple-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">purple-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-purple-600 dark:bg-purple-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">purple-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-purple-700 dark:bg-purple-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">purple-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-purple-800 dark:bg-purple-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">purple-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-purple-900 dark:bg-purple-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">purple-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-purple-950 dark:bg-purple-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">purple-950</div></div>
                        </div>
                      </div>

                      {/* Fuchsia */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Fuchsia</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-fuchsia-50 dark:bg-fuchsia-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">fuchsia-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-fuchsia-100 dark:bg-fuchsia-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">fuchsia-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-fuchsia-200 dark:bg-fuchsia-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">fuchsia-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-fuchsia-300 dark:bg-fuchsia-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">fuchsia-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-fuchsia-400 dark:bg-fuchsia-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">fuchsia-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-fuchsia-500 dark:bg-fuchsia-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">fuchsia-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-fuchsia-600 dark:bg-fuchsia-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">fuchsia-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-fuchsia-700 dark:bg-fuchsia-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">fuchsia-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-fuchsia-800 dark:bg-fuchsia-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">fuchsia-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-fuchsia-900 dark:bg-fuchsia-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">fuchsia-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-fuchsia-950 dark:bg-fuchsia-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">fuchsia-950</div></div>
                        </div>
                      </div>

                      {/* Pink */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Pink</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-pink-50 dark:bg-pink-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">pink-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-pink-100 dark:bg-pink-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">pink-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-pink-200 dark:bg-pink-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">pink-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-pink-300 dark:bg-pink-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">pink-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-pink-400 dark:bg-pink-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">pink-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-pink-500 dark:bg-pink-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">pink-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-pink-600 dark:bg-pink-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">pink-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-pink-700 dark:bg-pink-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">pink-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-pink-800 dark:bg-pink-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">pink-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-pink-900 dark:bg-pink-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">pink-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-pink-950 dark:bg-pink-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">pink-950</div></div>
                        </div>
                      </div>

                      {/* Rose */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Rose</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-rose-50 dark:bg-rose-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">50</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">rose-50</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-rose-100 dark:bg-rose-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">100</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">rose-100</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-rose-200 dark:bg-rose-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">200</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">rose-200</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-rose-300 dark:bg-rose-700 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-gray-900 dark:text-gray-100">300</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">rose-300</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-rose-400 dark:bg-rose-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">400</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">rose-400</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-rose-500 dark:bg-rose-500 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">500</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">rose-500</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-rose-600 dark:bg-rose-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">600</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">rose-600</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-rose-700 dark:bg-rose-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white">700</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">rose-700</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-rose-800 dark:bg-rose-200 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">800</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">rose-800</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-rose-900 dark:bg-rose-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">900</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">rose-900</div></div>
                          <div className="space-y-1"><div className="h-12 rounded-sm bg-rose-950 dark:bg-rose-50 border border-gray-200 dark:border-gray-800 flex items-center justify-center"><span className="text-xs text-white dark:text-gray-900">950</span></div><div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">rose-950</div></div>
                        </div>
                      </div>

                      {/* Usage Examples */}
                      <div className="break-inside-avoid mb-6">
                        <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">사용 예시</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Background</div>
                            <div className="space-y-1">
                              <div className="h-10 rounded-sm bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                                <span className="text-xs text-gray-700 dark:text-gray-300">bg-white</span>
                              </div>
                              <div className="h-10 rounded-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                                <span className="text-xs text-gray-700 dark:text-gray-300">bg-gray-50</span>
                              </div>
                              <div className="h-10 rounded-sm bg-blue-50 dark:bg-blue-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                                <span className="text-xs text-gray-700 dark:text-gray-300">bg-blue-50</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Text</div>
                            <div className="space-y-1">
                              <div className="h-10 rounded-sm bg-gray-900 dark:bg-gray-100 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                                <span className="text-xs text-white dark:text-gray-900">text-gray-900</span>
                              </div>
                              <div className="h-10 rounded-sm bg-gray-700 dark:bg-gray-300 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                                <span className="text-xs text-white dark:text-gray-900">text-gray-700</span>
                              </div>
                              <div className="h-10 rounded-sm bg-blue-600 dark:bg-blue-400 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                                <span className="text-xs text-white dark:text-gray-900">text-blue-600</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Border</div>
                            <div className="space-y-1">
                              <div className="h-10 rounded-sm border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center">
                                <span className="text-xs text-gray-700 dark:text-gray-300">border-gray-200</span>
                              </div>
                              <div className="h-10 rounded-sm border-2 border-blue-500 dark:border-blue-400 bg-white dark:bg-gray-900 flex items-center justify-center">
                                <span className="text-xs text-gray-700 dark:text-gray-300">border-blue-500</span>
                              </div>
                              <div className="h-10 rounded-sm border-2 border-red-500 dark:border-red-400 bg-white dark:bg-gray-900 flex items-center justify-center">
                                <span className="text-xs text-gray-700 dark:text-gray-300">border-red-500</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Status Colors</div>
                            <div className="space-y-1">
                              <div className="h-10 rounded-sm bg-blue-500 dark:bg-blue-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                                <span className="text-xs text-white">Info (blue)</span>
                              </div>
                              <div className="h-10 rounded-sm bg-green-500 dark:bg-green-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                                <span className="text-xs text-white">Success (green)</span>
                              </div>
                              <div className="h-10 rounded-sm bg-yellow-500 dark:bg-yellow-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                                <span className="text-xs text-white">Warning (yellow)</span>
                              </div>
                              <div className="h-10 rounded-sm bg-red-500 dark:bg-red-600 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                                <span className="text-xs text-white">Error (red)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Collapsible.Content>
                </Collapsible.Root>
              </Card>
              {/* Icon Library */}
              <Card title="">
                <Collapsible.Root open={isIconLibraryOpen} onOpenChange={setIsIconLibraryOpen}>
                  <Collapsible.Trigger asChild>
                    <button className="w-full flex items-center justify-between h-[32px] text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                      <span className="text-lg font-semibold">Icon Library</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{isIconLibraryOpen ? "접기" : "펼치기"}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${isIconLibraryOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                  </Collapsible.Trigger>
                  <Collapsible.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                    <div className="pt-3 space-y-4">
                      {/* 아이콘 데이터 */}
                      {(() => {
                        const icons = [
                          {
                            name: "추가",
                            label: "Plus",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />',
                            buttonCode: `<button aria-label="추가" className="h-[32px] w-[32px] rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "삭제",
                            label: "X / Close",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />',
                            buttonCode: `<button aria-label="삭제" className="h-[32px] w-[32px] rounded-sm bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "보기",
                            label: "Eye",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />',
                            buttonCode: `<button aria-label="보기" className="h-[32px] w-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="password" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "검색",
                            label: "Search",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />',
                            buttonCode: `<button aria-label="검색" className="h-[32px] w-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" placeholder="검색..." className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
</div>`
                          },
                          {
                            name: "수정",
                            label: "Edit / Pencil",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />',
                            buttonCode: `<button aria-label="수정" className="h-[32px] w-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "다운로드",
                            label: "Download",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />',
                            buttonCode: `<button aria-label="다운로드" className="h-[32px] w-[32px] rounded-sm bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "업로드",
                            label: "Upload",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />',
                            buttonCode: `<button aria-label="업로드" className="h-[32px] w-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="file" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
</div>`
                          },
                          {
                            name: "복사",
                            label: "Copy",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />',
                            buttonCode: `<button aria-label="복사" className="h-[32px] w-[32px] rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "확인",
                            label: "Check",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />',
                            buttonCode: `<button aria-label="확인" className="h-[32px] w-[32px] rounded-sm bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-green-500 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "정보",
                            label: "Info",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
                            buttonCode: `<button aria-label="정보" className="h-[32px] w-[32px] rounded-sm bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
</div>`
                          },
                          {
                            name: "별표",
                            label: "Star",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />',
                            buttonCode: `<button aria-label="별표" className="h-[32px] w-[32px] rounded-sm bg-yellow-100 dark:bg-yellow-900 hover:bg-yellow-200 dark:hover:bg-yellow-800 text-yellow-600 dark:text-yellow-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
</div>`
                          },
                          {
                            name: "하트",
                            label: "Heart",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />',
                            buttonCode: `<button aria-label="하트" className="h-[32px] w-[32px] rounded-sm bg-pink-100 dark:bg-pink-900 hover:bg-pink-200 dark:hover:bg-pink-800 text-pink-600 dark:text-pink-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
</div>`
                          },
                          {
                            name: "필터",
                            label: "Filter",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />',
                            buttonCode: `<button aria-label="필터" className="h-[32px] w-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "정렬",
                            label: "Sort",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />',
                            buttonCode: `<button aria-label="정렬" className="h-[32px] w-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "메뉴",
                            label: "Menu / Hamburger",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />',
                            buttonCode: `<button aria-label="메뉴" className="h-[32px] w-[32px] rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</div>`
                          },
                          {
                            name: "설정",
                            label: "Settings / Gear",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />',
                            buttonCode: `<button aria-label="설정" className="h-[32px] w-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
</div>`
                          },
                          {
                            name: "알림",
                            label: "Bell / Notification",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />',
                            buttonCode: `<button aria-label="알림" className="h-[32px] w-[32px] rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center relative">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
    <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
  </button>
</div>`
                          },
                          {
                            name: "홈",
                            label: "Home",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />',
                            buttonCode: `<button aria-label="홈" className="h-[32px] w-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
</div>`
                          },
                          {
                            name: "사용자",
                            label: "User / Person",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />',
                            buttonCode: `<button aria-label="사용자" className="h-[32px] w-[32px] rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
</div>`
                          },
                          {
                            name: "메일",
                            label: "Mail / Email",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />',
                            buttonCode: `<button aria-label="메일" className="h-[32px] w-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="email" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
</div>`
                          },
                          {
                            name: "일정",
                            label: "Calendar",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />',
                            buttonCode: `<button aria-label="일정" className="h-[32px] w-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
</div>`
                          },
                          {
                            name: "저장",
                            label: "Save / Disk",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />',
                            buttonCode: `<button aria-label="저장" className="h-[32px] w-[32px] rounded-sm bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "공유",
                            label: "Share",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />',
                            buttonCode: `<button aria-label="공유" className="h-[32px] w-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "더보기",
                            label: "More / Dots",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />',
                            buttonCode: `<button aria-label="더보기" className="h-[32px] w-[32px] rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "인쇄",
                            label: "Print",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />',
                            buttonCode: `<button aria-label="인쇄" className="h-[32px] w-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "위로",
                            label: "Arrow Up",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />',
                            buttonCode: `<button aria-label="위로" className="h-[32px] w-[32px] rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "아래로",
                            label: "Arrow Down",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />',
                            buttonCode: `<button aria-label="아래로" className="h-[32px] w-[32px] rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "왼쪽",
                            label: "Arrow Left",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />',
                            buttonCode: `<button aria-label="왼쪽" className="h-[32px] w-[32px] rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
</div>`
                          },
                          {
                            name: "오른쪽",
                            label: "Arrow Right",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />',
                            buttonCode: `<button aria-label="오른쪽" className="h-[32px] w-[32px] rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "새로고침",
                            label: "Refresh / Reload",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />',
                            buttonCode: `<button aria-label="새로고침" className="h-[32px] w-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[24px] w-[24px] rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  </button>
</div>`
                          },
                          {
                            name: "잠금",
                            label: "Lock",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />',
                            buttonCode: `<button aria-label="잠금" className="h-[32px] w-[32px] rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="password" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
</div>`
                          },
                          {
                            name: "잠금해제",
                            label: "Unlock",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />',
                            buttonCode: `<button aria-label="잠금해제" className="h-[32px] w-[32px] rounded-sm bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
  </svg>
</div>`
                          },
                          {
                            name: "위치",
                            label: "Location / Map Pin",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />',
                            buttonCode: `<button aria-label="위치" className="h-[32px] w-[32px] rounded-sm bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
</div>`
                          },
                          {
                            name: "시간",
                            label: "Clock",
                            svg: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />',
                            buttonCode: `<button aria-label="시간" className="h-[32px] w-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
</button>`,
                            inputCode: `<div className="relative">
  <input type="text" className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
</div>`
                          }
                        ];

                        return (
                          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-16 2xl:grid-cols-24 gap-2">
                            {icons.map((icon, index) => (
                              <div key={index} className="space-y-2 group">
                                <div className="flex flex-col items-center gap-2 p-3 ">
                                  <div className="h-[48px] w-[48px] rounded-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" dangerouslySetInnerHTML={{ __html: icon.svg }} />
                                  </div>
                                  <div className="text-center w-full">
                                    <div className="text-xs font-medium text-gray-900 dark:text-gray-100">{icon.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{icon.label}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()}

                      {/* 복사 완료 Toast */}
                      <Toast.Root
                        open={copyToastOpen}
                        onOpenChange={setCopyToastOpen}
                        className="flex w-full flex-col gap-2 rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-lg relative"
                      >
                        <Toast.Title className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          코드가 복사되었습니다
                        </Toast.Title>
                      </Toast.Root>
                    </div>
                  </Collapsible.Content>
                </Collapsible.Root>
              </Card>

              {/* Table (Tabulator) */}
              <Card title="">
                <Collapsible.Root open={isTableOpen} onOpenChange={setIsTableOpen}>
                  <Collapsible.Trigger asChild>
                    <button className="w-full flex items-center justify-between h-[32px] text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                      <span className="text-lg font-semibold">Table (Tabulator)</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{isTableOpen ? "접기" : "펼치기"}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${isTableOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                  </Collapsible.Trigger>
                  <Collapsible.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                    <div className="pt-3">
                      <SampleTable height={600} />
                    </div>
                  </Collapsible.Content>
                </Collapsible.Root>
              </Card>
            </div>

            <div className="masonry-grid">
              <AccordionSection />

              <AlertDialogSection openAlertDialog={openAlertDialog} setOpenAlertDialog={setOpenAlertDialog} />

              {/* Aspect Ratio */}
              <Card title="Aspect Ratio">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">16:9</p>
                    <AspectRatio.Root ratio={16 / 9} className="overflow-hidden rounded-sm shadow-lg">
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                        <span className="text-white font-semibold">16:9</span>
                      </div>
                    </AspectRatio.Root>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">1:1</p>
                    <AspectRatio.Root ratio={1} className="overflow-hidden rounded-sm shadow-lg">
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500 to-rose-600">
                        <span className="text-white font-semibold">1:1</span>
                      </div>
                    </AspectRatio.Root>
                  </div>
                </div>
              </Card>

              {/* Autocomplete */}
              <Card title="Autocomplete">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="autocomplete" className="text-xs text-gray-500 dark:text-gray-400">
                      기본 Autocomplete
                    </Label.Root>
                    <Popover.Root
                      open={autocompleteOpen}
                      onOpenChange={setAutocompleteOpen}
                    >
                      <Popover.Anchor asChild>
                        <div className="relative">
                          <input
                            id="autocomplete"
                            type="text"
                            placeholder="기술 스택을 검색하세요"
                            value={autocompleteValue}
                            onChange={(e) => {
                              setAutocompleteValue(e.target.value);
                              setAutocompleteOpen(true);
                            }}
                            onFocus={() => {
                              setAutocompleteOpen(true);
                            }}
                            className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                          />
                          {autocompleteValue && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setAutocompleteValue("");
                                setSelectedAutocompleteItem(null);
                                setAutocompleteOpen(false);
                              }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
                              aria-label="삭제"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                          {selectedAutocompleteItem && (
                            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400">
                              선택됨
                            </div>
                          )}
                        </div>
                      </Popover.Anchor>
                      {autocompleteOpen && autocompleteFilteredItems.length > 0 && (
                        <Popover.Content
                          side="bottom"
                          align="start"
                          sideOffset={4}
                          onOpenAutoFocus={(e) => e.preventDefault()}
                          onInteractOutside={(e) => {
                            // 입력 필드나 팝오버 내부 클릭이 아닌 경우에만 닫기
                            const target = e.target as HTMLElement;
                            const isInput = target.id === 'autocomplete' || target.closest('[id="autocomplete"]');
                            const isPopoverContent = target.closest('[data-radix-popover-content]');

                            if (!isInput && !isPopoverContent) {
                              setAutocompleteOpen(false);
                            } else {
                              e.preventDefault();
                            }
                          }}
                          className="z-50 w-[var(--radix-popover-trigger-width)] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-1 max-h-[200px] overflow-auto"
                        >
                          <ScrollArea.Root className="w-full">
                            <ScrollArea.Viewport className="w-full">
                              <div className="py-1">
                                {autocompleteFilteredItems.map((item, index) => {
                                  const isCustomItem = index === 0 && !sampleItems.includes(item);
                                  return (
                                    <button
                                      key={`${item}-${index}`}
                                      type="button"
                                      onMouseDown={(e) => {
                                        e.preventDefault(); // 포커스가 input에서 벗어나지 않도록
                                      }}
                                      onClick={() => {
                                        setAutocompleteValue(item);
                                        setSelectedAutocompleteItem(item);
                                        setAutocompleteOpen(false);
                                      }}
                                      className={`w-full text-left px-3 py-2 text-sm rounded-sm transition-colors ${selectedAutocompleteItem === item
                                        ? "bg-blue-500 dark:bg-blue-600 text-white"
                                        : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        }`}
                                    >
                                      {isCustomItem && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">(새 항목)</span>
                                      )}
                                      {item}
                                    </button>
                                  );
                                })}
                              </div>
                            </ScrollArea.Viewport>
                            <ScrollArea.Scrollbar orientation="vertical" className="flex touch-none select-none transition-colors duration-150 ease-out data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:h-full">
                              <ScrollArea.Thumb className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                            </ScrollArea.Scrollbar>
                          </ScrollArea.Root>
                        </Popover.Content>
                      )}
                    </Popover.Root>
                    {selectedAutocompleteItem && (
                      <div className="mt-2 p-3 rounded-sm border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">선택된 항목:</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{selectedAutocompleteItem}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Autocomplete Multi */}
              <Card title="Autocomplete Multi">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="multiautocomplete" className="text-xs text-gray-500 dark:text-gray-400">
                      멀티 선택 Autocomplete (Chip 형태)
                    </Label.Root>
                    <Popover.Root
                      open={multiAutocompleteOpen}
                      onOpenChange={setMultiAutocompleteOpen}
                    >
                      <Popover.Anchor asChild>
                        <div className={`relative min-h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 ${getAutocompleteFocusClasses(colorTheme)} flex flex-wrap gap-1 items-center`}>
                          {/* 선택된 항목들 (Chip) */}
                          {selectedMultiAutocompleteItems.map((item, index) => (
                            <div
                              key={`${item}-${index}`}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-${colorTheme}-500 dark:bg-${colorTheme}-600 text-white text-sm`}
                            >
                              <span>{item}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  setSelectedMultiAutocompleteItems(prev =>
                                    prev.filter(selectedItem => selectedItem !== item)
                                  );
                                  setMultiAutocompleteOpen(true);
                                }}
                                className={`hover:bg-${colorTheme}-600 dark:hover:bg-${colorTheme}-700 rounded-sm p-0.5 transition-colors`}
                                aria-label={`${item} 제거`}
                              >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          {/* 입력 필드 */}
                          <input
                            id="multiautocomplete"
                            type="text"
                            placeholder={selectedMultiAutocompleteItems.length === 0 ? "기술 스택을 검색하세요" : ""}
                            value={multiAutocompleteValue}
                            onChange={(e) => {
                              setMultiAutocompleteValue(e.target.value);
                              setMultiAutocompleteOpen(true);
                            }}
                            onFocus={() => {
                              setMultiAutocompleteOpen(true);
                            }}
                            className="flex-1 min-w-[120px] h-[24px] bg-transparent text-sm text-left focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                          />
                        </div>
                      </Popover.Anchor>
                      {multiAutocompleteOpen && multiAutocompleteFilteredItems.length > 0 && (
                        <Popover.Content
                          side="bottom"
                          align="start"
                          sideOffset={4}
                          onOpenAutoFocus={(e) => e.preventDefault()}
                          onInteractOutside={(e) => {
                            const target = e.target as HTMLElement;
                            const isInput = target.id === 'multiautocomplete' || target.closest('[id="multiautocomplete"]');
                            const isPopoverContent = target.closest('[data-radix-popover-content]');

                            if (!isInput && !isPopoverContent) {
                              setMultiAutocompleteOpen(false);
                            } else {
                              e.preventDefault();
                            }
                          }}
                          className="z-50 w-[var(--radix-popover-trigger-width)] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-1 max-h-[200px] overflow-auto"
                        >
                          <ScrollArea.Root className="w-full">
                            <ScrollArea.Viewport className="w-full">
                              <div className="py-1">
                                {multiAutocompleteFilteredItems.map((item, index) => {
                                  const isCustomItem = index === 0 && !sampleItems.includes(item);
                                  return (
                                    <button
                                      key={`${item}-${index}`}
                                      type="button"
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                      }}
                                      onClick={() => {
                                        if (!selectedMultiAutocompleteItems.includes(item)) {
                                          setSelectedMultiAutocompleteItems(prev => [...prev, item]);
                                          setMultiAutocompleteValue("");
                                          setMultiAutocompleteOpen(true);
                                        }
                                      }}
                                      className={`w-full text-left px-3 py-2 text-sm rounded-sm transition-colors ${selectedMultiAutocompleteItems.includes(item)
                                        ? "bg-blue-500 dark:bg-blue-600 text-white"
                                        : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        }`}
                                    >
                                      {isCustomItem && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">(새 항목)</span>
                                      )}
                                      {item}
                                    </button>
                                  );
                                })}
                              </div>
                            </ScrollArea.Viewport>
                            <ScrollArea.Scrollbar orientation="vertical" className="flex touch-none select-none transition-colors duration-150 ease-out data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:h-full">
                              <ScrollArea.Thumb className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                            </ScrollArea.Scrollbar>
                          </ScrollArea.Root>
                        </Popover.Content>
                      )}
                    </Popover.Root>
                    {selectedMultiAutocompleteItems.length > 0 && (
                      <div className="mt-2 p-3 rounded-sm border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          선택된 항목 ({selectedMultiAutocompleteItems.length}개):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedMultiAutocompleteItems.map((item, index) => (
                            <span
                              key={`${item}-${index}`}
                              className="text-xs px-2 py-1 rounded-sm bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Avatar */}
              <Card title="Avatar">
                <div className="flex items-center gap-4">
                  <Avatar.Root className="inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 align-middle ring-2 ring-gray-300 dark:ring-gray-700">
                    <Avatar.Image
                      src="https://i.pravatar.cc/150?img=1"
                      alt="샘플 사용자 프로필 이미지"
                      className="h-full w-full object-cover"
                    />
                    <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-gray-300 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">
                      JD
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <Avatar.Root className="inline-flex h-16 w-16 select-none items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 align-middle ring-2 ring-blue-500">
                    <Avatar.Image
                      src="https://i.pravatar.cc/150?img=2"
                      alt="샘플 사용자 프로필 이미지"
                      className="h-full w-full object-cover"
                    />
                    <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-blue-500 text-white text-base font-medium">
                      JD
                    </Avatar.Fallback>
                  </Avatar.Root>
                </div>
              </Card>

              {/* Badge */}
              <Card title="Badge">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-sm bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-200">
                    기본
                  </span>
                  <span className="inline-flex items-center rounded-sm bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-200">
                    성공
                  </span>
                  <span className="inline-flex items-center rounded-sm bg-yellow-100 dark:bg-yellow-900/30 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:text-yellow-200">
                    경고
                  </span>
                  <span className="inline-flex items-center rounded-sm bg-red-100 dark:bg-red-900/30 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:text-red-200">
                    오류
                  </span>
                  <span className="inline-flex items-center rounded-sm bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200">
                    중립
                  </span>
                  <span className="inline-flex items-center rounded-sm bg-purple-100 dark:bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:text-purple-200">
                    프리미엄
                  </span>
                </div>
              </Card>

              {/* Button */}
              <Card title="Button">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">기본 버튼</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <button className="h-[32px] px-4 rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm font-medium transition-colors">
                        기본 버튼
                      </button>
                      <button className="h-[32px] px-4 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors">
                        보조 버튼
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Disabled</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        disabled
                        className="h-[32px] px-4 rounded-sm bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 text-sm font-medium cursor-not-allowed transition-colors"
                      >
                        비활성화된 버튼
                      </button>
                      <button
                        disabled
                        className="h-[32px] px-4 rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-400 dark:text-gray-500 text-sm font-medium cursor-not-allowed transition-colors"
                      >
                        비활성화된 보조 버튼
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Callout */}
              <Card title="Callout">
                <div className="space-y-3">
                  <div className="rounded-sm border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">정보</h4>
                        <p className="text-sm text-blue-800 dark:text-blue-200">이것은 정보를 전달하는 콜아웃입니다. 중요한 내용이나 팁을 표시할 때 사용합니다.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-sm border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">성공</h4>
                        <p className="text-sm text-green-800 dark:text-green-200">작업이 성공적으로 완료되었습니다.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-sm border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-1">경고</h4>
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">주의가 필요한 사항입니다. 이 작업은 되돌릴 수 없을 수 있습니다.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-sm border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-semibold text-red-900 dark:text-red-100 mb-1">오류</h4>
                        <p className="text-sm text-red-800 dark:text-red-200">오류가 발생했습니다. 다시 시도해주세요.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-sm border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">중립</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">일반적인 정보나 알림을 표시합니다.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Checkbox */}
              <Card title="Checkbox">
                <div className="flex flex-col gap-3">
                  {(() => {
                    const checkboxColorClasses = getCheckboxColorClasses(colorTheme);

                    return (
                      <>
                        <div className="flex items-center gap-3">
                          <Checkbox.Root
                            id="checkbox1"
                            checked={checkboxChecked}
                            onCheckedChange={(checked) => setCheckboxChecked(checked === true)}
                            className={`flex h-5 w-5 items-center justify-center rounded border-2 ${checkboxChecked ? checkboxColorClasses.checkedBorder : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
                          >
                            <Checkbox.Indicator className={checkboxChecked ? checkboxColorClasses.indicatorText : "text-white"}>
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </Checkbox.Indicator>
                          </Checkbox.Root>
                          <Label.Root htmlFor="checkbox1" className="text-sm cursor-pointer text-gray-700 dark:text-gray-300">
                            약관에 동의합니다
                          </Label.Root>
                        </div>
                        {Object.entries(multiCheckboxes).map(([key, checked]) => (
                          <div key={key} className="flex items-center gap-3">
                            <Checkbox.Root
                              id={`checkbox-${key}`}
                              checked={checked}
                              onCheckedChange={(checked) =>
                                setMultiCheckboxes((prev) => ({ ...prev, [key]: checked === true }))
                              }
                              className={`flex h-5 w-5 items-center justify-center rounded border-2 ${checked ? checkboxColorClasses.checkedBorder : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
                            >
                              <Checkbox.Indicator className={checked ? checkboxColorClasses.indicatorText : "text-white"}>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </Checkbox.Indicator>
                            </Checkbox.Root>
                            <Label.Root htmlFor={`checkbox-${key}`} className="text-sm cursor-pointer text-gray-700 dark:text-gray-300">
                              옵션 {key.slice(-1)}
                            </Label.Root>
                          </div>
                        ))}
                      </>
                    );
                  })()}
                </div>
              </Card>

              {/* Checkbox Cards */}
              <Card title="Checkbox Cards">
                <div className="space-y-2">
                  {[
                    { id: "card1", label: "기본 기능", description: "필수 기능들이 포함됩니다", checked: multiCheckboxes.option1 },
                    { id: "card2", label: "고급 기능", description: "추가 기능들이 포함됩니다", checked: multiCheckboxes.option2 },
                    { id: "card3", label: "프리미엄 기능", description: "모든 기능이 포함됩니다", checked: multiCheckboxes.option3 },
                  ].map((option, idx) => {
                    const checkboxCardColorClasses = getCheckboxCardColorClasses(colorTheme);

                    return (
                      <label
                        key={option.id}
                        className={`flex items-start gap-3 rounded-sm border-2 p-3 cursor-pointer transition-all ${option.checked
                          ? `${checkboxCardColorClasses.cardBorder} ${checkboxCardColorClasses.cardBg}`
                          : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900"
                          }`}
                      >
                        <Checkbox.Root
                          id={option.id}
                          checked={option.checked}
                          onCheckedChange={(checked) =>
                            setMultiCheckboxes((prev) => ({ ...prev, [`option${idx + 1}`]: checked === true }))
                          }
                          className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border-2 ${option.checked ? checkboxCardColorClasses.checkboxCheckedBorder : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
                        >
                          <Checkbox.Indicator className={option.checked ? checkboxCardColorClasses.checkboxIndicatorText : "text-white"}>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${option.checked ? checkboxCardColorClasses.text : "text-gray-900 dark:text-gray-100"}`}>
                            {option.label}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{option.description}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </Card>

              {/* Collapsible */}
              <Card title="Collapsible">
                <Collapsible.Root open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
                  <Collapsible.Trigger asChild>
                    <button className="w-full h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors shadow-sm shadow-blue-500/20 dark:shadow-blue-600/20">
                      {isCollapsibleOpen ? "숨기기" : "자세히 보기"}
                    </button>
                  </Collapsible.Trigger>
                  <Collapsible.Content className="mt-3 overflow-hidden rounded-sm bg-gray-50 dark:bg-gray-900 p-4 text-sm text-gray-700 dark:text-gray-400 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp border border-gray-200 dark:border-gray-800">
                    <p className="mb-2">이것은 접을 수 있는 콘텐츠입니다.</p>
                    <p>Collapsible 컴포넌트를 사용하여 내용을 표시하거나 숨길 수 있습니다.</p>
                  </Collapsible.Content>
                </Collapsible.Root>
              </Card>

              {/* Context Menu */}
              <Card title="Context Menu">
                <ContextMenu.Root>
                  <ContextMenu.Trigger asChild>
                    <div className="w-full rounded-sm border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-8 py-6 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-center transition-colors text-gray-700 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-600 cursor-pointer">
                      오른쪽 클릭하세요
                    </div>
                  </ContextMenu.Trigger>
                  <ContextMenu.Portal>
                    <ContextMenu.Content className="min-w-[200px] rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-xl z-50">
                      <ContextMenu.Item className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300">
                        복사
                      </ContextMenu.Item>
                      <ContextMenu.Item className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300">
                        붙여넣기
                      </ContextMenu.Item>
                      <ContextMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-800" />
                      <ContextMenu.Item className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300">
                        이름 변경
                      </ContextMenu.Item>
                      <ContextMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-800" />
                      <ContextMenu.Item className="rounded px-3 py-2 text-sm hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 cursor-pointer">
                        삭제
                      </ContextMenu.Item>
                    </ContextMenu.Content>
                  </ContextMenu.Portal>
                </ContextMenu.Root>
              </Card>

              {/* Data List */}
              <Card title="Data List">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">이름</dt>
                    <dd className="text-sm text-gray-700 dark:text-gray-300">홍길동</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">이메일</dt>
                    <dd className="text-sm text-gray-700 dark:text-gray-300">hong@example.com</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">전화번호</dt>
                    <dd className="text-sm text-gray-700 dark:text-gray-300">010-1234-5678</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">주소</dt>
                    <dd className="text-sm text-gray-700 dark:text-gray-300">서울특별시 강남구</dd>
                  </div>
                </dl>
              </Card>

              <DatePickerSection
                selectedDate={selectedDate}
                tempSelectedDate={tempSelectedDate}
                datePickerOpen={datePickerOpen}
                setDatePickerOpen={setDatePickerOpen}
                setTempSelectedDate={setTempSelectedDate}
                handleDateSelect={handleDateSelect}
                handleDateConfirm={handleDateConfirm}
                handleDateCancel={handleDateCancel}
              />

              {/* Date Range Picker */}
              <Card title="Date Range Picker">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="daterangepicker" className="text-xs text-gray-500 dark:text-gray-400">
                      날짜 범위 선택
                    </Label.Root>
                    <Popover.Root
                      open={dateRangePickerOpen}
                      onOpenChange={(open) => {
                        setDateRangePickerOpen(open);
                        if (open) {
                          // 팝오버가 열릴 때 현재 선택된 날짜 범위를 임시 상태로 복사
                          setTempSelectedDateRange(selectedDateRange);
                        }
                      }}
                    >
                      <Popover.Trigger asChild>
                        <button
                          id="daterangepicker"
                          className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <span className={selectedDateRange.from && selectedDateRange.to ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"}>
                            {selectedDateRange.from && selectedDateRange.to
                              ? `${format(selectedDateRange.from, "yyyy년 MM월 dd일", { locale: ko })} - ${format(selectedDateRange.to, "yyyy년 MM월 dd일", { locale: ko })}`
                              : "날짜 범위를 선택하세요"}
                          </span>
                          <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </Popover.Trigger>
                      <Popover.Portal>
                        <Popover.Content
                          className="rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 shadow-xl z-50"
                          align="start"
                        >
                          <DayPicker
                            mode="range"
                            selected={tempSelectedDateRange}
                            onSelect={handleDateRangeSelect}
                            locale={ko}
                            numberOfMonths={2}
                            navLayout="around"
                            className="rdp"
                            modifiers={{
                              sunday: (date) => date.getDay() === 0,
                              saturday: (date) => date.getDay() === 6,
                            }}
                            modifiersClassNames={{
                              sunday: "rdp-day-sunday",
                              saturday: "rdp-day-saturday",
                            }}
                            classNames={{
                              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                              month: "space-y-4",
                              caption: "flex flex-row justify-between items-center relative",
                              caption_label: "font-medium text-gray-900 dark:text-gray-100 flex items-center",
                              nav: "flex items-center gap-1",
                              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center justify-center",
                              nav_button_previous: "",
                              nav_button_next: "",
                              table: "w-full border-collapse space-y-1",
                              head_row: "flex",
                              head_cell: "text-gray-500 dark:text-gray-100 rounded-md w-9 font-normal text-xs",
                              row: "flex w-full mt-2",
                              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-900 dark:text-gray-100 text-[13px]",
                              day_selected: "font-normal bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-500 focus:text-white",
                              day_range_start: "font-normal bg-blue-500 text-white rounded-l-md hover:bg-blue-600 hover:text-white focus:bg-blue-500 focus:text-white",
                              day_range_end: "font-normal bg-blue-500 text-white rounded-r-md hover:bg-blue-600 hover:text-white focus:bg-blue-500 focus:text-white",
                              day_range_middle: "font-normal aria-selected:bg-blue-50 aria-selected:text-gray-900",
                              day_today: "bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100",
                              day_outside: "text-gray-400 dark:text-gray-500 opacity-50",
                              day_disabled: "text-gray-300 dark:text-gray-600 opacity-50",
                              day_hidden: "invisible",
                            }}
                          />
                          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                            <button
                              onClick={handleDateRangeCancel}
                              className="h-[32px] px-4 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
                            >
                              취소
                            </button>
                            <button
                              onClick={handleDateRangeConfirm}
                              className="h-[32px] px-4 rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-sm font-medium text-white transition-colors"
                            >
                              확인
                            </button>
                          </div>
                        </Popover.Content>
                      </Popover.Portal>
                    </Popover.Root>
                  </div>
                </div>
              </Card>

              {/* DateTime Picker */}
              <Card title="DateTime Picker">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="datetimepicker" className="text-xs text-gray-500 dark:text-gray-400">
                      날짜 및 시간 선택
                    </Label.Root>
                    <Popover.Root
                      open={dateTimePickerOpen}
                      onOpenChange={(open) => {
                        setDateTimePickerOpen(open);
                        if (open) {
                          // 팝오버가 열릴 때 현재 선택된 날짜와 시간을 임시 상태로 복사
                          setTempSelectedDateTime(selectedDateTime);
                        }
                      }}
                    >
                      <Popover.Trigger asChild>
                        <button
                          id="datetimepicker"
                          className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <span className={selectedDateTime ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"}>
                            {selectedDateTime ? format(selectedDateTime, "yyyy년 MM월 dd일 HH:mm", { locale: ko }) : "날짜와 시간을 선택하세요"}
                          </span>
                          <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </Popover.Trigger>
                      <Popover.Portal>
                        <Popover.Content
                          className="rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 shadow-xl z-50"
                          align="start"
                        >
                          <div className="space-y-4">
                            <DayPicker
                              mode="single"
                              selected={tempSelectedDateTime}
                              onSelect={handleDateTimeSelect}
                              locale={ko}
                              navLayout="around"
                              className="rdp"
                              modifiers={{
                                sunday: (date) => date.getDay() === 0,
                                saturday: (date) => date.getDay() === 6,
                              }}
                              modifiersClassNames={{
                                sunday: "rdp-day-sunday",
                                saturday: "rdp-day-saturday",
                              }}
                              classNames={{
                                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                month: "space-y-4",
                                caption: "flex flex-row justify-between items-center relative",
                                caption_label: "font-medium text-gray-900 dark:text-gray-100 flex items-center",
                                nav: "flex items-center gap-1",
                                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center justify-center",
                                nav_button_previous: "",
                                nav_button_next: "",
                                table: "w-full border-collapse space-y-1",
                                head_row: "flex",
                                head_cell: "text-gray-500 dark:text-gray-100 rounded-md w-9 font-normal text-xs",
                                row: "flex w-full mt-2",
                                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-900 dark:text-gray-100 text-[13px]",
                                day_selected: "font-medium bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-500 focus:text-white",
                                day_today: "text-sm bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100",
                                day_outside: "text-gray-400 dark:text-gray-500 opacity-50",
                                day_disabled: "text-gray-300 dark:text-gray-600 opacity-50",
                                day_range_middle: "font-medium aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 aria-selected:text-gray-900 dark:aria-selected:text-gray-100",
                                day_hidden: "invisible",
                              }}
                            />
                            <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                              <Label.Root className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">
                                시간 선택
                              </Label.Root>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min="0"
                                  max="23"
                                  value={timeValue.hours}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === "" || (parseInt(val) >= 0 && parseInt(val) <= 23)) {
                                      setTimeValue({ ...timeValue, hours: val });
                                    }
                                  }}
                                  className="h-[32px] w-16 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                                  placeholder="00"
                                />
                                <span className="text-gray-500 dark:text-gray-400">:</span>
                                <input
                                  type="number"
                                  min="0"
                                  max="59"
                                  value={timeValue.minutes}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === "" || (parseInt(val) >= 0 && parseInt(val) <= 59)) {
                                      setTimeValue({ ...timeValue, minutes: val });
                                    }
                                  }}
                                  className="h-[32px] w-16 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                                  placeholder="00"
                                />
                                <button
                                  onClick={() => {
                                    if (tempSelectedDateTime) {
                                      const hours = timeValue.hours.padStart(2, "0");
                                      const minutes = timeValue.minutes.padStart(2, "0");
                                      const newDate = new Date(tempSelectedDateTime);
                                      newDate.setHours(parseInt(hours), parseInt(minutes));
                                      setTempSelectedDateTime(newDate);
                                      // 시간 적용 시 바로 저장 및 팝오버 닫기
                                      setSelectedDateTime(newDate);
                                      setDateTimePickerOpen(false);
                                    }
                                  }}
                                  className="ml-auto h-[32px] px-4 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
                                >
                                  시간 적용
                                </button>
                              </div>
                            </div>
                          </div>
                        </Popover.Content>
                      </Popover.Portal>
                    </Popover.Root>
                  </div>
                </div>
              </Card>

              {/* Dialog */}
              <Card title="Dialog">
                <div className="space-y-4">
                  {/* 기본 모달 */}
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">기본 모달</p>
                    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
                      <Dialog.Trigger asChild>
                        <button className="w-full h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors shadow-sm shadow-blue-500/20 dark:shadow-blue-600/20">
                          기본 모달 열기
                        </button>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70 animate-fadeIn z-50" />
                        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white dark:bg-gray-900 p-6 shadow-xl w-full max-w-md z-50 border border-gray-200 dark:border-gray-800">
                          <Dialog.Title className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                            기본 모달 제목
                          </Dialog.Title>
                          <Dialog.Description className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            이것은 기본 크기의 모달입니다. 중앙에 표시되며 최대 너비가 제한되어 있습니다.
                          </Dialog.Description>
                          <div className="flex gap-3 justify-end">
                            <Dialog.Close asChild>
                              <button className="h-[32px] rounded-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">
                                닫기
                              </button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                              <button className="h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors">
                                확인
                              </button>
                            </Dialog.Close>
                          </div>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </div>

                  {/* 큰 모달 */}
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">큰 모달</p>
                    <Dialog.Root open={openLargeDialog} onOpenChange={setOpenLargeDialog}>
                      <Dialog.Trigger asChild>
                        <button className="w-full h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors shadow-sm shadow-blue-500/20 dark:shadow-blue-600/20">
                          큰 모달 열기
                        </button>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70 animate-fadeIn z-50" />
                        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white dark:bg-gray-900 p-6 shadow-xl w-full max-w-2xl z-50 border border-gray-200 dark:border-gray-800">
                          <Dialog.Title className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                            큰 모달 제목
                          </Dialog.Title>
                          <Dialog.Description className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            이것은 더 큰 크기의 모달입니다. 더 많은 콘텐츠를 표시할 수 있습니다.
                          </Dialog.Description>
                          <div className="space-y-4 mb-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 rounded-sm bg-gray-50 dark:bg-gray-800">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">항목 1</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">설명 내용입니다.</p>
                              </div>
                              <div className="p-4 rounded-sm bg-gray-50 dark:bg-gray-800">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">항목 2</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">설명 내용입니다.</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3 justify-end">
                            <Dialog.Close asChild>
                              <button className="h-[32px] rounded-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">
                                닫기
                              </button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                              <button className="h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors">
                                확인
                              </button>
                            </Dialog.Close>
                          </div>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </div>

                  {/* 전체 화면 모달 */}
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">전체 화면 모달</p>
                    <Dialog.Root open={openFullScreenDialog} onOpenChange={setOpenFullScreenDialog}>
                      <Dialog.Trigger asChild>
                        <button className="w-full h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors shadow-sm shadow-blue-500/20 dark:shadow-blue-600/20">
                          전체 화면 모달 열기
                        </button>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70 animate-fadeIn z-50" />
                        <Dialog.Content className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col">
                          {/* 헤더 */}
                          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                            <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                              전체 화면 모달
                            </Dialog.Title>
                            <Dialog.Close asChild>
                              <button
                                aria-label="닫기"
                                className="h-8 w-8 rounded-sm flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </Dialog.Close>
                          </div>
                          {/* 콘텐츠 */}
                          <div className="flex-1 overflow-y-auto p-6">
                            <Dialog.Description className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                              이것은 전체 화면을 차지하는 모달입니다. 많은 콘텐츠를 표시할 때 유용합니다.
                            </Dialog.Description>
                            <div className="space-y-4">
                              {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="p-4 rounded-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">섹션 {i + 1}</p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    이것은 스크롤 가능한 콘텐츠 영역입니다. 긴 내용을 표시할 수 있습니다.
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* 푸터 */}
                          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
                            <Dialog.Close asChild>
                              <button className="h-[32px] rounded-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">
                                취소
                              </button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                              <button className="h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors">
                                저장
                              </button>
                            </Dialog.Close>
                          </div>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </div>

                  {/* 스크롤 가능한 모달 */}
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">스크롤 가능한 모달</p>
                    <Dialog.Root open={openScrollableDialog} onOpenChange={setOpenScrollableDialog}>
                      <Dialog.Trigger asChild>
                        <button className="w-full h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors shadow-sm shadow-blue-500/20 dark:shadow-blue-600/20">
                          스크롤 가능한 모달 열기
                        </button>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70 animate-fadeIn z-50" />
                        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white dark:bg-gray-900 shadow-xl w-full max-w-lg max-h-[80vh] z-50 border border-gray-200 dark:border-gray-800 flex flex-col">
                          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                            <Dialog.Title className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                              스크롤 가능한 모달
                            </Dialog.Title>
                            <Dialog.Description className="text-sm text-gray-600 dark:text-gray-400">
                              콘텐츠가 많을 때 스크롤할 수 있는 모달입니다.
                            </Dialog.Description>
                          </div>
                          <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-4">
                              {Array.from({ length: 15 }).map((_, i) => (
                                <div key={i} className="p-4 rounded-sm bg-gray-50 dark:bg-gray-800">
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">항목 {i + 1}</p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    이것은 스크롤 가능한 콘텐츠입니다. 많은 정보를 표시할 수 있습니다.
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-3 justify-end p-6 border-t border-gray-200 dark:border-gray-800">
                            <Dialog.Close asChild>
                              <button className="h-[32px] rounded-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">
                                닫기
                              </button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                              <button className="h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors">
                                확인
                              </button>
                            </Dialog.Close>
                          </div>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </div>
                </div>
              </Card>

              {/* Dropdown Menu */}
              <Card title="Dropdown Menu">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="w-full h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors shadow-sm shadow-blue-500/20 dark:shadow-blue-600/20 flex items-center justify-center gap-2">
                      메뉴 열기
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="min-w-[200px] rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-xl z-50">
                      <DropdownMenu.Item className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300">
                        편집
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300">
                        복제
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-800" />
                      <DropdownMenu.Item className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300">
                        공유
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300">
                        다운로드
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-800" />
                      <DropdownMenu.Item className="rounded px-3 py-2 text-sm hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 cursor-pointer">
                        삭제
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </Card>

              {/* Hover Card */}
              <Card title="Hover Card">
                <HoverCard.Root>
                  <HoverCard.Trigger asChild>
                    <button className="w-full h-[32px] rounded-sm bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 px-4 text-sm font-medium text-white transition-colors shadow-sm shadow-purple-500/20 dark:shadow-purple-600/20">
                      마우스를 올려보세요
                    </button>
                  </HoverCard.Trigger>
                  <HoverCard.Portal>
                    <HoverCard.Content
                      sideOffset={5}
                      className="w-64 rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xl z-50"
                    >
                      <div className="flex gap-4">
                        <Avatar.Root style={{ minWidth: "40px", height: "40px" }} className="rounded-full bg-gray-200 dark:bg-gray-800 ring-2 ring-gray-300 dark:ring-gray-700 overflow-hidden flex items-center justify-center">
                          <Avatar.Image
                            src="https://i.pravatar.cc/150?img=2"
                            alt="John Doe의 프로필 사진"
                            className="w-full h-full object-cover"
                          />
                        </Avatar.Root>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">John Doe</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">@johndoe</p>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            이것은 호버 카드입니다. 마우스를 올리면 추가 정보가 표시됩니다.
                          </p>
                        </div>
                      </div>
                      <HoverCard.Arrow className="fill-white dark:fill-gray-900" />
                    </HoverCard.Content>
                  </HoverCard.Portal>
                </HoverCard.Root>
              </Card>

              {/* Icon Button */}
              <Card title="Icon Button">
                <div className="flex flex-wrap items-center gap-2">
                  <button aria-label="추가" className="h-[32px] w-[32px] rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button aria-label="추가" className="h-[32px] w-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button aria-label="보기" className="h-[32px] w-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button aria-label="삭제" className="h-[32px] w-[32px] rounded-sm bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white transition-colors flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </Card>

              {/* Inset */}
              <Card title="Inset">
                <div className="rounded-sm border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 flex flex-col gap-2" >
                  <div className="rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">이것은 Inset 컴포넌트 예시입니다.</p>
                  </div>
                  <div className="rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">내용이 중첩된 컨테이너 안에 표시됩니다.</p>
                  </div>
                </div>
              </Card>

              {/* Label */}
              <Card title="Label">
                <div className="flex flex-col gap-6">
                  {/* 상하 배치 예시 */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">상하 배치</h3>
                    <div className="flex flex-col gap-2">
                      <Label.Root htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        이메일 주소
                      </Label.Root>
                      <input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        className="h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label.Root htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        비밀번호
                      </Label.Root>
                      <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* 좌우 배치 예시 */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">좌우 배치</h3>
                    <div className="flex items-center gap-2">
                      <Label.Root htmlFor="email-horizontal" className="text-sm font-medium text-gray-700 dark:text-gray-300 shrink-0">
                        이메일 주소
                      </Label.Root>
                      <input
                        id="email-horizontal"
                        type="email"
                        placeholder="email@example.com"
                        className="flex-1 h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label.Root htmlFor="password-horizontal" className="text-sm font-medium text-gray-700 dark:text-gray-300 shrink-0">
                        비밀번호
                      </Label.Root>
                      <input
                        id="password-horizontal"
                        type="password"
                        placeholder="••••••••"
                        className="flex-1 h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label.Root htmlFor="email-horizontal" className="text-sm font-medium text-gray-700 dark:text-gray-300 shrink-0">
                        이름
                      </Label.Root>
                      <input
                        id="name-horizontal"
                        type="text"
                        placeholder="홍길동"
                        className="flex-1 h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* 필수 항목 예시 */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">필수 항목 표시</h3>
                    <div className="flex flex-col gap-2">
                      <Label.Root htmlFor="email-required" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        이메일 주소 <span className="text-red-500" aria-label="필수 항목">*</span>
                      </Label.Root>
                      <input
                        id="email-required"
                        type="email"
                        placeholder="email@example.com"
                        className="h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        aria-required="true"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label.Root htmlFor="password-required" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        비밀번호 <span className="text-red-500" aria-label="필수 항목">*</span>
                      </Label.Root>
                      <input
                        id="password-required"
                        type="password"
                        placeholder="••••••••"
                        className="h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        aria-required="true"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label.Root htmlFor="email-horizontal" className="text-sm font-medium text-gray-700 dark:text-gray-300 shrink-0">
                        전화번호 <span className="text-red-500" aria-label="필수 항목">*</span>
                      </Label.Root>
                      <input
                        id="phone-required-horizontal"
                        type="tel"
                        placeholder="010-1234-5678"
                        className="flex-1 h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        aria-required="true"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Menubar */}
              <Card title="Menubar">
                <Menubar.Root className="flex gap-1 rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-1">
                  <Menubar.Menu>
                    <Menubar.Trigger className="rounded px-3 py-1.5 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
                      파일
                    </Menubar.Trigger>
                    <Menubar.Portal>
                      <Menubar.Content className="min-w-[200px] rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-xl z-50">
                        <Menubar.Item className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300">
                          새로 만들기
                        </Menubar.Item>
                        <Menubar.Item className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300">
                          열기
                        </Menubar.Item>
                        <Menubar.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-800" />
                        <Menubar.Item className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300">
                          저장
                        </Menubar.Item>
                      </Menubar.Content>
                    </Menubar.Portal>
                  </Menubar.Menu>
                  <Menubar.Menu>
                    <Menubar.Trigger className="rounded px-3 py-1.5 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
                      편집
                    </Menubar.Trigger>
                    <Menubar.Portal>
                      <Menubar.Content className="min-w-[200px] rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-xl z-50">
                        <Menubar.Item className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300">
                          실행 취소
                        </Menubar.Item>
                        <Menubar.Item className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300">
                          다시 실행
                        </Menubar.Item>
                      </Menubar.Content>
                    </Menubar.Portal>
                  </Menubar.Menu>
                  <Menubar.Menu>
                    <Menubar.Trigger className="rounded px-3 py-1.5 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
                      보기
                    </Menubar.Trigger>
                  </Menubar.Menu>
                </Menubar.Root>
              </Card>

              {/* Navigation Menu */}
              <Card title="Navigation Menu">
                <NavigationMenu.Root className="relative">
                  <NavigationMenu.List className="flex gap-2 flex-wrap items-center">
                    <NavigationMenu.Item>
                      <NavigationMenu.Link
                        href="#"
                        className="inline-flex h-[32px] items-center rounded-sm px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                        aria-label="홈 메뉴 (데모용)"
                      >
                        홈
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link
                        href="#"
                        className="inline-flex h-[32px] items-center rounded-sm px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                        aria-label="소개 메뉴 (데모용)"
                      >
                        소개
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Trigger className="inline-flex h-[32px] items-center rounded-sm px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
                        제품
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="w-48 rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-xl">
                        <NavigationMenu.Link
                          href="#"
                          className="block rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                          aria-label="제품 1 메뉴 (데모용)"
                        >
                          제품 1
                        </NavigationMenu.Link>
                        <NavigationMenu.Link
                          href="#"
                          className="block rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                          aria-label="제품 2 메뉴 (데모용)"
                        >
                          제품 2
                        </NavigationMenu.Link>
                        <NavigationMenu.Link
                          href="#"
                          className="block rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                          aria-label="제품 3 메뉴 (데모용)"
                        >
                          제품 3
                        </NavigationMenu.Link>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link
                        href="#"
                        className="inline-flex h-[32px] items-center rounded-sm px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                        aria-label="연락처 메뉴 (데모용)"
                      >
                        연락처
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  </NavigationMenu.List>
                  <div className="absolute left-0 top-full mt-2 w-full">
                    <NavigationMenu.Viewport className="relative w-full origin-top-center transition-all duration-300 z-50" />
                  </div>
                </NavigationMenu.Root>
              </Card>

              {/* No Data */}
              <Card title="No Data">
                <div className="space-y-6">
                  {/* 빈 테이블 예시 */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-sm">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">데이터 목록</h3>
                        <Tooltip.Provider>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <button
                                aria-label="데이터 없음 안내"
                                className="h-[24px] w-[24px] rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                              >
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                side="left"
                                sideOffset={5}
                                className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50 max-w-xs"
                              >
                                현재 등록된 데이터가 없습니다. 새로 추가하려면 상단의 추가 버튼을 클릭하세요.
                                <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      </div>
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <svg className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">데이터가 없습니다</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">새로운 데이터를 추가해보세요</p>
                      </div>
                    </div>
                  </div>

                  {/* 빈 리스트 예시 */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-sm">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">검색 결과</h3>
                      </div>
                      <div className="flex items-center gap-2 py-8 text-center justify-center">
                        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-sm text-gray-500 dark:text-gray-400">검색 결과가 없습니다</span>
                        <Tooltip.Provider>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <button
                                aria-label="검색 결과 없음 안내"
                                className="h-[20px] w-[20px] rounded-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 flex items-center justify-center transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                side="top"
                                sideOffset={5}
                                className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50 max-w-xs"
                              >
                                다른 검색어를 사용하거나 필터 조건을 변경해보세요.
                                <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      </div>
                    </div>
                  </div>

                  {/* 빈 카드 예시 */}
                  <div className="grid gap-6">
                    {[
                      { title: "저장된 항목", count: 0, icon: "📁" },
                      { title: "즐겨찾기", count: 0, icon: "⭐" },
                    ].map((item, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-sm p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</span>
                          <Tooltip.Provider>
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400 dark:text-gray-500">({item.count})</span>
                                  <button
                                    aria-label={`${item.title} 안내`}
                                    className="h-[16px] w-[16px] rounded-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 flex items-center justify-center transition-colors"
                                  >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </button>
                                </div>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content
                                  side="top"
                                  sideOffset={5}
                                  className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50 max-w-xs"
                                >
                                  {item.title}에 저장된 항목이 없습니다. 항목을 추가하면 여기에 표시됩니다.
                                  <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </Tooltip.Provider>
                        </div>
                        <div className="flex flex-col items-center justify-center py-6">
                          <span className="text-2xl mb-2">{item.icon}</span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">데이터가 없습니다</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 인라인 빈 상태 예시 */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-sm p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">상태:</span>
                      <span className="text-sm text-gray-400 dark:text-gray-500">데이터가 없습니다</span>
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <button
                              aria-label="상태 안내"
                              className="h-[16px] w-[16px] rounded-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 flex items-center justify-center transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="right"
                              sideOffset={5}
                              className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50 max-w-xs"
                            >
                              이 섹션에 표시할 데이터가 없습니다. 데이터를 추가하면 자동으로 표시됩니다.
                              <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Popover */}
              <Card title="Popover">
                <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <Popover.Trigger asChild>
                    <button className="w-full h-[32px] rounded-sm bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 px-4 text-sm font-medium text-white transition-colors shadow-sm shadow-green-500/20 dark:shadow-green-600/20">
                      팝오버 열기
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      sideOffset={5}
                      className="w-64 rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xl z-50"
                    >
                      <Popover.Arrow className="fill-white dark:fill-gray-900" />
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">팝오버 제목</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        이것은 팝오버 콘텐츠입니다. 버튼을 클릭하면 표시됩니다.
                      </p>
                      <Popover.Close asChild>
                        <button className="w-full h-[32px] rounded-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">
                          닫기
                        </button>
                      </Popover.Close>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              </Card>

              {/* Progress */}
              <Card title="Progress">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700 dark:text-gray-300">진행률</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{progress}%</span>
                    </div>
                    <Progress.Root
                      value={progress}
                      className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 shadow-inner"
                    >
                      <Progress.Indicator
                        className="h-full bg-blue-500 dark:bg-blue-600 transition-all duration-300 shadow-sm"
                        style={{ width: `${progress}%` }}
                      />
                    </Progress.Root>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                      className="flex-1 h-[32px] rounded-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors"
                    >
                      -10%
                    </button>
                    <button
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                      className="flex-1 h-[32px] rounded-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors"
                    >
                      +10%
                    </button>
                  </div>
                </div>
              </Card>

              {/* Radio Cards */}
              <Card title="Radio Cards">
                <RadioGroup.Root value={radioValue} onValueChange={setRadioValue} className="space-y-2">
                  {[
                    { value: "option1", label: "기본 옵션", description: "이것은 기본 옵션입니다" },
                    { value: "option2", label: "프리미엄 옵션", description: "추가 기능이 포함된 옵션입니다" },
                    { value: "option3", label: "엔터프라이즈 옵션", description: "모든 기능이 포함된 옵션입니다" },
                  ].map((option) => {
                    const colorClasses = getRadioCardColorClasses(colorTheme);

                    return (
                      <label
                        key={option.value}
                        className={`flex items-start gap-3 rounded-sm border-2 p-3 cursor-pointer transition-all ${radioValue === option.value
                          ? `${colorClasses.cardBorder} ${colorClasses.cardBg}`
                          : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900"
                          }`}
                      >
                        <RadioGroup.Item
                          value={option.value}
                          className="mt-0.5 h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors"
                        >
                          <RadioGroup.Indicator className="flex items-center justify-center">
                            <div className={`h-2 w-2 rounded-full ${radioValue === option.value ? colorClasses.indicatorBg : 'bg-white'}`} />
                          </RadioGroup.Indicator>
                        </RadioGroup.Item>
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${radioValue === option.value ? colorClasses.text : "text-gray-900 dark:text-gray-100"}`}>
                            {option.label}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{option.description}</div>
                        </div>
                      </label>
                    );
                  })}
                </RadioGroup.Root>
              </Card>

              {/* Radio Group */}
              <Card title="Radio Group">
                <RadioGroup.Root value={radioValue} onValueChange={setRadioValue}>
                  <div className="flex flex-col gap-3">
                    {["option1", "option2", "option3"].map((option) => {
                      const radioGroupColorClasses = getRadioColorClasses(colorTheme);

                      return (
                        <div key={option} className="flex items-center gap-3">
                          <RadioGroup.Item
                            value={option}
                            id={option}
                            className={`h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600 ${radioGroupColorClasses.hoverBorder} bg-white dark:bg-gray-900 transition-colors`}
                          >
                            <RadioGroup.Indicator className="flex items-center justify-center">
                              <div className={`h-3 w-3 rounded-full ${radioGroupColorClasses.indicatorBg}`} />
                            </RadioGroup.Indicator>
                          </RadioGroup.Item>
                          <Label.Root htmlFor={option} className="text-sm cursor-pointer text-gray-700 dark:text-gray-300">
                            옵션 {option.slice(-1)}
                          </Label.Root>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup.Root>
              </Card>

              {/* Radius Examples */}
              <Card title="Radius Examples">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Button Radius Variants</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <button className="h-[32px] rounded-none bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors shadow-sm">
                        None
                      </button>
                      <button className="h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors shadow-sm">
                        Small
                      </button>
                      <button className="h-[32px] rounded-md bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors shadow-sm">
                        Medium
                      </button>
                      <button className="h-[32px] rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors shadow-sm">
                        Large
                      </button>
                      <button className="h-[32px] rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors shadow-sm">
                        Full
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Input Radius Variants</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        placeholder="None"
                        className="h-[32px] rounded-none border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      <input
                        type="text"
                        placeholder="Small"
                        className="h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      <input
                        type="text"
                        placeholder="Medium"
                        className="h-[32px] rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      <input
                        type="text"
                        placeholder="Large"
                        className="h-[32px] rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      <input
                        type="text"
                        placeholder="Full"
                        className="h-[32px] rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Card Radius Variants</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { radius: "none", label: "None", className: "rounded-none" },
                        { radius: "small", label: "Small", className: "rounded-sm" },
                        { radius: "medium", label: "Medium", className: "rounded-md" },
                        { radius: "large", label: "Large", className: "rounded-lg" },
                      ].map(({ radius, label, className }) => (
                        <div
                          key={radius}
                          className={`${className} border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 shadow-sm`}
                        >
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">radius=&quot;{radius}&quot;</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Switch with Different Radius</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {[
                        { radius: "none", className: "rounded-none" },
                        { radius: "small", className: "rounded-sm" },
                        { radius: "medium", className: "rounded-md" },
                        { radius: "large", className: "rounded-lg" },
                        { radius: "full", className: "rounded-full" },
                      ].map(({ radius, className }) => {
                        const switchColorClasses = getSwitchColorClasses(colorTheme);
                        return (
                          <div key={radius} className="flex items-center gap-2">
                            <Switch.Root
                              className={`${className} w-11 h-6 bg-gray-200 dark:bg-gray-700 ${switchColorClasses.checkedBg} relative transition-colors`}
                              checked={isSwitchChecked}
                              onCheckedChange={setIsSwitchChecked}
                            >
                              <Switch.Thumb className={`${className} block w-5 h-5 bg-white transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px] shadow-sm`} />
                            </Switch.Root>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{radius}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Checkbox with Different Radius</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {[
                        { radius: "none", className: "rounded-none" },
                        { radius: "small", className: "rounded-sm" },
                        { radius: "medium", className: "rounded-md" },
                        { radius: "large", className: "rounded-lg" },
                        { radius: "full", className: "rounded-full" },
                      ].map(({ radius, className }) => {
                        const checkboxColorClasses = getCheckboxColorClasses(colorTheme);
                        return (
                          <div key={radius} className="flex items-center gap-2">
                            <Checkbox.Root
                              className={`${className} flex h-5 w-5 items-center justify-center border-2 ${checkboxChecked ? checkboxColorClasses.checkedBorder : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
                              checked={checkboxChecked}
                              onCheckedChange={(checked) => setCheckboxChecked(checked === true)}
                            >
                              <Checkbox.Indicator className={checkboxChecked ? checkboxColorClasses.indicatorText : "text-white"}>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </Checkbox.Indicator>
                            </Checkbox.Root>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{radius}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Scroll Area */}
              <Card title="Scroll Area">
                <ScrollArea.Root className="h-40 w-full overflow-hidden rounded-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
                  <ScrollArea.Viewport className="h-full w-full p-4">
                    <div className="space-y-2">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="text-sm py-1 text-gray-700 dark:text-gray-300">
                          항목 {i + 1} - 스크롤 가능한 콘텐츠입니다.
                        </div>
                      ))}
                    </div>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar
                    orientation="vertical"
                    className="flex touch-none select-none border-l border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 p-0.5 transition-colors"
                  >
                    <ScrollArea.Thumb className="relative flex-1 rounded-full bg-gray-400 dark:bg-gray-600 before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px]" />
                  </ScrollArea.Scrollbar>
                </ScrollArea.Root>
              </Card>

              {/* Segmented Control */}
              <Card title="Segmented Control">
                <div className="flex gap-1 rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 p-1">
                  {["전체", "활성", "비활성"].map((label) => (
                    <button
                      key={label}
                      onClick={() => setSegmentedValue(label)}
                      className={`flex-1 h-[32px] rounded-sm px-3 text-sm font-medium transition-colors ${segmentedValue === label
                        ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">선택된 값: {segmentedValue}</p>
              </Card>

              {/* Select */}
              <Card title="Select">
                <div className="space-y-4">
                  <Select.Root value={selectValue} onValueChange={setSelectValue}>
                    <Select.Trigger className={`flex w-full h-[32px] items-center justify-between rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors ${getSelectFocusClasses(colorTheme)}`}>
                      <Select.Value placeholder="옵션을 선택하세요" className="text-gray-500 dark:text-gray-400" />
                      <Select.Icon className="text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="min-w-[200px] rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-xl z-50">
                        <Select.Viewport>
                          {["option1", "option2", "option3", "option4"].map((option) => (
                            <Select.Item
                              key={option}
                              value={option}
                              className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 transition-colors"
                            >
                              <Select.ItemText>옵션 {option.slice(-1)}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                  {selectValue && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">선택된 값: {selectValue}</p>
                  )}
                  <div className="flex flex-col gap-2">
                    <Label.Root className="text-xs text-gray-500 dark:text-gray-400">
                      Disabled
                    </Label.Root>
                    <Select.Root disabled>
                      <Select.Trigger className="flex w-full h-[32px] items-center justify-between rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 text-sm text-gray-400 dark:text-gray-500 cursor-not-allowed">
                        <Select.Value placeholder="비활성화된 선택" />
                        <Select.Icon className="text-gray-400 dark:text-gray-500">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </Select.Icon>
                      </Select.Trigger>
                    </Select.Root>
                  </div>
                </div>
              </Card>

              {/* Separator */}
              <Card title="Separator">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">수평 Separator</p>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-700 dark:text-gray-300">위쪽 콘텐츠</div>
                      <Separator.Root className="h-px bg-gray-200 dark:bg-gray-800" />
                      <div className="text-sm text-gray-700 dark:text-gray-300">중간 콘텐츠</div>
                      <Separator.Root className="h-px bg-gray-200 dark:bg-gray-800" />
                      <div className="text-sm text-gray-700 dark:text-gray-300">아래쪽 콘텐츠</div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">수직 Separator</p>
                    <div className="flex items-center gap-2 h-8">
                      <button className="h-[32px] px-4 rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors text-sm font-medium">
                        파일
                      </button>
                      <Separator.Root orientation="vertical" className="w-px h-full bg-gray-200 dark:bg-gray-800" />
                      <button className="h-[32px] px-4 rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors text-sm font-medium">
                        편집
                      </button>
                      <Separator.Root orientation="vertical" className="w-px h-full bg-gray-200 dark:bg-gray-800" />
                      <button className="h-[32px] px-4 rounded-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors text-sm font-medium">
                        보기
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">텍스트와 함께</p>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-700 dark:text-gray-300">카테고리</div>
                      <Separator.Root className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                      <div className="text-xs text-gray-500 dark:text-gray-400">12개</div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">두께별 Separator</p>
                    <div className="space-y-3">
                      <Separator.Root className="h-px bg-gray-200 dark:bg-gray-800" />
                      <Separator.Root className="h-0.5 bg-gray-300 dark:bg-gray-700" />
                      <Separator.Root className="h-1 bg-gray-400 dark:bg-gray-600" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Skeleton */}
              <Card title="Skeleton">
                <div className="space-y-3">
                  <div className="h-4 w-full rounded-sm bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  <div className="h-4 w-5/6 rounded-sm bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  <div className="h-4 w-4/6 rounded-sm bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  <div className="flex items-center gap-3 mt-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-full rounded-sm bg-gray-200 dark:bg-gray-800 animate-pulse" />
                      <div className="h-4 w-2/3 rounded-sm bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    </div>
                  </div>
                  <div className="h-4 w-2/6 rounded-sm bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  <div className="h-4 w-5/6 rounded-sm bg-gray-200 dark:bg-gray-800 animate-pulse" />
                </div>
              </Card>

              {/* Slider */}
              <Card title="Slider">
                <div className="space-y-4">
                  <Slider.Root
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="relative flex w-full touch-none select-none items-center"
                  >
                    <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                      <Slider.Range className="absolute h-full bg-blue-500 dark:bg-blue-600" />
                    </Slider.Track>
                    <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-500 dark:border-blue-600 bg-white dark:bg-gray-900 shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors" />
                  </Slider.Root>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>0</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">값: {sliderValue[0]}</span>
                    <span>100</span>
                  </div>
                </div>
              </Card>

              {/* Spinner */}
              <Card title="Spinner">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">크기별 Spinner</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 dark:border-gray-800 border-t-blue-500 dark:border-t-blue-600" />
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 dark:border-gray-800 border-t-blue-500 dark:border-t-blue-600" />
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 dark:border-gray-800 border-t-blue-500 dark:border-t-blue-600" />
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 dark:border-gray-800 border-t-blue-500 dark:border-t-blue-600" />
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 dark:border-gray-800 border-t-blue-500 dark:border-t-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">색상별 Spinner</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 dark:border-gray-800 border-t-blue-500 dark:border-t-blue-600" />
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 dark:border-gray-800 border-t-green-500 dark:border-t-green-600" />
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 dark:border-gray-800 border-t-purple-500 dark:border-t-purple-600" />
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 dark:border-gray-800 border-t-red-500 dark:border-t-red-600" />
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 dark:border-gray-800 border-t-orange-500 dark:border-t-orange-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">버튼 내 Spinner</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <button className="h-[32px] px-4 rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span className="text-sm font-medium">로딩 중...</span>
                      </button>
                      <button className="h-[32px] px-4 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 dark:border-gray-400 border-t-transparent" />
                        <span className="text-sm font-medium">처리 중...</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Switch */}
              <Card title="Switch">
                <div className="flex flex-col gap-2">
                  {(() => {
                    const switchColorClasses = getSwitchColorClasses(colorTheme);
                    return (
                      <>
                        <div className="flex items-center justify-between">
                          <Label.Root className="text-sm cursor-pointer text-gray-700 dark:text-gray-300">
                            알림 활성화
                          </Label.Root>
                          <Switch.Root
                            checked={isSwitchChecked}
                            onCheckedChange={setIsSwitchChecked}
                            className={`h-6 w-11 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors ${switchColorClasses.checkedBg}`}
                          >
                            <Switch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-lg transition-transform will-change-transform data-[state=checked]:translate-x-[22px]" />
                          </Switch.Root>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          현재 상태: {isSwitchChecked ? "활성화됨" : "비활성화됨"}
                        </p>
                      </>
                    );
                  })()}
                </div>
              </Card>

              {/* Table */}
              <Card title="Table">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">이름</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">이메일</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">역할</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "홍길동", email: "hong@example.com", role: "관리자", status: "활성" },
                        { name: "김철수", email: "kim@example.com", role: "사용자", status: "활성" },
                        { name: "이영희", email: "lee@example.com", role: "사용자", status: "비활성" },
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{row.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{row.role}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium ${row.status === "활성"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                              }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Tabs */}
              <Card title="Tabs">
                {(() => {
                  const tabsColorClasses = getTabsColorClasses(colorTheme);
                  return (
                    <Tabs.Root defaultValue="tab1" className="w-full">
                      <Tabs.List className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
                        {["tab1", "tab2", "tab3"].map((tab) => (
                          <Tabs.Trigger
                            key={tab}
                            value={tab}
                            className={`rounded-t-lg px-4 py-2 text-sm hover:text-gray-900 dark:hover:text-gray-100 data-[state=active]:border-b-2 ${tabsColorClasses.activeBorder} ${tabsColorClasses.activeText} ${tabsColorClasses.activeBg} text-gray-600 dark:text-gray-400 transition-colors`}
                          >
                            탭 {tab.slice(-1)}
                          </Tabs.Trigger>
                        ))}
                      </Tabs.List>
                      {["tab1", "tab2", "tab3"].map((tab) => (
                        <Tabs.Content key={tab} value={tab} className="mt-2 p-2 text-sm text-gray-700 dark:text-gray-300">
                          탭 {tab.slice(-1)}의 콘텐츠입니다.
                        </Tabs.Content>
                      ))}
                    </Tabs.Root>
                  );
                })()}
              </Card>

              {/* Text Area */}
              <Card title="Text Area">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="textarea-default" className="text-xs text-gray-500 dark:text-gray-400">
                      기본 Text Area
                    </Label.Root>
                    <textarea
                      id="textarea-default"
                      placeholder="메시지를 입력하세요..."
                      rows={4}
                      className="h-auto w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                    />
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>최소 10자 이상 입력하세요</span>
                      <span>0 / 500</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="textarea-readonly" className="text-xs text-gray-500 dark:text-gray-400">
                      Readonly
                    </Label.Root>
                    <textarea
                      id="textarea-readonly"
                      value="읽기 전용 텍스트 영역입니다. 이 내용은 수정할 수 없습니다."
                      rows={4}
                      readOnly
                      aria-label="읽기 전용 텍스트 영역"
                      className="h-auto w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 resize-none cursor-not-allowed"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="textarea-disabled" className="text-xs text-gray-500 dark:text-gray-400">
                      Disabled
                    </Label.Root>
                    <textarea
                      id="textarea-disabled"
                      placeholder="비활성화된 텍스트 영역"
                      rows={4}
                      disabled
                      aria-label="비활성화된 텍스트 영역"
                      className="h-auto w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 py-2 text-sm text-gray-400 dark:text-gray-500 placeholder-gray-300 dark:placeholder-gray-600 resize-none cursor-not-allowed"
                    />
                  </div>
                </div>
              </Card>

              {/* Text Field */}
              <Card title="Text Field">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="textfield-left" className="text-xs text-gray-500 dark:text-gray-400">
                      아이콘 앞, 좌측 정렬
                    </Label.Root>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        id="textfield-left"
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="textfield-right" className="text-xs text-gray-500 dark:text-gray-400">
                      아이콘 뒤, 좌측 정렬 (검색 버튼)
                    </Label.Root>
                    <div className="relative">
                      <input
                        id="textfield-right"
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchTextRight}
                        onChange={(e) => setSearchTextRight(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearch();
                          }
                        }}
                        className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      <button
                        onClick={handleSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
                        aria-label="검색"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>
                    {searchTextRight && (
                      <div className="mt-2 p-3 rounded-sm border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          검색 결과 ({filteredItemsRight.length}개)
                        </p>
                        {filteredItemsRight.length > 0 ? (
                          <ul className="space-y-1">
                            {filteredItemsRight.map((item, index) => (
                              <li
                                key={index}
                                className="text-sm text-gray-900 dark:text-gray-100 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            검색 결과가 없습니다.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="textfield-both" className="text-xs text-gray-500 dark:text-gray-400">
                      아이콘 앞뒤, 좌측 정렬 (검색 및 삭제 기능)
                    </Label.Root>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        id="textfield-both"
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-10 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      {searchText && (
                        <button
                          onClick={handleClearSearch}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
                          aria-label="검색어 삭제"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {searchText && (
                      <div className="mt-2 p-3 rounded-sm border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          검색 결과 ({filteredItems.length}개)
                        </p>
                        {filteredItems.length > 0 ? (
                          <ul className="space-y-1">
                            {filteredItems.map((item, index) => (
                              <li
                                key={index}
                                className="text-sm text-gray-900 dark:text-gray-100 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            검색 결과가 없습니다.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="textfield-right-align" className="text-xs text-gray-500 dark:text-gray-400">
                      아이콘 앞, 우측 정렬, 삭제, 숫자만
                    </Label.Root>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        <span className="font-mono text-[13px]">₩</span>
                      </div>
                      {/* 숫자만 입력 가능하도록 onChange 핸들러 수정 */}
                      <input
                        id="textfield-right-align"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="0"
                        value={searchTextRight}
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                          setSearchTextRight(onlyNums);
                        }}
                        className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-10 text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      {searchTextRight && (
                        <button
                          onClick={() => setSearchTextRight("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
                          aria-label="입력값 삭제"
                          type="button"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="textfield-right-align-back" className="text-xs text-gray-500 dark:text-gray-400">
                      아이콘 뒤, 우측 정렬
                    </Label.Root>
                    <div className="relative">
                      <input
                        id="textfield-right-align-back"
                        type="text"
                        placeholder="100"
                        className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-10 text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">ㅁ
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="textfield-readonly" className="text-xs text-gray-500 dark:text-gray-400">
                      Readonly
                    </Label.Root>
                    <input
                      id="textfield-readonly"
                      type="text"
                      value="읽기 전용 텍스트입니다"
                      readOnly
                      aria-label="읽기 전용 입력 필드"
                      className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 text-sm text-left text-gray-900 dark:text-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="textfield-disabled" className="text-xs text-gray-500 dark:text-gray-400">
                      Disabled
                    </Label.Root>
                    <input
                      id="textfield-disabled"
                      type="text"
                      placeholder="비활성화된 입력 필드"
                      disabled
                      className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 text-sm text-left text-gray-400 dark:text-gray-500 placeholder-gray-300 dark:placeholder-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>
              </Card>

              {/* Toast */}
              <Card title="Toast">
                <button
                  onClick={() => setToastOpen(true)}
                  className="w-full h-[32px] rounded-sm bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 px-4 text-sm font-medium text-white transition-colors shadow-sm"
                >
                  토스트 표시
                </button>
                <Toast.Root
                  open={toastOpen}
                  onOpenChange={setToastOpen}
                  className="flex w-full flex-col gap-2 rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-lg relative"
                >
                  <Toast.Title className="font-semibold text-gray-900 dark:text-gray-100">토스트 알림</Toast.Title>
                  <Toast.Description className="text-sm text-gray-600 dark:text-gray-400">
                    이것은 토스트 알림 메시지입니다.
                  </Toast.Description>
                  <Toast.Close className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Toast.Close>
                </Toast.Root>
              </Card>

              {/* Toggle */}
              <Card title="Toggle">
                <div className="flex flex-col gap-3">
                  <Toggle.Root className="h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=on]:bg-blue-500 dark:data-[state=on]:bg-blue-600 data-[state=on]:text-white transition-colors text-gray-700 dark:text-gray-300">
                    기본 토글
                  </Toggle.Root>
                  <Toggle.Root className="h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=on]:bg-green-500 dark:data-[state=on]:bg-green-600 data-[state=on]:text-white transition-colors text-gray-700 dark:text-gray-300">
                    성공 토글
                  </Toggle.Root>
                  <Toggle.Root className="h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=on]:bg-red-500 dark:data-[state=on]:bg-red-600 data-[state=on]:text-white transition-colors text-gray-700 dark:text-gray-300">
                    위험 토글
                  </Toggle.Root>
                </div>
              </Card>

              {/* Toggle Group */}
              <Card title="Toggle Group">
                <div className="space-y-4">
                  {(() => {
                    const toggleGroupColorClasses = getToggleGroupColorClasses(colorTheme);
                    return (
                      <>
                        <div>
                          <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">단일 선택</p>
                          <ToggleGroup.Root
                            type="single"
                            value={toggleValue}
                            onValueChange={(value) => value && setToggleValue(value)}
                          >
                            {["left", "center", "right"].map((value, index, array) => (
                              <ToggleGroup.Item
                                key={value}
                                value={value}
                                className={`h-[32px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${toggleGroupColorClasses.onBg} data-[state=on]:text-white transition-colors text-gray-700 dark:text-gray-300 ${index === 0 ? "rounded-l-sm" : ""
                                  } ${index === array.length - 1 ? "rounded-r-sm" : ""} ${index > 0 ? "border-l-0" : ""
                                  }`}
                              >
                                {value === "left" ? "왼쪽" : value === "center" ? "가운데" : "오른쪽"}
                              </ToggleGroup.Item>
                            ))}
                          </ToggleGroup.Root>
                        </div>
                        <div>
                          <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">다중 선택</p>
                          <ToggleGroup.Root type="multiple" className="flex gap-2">
                            {["bold", "italic", "underline"].map((value) => (
                              <ToggleGroup.Item
                                key={value}
                                value={value}
                                className={`h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${toggleGroupColorClasses.onBg} data-[state=on]:text-white transition-colors text-gray-700 dark:text-gray-300`}
                              >
                                {value === "bold" ? "굵게" : value === "italic" ? "기울임" : "밑줄"}
                              </ToggleGroup.Item>
                            ))}
                          </ToggleGroup.Root>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </Card>

              {/* Tooltip */}
              <Card title="Tooltip">
                <div className="space-y-8">
                  {/* 방향별 Tooltip 예시 */}
                  <div>
                    <Label.Root className="text-xs text-gray-500 dark:text-gray-400 mb-4 block">
                      방향별 Tooltip
                    </Label.Root>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { side: "top" as const, label: "위쪽", icon: "↑" },
                        { side: "bottom" as const, label: "아래쪽", icon: "↓" },
                        { side: "left" as const, label: "왼쪽", icon: "←" },
                        { side: "right" as const, label: "오른쪽", icon: "→" },
                      ].map(({ side, label, icon }) => (
                        <Tooltip.Provider key={side} delayDuration={300}>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <button className="h-[32px] rounded-sm bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 px-4 text-sm font-medium text-white transition-colors shadow-sm shadow-indigo-500/20 dark:shadow-indigo-600/20 flex items-center gap-2">
                                <span>{icon}</span>
                                <span>{label}</span>
                              </button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                side={side}
                                sideOffset={5}
                                className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                              >
                                {label} 방향 툴팁입니다
                                <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      ))}
                    </div>
                  </div>

                  {/* 다양한 트리거 요소 예시 */}
                  <div>
                    <Label.Root className="text-xs text-gray-500 dark:text-gray-400 mb-4 block">
                      다양한 트리거 요소
                    </Label.Root>
                    <div className="flex flex-wrap items-center gap-2">
                      {/* 버튼 */}
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <button className="h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors">
                              버튼
                            </button>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="top"
                              sideOffset={5}
                              className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50"
                            >
                              버튼에 대한 툴팁
                              <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>

                      {/* 아이콘 */}
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <button
                              aria-label="정보 아이콘"
                              className="h-[32px] w-[32px] rounded-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                            >
                              <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="top"
                              sideOffset={5}
                              className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50"
                            >
                              정보 아이콘
                              <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>

                      {/* 링크 */}
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <a href="#" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline text-sm" aria-label="샘플 링크 (데모용)">
                              링크
                            </a>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="top"
                              sideOffset={5}
                              className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50"
                            >
                              링크에 대한 툴팁
                              <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>

                      {/* 텍스트 */}
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <span className="text-gray-700 dark:text-gray-300 text-sm cursor-help border-b border-dashed border-gray-400 dark:border-gray-500">
                              물음표에 마우스를 올려보세요
                            </span>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="top"
                              sideOffset={5}
                              className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50 max-w-xs"
                            >
                              이것은 도움말 텍스트입니다. 더 긴 설명을 작성할 수도 있습니다.
                              <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    </div>
                  </div>

                  {/* 옵션 예시 */}
                  <div>
                    <Label.Root className="text-xs text-gray-500 dark:text-gray-400 mb-4 block">
                      Tooltip 옵션
                    </Label.Root>
                    <div className="flex flex-wrap gap-2">
                      {/* 빠른 표시 (delayDuration 짧게) */}
                      <Tooltip.Provider delayDuration={0}>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <button className="h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors">
                              즉시 표시
                            </button>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="top"
                              sideOffset={5}
                              className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50"
                            >
                              지연 없이 즉시 표시됩니다
                              <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>

                      {/* 느린 표시 (delayDuration 길게) */}
                      <Tooltip.Provider delayDuration={700}>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <button className="h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors">
                              지연 표시
                            </button>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="top"
                              sideOffset={5}
                              className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50"
                            >
                              700ms 후에 표시됩니다
                              <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>

                      {/* Arrow 없음 */}
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <button className="h-[32px] rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors">
                              화살표 없음
                            </button>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="top"
                              sideOffset={5}
                              className="rounded-sm bg-gray-900 dark:bg-gray-800 px-3 py-2 text-sm text-white shadow-lg z-50"
                            >
                              화살표가 없는 툴팁
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Typography - Blockquote */}
              <Card title="Typography - Blockquote">
                <blockquote className="border-l-4 border-blue-500 dark:border-blue-600 pl-4 italic text-gray-700 dark:text-gray-300">
                  &quot;이것은 인용구입니다. 중요한 내용이나 영감을 주는 문구를 표시할 때 사용합니다.&quot;
                </blockquote>
              </Card>

              {/* Typography - Heading */}
              <Card title="Typography - Heading">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Heading 1</h1>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Heading 2</h2>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Heading 3</h3>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Heading 4</h4>
                  <h5 className="text-base font-medium text-gray-900 dark:text-gray-100">Heading 5</h5>
                  <h6 className="text-sm font-medium text-gray-900 dark:text-gray-100">Heading 6</h6>
                </div>
              </Card>

              {/* Typography - Text Styles */}
              <Card title="Typography - Text Styles">
                <div className="space-y-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">일반 텍스트</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100"><strong>굵은 텍스트</strong></p>
                  <p className="text-sm italic text-gray-700 dark:text-gray-300"><em>기울임 텍스트</em></p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 underline">밑줄 텍스트</p>
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-sm text-gray-900 dark:text-gray-100 font-mono">코드 텍스트</code>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    이것은 <strong>강조된</strong> 텍스트와 <em>기울임</em> 텍스트가 <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded-sm">코드</code>와 함께 있는 예시입니다.
                  </p>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-800 space-y-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      윗첨자: E=mc<sup>2</sup>, H<sub>2</sub>SO<sub>4</sub>, x<sup>3</sup> + y<sup>2</sup>
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      아래첨자: H<sub>2</sub>O, CO<sub>2</sub>, log<sub>10</sub>
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      특수문자: © 2024, ® 등록상표, ™ 상표, € 100, £ 50, ¥ 1000, § 1, ¶ 1, †, ‡
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      이모지: 😀 🎉 ⭐ 🚀 💡 🎨 ✨ 🔥 💯
                    </p>
                  </div>
                </div>
              </Card>

              {/* Validation */}
              <Card title="Validation">
                <div className="space-y-4">
                  {/* 이메일 검증 에러 */}
                  {/* 검증 전 (normal) 예시 */}
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="email-normal" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      이메일 주소 <span className="text-red-500" aria-label="필수 항목">*</span>
                    </Label.Root>
                    <input
                      id="email-normal"
                      type="email"
                      placeholder="email@example.com"
                      className="h-[32px] rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      aria-required="true"
                    />
                  </div>

                  {/* 검증 에러 예시 */}
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="email-validation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      이메일 주소 <span className="text-red-500" aria-label="필수 항목">*</span>
                    </Label.Root>
                    <input
                      id="email-validation"
                      type="email"
                      placeholder="email@example.com"
                      className="h-[32px] rounded-sm border border-red-500 dark:border-red-500 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      defaultValue="invalid-email"
                      aria-invalid="true"
                      aria-required="true"
                      aria-describedby="email-validation-error"
                    />
                    <p id="email-validation-error" className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1" role="alert">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      올바른 이메일 형식이 아닙니다
                    </p>
                  </div>

                  {/* 비밀번호 검증 에러 */}
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="password-validation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      비밀번호 <span className="text-red-500" aria-label="필수 항목">*</span>
                    </Label.Root>
                    <input
                      id="password-validation"
                      type="password"
                      placeholder="••••••••"
                      className="h-[32px] rounded-sm border border-red-500 dark:border-red-500 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      defaultValue="123"
                      aria-invalid="true"
                      aria-required="true"
                      aria-describedby="password-validation-error"
                    />
                    <p id="password-validation-error" className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1" role="alert">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      비밀번호는 최소 8자 이상이어야 합니다
                    </p>
                  </div>

                  {/* 전화번호 검증 에러 */}
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="phone-validation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      전화번호 <span className="text-red-500" aria-label="필수 항목">*</span>
                    </Label.Root>
                    <input
                      id="phone-validation"
                      type="tel"
                      placeholder="010-1234-5678"
                      className="h-[32px] rounded-sm border border-red-500 dark:border-red-500 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      defaultValue="123"
                      aria-invalid="true"
                      aria-required="true"
                      aria-describedby="phone-validation-error"
                    />
                    <p id="phone-validation-error" className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1" role="alert">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)
                    </p>
                  </div>

                  {/* 이름 검증 에러 */}
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="name-validation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      이름 <span className="text-red-500" aria-label="필수 항목">*</span>
                    </Label.Root>
                    <input
                      id="name-validation"
                      type="text"
                      placeholder="홍길동"
                      className="h-[32px] rounded-sm border border-red-500 dark:border-red-500 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      defaultValue=""
                      aria-invalid="true"
                      aria-required="true"
                      aria-describedby="name-validation-error"
                    />
                    <p id="name-validation-error" className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1" role="alert">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      이름을 입력해주세요
                    </p>
                  </div>

                  {/* 성공 상태 예시 */}
                  <div className="flex flex-col gap-2">
                    <Label.Root htmlFor="success-validation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      사용자명
                    </Label.Root>
                    <input
                      id="success-validation"
                      type="text"
                      placeholder="사용자명"
                      className="h-[32px] rounded-sm border border-green-500 dark:border-green-500 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      defaultValue="validuser"
                      aria-describedby="success-validation-message"
                    />
                    <p id="success-validation-message" className="text-xs text-green-500 dark:text-green-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      사용 가능한 사용자명입니다
                    </p>
                  </div>

                  {/* 좌우 배치 - 에러 메시지 */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">좌우 배치 (에러)</h3>
                    <div className="flex items-start gap-2">
                      <Label.Root htmlFor="email-horizontal-validation" className="text-sm font-medium text-gray-700 dark:text-gray-300 shrink-0 pt-2">
                        이메일 <span className="text-red-500" aria-label="필수 항목">*</span>
                      </Label.Root>
                      <div className="flex-1 flex flex-col gap-2">
                        <input
                          id="email-horizontal-validation"
                          type="email"
                          placeholder="email@example.com"
                          className="h-[32px] rounded-sm border border-red-500 dark:border-red-500 bg-white dark:bg-gray-900 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                          defaultValue="wrong-email"
                          aria-invalid="true"
                          aria-required="true"
                          aria-describedby="email-horizontal-validation-error"
                        />
                        <p id="email-horizontal-validation-error" className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1" role="alert">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          올바른 이메일 형식이 아닙니다
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

            </div>
          </main>
        </div>
      </Toast.Provider>
    </div>
  );
}

