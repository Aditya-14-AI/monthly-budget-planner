"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MONTHLY_BUDGET } from "@/lib/constants";
import { Expense } from "@/lib/types";

interface ExpenseState {
  expenses: Expense[];
  monthlyBudget: number;
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: [],
      monthlyBudget: MONTHLY_BUDGET,
      addExpense: (expense) =>
        set((state) => ({
          expenses: [{ ...expense, id: crypto.randomUUID() }, ...state.expenses],
        })),
      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        })),
    }),
    {
      name: "monthly-expense-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
