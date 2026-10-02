"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  initialGoals,
  initialHabits,
  initialTasks,
} from "../../data/mockData";

import type {
  Goal,
  Habit,
  Task,
} from "../../types/planner";

type PlannerContextValue = {
  tasks: Task[];
  goals: Goal[];
  habits: Habit[];

  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  toggleTask: (taskId: string) => void;

  addGoal: (goal: Goal) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
  deleteGoal: (goalId: string) => void;

  addHabit: (habit: Habit) => void;
  updateHabit: (
    habitId: string,
    updates: Partial<Habit>
  ) => void;
  deleteHabit: (habitId: string) => void;
  toggleHabitDay: (
    habitId: string,
    dayIndex: number
  ) => void;

  resetPlanner: () => void;
};

const PlannerContext =
  createContext<PlannerContextValue | null>(null);

const STORAGE_KEY = "daylight-planner-data";

type StoredPlannerData = {
  tasks: Task[];
  goals: Goal[];
  habits: Habit[];
};

function getInitialData(): StoredPlannerData {
  return {
    tasks: initialTasks,
    goals: initialGoals,
    habits: initialHabits,
  };
}

export function PlannerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>(
    initialTasks
  );

  const [goals, setGoals] = useState<Goal[]>(
    initialGoals
  );

  const [habits, setHabits] = useState<Habit[]>(
    initialHabits
  );

  const [hydrated, setHydrated] = useState(false);

  /*
   * Load saved data once on the client.
   */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed: StoredPlannerData =
          JSON.parse(stored);

        setTasks(parsed.tasks ?? initialTasks);
        setGoals(parsed.goals ?? initialGoals);
        setHabits(parsed.habits ?? initialHabits);
      }
    } catch {
      // Keep initial data if saved data is invalid.
    } finally {
      setHydrated(true);
    }
  }, []);

  /*
   * Save every change after initial hydration.
   */
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const data: StoredPlannerData = {
      tasks,
      goals,
      habits,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  }, [tasks, goals, habits, hydrated]);

  const value = useMemo<PlannerContextValue>(
    () => ({
      tasks,
      goals,
      habits,

      addTask: (task) => {
        setTasks((current) => [
          ...current,
          task,
        ]);
      },

      updateTask: (taskId, updates) => {
        setTasks((current) =>
          current.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  ...updates,
                }
              : task
          )
        );
      },

      deleteTask: (taskId) => {
        setTasks((current) =>
          current.filter(
            (task) => task.id !== taskId
          )
        );
      },

      toggleTask: (taskId) => {
        setTasks((current) =>
          current.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  completed: !task.completed,
                }
              : task
          )
        );
      },

      addGoal: (goal) => {
        setGoals((current) => [
          ...current,
          goal,
        ]);
      },

      updateGoal: (goalId, updates) => {
        setGoals((current) =>
          current.map((goal) =>
            goal.id === goalId
              ? {
                  ...goal,
                  ...updates,
                }
              : goal
          )
        );
      },

      deleteGoal: (goalId) => {
        setGoals((current) =>
          current.filter(
            (goal) => goal.id !== goalId
          )
        );
      },

      addHabit: (habit) => {
        setHabits((current) => [
          ...current,
          habit,
        ]);
      },

      updateHabit: (habitId, updates) => {
        setHabits((current) =>
          current.map((habit) =>
            habit.id === habitId
              ? {
                  ...habit,
                  ...updates,
                }
              : habit
          )
        );
      },

      deleteHabit: (habitId) => {
        setHabits((current) =>
          current.filter(
            (habit) => habit.id !== habitId
          )
        );
      },

      toggleHabitDay: (
        habitId,
        dayIndex
      ) => {
        setHabits((current) =>
          current.map((habit) => {
            if (habit.id !== habitId) {
              return habit;
            }

            const completed = [
              ...habit.completed,
            ];

            completed[dayIndex] =
              !completed[dayIndex];

            return {
              ...habit,
              completed,
            };
          })
        );
      },

      resetPlanner: () => {
        const initial = getInitialData();

        setTasks(initial.tasks);
        setGoals(initial.goals);
        setHabits(initial.habits);

        localStorage.removeItem(
          STORAGE_KEY
        );
      },
    }),
    [tasks, goals, habits]
  );

  return (
    <PlannerContext.Provider value={value}>
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const context = useContext(
    PlannerContext
  );

  if (!context) {
    throw new Error(
      "usePlanner must be used inside PlannerProvider"
    );
  }

  return context;
}