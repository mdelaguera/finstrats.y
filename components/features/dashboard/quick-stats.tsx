"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Clock, Goal } from 'lucide-react'

export function QuickStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Age of Money</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">35 Days</div>
          <p className="text-xs text-muted-foreground">Recommended: 30+ days</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Emergency Fund</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,000 / $15,000</div>
          <Progress value={80} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">80% funded</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Goals Progress</CardTitle>
          <Goal className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium">Vacation Fund ($1,500 / $2,000)</p>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <p className="text-sm font-medium">New Car Down Payment ($5,000 / $10,000)</p>
              <Progress value={50} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
