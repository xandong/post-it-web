import React from "react";

interface MainProps {
  children: React.ReactNode;
  title?: string;
}

export function Main({ children, title }: MainProps) {
  return (
    <main className="flex flex-col lg:px-40 md:px-20 sm:px-10 px-4 md:py-20 sm:py-10 py-4">
      <h1 className="pb-10 text-center md:text-6xl text-4xl font-extrabold text-cor-pink dark:text-cor-purple">
        {title}
      </h1>
      {children}
    </main>
  );
}
