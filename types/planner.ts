export type Page =
  | "home"
  | "planner"
  | "goals"
  | "insights"
  | "habits"
  | "notes"
  | "settings";

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  category: string;
  time?: string;
  completed: boolean;
  priority: TaskPriority;
};

export type Goal = {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  unit: string;
  deadline: string;
};

export type Habit = {
  id: string;
  title: string;
  icon: string;
  completed: boolean[];
};