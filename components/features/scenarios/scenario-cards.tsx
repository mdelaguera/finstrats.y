"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Briefcase, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react'

interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

const predefinedScenarios: Scenario[] = [
  {
    id: "s1",
    name: "Job Loss Simulation",
    description: "See how your finances hold up if you lose your income.",
    icon: Briefcase,
  },
  {
    id: "s2",
    name: "Major Purchase Planning",
    description: "Plan for a large expense like a car or home down payment.",
    icon: ShoppingCart,
  },
  {
    id: "s3",
    name: "Income Change Impact",
    description: "Analyze the effects of a raise or pay cut.",
    icon: TrendingUp,
  },
  {
    id: "s4",
    name: "Emergency Scenarios",
    description: "Model unexpected expenses like medical bills or home repairs.",
    icon: AlertTriangle,
  },
]

export function ScenarioCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {predefinedScenarios.map((scenario) => (
        <Card key={scenario.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">{scenario.name}</CardTitle>
            <scenario.icon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{scenario.description}</p>
            <Button variant="outline" className="w-full">Run Scenario</Button>
          </CardContent>
        </Card>
      ))}
      <Card className="flex flex-col items-center justify-center p-6 text-center border-dashed border-2">
        <Button variant="ghost" size="icon" className="h-12 w-12 mb-2">
          <Plus className="h-6 w-6" />
        </Button>
        <h3 className="text-lg font-semibold">Custom Scenario</h3>
        <p className="text-sm text-muted-foreground">Build your own what-if model.</p>
      </Card>
    </div>
  )
}
