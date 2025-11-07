import * as React from "react";

export const Card = React.memo(function Card({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode 
}) {
  return (
    <div className="break-inside-avoid rounded-sm border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-100 dark:ring-gray-800">
      {title && <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>}
      {children}
    </div>
  );
});

