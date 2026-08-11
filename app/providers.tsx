"use client";

import { FluentProvider, SSRProvider, webLightTheme } from "@fluentui/react-components";
import type { ReactNode } from "react";

const gnxTheme = {
  ...webLightTheme,
  colorBrandBackground: "#3159c7",
  colorBrandBackgroundHover: "#274aab",
  colorBrandBackgroundPressed: "#203e91",
  colorBrandForeground1: "#3159c7",
  colorBrandForeground2: "#274aab",
  colorBrandStroke1: "#3159c7",
  fontFamilyBase:
    '"Segoe UI Variable", "Segoe UI", ui-sans-serif, system-ui, sans-serif',
  borderRadiusMedium: "10px",
  borderRadiusLarge: "14px",
  borderRadiusXLarge: "18px",
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SSRProvider>
      <FluentProvider theme={gnxTheme}>{children}</FluentProvider>
    </SSRProvider>
  );
}
