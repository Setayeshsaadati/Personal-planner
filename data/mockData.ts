import type { Goal, Habit, Task } from "../types/planner";

export const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Plan today's priorities",
    category: "Personal",
    time: "09:00",
    completed: true,
    priority: "high",
  },
  {
    id: "task-2",
    title: "Work on my main project",
    category: "Work",
    time: "11:00",
    completed: false,
    priority: "high",
  },
  {
    id: "task-3",
    title: "Exercise",
    category: "Health",
    time: "17:30",
    completed: false,
    priority: "medium",
  },
  {
    id: "task-4",
    title: "Read for 30 minutes",
    category: "Personal",
    time: "21:00",
    completed: false,
    priority: "low",
  },
];

export const initialGoals: Goal[] = [
  {
    id: "goal-1",
    title: "Learn a new skill",
    description: "Build a consistent learning routine.",
    current: 68,
    target: 100,
    unit: "%",
    deadline: "Dec 20",
  },
  {
    id: "goal-2",
    title: "Personal project",
    description: "Move the project forward step by step.",
    current: 42,
    target: 100,
    unit: "%",
    deadline: "Jan 15",
  },
  {
    id: "goal-3",
    title: "Read more books",
    description: "Create a calm and consistent reading habit.",
    current: 7,
    target: 12,
    unit: "books",
    deadline: "Dec 31",
  },
];

export const initialHabits: Habit[] = [
  {
    id: "habit-1",
    title: "Exercise",
    icon: "solar:heart-linear",
    completed: [true, true, false, true, false, false, true],
  },
  {
    id: "habit-2",
    title: "Reading",
    icon: "solar:book-2-linear",
    completed: [true, false, true, true, true, false, false],
  },
  {
    id: "habit-3",
    title: "Meditation",
    icon: "solar:moon-linear",
    completed: [false, true, true, false, true, true, false],
  },
];