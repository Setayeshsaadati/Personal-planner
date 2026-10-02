import { Icon } from "@iconify/react";
import { Box, Typography } from "@mui/material";

import type { Task } from "../../types/planner";

type TaskCardProps = {
  task: Task;
  onToggle: (id: string) => void;
};

const priorityMap = {
  low: {
    color: "#78A894",
    background: "rgba(169,215,199,0.18)",
    label: "Low",
  },
  medium: {
    color: "#B08B45",
    background: "rgba(241,213,154,0.20)",
    label: "Medium",
  },
  high: {
    color: "#C57F99",
    background: "rgba(239,182,201,0.20)",
    label: "High",
  },
};

export function TaskCard({
  task,
  onToggle,
}: TaskCardProps) {
  const priority = priorityMap[task.priority];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,

        p: 1.5,

        borderRadius: "18px",

        background:
          "linear-gradient(145deg, rgba(255,255,255,0.66), rgba(255,255,255,0.40))",

        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",

        border:
          "1px solid rgba(255,255,255,0.75)",

        transition:
          "background 180ms ease, border-color 180ms ease",

        "&:hover": {
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.80), rgba(255,255,255,0.54))",

          borderColor:
            "rgba(255,255,255,0.95)",
        },
      }}
    >
      <Box
        component="button"
        onClick={() => onToggle(task.id)}
        sx={{
          width: 30,
          height: 30,
          flexShrink: 0,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "10px",

          border: "1px solid",
          borderColor: task.completed
            ? "primary.main"
            : "rgba(120,104,132,0.16)",

          background: task.completed
            ? "rgba(185,154,232,0.18)"
            : "rgba(255,255,255,0.45)",

          color: "primary.dark",

          cursor: "pointer",
        }}
      >
        {task.completed && (
          <Icon
            icon="solar:check-read-linear"
            width={17}
          />
        )}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: task.completed
              ? "text.secondary"
              : "text.primary",

            textDecoration: task.completed
              ? "line-through"
              : "none",
          }}
        >
          {task.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.7,
            mt: 0.5,
          }}
        >
          <Icon
            icon="solar:clock-circle-linear"
            width={12}
            color="#9B93A2"
          />

          <Typography
            sx={{
              fontSize: 10.5,
              color: "text.secondary",
            }}
          >
            {task.time ?? "Anytime"}
          </Typography>

          <Typography
            sx={{
              fontSize: 10,
              color: "text.secondary",
            }}
          >
            ·
          </Typography>

          <Typography
            sx={{
              fontSize: 10.5,
              color: "text.secondary",
            }}
          >
            {task.category}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          px: 1,
          py: 0.55,

          borderRadius: "999px",

          background: priority.background,
          color: priority.color,

          fontSize: 9.5,
          fontWeight: 750,
        }}
      >
        {priority.label}
      </Box>

      <Icon
        icon="solar:menu-dots-linear"
        width={18}
        color="#A29AA9"
      />
    </Box>
  );
}
