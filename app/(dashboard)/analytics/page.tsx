import { ExpenseCharts } from "@/components/dashboard/charts";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Visualize spending trends with interactive charts.</p>
      </div>
      <ExpenseCharts />
    </div>
  );
}
