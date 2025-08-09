import { FinancialSummaryCards } from "@/components/features/dashboard/financial-summary-cards"
import { QuickStats } from "@/components/features/dashboard/quick-stats"
import { SpendingChart } from "@/components/features/dashboard/spending-chart"
import { CashFlowChart } from "@/components/features/dashboard/cash-flow-chart"
import { BudgetVsActualChart } from "@/components/features/dashboard/budget-vs-actual-chart"
import { NetWorthChart } from "@/components/features/dashboard/net-worth-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <section className="mb-8">
        <FinancialSummaryCards />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
        <QuickStats />
      </section>

      <section className="grid gap-6 lg:grid-cols-2 mb-8">
        <SpendingChart />
        <CashFlowChart />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <BudgetVsActualChart />
        <NetWorthChart />
      </section>
    </div>
  )
}
