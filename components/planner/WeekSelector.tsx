import { Icon } from "@iconify/react";
import { Box, Typography } from "@mui/material";

type WeekDay = {
  day: string;
  date: number;
  active?: boolean;
  today?: boolean;
};

const days: WeekDay[] = [
  { day: "Mon", date: 28 },
  { day: "Tue", date: 29 },
  { day: "Wed", date: 30 },
  { day: "Thu", date: 1, today: true },
  { day: "Fri", date: 2 },
  { day: "Sat", date: 3 },
  { day: "Sun", date: 4 },
];

type WeekSelectorProps = {
  selectedDay: number;
  onSelect: (date: number) => void;
};

export function WeekSelector({
  selectedDay,
  onSelect,
}: WeekSelectorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mb: 2.5,
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 72,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "18px",

          background:
            "linear-gradient(145deg, rgba(185,154,232,0.15), rgba(255,255,255,0.52))",

          border:
            "1px solid rgba(255,255,255,0.78)",

          color: "primary.dark",
        }}
      >
        <Icon
          icon="solar:calendar-linear"
          width={21}
        />
      </Box>

      {days.map((item) => {
        const selected = selectedDay === item.date;

        return (
          <Box
            key={`${item.day}-${item.date}`}
            component="button"
            onClick={() => onSelect(item.date)}
            sx={{
              flex: 1,
              height: 72,

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              border: "1px solid",
              borderColor: selected
                ? "rgba(185,154,232,0.35)"
                : "rgba(255,255,255,0.70)",

              borderRadius: "18px",

              background: selected
                ? "linear-gradient(145deg, rgba(185,154,232,0.22), rgba(239,182,201,0.13))"
                : "rgba(255,255,255,0.46)",

              color: selected
                ? "primary.dark"
                : "text.secondary",

              cursor: "pointer",

              transition:
                "background 180ms ease, border-color 180ms ease",

              "&:hover": {
                background:
                  "rgba(255,255,255,0.70)",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 650,
                mb: 0.6,
              }}
            >
              {item.day}
            </Typography>

            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {item.date}
            </Typography>

            {item.today && (
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "secondary.main",
                  mt: 0.7,
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}
