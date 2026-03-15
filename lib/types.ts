export const EXPENSE_CATEGORIES = [
  "food",
  "transport",
  "rent",
  "entertainment",
  "utilities",
  "shopping",
  "other",
] as const;

export const PAYMENT_METHODS = ["Cash", "Card", "UPI", "Bank Transfer", "Wallet"] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string;
  paymentMethod: PaymentMethod;
}
