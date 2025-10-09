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
    const transactionsResponse = await ynabAPI.transactions.getTransactions(budgetId);
    const transactions = transactionsResponse.data.transactions;

    return NextResponse.json({
      transactions: transactions.map(transaction => ({
        id: transaction.id,
        date: transaction.date,
        amount: transaction.amount,
        payeeName: transaction.payee_name || 'Unknown',
        categoryId: transaction.category_id || '',
        memo: transaction.memo,
        cleared: transaction.cleared as 'cleared' | 'uncleared' | 'reconciled',
        approved: transaction.approved,
      })),
    });
  } catch (error) {
    console.error('YNAB API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions from YNAB' },
      { status: 500 }
    );
  }
}
