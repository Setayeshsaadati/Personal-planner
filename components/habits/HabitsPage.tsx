"use client";

import { useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

import { usePlanner } from "../../app/context/PlannerContext";
import { PageHeader } from "../common/PageHeader";
import { OverviewCard } from "../home/OverviewCard";
import { HabitRow } from "./HabitRow";
import { GlassCard } from "@/app/theme/GlassCard";

export function HabitsPage() {
  const {
    habits,
    addHabit,
    toggleHabitDay,
  } = usePlanner();

  const totalCompleted = habits.reduce(
    (total, habit) =>
      total + habit.completed.filter(Boolean).length,
    0
  );

  const totalPossible = habits.length * 7;

  const weeklyConsistency =
    totalPossible === 0
      ? 0
      : Math.round(
          (totalCompleted / totalPossible) * 100
        );

  const completedToday = habits.filter(
    (habit) => habit.completed[6]
  ).length;

  const currentStreak = useMemo(() => {
    if (!habits.length) {
      return 0;
    }

    let streak = 0;

    for (let day = 6; day >= 0; day--) {
      const allCompleted = habits.every(
        (habit) => habit.completed[day]
      );

      if (!allCompleted) {
        break;
      }

      streak += 1;
    }

    return streak;
  }, [habits]);

  const handleAddHabit = () => {
    addHabit({
      id: `habit-${Date.now()}`,
      title: "New habit",
      icon: "solar:star-linear",
      completed: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    });
  };

  return (
    <Box>
      <PageHeader
        eyebrow="YOUR ROUTINES"
        title="Habits"
        description="Small actions become meaningful when you give them consistency."
        action={
          <Button
            variant="contained"
            onClick={handleAddHabit}
            startIcon={
              <Icon
                icon="solar:add-circle-linear"
                width={19}
              />
            }
            sx={{
              background:
                "linear-gradient(135deg, #B99AE8, #CDAFEA)",
              color: "#FFFFFF",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #A98ADB, #C09FE2)",
              },
            }}
          >
            Add habit
          </Button>
        }
      />

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
          icon="solar:fire-linear"
          label="Current streak"
          value={`${currentStreak} days`}
          subtitle="Keep showing up"
          tone="pink"
        />

        <OverviewCard
          icon="solar:chart-2-linear"
          label="Weekly consistency"
          value={`${weeklyConsistency}%`}
          subtitle="Across your habits"
          tone="lavender"
        />

        <OverviewCard
          icon="solar:check-circle-linear"
          label="Completed today"
          value={`${completedToday}/${habits.length}`}
          subtitle="Habits checked"
          tone="sage"
        />
      </Box>

      <GlassCard
        sx={{
          p: 2.5,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 2.5,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#4B4350",
                fontSize: 17,
                fontWeight: 750,
              }}
            >
              Weekly tracker
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 12.5,
                mt: 0.5,
              }}
            >
              Check off each day as you complete your habits.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              px: 1.5,
              py: 0.8,
              borderRadius: "999px",
              background: "rgba(216,197,242,0.24)",
            }}
          >
            <Icon
              icon="solar:calendar-linear"
              width={16}
              color="#9877CE"
            />

            <Typography
              sx={{
                color: "#8068A6",
                fontSize: 11.5,
                fontWeight: 700,
              }}
            >
              This week
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: 1.1,
          }}
        >
          {habits.map((habit) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              onToggle={toggleHabitDay}
            />
          ))}
        </Box>
      </GlassCard>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.35fr 0.65fr",
          gap: 2,
        }}
      >
        <GlassCard
          sx={{
            p: 3,
            background:
              "linear-gradient(145deg, rgba(239,182,201,0.24), rgba(255,255,255,0.52))",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.8,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
                borderRadius: "15px",
                background: "rgba(239,182,201,0.32)",
                color: "#C18199",
              }}
            >
              <Icon
                icon="solar:heart-linear"
                width={22}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  color: "#4B4350",
                  fontSize: 16,
                  fontWeight: 750,
                }}
              >
                Small steps matter
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 13,
                  lineHeight: 1.75,
                  mt: 0.7,
                  maxWidth: 620,
                }}
              >
                You don't need a perfect week. A few small
                actions repeated consistently can create a
                routine that actually lasts.
              </Typography>
            </Box>
          </Box>
        </GlassCard>

        <GlassCard
          sx={{
            p: 3,
            background:
              "linear-gradient(145deg, rgba(169,215,199,0.22), rgba(255,255,255,0.52))",
          }}
        >
          <Typography
            sx={{
              color: "#4B4350",
              fontSize: 15,
              fontWeight: 750,
              mb: 1,
            }}
          >
            This week's progress
          </Typography>

          <Typography
            sx={{
              color: "#393542",
              fontSize: 31,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            {totalCompleted}
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 12.5,
              mt: 0.4,
            }}
          >
            completed habit days
          </Typography>
        </GlassCard>
      </Box>
    </Box>
  );
}