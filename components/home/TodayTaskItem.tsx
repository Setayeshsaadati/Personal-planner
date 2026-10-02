import { Icon } from "@iconify/react";
import { Box, Typography } from "@mui/material";

import type { Task } from "../../types/planner";

type TodayTaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
};

const priorityColors = {
  low: "#A9D7C7",
  medium: "#F1D59A",
  high: "#EFB6C9",
};

export function TodayTaskItem({
  task,
  onToggle,
}: TodayTaskItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,

        px: 1.5,
        py: 1.25,

        borderRadius: "18px",

        background: task.completed
          ? "rgba(255,255,255,0.34)"
          : "rgba(255,255,255,0.42)",

        border: "1px solid rgba(255,255,255,0.58)",

        transition:
          "background 180ms ease, border-color 180ms ease",

        "&:hover": {
          background: "rgba(255,255,255,0.62)",
          borderColor: "rgba(255,255,255,0.82)",
        },
      }}
    >
      <Box
        component="button"
        onClick={() => onToggle(task.id)}
        aria-label={
          task.completed
            ? "Mark task as incomplete"
            : "Mark task as complete"
        }
        sx={{
          width: 27,
          height: 27,
          flexShrink: 0,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          border: "1px solid",
          borderColor: task.completed
            ? "primary.main"
            : "rgba(120,104,132,0.18)",

          borderRadius: "10px",

          background: task.completed
            ? "rgba(185,154,232,0.18)"
            : "rgba(255,255,255,0.42)",

          color: "primary.dark",

          cursor: "pointer",

          transition:
            "background 180ms ease, border-color 180ms ease",

          "&:hover": {
            borderColor: "primary.main",
          },
        }}
      >
        {task.completed && (
          <Icon
            icon="solar:check-read-linear"
            width={16}
            height={16}
          />
        )}
      </Box>

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          sx={{
            color: task.completed
              ? "text.secondary"
              : "text.primary",

            fontSize: 13,
            fontWeight: 650,

            textDecoration: task.completed
              ? "line-through"
              : "none",

            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {task.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            mt: 0.45,
          }}
        >
          {task.time && (
            <>
              <Icon
                icon="solar:clock-circle-linear"
                width={12}
                height={12}
              />

              <Typography
                sx={{
                  fontSize: 10.5,
                  color: "text.secondary",
                }}
              >
                {task.time}
              </Typography>
            </>
          )}

          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: priorityColors[task.priority],
            }}
          />

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

      <Icon
        icon="solar:alt-arrow-right-linear"
        width={17}
        height={17}
        color="#A39BA9"
      />
    </Box>
  );
}
