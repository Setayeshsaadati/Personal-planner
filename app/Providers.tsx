"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";

import { plannerTheme } from "./theme/plannerTheme";
import { PlannerProvider } from "./context/PlannerContext";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({
  children,
}: ProvidersProps) {
  return (
    <ThemeProvider theme={plannerTheme}>
      <PlannerProvider>
        {children}
      </PlannerProvider>
    </ThemeProvider>
  );
}