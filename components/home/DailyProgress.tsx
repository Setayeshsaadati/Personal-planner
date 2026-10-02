import { Icon } from "@iconify/react";
import { Box, Typography } from "@mui/material";

import { ProgressBar } from "../common/ProgressBar";
import { GlassCard } from "@/app/theme/GlassCard";

type DailyProgressProps = {
  completed: number;
  total: number;
};

export function DailyProgress({
  completed,
  total,
}: DailyProgressProps) {
  const progress =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <GlassCard
      sx={{
        p: 3,
        height: "100%",
        background:
          "linear-gradient(145deg, rgba(185,154,232,0.15), rgba(255,255,255,0.52))",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "primary.dark",
              mb: 0.6,
            }}
          >
            TODAY
          </Typography>

          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 800,
              color: "text.primary",
              letterSpacing: "-0.025em",
            }}
          >
            Your daily progress
          </Typography>
        </Box>

        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(185,154,232,0.16)",
            color: "primary.dark",
          }}
        >
          <Icon
            icon="solar:chart-square-linear"
            width={22}
            height={22}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          mb: 1.2,
        }}
      >
        <Typography
          sx={{
            fontSize: 34,
            fontWeight: 800,
            color: "text.primary",
            letterSpacing: "-0.05em",
          }}
        >
          {progress}%
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: "text.secondary",
            mb: 0.6,
          }}
        >
          {completed} of {total} tasks
        </Typography>
      </Box>

      <ProgressBar value={progress} />

      <Typography
        sx={{
          color: "text.secondary",
          fontSize: 12,
          mt: 1.5,
          lineHeight: 1.6,
        }}
      >
        {progress >= 70
          ? "You're having a really productive day ✦"
          : "A few small steps can make today count."}
      </Typography>
    </GlassCard>
  );
}
