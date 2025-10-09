# YNAB API Integration

## Overview
This project now integrates with the YNAB (You Need A Budget) API to fetch real budget data, accounts, transactions, and categories.

## Setup

### 1. Get Your YNAB API Key
1. Visit https://app.ynab.com/settings/developer
2. Generate a new Personal Access Token
3. Copy the token (you'll only see it once!)

### 2. Configure Environment Variables

#### For Local Development:
Create a `.env.local` file in the project root:
```bash
YNAB_API_KEY=your_actual_ynab_api_key_here
```

#### For Vercel Deployment:
✅ Already configured! You've added `YNAB_API_KEY` to Vercel's environment variables.

## Architecture

### API Routes (Next.js App Router)
- `GET /api/ynab/budgets` - Fetches all budgets
- `GET /api/ynab/accounts?budgetId={id}` - Fetches accounts for a budget
- `GET /api/ynab/transactions?budgetId={id}` - Fetches transactions for a budget
- `GET /api/ynab/categories?budgetId={id}` - Fetches category groups for a budget

### Services
- `services/ynab.ts` - Client-side service that calls the API routes

### Context
- `contexts/budget-context.tsx` - Manages budget selection across the app
  - Auto-fetches budgets on app load
  - Persists selected budget to localStorage
  - Provides `useBudget()` hook for components

### Updated Components
- `components/features/accounts/account-list.tsx` - Now displays real YNAB accounts
- `app/budgets/page.tsx` - Now displays real YNAB category groups

## Usage

### Using the Budget Context
```tsx
import { useBudget } from '@/contexts/budget-context'

function MyComponent() {
  const { selectedBudget, budgets, setSelectedBudget } = useBudget()

  // selectedBudget will be automatically set to the first budget
  // or the previously selected budget from localStorage

  return <div>{selectedBudget?.name}</div>
}
```

### Fetching YNAB Data
```tsx
import { getAccounts, getTransactions, getCategoryGroups } from '@/services/ynab'

// All functions now require a budgetId
const accounts = await getAccounts(budgetId)
const transactions = await getTransactions(budgetId)
const categories = await getCategoryGroups(budgetId)
```

## Important Notes

### YNAB Milliunits
YNAB uses "milliunits" for all monetary values (1000 milliunits = $1.00).
Remember to divide by 1000 when displaying amounts:
```tsx
const balance = account.balance / 1000 // Convert to dollars
```

### Account Types
YNAB account types are mapped as follows:
- `checking` → `checking`
- `savings` → `savings`
- `creditCard` → `credit`
- Others → `cash`

## Testing
1. Start the development server: `npm run dev`
2. Navigate to `/accounts` to see your real YNAB accounts
3. Navigate to `/budgets` to see your real YNAB budget categories

## Security
- API keys are stored in environment variables (never committed to git)
- API routes run server-side, keeping your API key secure
- Client-side code only calls your API routes, never YNAB directly
