"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { DollarSign, Goal, Move } from 'lucide-react'

interface CategoryRowProps {
  category: {
    id: string;
    name: string;
    emoji: string;
    budgeted: number;
    activity: number;
    available: number;
  };
}

export function CategoryRow({ category }: CategoryRowProps) {
  const availableColorClass = category.available >= 0
    ? (category.available > 0 ? "text-success-green" : "text-muted-foreground")
    : "text-danger-red";

  const progressValue = (category.activity / category.budgeted) * 100;

  return (
    <div className="grid grid-cols-5 items-center gap-4 py-2 border-b last:border-b-0">
      <div className="col-span-2 flex items-center gap-2">
        <span className="text-xl">{category.emoji}</span>
        <span className="font-medium">{category.name}</span>
      </div>
      <div>
        <Input
          type="number"
          value={category.budgeted}
          onChange={(e) => console.log("Budgeted changed:", e.target.value)}
          className="w-full text-right"
        />
      </div>
      <div className="text-right text-muted-foreground">
        ${category.activity.toFixed(2)}
      </div>
      <div className="text-right">
        <span className={cn("font-bold", availableColorClass)}>
          ${category.available.toFixed(2)}
        </span>
        <Progress value={progressValue} className="h-2 mt-1" />
      </div>
      <div className="flex justify-end gap-1">
        <Button variant="ghost" size="icon" title="Move Money">
          <Move className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Set Goal">
          <Goal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
