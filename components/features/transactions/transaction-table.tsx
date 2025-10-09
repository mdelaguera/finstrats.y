"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, RefreshCw } from 'lucide-react'
import { ynabService, YNABTransaction, formatCurrency, formatDate } from "@/services/ynab"

export function TransactionTable() {
  const [transactions, setTransactions] = useState<YNABTransaction[]>([])
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [budgetId, setBudgetId] = useState<string>('')

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
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

      // Get recent transactions (last 30 days as example)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const sinceDate = thirtyDaysAgo.toISOString().split('T')[0]

      const { transactions: transactionsData } = await ynabService.getTransactions(
        defaultBudgetId,
        sinceDate
      )

      // Filter out deleted transactions and sort by date (newest first)
      const activeTransactions = transactionsData
        .filter(t => !t.deleted)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 50) // Limit to 50 most recent

      setTransactions(activeTransactions)
    } catch (error) {
      console.error('Error loading transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(transactions.map(t => t.id))
      setSelectedTransactions(allIds)
    } else {
      setSelectedTransactions(new Set())
    }
  }

  const handleSelectTransaction = (id: string, checked: boolean) => {
    setSelectedTransactions(prev => {
      const newSet = new Set(prev)
      if (checked) {
        newSet.add(id)
      } else {
        newSet.delete(id)
      }
      return newSet
    })
  }

  const getClearedStatus = (cleared: YNABTransaction['cleared']) => {
    switch (cleared) {
      case 'cleared':
        return <span className="text-green-600">✓</span>
      case 'reconciled':
        return <span className="text-blue-600">R</span>
      case 'uncleared':
      default:
        return <span className="text-muted-foreground">○</span>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 rounded-md border">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          Loading transactions...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {transactions.length} transactions (last 30 days)
        </div>
        <Button size="sm" variant="outline" onClick={loadTransactions}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedTransactions.size === transactions.length && transactions.length > 0}
                  onCheckedChange={(checked: boolean) => handleSelectAll(checked)}
                  aria-label="Select all transactions"
                />
              </TableHead>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Payee</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Memo</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center w-[80px]">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  No transactions found. Make sure your YNAB API key is configured.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => {
                const isOutflow = transaction.amount < 0
                const isInflow = transaction.amount > 0

                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedTransactions.has(transaction.id)}
                        onCheckedChange={(checked: boolean) => handleSelectTransaction(transaction.id, checked)}
                        aria-label={`Select transaction ${transaction.payeeName || 'Unknown'}`}
                      />
                    </TableCell>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell className="font-medium">
                      {transaction.payeeName || 'Unknown'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {transaction.categoryName || 'Uncategorized'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {transaction.memo || '—'}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      isOutflow ? 'text-red-600' : isInflow ? 'text-green-600' : ''
                    }`}>
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getClearedStatus(transaction.cleared)}
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
                          <DropdownMenuItem>Edit Category</DropdownMenuItem>
                          <DropdownMenuItem>Add Memo</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
