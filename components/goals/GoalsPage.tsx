"use client";

import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { Box, Button, Typography } from "@mui/material";

import {
  initialGoals,
} from "../../data/mockData";

import type { Goal } from "../../types/planner";

import { PageHeader } from "../common/PageHeader";
import { OverviewCard } from "../home/OverviewCard";
import { GoalCard } from "./GoalCard";
import { AddGoalDialog } from "./AddGoalDialog";

export function GoalsPage() {
  const [goals, setGoals] =
    useState<Goal[]>(initialGoals);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const averageProgress = useMemo(() => {
    if (goals.length === 0) return 0;

    const total = goals.reduce(
      (sum, goal) => {
        if (goal.target === 0) return sum;

        return (
          sum +
          Math.min(
            100,
            (goal.current / goal.target) * 100
          )
        );
      },
      0
    );

    return Math.round(total / goals.length);
  }, [goals]);

  const completedGoals = goals.filter(
    (goal) =>
      goal.target > 0 &&
      goal.current >= goal.target
  ).length;

  const addGoal = (goal: Goal) => {
    setGoals((current) => [
      ...current,
      goal,
    ]);
  };

  const deleteGoal = (id: string) => {
    setGoals((current) =>
      current.filter((goal) => goal.id !== id)
    );
  };

  return (
    <Box>
      <PageHeader
        eyebrow="PROGRESS"
        title="Your goals"
        description="Turn the things you care about into clear, manageable goals. Progress can be slow and still be meaningful."
        action={
          <Button
            variant="contained"
            onClick={() => setDialogOpen(true)}
            startIcon={
              <Icon
                icon="solar:add-circle-linear"
                width={19}
              />
            }
            sx={{
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, #B99AE8, #D4B3EC)",
              px: 2,

              "&:hover": {
                background:
                  "linear-gradient(135deg, #A98BD8, #C8A7E2)",
              },
            }}
          >
            New goal
          </Button>
        }
      />

      {/* Overview */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: 2,
          mb: 3,
        }}
      >
        <OverviewCard
          title="Active goals"
          value={String(goals.length)}
          subtitle="Goals currently in progress"
          icon="solar:target-linear"
          tone="lavender"
        />

        <OverviewCard
          title="Average progress"
          value={`${averageProgress}%`}
          subtitle="Across all active goals"
          icon="solar:chart-square-linear"
          tone="sage"
        />

        <OverviewCard
          title="Completed"
          value={String(completedGoals)}
          subtitle="Goals that reached their target"
          icon="solar:check-circle-linear"
          tone="pink"
        />
      </Box>

      {/* Goal list */}
      {goals.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: 2,
          }}
        >
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onDelete={deleteGoal}
            />
          ))}

          <Box
            component="button"
            onClick={() => setDialogOpen(true)}
            sx={{
              minHeight: 235,

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              gap: 1,

              border:
                "1px dashed rgba(185,154,232,0.40)",
              borderRadius: "24px",

              background:
                "rgba(255,255,255,0.28)",

              color: "primary.dark",

              cursor: "pointer",

              transition:
                "background 180ms ease, border-color 180ms ease",

              "&:hover": {
                background:
                  "rgba(255,255,255,0.48)",
                borderColor:
                  "rgba(185,154,232,0.62)",
              },
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: "14px",
                background:
                  "rgba(185,154,232,0.13)",
              }}
            >
              <Icon
                icon="solar:add-circle-linear"
                width={22}
              />
            </Box>

            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Create another goal
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            minHeight: 360,

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            borderRadius: "28px",

            background:
              "rgba(255,255,255,0.42)",

            border:
              "1px dashed rgba(185,154,232,0.38)",
          }}
        >
          <Icon
            icon="solar:target-linear"
            width={40}
            color="#B99AE8"
          />

          <Typography
            sx={{
              mt: 1.5,
              fontSize: 17,
              fontWeight: 800,
            }}
          >
            Nothing here yet
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 12,
              color: "text.secondary",
            }}
          >
            Create your first goal and start
            moving forward.
          </Typography>
        </Box>
      )}

      <AddGoalDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={addGoal}
      />
    </Box>
  );
}