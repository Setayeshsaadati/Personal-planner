"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

import type { Habit } from "../../types/planner";

type HabitRowProps = {
  habit: Habit;
  onToggle: (habitId: string, dayIndex: number) => void;
};

const days = ["M", "T", "W", "T", "F", "S", "S"];

export function HabitRow({ habit, onToggle }: HabitRowProps) {
  const completedCount = habit.completed.filter(Boolean).length;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "minmax(240px, 1fr) repeat(7, 46px) 80px",
        alignItems: "center",
        gap: 1.5,
        minHeight: 82,
        px: 2.5,
        borderRadius: "20px",
        background: "rgba(255,255,255,0.38)",
        border: "1px solid rgba(255,255,255,0.68)",
        transition:
          "background-color 180ms ease, border-color 180ms ease",
        "&:hover": {
          background: "rgba(255,255,255,0.58)",
          borderColor: "rgba(255,255,255,0.9)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            borderRadius: "14px",
            background: "rgba(216,197,242,0.42)",
            color: "#9877CE",
          }}
        >
          <Icon icon={habit.icon} width={21} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "#403947",
              fontSize: 14,
              fontWeight: 750,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {habit.title}
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 12,
              mt: 0.35,
            }}
          >
            {completedCount} of 7 days
          </Typography>
        </Box>
      </Box>

      {habit.completed.map((completed, index) => (
        <Box
          key={`${habit.id}-${index}`}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.45,
          }}
        >
          <Typography
            sx={{
              color: "#918995",
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            {days[index]}
          </Typography>

          <IconButton
            onClick={() => onToggle(habit.id, index)}
            sx={{
              width: 34,
              height: 34,
              p: 0,
              background: completed
                ? "linear-gradient(145deg, #B99AE8, #C9AFE9)"
                : "rgba(255,255,255,0.72)",
              border: completed
                ? "1px solid rgba(185,154,232,0.32)"
                : "1px solid rgba(120,104,132,0.10)",
              color: completed ? "#FFFFFF" : "#B0A9B4",
              "&:hover": {
                background: completed
                  ? "linear-gradient(145deg, #A98ADB, #BFA2E5)"
                  : "rgba(255,255,255,0.95)",
              },
            }}
          >
            {completed && (
              <Icon
                icon="solar:check-read-linear"
                width={17}
              />
            )}
          </IconButton>
        </Box>
      ))}

      <Box
        sx={{
          justifySelf: "end",
          minWidth: 62,
          px: 1.1,
          py: 0.65,
          borderRadius: "999px",
          textAlign: "center",
          background:
            completedCount >= 5
              ? "rgba(169,215,199,0.35)"
              : "rgba(216,197,242,0.28)",
        }}
      >
        <Typography
          sx={{
            color:
              completedCount >= 5
                ? "#639B84"
                : "#8C70B7",
            fontSize: 11,
            fontWeight: 750,
          }}
        >
          {Math.round((completedCount / 7) * 100)}%
        </Typography>
      </Box>
    </Box>
  );
}