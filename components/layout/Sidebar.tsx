import { Icon } from "@iconify/react";
import { Box, Typography } from "@mui/material";

import type { Page } from "../../types/planner";

type SidebarProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
};

const navigation = [
  {
    id: "home" as Page,
    label: "Home",
    icon: "solar:home-2-linear",
  },
  {
    id: "planner" as Page,
    label: "Planner",
    icon: "solar:calendar-linear",
  },
  {
    id: "goals" as Page,
    label: "Goals",
    icon: "solar:target-linear",
  },
  {
    id: "insights" as Page,
    label: "Insights",
    icon: "solar:chart-2-linear",
  },
  {
    id: "habits" as Page,
    label: "Habits",
    icon: "solar:checklist-minimalistic-linear",
  },
  {
    id: "notes" as Page,
    label: "Notes",
    icon: "solar:notebook-linear",
  },
];

export function Sidebar({
  activePage,
  onNavigate,
}: SidebarProps) {
  return (
    <Box
      component="aside"
      sx={{
        position: "fixed",
        zIndex: 20,

        top: 20,
        left: 20,
        bottom: 20,

        width: { md: 224, lg: 250 },

        display: "flex",
        flexDirection: "column",

        p: 1.5,

        background:
          "linear-gradient(160deg, rgba(255,255,255,0.72), rgba(255,255,255,0.48))",

        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",

        border: "1px solid rgba(255,255,255,0.82)",
        borderRadius: "28px",

        boxShadow: "none",

        "@media (max-width: 900px)": {
          width: 78,
          alignItems: "center",
          p: 1,
        },

        "@media (max-width: 599px)": {
          display: "none",
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.3,

          px: { md: 1, lg: 1.2 },
          py: 1.2,
          mb: 2.5,

          "@media (max-width: 900px)": {
            justifyContent: "center",
            px: 0,
          },
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            flexShrink: 0,

            borderRadius: "15px",

            background:
              "linear-gradient(145deg, rgba(239,182,201,0.42), rgba(185,154,232,0.42))",

            border: "1px solid rgba(255,255,255,0.8)",

            color: "#9675C8",
          }}
        >
          <Icon
            icon="solar:sun-2-linear"
            width={23}
            height={23}
          />
        </Box>

        <Box
          sx={{
            "@media (max-width: 900px)": {
              display: "none",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 800,
              color: "#403947",
              lineHeight: 1.1,
            }}
          >
            Daylight
          </Typography>

          <Typography
            sx={{
              fontSize: 10,
              color: "#9A92A2",
              mt: 0.4,
              letterSpacing: 0.3,
            }}
          >
            personal planner
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box
        component="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {navigation.map((item) => {
          const active = activePage === item.id;

          return (
            <Box
              key={item.id}
              component="button"
              onClick={() => onNavigate(item.id)}
              sx={{
                width: "100%",
                minHeight: 48,

                display: "flex",
                alignItems: "center",
                justifyContent: {
                  xs: "center",
                  md: "flex-start",
                },

                gap: 1.5,

                px: { md: 1.2, lg: 1.5 },

                border: "1px solid",
                borderColor: active
                  ? "rgba(185,154,232,0.30)"
                  : "transparent",

                borderRadius: "16px",

                background: active
                  ? "linear-gradient(100deg, rgba(185,154,232,0.18), rgba(239,182,201,0.12))"
                  : "transparent",

                color: active ? "#8D6BC1" : "#827B89",

                cursor: "pointer",

                transition:
                  "background 180ms ease, color 180ms ease, border-color 180ms ease",

                "&:hover": {
                  background: active
                    ? "rgba(185,154,232,0.18)"
                    : "rgba(255,255,255,0.48)",

                  color: active ? "#8D6BC1" : "#625B69",
                },

                "@media (max-width: 900px)": {
                  width: 52,
                  px: 0,
                },
              }}
            >
              <Icon
                icon={item.icon}
                width={21}
                height={21}
              />

              <Typography
                sx={{
                  fontSize: 13.5,
                  fontWeight: active ? 750 : 600,

                  "@media (max-width: 900px)": {
                    display: "none",
                  },
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Bottom */}
      <Box sx={{ mt: "auto" }}>
        <Box
          component="button"
          onClick={() => onNavigate("settings")}
          sx={{
            width: "100%",
            minHeight: 48,

            display: "flex",
            alignItems: "center",
            justifyContent: {
              xs: "center",
              md: "flex-start",
            },

            gap: 1.5,

            px: { md: 1.2, lg: 1.5 },

            border: "1px solid transparent",
            borderRadius: "16px",

            background: "transparent",
            color:
              activePage === "settings"
                ? "#8D6BC1"
                : "#827B89",

            cursor: "pointer",

            "&:hover": {
              background: "rgba(255,255,255,0.48)",
            },

            "@media (max-width: 900px)": {
              width: 52,
              px: 0,
            },
          }}
        >
          <Icon
            icon="solar:settings-linear"
            width={21}
            height={21}
          />

          <Typography
            sx={{
              fontSize: 13.5,
              fontWeight: 600,

              "@media (max-width: 900px)": {
                display: "none",
              },
            }}
          >
            Settings
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
