import * as React from "react";
import { Card } from "../common/Card";
import * as Accordion from "@radix-ui/react-accordion";

const AccordionSectionComponent = function AccordionSectionComponent() {
  const [accordionValue, setAccordionValue] = React.useState<string>("");

  const handleValueChange = React.useCallback((value: string) => {
    setAccordionValue(value);
  }, []);

  return (
    <Card title="Accordion">
      <Accordion.Root
        type="single"
        collapsible
        value={accordionValue}
        onValueChange={handleValueChange}
        className="w-full"
      >
        <Accordion.Item value="item-1" className="border-b border-gray-200 dark:border-gray-800">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left font-medium text-gray-900 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group">
              <span className="text-gray-900 dark:text-gray-100">Radix UI란 무엇인가요?</span>
              <span className="text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-sm text-gray-700 dark:text-gray-400 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
            <div className="pb-4">
              Radix UI는 접근성이 뛰어난 React 컴포넌트 라이브러리입니다. WAI-ARIA 표준을 준수하며 완전히 커스터마이징 가능합니다.
            </div>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2" className="border-b border-gray-200 dark:border-gray-800">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left font-medium text-gray-900 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group">
              <span className="text-gray-900 dark:text-gray-100">왜 Radix UI를 사용하나요?</span>
              <span className="text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-sm text-gray-600 dark:text-gray-400">
            <div className="pb-4">
              접근성, 커스터마이징, 그리고 풍부한 컴포넌트를 제공합니다. TypeScript로 작성되어 타입 안정성을 보장합니다.
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </Card>
  );
};

// props가 없으므로 항상 메모이제이션된 컴포넌트 반환
export const AccordionSection = React.memo(AccordionSectionComponent, () => true);

