# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 15 financial dashboard that integrates YNAB (You Need A Budget) API with N8N workflow automation and AI-powered features. The application provides debt analysis, scenario modeling, and intelligent transaction categorization.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Radix UI, Recharts, YNAB SDK

## Development Commands

```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server (http://localhost:3000)
npm run dev
# or
pnpm dev

# Build for production
npm run build

# Run production build
npm start

# Lint the codebase
npm run lint
```

## Environment Setup

Copy `.env.example` to `.env.local` and configure:

**Required:**
- `YNAB_API_KEY`: Personal access token from YNAB Account Settings → Developer Settings
- `N8N_API_URL`: N8N API endpoint (default: http://localhost:5678/api/v1)
- `N8N_API_KEY`: N8N API authentication key

**Optional (uses mock data if not provided):**
- `AI_API_KEY`: OpenAI API key for AI features
- `AI_API_URL`: AI service endpoint

**Note:** All services gracefully fall back to mock data when API keys are unavailable, enabling development without full infrastructure.

## Architecture Overview

### Service Layer Pattern

The application uses a service-oriented architecture with three core services:

**1. YNAB Service (`services/ynab.ts`)**
- Wraps official YNAB SDK (`ynab` package)
- All amounts in YNAB API are in **milliunits** (1 dollar = 1000 milliunits)
- Use `YNABService.convertMilliunitsToCurrency()` and `YNABService.convertCurrencyToMilliunits()` for conversions
- Provides mock data fallback when `YNAB_API_KEY` is not configured
- Singleton instance exported as `ynabService`

**2. N8N Service (`services/n8n.ts`)**
- Manages workflow automation and webhook integrations
- Includes predefined workflow templates in `WORKFLOW_TEMPLATES` constant
- Mock workflows available for development/testing

**3. Enhanced AI Service (`services/enhanced-ai.ts`)**
- AI-powered categorization, alerts, debt analysis, and scenario modeling
- Integrates with N8N for webhook management
- Always provides mock data fallback for development

### Type System

- Primary types defined in service files (`services/ynab.ts`, `services/n8n.ts`, `services/enhanced-ai.ts`)
- `types/index.ts` re-exports service types and includes legacy backward-compatibility types
- YNAB types closely mirror the official SDK but use camelCase for consistency

### Component Organization

```
components/
├── features/          # Feature-specific components
│   ├── automation/    # Auto-categorization, alerts, webhooks, workflows
│   ├── debt/          # Debt analysis and strategy optimization
│   ├── scenarios/     # What-if scenario modeling
│   └── velocity-banking/
└── ui/               # Reusable UI components (Radix-based)
```

**Page structure:**
```
app/
├── automation/       # N8N workflows and AI automation
├── budgets/         # Budget management
├── debt/            # Debt strategy optimizer
├── scenarios/       # Scenario modeling
├── transactions/    # Transaction management
└── velocity-banking/
```

## Key Development Patterns

### Working with YNAB Data

Always handle milliunits conversion:
```typescript
// Getting data from YNAB
const accounts = await ynabService.getAccounts(budgetId);
const displayAmount = YNABService.convertMilliunitsToCurrency(accounts[0].balance);

// Sending data to YNAB
const transaction = {
  amount: YNABService.convertCurrencyToMilliunits(50.00), // $50.00
  // ... other fields
};
```

### Service Initialization

All services are singletons with automatic mock fallback:
```typescript
import { ynabService } from '@/services/ynab';
import { n8nService } from '@/services/n8n';
import { enhancedAIService } from '@/services/enhanced-ai';

// Services automatically handle missing API keys
const budgets = await ynabService.getBudgets(); // Returns mock data if no API key
```

### N8N Workflow Templates

Use predefined templates from `services/n8n.ts`:
```typescript
import { WORKFLOW_TEMPLATES } from '@/services/n8n';

// Available templates:
// - TRANSACTION_CATEGORIZATION
// - BUDGET_ALERTS
// - DEBT_TRACKER
// - RECURRING_DETECTOR
// - GOAL_TRACKER
// - EMERGENCY_FUND_MONITOR
```

## Important Considerations

### YNAB API Specifics

- All monetary values are in **milliunits** (divide by 1000 for display)
- Negative amounts represent outflows, positive amounts represent inflows
- Transaction `cleared` field uses enum: `cleared`, `uncleared`, `reconciled`
- Categories have goals with various types (see `YNABCategory` interface)

### Mock Data Strategy

When API keys are missing, services return realistic mock data for:
- Local development without external dependencies
- Testing UI components
- Demonstration purposes

Check service constructors to see which environment variables trigger mock mode.

### N8N Integration

- N8N workflows can be triggered via webhooks or schedules
- Webhook URLs follow pattern: `{N8N_WEBHOOK_URL}/{workflow_id}`
- Workflow nodes are generated programmatically in `EnhancedAIService`

### Transaction Server Knowledge

YNAB uses `serverKnowledge` parameter for efficient delta syncing:
- Store the `serverKnowledge` value from each transaction fetch
- Pass it to subsequent calls to get only new/modified transactions
- Reduces API calls and improves performance

## Common Tasks

**Add a new automation workflow:**
1. Define template in `WORKFLOW_TEMPLATES` in `services/n8n.ts`
2. Create UI component in `components/features/automation/`
3. Use `n8nService.createWorkflow()` with template configuration

**Add a new scenario type:**
1. Update `ScenarioAnalysis['type']` union in `services/enhanced-ai.ts`
2. Add scenario logic in `EnhancedAIService.runScenarioAnalysis()`
3. Create UI component in `components/features/scenarios/`

**Work with YNAB categories:**
- Categories are grouped in `YNABCategoryGroup` objects
- Each category has `budgeted`, `activity`, and `balance` (all in milliunits)
- Hidden and deleted categories should be filtered in UI
