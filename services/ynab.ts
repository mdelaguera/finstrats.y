// YNAB API integration using Next.js API routes

export interface YNABAccount {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'creditCard';
  balance: number;
  clearedBalance: number;
  unclearedBalance: number;
}

export interface YNABBudget {
  id: string;
  name: string;
  lastModified: string;
}

export interface YNABTransaction {
  id: string;
  date: string;
  amount: number; // in milliunits
  payeeName: string;
  categoryId: string;
  memo: string | null;
  cleared: 'cleared' | 'uncleared' | 'reconciled';
  approved: boolean;
}

export interface YNABCategory {
  id: string;
  name: string;
  budgeted: number; // in milliunits
  activity: number; // in milliunits
  balance: number; // in milliunits
}

export interface YNABCategoryGroup {
  id: string;
  name: string;
  categories: YNABCategory[];
}

// API functions
export const getBudgets = async (): Promise<YNABBudget[]> => {
  try {
    const response = await fetch('/api/ynab/budgets');
    if (!response.ok) {
      throw new Error('Failed to fetch budgets');
    }
    const data = await response.json();
    return data.budgets;
  } catch (error) {
    console.error('Error fetching budgets:', error);
    throw error;
  }
};

export const getAccounts = async (budgetId: string): Promise<YNABAccount[]> => {
  try {
    const response = await fetch(`/api/ynab/accounts?budgetId=${budgetId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch accounts');
    }
    const data = await response.json();
    return data.accounts;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export const getCategoryGroups = async (budgetId: string): Promise<YNABCategoryGroup[]> => {
  try {
    const response = await fetch(`/api/ynab/categories?budgetId=${budgetId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data.categoryGroups;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getTransactions = async (budgetId: string): Promise<YNABTransaction[]> => {
  try {
    const response = await fetch(`/api/ynab/transactions?budgetId=${budgetId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    const data = await response.json();
    return data.transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
