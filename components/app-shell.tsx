import { ThemeToggle } from "@/components/theme-toggle";
import { Sidebar } from "@/components/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <div className="flex-1">
        <header className="sticky top-0 z-30 border-b bg-background/80 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Monthly Budget Planner</p>
            <ThemeToggle />
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
