

import { ReactNode, MouseEventHandler } from "react";

export const Button = ({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: MouseEventHandler<HTMLButtonElement> }) => (
  <button
    className={`px-4 py-2 rounded-md text-white font-semibold ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);
