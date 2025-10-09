"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Banknote, CreditCard, Wallet, MoreHorizontal, Loader2, RefreshCw } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useBudget } from "@/contexts/budget-context"
import { getAccounts, YNABAccount } from "@/services/ynab"

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

const AccountTypeIcon = ({ type }: { type: ReturnType<typeof getAccountIconType> }) => {
  switch (type) {
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

const formatCurrency = (milliunits: number): string => {
  const amount = milliunits / 1000
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function AccountList() {
  const { selectedBudget } = useBudget()
  const [accounts, setAccounts] = useState<YNABAccount[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAccounts = async () => {
    if (!selectedBudget) return

    try {
      setIsLoading(true)
      setError(null)
      const fetchedAccounts = await getAccounts(selectedBudget.id)

      // Filter out closed and deleted accounts
      const activeAccounts = fetchedAccounts.filter(
        account => !account.closed && !account.deleted
      )

      setAccounts(activeAccounts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch accounts')
      console.error('Error fetching accounts:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [selectedBudget])

  if (isLoading && accounts.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
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
        <Button
          size="sm"
          onClick={fetchAccounts}
          variant="outline"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-red-500 mb-4 p-4 bg-red-50 dark:bg-red-950 rounded-md">
            {error}
          </div>
        )}
        {!selectedBudget ? (
          <div className="text-center py-8 text-muted-foreground">
            Please select a budget to view accounts
          </div>
        ) : accounts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No accounts found. Make sure your YNAB API key is configured.
          </div>
        ) : (
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
              {accounts.map((account) => {
                const iconType = getAccountIconType(account.type)

                return (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <AccountTypeIcon type={iconType} />
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
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
