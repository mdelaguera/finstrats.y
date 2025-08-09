"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartConfig } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const chartData = [
  { month: "Jan", income: 4000, expenses: 2500 },
  { month: "Feb", income: 4200, expenses: 2700 },
  { month: "Mar", income: 4500, expenses: 2800 },
  { month: "Apr", income: 4300, expenses: 2600 },
  { month: "May", income: 4800, expenses: 3000 },
  { month: "Jun", income: 5000, expenses: 3200 },
]

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--success-green))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--danger-red))",
  },
} satisfies ChartConfig

export function CashFlowChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                dataKey="income"
                type="monotone"
                stroke="var(--color-income)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="expenses"
                type="monotone"
                stroke="var(--color-expenses)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
