"use client";

import { Wallet, PiggyBank, Receipt } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenseStore } from "@/store/use-expense-store";

export function SummaryCards() {
  const { expenses, monthlyBudget } = useExpenseStore();
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = monthlyBudget - total;

  const cards = [
    { label: "Total Monthly Spending", value: `$${total.toFixed(2)}`, icon: Wallet },
    { label: "Budget Remaining", value: `$${remaining.toFixed(2)}`, icon: PiggyBank },
    { label: "Transactions", value: `${expenses.length}`, icon: Receipt },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map((card, index) => (
        <motion.div key={card.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
