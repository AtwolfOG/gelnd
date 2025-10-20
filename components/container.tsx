import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="bg-(--bg-light) p-3 border-1 border-(--bg-dark)">
      {children}
    </div>
  );
}
