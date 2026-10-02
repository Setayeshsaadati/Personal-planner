"use client";

import { useMemo } from "react";
import { Box, Typography } from "@mui/material";

import { usePlanner } from "../../app/context/PlannerContext";

import { PageHeader } from "../common/PageHeader";
import { DailyProgress } from "./DailyProgress";
import { GoalsPreview } from "./GoalsPreview";
import { OverviewCard } from "./OverviewCard";
import { TodayTasks } from "./TodayTasks";

export function HomePage() {
  const {
    tasks,
    goals,
    addTask,
    toggleTask,
  } = usePlanner();

  const completedTasks = useMemo(
    () =>
      tasks.filter(
        (task) => task.completed
      ).length,
    [tasks]
  );

  const totalTasks = tasks.length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  const remainingTasks =
    totalTasks - completedTasks;

  return (
    <Box>
      <PageHeader
        eyebrow="YOUR SPACE"
        title="Good morning ✦"
        description="A calm little space to organize your day, keep moving toward your goals, and make room for what matters."
      />

      {/* Overview */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: 2,
          mb: 2,
        }}
      >
        <OverviewCard
          title="Today's progress"
          value={`${completionRate}%`}
          subtitle={`${completedTasks} of ${totalTasks} tasks completed`}
          icon="solar:chart-square-linear"
          tone="lavender"
        />

        <OverviewCard
          title="Tasks remaining"
          value={String(remainingTasks)}
          subtitle="Things still on your list"
          icon="solar:checklist-minimalistic-linear"
          tone="pink"
        />

        <OverviewCard
          title="Active goals"
          value={String(goals.length)}
          subtitle="Goals you're currently working on"
          icon="solar:target-linear"
          tone="sage"
        />

        <OverviewCard
          title="Today's mood"
          value="Good"
          subtitle="Keep your pace gentle"
          icon="solar:sun-2-linear"
          tone="blue"
        />
      </Box>

      {/* Main content */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "1.35fr 0.85fr",
          gap: 2,
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <DailyProgress
            completed={completedTasks}
            total={totalTasks}
          />

          <TodayTasks
            tasks={tasks}
            onToggle={toggleTask}
            onAdd={addTask}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <GoalsPreview goals={goals} />

          <Box
            sx={{
              flex: 1,
              p: 3,

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",

              borderRadius: "24px",

              background:
                "linear-gradient(145deg, rgba(239,182,201,0.17), rgba(169,215,199,0.13), rgba(255,255,255,0.50))",

              backdropFilter: "blur(24px)",
              WebkitBackdropFilter:
                "blur(24px)",

              border:
                "1px solid rgba(255,255,255,0.78)",
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 750,
                color: "#A37A8E",
                letterSpacing: 0.7,
                mb: 1,
              }}
            >
              A LITTLE REMINDER
            </Typography>

            <Typography
              sx={{
                fontSize: 20,
                lineHeight: 1.45,
                fontWeight: 750,
                color: "#514956",
                letterSpacing: "-0.02em",
              }}
            >
              You dont have to do everything
              today. Just keep moving.
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                fontSize: 12,
                color: "text.secondary",
                lineHeight: 1.7,
              }}
            >
              Small consistent steps are still
              progress.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;