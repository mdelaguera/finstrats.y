import { AccountList } from "@/components/features/accounts/account-list"

export default function AccountsPage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Account Overview</h1>
      <AccountList />
    </div>
  )
}
