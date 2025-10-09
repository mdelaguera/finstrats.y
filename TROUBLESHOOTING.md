# YNAB Integration Troubleshooting Guide

## Recent Fixes Applied

### 1. ✅ Budget Selector Connected to YNAB API
**Issue:** Budget selector in top navigation was using hardcoded dummy data.

**Fix:**
- Connected top-nav to `BudgetContext`
- Budget selector now fetches real YNAB budgets
- Properly updates selected budget across the entire app

### 2. ✅ Syntax Error Fixed
**Issue:** `Command-Item` typo in top-nav causing potential rendering issues.

**Fix:** Changed to `CommandItem`

### 3. ✅ Toast Notifications Enabled
**Issue:** Settings page and other components were trying to use `toast()` but Toaster component wasn't added.

**Fix:** Added `<Toaster />` component to root layout

### 4. ✅ Enhanced Account Type Support
**Issue:** YNAB account types weren't fully supported (only checking, savings, creditCard).

**Fix:**
- Added support for: `cash`, `lineOfCredit`, `otherAsset`, `otherLiability`
- Added `closed` and `deleted` flags to filter inactive accounts

## Current Status

### What's Working ✅
- YNAB API integration via Next.js API routes
- Budget context managing selected budget
- Account list displaying real YNAB accounts
- Budget categories page showing real data
- Budget selector in top navigation
- Toast notifications for settings changes
- Proper filtering of closed/deleted accounts

### What Requires YNAB_API_KEY ⚠️

For the app to show live data, you need to:

1. **Get your YNAB API key:**
   - Visit: https://app.ynab.com/settings/developer
   - Generate a Personal Access Token

2. **Set up locally:**
   ```bash
   # Create .env.local file
   echo "YNAB_API_KEY=your_actual_api_key" > .env.local
   ```

3. **Verify Vercel deployment:**
   - Check that `YNAB_API_KEY` is set in Vercel environment variables
   - Redeploy if needed

## Testing the Integration

### 1. Check Dev Server Output
```bash
npm run dev
```
Visit http://localhost:3000

### 2. Check for YNAB Data Loading
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any errors related to YNAB API

### 3. Test Budget Selector
1. Click the budget dropdown in top navigation
2. Should show your actual YNAB budgets (not "My Personal Budget", "Business Budget", etc.)
3. Selecting a budget should refresh accounts/categories

### 4. Test Accounts Page
1. Navigate to `/accounts`
2. Should show your real YNAB accounts
3. Click "Refresh" button to reload
4. Should show loading spinner then real data

### 5. Test Budgets Page
1. Navigate to `/budgets`
2. Should show your real YNAB category groups
3. Data should be in milliunits (divided by 1000 for display)

## Common Issues & Solutions

### Issue: "No budgets found" or "Please select a budget"
**Cause:** YNAB_API_KEY not configured or invalid

**Solution:**
1. Check `.env.local` file exists with correct API key
2. Restart dev server: `npm run dev`
3. Clear browser cache and reload

### Issue: Budget selector shows "Loading budgets..." indefinitely
**Cause:** API request failing

**Solution:**
1. Check browser console for errors
2. Verify API key is valid
3. Check network tab for failed requests to `/api/ynab/budgets`

### Issue: Accounts/Categories not loading
**Cause:** No budget selected or API error

**Solution:**
1. Ensure a budget is selected in top navigation
2. Check browser console for errors
3. Verify the budget ID is being passed to API routes

### Issue: Settings buttons don't show toast notifications
**Cause:** This should now be fixed with the Toaster component

**Solution:**
1. Refresh the page
2. Try clicking "Save Account Settings" in Settings page
3. Should see a success toast in top-right corner

## API Endpoints

All endpoints are server-side and secure:

- `GET /api/ynab/budgets` - Get all budgets
- `GET /api/ynab/accounts?budgetId={id}` - Get accounts for a budget
- `GET /api/ynab/transactions?budgetId={id}` - Get transactions
- `GET /api/ynab/categories?budgetId={id}` - Get category groups

## Next Steps

If you're still seeing issues:

1. **Check the browser console** for any error messages
2. **Check the terminal** running `npm run dev` for server errors
3. **Verify your YNAB API key** is valid and has proper permissions
4. **Test the API directly:** Visit `http://localhost:3000/api/ynab/budgets` in your browser

## Environment Variables Checklist

- [ ] `.env.local` created in project root
- [ ] `YNAB_API_KEY=your_key_here` added to `.env.local`
- [ ] Dev server restarted after adding environment variable
- [ ] `YNAB_API_KEY` added to Vercel environment variables (for production)
- [ ] Vercel project redeployed after adding environment variable
