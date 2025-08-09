"use client"

import * as React from "react"
import Link from "next/link"
import { Bell, Search, Plus, DollarSign, Send, Wallet, Handshake, PanelLeft, LayoutDashboard, ChevronDown } from 'lucide-react' // Added PanelLeft and LayoutDashboard

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSidebar } from "@/components/sidebar" // Assuming useSidebar is exported from sidebar.tsx
import { ThemeToggle } from "@/components/theme-toggle"

export function TopNav() {
  const { toggleSidebar } = useSidebar()
  const [searchOpen, setSearchOpen] = React.useState(false)

  const budgets = [
    { id: "1", name: "My Personal Budget" },
    { id: "2", name: "Business Budget" },
    { id: "3", name: "Vacation Fund" },
  ]

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="sm:hidden"
        onClick={toggleSidebar}
      >
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      {/* Current Budget Selector */}
      <div className="relative hidden sm:block">
        <Select defaultValue={budgets[0].id}>
          <SelectTrigger className="w-[180px]">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Select Budget" />
          </SelectTrigger>
          <SelectContent>
            {budgets.map((budget) => (
              <SelectItem key={budget.id} value={budget.id}>
                {budget.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search Bar */}
      <div className="relative ml-auto flex-1 md:grow-0">
        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
            >
              <Search className="h-4 w-4" />
              <span className="ml-2 hidden lg:inline-block">Search transactions...</span>
              <span className="ml-auto hidden sm:block text-xs text-muted-foreground">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search transactions, payees..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Recent Searches">
                  <CommandItem>Groceries</CommandItem>
                  <CommandItem>Rent Payment</Command-Item>
                </CommandGroup>
                <CommandGroup heading="Suggestions">
                  <CommandItem>Categorize pending transactions</CommandItem>
                  <CommandItem>Review budget for July</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Quick Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Quick Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DollarSign className="mr-2 h-4 w-4" /> Add Funds
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Send className="mr-2 h-4 w-4" /> Send Money
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Wallet className="mr-2 h-4 w-4" /> Top Up Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Handshake className="mr-2 h-4 w-4" /> Request Money
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Notification Bell */}
      <Button variant="outline" size="icon" className="relative h-8 w-8">
        <Bell className="h-4 w-4" />
        <Badge variant="destructive" className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
          3
        </Badge>
        <span className="sr-only">Notifications</span>
      </Button>

      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt="User Avatar" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ThemeToggle />
    </header>
  )
}
