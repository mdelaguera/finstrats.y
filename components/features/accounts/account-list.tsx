"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Banknote, CreditCard, Wallet, MoreHorizontal, Loader2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useBudget } from "@/contexts/budget-context"
import { getAccounts, YNABAccount } from "@/services/ynab"

interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "cash";
  balance: number;
  lastUpdated: string;
}

const AccountTypeIcon = ({ type }: { type: Account['type'] }) => {
  switch (type) {
    case "checking":
    case "savings":
      return <Banknote className="h-4 w-4 text-muted-foreground" />;
    case "credit":
      return <CreditCard className="h-4 w-4 text-muted-foreground" />;
    case "cash":
      return <Wallet className="h-4 w-4 text-muted-foreground" />;
    default:
      return null;
  }
}

export function AccountList() {
  const { selectedBudget } = useBudget()
  const [accounts, setAccounts] = useState<YNABAccount[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!selectedBudget) return

      try {
        setIsLoading(true)
        setError(null)
        const fetchedAccounts = await getAccounts(selectedBudget.id)
        setAccounts(fetchedAccounts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch accounts')
        console.error('Error fetching accounts:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccounts()
  }, [selectedBudget])

  // Convert YNAB account type to local type
  const getAccountType = (type: string): Account['type'] => {
    if (type === 'checking' || type === 'savings') return type
    if (type === 'creditCard') return 'credit'
    return 'cash'
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Your Accounts</CardTitle>
        <Button size="sm" disabled>
          <Plus className="h-4 w-4 mr-2" /> Add Account
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-red-500 mb-4 p-4 bg-red-50 dark:bg-red-950 rounded-md">
            {error}
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !selectedBudget ? (
          <div className="text-center py-8 text-muted-foreground">
            Please select a budget to view accounts
          </div>
        ) : accounts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No accounts found in this budget
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="text-right">Cleared Balance</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => {
                const accountType = getAccountType(account.type)
                const balance = account.balance / 1000 // Convert from milliunits
                const clearedBalance = account.clearedBalance / 1000

                return (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell className="capitalize flex items-center gap-2">
                      <AccountTypeIcon type={accountType} /> {accountType}
                    </TableCell>
                    <TableCell className={`text-right ${balance < 0 ? 'text-danger-red' : 'text-success-green'}`}>
                      ${balance.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      ${clearedBalance.toFixed(2)}
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
                          <DropdownMenuItem>Edit Account</DropdownMenuItem>
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
