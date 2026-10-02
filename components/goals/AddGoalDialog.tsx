import { useState } from "react";
import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";

import type { Goal } from "../../types/planner";

type AddGoalDialogProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (goal: Goal) => void;
};

export function AddGoalDialog({
  open,
  onClose,
  onAdd,
}: AddGoalDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");
  const [deadline, setDeadline] =
    useState("");

  const reset = () => {
    setTitle("");
    setDescription("");
    setTarget("");
    setUnit("");
    setDeadline("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    const numericTarget = Number(target) || 100;

    onAdd({
      id: `goal-${Date.now()}`,
      title: title.trim(),
      description:
        description.trim() ||
        "Keep making steady progress.",
      current: 0,
      target: numericTarget,
      unit: unit.trim() || "%",
      deadline: deadline.trim() || "No deadline",
    });

    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box>
            <Box
              sx={{
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "15px",
                background:
                  "rgba(185,154,232,0.16)",
                color: "primary.dark",
                mb: 1.5,
              }}
            >
              <Icon
                icon="solar:target-linear"
                width={22}
              />
            </Box>

            <Typography
              sx={{
                fontSize: 23,
                fontWeight: 800,
                color: "text.primary",
              }}
            >
              Create a new goal
            </Typography>

            <Typography
              sx={{
                mt: 0.6,
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              Give yourself something meaningful
              to work toward.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.7,
          }}
        >
          <TextField
            label="Goal name"
            placeholder="e.g. Learn Spanish"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            fullWidth
          />

          <TextField
            label="Description"
            placeholder="What do you want to achieve?"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            multiline
            minRows={3}
            fullWidth
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1.5,
            }}
          >
            <TextField
              label="Target"
              type="number"
              placeholder="100"
              value={target}
              onChange={(event) =>
                setTarget(event.target.value)
              }
            />

            <TextField
              label="Unit"
              placeholder="% / books / hours"
              value={unit}
              onChange={(event) =>
                setUnit(event.target.value)
              }
            />
          </Box>

          <TextField
            label="Deadline"
            placeholder="e.g. Dec 31"
            value={deadline}
            onChange={(event) =>
              setDeadline(event.target.value)
            }
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            mt: 3,
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              color: "text.secondary",
              borderRadius: "14px",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={
              <Icon
                icon="solar:add-circle-linear"
                width={18}
              />
            }
            sx={{
              borderRadius: "14px",
              background:
                "linear-gradient(135deg, #B99AE8, #D4B3EC)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #A98BD8, #C8A7E2)",
              },
            }}
          >
            Create goal
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
