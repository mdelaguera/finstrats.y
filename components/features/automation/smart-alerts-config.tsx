"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function SmartAlertsConfiguration() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Smart Alerts Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="overspend-alert">Budget Overspend Warnings</Label>
          <Switch id="overspend-alert" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="unusual-spending-alert">Unusual Spending Pattern Detection</Label>
          <Switch id="unusual-spending-alert" />
        </div>

        <div>
          <Label htmlFor="bill-reminder-days">Bill Reminder Settings</Label>
          <div className="flex items-center gap-2">
            <Input id="bill-reminder-days" type="number" defaultValue={3} className="w-20" />
            <span className="text-sm text-muted-foreground">days before due date</span>
          </div>
        </div>

        <div>
          <Label htmlFor="goal-milestone-notifications">Goal Milestone Notifications</Label>
          <Select>
            <SelectTrigger id="goal-milestone-notifications">
              <SelectValue placeholder="Notify me at..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25% progress</SelectItem>
              <SelectItem value="50">50% progress</SelectItem>
              <SelectItem value="75">75% progress</SelectItem>
              <SelectItem value="100">100% progress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="custom-alert-rules">Custom Alert Rules (Advanced)</Label>
          <Textarea id="custom-alert-rules" placeholder="e.g., IF transaction.amount > 500 AND transaction.category = 'Shopping' THEN alert 'Large Shopping Spree'" rows={4} />
          <p className="text-sm text-muted-foreground mt-1">Define custom rules for specific alerts.</p>
        </div>
      </CardContent>
    </Card>
  )
}
