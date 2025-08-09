"use client"

import { TransactionFilters } from "@/components/features/transactions/transaction-filters"
import { TransactionTable } from "@/components/features/transactions/transaction-table"
import { BulkActions } from "@/components/features/transactions/bulk-actions"
import { useState } from "react"

export default function TransactionsPage() {
  const [selectedTransactionsCount, setSelectedTransactionsCount] = useState(0); // This would typically come from TransactionTable's internal state

  // Dummy handlers for bulk actions
  const handleBulkCategorize = () => console.log("Bulk Categorize clicked");
  const handleBulkApprove = () => console.log("Bulk Approve clicked");
  const handleBulkReject = () => console.log("Bulk Reject clicked");
  const handleExport = () => console.log("Export clicked");

  return (
    <div className="container mx-auto p-6 max-w-7xl flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-1/4">
        <TransactionFilters />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Transaction Management</h1>
        {/* In a real app, selectedTransactionsCount would be passed from TransactionTable */}
        <BulkActions
          selectedCount={selectedTransactionsCount}
          onBulkCategorize={handleBulkCategorize}
          onBulkApprove={handleBulkApprove}
          onBulkReject={handleBulkReject}
          onExport={handleExport}
        />
        <TransactionTable />
      </div>
    </div>
  )
}
