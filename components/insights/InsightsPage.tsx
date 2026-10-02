"use client";

import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

import { PageHeader } from "../common/PageHeader";
import { OverviewCard } from "../home/OverviewCard";
import { GlassCard } from "@/app/theme/GlassCard";

const weeklyData = [
  { day: "Mon", tasks: 7, completed: 5 },
  { day: "Tue", tasks: 8, completed: 6 },
  { day: "Wed", tasks: 6, completed: 5 },
  { day: "Thu", tasks: 9, completed: 7 },
  { day: "Fri", tasks: 7, completed: 6 },
  { day: "Sat", tasks: 5, completed: 4 },
  { day: "Sun", tasks: 6, completed: 5 },
];

const categoryData = [
  {
    label: "Work",
    value: 42,
    icon: "solar:case-minimalistic-linear",
    color: "#B99AE8",
  },
  {
    label: "Personal",
    value: 28,
    icon: "solar:user-linear",
    color: "#EFB6C9",
  },
  {
    label: "Health",
    value: 18,
    icon: "solar:heart-linear",
    color: "#A9D7C7",
  },
  {
    label: "Learning",
    value: 12,
    icon: "solar:book-2-linear",
    color: "#B8D8F1",
  },
];

export function InsightsPage() {
  const totalTasks = weeklyData.reduce(
    (sum, day) => sum + day.tasks,
    0
  );

  const completedTasks = weeklyData.reduce(
    (sum, day) => sum + day.completed,
    0
  );

  const completionRate = Math.round(
    (completedTasks / totalTasks) * 100
  );

  const bestDay = weeklyData.reduce((best, current) => {
    const currentRate =
      current.completed / current.tasks;

    const bestRate = best.completed / best.tasks;

    return currentRate > bestRate ? current : best;
  });

  const totalCategoryValue = categoryData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <Box>
      <PageHeader
        eyebrow="YOUR PROGRESS"
        title="Insights"
        description="See how your time, tasks, and routines have been moving throughout the week."
      />

      {/* Overview */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: 2,
          mb: 3,
        }}
      >
        <OverviewCard
          icon="solar:check-circle-linear"
          label="Tasks completed"
          value={`${completedTasks}`}
          subtitle={`of ${totalTasks} this week`}
          tone="lavender"
        />

        <OverviewCard
          icon="solar:chart-2-linear"
          label="Completion rate"
          value={`${completionRate}%`}
          subtitle="Weekly average"
          tone="sage"
        />

        <OverviewCard
          icon="solar:star-linear"
          label="Best day"
          value={bestDay.day}
          subtitle={`${bestDay.completed}/${bestDay.tasks} completed`}
          tone="pink"
        />

        <OverviewCard
          icon="solar:clock-circle-linear"
          label="Focus time"
          value="18.5h"
          subtitle="This week"
          tone="blue"
        />
      </Box>

      {/* Main analytics */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.55fr 0.75fr",
          gap: 2,
          mb: 2,
        }}
      >
        {/* Weekly activity */}
        <GlassCard sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
              mb: 3,
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#4B4350",
                  fontSize: 17,
                  fontWeight: 750,
                }}
              >
                Weekly activity
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 12.5,
                  mt: 0.5,
                }}
              >
                Completed tasks compared with your daily plan.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                px: 1.4,
                py: 0.7,
                borderRadius: "999px",
                background: "rgba(185,154,232,0.16)",
              }}
            >
              <Icon
                icon="solar:calendar-linear"
                width={16}
                color="#9877CE"
              />

              <Typography
                sx={{
                  color: "#8068A6",
                  fontSize: 11.5,
                  fontWeight: 700,
                }}
              >
                This week
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              height: 250,
              display: "grid",
              gridTemplateColumns:
                "repeat(7, minmax(0, 1fr))",
              gap: 2,
              alignItems: "end",
              px: 1,
            }}
          >
            {weeklyData.map((item) => {
              const completedHeight =
                (item.completed / 9) * 180;

              const remainingHeight =
                ((item.tasks - item.completed) / 9) * 180;

              return (
                <Box
                  key={item.day}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#817A89",
                      fontSize: 10.5,
                      fontWeight: 700,
                    }}
                  >
                    {item.completed}
                  </Typography>

                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 44,
                      height: 190,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      borderRadius: "16px 16px 12px 12px",
                      background:
                        "rgba(244,240,246,0.72)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: `${completedHeight}px`,
                        minHeight: 8,
                        background:
                          "linear-gradient(180deg, #B99AE8, #CDB5EC)",
                        borderRadius:
                          "14px 14px 8px 8px",
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      color: "#817A89",
                      fontSize: 11,
                      fontWeight: 650,
                    }}
                  >
                    {item.day}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#A29BA7",
                      fontSize: 9.5,
                    }}
                  >
                    {item.tasks} planned
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </GlassCard>

        {/* Category breakdown */}
        <GlassCard sx={{ p: 3 }}>
          <Typography
            sx={{
              color: "#4B4350",
              fontSize: 17,
              fontWeight: 750,
            }}
          >
            Time by category
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 12.5,
              mt: 0.5,
              mb: 3,
            }}
          >
            Where your planned time goes.
          </Typography>

          <Box
            sx={{
              width: 150,
              height: 150,
              mx: "auto",
              mb: 3,
              borderRadius: "50%",
              background:
                "conic-gradient(#B99AE8 0% 42%, #EFB6C9 42% 70%, #A9D7C7 70% 88%, #B8D8F1 88% 100%)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Box
              sx={{
                width: 92,
                height: 92,
                borderRadius: "50%",
                background: "#FBF9FC",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#403947",
                  fontSize: 21,
                  fontWeight: 800,
                }}
              >
                {totalCategoryValue}%
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 10.5,
                }}
              >
                total
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 1.4,
            }}
          >
            {categoryData.map((item) => (
              <Box
                key={item.label}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "9px",
                      background: `${item.color}28`,
                      color: item.color,
                    }}
                  >
                    <Icon
                      icon={item.icon}
                      width={15}
                    />
                  </Box>

                  <Typography
                    sx={{
                      color: "#625B67",
                      fontSize: 12,
                      fontWeight: 650,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: "#4B4350",
                    fontSize: 12,
                    fontWeight: 750,
                  }}
                >
                  {item.value}%
                </Typography>
              </Box>
            ))}
          </Box>
        </GlassCard>
      </Box>

      {/* Bottom insights */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: 2,
        }}
      >
        <GlassCard
          sx={{
            p: 3,
            background:
              "linear-gradient(145deg, rgba(216,197,242,0.28), rgba(255,255,255,0.52))",
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              display: "grid",
              placeItems: "center",
              borderRadius: "14px",
              background: "rgba(185,154,232,0.28)",
              color: "#9877CE",
              mb: 2,
            }}
          >
            <Icon
              icon="solar:graph-up-linear"
              width={21}
            />
          </Box>

          <Typography
            sx={{
              color: "#4B4350",
              fontSize: 15,
              fontWeight: 750,
            }}
          >
            Youre building momentum
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 12.5,
              lineHeight: 1.7,
              mt: 0.7,
            }}
          >
            Youve completed {completionRate}% of your
            planned tasks this week. Keep focusing on
            consistent progress.
          </Typography>
        </GlassCard>

        <GlassCard
          sx={{
            p: 3,
            background:
              "linear-gradient(145deg, rgba(169,215,199,0.25), rgba(255,255,255,0.52))",
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              display: "grid",
              placeItems: "center",
              borderRadius: "14px",
              background: "rgba(169,215,199,0.3)",
              color: "#72A890",
              mb: 2,
            }}
          >
            <Icon
              icon="solar:calendar-mark-linear"
              width={21}
            />
          </Box>

          <Typography
            sx={{
              color: "#4B4350",
              fontSize: 15,
              fontWeight: 750,
            }}
          >
            Your strongest day
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 12.5,
              lineHeight: 1.7,
              mt: 0.7,
            }}
          >
            {bestDay.day} had your highest completion
            percentage with {bestDay.completed} of{" "}
            {bestDay.tasks} tasks completed.
          </Typography>
        </GlassCard>

        <GlassCard
          sx={{
            p: 3,
            background:
              "linear-gradient(145deg, rgba(239,182,201,0.25), rgba(255,255,255,0.52))",
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              display: "grid",
              placeItems: "center",
              borderRadius: "14px",
              background: "rgba(239,182,201,0.3)",
              color: "#C18199",
              mb: 2,
            }}
          >
            <Icon
              icon="solar:lightbulb-linear"
              width={21}
            />
          </Box>

          <Typography
            sx={{
              color: "#4B4350",
              fontSize: 15,
              fontWeight: 750,
            }}
          >
            A little reflection
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 12.5,
              lineHeight: 1.7,
              mt: 0.7,
            }}
          >
            Look at your categories and ask yourself
            whether your planned time reflects what matters
            most to you.
          </Typography>
        </GlassCard>
      </Box>
    </Box>
  );
}