"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const chartData = [
  { category: "Groceries", budgeted: 700, actual: 800 },
  { category: "Utilities", budgeted: 200, actual: 250 },
  { category: "Transport", budgeted: 350, actual: 300 },
  { category: "Entertainment", budgeted: 300, actual: 400 },
  { category: "Dining Out", budgeted: 300, actual: 350 },
]

const chartConfig = {
  budgeted: {
    label: "Budgeted",
    color: "hsl(var(--primary-blue))",
  },
  actual: {
    label: "Actual",
    color: "hsl(var(--warning-yellow))",
  },
} satisfies ChartConfig

export function BudgetVsActualChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs. Actual Spending</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="category" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="budgeted" fill="var(--color-budgeted)" radius={4} />
              <Bar dataKey="actual" fill="var(--color-actual)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
