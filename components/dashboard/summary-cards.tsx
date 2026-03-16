"use client";

import { Wallet, PiggyBank, Receipt } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SetBudgetModal } from "@/components/dashboard/set-budget-modal";
import { useExpenseStore } from "@/store/use-expense-store";

export function SummaryCards() {
  const { expenses, monthlyBudget } = useExpenseStore();
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = monthlyBudget - total;

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Monthly Spending</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${total.toFixed(2)}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            {monthlyBudget > 0 ? (
              <>
                <p className="text-2xl font-bold">${remaining.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Budget: ${monthlyBudget.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Want to change it? Click "Update Budget".</p>
                <SetBudgetModal triggerLabel="Update Budget" />
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">No budget set yet.</p>
                <p className="text-xs text-muted-foreground">Click "Add Budget" and enter a value like 10000.</p>
                <SetBudgetModal triggerLabel="Add Budget" />
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{expenses.length}</p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
