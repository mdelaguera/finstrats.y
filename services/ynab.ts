// This file would contain your YNAB API integration logic.
// For UI generation, we'll use mock data.

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

// Mock API functions
export const getAccounts = async (): Promise<YNABAccount[]> => {
  return new Promise((resolve) =>
    setTimeout(() =>
      resolve([
        { id: 'acc1', name: 'Checking', type: 'checking', balance: 1500000, clearedBalance: 1400000, unclearedBalance: 100000 },
        { id: 'acc2', name: 'Savings', type: 'savings', balance: 10000000, clearedBalance: 10000000, unclearedBalance: 0 },
        { id: 'acc3', name: 'Credit Card', type: 'creditCard', balance: -500000, clearedBalance: -500000, unclearedBalance: 0 },
      ]),
    200
    )
  );
};

export const getBudgets = async (): Promise<YNABBudget[]> => {
  return new Promise((resolve) =>
    setTimeout(() =>
      resolve([
        { id: 'bud1', name: 'My Personal Budget', lastModified: new Date().toISOString() },
        { id: 'bud2', name: 'Business Budget', lastModified: new Date().toISOString() },
      ]),
    200
    )
  );
};

export const getCategoryGroups = async (budgetId: string): Promise<YNABCategoryGroup[]> => {
  // This would fetch real data for a given budgetId
  return new Promise((resolve) =>
    setTimeout(() =>
      resolve([
        {
          id: 'cg1',
          name: 'Immediate Obligations',
          categories: [
            { id: 'cat1', name: 'Rent', budgeted: 1500000, activity: -1500000, balance: 0 },
            { id: 'cat2', name: 'Electricity', budgeted: 100000, activity: -85000, balance: 15000 },
          ],
        },
        {
          id: 'cg2',
          name: 'Everyday Expenses',
          categories: [
            { id: 'cat3', name: 'Groceries', budgeted: 400000, activity: -380000, balance: 20000 },
            { id: 'cat4', name: 'Dining Out', budgeted: 200000, activity: -250000, balance: -50000 },
          ],
        },
      ]),
    200
    )
  );
};

export const getTransactions = async (budgetId: string): Promise<YNABTransaction[]> => {
  // This would fetch real data for a given budgetId
  return new Promise((resolve) =>
    setTimeout(() =>
      resolve([
        {
          id: 't1',
          date: '2023-10-26',
          amount: -75230,
          payeeName: 'Whole Foods',
          categoryId: 'cat3',
          memo: 'Weekly shopping',
          cleared: 'cleared',
          approved: true,
        },
        {
          id: 't2',
          date: '2023-10-25',
          amount: 2500000,
          payeeName: 'Salary',
          categoryId: 'income',
          memo: 'Bi-weekly pay',
          cleared: 'cleared',
          approved: true,
        },
      ]),
    200
    )
  );
};
