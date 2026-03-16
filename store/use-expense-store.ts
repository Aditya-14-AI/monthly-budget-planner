"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Expense } from "@/lib/types";

interface ExpenseState {
  expenses: Expense[];
  monthlyBudget: number;
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  setMonthlyBudget: (amount: number) => void;
}

interface PersistedExpenseState {
  expenses?: Expense[];
  monthlyBudget?: number;
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: [],
      monthlyBudget: 0,
      addExpense: (expense) =>
        set((state) => ({
          expenses: [{ ...expense, id: crypto.randomUUID() }, ...state.expenses],
        })),
      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        })),
      setMonthlyBudget: (amount) => set({ monthlyBudget: amount }),
    }),
    {
      name: "monthly-expense-store",
      version: 2,
      migrate: (persistedState, version) => {
        const state = (persistedState ?? {}) as PersistedExpenseState;
        const expenses = state.expenses ?? [];
        const monthlyBudget = state.monthlyBudget ?? 0;

        // Legacy data could keep a default 5000 budget from older builds.
        // If user had no expenses and that default is present, reset to 0 so users can set their own value.
        if (version < 2 && monthlyBudget === 5000 && expenses.length === 0) {
          return { ...state, monthlyBudget: 0 } as ExpenseState;
        }

        return { ...state, expenses, monthlyBudget } as ExpenseState;
      },
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
