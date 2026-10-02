import type { ReactNode } from "react";

import { Box, Typography } from "@mui/material";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: {
          xs: "flex-start",
          md: "center",
        },
        justifyContent: "space-between",
        gap: 3,
        mb: 4,
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      <Box>
        {eyebrow && (
          <Typography
            sx={{
              color: "primary.main",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.7,
              mb: 0.7,
            }}
          >
            {eyebrow}
          </Typography>
        )}

        <Typography
          component="h1"
          sx={{
            color: "#403947",
            fontSize: {
              xs: 28,
              md: 34,
            },
            fontWeight: 800,
            lineHeight: 1.15,
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 14,
              lineHeight: 1.7,
              mt: 1,
              maxWidth: 620,
            }}
          >
            {description}
          </Typography>
        )}
      </Box>

      {action && (
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          {action}
        </Box>
      )}
    </Box>
  );
}