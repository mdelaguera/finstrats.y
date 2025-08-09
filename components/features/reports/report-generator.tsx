"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Download } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { DateRange } from "react-day-picker"

export function ReportGenerator() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Generate Reports</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="report-type">Report Type</Label>
          <Select>
            <SelectTrigger id="report-type">
              <SelectValue placeholder="Select a report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="net-worth">Net Worth Report</SelectItem>
              <SelectItem value="spending-by-category">Spending by Category</SelectItem>
              <SelectItem value="cash-flow">Cash Flow Statement</SelectItem>
              <SelectItem value="transaction-summary">Transaction Summary</SelectItem>
              <SelectItem value="debt-progress">Debt Progress Report</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Select a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="export-format">Export Format</Label>
          <Select>
            <SelectTrigger id="export-format">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="xlsx">XLSX</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full">
          <Download className="h-4 w-4 mr-2" /> Generate & Download Report
        </Button>
      </CardContent>
    </Card>
  )
}
