import { BudgetHeader } from "@/components/features/budget/budget-header"
import { CategoryGroup } from "@/components/features/budget/category-group"
import { BudgetSidebarPanel } from "@/components/features/budget/budget-sidebar-panel"

const dummyBudgetGroups = [
  {
    id: "1",
    name: "Immediate Obligations",
    categories: [
      { id: "c1", name: "Rent", emoji: "🏠", budgeted: 1500, activity: -1500, available: 0 },
      { id: "c2", name: "Electricity", emoji: "💡", budgeted: 100, activity: -85, available: 15 },
      { id: "c3", name: "Internet", emoji: "📡", budgeted: 70, activity: -70, available: 0 },
      { id: "c4", name: "Phone Bill", emoji: "📱", budgeted: 50, activity: -50, available: 0 },
    ],
  },
  {
    id: "2",
    name: "Everyday Expenses",
    categories: [
      { id: "c5", name: "Groceries", emoji: "🍎", budgeted: 400, activity: -380, available: 20 },
      { id: "c6", name: "Dining Out", emoji: "🍔", budgeted: 200, activity: -250, available: -50 },
      { id: "c7", name: "Transportation", emoji: "🚗", budgeted: 150, activity: -120, available: 30 },
      { id: "c8", name: "Personal Care", emoji: "🧴", budgeted: 80, activity: -60, available: 20 },
    ],
  },
  {
    id: "3",
    name: "Savings Goals",
    categories: [
      { id: "c9", name: "Emergency Fund", emoji: "🚨", budgeted: 200, activity: 0, available: 200 },
      { id: "c10", name: "Vacation", emoji: "✈️", budgeted: 100, activity: 0, available: 100 },
      { id: "c11", name: "New Gadget", emoji: "💻", budgeted: 50, activity: 0, available: 50 },
    ],
  },
]

export default function BudgetsPage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Budget Management</h1>
        <BudgetHeader />
        <div className="space-y-4">
          {dummyBudgetGroups.map((group) => (
            <CategoryGroup key={group.id} group={group} />
          ))}
        </div>
      </div>
      <BudgetSidebarPanel />
    </div>
  )
}
