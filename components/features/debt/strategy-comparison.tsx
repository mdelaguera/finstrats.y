"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"

const payoffTimelineData = [
  { month: "Jan 23", balance: 35500 },
  { month: "Jul 23", balance: 32000 },
  { month: "Jan 24", balance: 28000 },
  { month: "Jul 24", balance: 23000 },
  { month: "Jan 25", balance: 17000 },
  { month: "Jul 25", balance: 10000 },
  { month: "Jan 26", balance: 3000 },
  { month: "Oct 26", balance: 0 },
]

const chartConfig = {
  balance: {
    label: "Remaining Balance",
    color: "hsl(var(--primary-blue))",
  },
} satisfies ChartConfig

export function StrategyComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Debt Payoff Strategy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="avalanche" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="snowball">Snowball</TabsTrigger>
            <TabsTrigger value="avalanche">Avalanche</TabsTrigger>
          </TabsList>
          <TabsContent value="snowball" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Pay off smallest debt first to build momentum.
            </p>
            <Card className="bg-muted/20">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">AI Recommended Strategy</h4>
                <p className="text-sm">
                  Based on your psychological preference, Snowball is recommended for motivation.
                </p>
                <Button variant="outline" size="sm" className="mt-3">Apply Snowball Strategy</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="avalanche" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Pay off highest interest debt first to save most money.
            </p>
            <Card className="bg-muted/20">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">AI Recommended Strategy</h4>
                <p className="text-sm">
                  Based on financial optimization, Avalanche is recommended to save $1,200 in interest.
                </p>
                <Button variant="outline" size="sm" className="mt-3">Apply Avalanche Strategy</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div>
          <Label htmlFor="extra-payment" className="mb-2 block">Extra Payment Allocation</Label>
          <div className="flex items-center gap-4">
            <Slider id="extra-payment" defaultValue={[100]} max={500} step={10} className="w-[200px]" />
            <span className="font-medium">$100/month extra</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Adding $100 extra per month could reduce your payoff time by 6 months and save $300 in interest.
          </p>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Payoff Timeline Visualization</h3>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={payoffTimelineData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="balance"
                  type="monotone"
                  stroke="var(--color-balance)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
