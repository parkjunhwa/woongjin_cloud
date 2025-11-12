import * as React from "react";
import { Card } from "../common/Card";
import * as Popover from "@radix-ui/react-popover";
import * as Label from "@radix-ui/react-label";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface DatePickerSectionProps {
  selectedDate: Date | undefined;
  tempSelectedDate: Date | undefined;
  datePickerOpen: boolean;
  setDatePickerOpen: (open: boolean) => void;
  setTempSelectedDate: (date: Date | undefined) => void;
  handleDateSelect: (date: Date | undefined) => void;
  handleDateConfirm: () => void;
  handleDateCancel: () => void;
}

export const DatePickerSection = React.memo(function DatePickerSection({
  selectedDate,
  tempSelectedDate,
  datePickerOpen,
  setDatePickerOpen,
  setTempSelectedDate,
  handleDateSelect,
  handleDateConfirm,
  handleDateCancel,
}: DatePickerSectionProps) {
  return (
    <Card title="Date Picker">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label.Root htmlFor="datepicker" className="text-xs text-gray-500 dark:text-gray-400">
            날짜 선택
          </Label.Root>
          <Popover.Root
            open={datePickerOpen}
            onOpenChange={(open) => {
              setDatePickerOpen(open);
              if (open) {
                setTempSelectedDate(selectedDate);
              }
            }}
          >
            <Popover.Trigger asChild>
              <button
                id="datepicker"
                className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className={selectedDate ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"}>
                  {selectedDate ? format(selectedDate, "yyyy년 MM월 dd일", { locale: ko }) : "날짜를 선택하세요"}
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
                  mode="single"
                  selected={tempSelectedDate}
                  onSelect={handleDateSelect}
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
                    day_range_middle: "text-sm aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 aria-selected:text-gray-900 dark:aria-selected:text-gray-100",
                    day_hidden: "invisible",
                  }}
                />
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={handleDateCancel}
                    className="h-[32px] px-4 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleDateConfirm}
                    className="h-[32px] px-4 rounded-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-sm font-medium text-white transition-colors"
                  >
                    확인
                  </button>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
        <div className="flex flex-col gap-2">
          <Label.Root className="text-xs text-gray-500 dark:text-gray-400">
            Readonly
          </Label.Root>
          <button
            disabled
            className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 text-sm text-left text-gray-900 dark:text-gray-100 flex items-center justify-between cursor-not-allowed"
          >
            <span>2026년 01월 15일</span>
            <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <Label.Root className="text-xs text-gray-500 dark:text-gray-400">
            Disabled
          </Label.Root>
          <button
            disabled
            className="h-[32px] w-full rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 text-sm text-left text-gray-400 dark:text-gray-500 flex items-center justify-between cursor-not-allowed"
          >
            <span>날짜를 선택하세요</span>
            <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
});

