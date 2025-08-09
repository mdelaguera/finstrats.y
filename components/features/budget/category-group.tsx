"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryRow } from "./category-row"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from 'lucide-react'
import { useState } from "react"
import { cn } from "@/lib/utils"

interface CategoryGroupProps {
  group: {
    id: string;
    name: string;
    categories: Array<{
      id: string;
      name: string;
      emoji: string;
      budgeted: number;
      activity: number;
      available: number;
    }>;
  };
}

export function CategoryGroup({ group }: CategoryGroupProps) {
  const [isOpen, setIsOpen] = useState(true)

  const totalBudgeted = group.categories.reduce((sum, cat) => sum + cat.budgeted, 0)
  const totalActivity = group.categories.reduce((sum, cat) => sum + cat.activity, 0)
  const totalAvailable = group.categories.reduce((sum, cat) => sum + cat.available, 0)

  const availableColorClass = totalAvailable >= 0
    ? (totalAvailable > 0 ? "text-success-green" : "text-muted-foreground")
    : "text-danger-red";

  return (
    <Card className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <CollapsibleTrigger asChild>
            <div className="flex-1 flex items-center gap-2 cursor-pointer">
              <ChevronDown className={cn("h-4 w-4 transition-transform", !isOpen && "-rotate-90")} />
              <CardTitle className="text-lg font-semibold">{group.name}</CardTitle>
            </div>
          </CollapsibleTrigger>
          <div className="grid grid-cols-3 text-right gap-4 w-2/5 min-w-[300px] hidden md:grid">
            <span className="text-sm font-medium text-muted-foreground">Budgeted</span>
            <span className="text-sm font-medium text-muted-foreground">Activity</span>
            <span className="text-sm font-medium text-muted-foreground">Available</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <CollapsibleContent>
            <div className="p-4">
              {group.categories.map((category) => (
                <CategoryRow key={category.id} category={category} />
              ))}
            </div>
          </CollapsibleContent>
          <div className="grid grid-cols-5 items-center gap-4 py-2 px-4 bg-muted/50 font-semibold">
            <div className="col-span-2">Total {group.name}</div>
            <div className="text-right">${totalBudgeted.toFixed(2)}</div>
            <div className="text-right text-muted-foreground">${totalActivity.toFixed(2)}</div>
            <div className="text-right">
              <span className={cn(availableColorClass)}>${totalAvailable.toFixed(2)}</span>
            </div>
            <div></div> {/* For action buttons column */}
          </div>
        </CardContent>
      </Collapsible>
    </Card>
  )
}
