"use client";

import { format, parseISO } from "date-fns";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CATEGORY_COLORS } from "@/lib/constants";
import { EXPENSE_CATEGORIES } from "@/lib/types";
import { useExpenseStore } from "@/store/use-expense-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function useChartData() {
  const expenses = useExpenseStore((state) => state.expenses);

  const byCategory = EXPENSE_CATEGORIES.map((category) => ({
    category,
    total: expenses.filter((expense) => expense.category === category).reduce((sum, expense) => sum + expense.amount, 0),
  })).filter((entry) => entry.total > 0);

  const byDateMap = expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.date] = (acc[expense.date] ?? 0) + expense.amount;
    return acc;
  }, {});

  const byDate = Object.entries(byDateMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, total]) => ({ date: format(parseISO(date), "MMM d"), total }));

  return { byCategory, byDate };
}

export function ExpenseCharts() {
  const { byCategory, byDate } = useChartData();

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={byCategory} dataKey="total" nameKey="category" innerRadius={70} outerRadius={110}>
                {byCategory.map((entry) => (
                  <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spending Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={byDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Category Comparison</CardTitle>
        </CardHeader>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                {byCategory.map((entry) => (
                  <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  );
}
