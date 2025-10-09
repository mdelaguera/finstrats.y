import { NextResponse } from 'next/server';
import * as ynab from 'ynab';

export async function GET() {
  try {
    const accessToken = process.env.YNAB_API_KEY;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'YNAB_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const ynabAPI = new ynab.API(accessToken);
    const budgetsResponse = await ynabAPI.budgets.getBudgets();
    const budgets = budgetsResponse.data.budgets;

    return NextResponse.json({
      budgets: budgets.map(budget => ({
        id: budget.id,
        name: budget.name,
        lastModified: budget.last_modified_on || new Date().toISOString(),
      })),
    });
  } catch (error) {
    console.error('YNAB API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch budgets from YNAB' },
      { status: 500 }
    );
  }
}
