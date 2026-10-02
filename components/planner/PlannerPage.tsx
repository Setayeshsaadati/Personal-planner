"use client";

import { useMemo, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

import {
  initialTasks,
} from "../../data/mockData";

import type { Task } from "../../types/planner";

import { PageHeader } from "../common/PageHeader";
import { CalendarHeader } from "./CalendarHeader";
import { WeekSelector } from "./WeekSelector";
import { TaskCard } from "./TaskCard";
import { GlassCard } from "@/app/theme/GlassCard";

export function PlannerPage() {
  const [view, setView] = useState<
    "day" | "week" | "month"
  >("week");

  const [selectedDay, setSelectedDay] =
    useState(1);

  const [tasks, setTasks] =
    useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const groupedTasks = useMemo(() => {
    return {
      morning: tasks.filter(
        (task) =>
          task.time &&
          Number(task.time.split(":")[0]) < 12
      ),

      afternoon: tasks.filter(
        (task) =>
          task.time &&
          Number(task.time.split(":")[0]) >= 12 &&
          Number(task.time.split(":")[0]) < 18
      ),

      evening: tasks.filter(
        (task) =>
          task.time &&
          Number(task.time.split(":")[0]) >= 18
      ),
    };
  }, [tasks]);

  return (
    <Box>
      <CalendarHeader
        view={view}
        onViewChange={setView}
      />

      <PageHeader
        title="Your week"
        description="Organize your time with intention. You can keep things structured without making your day feel crowded."
        action={
          <Button
            variant="contained"
            startIcon={
              <Icon
                icon="solar:add-circle-linear"
                width={19}
              />
            }
            sx={{
              background:
                "linear-gradient(135deg, #B99AE8, #D5B7EE)",
              color: "#fff",

              borderRadius: "16px",

              px: 2,

              "&:hover": {
                background:
                  "linear-gradient(135deg, #A98BD8, #C9A9E5)",
              },
            }}
          >
            Add task
          </Button>
        }
      />

      <WeekSelector
        selectedDay={selectedDay}
        onSelect={setSelectedDay}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.45fr 0.75fr",
          gap: 2,
          alignItems: "start",
        }}
      >
        <GlassCard sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "text.primary",
                }}
              >
                Thursday, October 1
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
                  mt: 0.5,
                }}
              >
                {tasks.filter(
                  (task) => task.completed
                ).length}{" "}
                completed · {tasks.length} total
              </Typography>
            </Box>

            <Box
              sx={{
                px: 1.3,
                py: 0.7,
                borderRadius: "999px",
                background: "rgba(185,154,232,0.13)",
                color: "primary.dark",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              Today
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            {[
              {
                label: "Morning",
                icon: "solar:sunrise-linear",
                tasks: groupedTasks.morning,
              },
              {
                label: "Afternoon",
                icon: "solar:sun-linear",
                tasks: groupedTasks.afternoon,
              },
              {
                label: "Evening",
                icon: "solar:moon-linear",
                tasks: groupedTasks.evening,
              },
            ].map((section) => (
              <Box key={section.label}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.2,
                  }}
                >
                  <Icon
                    icon={section.icon}
                    width={17}
                    color="#9C7AC9"
                  />

                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 750,
                      color: "text.secondary",
                      textTransform: "uppercase",
                      letterSpacing: 0.6,
                    }}
                  >
                    {section.label}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {section.tasks.length > 0 ? (
                    section.tasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onToggle={toggleTask}
                      />
                    ))
                  ) : (
                    <Box
                      sx={{
                        py: 2,
                        px: 1.5,
                        color: "text.secondary",
                        fontSize: 11,
                      }}
                    >
                      Nothing planned here yet.
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </GlassCard>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <GlassCard sx={{ p: 3 }}>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 800,
                color: "text.primary",
                mb: 2.5,
              }}
            >
              Day overview
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {[
                [
                  "Total tasks",
                  tasks.length,
                  "solar:checklist-minimalistic-linear",
                ],
                [
                  "Completed",
                  tasks.filter(
                    (task) => task.completed
                  ).length,
                  "solar:check-circle-linear",
                ],
                [
                  "Remaining",
                  tasks.filter(
                    (task) => !task.completed
                  ).length,
                  "solar:clock-circle-linear",
                ],
              ].map(([label, value, icon]) => (
                <Box
                  key={String(label)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",

                    p: 1.2,

                    borderRadius: "15px",
                    background:
                      "rgba(255,255,255,0.38)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Icon
                      icon={String(icon)}
                      width={17}
                      color="#9C7AC9"
                    />

                    <Typography
                      sx={{
                        fontSize: 11.5,
                        color: "text.secondary",
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: "text.primary",
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </GlassCard>

          <GlassCard
            sx={{
              p: 3,
              background:
                "linear-gradient(145deg, rgba(169,215,199,0.18), rgba(255,255,255,0.50))",
            }}
          >
            <Icon
              icon="solar:magic-stick-3-linear"
              width={23}
              color="#75A991"
            />

            <Typography
              sx={{
                mt: 1.5,
                fontSize: 17,
                fontWeight: 800,
                lineHeight: 1.45,
                color: "text.primary",
              }}
            >
              Leave some room for life.
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: 11.5,
                lineHeight: 1.7,
                color: "text.secondary",
              }}
            >
              A good plan gives you direction,
              not pressure.
            </Typography>
          </GlassCard>
        </Box>
      </Box>
    </Box>
  );
}
