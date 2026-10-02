import { Icon } from "@iconify/react";
import { Box, Typography } from "@mui/material";

import type { Goal } from "../../types/planner";

import { ProgressBar } from "../common/ProgressBar";
import { SectionHeading } from "../common/SectionHeading";
import { GlassCard } from "@/app/theme/GlassCard";

type GoalsPreviewProps = {
  goals: Goal[];
};

export function GoalsPreview({
  goals,
}: GoalsPreviewProps) {
  return (
    <GlassCard sx={{ p: 3 }}>
      <SectionHeading
        title="Your goals"
        action={
          <Icon
            icon="solar:alt-arrow-right-linear"
            width={19}
            color="#9B91A3"
          />
        }
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.3,
        }}
      >
        {goals.slice(0, 3).map((goal) => {
          const progress =
            goal.target === 0
              ? 0
              : Math.min(
                  100,
                  Math.round(
                    (goal.current / goal.target) * 100
                  )
                );

          return (
            <Box key={goal.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.8,
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "text.primary",
                    }}
                  >
                    {goal.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 10.5,
                      color: "text.secondary",
                      mt: 0.25,
                    }}
                  >
                    Due {goal.deadline}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 750,
                    color: "primary.dark",
                  }}
                >
                  {progress}%
                </Typography>
              </Box>

              <ProgressBar value={progress} />
            </Box>
          );
        })}
      </Box>
    </GlassCard>
  );
}
