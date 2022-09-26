import React from "react";

interface MainProps {
  children: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <main className="flex flex-col lg:px-40 md:px-20 sm:px-10 px-4 md:py-20 sm:py-10 py-4">
      {children}
    </main>
  );
}
