import { ReactNode } from "react";

export const Accent = ({ children }: { children: ReactNode }) => (
  <p className="text-sm text-[oklch(0.7_0.2_68)]! inline">{children}</p>
);
