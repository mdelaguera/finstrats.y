"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Banknote, CreditCard, Wallet, MoreHorizontal, RefreshCw } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ynabService, YNABAccount, formatCurrency, formatDate } from "@/services/ynab"

// Map YNAB account types to our simplified icon types
const getAccountIconType = (type: YNABAccount['type']): 'checking' | 'savings' | 'credit' | 'cash' => {
  switch (type) {
    case 'checking':
      return 'checking'
    case 'savings':
      return 'savings'
    case 'creditCard':
    case 'lineOfCredit':
      return 'credit'
    case 'cash':
      return 'cash'
    default:
      return 'checking'
  }
}

const AccountTypeIcon = ({ type }: { type: YNABAccount['type'] }) => {
  const iconType = getAccountIconType(type)
  switch (iconType) {
    case "checking":
    case "savings":
      return <Banknote className="h-4 w-4 text-muted-foreground" />
    case "credit":
      return <CreditCard className="h-4 w-4 text-muted-foreground" />
    case "cash":
      return <Wallet className="h-4 w-4 text-muted-foreground" />
    default:
      return null
  }
}

export function AccountList() {
  const [accounts, setAccounts] = useState<YNABAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [budgetId, setBudgetId] = useState<string>('')

  useEffect(() => {
    loadAccounts()
  }, [])

  const loadAccounts = async () => {
    try {
      setLoading(true)

      // First, get the default budget
      const budgets = await ynabService.getBudgets()
      if (budgets.length === 0) {
        console.warn('No budgets found')
        return
      }

      const defaultBudgetId = budgets[0].id
      setBudgetId(defaultBudgetId)

      // Then get accounts for that budget
      const accountsData = await ynabService.getAccounts(defaultBudgetId)

      // Filter out closed and deleted accounts
      const activeAccounts = accountsData.filter(
        account => !account.closed && !account.deleted
      )

      setAccounts(activeAccounts)
    } catch (error) {
      console.error('Error loading accounts:', error)
    } finally {
      setLoading(false)
    }
  }

  const getAccountTypeName = (type: YNABAccount['type']): string => {
    switch (type) {
      case 'checking':
        return 'Checking'
      case 'savings':
        return 'Savings'
      case 'creditCard':
        return 'Credit Card'
      case 'cash':
        return 'Cash'
      case 'lineOfCredit':
        return 'Line of Credit'
      case 'otherAsset':
        return 'Asset'
      case 'otherLiability':
        return 'Liability'
      default:
        return type
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Loading accounts...
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Your Accounts</CardTitle>
        <Button size="sm" onClick={loadAccounts} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-right">Cleared</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No accounts found. Make sure your YNAB API key is configured.
                </TableCell>
              </TableRow>
            ) : (
              accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <AccountTypeIcon type={account.type} />
                    {getAccountTypeName(account.type)}
                  </TableCell>
                  <TableCell className={`text-right ${account.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(account.balance)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(account.clearedBalance)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>View Transactions</DropdownMenuItem>
                        <DropdownMenuItem>Reconcile</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
