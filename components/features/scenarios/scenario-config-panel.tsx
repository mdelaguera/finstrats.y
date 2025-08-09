"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function ScenarioConfigurationPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Scenario Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="scenario-name">Scenario Name</Label>
          <Input id="scenario-name" placeholder="e.g., 6-Month Job Loss" />
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="income-reduction">Income Reduction (%)</Label>
              <Input id="income-reduction" type="number" defaultValue={100} min={0} max={100} />
            </div>
            <div>
              <Label htmlFor="duration-months">Duration (Months)</Label>
              <Input id="duration-months" type="number" defaultValue={6} min={1} />
            </div>
            <div>
              <Label htmlFor="emergency-fund-draw">Emergency Fund Draw ($)</Label>
              <Input id="emergency-fund-draw" type="number" defaultValue={1000} />
            </div>
            <div>
              <Label htmlFor="expense-reduction">Expense Reduction (%)</Label>
              <Input id="expense-reduction" type="number" defaultValue={20} min={0} max={100} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Assumptions</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="assume-unemployment">Assume Unemployment Benefits</Label>
              <Switch id="assume-unemployment" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="assume-side-hustle">Assume Side Hustle Income</Label>
              <Switch id="assume-side-hustle" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pause-savings">Pause Savings Goals</Label>
              <Switch id="pause-savings" defaultChecked />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" placeholder="Add any specific notes or considerations for this scenario." rows={3} />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Load Preset</Button>
          <Button>Save Scenario</Button>
          <Button variant="destructive">Run Simulation</Button>
        </div>
      </CardContent>
    </Card>
  )
}
