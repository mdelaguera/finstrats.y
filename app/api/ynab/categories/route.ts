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
    const categoriesResponse = await ynabAPI.categories.getCategories(budgetId);
    const categoryGroups = categoriesResponse.data.category_groups;

    return NextResponse.json({
      categoryGroups: categoryGroups.map(group => ({
        id: group.id,
        name: group.name,
        categories: group.categories.map(category => ({
          id: category.id,
          name: category.name,
          budgeted: category.budgeted,
          activity: category.activity,
          balance: category.balance,
        })),
      })),
    });
  } catch (error) {
    console.error('YNAB API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories from YNAB' },
      { status: 500 }
    );
  }
}
