import * as React from "react";
import { Card } from "../common/Card";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface AlertDialogSectionProps {
  openAlertDialog: boolean;
  setOpenAlertDialog: (open: boolean) => void;
}

export const AlertDialogSection = React.memo(function AlertDialogSection({
  openAlertDialog,
  setOpenAlertDialog,
}: AlertDialogSectionProps) {
  return (
    <Card title="Alert Dialog">
      <AlertDialog.Root open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialog.Trigger asChild>
          <button className="w-full h-[32px] rounded-sm bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 px-4 text-sm font-medium text-white transition-colors shadow-sm shadow-red-500/20 dark:shadow-red-600/20">
            삭제하기
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70 animate-fadeIn z-50" />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white dark:bg-gray-900 p-6 shadow-xl w-full max-w-md z-50 border border-gray-200 dark:border-gray-800 ring-1 ring-gray-200 dark:ring-gray-800">
            <AlertDialog.Title className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              정말 삭제하시겠습니까?
            </AlertDialog.Title>
            <AlertDialog.Description className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              이 작업은 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?
            </AlertDialog.Description>
            <div className="flex gap-3 justify-end">
              <AlertDialog.Cancel asChild>
                <button className="h-[32px] rounded-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors">
                  취소
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button className="h-[32px] rounded-sm bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 px-4 text-sm font-medium text-white transition-colors">
                  삭제
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </Card>
  );
});

