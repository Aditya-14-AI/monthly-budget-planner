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
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
