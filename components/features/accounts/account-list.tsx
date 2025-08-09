"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Banknote, CreditCard, Wallet, MoreHorizontal } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "cash";
  balance: number;
  lastUpdated: string;
}

const dummyAccounts: Account[] = [
  { id: "1", name: "Main Checking", type: "checking", balance: 5230.50, lastUpdated: "2023-10-26" },
  { id: "2", name: "Emergency Savings", type: "savings", balance: 12000.00, lastUpdated: "2023-10-25" },
  { id: "3", name: "Credit Card (Visa)", type: "credit", balance: -850.75, lastUpdated: "2023-10-26" },
  { id: "4", name: "Petty Cash", type: "cash", balance: 120.00, lastUpdated: "2023-10-24" },
]

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
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Your Accounts</CardTitle>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add Account
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-right">Last Updated</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell className="capitalize flex items-center gap-2">
                  <AccountTypeIcon type={account.type} /> {account.type}
                </TableCell>
                <TableCell className={`text-right ${account.balance < 0 ? 'text-danger-red' : 'text-success-green'}`}>
                  ${account.balance.toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{account.lastUpdated}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
