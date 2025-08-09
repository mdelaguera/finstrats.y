"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, X, Download } from 'lucide-react'

interface BulkActionsProps {
  selectedCount: number;
  onBulkCategorize: () => void;
  onBulkApprove: () => void;
  onBulkReject: () => void;
  onExport: () => void;
}

export function BulkActions({ selectedCount, onBulkCategorize, onBulkApprove, onBulkReject, onExport }: BulkActionsProps) {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm text-muted-foreground">{selectedCount} selected</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Bulk Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={onBulkCategorize}>Categorize Selected</DropdownMenuItem>
          <DropdownMenuItem onClick={onBulkApprove}>
            <Check className="mr-2 h-4 w-4" /> Approve AI Suggestions
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onBulkReject}>
            <X className="mr-2 h-4 w-4" /> Reject AI Suggestions
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExport}>
            <Download className="mr-2 h-4 w-4" /> Export Selected
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
