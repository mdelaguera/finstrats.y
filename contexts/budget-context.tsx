"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBudgets, YNABBudget } from '@/services/ynab';

interface BudgetContextType {
  budgets: YNABBudget[];
  selectedBudget: YNABBudget | null;
  setSelectedBudget: (budget: YNABBudget) => void;
  isLoading: boolean;
  error: string | null;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [budgets, setBudgets] = useState<YNABBudget[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<YNABBudget | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedBudgets = await getBudgets();
        setBudgets(fetchedBudgets);

        // Auto-select first budget if available
        if (fetchedBudgets.length > 0) {
          // Try to get from localStorage first
          const savedBudgetId = localStorage.getItem('selectedBudgetId');
          const savedBudget = fetchedBudgets.find(b => b.id === savedBudgetId);
          setSelectedBudget(savedBudget || fetchedBudgets[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch budgets');
        console.error('Error fetching budgets:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  const handleSetSelectedBudget = (budget: YNABBudget) => {
    setSelectedBudget(budget);
    localStorage.setItem('selectedBudgetId', budget.id);
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        selectedBudget,
        setSelectedBudget: handleSetSelectedBudget,
        isLoading,
        error,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}
