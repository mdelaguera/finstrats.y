"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  TrendingDown,
  DollarSign,
  Calendar,
  Target,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Calculator,
  RefreshCw
} from "lucide-react"
import { ynabService, YNABAccount, formatCurrency, YNABService } from "@/services/ynab"
import { enhancedAIService, DebtAnalysis, DebtAccount } from "@/services/enhanced-ai"

export function DebtStrategyOptimizer() {
  const [debtAnalysis, setDebtAnalysis] = useState<DebtAnalysis | null>(null)
  const [extraPayment, setExtraPayment] = useState(0)
  const [selectedStrategy, setSelectedStrategy] = useState<'avalanche' | 'snowball' | 'custom'>('avalanche')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDebtAnalysis()
  }, [])

  const loadDebtAnalysis = async () => {
    try {
      setLoading(true)

      // Get the default budget
      const budgets = await ynabService.getBudgets()
      if (budgets.length === 0) {
        console.warn('No budgets found')
        setLoading(false)
        return
      }

      const defaultBudgetId = budgets[0].id

      // Get all accounts
      const accounts = await ynabService.getAccounts(defaultBudgetId)

      // Filter for debt accounts (credit cards, line of credit, other liabilities)
      // Debt accounts have negative balances
      const debtAccounts = accounts.filter(account =>
        !account.closed &&
        !account.deleted &&
        account.balance < 0 && // Debt has negative balance
        (account.type === 'creditCard' ||
         account.type === 'lineOfCredit' ||
         account.type === 'otherLiability')
      )

      if (debtAccounts.length === 0) {
        setDebtAnalysis(null)
        setLoading(false)
        return
      }

      // Convert YNAB accounts to debt account format
      // Note: We'll need to get additional info like APR from user input or another source
      // For now, we'll use the enhanced AI service's mock data but with real YNAB balances
      const debtAccountsData = debtAccounts.map(account => ({
        id: account.id,
        name: account.name,
        // Convert milliunits to dollars (YNAB balance is in milliunits)
        balance: Math.abs(YNABService.convertMilliunitsToCurrency(account.balance)),
        type: account.type,
      }))

      const analysis = await enhancedAIService.analyzeDebt(debtAccountsData)
      setDebtAnalysis(analysis)
    } catch (error) {
      console.error('Error loading debt analysis:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateOptimizedPayoff = (strategy: 'avalanche' | 'snowball', extraAmount: number) => {
    if (!debtAnalysis) return null

    // Simulate different strategies
    let accounts = [...debtAnalysis.accounts]

    if (strategy === 'avalanche') {
      // Sort by interest rate (highest first)
      accounts.sort((a, b) => b.interestRate - a.interestRate)
    } else {
      // Sort by balance (lowest first)
      accounts.sort((a, b) => a.balance - b.balance)
    }

    // Calculate new payoff timeline with extra payments
    let totalMonthsSaved = 0
    let totalInterestSaved = 0

    accounts.forEach((account, index) => {
      const extraForThisAccount = index === 0 ? extraAmount : 0
      const newPayment = account.minimumPayment + extraForThisAccount

      if (newPayment > account.minimumPayment) {
        const monthlyInterest = account.interestRate / 12
        const newMonths = Math.ceil(
          Math.log(1 + (account.balance * monthlyInterest) / newPayment) /
          Math.log(1 + monthlyInterest)
        )

        const monthsSaved = account.monthsToPayoff - newMonths
        const interestSaved = (account.minimumPayment * account.monthsToPayoff - account.balance) -
                             (newPayment * newMonths - account.balance)

        totalMonthsSaved += monthsSaved
        totalInterestSaved += interestSaved
      }
    })

    return {
      monthsSaved: totalMonthsSaved,
      interestSaved: totalInterestSaved,
      newPayoffDate: new Date(Date.now() + (debtAnalysis.accounts[0].monthsToPayoff - totalMonthsSaved) * 30 * 24 * 60 * 60 * 1000)
    }
  }

  const optimizedResults = calculateOptimizedPayoff(selectedStrategy, extraPayment)

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Analyzing your debt strategy...
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!debtAnalysis) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <TrendingDown className="h-12 w-12 mx-auto text-gray-400" />
            <div>
              <h3 className="text-lg font-semibold mb-2">No Debt Found</h3>
              <p className="text-muted-foreground">
                Great job! You don't have any debt accounts in YNAB, or they may not be configured yet.
              </p>
            </div>
            <Button onClick={loadDebtAnalysis} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Debt Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-red-600">
                  ${debtAnalysis.totalDebt.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Debt</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">
                  ${debtAnalysis.monthlyPayments.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Monthly Payments</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {new Date(debtAnalysis.estimatedPayoffDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
                <div className="text-sm text-muted-foreground">Payoff Date</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  ${debtAnalysis.interestSavings.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Interest Savings</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategy Comparison */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Debt Payoff Strategy Optimizer
              </CardTitle>
              <CardDescription>
                Optimize your debt payoff strategy and see the impact of extra payments
              </CardDescription>
            </div>
            <Button onClick={loadDebtAnalysis} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedStrategy} onValueChange={(value) => setSelectedStrategy(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="avalanche">Avalanche Method</TabsTrigger>
              <TabsTrigger value="snowball">Snowball Method</TabsTrigger>
              <TabsTrigger value="custom">Custom Strategy</TabsTrigger>
            </TabsList>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Extra Monthly Payment: ${extraPayment}
                </label>
                <Slider
                  value={[extraPayment]}
                  onValueChange={(value) => setExtraPayment(value[0])}
                  max={1000}
                  step={25}
                  className="w-full"
                />
              </div>

              {optimizedResults && extraPayment > 0 && (
                <Alert>
                  <TrendingDown className="h-4 w-4" />
                  <AlertDescription>
                    <strong>With ${extraPayment} extra monthly payment:</strong>
                    <br />
                    • Pay off debt {optimizedResults.monthsSaved} months earlier
                    <br />
                    • Save ${optimizedResults.interestSaved.toLocaleString()} in interest
                    <br />
                    • New payoff date: {optimizedResults.newPayoffDate.toLocaleDateString()}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <TabsContent value="avalanche" className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Avalanche Method</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Pay minimums on all debts, then put all extra money toward the debt with the highest interest rate.
                  This method saves the most money in interest over time.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="snowball" className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-100">Snowball Method</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Pay minimums on all debts, then put all extra money toward the smallest debt balance.
                  This method provides quick psychological wins to keep you motivated.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100">Custom Strategy</h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Drag and drop to reorder your debt payoff priority based on your preferences.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Debt Account Details */}
      <Card>
        <CardHeader>
          <CardTitle>Debt Account Details</CardTitle>
          <CardDescription>
            Current status and payoff projections for each debt account (from YNAB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {debtAnalysis.accounts
              .sort((a, b) => selectedStrategy === 'avalanche' ?
                b.interestRate - a.interestRate :
                a.balance - b.balance
              )
              .map((account, index) => (
              <Card key={account.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-300">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{account.name}</h4>
                      <div className="text-sm text-muted-foreground">
                        {(account.interestRate * 100).toFixed(1)}% APR
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">
                      ${account.balance.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${account.minimumPayment}/month
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Payoff Timeline</div>
                    <div className="font-semibold">{account.monthsToPayoff} months</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                    <div className="font-semibold text-red-600">
                      ${account.totalInterest.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Priority</div>
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index === 0 ? "Focus" : `#${index + 1}`}
                    </Badge>
                  </div>
                </div>

                {/* Progress bar showing payoff progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>15% paid off</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Alert>
              <ArrowUp className="h-4 w-4" />
              <AlertDescription>
                <strong>Increase your extra payment to $200/month</strong> to save an additional
                $1,200 in interest and pay off debt 8 months earlier.
              </AlertDescription>
            </Alert>

            <Alert>
              <DollarSign className="h-4 w-4" />
              <AlertDescription>
                <strong>Consider a balance transfer</strong> for high-interest cards
                to save on interest over time.
              </AlertDescription>
            </Alert>

            <Alert>
              <Target className="h-4 w-4" />
              <AlertDescription>
                <strong>Automate your strategy</strong> by setting up automatic extra payments
                to stay on track with your debt payoff plan.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
