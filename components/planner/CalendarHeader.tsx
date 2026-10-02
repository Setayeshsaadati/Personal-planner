import { Icon } from "@iconify/react";
import { Box, IconButton, Typography } from "@mui/material";

type CalendarHeaderProps = {
  view: "day" | "week" | "month";
  onViewChange: (view: "day" | "week" | "month") => void;
};

export function CalendarHeader({
  view,
  onViewChange,
}: CalendarHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
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
            letterSpacing: 0.6,
            mb: 0.5,
          }}
        >
          PLANNER
        </Typography>

        <Typography
          component="h1"
          sx={{
            fontSize: 32,
            fontWeight: 800,
            color: "text.primary",
            letterSpacing: "-0.04em",
          }}
        >
          Plan your time
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0.5,

            background: "rgba(255,255,255,0.52)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",

            border:
              "1px solid rgba(255,255,255,0.78)",
            borderRadius: "16px",
          }}
        >
          {(["day", "week", "month"] as const).map(
            (item) => {
              const active = view === item;

              return (
                <Box
                  key={item}
                  component="button"
                  onClick={() => onViewChange(item)}
                  sx={{
                    border: "none",
                    borderRadius: "12px",

                    background: active
                      ? "rgba(185,154,232,0.18)"
                      : "transparent",

                    color: active
                      ? "primary.dark"
                      : "text.secondary",

                    px: 1.7,
                    py: 0.9,

                    fontSize: 12,
                    fontWeight: active ? 750 : 600,

                    cursor: "pointer",

                    transition:
                      "background 180ms ease, color 180ms ease",

                    "&:hover": {
                      background:
                        "rgba(185,154,232,0.12)",
                    },
                  }}
                >
                  {item.charAt(0).toUpperCase() +
                    item.slice(1)}
                </Box>
              );
            }
          )}
        </Box>

        <IconButton
          sx={{
            width: 42,
            height: 42,

            background: "rgba(255,255,255,0.52)",
            border:
              "1px solid rgba(255,255,255,0.78)",

            color: "text.secondary",

            "&:hover": {
              background: "rgba(255,255,255,0.72)",
            },
          }}
        >
          <Icon
            icon="solar:calendar-add-linear"
            width={21}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
