"use client";

import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { ArrowUpDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Expense } from "@/lib/types";
import { useExpenseStore } from "@/store/use-expense-store";

type SortKey = "amount" | "date" | "category";

export function TransactionTable() {
  const expenses = useExpenseStore((state) => state.expenses);
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);
  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");

  const sortedData = useMemo(() => {
    return [...expenses].sort((a, b) => {
      const directionModifier = direction === "asc" ? 1 : -1;

      if (sortBy === "amount") return (a.amount - b.amount) * directionModifier;
      if (sortBy === "category") return a.category.localeCompare(b.category) * directionModifier;
      return a.date.localeCompare(b.date) * directionModifier;
    });
  }, [direction, expenses, sortBy]);

  function toggleSort(sortKey: SortKey) {
    if (sortBy === sortKey) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortBy(sortKey);
    setDirection("asc");
  }

  return (
    <div className="rounded-xl border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHead label="Date" onClick={() => toggleSort("date")} />
              <SortableHead label="Amount" onClick={() => toggleSort("amount")} />
              <SortableHead label="Category" onClick={() => toggleSort("category")} />
              <TableHead>Description</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{format(parseISO(expense.date), "PP")}</TableCell>
                <TableCell className="font-medium">${expense.amount.toFixed(2)}</TableCell>
                <TableCell className="capitalize">{expense.category}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => deleteExpense(expense.id)} aria-label="Delete expense">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {sortedData.length === 0 && (
              <TableRow>
                <TableCell className="text-center text-muted-foreground" colSpan={6}>
                  No expenses yet. Add your first transaction.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function SortableHead({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <TableHead>
      <button className="inline-flex items-center gap-1" onClick={onClick}>
        {label}
        <ArrowUpDown className="h-3.5 w-3.5" />
      </button>
    </TableHead>
  );
}
