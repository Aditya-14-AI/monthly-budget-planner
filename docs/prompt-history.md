# Prompt History — Monthly Expense Tracker

This document captures the **user prompts/instructions** used during iterative development of this web application.

## 1) Initial build request

> You are a senior frontend engineer. Build a modern monthly expense tracker dashboard.
>
> Tech stack:
> - Next.js (React + TypeScript)
> - TailwindCSS
> - shadcn/ui component library
> - Recharts for charts
> - Zustand or React state for data storage
> - Local storage persistence
>
> Features:
>
> Dashboard
> - total monthly spending card
> - budget remaining card
> - number of transactions card
>
> Expense management
> - add expense modal
> - fields:
>   - amount
>   - category
>   - description
>   - date
>   - payment method
>
> Categories
> - food
> - transport
> - rent
> - entertainment
> - utilities
> - shopping
> - other
>
> Charts
> - pie chart for spending by category
> - line chart for spending over time
> - bar chart for category comparison
>
> Tables
> - transaction table
> - sorting
> - delete expense
>
> UX/UI
> - responsive design
> - modern dashboard layout
> - sidebar navigation
> - smooth animations
> - clean financial dashboard style
> - Accessibility supported
> - Add dark mode toggle bar
>
> Pages
> - Dashboard
> - Expenses
> - Analytics
>
> Generate the full project with folder structure and all code files.

---

## 2) Budget behavior correction request

> budget remaining shows 5000 by default. I should have a option to add budget and after that it should show budget remaining

---

## 3) Discoverability/UX request for budget entry

> i cant see new change on app yet. How to click and enter my budget something a 10000

---

## 4) Git/branch workflow clarification request

> now do I need to raise a PR and merge conflict or just pull the code and start running it

---

## 5) Commit-history clarification request

> I can see below one. which changes are those?
>
> bd5b80f (HEAD -> main, origin/main, origin/HEAD) Merge pull request #3 from Aditya-14-AI/codex/build-monthly-expense-tracker-dashboard-gnuvti
> b780717 (origin/codex/build-monthly-expense-tracker-dashboard-gnuvti) Merge branch 'main' into codex/build-monthly-expense-tracker-dashboard-gnuvti
> e4dbd18 Add user-set monthly budget flow for budget remaining card
> e00c5c3 Merge pull request #1 from Aditya-14-AI/codex/build-monthly-expense-tracker-dashboard
> 262c5ef (origin/codex/build-monthly-expense-tracker-dashboard) Build monthly expense tracker dashboard with ...

---

## 6) Local run/install follow-up

> after running ...
>
> bd5b80f ...
> b780717 ...
> e4dbd18 ...
>
> npm install

---

## 7) Documentation request (current)

> Now can you create a document which shows all the prompts which I used for creating this web application.

---

## Notes

- This file intentionally focuses on the user prompts that drove implementation and iteration.
- It is written as an internal project artifact so future collaborators can understand product intent and change history.
