"use client"

import { useState, useEffect } from "react"
import { BudgetHeader } from "@/components/features/budget/budget-header"
import { CategoryGroup } from "@/components/features/budget/category-group"
import { BudgetSidebarPanel } from "@/components/features/budget/budget-sidebar-panel"
import { useBudget } from "@/contexts/budget-context"
import { getCategoryGroups, YNABCategoryGroup } from "@/services/ynab"
import { Loader2 } from "lucide-react"

export default function BudgetsPage() {
  const { selectedBudget } = useBudget()
  const [categoryGroups, setCategoryGroups] = useState<YNABCategoryGroup[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedBudget) return

      try {
        setIsLoading(true)
        setError(null)
        const fetchedGroups = await getCategoryGroups(selectedBudget.id)
        setCategoryGroups(fetchedGroups)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories')
        console.error('Error fetching categories:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [selectedBudget])

  // Convert YNAB category groups to the format expected by CategoryGroup component
  const formatCategoryGroups = (groups: YNABCategoryGroup[]) => {
    return groups.map(group => ({
      id: group.id,
      name: group.name,
      categories: group.categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        emoji: "📊", // You can add emoji mapping based on category names
        budgeted: cat.budgeted / 1000, // Convert from milliunits
        activity: cat.activity / 1000,
        available: cat.balance / 1000,
      }))
    }))
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Budget Management</h1>
        <BudgetHeader />
        {error && (
          <div className="text-red-500 mb-4 p-4 bg-red-50 dark:bg-red-950 rounded-md">
            {error}
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !selectedBudget ? (
          <div className="text-center py-8 text-muted-foreground">
            Please select a budget to view categories
          </div>
        ) : categoryGroups.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No category groups found in this budget
          </div>
        ) : (
          <div className="space-y-4">
            {formatCategoryGroups(categoryGroups).map((group) => (
              <CategoryGroup key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>
      <BudgetSidebarPanel />
    </div>
  )
}
