import { Icon } from "@iconify/react";
import { Box, IconButton, Typography } from "@mui/material";

import type { Goal } from "../../types/planner";

import { ProgressBar } from "../common/ProgressBar";
import { GlassCard } from "@/app/theme/GlassCard";

type GoalCardProps = {
  goal: Goal;
  onDelete?: (id: string) => void;
};

export function GoalCard({
  goal,
  onDelete,
}: GoalCardProps) {
  const progress =
    goal.target === 0
      ? 0
      : Math.min(
          100,
          Math.round((goal.current / goal.target) * 100)
        );

  return (
    <GlassCard
      sx={{
        p: 2.8,
        minHeight: 235,

        background:
          "linear-gradient(145deg, rgba(255,255,255,0.68), rgba(255,255,255,0.45))",

        transition:
          "background 180ms ease, border-color 180ms ease",

        "&:hover": {
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.80), rgba(255,255,255,0.55))",
          borderColor: "rgba(255,255,255,0.95)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            flexShrink: 0,

            borderRadius: "15px",

            background:
              "linear-gradient(145deg, rgba(185,154,232,0.20), rgba(239,182,201,0.15))",

            color: "primary.dark",
          }}
        >
          <Icon
            icon="solar:target-linear"
            width={22}
          />
        </Box>

        {onDelete && (
          <IconButton
            onClick={() => onDelete(goal.id)}
            size="small"
            sx={{
              width: 34,
              height: 34,
              color: "#A49CA9",

              "&:hover": {
                background: "rgba(239,182,201,0.12)",
                color: "#C47F99",
              },
            }}
          >
            <Icon
              icon="solar:trash-bin-trash-linear"
              width={17}
            />
          </IconButton>
        )}
      </Box>

      <Typography
        sx={{
          mt: 2,
          fontSize: 17,
          fontWeight: 800,
          color: "text.primary",
          letterSpacing: "-0.02em",
        }}
      >
        {goal.title}
      </Typography>

      <Typography
        sx={{
          mt: 0.7,
          minHeight: 38,
          fontSize: 11.5,
          lineHeight: 1.65,
          color: "text.secondary",
        }}
      >
        {goal.description}
      </Typography>

      <Box sx={{ mt: 2.2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            mb: 0.8,
          }}
        >
          <Typography
            sx={{
              fontSize: 25,
              fontWeight: 800,
              color: "primary.dark",
              letterSpacing: "-0.04em",
            }}
          >
            {progress}%
          </Typography>

          <Typography
            sx={{
              fontSize: 10.5,
              color: "text.secondary",
            }}
          >
            {goal.current} / {goal.target} {goal.unit}
          </Typography>
        </Box>

        <ProgressBar value={progress} />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.7,
          mt: 1.7,
        }}
      >
        <Icon
          icon="solar:calendar-linear"
          width={14}
          color="#A098A7"
        />

        <Typography
          sx={{
            fontSize: 10.5,
            color: "text.secondary",
          }}
        >
          Target: {goal.deadline}
        </Typography>
      </Box>
    </GlassCard>
  );
}
