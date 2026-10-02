import type { ReactNode } from "react";
import { Box } from "@mui/material";

type GlassCardProps = {
  children: ReactNode;
  sx?: object;
};

export function GlassCard({ children, sx }: GlassCardProps) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",

        background:
          "linear-gradient(145deg, rgba(255,255,255,0.72), rgba(255,255,255,0.46))",

        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",

        border: "1px solid rgba(255,255,255,0.78)",
        borderRadius: "24px",

        boxShadow: "none",

        transition:
          "border-color 200ms ease, background 200ms ease, transform 200ms ease",

        "&:hover": {
          borderColor: "rgba(255,255,255,0.95)",
        },

        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
