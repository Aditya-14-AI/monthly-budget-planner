import { AddExpenseModal } from "@/components/dashboard/add-expense-modal";
import { TransactionTable } from "@/components/dashboard/transaction-table";

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">Manage all transactions and keep records tidy.</p>
        </div>
        <AddExpenseModal />
      </div>
      <TransactionTable />
    </div>
  );
}
