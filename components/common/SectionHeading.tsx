import type { ReactNode } from "react";

import { Box, Typography } from "@mui/material";

type SectionHeadingProps = {
  title: string;
  action?: ReactNode;
};

export function SectionHeading({
  title,
  action,
}: SectionHeadingProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        mb: 2,
      }}
    >
      <Typography
        sx={{
          color: "#4B4350",
          fontSize: 17,
          fontWeight: 750,
        }}
      >
        {title}
      </Typography>

      {action && <Box>{action}</Box>}
    </Box>
  );
}