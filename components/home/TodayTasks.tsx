"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";

import type { Task } from "../../types/planner";

import { SectionHeading } from "../common/SectionHeading";
import { TodayTaskItem } from "./TodayTaskItem";
import { AddTaskDialog } from "./AddTaskDialog";
import { GlassCard } from "@/app/theme/GlassCard";

type TodayTasksProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onAdd: (task: Task) => void;
};

export function TodayTasks({
  tasks,
  onToggle,
  onAdd,
}: TodayTasksProps) {
  const [dialogOpen, setDialogOpen] =
    useState(false);

  return (
    <>
      <GlassCard
        sx={{
          p: 3,
        }}
      >
        <SectionHeading
          title="Today's tasks"
          action={
            <Button
              size="small"
              onClick={() =>
                setDialogOpen(true)
              }
              startIcon={
                <Icon
                  icon="solar:add-circle-linear"
                  width={17}
                />
              }
              sx={{
                color: "primary.dark",
                minWidth: 0,
                px: 1.2,
                borderRadius: "13px",

                "&:hover": {
                  background:
                    "rgba(185,154,232,0.10)",
                },
              }}
            >
              Add
            </Button>
          }
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TodayTaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
              />
            ))
          ) : (
            <Box
              sx={{
                py: 5,
                textAlign: "center",
              }}
            >
              <Icon
                icon="solar:check-circle-linear"
                width={34}
                color="#B99AE8"
              />

              <Typography
                sx={{
                  mt: 1,
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                Everything is done for today ✦
              </Typography>
            </Box>
          )}
        </Box>
      </GlassCard>

      <AddTaskDialog
        open={dialogOpen}
        onClose={() =>
          setDialogOpen(false)
        }
        onAdd={onAdd}
      />
    </>
  );
}