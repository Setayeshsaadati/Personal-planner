"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";

import { PageHeader } from "../common/PageHeader";
import { GlassCard } from "@/app/theme/GlassCard";

type SettingRowProps = {
  icon: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

function SettingRow({
  icon,
  title,
  description,
  children,
}: SettingRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3,
        py: 2.2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.6,
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            borderRadius: "14px",
            background: "rgba(216,197,242,0.28)",
            color: "#9877CE",
          }}
        >
          <Icon icon={icon} width={20} />
        </Box>

        <Box>
          <Typography
            sx={{
              color: "#4B4350",
              fontSize: 13.5,
              fontWeight: 750,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 11.5,
              lineHeight: 1.55,
              mt: 0.35,
              maxWidth: 530,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flexShrink: 0 }}>{children}</Box>
    </Box>
  );
}

export function SettingsPage() {
  const [weekStartsOn, setWeekStartsOn] =
    useState("Monday");

  const [notifications, setNotifications] =
    useState(true);

  const [dailyReminder, setDailyReminder] =
    useState(true);

  const [completedTasks, setCompletedTasks] =
    useState(true);

  const [compactMode, setCompactMode] =
    useState(false);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 1800);
  };

  return (
    <Box>
      <PageHeader
        eyebrow="PREFERENCES"
        title="Settings"
        description="Make your planning space feel more like your own."
        action={
          <Button
            variant="contained"
            onClick={handleSave}
            startIcon={
              <Icon
                icon={
                  saved
                    ? "solar:check-circle-linear"
                    : "solar:check-linear"
                }
                width={18}
              />
            }
            sx={{
              minWidth: 125,
              background: saved
                ? "#A9D7C7"
                : "linear-gradient(135deg, #B99AE8, #CDAFEA)",
              color: "#FFFFFF",
              "&:hover": {
                background: saved
                  ? "#96CBB8"
                  : "linear-gradient(135deg, #A98ADB, #C09FE2)",
              },
            }}
          >
            {saved ? "Saved" : "Save changes"}
          </Button>
        }
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.4fr 0.6fr",
          gap: 2,
          alignItems: "start",
        }}
      >
        {/* Main settings */}
        <Box
          sx={{
            display: "grid",
            gap: 2,
          }}
        >
          {/* General */}
          <GlassCard sx={{ p: 3 }}>
            <Box sx={{ mb: 1 }}>
              <Typography
                sx={{
                  color: "#4B4350",
                  fontSize: 17,
                  fontWeight: 750,
                }}
              >
                General
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 12,
                  mt: 0.5,
                }}
              >
                Basic preferences for how your planner works.
              </Typography>
            </Box>

            <Divider
              sx={{
                borderColor:
                  "rgba(120,104,132,0.08)",
              }}
            />

            <SettingRow
              icon="solar:calendar-linear"
              title="Week starts on"
              description="Choose which day appears first in your weekly planner."
            >
              <Select
                value={weekStartsOn}
                onChange={(event) =>
                  setWeekStartsOn(event.target.value)
                }
                size="small"
                sx={{
                  minWidth: 135,
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.55)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      "rgba(120,104,132,0.10)",
                  },
                }}
              >
                <MenuItem value="Monday">
                  Monday
                </MenuItem>
                <MenuItem value="Sunday">
                  Sunday
                </MenuItem>
              </Select>
            </SettingRow>

            <Divider
              sx={{
                borderColor:
                  "rgba(120,104,132,0.08)",
              }}
            />

            <SettingRow
              icon="solar:bell-linear"
              title="Notifications"
              description="Allow the planner to show helpful reminders."
            >
              <Switch
                checked={notifications}
                onChange={(event) =>
                  setNotifications(event.target.checked)
                }
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#9877CE",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                    {
                      backgroundColor: "#B99AE8",
                      opacity: 1,
                    },
                }}
              />
            </SettingRow>

            <Divider
              sx={{
                borderColor:
                  "rgba(120,104,132,0.08)",
              }}
            />

            <SettingRow
              icon="solar:alarm-linear"
              title="Daily reminder"
              description="Receive a gentle reminder to review your day."
            >
              <Switch
                checked={dailyReminder}
                onChange={(event) =>
                  setDailyReminder(event.target.checked)
                }
                disabled={!notifications}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#EFB6C9",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                    {
                      backgroundColor: "#EFB6C9",
                      opacity: 1,
                    },
                }}
              />
            </SettingRow>
          </GlassCard>

          {/* Appearance */}
          <GlassCard sx={{ p: 3 }}>
            <Box sx={{ mb: 1 }}>
              <Typography
                sx={{
                  color: "#4B4350",
                  fontSize: 17,
                  fontWeight: 750,
                }}
              >
                Appearance
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 12,
                  mt: 0.5,
                }}
              >
                Keep your workspace clean and comfortable.
              </Typography>
            </Box>

            <Divider
              sx={{
                borderColor:
                  "rgba(120,104,132,0.08)",
              }}
            />

            <SettingRow
              icon="solar:widget-2-linear"
              title="Compact mode"
              description="Reduce spacing between planner elements."
            >
              <Switch
                checked={compactMode}
                onChange={(event) =>
                  setCompactMode(event.target.checked)
                }
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#9877CE",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                    {
                      backgroundColor: "#B99AE8",
                      opacity: 1,
                    },
                }}
              />
            </SettingRow>

            <Divider
              sx={{
                borderColor:
                  "rgba(120,104,132,0.08)",
              }}
            />

            <SettingRow
              icon="solar:check-circle-linear"
              title="Keep completed tasks visible"
              description="Show completed tasks in your daily planner."
            >
              <Switch
                checked={completedTasks}
                onChange={(event) =>
                  setCompletedTasks(event.target.checked)
                }
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#72A890",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                    {
                      backgroundColor: "#A9D7C7",
                      opacity: 1,
                    },
                }}
              />
            </SettingRow>
          </GlassCard>

          {/* Profile */}
          <GlassCard sx={{ p: 3 }}>
            <Box sx={{ mb: 1 }}>
              <Typography
                sx={{
                  color: "#4B4350",
                  fontSize: 17,
                  fontWeight: 750,
                }}
              >
                Planner profile
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 12,
                  mt: 0.5,
                }}
              >
                Personalize the information shown across your planner.
              </Typography>
            </Box>

            <Divider
              sx={{
                borderColor:
                  "rgba(120,104,132,0.08)",
                mb: 2.5,
              }}
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              <TextField
                label="Your name"
                defaultValue="Your name"
                fullWidth
              />

              <TextField
                label="Main focus"
                defaultValue="Personal growth"
                fullWidth
              />
            </Box>
          </GlassCard>
        </Box>

        {/* Side panel */}
        <Box
          sx={{
            display: "grid",
            gap: 2,
          }}
        >
          {/* Current setup */}
          <GlassCard
            sx={{
              p: 3,
              background:
                "linear-gradient(145deg, rgba(216,197,242,0.30), rgba(255,255,255,0.52))",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                display: "grid",
                placeItems: "center",
                borderRadius: "16px",
                background: "rgba(185,154,232,0.25)",
                color: "#9877CE",
                mb: 2,
              }}
            >
              <Icon
                icon="solar:settings-linear"
                width={23}
              />
            </Box>

            <Typography
              sx={{
                color: "#4B4350",
                fontSize: 17,
                fontWeight: 750,
              }}
            >
              Your workspace
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 12.5,
                lineHeight: 1.7,
                mt: 0.7,
              }}
            >
              Everything here is designed to keep planning
              simple, visual, and calm.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: 1,
                mt: 2.5,
              }}
            >
              {[
                ["Theme", "Pastel Light"],
                ["Layout", "Desktop"],
                ["Week", weekStartsOn],
              ].map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    py: 0.8,
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: 11.5,
                    }}
                  >
                    {label}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#5A5260",
                      fontSize: 11.5,
                      fontWeight: 700,
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </GlassCard>

          {/* Data */}
          <GlassCard sx={{ p: 3 }}>
            <Typography
              sx={{
                color: "#4B4350",
                fontSize: 16,
                fontWeight: 750,
              }}
            >
              Your data
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 12,
                lineHeight: 1.65,
                mt: 0.6,
                mb: 2,
              }}
            >
              Manage your planner information. Data actions
              will be connected to your local storage later.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                startIcon={
                  <Icon
                    icon="solar:download-linear"
                    width={17}
                  />
                }
                sx={{
                  justifyContent: "flex-start",
                  borderColor:
                    "rgba(120,104,132,0.12)",
                  color: "#625B67",
                  background:
                    "rgba(255,255,255,0.32)",
                  "&:hover": {
                    borderColor:
                      "rgba(185,154,232,0.4)",
                    background:
                      "rgba(216,197,242,0.14)",
                  },
                }}
              >
                Export data
              </Button>

              <Button
                variant="outlined"
                startIcon={
                  <Icon
                    icon="solar:upload-linear"
                    width={17}
                  />
                }
                sx={{
                  justifyContent: "flex-start",
                  borderColor:
                    "rgba(120,104,132,0.12)",
                  color: "#625B67",
                  background:
                    "rgba(255,255,255,0.32)",
                  "&:hover": {
                    borderColor:
                      "rgba(185,154,232,0.4)",
                    background:
                      "rgba(216,197,242,0.14)",
                  },
                }}
              >
                Import data
              </Button>
            </Box>
          </GlassCard>

          {/* About */}
          <GlassCard
            sx={{
              p: 3,
              background:
                "linear-gradient(145deg, rgba(169,215,199,0.24), rgba(255,255,255,0.52))",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                mb: 1,
              }}
            >
              <Icon
                icon="solar:sun-2-linear"
                width={21}
                color="#72A890"
              />

              <Typography
                sx={{
                  color: "#4B4350",
                  fontSize: 15,
                  fontWeight: 750,
                }}
              >
                Daylight
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 11.5,
                lineHeight: 1.7,
              }}
            >
              A quiet little space for planning your days,
              building habits, and making progress.
            </Typography>

            <Typography
              sx={{
                color: "#9A929F",
                fontSize: 10,
                mt: 1.5,
              }}
            >
              Version 0.1.0
            </Typography>
          </GlassCard>
        </Box>
      </Box>
    </Box>
  );
}