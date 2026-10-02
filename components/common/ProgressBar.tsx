import { LinearProgress } from "@mui/material";

type ProgressBarProps = {
  value: number;
};

export function ProgressBar({
  value,
}: ProgressBarProps) {
  return (
    <LinearProgress
      variant="determinate"
      value={Math.min(100, Math.max(0, value))}
      sx={{
        height: 8,
        borderRadius: 999,
        backgroundColor: "#F0EBF1",

        "& .MuiLinearProgress-bar": {
          borderRadius: 999,
          backgroundColor: "primary.main",
        },
      }}
    />
  );
}