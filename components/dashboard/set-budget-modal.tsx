"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useExpenseStore } from "@/store/use-expense-store";

interface SetBudgetModalProps {
  triggerLabel?: string;
}

export function SetBudgetModal({ triggerLabel = "Set Budget" }: SetBudgetModalProps) {
  const monthlyBudget = useExpenseStore((state) => state.monthlyBudget);
  const setMonthlyBudget = useExpenseStore((state) => state.setMonthlyBudget);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(monthlyBudget ? monthlyBudget.toString() : "");

  function submitBudget(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = Number(amount);

    if (!Number.isFinite(parsed) || parsed <= 0) return;

    setMonthlyBudget(parsed);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Wallet className="h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Monthly Budget</DialogTitle>
          <DialogDescription>Choose your spending limit for this month.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submitBudget} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="monthly-budget">Budget Amount</Label>
            <Input
              id="monthly-budget"
              type="number"
              min="0"
              step="0.01"
              placeholder="5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Save Budget</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
