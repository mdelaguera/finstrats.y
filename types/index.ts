// Centralized TypeScript definitions for the application.

// YNAB related types (simplified for example)
export interface YNABAccount {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'cash';
  balance: number;
  lastUpdated: string;
}

export interface YNABTransaction {
  id: string;
  date: string;
  payee: string;
  category: string;
  memo: string;
  outflow: number;
  inflow: number;
  cleared: boolean;
  aiConfidence?: number; // AI-powered auto-categorization confidence
}

export interface YNABCategory {
  id: string;
  name: string;
  emoji: string;
  budgeted: number;
  activity: number;
  available: number;
}

export interface YNABCategoryGroup {
  id: string;
  name: string;
  categories: YNABCategory[];
}

// AI Automation types
export interface AICategorizationSuggestion {
  transactionId: string;
  suggestedCategory: string;
  confidence: number;
}

export interface SmartAlertConfig {
  id: string;
  name: string;
  enabled: boolean;
  threshold?: number; // e.g., for overspend percentage
  daysBefore?: number; // e.g., for bill reminders
}

export interface Webhook {
  id: string;
  name: string;
  status: "active" | "inactive" | "error";
  lastTriggered: string;
}

// Debt Strategy types
export interface DebtAccount {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  payoffOrder: number;
}

// Scenario Modeling types
export interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  parameters: { [key: string]: any };
  assumptions: { [key: string]: boolean };
}

export interface ScenarioResult {
  cashFlowProjection: { month: string; before: number; after: number }[];
  budgetImpact: { category: string; before: number; after: number }[];
  riskAssessment: { metric: string; value: number; fill: string }[];
}

// Report types
export interface Report {
  id: string;
  name: string;
  type: string;
  date: string;
  format: string;
}
