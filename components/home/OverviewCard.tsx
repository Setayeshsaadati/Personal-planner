import { GlassCard } from "@/app/theme/GlassCard";
import { Icon } from "@iconify/react";
import { Box, Typography } from "@mui/material";


type OverviewCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  tone?: "lavender" | "pink" | "sage" | "blue";
};

const tones = {
  lavender: {
    background:
      "linear-gradient(145deg, rgba(185,154,232,0.20), rgba(255,255,255,0.48))",
    iconBackground: "rgba(185,154,232,0.20)",
    iconColor: "#9877CE",
  },
  pink: {
    background:
      "linear-gradient(145deg, rgba(239,182,201,0.20), rgba(255,255,255,0.48))",
    iconBackground: "rgba(239,182,201,0.22)",
    iconColor: "#D18DA9",
  },
  sage: {
    background:
      "linear-gradient(145deg, rgba(169,215,199,0.20), rgba(255,255,255,0.48))",
    iconBackground: "rgba(169,215,199,0.22)",
    iconColor: "#6FA78F",
  },
  blue: {
    background:
      "linear-gradient(145deg, rgba(184,216,241,0.20), rgba(255,255,255,0.48))",
    iconBackground: "rgba(184,216,241,0.22)",
    iconColor: "#78A8C8",
  },
};

export function OverviewCard({
  title,
  value,
  subtitle,
  icon,
  tone = "lavender",
}: OverviewCardProps) {
  const colors = tones[tone];

  return (
    <GlassCard
      sx={{
        minHeight: 150,
        p: 2.5,
        background: colors.background,
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
        <Box>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 12,
              fontWeight: 650,
              mb: 1.2,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: "text.primary",
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {value}
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 11.5,
              mt: 1,
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 42,
            height: 42,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,

            borderRadius: "15px",
            background: colors.iconBackground,
            color: colors.iconColor,
          }}
        >
          <Icon icon={icon} width={21} height={21} />
        </Box>
      </Box>
    </GlassCard>
  );
}
