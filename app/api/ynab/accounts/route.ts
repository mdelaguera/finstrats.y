import { NextResponse } from 'next/server';
import * as ynab from 'ynab';

export async function GET(request: Request) {
  try {
    const accessToken = process.env.YNAB_API_KEY;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'YNAB_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const budgetId = searchParams.get('budgetId');

    if (!budgetId) {
      return NextResponse.json(
        { error: 'budgetId is required' },
        { status: 400 }
      );
    }

    const ynabAPI = new ynab.API(accessToken);
    const accountsResponse = await ynabAPI.accounts.getAccounts(budgetId);
    const accounts = accountsResponse.data.accounts;

    return NextResponse.json({
      accounts: accounts.map(account => ({
        id: account.id,
        name: account.name,
        type: account.type as 'checking' | 'savings' | 'creditCard',
        balance: account.balance,
        clearedBalance: account.cleared_balance,
        unclearedBalance: account.uncleared_balance,
      })),
    });
  } catch (error) {
    console.error('YNAB API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accounts from YNAB' },
      { status: 500 }
    );
  }
}
