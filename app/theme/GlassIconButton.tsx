import type { ReactNode } from "react";
import { Box } from "@mui/material";

type GlassIconButtonProps = {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export function GlassIconButton({
  children,
  active = false,
  onClick,
}: GlassIconButtonProps) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        width: 42,
        height: 42,
        minWidth: 42,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        border: "1px solid",
        borderColor: active
          ? "rgba(185,154,232,0.45)"
          : "rgba(255,255,255,0.78)",

        borderRadius: "14px",

        background: active
          ? "rgba(185,154,232,0.16)"
          : "rgba(255,255,255,0.46)",

        color: active ? "primary.dark" : "text.secondary",

        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",

        cursor: "pointer",

        transition:
          "background 180ms ease, border-color 180ms ease, transform 180ms ease",

        "&:hover": {
          background: active
            ? "rgba(185,154,232,0.22)"
            : "rgba(255,255,255,0.68)",
        },

        "&:active": {
          transform: "scale(0.95)",
        },
      }}
    >
      {children}
    </Box>
  );
}
