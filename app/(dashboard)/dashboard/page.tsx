import { AddExpenseModal } from "@/components/dashboard/add-expense-modal";
import { ExpenseCharts } from "@/components/dashboard/charts";
import { SetBudgetModal } from "@/components/dashboard/set-budget-modal";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { TransactionTable } from "@/components/dashboard/transaction-table";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Track your expenses and stay on budget.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SetBudgetModal triggerLabel="Set Budget" />
          <AddExpenseModal />
        </div>
      </div>
      <SummaryCards />
      <ExpenseCharts />
      <section className="space-y-3">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>
        <TransactionTable />
      </section>
    </div>
  );
}
