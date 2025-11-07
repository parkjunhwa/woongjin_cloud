"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "../components/common/Card";
import { Header } from "../components/common/Header";
import { Sidebar } from "../components/common/Sidebar";
import { useSidebar } from "../components/common/SidebarProvider";
import { AccordionSection } from "../components/ui-sections/AccordionSection";
import { AlertDialogSection } from "../components/ui-sections/AlertDialogSection";
import { DatePickerSection } from "../components/ui-sections/DatePickerSection";

/**
 * 퍼블리싱 샘플 페이지
 * 
 * 이 페이지는 퍼블리싱된 화면들을 모아서 관리하는 샘플 페이지입니다.
 * 실제 퍼블리싱 작업 시 이 페이지를 참고하여 새로운 페이지를 추가할 수 있습니다.
 */
export default function PublishedPage() {
  const { isCollapsed } = useSidebar();
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [tempSelectedDate, setTempSelectedDate] = React.useState<Date | undefined>(undefined);
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    setTempSelectedDate(date);
  };

  const handleDateConfirm = () => {
    setSelectedDate(tempSelectedDate);
    setDatePickerOpen(false);
  };

  const handleDateCancel = () => {
    setTempSelectedDate(selectedDate);
    setDatePickerOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <div className={`transition-all duration-300 ${isCollapsed ? "md:ml-16" : "md:ml-64"}`}>
        <Header />
        
        <main className="w-full px-6 py-4">
        {/* Breadcrumb */}
        <nav className="mb-3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                대시보드
              </Link>
            </li>
            <li className="text-gray-400 dark:text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <span className="text-gray-900 dark:text-gray-100 font-medium">퍼블리싱</span>
            </li>
          </ol>
        </nav>

        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            퍼블리싱 샘플 페이지
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            퍼블리싱된 화면들을 모아서 관리하는 샘플 페이지입니다.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Accordion 샘플 */}
          <AccordionSection />

          {/* Alert Dialog 샘플 */}
          <AlertDialogSection
            openAlertDialog={openAlertDialog}
            setOpenAlertDialog={setOpenAlertDialog}
          />

          {/* Date Picker 샘플 */}
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

          {/* 추가 샘플 카드 1 */}
          <Card title="샘플 카드 1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              이것은 샘플 카드입니다. 실제 퍼블리싱 작업 시 이 카드를 참고하여 새로운 카드를 추가할 수 있습니다.
            </p>
          </Card>

          {/* 추가 샘플 카드 2 */}
          <Card title="샘플 카드 2">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                다양한 콘텐츠를 표시할 수 있습니다.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>항목 1</li>
                <li>항목 2</li>
                <li>항목 3</li>
              </ul>
            </div>
          </Card>

          {/* 추가 샘플 카드 3 */}
          <Card title="샘플 카드 3">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">제목</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">설명</p>
              </div>
            </div>
          </Card>
        </div>
        </main>
      </div>
    </div>
  );
}

