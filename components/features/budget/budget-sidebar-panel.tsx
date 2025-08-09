"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function BudgetSidebarPanel() {
  return (
    <div className="w-full lg:w-72 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Unallocated Money</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-success-green">$1,250.00</div>
          <p className="text-sm text-muted-foreground">Ready to be budgeted</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Budget Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full">Budget Last Month's Spending</Button>
          <Button variant="outline" className="w-full">Budget Average Spent</Button>
          <Button variant="outline" className="w-full">Budget Zero Based</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI Budget Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Label htmlFor="ai-suggestions">Enable AI Suggestions</Label>
          <Switch id="ai-suggestions" />
        </CardContent>
      </Card>
    </div>
  )
}
