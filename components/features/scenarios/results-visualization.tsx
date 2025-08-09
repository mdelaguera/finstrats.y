"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Bar, BarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"

const cashFlowData = [
  { month: "Jan", before: 1000, after: -500 },
  { month: "Feb", before: 1200, after: -700 },
  { month: "Mar", before: 1100, after: -600 },
  { month: "Apr", before: 1300, after: -800 },
  { month: "May", before: 1400, after: -900 },
  { month: "Jun", before: 1500, after: -1000 },
]

const budgetImpactData = [
  { category: "Groceries", before: 400, after: 200 },
  { category: "Dining Out", before: 200, after: 50 },
  { category: "Entertainment", before: 150, after: 0 },
  { category: "Transportation", before: 150, after: 100 },
]

const riskAssessmentData = [
  { metric: "Emergency Fund Depletion", value: 80, fill: "var(--color-risk1)" },
  { metric: "Debt Increase", value: 30, fill: "var(--color-risk2)" },
  { metric: "Savings Impact", value: 90, fill: "var(--color-risk3)" },
]

const cashFlowChartConfig = {
  before: {
    label: "Before Scenario",
    color: "hsl(var(--success-green))",
  },
  after: {
    label: "After Scenario",
    color: "hsl(var(--danger-red))",
  },
} satisfies ChartConfig

const budgetImpactChartConfig = {
  before: {
    label: "Before Scenario",
    color: "hsl(var(--primary-blue))",
  },
  after: {
    label: "After Scenario",
    color: "hsl(var(--warning-yellow))",
  },
} satisfies ChartConfig

const riskAssessmentChartConfig = {
  value: {
    label: "Impact (%)",
  },
  risk1: {
    label: "Emergency Fund Depletion",
    color: "hsl(var(--danger-red))",
  },
  risk2: {
    label: "Debt Increase",
    color: "hsl(var(--warning-yellow))",
  },
  risk3: {
    label: "Savings Impact",
    color: "hsl(var(--primary-blue))",
  },
} satisfies ChartConfig

export function ResultsVisualization() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Scenario Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="cash-flow" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
            <TabsTrigger value="budget-impact">Budget Impact</TabsTrigger>
            <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
          </TabsList>
          <TabsContent value="cash-flow" className="mt-4">
            <h3 className="text-md font-semibold mb-2">Cash Flow Projections</h3>
            <ChartContainer config={cashFlowChartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashFlowData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line dataKey="before" type="monotone" stroke="var(--color-before)" strokeWidth={2} dot={false} />
                  <Line dataKey="after" type="monotone" stroke="var(--color-after)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-2">
              Your monthly cash flow is projected to decrease by an average of $1,500.
            </p>
          </TabsContent>
          <TabsContent value="budget-impact" className="mt-4">
            <h3 className="text-md font-semibold mb-2">Budget Impact Breakdown</h3>
            <ChartContainer config={budgetImpactChartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetImpactData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="category" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="before" fill="var(--color-before)" radius={4} />
                  <Bar dataKey="after" fill="var(--color-after)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-2">
              Significant cuts needed in Dining Out and Entertainment categories.
            </p>
          </TabsContent>
          <TabsContent value="risk-assessment" className="mt-4">
            <h3 className="text-md font-semibold mb-2">Risk Assessment Indicators</h3>
            <ChartContainer config={riskAssessmentChartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={riskAssessmentData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid horizontal={false} />
                  <YAxis dataKey="metric" type="category" tickLine={false} axisLine={false} width={150} />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-2">
              High risk of emergency fund depletion within 3 months.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
