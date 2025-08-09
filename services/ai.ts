// This file would contain your AI/LLM integration logic.
// For UI generation, we'll use mock data.

export interface AICategorizationSuggestion {
  transactionId: string;
  suggestedCategory: string;
  confidence: number; // 0.0 to 1.0
}

export interface SmartAlert {
  id: string;
  type: 'overspend' | 'unusualSpending' | 'billReminder' | 'goalMilestone';
  message: string;
  triggeredAt: string;
  read: boolean;
}

export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[]; // e.g., ['new_transaction', 'budget_update']
  isActive: boolean;
}

// Mock AI API functions
export const getAutoCategorizationSuggestions = async (): Promise<AICategorizationSuggestion[]> => {
  return new Promise((resolve) =>
    setTimeout(() =>
      resolve([
        { transactionId: 't5', suggestedCategory: 'Transportation', confidence: 0.75 },
        { transactionId: 't6', suggestedCategory: 'Dining Out', confidence: 0.88 },
      ]),
    200
    )
  );
};

export const getSmartAlerts = async (): Promise<SmartAlert[]> => {
  return new Promise((resolve) =>
    setTimeout(() =>
      resolve([
        { id: 'alert1', type: 'overspend', message: 'You are close to overspending in Groceries.', triggeredAt: '2023-10-26T10:00:00Z', read: false },
        { id: 'alert2', type: 'billReminder', message: 'Electricity bill due in 3 days.', triggeredAt: '2023-10-23T09:00:00Z', read: true },
      ]),
    200
    )
  );
};

export const getWebhookConfigs = async (): Promise<WebhookConfig[]> => {
  return new Promise((resolve) =>
    setTimeout(() =>
      resolve([
        { id: 'wh1', name: 'Google Sheets Sync', url: 'https://example.com/webhook/sheets', events: ['new_transaction'], isActive: true },
        { id: 'wh2', name: 'Slack Notifications', url: 'https://example.com/webhook/slack', events: ['budget_update'], isActive: false },
      ]),
    200
    )
  );
};
