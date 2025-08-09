"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, Label, Pie, PieChart } from "@/components/ui/chart"
import { ChartConfig } from "@/components/ui/chart"
import { ResponsiveContainer } from "recharts"

const chartData = [
  { category: "Groceries", amount: 800, fill: "var(--color-groceries)" },
  { category: "Rent", amount: 1500, fill: "var(--color-rent)" },
  { category: "Utilities", amount: 250, fill: "var(--color-utilities)" },
  { category: "Transport", amount: 300, fill: "var(--color-transport)" },
  { category: "Entertainment", amount: 400, fill: "var(--color-entertainment)" },
  { category: "Dining Out", amount: 350, fill: "var(--color-dining)" },
]

const chartConfig = {
  amount: {
    label: "Amount",
  },
  groceries: {
    label: "Groceries",
    color: "hsl(var(--chart-1))",
  },
  rent: {
    label: "Rent",
    color: "hsl(var(--chart-2))",
  },
  utilities: {
    label: "Utilities",
    color: "hsl(var(--chart-3))",
  },
  transport: {
    label: "Transport",
    color: "hsl(var(--chart-4))",
  },
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-5))",
  },
  dining: {
    label: "Dining Out",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig

export function SpendingChart() {
  const totalSpending = chartData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-col items-center justify-center p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="category" />} />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                innerRadius={60}
                outerRadius={80}
                strokeWidth={2}
                paddingAngle={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy - 10}
                            className="fill-foreground text-3xl font-bold"
                          >
                            ${totalSpending.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy + 10}
                            className="fill-muted-foreground text-sm"
                          >
                            Total Spent
                          </tspan>
                        </text>
                      )
                    }
                    return null
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex flex-wrap justify-center gap-2 p-4 text-sm">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center gap-1">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              {item.category}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
