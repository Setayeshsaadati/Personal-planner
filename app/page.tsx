"use client";

import { useState } from "react";
import { Box } from "@mui/material";

import { PlannerPage } from "@/components/planner/PlannerPage";
import { GoalsPage } from "@/components/goals/GoalsPage";
import { HabitsPage } from "@/components/habits/HabitsPage";
import { InsightsPage } from "@/components/insights/InsightsPage";
import { NotesPage } from "@/components/notes/NotesPage";
import { SettingsPage } from "@/components/settings/SettingsPage";
import { HomePage } from "@/components/home/HomePage";
import { Sidebar } from "@/components/layout/Sidebar";

import type { Page } from "@/types/planner";

export default function Page() {
  const [activePage, setActivePage] =
    useState<Page>("home");

  const renderPage = () => {
    switch (activePage) {
      case "planner":
        return <PlannerPage />;

      case "goals":
        return <GoalsPage />;

      case "habits":
        return <HabitsPage />;

      case "insights":
        return <InsightsPage />;

      case "notes":
        return <NotesPage />;

      case "settings":
        return <SettingsPage />;

      default:
        return <HomePage />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "#FBF9FC",
      }}
    >
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          ml: "270px",
          px: 5,
          py: 5,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1440,
            mx: "auto",
          }}
        >
          {renderPage()}
        </Box>
      </Box>
    </Box>
  );
}