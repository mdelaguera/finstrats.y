"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Check, X } from 'lucide-react'

interface PendingCategorization {
  id: string;
  date: string;
  payee: string;
  suggestedCategory: string;
  confidence: number;
}

const dummyPendingCategorizations: PendingCategorization[] = [
  { id: "pc1", date: "2023-10-26", payee: "Local Cafe", suggestedCategory: "Dining Out", confidence: 0.78 },
  { id: "pc2", date: "2023-10-25", payee: "Online Store", suggestedCategory: "Shopping", confidence: 0.85 },
  { id: "pc3", date: "2023-10-24", payee: "Gym Membership", suggestedCategory: "Health & Fitness", confidence: 0.91 },
]

export function AutoCategorizationPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Auto-Categorization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-categorization-toggle">Enable Auto-Categorization</Label>
          <Switch id="auto-categorization-toggle" defaultChecked />
        </div>

        <div>
          <Label htmlFor="confidence-threshold">Confidence Threshold (%)</Label>
          <Input id="confidence-threshold" type="number" defaultValue={80} min={0} max={100} className="w-24" />
          <p className="text-sm text-muted-foreground mt-1">Transactions with AI confidence above this threshold will be auto-categorized.</p>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Review Pending Categorizations</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Payee</TableHead>
                <TableHead>Suggested Category</TableHead>
                <TableHead className="text-right">Confidence</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyPendingCategorizations.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.payee}</TableCell>
                  <TableCell>{item.suggestedCategory}</TableCell>
                  <TableCell className="text-right">{(item.confidence * 100).toFixed(0)}%</TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button variant="ghost" size="icon" className="text-success-green">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-danger-red">
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {dummyPendingCategorizations.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No pending categorizations.</p>
          )}
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Training Data Management</h3>
          <Button variant="outline" className="w-full">View & Edit Training Data</Button>
          <p className="text-sm text-muted-foreground mt-1">Help improve AI accuracy by reviewing and correcting past categorizations.</p>
        </div>
      </CardContent>
    </Card>
  )
}
