import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="bg-(--bg) p-3 border-1 border-(--border-light) grow rounded-2xl">
      {children}
    </div>
  );
}
