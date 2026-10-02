"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { Icon } from "@iconify/react";

import type { Task, TaskPriority } from "../../types/planner";

type AddTaskDialogProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (task: Task) => void;
};

export function AddTaskDialog({ open, onClose, onAdd }: AddTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  const handleClose = () => {
    setTitle("");
    setCategory("Personal");
    setTime("");
    setPriority("medium");
    onClose();
  };

  const handleSubmit = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: trimmedTitle,
      category,
      time: time || undefined,
      completed: false,
      priority,
    };

    onAdd(newTask);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      sx={{
        borderRadius: "24px",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.88), rgba(255,255,255,0.72))",
        backdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "none",
      }}
    >
      <DialogTitle
        sx={{
          color: "#403947",
          fontSize: 21,
          fontWeight: 800,
          pb: 1,
        }}
      >
        Add a task
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            pt: 1,
          }}
        >
          <TextField
            autoFocus
            fullWidth
            label="Task"
            placeholder="What do you need to do?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <TextField
            fullWidth
            label="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />

          <TextField
            fullWidth
            label="Time"
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            select
            fullWidth
            label="Priority"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as TaskPriority)
            }
          >
            <MenuItem value="low">Low</MenuItem>

            <MenuItem value="medium">Medium</MenuItem>

            <MenuItem value="high">High</MenuItem>
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2.5,
          gap: 1,
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "text.secondary",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!title.trim()}
          startIcon={<Icon icon="solar:add-circle-linear" width={18} />}
          sx={{
            background: "linear-gradient(135deg, #B99AE8, #CDAFEA)",
            color: "#FFFFFF",

            "&:hover": {
              background: "linear-gradient(135deg, #A98ADB, #C09FE2)",
            },

            "&.Mui-disabled": {
              background: "rgba(185,154,232,0.25)",
              color: "rgba(255,255,255,0.7)",
            },
          }}
        >
          Add task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
