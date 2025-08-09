import { DebtOverviewCards } from "@/components/features/debt/debt-overview-cards"
import { DebtListTable } from "@/components/features/debt/debt-list-table"
import { StrategyComparison } from "@/components/features/debt/strategy-comparison"

export default function DebtStrategyPage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8">
      <h1 className="text-3xl font-bold mb-6">Debt Strategy</h1>

      <DebtOverviewCards />
      <DebtListTable />
      <StrategyComparison />
    </div>
  )
}
