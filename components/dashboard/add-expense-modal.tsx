"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from "@/lib/types";
import { useExpenseStore } from "@/store/use-expense-store";

export function AddExpenseModal() {
  const addExpense = useExpenseStore((state) => state.addExpense);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ amount: "", category: "food", description: "", date: "", paymentMethod: "Card" });

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.amount || !form.description || !form.date) return;

    addExpense({
      amount: Number(form.amount),
      category: form.category as (typeof EXPENSE_CATEGORIES)[number],
      description: form.description,
      date: form.date,
      paymentMethod: form.paymentMethod as (typeof PAYMENT_METHODS)[number],
    });

    setForm({ amount: "", category: "food", description: "", date: "", paymentMethod: "Card" });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>Record a new transaction for this month.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={submitForm}>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" min="0" step="0.01" placeholder="120.50" value={form.amount} onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={form.category} onValueChange={(category) => setForm((prev) => ({ ...prev, category }))}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {EXPENSE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category[0].toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Lunch with team" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="payment">Payment Method</Label>
            <Select value={form.paymentMethod} onValueChange={(paymentMethod) => setForm((prev) => ({ ...prev, paymentMethod }))}>
              <SelectTrigger id="payment">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Save Expense</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
