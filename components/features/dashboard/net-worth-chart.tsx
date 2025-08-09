"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartConfig } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const chartData = [
  { month: "Jan", netWorth: 200000 },
  { month: "Feb", netWorth: 205000 },
  { month: "Mar", netWorth: 210000 },
  { month: "Apr", netWorth: 220000 },
  { month: "May", netWorth: 235000 },
  { month: "Jun", netWorth: 250000 },
]

const chartConfig = {
  netWorth: {
    label: "Net Worth",
    color: "hsl(var(--primary-blue))",
  },
} satisfies ChartConfig

export function NetWorthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Net Worth Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="netWorth"
                type="monotone"
                fill="var(--color-netWorth)"
                stroke="var(--color-netWorth)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
