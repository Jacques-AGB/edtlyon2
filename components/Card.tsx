import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-lg shadow-md p-4 m-4 sm:p-2 sm:m-2 bg-white dark:bg-gray-800 ${className}`}>
      {children}
    </div>
  );
}

