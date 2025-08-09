"use client"

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
import { DropdownMenu, DropdownMenuContent, DropMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from 'lucide-react'
import { useState } from "react"

interface Transaction {
  id: string;
  date: string;
  payee: string;
  category: string;
  memo: string;
  outflow: number;
  inflow: number;
  cleared: boolean;
  aiConfidence?: number;
}

const dummyTransactions: Transaction[] = [
  {
    id: "1",
    date: "2023-10-26",
    payee: "Whole Foods",
    category: "Groceries",
    memo: "Weekly shopping",
    outflow: 75.23,
    inflow: 0,
    cleared: true,
    aiConfidence: 0.95,
  },
  {
    id: "2",
    date: "2023-10-25",
    payee: "Salary",
    category: "Income",
    memo: "Bi-weekly pay",
    outflow: 0,
    inflow: 2500.00,
    cleared: true,
    aiConfidence: 0.99,
  },
  {
    id: "3",
    date: "2023-10-24",
    payee: "Starbucks",
    category: "Dining Out",
    memo: "Morning coffee",
    outflow: 5.50,
    inflow: 0,
    cleared: false,
    aiConfidence: 0.88,
  },
  {
    id: "4",
    date: "2023-10-23",
    payee: "Netflix",
    category: "Entertainment",
    memo: "Monthly subscription",
    outflow: 15.99,
    inflow: 0,
    cleared: true,
    aiConfidence: 0.92,
  },
  {
    id: "5",
    date: " " ,
    payee: "Shell",
    category: "Transportation",
    memo: "Gas fill-up",
    outflow: 45.00,
    inflow: 0,
    cleared: false,
    aiConfidence: 0.75,
  },
]

export function TransactionTable() {
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(dummyTransactions.map(t => t.id));
      setSelectedTransactions(allIds);
    } else {
      setSelectedTransactions(new Set());
    }
  };

  const handleSelectTransaction = (id: string, checked: boolean) => {
    setSelectedTransactions(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedTransactions.size === dummyTransactions.length && dummyTransactions.length > 0}
                onCheckedChange={(checked: boolean) => handleSelectAll(checked)}
                aria-label="Select all transactions"
              />
            </TableHead>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Payee</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Memo</TableHead>
            <TableHead className="text-right">Outflow</TableHead>
            <TableHead className="text-right">Inflow</TableHead>
            <TableHead className="text-center">Cleared</TableHead>
            <TableHead className="text-center">AI</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <Checkbox
                  checked={selectedTransactions.has(transaction.id)}
                  onCheckedChange={(checked: boolean) => handleSelectTransaction(transaction.id, checked)}
                  aria-label={`Select transaction ${transaction.payee}`}
                />
              </TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.payee}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.memo}</TableCell>
              <TableCell className="text-right text-danger-red">
                {transaction.outflow > 0 ? `-$${transaction.outflow.toFixed(2)}` : ""}
              </TableCell>
              <TableCell className="text-right text-success-green">
                {transaction.inflow > 0 ? `$${transaction.inflow.toFixed(2)}` : ""}
              </TableCell>
              <TableCell className="text-center">
                {transaction.cleared ? (
                  <span className="text-success-green">✓</span>
                ) : (
                  <span className="text-muted-foreground">○</span>
                )}
              </TableCell>
              <TableCell className="text-center">
                {transaction.aiConfidence && transaction.aiConfidence > 0.8 ? (
                  <Badge variant="secondary" className="bg-primary-blue/20 text-primary-blue">
                    {(transaction.aiConfidence * 100).toFixed(0)}%
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-warning-yellow/20 text-warning-yellow">
                    {(transaction.aiConfidence * 100).toFixed(0)}%
                  </Badge>
                )}
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
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    <DropdownMenuItem>Split</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
