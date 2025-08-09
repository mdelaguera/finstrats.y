"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, GripVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DebtAccount {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  payoffOrder: number;
}

const dummyDebtAccounts: DebtAccount[] = [
  { id: "d1", name: "Credit Card A", balance: 5000, interestRate: 24.99, minimumPayment: 100, payoffOrder: 1 },
  { id: "d2", name: "Student Loan", balance: 20000, interestRate: 4.5, minimumPayment: 200, payoffOrder: 3 },
  { id: "d3", name: "Car Loan", balance: 10000, interestRate: 6.0, minimumPayment: 250, payoffOrder: 2 },
  { id: "d4", name: "Credit Card B", balance: 500, interestRate: 29.99, minimumPayment: 25, payoffOrder: 0 },
]

export function DebtListTable() {
  // In a real application, you'd use a drag-and-drop library here
  // and manage the payoffOrder state.
  const sortedAccounts = [...dummyDebtAccounts].sort((a, b) => a.payoffOrder - b.payoffOrder);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Debts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead> {/* For drag handle */}
              <TableHead>Account</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-right">Interest Rate</TableHead>
              <TableHead className="text-right">Min. Payment</TableHead>
              <TableHead className="text-center">Payoff Order</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAccounts.map((debt) => (
              <TableRow key={debt.id}>
                <TableCell>
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                </TableCell>
                <TableCell className="font-medium">{debt.name}</TableCell>
                <TableCell className="text-right text-danger-red">-${debt.balance.toFixed(2)}</TableCell>
                <TableCell className="text-right">{debt.interestRate.toFixed(2)}%</TableCell>
                <TableCell className="text-right">${debt.minimumPayment.toFixed(2)}</TableCell>
                <TableCell className="text-center">{debt.payoffOrder + 1}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Debt</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
